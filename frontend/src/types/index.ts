export interface Skill {
  name: string;
  level?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
  logo?: string;
}

export interface Profile {
  name: string;
  title: string;
  quote: string;
  introduction: string;
  avatar?: string;
  experiences: Experience[];
  skills: SkillCategory[];
}

export interface Project {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
  github_url: string;
  contribution: string;
  tags?: string[];
}

export interface Badge {
  id: string;
  title: string;
  issuer: string;
  badge_url: string;
  public_link: string;
  exam_link: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  credential_id: string;
  credential_url: string;
  issue_date: string;
  exam_link: string;
  thumbnail?: string;
}

export interface CertificationsData {
  badges: Badge[];
  certificates: Certificate[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  date: string;
  description: string;
  content?: string;
  tags?: string[];
}
