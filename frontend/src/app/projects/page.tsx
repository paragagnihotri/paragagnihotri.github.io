import { api } from "@/lib/api";
import ProjectCard from "@/components/projects/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects — Parag Agnihotri",
  description: "A showcase of projects built by Parag Agnihotri.",
};

export default async function ProjectsPage() {
  const projects = await api.getProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="section-heading">My Projects</h1>
      <p className="section-subheading">
        Things I&apos;ve built — side projects, open-source work, and professional highlights
      </p>

      {projects.length === 0 ? (
        <p className="text-brown-400 text-center py-20">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
