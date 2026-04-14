import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from models.schemas import Profile

router = APIRouter()

DATA_DIR = Path(__file__).parent.parent / "data"


@router.get("/profile", response_model=Profile)
async def get_profile() -> Profile:
    try:
        with open(DATA_DIR / "profile.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        return Profile(**data)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Profile data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
