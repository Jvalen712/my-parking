from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.connection import Base

class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    invoice_number = Column(String, unique=True, index=True, nullable=False)
    date = Column(DateTime(timezone=True), server_default=func.now())  # 👈 más consistente con Vehicle

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)

    total_amount = Column(Float, nullable=False)
    parking_time = Column(Integer, nullable=False)

    # Relaciones
    vehicle = relationship("Vehicle", back_populates="invoices")





