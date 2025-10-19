import uvicorn
from app.database.create_tables import create_tables

if __name__ == "__main__":
    create_tables()
    
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )