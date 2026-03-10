import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Briefcase, ArrowRight } from "lucide-react";

interface WorkItem {
  data: {
    company: string;
    companyLogo?: string | undefined;
    order?: number | undefined;
  };
}

interface ExperienceProps {
  work: WorkItem[];
}

export default function Experience({ work }: ExperienceProps) {
  const companyCount = new Set(work.map((w) => w.data.company)).size;

  // Get top 4 companies with logos
  const companies = work
    .filter((w) => w.data.companyLogo)
    .sort((a, b) => (b.data.order || 0) - (a.data.order || 0))
    .slice(0, 4);

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Experience
        </h2>
        <Button variant="ghost" asChild>
          <a href="/work">
            View all
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      {/* Company Logos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {companies.map((item) => (
          <a
            key={item.data.company}
            href="/work"
            className="group flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {item.data.companyLogo && (
              <img
                src={item.data.companyLogo}
                alt={item.data.company}
                className="h-auto w-auto rounded-md object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              />
            )}
            <p className="text-center mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              {item.data.company}
            </p>
          </a>
        ))}
      </div>

      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                {work.length} positions across {companyCount} companies
              </p>
              <p className="text-slate-900 dark:text-slate-100 font-medium">
                View work history
              </p>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <a href="/work">
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
