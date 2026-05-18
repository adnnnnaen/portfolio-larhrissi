import type { Project } from "@/lib/types";
import { BootloaderDiagram } from "@/components/projects/diagrams/BootloaderDiagram";
import { RiscvDiagram } from "@/components/projects/diagrams/RiscvDiagram";
import { WeatherDiagram } from "@/components/projects/diagrams/WeatherDiagram";

const riscvSnippet = `// src/cpu.c — cycle fetch-decode-execute (extrait réel)
void cpu_step(Cpu *cpu)
{
    if (cpu->halted) return;

    uint32_t raw = mem_read32(cpu->pc);
    Instruction instr = decode(raw);
    bool pc_modified = execute(cpu, &instr);

    if (!pc_modified && !cpu->halted) {
        cpu->pc += 4u;
    }
}`;

const weatherSnippet = `// firmware main() — superloop 1 Hz (extrait réel)
while (1) {
    if ((int32_t)(HAL_GetTick() - next_tick) >= 0) {
        next_tick += CFG_SAMPLE_PERIOD_MS;

        bme280_status_t rs = bme280_read(&data);
        if (rs != BME280_OK) {
            LOG_ERROR("bme280_read failed: %d", rs);
            continue;
        }

        int n = proto_build_reading(jsonbuf, sizeof(jsonbuf), &data);
        if (n < 0 || (size_t)n >= sizeof(jsonbuf)) {
            LOG_ERROR("Encoding error or truncated");
            continue;
        }

        HAL_UART_Transmit(&huart2, (uint8_t *)jsonbuf, (uint16_t)n, 100);
    }
}`;

