from pydantic import BaseModel
from typing import Optional, List


class Experience(BaseModel):
    company: str
    role: str
    start_date: str
    end_date: str
    description: str
    logo: Optional[str] = None


class Skill(BaseModel):
    name: str
    level: Optional[str] = None


class SkillCategory(BaseModel):
    category: str
    skills: List[Skill]


class Education(BaseModel):
    institution: str
    degree: str
    specialization: str
    start_date: str
    end_date: str


class Profile(BaseModel):
    name: str
    title: str
    quote: str
    introduction: str
    avatar: Optional[str] = None
    experiences: List[Experience]
    education: List[Education]
    skills: List[SkillCategory]


class Project(BaseModel):
    id: str
    title: str
    thumbnail: Optional[str] = None
    description: str
    github_url: str
    contribution: str
    tags: Optional[List[str]] = []


class Badge(BaseModel):
    id: str
    title: str
    issuer: str
    badge_url: str
    public_link: str
    exam_link: str


class Certificate(BaseModel):
    id: str
    title: str
    issuer: str
    credential_id: str
    credential_url: str
    issue_date: str
    exam_link: str
    thumbnail: Optional[str] = None


class CertificationsResponse(BaseModel):
    badges: List[Badge]
    certificates: List[Certificate]


class BlogPost(BaseModel):
    id: str
    title: str
    slug: str
    url: Optional[str] = None
    thumbnail: Optional[str] = None
    date: str
    description: str
    content: Optional[str] = None
    tags: Optional[List[str]] = []
