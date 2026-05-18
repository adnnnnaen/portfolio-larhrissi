import * as React from "react";
import { cn } from "@/lib/utils";

const RISCV_LINES = [
  "    .text",
  "    .global _start",
  "",
  "_start:",
  "    li   t0, 0xDEADBEEF",
  "    la   sp, _stack_top",
  "    jal  ra, main",
  "    ebreak",
  "",
  "main:",
  "    addi sp, sp, -16",
  "    sw   ra, 12(sp)",
  "    li   a0, 0x42",
  "    call boot_init",
  "    lw   ra, 12(sp)",
  "    addi sp, sp, 16",
  "    ret",
];

/**
 * Decorative code panel used in the Hero. Pure CSS / SSR-friendly,
 * no client-side animation, zero JS cost.
 */
export function DecorativeCode({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative rounded-lg border border-border bg-card/60 overflow-hidden select-none",
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </span>
        <span className="font-mono text-[10px] text-muted-foreground ml-2">
          boot.S — rv32i
        </span>
      </div>
      <pre className="font-mono text-[11px] leading-relaxed text-muted-foreground/80 p-4 overflow-hidden">
        {RISCV_LINES.map((line, i) => (
          <div key={i} className="grid grid-cols-[1.75rem_1fr]">
            <span className="text-muted-foreground/30">{i + 1}</span>
            <span>
              <Highlighted line={line} />
            </span>
          </div>
        ))}
      </pre>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none"
      />
    </div>
  );
}

function Highlighted({ line }: { line: string }) {
  // Lightweight, fully static "syntax highlighting" — purely cosmetic.
  // No regex on the critical path; just split by whitespace.
  if (line.startsWith("    .") || line.startsWith(".")) {
    return <span className="text-accent/80">{line}</span>;
  }
  if (line.endsWith(":")) {
    return <span className="text-foreground">{line}</span>;
  }
  const parts = line.split(/(\s+)/);
  const [first, ws, ...rest] = parts;
  if (!first) return <>{line}</>;
  return (
    <>
      <span className="text-accent/80">{first}</span>
      {ws ?? ""}
      <span>{rest.join("")}</span>
    </>
  );
}
