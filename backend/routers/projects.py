import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from models.schemas import Project
from typing import List

router = APIRouter()

DATA_DIR = Path(__file__).parent.parent / "data"


@router.get("/projects", response_model=List[Project])
async def get_projects() -> List[Project]:
    try:
        with open(DATA_DIR / "projects.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        return [Project(**item) for item in data]
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Projects data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str) -> Project:
    try:
        with open(DATA_DIR / "projects.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        for item in data:
            if item["id"] == project_id:
                return Project(**item)
        raise HTTPException(status_code=404, detail="Project not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
