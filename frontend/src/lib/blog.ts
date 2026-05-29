import type { BlogPost } from "@/types";
import crypto from "crypto";

const MEDIUM_RSS_URL = "https://medium.com/feed/@paragagnihotri";
const CACHE_TTL = 3600; // 1 hour in seconds

let cache: {
  posts: BlogPost[];
  expiresAt: number;
} = {
  posts: [],
  expiresAt: 0,
};

function extractThumbnail(itemXml: string): string | undefined {
  // Try to find media:thumbnail
  const mediaThumbnailMatch = itemXml.match(/media:thumbnail[^>]*url=["']([^"']+)["']/);
  if (mediaThumbnailMatch) {
    return mediaThumbnailMatch[1];
  }

  // Try to find first <img src="..."> in content
  const imgMatch = itemXml.match(/<img[^>]+src=["']([^"']+)["']/);
  if (imgMatch) {
    return imgMatch[1];
  }

  return undefined;
}

function parseDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch {
    return dateString.substring(0, 10) || "";
  }
}

function slugFromUrl(urlString: string): string {
  const path = urlString.split("?")[0].replace(/\/$/, "");
  return path.split("/").pop() || "";
}

function hashString(str: string, length: number): string {
  return crypto.createHash("md5").update(str).digest("hex").substring(0, length);
}

function entryToPost(itemXml: string): BlogPost | null {
  // Extract link
  const linkMatch = itemXml.match(/<link[^>]*>([^<]+)<\/link>/);
  const urlString = linkMatch ? linkMatch[1].trim() : "";

  if (!urlString) return null;

  const slug = slugFromUrl(urlString) || hashString(urlString, 8);
  const postId = hashString(urlString, 12);

  // Extract title
  const titleMatch = itemXml.match(/<title[^>]*>(?:<!\[CDATA\[(.*?)\]\]>|([^<]+))<\/title>/);
  const title = titleMatch ? (titleMatch[1] || titleMatch[2] || "Untitled") : "Untitled";

  // Extract published date
  const pubDateMatch = itemXml.match(/<pubDate>([^<]+)<\/pubDate>/);
  const date = pubDateMatch ? parseDate(pubDateMatch[1]) : "";

  // Extract description
  const descriptionMatch = itemXml.match(/<description[^>]*>(?:<!\[CDATA\[(.*?)\]\]>|([^<]+))<\/description>/);
  let rawDescription = descriptionMatch ? (descriptionMatch[1] || descriptionMatch[2] || "") : "";
  const description = rawDescription
    .replace(/<[^>]+>/g, "")
    .trim()
    .substring(0, 400);

  // Extract tags/categories
  const tags: string[] = [];
  const categoryMatches = itemXml.matchAll(/<category[^>]*>([^<]*)<\/category>/g);
  for (const match of categoryMatches) {
    if (match[1]) {
      tags.push(match[1]);
    }
  }

  return {
    id: postId,
    title: title.trim(),
    slug: slug,
    url: urlString,
    thumbnail: extractThumbnail(itemXml),
    date: date,
    description: description,
    tags: tags,
  };
}

async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(MEDIUM_RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const rawXml = await response.text();

    // Parse RSS/Atom feed manually
    const posts: BlogPost[] = [];

    // Extract all items
    const itemRegex = /<item[\s\S]*?<\/item>/g;
    const items = rawXml.match(itemRegex) || [];

    items.forEach((itemXml) => {
      const post = entryToPost(itemXml);
      if (post) {
        posts.push(post);
      }
    });

    // Sort by date (newest first)
    posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return posts;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

async function getCachedPosts(): Promise<BlogPost[]> {
  const now = Date.now() / 1000; // Convert to seconds
  if (now < cache.expiresAt && cache.posts.length > 0) {
    return cache.posts;
  }

  const posts = await fetchPosts();
  cache.posts = posts;
  cache.expiresAt = now + CACHE_TTL;
  return posts;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getCachedPosts();
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}
