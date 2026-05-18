import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <AnimatedSection id="projects" className="container py-24">
      <SectionHeading
        index="02"
        title="Projets"
        subtitle="Trois projets personnels qui condensent ce qui me motive : du firmware bas niveau, un émulateur CPU, et un dialogue capteur-MCU-dashboard."
      />

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </AnimatedSection>
  );
}
