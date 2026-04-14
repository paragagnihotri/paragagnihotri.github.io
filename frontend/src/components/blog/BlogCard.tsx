import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";

interface Props {
  post: BlogPost;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ post }: Props) {
  return (
    <article className="card flex flex-col sm:flex-row overflow-hidden group">
      {/* Thumbnail */}
      <div className="sm:w-56 sm:flex-shrink-0 h-44 sm:h-auto relative bg-brown-100 overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige-100 to-brown-200">
            <span className="font-serif text-4xl font-bold text-brown-300">
              {post.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-serif text-xl font-semibold text-brown-900 mb-2 leading-snug group-hover:text-brown-700 transition-colors">
          {post.title}
        </h3>

        <div className="flex items-center gap-1.5 text-brown-400 text-xs mb-3">
          <CalendarDays size={13} />
          {formatDate(post.date)}
        </div>

        <p className="text-brown-600 text-sm leading-relaxed flex-1">
          {post.description}
        </p>

        <div className="mt-4 pt-4 border-t border-brown-100">
          <span className="inline-flex items-center gap-1.5 text-brown-600 text-sm font-medium group-hover:text-brown-900 transition-colors cursor-pointer">
            Read more
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
