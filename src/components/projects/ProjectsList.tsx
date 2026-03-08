import { Card, CardContent } from "../ui/card";
import { Badge, badgeVariants } from "../ui/badge";
import { Github, ExternalLink, Code, Play } from "lucide-react";
import ImageModal from "../ui/ImageModal";

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
    featured?: boolean;
    starsBadge?: string;
    forksBadge?: string;
    order?: number;
  };
}

interface ProjectsListProps {
  featuredProjects: Project[];
  otherProjects: Project[];
}

export default function ProjectsList({
  featuredProjects,
  otherProjects,
}: ProjectsListProps) {
  return (
    <>
      {featuredProjects.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <Card
                key={project.slug}
                className="group overflow-hidden hover:shadow-lg dark:hover:shadow-slate-800/50 transition-all border-0 bg-gray-50 dark:bg-slate-800"
              >
                {project.data.image && (
                  <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-slate-700">
                    <ImageModal
                      src={project.data.image}
                      alt={project.data.title}
                      className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.data.type && (
                      <Badge
                        className="absolute top-3 left-3"
                        variant="secondary"
                      >
                        {project.data.type}
                      </Badge>
                    )}
                  </div>
                )}

                <CardContent
                  onClick={() =>
                    (window.location.href = `/projects/${project.slug}`)
                  }
                  className="p-4"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <a href={`/projects/${project.slug}`} className="block">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 dark:text-gray-300 dark:group-hover:text-gray-400">
                          {project.data.title}
                        </h3>
                      </a>
                      {project.data.subtitle && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {project.data.subtitle}
                        </p>
                      )}
                      {(project.data.starsBadge || project.data.forksBadge) && (
                        <div className="flex items-center gap-2 mt-2">
                          {project.data.starsBadge && (
                            <img
                              src={project.data.starsBadge}
                              alt="GitHub stars"
                              className="h-5"
                              loading="lazy"
                            />
                          )}
                          {project.data.forksBadge && (
                            <img
                              src={project.data.forksBadge}
                              alt="GitHub forks"
                              className="h-5"
                              loading="lazy"
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pt-1 pr-1">
                      {project.data.github && (
                        <a
                          href={project.data.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          title="View on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.data.link && (
                        <a
                          href={project.data.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          title="View Live"
                        >
                          <Play className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.data.description}
                  </p>

                  {project.data.tech && (
                    <div className="flex flex-wrap gap-2">
                      {project.data.tech.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.data.tech.length > 4 && (
                        <Badge
                          variant="outline"
                          className="text-xs text-gray-500"
                        >
                          +{project.data.tech.length - 4} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-6">
            Other Projects
          </h2>
          <div className="grid gap-4">
            {otherProjects.map((project) => (
              <Card
                key={project.slug}
                className="group hover:bg-gray-50 dark:hover:bg-slate-800/50 pl-4 pr-4 transition-colors border-0 shadow-none bg-transparent"
              >
                <a
                  href={`/projects/${project.slug}`}
                  className="flex items-start gap-4 p-4 -mx-4 rounded-xl transition-colors"
                >
                  {project.data.image ? (
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-slate-700">
                      <ImageModal
                        src={project.data.image}
                        alt={project.data.title}
                        className="w-20 h-20"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 shrink-0 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                      <Code className="w-8 h-8" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                          {project.data.title}
                        </h3>
                        {project.data.subtitle && (
                          <p className="text-sm text-gray-500">
                            {project.data.subtitle}
                          </p>
                        )}
                        {(project.data.starsBadge ||
                          project.data.forksBadge) && (
                          <div className="flex items-center gap-2 mt-1">
                            {project.data.starsBadge && (
                              <img
                                src={project.data.starsBadge}
                                alt="GitHub stars"
                                className="h-4"
                                loading="lazy"
                              />
                            )}
                            {project.data.forksBadge && (
                              <img
                                src={project.data.forksBadge}
                                alt="GitHub forks"
                                className="h-4"
                                loading="lazy"
                              />
                            )}
                          </div>
                        )}
                      </div>
                      {project.data.type && (
                        <span className="text-xs text-gray-400 shrink-0">
                          {project.data.type}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-500 line-clamp-2 mb-2">
                      {project.data.description}
                    </p>

                    {project.data.tech && (
                      <div className="flex flex-wrap gap-1">
                        {project.data.tech.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs py-0 h-5"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <ExternalLink className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors shrink-0 mt-1" />
                </a>
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
