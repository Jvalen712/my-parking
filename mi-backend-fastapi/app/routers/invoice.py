from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.database.connection import get_database_session
from app.models.invoice import Invoice
from app.schemas.invoice import InvoiceCreate, InvoiceResponse

router = APIRouter(prefix="/invoices", tags=["Invoices"])

def generate_invoice_number(db: Session):
    today_str = datetime.now().strftime("%Y%m%d")
    last_invoice = (
        db.query(Invoice)
        .filter(Invoice.invoice_number.like(f"{today_str}%"))
        .order_by(Invoice.id.desc())
        .first()
    )

    sequence = 1
    if last_invoice:
        try:
            last_seq = int(last_invoice.invoice_number.split("-")[-1])
            sequence = last_seq + 1
        except ValueError:
            sequence = 1  # fallback en caso de formato inesperado

    return f"{today_str}-{sequence:03d}"

@router.post("/create")
def create_invoice(data: InvoiceCreate, db: Session = Depends(get_database_session)):
    try:
        invoice_number = generate_invoice_number(db)
        invoice = Invoice(
            invoice_number=invoice_number,
            vehicle_id=data.vehicle_id,
            user_id=data.user_id,
            total_amount=data.total_amount,
            parking_time=data.parking_time,
        )
        db.add(invoice)
        db.commit()
        db.refresh(invoice)

        return {
            "success": True,
            "message": "Factura generada correctamente",
            "invoice": InvoiceResponse.from_orm(invoice)
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error al generar la factura: {str(e)}")

@router.get("/", response_model=list[InvoiceResponse])
def list_invoices(db: Session = Depends(get_database_session)):
    return db.query(Invoice).all()
