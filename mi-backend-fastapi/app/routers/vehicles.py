from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

from app.database.connection import get_database_session as get_db
from app.models.vehicle import Vehicle
from app.models.invoice import Invoice
from app.utils import generate_invoice_number, calculate_registration_value

from app.schemas.vehicle import (
    VehicleResponse,
    VehicleEntryResponseMessage,
    VehicleExitResponseMessage,
    VehicleListResponseMessage,
    VehicleHistoryResponse,
    VehicleHistoryResponseMessage,
    VehicleCreate  # opcional si lo usas para el body
)

# Mapeo de tipos (soporte EN/ES) solo para etiqueta
vehicle_type_map = {
    "carro": {"label": "carro", "value": 5000},
    "moto": {"label": "moto", "value": 1500},
    "car": {"label": "carro", "value": 5000},
    "motorcycle": {"label": "moto", "value": 1500}
}

router = APIRouter(tags=["Vehicles"])
@router.post("/entry/{license_plate}", response_model=VehicleEntryResponseMessage)
def register_vehicle_entry(
    license_plate: str,
    payload: dict | None = None,
    db: Session = Depends(get_db)
):
    now = datetime.now()
    vehicle_type = (payload or {}).get("vehicle_type", "carro")
    owner_name = (payload or {}).get("owner_name")
    phone = (payload or {}).get("phone")
    registration_value = calculate_registration_value(vehicle_type)
    tipo_label = vehicle_type_map.get(vehicle_type, {"label": "carro"})["label"]

    vehicle = db.query(Vehicle).filter(Vehicle.license_plate == license_plate).first()

    # 🚫 Ya está dentro
    if vehicle and vehicle.is_inside:
        return VehicleEntryResponseMessage(
            success=False,
            message="El vehículo ya está registrado 'en parqueadero'. No se permite una nueva entrada.",
            id=vehicle.id,
            license_plate=vehicle.license_plate,
            vehicle_type=vehicle.vehicle_type,
            status=vehicle.status,
            entry_time=vehicle.entry_time,
            invoice_number=None,
            registration_value=vehicle.registration_value,
            total_amount=0,
            parking_time=0
        )

    # 🆕 Nuevo vehículo
    if not vehicle:
        vehicle = Vehicle(
            license_plate=license_plate,
            vehicle_type=tipo_label,
            owner_name=owner_name,
            phone=phone,
            status="en parqueadero",
            is_inside=True,
            entry_time=now,
            registration_value=registration_value
        )
        db.add(vehicle)
    else:
        # 🔄 Actualizar existente
        vehicle.vehicle_type = tipo_label
        vehicle.owner_name = owner_name or vehicle.owner_name
        vehicle.phone = phone or vehicle.phone
        vehicle.status = "en parqueadero"
        vehicle.is_inside = True
        vehicle.entry_time = now
        vehicle.registration_value = registration_value

    db.commit()
    db.refresh(vehicle)

    # 🧾 Crear factura vacía
    invoice = Invoice(
        invoice_number=generate_invoice_number(db),
        vehicle_id=vehicle.id,
        total_amount=0,
        parking_time=0
    )
    db.add(invoice)
    db.commit()
    db.refresh(invoice)

    return VehicleEntryResponseMessage(
        success=True,
        message="Vehículo registrado con éxito",
        id=vehicle.id,
        license_plate=vehicle.license_plate,
        vehicle_type=vehicle.vehicle_type,
        status=vehicle.status,
        entry_time=vehicle.entry_time,
        invoice_number=invoice.invoice_number,
        registration_value=vehicle.registration_value,
        total_amount=invoice.total_amount,
        parking_time=invoice.parking_time
    )

