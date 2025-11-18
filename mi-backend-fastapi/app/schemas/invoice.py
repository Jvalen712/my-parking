from pydantic import BaseModel
from datetime import datetime

# 🔹 Para crear una factura (POST)
class InvoiceCreate(BaseModel):
    vehicle_id: int
    user_id: int | None = None
    total_amount: float
    parking_time: int

# 🔹 Para responder al frontend (GET, POST)
class VehicleSummary(BaseModel):
    license_plate: str
    vehicle_type: str

    class Config:
        from_attributes = True

class InvoiceResponse(BaseModel):
    id: int
    invoice_number: str
    date: datetime
    total_amount: float
    parking_time: int
    vehicle: VehicleSummary

    class Config:
       from_attributes = True
