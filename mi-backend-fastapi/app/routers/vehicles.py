from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
from app.database.connection import get_database_session
from app.models.user import User
from app.core.security import verify_access_token
import random
import string
from decimal import Decimal

router = APIRouter(
    prefix="/vehicles",
    tags=["vehicles"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Función para obtener el usuario actual (reutilizada del auth)
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_database_session)):
    try:
        username = verify_access_token(token)
        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# INGRESO DE VEHÍCULO
@router.get("/enter_vehicle")
async def enter_vehicle(
    license_plate: str,
    vehicle_type: str = "car",  # car, motorcycle, truck
    current_user: User = Depends(get_current_user)
):
    """
    Registra el ingreso de un vehículo al parqueadero
    """
    entry_time = datetime.now()
    
    # Generar un ID único para el registro
    entry_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    
    # Simular diferentes espacios disponibles según el tipo de vehículo
    parking_spots = {
        "car": {"available": 45, "total": 50},
        "motorcycle": {"available": 18, "total": 20},
        "truck": {"available": 3, "total": 5}
    }
    
    spot_info = parking_spots.get(vehicle_type, parking_spots["car"])
    
    if spot_info["available"] <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"No hay espacios disponibles para {vehicle_type}"
        )
    
    # Simular asignación de espacio
    assigned_spot = f"{vehicle_type.upper()}-{random.randint(1, spot_info['total'])}"
    
    return {
        "status": "success",
        "message": "Vehículo ingresado exitosamente",
        "data": {
            "entry_id": entry_id,
            "license_plate": license_plate.upper(),
            "vehicle_type": vehicle_type,
            "entry_time": entry_time.isoformat(),
            "assigned_spot": assigned_spot,
            "attendant": current_user.username,
            "available_spots": spot_info["available"] - 1,
            "total_spots": spot_info["total"]
        }
    }

# RETIRO DE VEHÍCULO
@router.get("/remove_vehicle")
async def remove_vehicle(
    license_plate: str,
    entry_id: Optional[str] = None,
    current_user: User = Depends(get_current_user)
):
    """
    Registra la salida de un vehículo del parqueadero
    """
    exit_time = datetime.now()
    
    # Simular búsqueda del vehículo (en producción sería una consulta a BD)
    # Simular tiempo de estancia (entre 30 minutos y 8 horas)
    stay_hours = random.uniform(0.5, 8.0)
    entry_time = exit_time - timedelta(hours=stay_hours)
    
    # Calcular tarifa básica
    hourly_rate = 3000  # $3000 COP por hora
    total_cost = max(hourly_rate, int(stay_hours * hourly_rate))
    
    return {
        "status": "success",
        "message": "Vehículo retirado exitosamente",
        "data": {
            "license_plate": license_plate.upper(),
            "entry_time": entry_time.isoformat(),
            "exit_time": exit_time.isoformat(),
            "duration_hours": round(stay_hours, 2),
            "total_cost": total_cost,
            "currency": "COP",
            "attendant": current_user.username,
            "exit_id": ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        }
    }

# HISTORIAL DE VEHÍCULOS
@router.get("/record")
async def get_vehicle_records(
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    license_plate: Optional[str] = None,
    limit: int = 50,
    current_user: User = Depends(get_current_user)
):
    """
    Obtiene el historial de vehículos del parqueadero
    """
    
    # Simular datos de historial
    sample_records = []
    
    for i in range(min(limit, 20)):  # Simular hasta 20 registros
        entry_time = datetime.now() - timedelta(
            days=random.randint(0, 30),
            hours=random.randint(0, 23),
            minutes=random.randint(0, 59)
        )
        
        stay_duration = random.uniform(0.5, 12.0)
        exit_time = entry_time + timedelta(hours=stay_duration)
        
        vehicle_types = ["car", "motorcycle", "truck"]
        vehicle_type = random.choice(vehicle_types)
        
        # Generar placa simulada
        letters = ''.join(random.choices(string.ascii_uppercase, k=3))
        numbers = ''.join(random.choices(string.digits, k=3))
        simulated_plate = f"{letters}{numbers}"
        
        record = {
            "id": i + 1,
            "license_plate": license_plate.upper() if license_plate else simulated_plate,
            "vehicle_type": vehicle_type,
            "entry_time": entry_time.isoformat(),
            "exit_time": exit_time.isoformat() if i % 4 != 0 else None,  # 25% aún en parqueadero
            "duration_hours": round(stay_duration, 2) if i % 4 != 0 else None,
            "total_cost": int(stay_duration * 3000) if i % 4 != 0 else None,
            "status": "completed" if i % 4 != 0 else "active",
            "attendant_entry": f"user_{random.randint(1, 5)}",
            "attendant_exit": f"user_{random.randint(1, 5)}" if i % 4 != 0 else None
        }
        sample_records.append(record)
    
    # Filtrar por placa si se proporciona
    if license_plate:
        sample_records = [r for r in sample_records if license_plate.upper() in r["license_plate"]]
    
    return {
        "status": "success",
        "message": "Historial obtenido exitosamente",
        "data": {
            "records": sample_records,
            "total_records": len(sample_records),
            "filters_applied": {
                "date_from": date_from,
                "date_to": date_to,
                "license_plate": license_plate,
                "limit": limit
            },
            "requested_by": current_user.username,
            "request_time": datetime.now().isoformat()
        }
    }

