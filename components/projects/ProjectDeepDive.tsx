import Link from "next/link";
import { ArrowLeft, Github, Play } from "lucide-react";
import type { Project } from "@/lib/types";
import { TechBadge } from "./TechBadge";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { Separator } from "@/components/ui/separator";

const STATUS_LABEL: Record<NonNullable<Project["status"]>, string> = {
  planned: "Projet planifié",
  "in-progress": "Projet en cours",
};

const STATUS_DESCRIPTION: Record<NonNullable<Project["status"]>, string> = {
  planned:
    "Ce projet est en phase de spécification. Les choix d'architecture et le plan d'implémentation décrits ci-dessous sont issus du document de conception ; il ne sont pas encore réalisés.",
  "in-progress":
    "Ce projet est en cours d'implémentation à partir d'un document de conception détaillé. Les choix d'architecture décrits ci-dessous sont stabilisés.",
};

export function ProjectDeepDive({ project }: { project: Project }) {
  const Diagram = project.deepDive.diagram;
  const statusLabel = project.status ? STATUS_LABEL[project.status] : undefined;

  return (
    <article className="container max-w-3xl pt-24 pb-24">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span className="font-mono">Retour aux projets</span>
      </Link>

      <header className="mb-12">
        <p className="font-mono text-xs text-accent uppercase tracking-wider mb-3">
          Projet personnel
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-balance">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-balance">
          {project.tagline}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack technique">
          {project.stack.map((tech) => (
            <li key={tech}>
              <TechBadge name={tech} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="font-mono">Voir le repo</span>
            </Link>
          )}
          {project.videoUrl && (
            <Link
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors"
            >
              <Play className="h-4 w-4" />
              <span className="font-mono">Démo vidéo</span>
            </Link>
          )}
        </div>
      </header>

      {statusLabel && project.status && (
        <aside
          role="status"
          className="mb-12 rounded-lg border border-accent/30 bg-accent/5 p-5"
        >
          <p className="font-mono text-xs uppercase tracking-wider text-accent flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            {statusLabel}
          </p>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
            {STATUS_DESCRIPTION[project.status]}
          </p>
        </aside>
      )}

      <Section title="Problème">
        <p>{project.deepDive.problem}</p>
      </Section>

      <Section title="Architecture">
        <p>{project.deepDive.architecture}</p>
        {Diagram && (
          <div className="mt-8 rounded-lg border border-border bg-card p-6 overflow-hidden">
            <Diagram className="w-full h-auto" />
          </div>
        )}
      </Section>

      {project.highlights.length > 0 && (
        <Section title="Points clés">
          <ul className="space-y-1.5">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-foreground/90 leading-relaxed"
              >
                <span
                  className="font-mono text-accent text-xs mt-1.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  ▹
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.deepDive.decisions.length > 0 && (
        <Section title="Décisions techniques">
          <div className="space-y-6">
            {project.deepDive.decisions.map((d, i) => (
              <div key={d.title}>
                <h3 className="font-semibold text-foreground leading-tight">
                  <span className="font-mono text-accent text-sm mr-2">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {d.title}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {project.deepDive.codeSnippet && (
        <Section title="Extrait de code">
          <CodeBlock
            code={project.deepDive.codeSnippet.code}
            language={project.deepDive.codeSnippet.language}
            title={project.deepDive.codeSnippet.title}
          />
        </Section>
      )}

      {project.deepDive.learnings.length > 0 && (
        <Section title="Ce que j'ai appris">
          <ul className="space-y-1.5">
            {project.deepDive.learnings.map((l) => (
              <li
                key={l}
                className="flex items-start gap-3 text-foreground/90 leading-relaxed"
              >
                <span
                  className="font-mono text-accent text-xs mt-1.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  ▹
                </span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Separator className="my-12" />

      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span className="font-mono">Tous les projets</span>
      </Link>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
        {title}
      </h2>
      <div className="text-foreground/90 leading-relaxed">{children}</div>
    </section>
  );
}