# 🚙 Registrar salida y actualizar factura
@router.put("/exit/{license_plate}", response_model=VehicleExitResponseMessage)
def register_exit(license_plate: str, db: Session = Depends(get_db)):
    # Relajar filtro: placa y que esté En parqueadero o dentro
    vehicle = (
        db.query(Vehicle)
        .filter(Vehicle.license_plate == license_plate)
        .filter((Vehicle.is_inside == True) | (Vehicle.status == "En Parqueadero"))
        .first()
    )

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado o no está En parqueadero.")

    now = datetime.now()
    if not vehicle.entry_time:
        raise HTTPException(status_code=400, detail="El vehículo no tiene hora de entrada registrada.")

    parking_time_minutes = int((now - vehicle.entry_time).total_seconds() // 60)

    # Calcular tarifa proporcional por hora; si minutos = 0, cobrar base
    tarifa_base = vehicle.registration_value or calculate_registration_value(vehicle.vehicle_type)
    total_amount = int((parking_time_minutes / 60) * tarifa_base) if parking_time_minutes > 0 else int(tarifa_base)

    # Actualizar vehículo
    vehicle.exit_time = now
    vehicle.is_inside = False
    vehicle.status = "Fuera"
    db.commit()
    db.refresh(vehicle)

    # Actualizar última factura
    invoice = (
        db.query(Invoice)
        .filter(Invoice.vehicle_id == vehicle.id)
        .order_by(Invoice.id.desc())
        .first()
    )
    if invoice:
        invoice.parking_time = parking_time_minutes
        invoice.total_amount = total_amount
        db.commit()
        db.refresh(invoice)

    return VehicleExitResponseMessage(
        success=True,
        message="Salida registrada y factura actualizada correctamente",
        id=vehicle.id,
        license_plate=vehicle.license_plate,
        vehicle_type=vehicle.vehicle_type,
        entry_time=vehicle.entry_time,
        exit_time=vehicle.exit_time,
        status=vehicle.status,
        invoice_number=invoice.invoice_number if invoice else None,
        total_amount=invoice.total_amount if invoice else 0,
        parking_time=invoice.parking_time if invoice else 0
    )

# 🚦 Listar vehículos En parqueaderos (incluye última factura)
@router.get("/active", response_model=VehicleListResponseMessage)
def list_active(db: Session = Depends(get_db)):
    vehicles = db.query(Vehicle).filter(Vehicle.is_inside == True).all()
    responses = []
    for v in vehicles:
        invoice = (
            db.query(Invoice)
            .filter(Invoice.vehicle_id == v.id)
            .order_by(Invoice.id.desc())
            .first()
        )
        responses.append(VehicleResponse.model_validate({
            "id": v.id,
            "license_plate": v.license_plate,
            "vehicle_type": vehicle_type_map.get(v.vehicle_type, {"label": v.vehicle_type})["label"],
            "entry_time": v.entry_time.isoformat() if v.entry_time else None,
            "registration_value": v.registration_value or 0,
            "status": v.status or "N/A",
            "exit_time": v.exit_time.isoformat() if v.exit_time else None,
            "invoice_number": invoice.invoice_number if invoice else None,
            "total_amount": invoice.total_amount if invoice else 0,
            "parking_time": invoice.parking_time if invoice else 0
        }))
    return {"success": True, "message": "Vehículos En parqueaderos listados correctamente", "vehicles": responses}

# 📅 Listar vehículos de hoy (incluye última factura)
@router.get("/today", response_model=VehicleListResponseMessage)
def list_today(db: Session = Depends(get_db)):
    today = datetime.now().date()
    vehicles = db.query(Vehicle).filter(func.date(Vehicle.entry_time) == today).all()
    responses = []
    for v in vehicles:
        invoice = (
            db.query(Invoice)
            .filter(Invoice.vehicle_id == v.id)
            .order_by(Invoice.id.desc())
            .first()
        )
        responses.append(VehicleResponse.model_validate({
            "id": v.id,
            "license_plate": v.license_plate,
            "vehicle_type": vehicle_type_map.get(v.vehicle_type, {"label": v.vehicle_type})["label"],
            "entry_time": v.entry_time.isoformat() if v.entry_time else None,
            "registration_value": v.registration_value or 0,
            "status": v.status or "N/A",
            "exit_time": v.exit_time.isoformat() if v.exit_time else None,
            "invoice_number": invoice.invoice_number if invoice else None,
            "total_amount": invoice.total_amount if invoice else 0,
            "parking_time": invoice.parking_time if invoice else 0
        }))
    return {"success": True, "message": "Vehículos de hoy listados correctamente", "vehicles": responses}

# 📜 Historial de vehículos (incluye última factura)
@router.get("/history", response_model=VehicleHistoryResponseMessage)
def list_all(db: Session = Depends(get_db)):
    vehicles = db.query(Vehicle).all()
    history = []
    for v in vehicles:
        invoice = (
            db.query(Invoice)
            .filter(Invoice.vehicle_id == v.id)
            .order_by(Invoice.id.desc())
            .first()
        )
        history.append(VehicleHistoryResponse.model_validate({
            "id": v.id,
            "license_plate": v.license_plate,
            "vehicle_type": vehicle_type_map.get(v.vehicle_type, {"label": v.vehicle_type})["label"],
            "entry_time": v.entry_time.isoformat() if v.entry_time else None,
            "registration_value": v.registration_value or 0,
            "status": v.status or "",
            "invoice_number": invoice.invoice_number if invoice else None,
            "exit_time": v.exit_time.isoformat() if v.exit_time else None,
            "total_amount": invoice.total_amount if invoice else 0,
            "parking_time": invoice.parking_time if invoice else 0
        }))
    return {"success": True, "message": "Historial de vehículos obtenido correctamente", "history": history}
