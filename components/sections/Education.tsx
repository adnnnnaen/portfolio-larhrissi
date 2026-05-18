import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { education } from "@/data/education";

export function Education() {
  return (
    <AnimatedSection id="education" className="container py-24">
      <SectionHeading index="05" title="Formation" />

      <div className="grid md:grid-cols-2 gap-4">
        {education.map((entry, i) => (
          <div
            key={`${entry.school}-${i}`}
            className="rounded-lg border border-border bg-card p-6"
          >
            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              {entry.period}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground leading-tight">
              {entry.school}
            </h3>
            <p className="mt-1 text-muted-foreground">{entry.degree}</p>
            <p className="mt-3 font-mono text-xs text-muted-foreground/70">
              {entry.location}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