# CALCULAR VALOR
@router.get("/calculate_value")
async def calculate_parking_value(
    license_plate: str,
    entry_time: Optional[str] = None,
    vehicle_type: str = "car",
    current_user: User = Depends(get_current_user)
):
    """
    Calcula el valor a pagar por el tiempo de uso del parqueadero
    """
    
    current_time = datetime.now()
    
    # Si no se proporciona hora de entrada, simular una
    if entry_time:
        try:
            entry_datetime = datetime.fromisoformat(entry_time.replace('Z', '+00:00'))
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Formato de fecha inválido. Use formato ISO: YYYY-MM-DDTHH:MM:SS"
            )
    else:
        # Simular entrada entre 30 minutos y 8 horas atrás
        hours_ago = random.uniform(0.5, 8.0)
        entry_datetime = current_time - timedelta(hours=hours_ago)
    
    # Calcular tiempo transcurrido
    duration = current_time - entry_datetime
    duration_hours = duration.total_seconds() / 3600
    
    # Tarifas por tipo de vehículo
    rates = {
        "car": 3000,        # $3000 COP por hora
        "motorcycle": 2000, # $2000 COP por hora
        "truck": 5000       # $5000 COP por hora
    }
    
    hourly_rate = rates.get(vehicle_type, rates["car"])
    
    # Calcular costo (mínimo 1 hora)
    billable_hours = max(1.0, duration_hours)
    base_cost = billable_hours * hourly_rate
    
    # Aplicar descuentos por tiempo
    discount = 0
    if duration_hours > 24:
        discount = 0.20  # 20% descuento por más de 24 horas
    elif duration_hours > 12:
        discount = 0.10  # 10% descuento por más de 12 horas
    
    final_cost = base_cost * (1 - discount)
    
    return {
        "status": "success",
        "message": "Valor calculado exitosamente",
        "data": {
            "license_plate": license_plate.upper(),
            "vehicle_type": vehicle_type,
            "entry_time": entry_datetime.isoformat(),
            "current_time": current_time.isoformat(),
            "duration_hours": round(duration_hours, 2),
            "billable_hours": round(billable_hours, 2),
            "hourly_rate": hourly_rate,
            "base_cost": int(base_cost),
            "discount_applied": f"{int(discount * 100)}%",
            "discount_amount": int(base_cost - final_cost),
            "final_cost": int(final_cost),
            "currency": "COP",
            "calculated_by": current_user.username
        }
    }

# GENERAR FACTURA
@router.get("/generate_invoice")
async def generate_invoice(
    license_plate: str,
    amount: int,
    payment_method: str = "cash",  # cash, card, transfer
    current_user: User = Depends(get_current_user)
):
    """
    Genera una factura para el pago del parqueadero
    """
    
    # Generar número de factura único
    invoice_number = f"INV-{datetime.now().strftime('%Y%m%d')}-{''.join(random.choices(string.digits, k=6))}"
    
    # Calcular impuestos (IVA 19% en Colombia)
    tax_rate = 0.19
    subtotal = int(amount / (1 + tax_rate))
    tax_amount = amount - subtotal
    
    current_time = datetime.now()
    
    return {
        "status": "success",
        "message": "Factura generada exitosamente",
        "data": {
            "invoice_number": invoice_number,
            "license_plate": license_plate.upper(),
            "issue_date": current_time.isoformat(),
            "due_date": (current_time + timedelta(days=30)).isoformat(),
            "subtotal": subtotal,
            "tax_rate": f"{int(tax_rate * 100)}%",
            "tax_amount": tax_amount,
            "total_amount": amount,
            "currency": "COP",
            "payment_method": payment_method,
            "payment_status": "pending",
            "business_info": {
                "name": "ParkSys - Sistema de Parqueadero",
                "nit": "900123456-7",
                "address": "Calle Principal #123, Pereira, Risaralda",
                "phone": "+57 6 123-4567"
            },
            "attendant": current_user.username,
            "qr_payment": f"https://pay.parksys.com/invoice/{invoice_number}",
            "notes": "Gracias por usar nuestro servicio de parqueadero"
        }
    }

