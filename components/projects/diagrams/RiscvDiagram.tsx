import * as React from "react";

/**
 * Fetch-decode-execute cycle of the RV32I emulator.
 */
export function RiscvDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 240"
      role="img"
      aria-label="Cycle fetch-decode-execute du CPU RV32I émulé"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="rv-arrow"
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
        cpu_step() — boucle principale
      </text>

      {/* Three stages */}
      <Stage
        x={30}
        y={70}
        title="FETCH"
        sub="mem_load32(pc)"
        detail="PC += 4"
      />
      <Stage
        x={230}
        y={70}
        title="DECODE"
        sub="opcode, funct3, rd, rs1"
        detail="switch (opcode)"
      />
      <Stage
        x={430}
        y={70}
        title="EXECUTE"
        sub="x[rd] = x[rs1] op imm"
        detail="x[0] = 0"
      />

      {/* Arrows between stages */}
      <line
        x1="180"
        y1="115"
        x2="225"
        y2="115"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        markerEnd="url(#rv-arrow)"
      />
      <line
        x1="380"
        y1="115"
        x2="425"
        y2="115"
        stroke="hsl(var(--accent))"
        strokeWidth="1.5"
        markerEnd="url(#rv-arrow)"
      />

      {/* Loop arrow back */}
      <path
        d="M 530 165 Q 530 215 80 215 Q 80 175 80 162"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        markerEnd="url(#rv-arrow)"
      />
      <text
        x="305"
        y="232"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.6"
      >
        loop
      </text>
    </svg>
  );
}

function Stage({
  x,
  y,
  title,
  sub,
  detail,
}: {
  x: number;
  y: number;
  title: string;
  sub: string;
  detail: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={150}
        height={92}
        rx="6"
        fill="hsl(var(--muted) / 0.5)"
        stroke="hsl(var(--border))"
        strokeWidth="1"
      />
      <text
        x={x + 75}
        y={y + 26}
        fontFamily="ui-monospace, monospace"
        fontSize="13"
        fontWeight="700"
        textAnchor="middle"
        fill="hsl(var(--accent))"
      >
        {title}
      </text>
      <text
        x={x + 75}
        y={y + 50}
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.7"
      >
        {sub}
      </text>
      <text
        x={x + 75}
        y={y + 70}
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        textAnchor="middle"
        fill="currentColor"
        fillOpacity="0.45"
      >
        {detail}
      </text>
    </g>
  );
}
