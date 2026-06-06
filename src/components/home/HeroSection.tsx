import { Button } from "../ui/button";
import { Github, Linkedin, Code, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  name: string;
}

export default function HeroSection({ name }: HeroSectionProps) {
  const socialLinks = [
    { href: "https://github.com/hyuwah", icon: Github, label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/hyuwah/",
      icon: Linkedin,
      label: "LinkedIn",
    },
    { href: "https://dev.to/hyuwah", icon: Code, label: "DEV.to" },
  ];

  // Split name for accent treatment: "Muhamad" + "Wahyudin"
  const nameParts = name.split(" ");
  const firstName = nameParts.slice(0, -1).join(" ");
  const lastName = nameParts[nameParts.length - 1];

  return (
    <section className="mb-16 space-y-8">
      {/* Name & Tagline */}
      <div className="space-y-4">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          {firstName}{" "}
          <span className="text-accent-600 dark:text-accent-500">
            {lastName}
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-medium max-w-2xl">
          I build polished Android experiences with{" "}
          <span className="text-accent-600 dark:text-accent-500">
            Kotlin &amp; Jetpack Compose
          </span>
          .
        </p>
      </div>

      {/* Expanded Bio */}
      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
        Software Engineer with <strong>7+ years of experience</strong> crafting
        native Android applications. Google Certified Associate Android
        Developer (2019–2022). Passionate about clean architecture, smooth
        animations, and turning complex problems into intuitive mobile
        experiences.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild size="lg">
          <a href="/projects">
            View Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      {/* Social Links — Labeled */}
      <div className="flex flex-wrap items-center gap-3">
        {socialLinks.map((link) => (
          <Button key={link.href} variant="outline" asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.label}</span>
            </a>
          </Button>
        ))}
      </div>
    </section>
  );
}
