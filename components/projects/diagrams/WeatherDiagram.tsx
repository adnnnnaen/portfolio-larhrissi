import * as React from "react";

/**
 * Actual data flow of the STM32 sensor node MVP:
 * BME280 → I²C → STM32F411RE → UART/USB-CDC → receiver.py → readings.jsonl + Flask → browser.
 */
export function WeatherDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 240"
      role="img"
      aria-label="Flux BME280 → STM32 → receiver.py → dashboard Flask"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="wd-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--accent))" />
        </marker>
      </defs>

      <text
        x="20"
        y="28"
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        fill="hsl(var(--accent))"
      >
        Pipeline d'acquisition — 1 Hz, MVP end-to-end
      </text>

      {/* BME280 */}
      <Node x={20} y={80} width={110} title="BME280" lines={["T / P / H", "addr 0x76"]} />

      {/* Bus I2C */}
      <BusLabel x={170} y={125} label="I²C" detail="100 kHz" />

      {/* STM32 */}
      <Node
        x={210}
        y={80}
        width={140}
        title="STM32F411RE"
        lines={["bare-metal HAL", "+ comp. Bosch", "+ NDJSON"]}
        accent
      />

      {/* Bus UART */}
      <BusLabel x={388} y={125} label="UART" detail="115200 8N1" />

      {/* receiver.py */}
      <Node
        x={428}
        y={80}
        width={130}
        title="receiver.py"
        lines={["auto-detect", "USB VID/PID"]}
      />

      {/* Bus jsonl */}
      <BusLabel x={596} y={125} label="JSONL" detail="append-only" />

      {/* Flask dashboard */}
      <Node
        x={596}
        y={80}
        width={104}
        title="Flask"
        lines={["+ Chart.js", "gauges + charts"]}
      />

      {/* Arrows */}
      <line
        x1="135"
        y1="125"
        x2="205"
        y2="125"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        markerEnd="url(#wd-arrow)"
      />
      <line
        x1="355"
        y1="125"
        x2="423"
        y2="125"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        markerEnd="url(#wd-arrow)"
      />
      <line
        x1="563"
        y1="125"
        x2="591"
        y2="125"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        markerEnd="url(#wd-arrow)"
      />

      {/* Bottom note */}
      <text
        x="360"
        y="200"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.5"
      >
        superloop main() + HAL_GetTick() — 1 ligne JSON par mesure
      </text>
    </svg>
  );
}

function Node({
  x,
  y,
  width,
  title,
  lines,
  accent = false,
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  lines: string[];
  accent?: boolean;
}) {
  const height = 90;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="6"
        fill={accent ? "hsl(var(--accent) / 0.1)" : "hsl(var(--muted) / 0.5)"}
        stroke={accent ? "hsl(var(--accent) / 0.6)" : "hsl(var(--border))"}
        strokeWidth="1"
      />
      <text
        x={x + width / 2}
        y={y + 26}
        fontFamily="ui-sans-serif, system-ui"
        fontSize="12"
        fontWeight="600"
        textAnchor="middle"
        fill={accent ? "hsl(var(--accent))" : "currentColor"}
      >
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + width / 2}
          y={y + 46 + i * 13}
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.55"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function BusLabel({
  x,
  y,
  label,
  detail,
}: {
  x: number;
  y: number;
  label: string;
  detail: string;
}) {
  return (
    <g>
      <text
        x={x}
        y={y - 8}
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
        fill="hsl(var(--accent))"
      >
        {label}
      </text>
      <text
        x={x}
        y={y + 16}
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.5"
      >
        {detail}
      </text>
    </g>
  );
}
