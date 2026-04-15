import { api } from "@/lib/api";
import BlogCard from "@/components/blog/BlogCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog — Parag Agnihotri",
  description: "Articles and thoughts on software engineering by Parag Agnihotri.",
};

export default async function BlogPage() {
  const posts = await api.getBlogPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-heading">Blog</h1>
      <p className="section-subheading">
        Writing about software, systems, and lessons learned along the way
      </p>

      {posts.length === 0 ? (
        <p className="text-brown-400 text-center py-20">No posts yet. Check back soon!</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
