import type { ComponentType } from "react";

export type Profile = {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly location: string;
  readonly email: string;
  readonly phone: string;
  readonly github: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
  readonly cvPath: string;
};

export type TechName = string;

export type ProjectStatus = "planned" | "in-progress";

export type Project = {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly summary: string;
  readonly period?: string;
  readonly status?: ProjectStatus;
  readonly stack: readonly TechName[];
  readonly repoUrl?: string;
  readonly videoUrl?: string;
  readonly highlights: readonly string[];
  readonly deepDive: {
    readonly problem: string;
    readonly architecture: string;
    readonly decisions: readonly { readonly title: string; readonly body: string }[];
    readonly learnings: readonly string[];
    readonly codeSnippet?: {
      readonly language: "c" | "asm" | "python";
      readonly title: string;
      readonly code: string;
    };
    readonly diagram?: ComponentType<{ className?: string }>;
  };
};

export type Experience = {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly location: string;
  readonly summary: string;
  readonly bullets: readonly string[];
  readonly stack?: readonly TechName[];
};

export type SkillGroup = {
  readonly label: string;
  readonly items: readonly TechName[];
};

export type Education = {
  readonly school: string;
  readonly degree: string;
  readonly period: string;
  readonly location: string;
};
