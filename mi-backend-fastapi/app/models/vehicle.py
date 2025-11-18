from sqlalchemy import Column, Float, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Vehicle(Base):
    __tablename__ = "vehicles"
    
    id = Column(Integer, primary_key=True, index=True)
    license_plate = Column(String, index=True, nullable=False)  # 👈 quitamos unique=True

    owner_name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    vehicle_type = Column(String, nullable=False)  # 👈 guardará "carro" o "moto"

    is_inside = Column(Boolean, default=False)
    entry_time = Column(DateTime(timezone=True), server_default=func.now())
    exit_time = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    registration_value = Column(Float, default=0.0)
    status = Column(String, default="En parqueadero")

    # Relación con facturas
    invoices = relationship("Invoice", back_populates="vehicle")



    

