import * as React from "react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
  className?: string;
};

export function CodeBlock({ code, language, title, className }: CodeBlockProps) {
  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card overflow-hidden",
        className
      )}
    >
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
            </span>
            {title && (
              <span className="font-mono text-xs text-muted-foreground ml-1">
                {title}
              </span>
            )}
          </div>
          {language && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
              {language}
            </span>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="font-mono text-foreground/90">
          {lines.map((line, i) => (
            <span key={i} className="grid grid-cols-[2rem_1fr]">
              <span
                className="text-muted-foreground/50 select-none"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
