import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import { profile } from "@/data/profile";
import { ProjectDeepDive } from "@/components/projects/ProjectDeepDive";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Projet introuvable" };
  }

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} · ${profile.name}`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }
  return <ProjectDeepDive project={project} />;
}
