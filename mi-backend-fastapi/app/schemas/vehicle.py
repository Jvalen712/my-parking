from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class VehicleBase(BaseModel):
    license_plate: str
    owner_name: str
    phone: Optional[str] = None
    vehicle_type: str

class VehicleCreate(VehicleBase):
    pass

class VehicleResponse(VehicleBase):
    id: int
    is_inside: bool
    entry_time: Optional[datetime] = None
    exit_time: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True