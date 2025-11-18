
```markdown
# My Parking — Backend FastAPI

Este es el backend del sistema My Parking, desarrollado con FastAPI y SQLAlchemy.

## Tecnologías

- FastAPI  
- SQLAlchemy  
- Alembic  
- SQLite / PostgreSQL  
- Uvicorn

## Instalación

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn run:app --reload

## Endpoints principales
POST /entry/{license_plate}

PUT /exit/{license_plate}

GET /active

GET /today

GET /history

backend/
├── app/
├── alembic/
├── parking.db
├── requirements.txt
└── run.py
