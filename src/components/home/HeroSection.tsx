import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Github, Linkedin, Code, ArrowRight, Briefcase } from "lucide-react";

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

  return (
    <section className="mb-16">
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
        {name}
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
        Software Engineer with <strong>7+ YoE</strong> in the industry,
        specializes in Native <strong>Android Development</strong>.
      </p>
      <p className="text-lg text-slate-500 dark:text-slate-500 leading-relaxed max-w-2xl mt-4">
        I was a{" "}
        <strong>Google Certified Associate Android Developer (Kotlin) </strong>
        from 2019 until 2022. I'm passionate about creating innovative solutions
        and user-friendly mobile apps, and I'm always looking for the best ways
        to use technology to solve real-world problems.
      </p>

      {/* Social Links */}
      <div className="flex items-center gap-3 mt-8">
        {socialLinks.map((link) => (
          <Button key={link.href} variant="outline" size="icon" asChild>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.label}
            >
              <link.icon className="w-5 h-5" />
            </a>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Button asChild>
          <a href="/projects">
            View Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    </section>
  );
}
