"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  delay?: number;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedSection({
  children,
  className,
  id,
  as = "section",
  delay = 0,
}: AnimatedSectionProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      id={id}
      className={cn("scroll-mt-20", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
