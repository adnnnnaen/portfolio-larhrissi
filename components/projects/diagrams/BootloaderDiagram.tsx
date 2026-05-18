import * as React from "react";

/**
 * Flash memory map of the STM32F411 OTA bootloader (planned project).
 * Reflects the design spec: 16K boot + 16K meta + 96K slot A + 128K slot B + 256K reserve.
 */
export function BootloaderDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 260"
      role="img"
      aria-label="Plan mémoire flash : bootloader, métadonnées, slot A, slot B, réserve"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="bd-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="640" height="260" fill="url(#bd-grid)" />

      <text
        x="20"
        y="28"
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        fill="hsl(var(--accent))"
      >
        STM32F411RE — flash 512 KB
      </text>

      {/* Memory blocks — widths proportional to size */}
      <Block
        x={20}
        y={70}
        width={50}
        height={100}
        label="Bootloader"
        sub="16 KB"
        addr="0x0800_0000"
        sector="sect. 0"
        accent
      />
      <Block
        x={80}
        y={70}
        width={50}
        height={100}
        label="Meta"
        sub="16 KB"
        addr="0x0800_4000"
        sector="sect. 1"
        accent
      />
      <Block
        x={140}
        y={70}
        width={150}
        height={100}
        label="Slot A (app)"
        sub="96 KB"
        addr="0x0800_8000"
        sector="sect. 2-4"
      />
      <Block
        x={300}
        y={70}
        width={170}
        height={100}
        label="Slot B (app)"
        sub="128 KB"
        addr="0x0802_0000"
        sector="sect. 5"
      />
      <Block
        x={480}
        y={70}
        width={140}
        height={100}
        label="Réserve"
        sub="256 KB"
        addr="0x0804_0000"
        sector="sect. 6-7"
        muted
      />

      {/* Dual-bank bracket above slot A + slot B */}
      <line
        x1="140"
        y1="60"
        x2="470"
        y2="60"
        stroke="hsl(var(--accent))"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <line
        x1="140"
        y1="55"
        x2="140"
        y2="65"
        stroke="hsl(var(--accent))"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <line
        x1="470"
        y1="55"
        x2="470"
        y2="65"
        stroke="hsl(var(--accent))"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <text
        x="305"
        y="48"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        textAnchor="middle"
        fill="hsl(var(--accent))"
      >
        dual-bank A/B (image active dans l'un, MAJ dans l'autre)
      </text>

      {/* Annotation under bootloader */}
      <line
        x1="45"
        y1="175"
        x2="45"
        y2="195"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <text
        x="45"
        y="210"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.55"
      >
        boot @ reset
      </text>

      {/* Annotation under meta */}
      <line
        x1="105"
        y1="175"
        x2="105"
        y2="195"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <text
        x="105"
        y="210"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.55"
      >
        magic + CRC
      </text>
      <text
        x="105"
        y="222"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.55"
      >
        active_slot
      </text>
      <text
        x="105"
        y="234"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.55"
      >
        boot_count
      </text>
      <text
        x="105"
        y="246"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.55"
      >
        validated
      </text>
    </svg>
  );
}

function Block({
  x,
  y,
  width,
  height,
  label,
  sub,
  addr,
  sector,
  accent = false,
  muted = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sub: string;
  addr: string;
  sector: string;
  accent?: boolean;
  muted?: boolean;
}) {
  const fill = accent
    ? "hsl(var(--accent) / 0.1)"
    : muted
      ? "hsl(var(--muted) / 0.3)"
      : "hsl(var(--muted) / 0.5)";
  const stroke = accent
    ? "hsl(var(--accent) / 0.6)"
    : muted
      ? "hsl(var(--border) / 0.5)"
      : "hsl(var(--border))";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="4"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 8}
        fontFamily="ui-sans-serif, system-ui"
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
        fill={accent ? "hsl(var(--accent))" : "currentColor"}
        fillOpacity={muted ? 0.6 : 1}
      >
        {label}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 8}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity={muted ? 0.4 : 0.6}
      >
        {sub}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 24}
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity={muted ? 0.35 : 0.45}
      >
        {sector}
      </text>
      <text
        x={x + width / 2}
        y={y - 6}
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity={muted ? 0.35 : 0.5}
      >
        {addr}
      </text>
    </g>
  );
}
