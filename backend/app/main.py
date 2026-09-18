from fastapi import FastAPI

from app.database import Base, engine
from app.models import Indicator
from app.routes.indicators import router as indicators_router


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="SentinelSOC",
    description="Automated Threat Intelligence Aggregator & OSINT Analytics Dashboard",
    version="0.1.0"
)


# Register API routes
app.include_router(indicators_router)


@app.get("/")
def root():
    return {
        "message": "SentinelSOC API is running",
        "version": "0.1.0"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }
