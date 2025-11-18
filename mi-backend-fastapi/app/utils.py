from datetime import datetime
from sqlalchemy.orm import Session
from app.models.invoice import Invoice

# ✅ Generar número de factura único (fecha + consecutivo)
def generate_invoice_number(db: Session) -> str:
    today_str = datetime.now().strftime("%Y%m%d")
    # Buscar último consecutivo del día
    last_invoice = (
        db.query(Invoice)
        .filter(Invoice.invoice_number.like(f"{today_str}%"))
        .order_by(Invoice.id.desc())
        .first()
    )
    if last_invoice:
        last_number = int(last_invoice.invoice_number[-4:])
        new_number = str(last_number + 1).zfill(4)
    else:
        new_number = "0001"
    return f"{today_str}{new_number}"

# ✅ Calcular valor base según tipo de vehículo
def calculate_registration_value(vehicle_type: str) -> int:
    vt = vehicle_type.lower()
    if vt in ["carro", "car"]:
        return 3000
    elif vt in ["moto", "motorcycle"]:
        return 2000
    return 0
