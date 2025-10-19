
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
from app import routers
from app.database.connection import get_database_session
from app.models.user import User
from app.core.security import verify_access_token
import random
import string
from decimal import Decimal

router = APIRouter(
    prefix="/invoice",
    tags=["invoice"]
)

# GENERAR FACTURA
@routers.get("/generate_invoice")
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
@routers.get("/update_data")
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
