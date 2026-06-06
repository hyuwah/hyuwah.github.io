import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Github, Play } from "lucide-react";

interface Project {
  slug: string;
  data: {
    title: string;
    description: string;
    tech?: string[];
    github?: string;
    link?: string;
  };
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="mb-16 animate-on-scroll">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-medium text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-2">
            Projects
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Featured Projects
          </h2>
        </div>
        <Button variant="ghost" asChild>
          <a href="/projects">
            View all
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card
            key={project.slug}
            className="relative group hover:shadow-md dark:shadow-slate-950 transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">
                    <a
                      href={`/projects/${project.slug}`}
                      className="hover:underline after:absolute after:inset-0 after:content-['']"
                    >
                      {project.data.title}
                    </a>
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2 relative z-10">
                  {project.data.github && (
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={project.data.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {project.data.link && (
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={project.data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Play className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {project.data.description}
              </p>
              {project.data.tech && (
                <div className="flex flex-wrap gap-2">
                  {project.data.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
