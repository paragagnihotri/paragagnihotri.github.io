import type {
  Profile,
  Project,
  CertificationsData,
  BlogPost,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not set.");
}

async function fetchJSON<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`API error ${res.status} fetching ${url}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getProfile: () => fetchJSON<Profile>("/api/v1/profile"),
  getProjects: () => fetchJSON<Project[]>("/api/v1/projects"),
  getCertifications: () => fetchJSON<CertificationsData>("/api/v1/certifications"),
  getBlogPosts: () => fetchJSON<BlogPost[]>("/api/v1/blog"),
};
