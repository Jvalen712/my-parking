from app.database.connection import engine, Base
from app.models.vehicle import Vehicle
from app.models.user import User  # ← AGREGAR

def create_tables():
    try:
        Base.metadata.create_all(bind=engine)
        print(" Tables created successfully!")
    except Exception as e:
        print(f" Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()