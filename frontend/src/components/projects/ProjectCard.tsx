import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className="card flex flex-col overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-brown-100 overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-beige-100 to-brown-200">
            <span className="font-serif text-4xl font-bold text-brown-300">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-serif text-xl font-semibold text-brown-900 mb-2 leading-snug">
          {project.title}
        </h3>

        <p className="text-brown-600 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Contribution */}
        <div className="bg-beige-100 rounded-xl p-4 mb-5 border border-beige-200">
          <p className="text-xs font-semibold text-brown-500 uppercase tracking-widest mb-1.5">
            My Contribution
          </p>
          <p className="text-brown-700 text-sm leading-relaxed">
            {project.contribution}
          </p>
        </div>

        {/* Actions */}
        <a
          href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center"
        >
          <Github size={16} />
          View on GitHub
          <ExternalLink size={14} className="ml-auto opacity-60" />
        </a>
      </div>
    </article>
  );
}
