import { Button } from "./ui/button";
import { Github, Linkedin, Code, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
      {/* Accent divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Main content: 3 columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Left: CTA */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Open to opportunities
            </p>
            <a
              href="mailto:hello@hyuwah.my.id"
              className="inline-flex items-center gap-1.5 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors group"
            >
              <Mail className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              hello@hyuwah.my.id
            </a>
          </div>

          {/* Center: Quick nav */}
          <nav className="flex flex-col gap-2 md:items-center">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Navigate
            </p>
            <div className="flex items-center gap-4">
              {["Projects", "Blog", "Work"].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="text-sm text-slate-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>

          {/* Right: Social links */}
          <div className="flex flex-col gap-2 md:items-end">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Connect
            </p>
            <div className="flex items-center gap-1">
              {[
                {
                  icon: Github,
                  href: "https://github.com/hyuwah",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/hyuwah/",
                  label: "LinkedIn",
                },
                { icon: Code, href: "https://dev.to/hyuwah", label: "DEV.to" },
              ].map(({ icon: Icon, href, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="w-9 h-9 rounded-full"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {currentYear} Muhamad Wahyudin
          </p>
        </div>
      </div>
    </footer>
  );
}
