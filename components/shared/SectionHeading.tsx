import * as React from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function SectionHeading({
  index,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-accent">{index}.</span>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <div
          className="hidden sm:block flex-1 h-px bg-border ml-4 translate-y-[-4px]"
          aria-hidden="true"
        />
      </div>
      {subtitle && (
        <p className="mt-3 text-muted-foreground max-w-2xl text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}
