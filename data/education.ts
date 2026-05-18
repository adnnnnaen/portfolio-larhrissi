import type { Education } from "@/lib/types";

export const education: readonly Education[] = [
  {
    school: "Grenoble INP — ESISAR",
    degree: "Diplôme d'ingénieur en électronique, informatique et systèmes",
    period: "2021 — 2025",
    location: "Valence, France",
  },
  {
    school: "Carnot Prépas",
    degree: "Classes préparatoires MPSI / MP",
    period: "2019 — 2021",
    location: "Meknès, Maroc",
  },
] as const;
