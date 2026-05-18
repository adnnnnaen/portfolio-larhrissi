import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { TechBadge } from "./TechBadge";

const STATUS_LABEL: Record<NonNullable<Project["status"]>, string> = {
  planned: "Planifié",
  "in-progress": "En cours",
};

export function ProjectCard({ project }: { project: Project }) {
  const statusLabel = project.status ? STATUS_LABEL[project.status] : undefined;

  return (
    <article className="group h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_0_0_1px_hsl(var(--accent)/0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight leading-snug group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight
            className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1"
            aria-hidden="true"
          />
        </div>

        {statusLabel && (
          <p className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-accent">
            <span
              className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
              aria-hidden="true"
            />
            {statusLabel}
          </p>
        )}

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {project.tagline}
        </p>

        <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
          {project.summary}
        </p>

        <ul
          className="mt-6 flex flex-wrap gap-1.5"
          aria-label="Stack technique"
        >
          {project.stack.map((tech) => (
            <li key={tech}>
              <TechBadge name={tech} />
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
