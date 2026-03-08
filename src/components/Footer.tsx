import { Button } from "./ui/button";
import { Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-auto transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          &copy; {currentYear} Muhamad Wahyudin
        </p>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com/hyuwah"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