export const projects: readonly Project[] = [
  {
    slug: "weather-station-bme280",
    title: "Sensor Node STM32 — T/H/P + dashboard temps réel",
    tagline:
      "Firmware bare-metal STM32F411RE qui lit un BME280 en I²C, applique la compensation Bosch entière, et stream du NDJSON vers un dashboard Flask + Chart.js.",
    summary:
      "MVP de bout en bout : capteur BME280 → STM32 → UART → receiver Python → Flask + dashboard browser temps réel. Démo vidéo de 30 s disponible.",
    stack: [
      "C",
      "STM32 HAL",
      "STM32F411RE",
      "BME280",
      "I²C",
      "UART",
      "Python 3",
      "pyserial",
      "Flask",
      "Chart.js",
    ],
    repoUrl: "https://github.com/adnnnnaen/stm32-temp-humidity-sensor-",
    videoUrl: "https://youtu.be/2lhys_O6Igw",
    highlights: [
      "STM32F411RE Nucleo, Cortex-M4F @ 84 MHz (HSI + PLL)",
      "BME280 sur I²C 100 kHz (PB6 / PB7), adresse 0x76",
      "Superloop 1 Hz piloté par HAL_GetTick()",
      "Compensation Bosch en entier 32 bits → °C, %RH, hPa",
      "NDJSON sur UART2 115200 8N1, transporté en USB-CDC via le VCP ST-Link",
      "Receiver Python qui auto-détecte le port via USB VID/PID",
      "Dashboard Flask + Chart.js : gauges, courbes, indicateur online / stale / offline",
      "Stockage append-only readings.jsonl",
    ],
    deepDive: {
      problem:
        "Lire un capteur BME280 proprement (compensation conforme datasheet), exposer les mesures en temps réel, et faire le pipeline jusqu'au navigateur — sans empiler une stack disproportionnée pour un MVP.",
      architecture:
        "Le firmware tourne en bare-metal sur STM32F411RE Nucleo. Modules séparés (bme280, i2c_scan, protocol, uart_log) avec API claires. Le main() est un superloop 1 Hz piloté par HAL_GetTick() : lecture BME280 en I²C → compensation Bosch → encodage NDJSON → envoi sur UART2. Côté PC, receiver.py lit le port série, append chaque ligne à readings.jsonl, et une mini-app Flask sert un dashboard Chart.js qui se rafraîchit en live.",
      decisions: [
        {
          title: "Bare-metal HAL plutôt que RTOS",
          body: "Une seule tâche périodique, deux périphériques. Un RTOS introduirait de la complexité sans bénéfice. Le superloop fait le job, le code reste linéaire et lisible.",
        },
        {
          title: "Timing par HAL_GetTick() au lieu d'un timer ISR",
          body: "À 1 Hz, le déclenchement par SysTick (HAL_GetTick) est largement suffisant et garde le code dans le main(). Un timer matériel + ISR serait du sur-engineering ici.",
        },
        {
          title: "Compensation Bosch en entiers 32 bits",
          body: "La datasheet fournit deux versions des formules : flottants et entiers. Choix de la version entière pour éviter de tirer libm et soft-FPU dans le flot critique. Le résultat final est exposé en float dans le NDJSON pour la lisibilité.",
        },
        {
          title: "I²C en polling",
          body: "Le BME280 est lu une fois par seconde. Les API HAL bloquantes (Transmit / Receive) suffisent. Pas de DMA, pas de callbacks I²C — économie de complexité réelle.",
        },
        {
          title: "NDJSON, ligne par ligne",
          body: "Une JSON par ligne, terminée par \\r\\n. Lisible directement dans un terminal série pour debug, parseable trivialement côté PC, et robuste : si une ligne est corrompue par un glitch UART, on perd une mesure et pas plus.",
        },
        {
          title: "Auto-détection du port via USB VID/PID",
          body: "Pas de COMx hardcodé. Le receiver scanne les ports, repère le couple VID/PID du ST-Link et s'y connecte tout seul. Branche-débranche-rebranche sans toucher au code.",
        },
        {
          title: "Dashboard Flask 1 fichier + Chart.js",
          body: "Un Flask de trois routes et une page HTML qui parle directement à Chart.js. Pas de framework JS, pas de bundler, pas de DB. Cycle d'itération rapide, parfait pour un MVP.",
        },
      ],
      learnings: [],
      codeSnippet: {
        language: "c",
        title: "firmware/Core/Src/main.c — boucle principale",
        code: weatherSnippet,
      },
      diagram: WeatherDiagram,
    },
  },
  {
    slug: "riscv-emulator",
    title: "Émulateur RISC-V (RV32I) en C",
    tagline:
      "Émulateur RV32I from scratch en C99 strict — boucle fetch-decode-execute, 47 instructions, validé sur la suite officielle riscv-tests.",
    summary:
      "Cœur CPU RV32I en C99 avec modules séparés (cpu / decoder / executor / memory). Triple validation : tests unitaires Unity, programmes assembleur de démo, suite riscv-tests officielle.",
    stack: [
      "C99",
      "CMake",
      "Ninja",
      "Unity",
      "GCC RISC-V toolchain",
      "WSL2",
    ],
    repoUrl: "https://github.com/adnnnnaen/emulateur-RISCV-",
    highlights: [
      "47 instructions RV32I — ALU, loads / stores, branches, jumps, system",
      "Modules séparés : cpu, decoder, executor, memory, utils",
      "Décodeur typé : un mot 32 bits → struct Instruction (6 formats)",
      "Banc de 32 registres + PC, garde x0 = 0 enforcée en lecture ET en écriture",
      "RAM 1 MB little-endian, accès byte / half / word",
      "~70 sous-tests unitaires Unity",
      "Suite officielle riscv-tests (~40 rv32ui-p-*)",
      "6 programmes asm de démo (Fibonacci, factorielle, popcount, etc.)",
    ],
    deepDive: {
      problem:
        "Comprendre intimement comment un CPU exécute du code — pas en lisant un manuel d'architecture, mais en construisant la chose. RV32I est l'ISA idéale pour ça : 47 instructions suffisent à exécuter du C compilé, et la spec est ouverte et claire.",
      architecture:
        "Le code est découpé en modules à responsabilité unique : cpu.c (état + boucle fetch-decode-execute), decoder.c (mot 32 bits → struct typée Instruction), executor.c (effet de chaque instruction sur le CPU), memory.c (RAM 1 MB little-endian). Pas de cycles dans les #include, pas de malloc dans le hot path. C99 strict avec -Wall -Wextra -Wpedantic -Wshadow -Wconversion. Build CMake + Ninja, dev sur WSL2 Ubuntu, cross-compilation des programmes de test avec riscv64-unknown-elf-gcc.",
      decisions: [
        {
          title: "Décodeur typé, pas un méga switch dans cpu_step",
          body: "decode(raw) retourne une struct Instruction { type, rd, rs1, rs2, imm, raw }. Le type est un enum InstrType (INSTR_ADDI, INSTR_BEQ, …) et l'executor fait le switch là-dessus, pas sur l'opcode brut. Résultat : le décodeur est testable en isolation, et chaque cas d'exécution lit comme du pseudo-code.",
        },
        {
          title: "L'executor renvoie un bool 'pc_modified'",
          body: "Plutôt que de laisser l'executor toucher au PC pour les branches / jumps et un autre code l'incrémenter ailleurs, l'executor retourne pc_modified. cpu_step() incrémente PC de 4 seulement si l'instruction ne l'a pas modifié. Une seule source de vérité pour la logique du PC.",
        },
        {
          title: "x0 hardwired aux deux endroits",
          body: "cpu_read_reg(0) retourne 0 directement, et cpu_write_reg(0, _) est silencieusement ignoré. Defense-in-depth : un bug dans l'executor qui écrirait sur x0 ne pollue pas l'état. Conforme au comportement matériel.",
        },
        {
          title: "C99 strict avec warnings élevés",
          body: "Pas d'extensions GCC, pas de feature-flags qui dérivent ailleurs. -Wall -Wextra -Wpedantic -Wshadow -Wconversion. Le code passe sans warning — c'est une discipline qui force à expliciter chaque cast et chaque shadowing.",
        },
        {
          title: "Triple validation",
          body: "Niveau 1 : ~70 sous-tests Unity, un fichier par module. Niveau 2 : programmes asm faits maison (Fibonacci, factorielle, popcount) avec résultats attendus vérifiés en CI. Niveau 3 : suite officielle riscv-tests (~40 tests de conformité ISA rv32ui-p-*). Si les trois passent, l'émulateur exécute du vrai code.",
        },
      ],
      learnings: [],
      codeSnippet: {
        language: "c",
        title: "src/cpu.c — cpu_step()",
        code: riscvSnippet,
      },
      diagram: RiscvDiagram,
    },
  },
  {
    slug: "bootloader-ota-stm32",
    title: "Bootloader OTA + firmware FreeRTOS sur STM32F411",
    tagline:
      "Mise à jour firmware par UART avec rollback automatique sur Nucleo STM32F411RE — bootloader bare-metal, dual-bank, outil PC compagnon.",
    summary:
      "Système complet end-to-end : bootloader bare-metal 16 KB + métadonnées CRC-protégées + 2 slots applicatifs + protocole UART avec ACK/CRC + outil PC Python. Rollback automatique si l'image plante 3 fois.",
    status: "in-progress",
    stack: [
      "C",
      "Python",
      "STM32 HAL",
      "FreeRTOS (app)",
      "UART",
      "ARM Cortex-M4",
      "STM32F411RE Nucleo",
    ],
    repoUrl: "https://github.com/adnnnnaen/bootloader",
    highlights: [
      "Bootloader bare-metal 16 KB (secteur 0 @ 0x0800_0000)",
      "Métadonnées 16 KB (secteur 1) : magic, slot actif, boot_count, CRC, validation",
      "Slot A (96 KB, secteurs 2-4) et Slot B (128 KB, secteur 5)",
      "Protocole UART trame [SOF | SEQ | LEN | DATA | CRC16] avec ACK / NAK",
      "App FreeRTOS multi-tâches, validée à T+10 s par une tâche dédiée",
      "Rollback automatique après 3 boots consécutifs sans validation",
      "Outil PC flash_ota.py avec barre de progression (tqdm)",
    ],
    deepDive: {
      problem:
        "Mettre à jour un firmware déployé à distance sans risque de bricking. Quatre propriétés non négociables : atomicité (une coupure d'alim laisse le système bootable), intégrité (jamais sauter dans une image dont le CRC est faux), rollback (revenir à l'ancienne image si la nouvelle plante), et zéro brick possible.",
      architecture:
        "Le plan flash de 512 KB est découpé en cinq zones : bootloader 16 KB (secteur 0), métadonnées 16 KB (secteur 1), Slot A applicatif 96 KB (secteurs 2-4), Slot B applicatif 128 KB (secteur 5), et 256 KB de réserve. Trois acteurs en jeu : le bootloader (bare-metal, premier code au reset), le firmware applicatif (FreeRTOS multi-tâches, vit dans le slot actif avec VTOR repointé), et un outil PC Python qui pousse les nouvelles images via UART. Le bootloader lit les métadonnées au boot, vérifie le CRC du slot actif, gère la machine d'états rollback, puis saute vers l'application.",
      decisions: [
        {
          title: "Bare-metal pour le bootloader, FreeRTOS pour l'app",
          body: "Le bootloader doit être minimal, déterministe, et tenir dans 16 KB. Pas de RTOS, pas de système de fichiers, pas de drivers exotiques — juste UART, flash, CRC, et un saut. L'applicatif, lui, gère plusieurs IO concurrents : un RTOS clarifie le code.",
        },
        {
          title: "Dual-bank A/B avec métadonnées dédiées",
          body: "Deux slots applicatifs plutôt qu'un seul : la nouvelle image s'écrit dans le slot inactif pendant que l'ancienne tourne. Une coupure d'alim pendant l'upload ne touche jamais le slot fonctionnel, donc le système reste bootable.",
        },
        {
          title: "Validation par l'app + boot_count",
          body: "Le bootloader ne peut pas savoir si une image démarre correctement. C'est donc à l'app de se déclarer valide (écriture du flag validated dans les métadonnées) après quelques secondes de fonctionnement nominal. Si elle plante avant — HardFault, watchdog reset — elle ne valide pas. Le bootloader incrémente boot_count et bascule sur l'autre slot après 3 tentatives.",
        },
        {
          title: "Protocole UART simple avec ACK / NAK + CRC16",
          body: "Trame [SOF | SEQ | LEN | DATA | CRC16], un octet de réponse par trame (ACK 0x06 ou NAK 0x15), retransmission côté PC. Choix volontaire de ne pas réutiliser XMODEM / YMODEM : plus simple à implémenter, plus simple à debugger à l'analyseur logique, et suffisant pour le besoin.",
        },
      ],
      learnings: [],
      diagram: BootloaderDiagram,
    },
  },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
