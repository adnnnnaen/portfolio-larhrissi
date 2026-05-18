import Link from "next/link";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DecorativeCode } from "@/components/shared/DecorativeCode";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-3.5rem)] flex items-center pt-20 pb-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-spotlight pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)] pointer-events-none"
      />

      <div className="container relative grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {"// ingénieur systèmes embarqués"}
          </p>

          <h1 className="text-display-xl font-semibold text-balance">
            <span className="text-muted-foreground">Salut, moi c'est</span>
            <br />
            <span className="text-foreground">Mohamed Adnane</span>
            <span className="text-accent">.</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-balance">
            Je conçois du{" "}
            <span className="text-foreground font-medium">firmware</span>, du{" "}
            <span className="text-foreground font-medium">RTOS</span> et du{" "}
            <span className="text-foreground font-medium">Linux embarqué</span>{" "}
            — j'aime comprendre la machine, du transistor à l'OS.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="#projects"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Voir mes projets
              <ArrowDown className="h-4 w-4" />
            </Link>
            <Link
              href={profile.cvPath}
              download
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <Download className="h-4 w-4" />
              Télécharger mon CV
            </Link>
          </div>

          <div className="flex items-center gap-1 pt-4">
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

        <div className="hidden lg:block">
          <DecorativeCode />
        </div>
      </div>
    </section>
  );
}
