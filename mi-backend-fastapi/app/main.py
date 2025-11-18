from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, invoice, vehicles # Importamos también las rutas de vehículos

app = FastAPI(
    title="Parking System API",
    description="API for parking system management",
    version="1.0.0"
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(invoice.router, prefix="/api/v1/invoices", tags=["Invoices"])
app.include_router(vehicles.router, prefix="/api/v1/vehicles", tags=["Vehicles"])

# 🌐 Rutas base
@app.get("/")
async def root():
    return {"message": " Parking System API working!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "parking-system-api"}

