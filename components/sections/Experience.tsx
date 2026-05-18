import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TechBadge } from "@/components/projects/TechBadge";
import { experiences } from "@/data/experiences";

export function Experience() {
  return (
    <AnimatedSection id="experience" className="container py-24">
      <SectionHeading
        index="03"
        title="Expérience"
        subtitle="Trois expériences, du logiciel embarqué Linux au C++ avec CI/CD industriel."
      />

      <ol className="relative border-l border-border ml-3 md:ml-4 space-y-12">
        {experiences.map((exp, i) => (
          <li key={`${exp.company}-${i}`} className="relative pl-8 md:pl-10">
            <span
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background"
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                {exp.role}
              </h3>
              <span className="text-muted-foreground">·</span>
              <span className="text-accent font-medium">{exp.company}</span>
            </div>

            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {exp.period} · {exp.location}
            </p>

            <p className="mt-3 text-muted-foreground leading-relaxed">
              {exp.summary}
            </p>

            <ul className="mt-4 space-y-1.5">
              {exp.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed"
                >
                  <span
                    className="font-mono text-accent text-xs mt-1.5 flex-shrink-0"
                    aria-hidden="true"
                  >
                    ▹
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {exp.stack && exp.stack.length > 0 && (
              <ul
                className="mt-5 flex flex-wrap gap-1.5"
                aria-label="Stack"
              >
                {exp.stack.map((tech) => (
                  <li key={tech}>
                    <TechBadge name={tech} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </AnimatedSection>
  );
}
