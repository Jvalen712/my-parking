from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth  # ← AGREGAR

app = FastAPI(
    title="Parking System API",
    description="API for parking system management",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas de autenticación
app.include_router(auth.router, prefix="/api/v1")  # ← AGREGAR

@app.get("/")
async def root():
    return {"message": "Parking System API working!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "parking-system-api"}
