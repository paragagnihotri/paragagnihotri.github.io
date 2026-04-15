import type {
  Profile,
  Project,
  CertificationsData,
  BlogPost,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getProfile: () => fetchJSON<Profile>("/api/v1/profile"),
  getProjects: () => fetchJSON<Project[]>("/api/v1/projects"),
  getCertifications: () => fetchJSON<CertificationsData>("/api/v1/certifications"),
  getBlogPosts: () => fetchJSON<BlogPost[]>("/api/v1/blog"),
};