# ACTUALIZAR DATOS
@router.get("/update_data")
async def update_parking_data(
    action: str = "sync",  # sync, backup, refresh
    current_user: User = Depends(get_current_user)
):
    """
    Actualiza y sincroniza los datos del sistema de parqueadero
    """
    
    current_time = datetime.now()
    
    # Simular diferentes tipos de actualización
    actions_performed = []
    
    if action in ["sync", "all"]:
        actions_performed.append("Sincronización con servidor central")
        actions_performed.append("Actualización de tarifas")
        actions_performed.append("Sincronización de usuarios")
    
    if action in ["backup", "all"]:
        actions_performed.append("Respaldo de base de datos")
        actions_performed.append("Respaldo de configuraciones")
    
    if action in ["refresh", "all"]:
        actions_performed.append("Actualización de interfaz")
        actions_performed.append("Limpieza de archivos temporales")
    
    # Simular estadísticas del sistema
    system_stats = {
        "total_vehicles_today": random.randint(150, 300),
        "active_vehicles": random.randint(20, 80),
        "revenue_today": random.randint(500000, 1200000),
        "available_spots": {
            "car": random.randint(10, 50),
            "motorcycle": random.randint(5, 20),
            "truck": random.randint(1, 5)
        }
    }
    
    return {
        "status": "success",
        "message": "Datos actualizados exitosamente",
        "data": {
            "update_time": current_time.isoformat(),
            "action_requested": action,
            "actions_performed": actions_performed,
            "updated_by": current_user.username,
            "system_stats": system_stats,
            "database_version": "v2.1.3",
            "last_backup": (current_time - timedelta(hours=random.randint(1, 24))).isoformat(),
            "next_scheduled_update": (current_time + timedelta(hours=6)).isoformat(),
            "update_duration": f"{random.uniform(2.5, 8.7):.2f} seconds"
        }
    }

# CERRAR SESIÓN
@router.get("/close_session")
async def close_session(
    force_close: bool = False,
    current_user: User = Depends(get_current_user)
):
    """
    Cierra la sesión del usuario del sistema de parqueadero
    """
    
    current_time = datetime.now()
    
    # Simular información de la sesión actual
    session_duration = timedelta(hours=random.uniform(1, 8))
    session_start = current_time - session_duration
    
    # Simular actividad durante la sesión
    activities = [
        f"{random.randint(5, 25)} vehículos registrados",
        f"{random.randint(3, 20)} vehículos retirados", 
        f"{random.randint(1, 10)} facturas generadas",
        f"{random.randint(0, 5)} consultas de historial"
    ]
    
    return {
        "status": "success",
        "message": "Sesión cerrada exitosamente",
        "data": {
            "user": current_user.username,
            "session_start": session_start.isoformat(),
            "session_end": current_time.isoformat(),
            "session_duration": f"{session_duration.total_seconds() / 3600:.2f} hours",
            "activities_summary": activities,
            "force_closed": force_close,
            "logout_time": current_time.isoformat(),
            "next_login_available": "immediate",
            "session_data_saved": True,
            "goodbye_message": f"¡Hasta luego, {current_user.username}! Gracias por usar ParkSys"
        }
    }

# ENDPOINT ADICIONAL: Estado del parqueadero
@router.get("/status")
async def get_parking_status(current_user: User = Depends(get_current_user)):
    """
    Obtiene el estado actual del parqueadero
    """
    
    current_time = datetime.now()
    
    # Simular ocupación actual
    total_spots = {"car": 50, "motorcycle": 20, "truck": 5}
    occupied_spots = {
        "car": random.randint(15, 45),
        "motorcycle": random.randint(5, 18),
        "truck": random.randint(1, 4)
    }
    
    available_spots = {
        vehicle_type: total_spots[vehicle_type] - occupied_spots[vehicle_type]
        for vehicle_type in total_spots
    }
    
    occupancy_rate = sum(occupied_spots.values()) / sum(total_spots.values()) * 100
    
    return {
        "status": "success",
        "message": "Estado del parqueadero obtenido exitosamente",
        "data": {
            "timestamp": current_time.isoformat(),
            "parking_status": "operational",
            "total_spots": total_spots,
            "occupied_spots": occupied_spots,
            "available_spots": available_spots,
            "occupancy_rate": round(occupancy_rate, 2),
            "daily_revenue": random.randint(400000, 800000),
            "vehicles_today": sum(occupied_spots.values()) + random.randint(50, 150),
            "peak_hours": "14:00 - 18:00",
            "attendant_on_duty": current_user.username
        }
    }
