import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline" | "subtle";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-mono text-[11px] leading-none px-2 py-1 transition-colors",
        variant === "default" &&
          "border border-border bg-muted/60 text-muted-foreground hover:text-foreground",
        variant === "outline" &&
          "border border-border bg-transparent text-muted-foreground",
        variant === "subtle" &&
          "bg-accent/10 text-accent border border-accent/20",
        className
      )}
      {...props}
    />
  );
}
