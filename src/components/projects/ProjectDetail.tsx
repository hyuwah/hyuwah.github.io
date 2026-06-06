import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Github, ArrowLeft, Play } from "lucide-react";
import ImageModal from "../ui/ImageModal";
import type { ReactNode } from "react";

interface Project {
  slug: string;
  data: {
    title: string;
    description: string;
    subtitle?: string;
    image?: string;
    type?: string;
    github?: string;
    link?: string;
    tech?: string[];
    starsBadge?: string;
    forksBadge?: string;
  };
}

interface ProjectDetailProps {
  project: Project;
  children: ReactNode;
}

export default function ProjectDetail({
  project,
  children,
}: ProjectDetailProps) {
  return (
    <>
      <nav className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <a href="/projects" className="inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </a>
        </Button>
      </nav>

      {project.data.image && (
        <div className="mb-8 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
          <ImageModal
            src={project.data.image}
            alt={project.data.title}
            className="w-full h-64 sm:h-80"
          />
        </div>
      )}

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {project.data.type && (
            <Badge variant="secondary">{project.data.type}</Badge>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
          {project.data.title}
        </h1>
        {project.data.subtitle && (
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-4">
            {project.data.subtitle}
          </p>
        )}

        {(project.data.starsBadge || project.data.forksBadge) && (
          <div className="flex items-center gap-3 mb-4">
            {project.data.starsBadge && (
              <img
                src={project.data.starsBadge}
                alt="GitHub stars"
                className="h-6"
                loading="lazy"
              />
            )}
            {project.data.forksBadge && (
              <img
                src={project.data.forksBadge}
                alt="GitHub forks"
                className="h-6"
                loading="lazy"
              />
            )}
          </div>
        )}
      </header>

      <div className="flex flex-wrap items-center gap-3 mb-8">
        {project.data.github && (
          <Button asChild>
            <a
              href={project.data.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </a>
          </Button>
        )}
        {project.data.link && (
          <Button variant="outline" asChild>
            <a
              href={project.data.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Play className="w-5 h-5 mr-2" />
              {project.data.link.includes("play.google.com")
                ? "Play Store"
                : "Live Demo"}
            </a>
          </Button>
        )}
      </div>

      {project.data.tech && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.data.tech.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      )}

      <hr className="border-slate-100 dark:border-slate-800 mb-8" />

      <article className="prose dark:prose-invert max-w-none">
        {children}
      </article>
    </>
  );
}
