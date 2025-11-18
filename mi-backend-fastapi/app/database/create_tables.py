from app.database.connection import engine, Base
from app.models.vehicle import Vehicle
from app.models.user import User  # ← AGREGAR
from app.models.invoice import Invoice  # ✅ necesario para que SQLAlchemy registre la tabla

def create_tables():
    Base.metadata.create_all(bind=engine)
    print("✅ Tablas creadas correctamente")

def create_tables():
    try:
        Base.metadata.create_all(bind=engine)
        print(" Tables created successfully!")
    except Exception as e:
        print(f" Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()