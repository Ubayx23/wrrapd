import Highlight, { type HighlightColor } from "@/components/ui/Highlight";
import { rng } from "@/lib/random";

// Coordinates live in a 1000 x 900 box; the HTML labels use the same box in percent.
const VW = 1000;
const VH = 900;

const NEURONS: { id: string; label: string; x: number; y: number; color: HighlightColor }[] = [
  { id: "overthinking", label: "overthinking", x: 220, y: 200, color: "blue" },
  { id: "future", label: "the future", x: 760, y: 150, color: "purple" },
  { id: "holding", label: "holding back", x: 500, y: 440, color: "green" },
  { id: "attachment", label: "attachment", x: 790, y: 610, color: "pink" },
  { id: "sabotage", label: "self-sabotage", x: 250, y: 700, color: "orange" },
];

const EDGES: [string, string][] = [
  ["overthinking", "future"],
  ["overthinking", "holding"],
  ["future", "holding"],
  ["future", "attachment"],
  ["holding", "attachment"],
  ["holding", "sabotage"],
  ["sabotage", "overthinking"],
  ["attachment", "sabotage"],
];

const SOMA = 11;
const BOX = 112; // px, the drawing area around each soma

function edgePaths() {
  const R = rng(21);
  const at = Object.fromEntries(NEURONS.map((n) => [n.id, n]));
  return EDGES.map(([a, b]) => {
    const { x: x1, y: y1 } = at[a];
    const { x: x2, y: y2 } = at[b];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const off = (R() - 0.5) * 0.36 * len;
    const qx = (x1 + x2) / 2 - (dy / len) * off;
    const qy = (y1 + y2) / 2 + (dx / len) * off;
    return `M${x1} ${y1} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x2} ${y2}`;
  });
}

function dendrites(seed: number) {
  const R = rng(seed);
  const paths: string[] = [];
  const branches = 7;
  for (let i = 0; i < branches; i++) {
    const ang = (i / branches) * Math.PI * 2 + R() * 0.8;
    const L = 22 + R() * 14;
    const sx = Math.cos(ang) * SOMA;
    const sy = Math.sin(ang) * SOMA;
    const ex = Math.cos(ang) * (SOMA + L);
    const ey = Math.sin(ang) * (SOMA + L);
    const bend = (R() - 0.5) * 14;
    const qx = (sx + ex) / 2 - Math.sin(ang) * bend;
    const qy = (sy + ey) / 2 + Math.cos(ang) * bend;
    paths.push(`M${sx.toFixed(1)} ${sy.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
    if (R() > 0.45) {
      const fa = ang + (R() > 0.5 ? 0.6 : -0.6);
      const fl = 6 + R() * 7;
      paths.push(
        `M${(ex * 0.72).toFixed(1)} ${(ey * 0.72).toFixed(1)} l${(Math.cos(fa) * fl).toFixed(1)} ${(Math.sin(fa) * fl).toFixed(1)}`
      );
    }
  }
  return paths;
}

export default function NeuronSketch() {
  const edges = edgePaths();
  return (
    <div
      role="img"
      aria-label="A sketch of five connected neurons: overthinking, holding back, the future, attachment and self-sabotage."
      className="relative mx-auto aspect-[10/9] w-full max-w-[560px]"
    >
      <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <g filter="url(#ink-wobble)" fill="none" stroke="#1e2a3f" strokeWidth="2.2" strokeLinecap="round" opacity="0.4">
          {edges.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </svg>

      {NEURONS.map((n, idx) => (
        <div
          key={n.id}
          aria-hidden="true"
          className="group absolute"
          style={{ left: `${(n.x / VW) * 100}%`, top: `${(n.y / VH) * 100}%`, width: 0, height: 0 }}
        >
          <svg
            viewBox={`${-BOX / 2} ${-BOX / 2} ${BOX} ${BOX}`}
            width={BOX}
            height={BOX}
            className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible"
          >
            <g filter="url(#ink-wobble)" fill="none" stroke="#1e2a3f" strokeWidth="1.15" strokeLinecap="round" opacity="0.8">
              {dendrites(31 + idx * 7).map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <circle
              r={SOMA}
              className="fill-paper-hi stroke-ink [stroke-width:1.7] transition-[stroke-width] duration-200 group-hover:[stroke-width:2.6]"
            />
          </svg>
          <span className="absolute left-1/2 top-[42px] -translate-x-1/2 whitespace-nowrap font-display text-[clamp(19px,4.8vw,25px)] leading-none">
            <Highlight color={n.color} mode="hover">
              {n.label}
            </Highlight>
          </span>
        </div>
      ))}
    </div>
  );
}
