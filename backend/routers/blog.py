import re
import time
import hashlib
import asyncio
import email.utils
from typing import List, Optional

import httpx
import feedparser
from fastapi import APIRouter, HTTPException

from models.schemas import BlogPost

router = APIRouter()

MEDIUM_RSS_URL = "https://medium.com/feed/@paragagnihotri"
CACHE_TTL      = 3600  # seconds (1 hour)

_cache: dict = {"posts": [], "expires_at": 0.0}


def _extract_thumbnail(entry) -> Optional[str]:
    """Return the best thumbnail URL for a feed entry."""
    # feedparser sometimes parses media:thumbnail or media:content
    thumbnails = entry.get("media_thumbnail") or entry.get("media_content") or []
    if thumbnails:
        return thumbnails[0].get("url")

    # Fall back: first <img src="..."> in the full content HTML
    content_html = ""
    if entry.get("content"):
        content_html = entry["content"][0].get("value", "")
    elif entry.get("summary"):
        content_html = entry["summary"]

    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content_html)
    if match:
        return match.group(1)

    return None


def _parse_date(entry) -> str:
    """Return an ISO-8601 date string (YYYY-MM-DD)."""
    raw = entry.get("published") or entry.get("updated") or ""
    try:
        parsed = email.utils.parsedate_to_datetime(raw)
        return parsed.date().isoformat()
    except Exception:
        return raw[:10] if len(raw) >= 10 else ""


def _slug_from_url(url: str) -> str:
    """Extract the slug from a Medium article URL."""
    # e.g. https://medium.com/@user/some-title-abc123 → some-title-abc123
    path = url.split("?")[0].rstrip("/")
    return path.split("/")[-1]


def _entry_to_post(entry) -> BlogPost:
    url     = entry.get("link", "")
    slug    = _slug_from_url(url) or hashlib.md5(url.encode()).hexdigest()[:8]
    post_id = hashlib.md5(url.encode()).hexdigest()[:12]

    tags: List[str] = [
        tag.get("term", "") for tag in entry.get("tags", []) if tag.get("term")
    ]

    # Medium puts the subtitle / first paragraph in summary (HTML)
    raw_summary = entry.get("summary", "")
    description = re.sub(r"<[^>]+>", "", raw_summary).strip()[:400]

    return BlogPost(
        id          = post_id,
        title       = entry.get("title", "Untitled"),
        slug        = slug,
        url         = url,
        thumbnail   = _extract_thumbnail(entry),
        date        = _parse_date(entry),
        description = description,
        tags        = tags,
    )


async def _fetch_posts() -> List[BlogPost]:
    """Fetch and parse the Medium RSS feed asynchronously."""
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(MEDIUM_RSS_URL, follow_redirects=True)
        resp.raise_for_status()
        raw_xml = resp.text

    # feedparser is synchronous — run it off the event loop
    feed = await asyncio.to_thread(feedparser.parse, raw_xml)

    posts = [_entry_to_post(e) for e in feed.entries]
    posts.sort(key=lambda p: p.date, reverse=True)
    return posts


async def _get_cached_posts() -> List[BlogPost]:
    now = time.monotonic()
    if now < _cache["expires_at"] and _cache["posts"]:
        return _cache["posts"]

    posts = await _fetch_posts()
    _cache["posts"]      = posts
    _cache["expires_at"] = now + CACHE_TTL
    return posts


@router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts() -> List[BlogPost]:
    try:
        return await _get_cached_posts()
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail=f"Failed to fetch Medium feed: {exc}")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str) -> BlogPost:
    posts = await get_blog_posts()
    for post in posts:
        if post.slug == slug:
            return post
    raise HTTPException(status_code=404, detail="Blog post not found")
