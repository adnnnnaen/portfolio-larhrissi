import type { Experience } from "@/lib/types";

export const experiences: readonly Experience[] = [
  {
    company: "Conduent Business Solutions",
    role: "Ingénieur embarqué — Projet de fin d'études",
    period: "Février — Août 2025",
    location: "Valence, France",
    summary:
      "Modernisation d'une application C++ embarquée (système de distribution de titres) : build, CI/CD et analyse statique.",
    bullets: [
      "Migration de la chaîne de build vers une architecture CMake modulaire avec gestion des dépendances et packaging via CPack — réduction du temps de build de 30 %.",
      "Mise en place de pipelines CI/CD Azure DevOps automatisant build, tests, packaging et déploiement des livrables.",
      "Intégration de l'analyse statique Kiuwan dans le pipeline ; développement de scripts Python interrogeant l'API REST pour extraire et synthétiser automatiquement les rapports.",
    ],
    stack: ["C++", "CMake", "CPack", "Python", "Azure DevOps", "Kiuwan"],
  },
  {
    company: "Ti-Hive",
    role: "Ingénieur logiciel embarqué — Stage",
    period: "Janvier — Juillet 2024",
    location: "Valence, France",
    summary:
      "Logiciel embarqué pour un système de capteurs térahertz sur FPGA/SoC Zynq, sous PetaLinux.",
    bullets: [
      "Création et intégration d'IP Xilinx (Vivado), déploiement PetaLinux, interfaçage PL/PS via AXI.",
      "Implémentation en C de traitements d'image (image stitching) sur le processeur ARM Cortex-A9 du Zynq.",
      "Développement d'une interface logicielle entre Linux embarqué et les capteurs côté FPGA.",
    ],
    stack: ["C", "Zynq-7000", "PetaLinux", "Vivado", "AXI", "ARM Cortex-A9"],
  },
  {
    company: "Equatorial Coca-Cola Bottling Company",
    role: "Stage de découverte (6 semaines)",
    period: "Été 2023",
    location: "Nouaceur, Maroc",
    summary:
      "Étude des besoins en sécurité réseau et conception d'une architecture de protection contre intrusions et malwares.",
    bullets: [
      "Audit de la topologie réseau et identification des points d'exposition.",
      "Proposition d'une architecture de défense en profondeur (segmentation, filtrage, durcissement).",
    ],
    stack: ["Sécurité réseau"],
  },
] as const;
