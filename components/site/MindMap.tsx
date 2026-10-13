"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { map } from "@/content/site";
import { cn } from "@/lib/utils";

// Stages: -1 is the armed state before the section scrolls in (everything dim), then 0 Learn it,
// 1 Use it, 2 Recall it. The server renders 0 so the map reads fine without JS.
type Stage = -1 | 0 | 1 | 2;
const STEP_MS = 2500;

const FOCUS = "overthinking";
// Lit when the lesson is used. Drawn on top of the faint network.
const NEAR = ["thoughts-arent-facts", "the-observer", "the-future"];
// The extra ring that fades in on recall. These links are not in the faint network, so the map grows.
const RING: [string, string][] = [
  ["the-observer", "presence"],
  ["the-future", "purpose-in-the-moment"],
  ["thoughts-arent-facts", "the-loop"],
  ["the-future", "holding-back"],
];
const BASE: [string, string][] = [
  [FOCUS, "thoughts-arent-facts"],
  [FOCUS, "the-observer"],
  [FOCUS, "the-future"],
  [FOCUS, "self-sabotage"],
  ["presence", "purpose-in-the-moment"],
  ["enough", "purpose-in-the-moment"],
  ["self-sabotage", "the-loop"],
  ["self-sabotage", "urges"],
  ["the-loop", "urges"],
  ["self-sabotage", "holding-back"],
  ["self-sabotage", "fear-of-being-seen"],
  ["holding-back", "fear-of-being-seen"],
  ["holding-back", "attachment"],
  ["holding-back", "self-trust"],
  ["attachment", "wanting-vs-needing"],
  ["attachment", "enough"],
  ["wanting-vs-needing", "enough"],
];

type Point = [number, number];
type Layout = { width: number; height: number; at: Record<string, Point> };

// Wide layout from sm up. Labels sit under each node; positions are staggered so no two labels share a line.
const WIDE: Layout = {
  width: 640,
  height: 480,
  at: {
    overthinking: [235, 200],
    "thoughts-arent-facts": [90, 110],
    "the-observer": [265, 58],
    "the-future": [420, 140],
    presence: [570, 62],
    "self-trust": [460, 222],
    "purpose-in-the-moment": [565, 255],
    "the-loop": [80, 265],
    "self-sabotage": [180, 360],
    urges: [55, 430],
    "holding-back": [380, 320],
    "fear-of-being-seen": [300, 440],
    attachment: [520, 365],
    "wanting-vs-needing": [465, 445],
    enough: [600, 440],
  },
};

// Tall layout under sm, so the map can run full width at 390px without labels touching.
const TALL: Layout = {
  width: 350,
  height: 664,
  at: {
    "the-observer": [190, 40],
    "thoughts-arent-facts": [75, 112],
    presence: [300, 105],
    overthinking: [170, 200],
    "the-future": [290, 252],
    "the-loop": [55, 272],
    "purpose-in-the-moment": [240, 345],
    "self-trust": [95, 362],
    "self-sabotage": [70, 450],
    "holding-back": [222, 442],
    urges: [40, 560],
    "fear-of-being-seen": [152, 545],
    attachment: [292, 540],
    "wanting-vs-needing": [205, 632],
    enough: [315, 625],
  },
};

const INK = "#1D1B26";
const BG = "#F5EEE2";
const LAVENDER = "#7C6FD0";
const LAVENDER_FILL = "rgba(124,111,208,0.85)";
const LAVENDER_LIGHT = "#C9C0F2";
const DIM = 0.28;

