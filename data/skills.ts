import type { SkillGroup } from "@/lib/types";

export const skills: readonly SkillGroup[] = [
  {
    label: "Langages",
    items: ["C", "C++", "Python", "Assembleur ARM", "Assembleur RISC-V", "Bash", "SQL"],
  },
  {
    label: "Microcontrôleurs & SoC",
    items: ["ARM Cortex-M4/M7", "STM32 (F4/F7)", "RISC-V (RV32I)", "Zynq-7000 (PS/PL)"],
  },
  {
    label: "Développement bas niveau",
    items: [
      "Bare-metal",
      "HAL / LL STM32",
      "FreeRTOS",
      "ISR",
      "DMA",
      "Timers",
      "ADC / PWM",
      "Gestion mémoire",
      "Linkers / Map files",
    ],
  },
  {
    label: "Protocoles",
    items: ["UART", "I2C", "SPI", "CAN", "USB", "AXI"],
  },
  {
    label: "Outils & debug",
    items: [
      "STM32CubeIDE / CubeMX",
      "Vivado",
      "Vitis",
      "PetaLinux",
      "GDB",
      "OpenOCD",
      "ST-Link",
      "Analyseur logique",
    ],
  },
  {
    label: "Build & DevOps",
    items: ["CMake", "Make", "CPack", "Git", "Azure DevOps", "CI/CD"],
  },
  {
    label: "Méthodologies",
    items: ["Agile", "Cycle en V", "Lecture de datasheets", "Rédaction technique"],
  },
] as const;
