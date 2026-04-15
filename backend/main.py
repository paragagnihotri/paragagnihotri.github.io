from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from routers import home, projects, certifications, blog

load_dotenv()

app = FastAPI(
    title="Portfolio API",
    description="Backend API for personal portfolio website",
    version="1.0.0",
)

# CORS configuration — restrict in production to your frontend domain
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Register routers
app.include_router(home.router, prefix="/api/v1", tags=["Profile"])
app.include_router(projects.router, prefix="/api/v1", tags=["Projects"])
app.include_router(certifications.router, prefix="/api/v1", tags=["Certifications"])
app.include_router(blog.router, prefix="/api/v1", tags=["Blog"])


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}
