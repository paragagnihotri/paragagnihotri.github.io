import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from models.schemas import CertificationsResponse

router = APIRouter()

DATA_DIR = Path(__file__).parent.parent / "data"


@router.get("/certifications", response_model=CertificationsResponse)
async def get_certifications() -> CertificationsResponse:
    try:
        with open(DATA_DIR / "certifications.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        return CertificationsResponse(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Certifications data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
