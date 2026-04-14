import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from models.schemas import BlogPost
from typing import List

router = APIRouter()

DATA_DIR = Path(__file__).parent.parent / "data"


@router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts() -> List[BlogPost]:
    try:
        with open(DATA_DIR / "blog.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        posts = [BlogPost(**item) for item in data]
        # Sort by date descending (latest first)
        posts.sort(key=lambda x: x.date, reverse=True)
        return posts
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Blog data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str) -> BlogPost:
    try:
        with open(DATA_DIR / "blog.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        for item in data:
            if item["slug"] == slug:
                return BlogPost(**item)
        raise HTTPException(status_code=404, detail="Blog post not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
