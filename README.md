# My Parking — Sistema de Gestión de Parqueadero

**My Parking** es una aplicación web para la gestión de parqueaderos, compuesta por un **frontend en React** y un **backend en FastAPI**.  
Permite registrar entradas y salidas de vehículos, generar facturas, visualizar estadísticas en tiempo real y consultar historial de actividad.

## Tecnologías utilizadas

- Frontend: React + Vite  
- Backend: FastAPI + SQLAlchemy  
- Base de datos: SQLite / PostgreSQL  
- Estilos: CSS (paleta blanco, negro, amarillo)

## Estructura del proyecto

my-parking/ ├── backend/ ├── frontend/ └── README.md

## Instalación

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn run:app --reload

### frontend
cd frontend
npm install
npm run dev