/** Small seeded random, so the hand-drawn strokes are the same on the server and the client. */
function random(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** 4 to 6 short curved dendrites around a node, leaving the space under it free for the label. */
function dendrites(seed: number, r: number) {
  const rand = random(seed * 7919 + 13);
  const count = 4 + Math.floor(rand() * 3);
  // Spread across the 300 degrees that skip the bottom (label) sector, 60 to 120 degrees in SVG terms.
  const start = 120;
  const span = 300;
  const paths: string[] = [];
  for (let i = 0; i < count; i++) {
    const a = ((start + (span / count) * (i + 0.2 + rand() * 0.6)) * Math.PI) / 180;
    const len = r * (0.45 + rand() * 0.6);
    const bend = (rand() - 0.5) * 0.7;
    const sx = Math.cos(a) * r;
    const sy = Math.sin(a) * r;
    const ex = Math.cos(a) * (r + len);
    const ey = Math.sin(a) * (r + len);
    const cx = Math.cos(a + bend) * (r + len * 0.55);
    const cy = Math.sin(a + bend) * (r + len * 0.55);
    paths.push(`M${sx.toFixed(1)} ${sy.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`);
  }
  return paths.join("");
}

/** A soft ink curve between two nodes, bowed to one side. */
function curve([x1, y1]: Point, [x2, y2]: Point, i: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const bow = (i % 2 ? 1 : -1) * 0.12;
  return `M${x1} ${y1}Q${(mx - dy * bow).toFixed(1)} ${(my + dx * bow).toFixed(1)} ${x2} ${y2}`;
}

const ease = "cubic-bezier(0.2,0.7,0.2,1)";
const fade = `opacity 600ms ${ease}, fill 600ms ${ease}, stroke 600ms ${ease}, stroke-width 600ms ${ease}`;

function Network({ layout, stage, idPrefix, className }: { layout: Layout; stage: Stage; idPrefix: string; className?: string }) {
  const { at } = layout;
  const glowId = `${idPrefix}-glow`;
  const lit = stage >= 1;
  const strong = stage >= 2;

  const nodeLook = (slug: string) => {
    if (slug === FOCUS) {
      return {
        opacity: stage >= 0 ? 1 : DIM,
        fill: lit ? LAVENDER_FILL : BG,
        stroke: lit ? LAVENDER : INK,
      };
    }
    if (NEAR.includes(slug)) {
      return {
        opacity: strong ? 1 : lit ? 0.7 : DIM,
        fill: strong ? LAVENDER_LIGHT : BG,
        stroke: strong ? LAVENDER : INK,
      };
    }
    if (RING.some(([, to]) => to === slug)) {
      return { opacity: strong ? 1 : DIM, fill: BG, stroke: INK };
    }
    return { opacity: DIM, fill: BG, stroke: INK };
  };

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label={map.states[Math.max(stage, 0)].alt}
      className={cn("h-auto w-full overflow-visible", className)}
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={LAVENDER} stopOpacity="0.45" />
          <stop offset="100%" stopColor={LAVENDER} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the faint network */}
      <g fill="none" stroke={INK} strokeOpacity="0.22" strokeWidth="1.25" strokeLinecap="round">
        {BASE.map(([a, b], i) => (
          <path key={`${a}-${b}`} d={curve(at[a], at[b], i)} />
        ))}
      </g>

      {/* the ring that appears on recall */}
      <g fill="none" stroke={LAVENDER} strokeWidth="1.5" strokeLinecap="round">
        {RING.map(([a, b], i) => (
          <path
            key={`${a}-${b}`}
            d={curve(at[a], at[b], i + 1)}
            className="motion-reduce:!transition-none"
            style={{ opacity: strong ? 0.55 : 0, transition: `opacity 900ms ${ease} 300ms` }}
          />
        ))}
      </g>

      {/* the connections that light up when the lesson is used */}
      <g fill="none" stroke={LAVENDER} strokeLinecap="round">
        {NEAR.map((to, i) => (
          <path
            key={to}
            d={curve(at[FOCUS], at[to], i)}
            pathLength={1}
            strokeDasharray="1 1"
            className="motion-reduce:!transition-none"
            style={{
              strokeDashoffset: lit ? 0 : 1,
              strokeWidth: strong ? 3.5 : 1.75,
              opacity: lit ? 1 : 0,
              transition: `stroke-dashoffset 1100ms ${ease} ${i * 150}ms, stroke-width 600ms ${ease}, opacity 200ms linear`,
            }}
          />
        ))}
      </g>

      <circle
        cx={at[FOCUS][0]}
        cy={at[FOCUS][1]}
        r="34"
        fill={`url(#${glowId})`}
        className="motion-reduce:!transition-none"
        style={{ opacity: lit ? 1 : 0, transition: `opacity 800ms ${ease}` }}
      />

      {map.nodes.map((node, i) => {
        const [x, y] = at[node.slug];
        const r = node.core ? 10 : 7;
        const look = nodeLook(node.slug);
        const paint: CSSProperties = { transition: fade };
        return (
          <g
            key={node.slug}
            transform={`translate(${x} ${y})`}
            className="motion-reduce:[&_*]:!transition-none motion-reduce:!transition-none"
            style={{ opacity: look.opacity, transition: `opacity 700ms ${ease}` }}
          >
            <path
              d={dendrites(i + 1, r)}
              fill="none"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ ...paint, stroke: look.stroke }}
            />
            <circle r={r} strokeWidth="1.5" style={{ ...paint, fill: look.fill, stroke: look.stroke }} />
            <text
              y={r + (node.core ? 22 : 17)}
              textAnchor="middle"
              stroke={BG}
              strokeWidth="4"
              strokeLinejoin="round"
              paintOrder="stroke"
              className={node.core ? "font-display fill-ink text-[19px]" : "font-body fill-ink-2 text-[12.5px]"}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function MindMap() {
  const [stage, setStage] = useState<Stage>(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // Starts once the top of the map is 30% up the viewport, whatever the map's height.
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const touched = useRef(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // Below the fold, start dim so the first neuron can fade in when the map arrives.
  useEffect(() => {
    const el = ref.current;
    if (reduce || !el || touched.current) return;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.7) setStage(-1);
  }, [reduce]);

  // Play the three stages once, then rest on Recall it.
  useEffect(() => {
    if (!inView || reduce || touched.current) return;
    setStage(0);
    timers.current = [
      window.setTimeout(() => setStage(1), STEP_MS),
      window.setTimeout(() => setStage(2), STEP_MS * 2),
    ];
    return clear;
  }, [inView, reduce]);

  const pick = (i: Stage) => {
    touched.current = true;
    clear();
    setStage(i);
  };

  const shown = Math.max(stage, 0);

  return (
    <section id="map" aria-labelledby="map-title" className="scroll-mt-24 pt-[72px] md:pt-[120px]">
      <Container>
        <Reveal className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:grid-rows-[auto_auto_1fr] lg:gap-x-14">
          <div className="lg:col-start-1">
            <p className="text-[14px] font-medium text-lavender">{map.eyebrow}</p>
            <h2
              id="map-title"
              className="mt-3 font-display text-[clamp(32px,4.4vw,48px)] font-normal leading-[1.05] tracking-[-0.01em]"
            >
              {map.heading}
            </h2>
            <p className="mt-5 max-w-[30em] text-[16.5px] leading-[1.65] text-ink-2">{map.body}</p>
          </div>

          <div className="lg:col-start-1">
            <div role="group" aria-label={map.tabsLabel} className="inline-flex rounded-full border border-line bg-surface p-1">
              {map.states.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={shown === i}
                  onClick={() => pick(i as Stage)}
                  className={cn(
                    "inline-flex min-h-[44px] items-center rounded-full px-4 text-[15px] transition-colors duration-150 motion-reduce:transition-none",
                    shown === i ? "bg-ink text-surface" : "text-ink-2 hover:text-ink"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-4 min-h-[3.2em] max-w-[24em] text-[16px] leading-[1.6] text-ink">{map.states[shown].caption}</p>
          </div>

          <div ref={ref} className="lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-center">
            <Network layout={TALL} stage={stage} idPrefix="map-tall" className="sm:hidden" />
            <Network layout={WIDE} stage={stage} idPrefix="map-wide" className="hidden sm:block" />
          </div>

          <p className="max-w-[26em] text-[14px] leading-[1.55] text-ink-3 lg:col-start-1 lg:self-end">
            {map.footnote.quote} {map.footnote.source}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
