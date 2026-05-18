import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TechBadge } from "@/components/projects/TechBadge";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <AnimatedSection id="skills" className="container py-24">
      <SectionHeading index="04" title="Compétences techniques" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-border bg-card p-5"
          >
            <h3 className="font-mono text-xs text-accent uppercase tracking-wider mb-4">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <TechBadge name={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
