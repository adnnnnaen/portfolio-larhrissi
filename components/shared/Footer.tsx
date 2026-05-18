import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="container py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-mono text-xs text-muted-foreground">
          © {year} — {profile.name}
        </p>

        <div className="flex items-center gap-1">
          <Link
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-accent transition-colors"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-accent transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <Link
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-accent transition-colors"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
