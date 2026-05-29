import type {
  Profile,
  Project,
  CertificationsData,
  BlogPost,
} from "@/types";
import { profileData, projectsData, certificationsData } from "./data";
import { getBlogPosts } from "./blog";

export const api = {
  getProfile: async (): Promise<Profile> => profileData,
  getProjects: async (): Promise<Project[]> => projectsData,
  getCertifications: async (): Promise<CertificationsData> => certificationsData,
  getBlogPosts: async (): Promise<BlogPost[]> => await getBlogPosts(),
};
