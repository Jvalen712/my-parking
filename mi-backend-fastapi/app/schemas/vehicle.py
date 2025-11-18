from enum import Enum
from typing import Optional, List
from pydantic import BaseModel, ConfigDict
from datetime import datetime

# 🔹 Enum de tipos de vehículo en español
class VehicleType(str, Enum):
    carro = "carro"
    moto = "moto"

# 🔹 Schemas base
class VehicleBase(BaseModel):
    license_plate: str
    vehicle_type: VehicleType

    class Config:
        from_attributes = True


class VehicleCreate(BaseModel):
    license_plate: str
    vehicle_type: VehicleType  # 👈 obligatorio
    owner_name: Optional[str] = None
    phone: Optional[str] = None
    registration_value: Optional[float] = 0
    status: Optional[str] = "En parqueadero"


# 🔹 Respuesta de vehículo (para listados En parqueaderos y de hoy)
class VehicleResponse(BaseModel):
    id: int
    license_plate: str
    vehicle_type: VehicleType
    entry_time: str | None
    registration_value: float
    status: str
    exit_time: str | None

    # Campos de factura
    invoice_number: Optional[str] = None
    total_amount: float = 0
    parking_time: int = 0

    model_config = ConfigDict(from_attributes=True)


# 🔹 Mensajes de respuesta
class VehicleEntryResponseMessage(BaseModel):
    success: bool
    message: str
    id: int
    license_plate: str
    vehicle_type: str
    entry_time: datetime | None = None
    registration_value: float
    status: str
    exit_time: datetime | None = None

    # Campos de factura (pueden ser nulos si no se genera factura)
    invoice_number: Optional[str] = None
    total_amount: Optional[float] = 0
    parking_time: Optional[int] = 0

    class Config:
        from_attributes = True


class VehicleExitResponseMessage(BaseModel):
    success: bool
    message: str
    id: int
    license_plate: str
    vehicle_type: str
    entry_time: datetime
    exit_time: datetime
    status: str

    # Campos de factura
    invoice_number: Optional[str] = None
    total_amount: float
    parking_time: int

    class Config:
        from_attributes = True


class VehicleListResponseMessage(BaseModel):
    success: bool
    message: str
    vehicles: List[VehicleResponse]

    class Config:
        from_attributes = True


# 🔹 Historial de vehículos
class VehicleHistoryResponse(BaseModel):
    id: int
    license_plate: str
    vehicle_type: VehicleType
    entry_time: str | None
    registration_value: float
    status: str
    exit_time: str | None

    # Campos de factura
    invoice_number: Optional[str] = None
    total_amount: float = 0
    parking_time: int = 0

    model_config = ConfigDict(from_attributes=True)


class VehicleHistoryResponseMessage(BaseModel):
    success: bool
    message: str
    history: List[VehicleHistoryResponse]
