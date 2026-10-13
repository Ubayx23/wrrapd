"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { how, type MapNode } from "@/content/site";
import { cn } from "@/lib/utils";

// Three progress values drive the whole map, each from 0 to 1:
//   learn: the first neuron fades in   use: it fills lavender and its links draw in
//   recall: the links thicken and a second ring grows
// Desktop (lg, motion allowed) ties them to scroll through a 250vh section with a sticky frame.
// Below lg they animate to each tab's state, playing once when the map comes into view.
// Under reduced motion the map sits at the final state with all three steps listed.

// Stages for the tabs: -1 is armed (everything dim, waiting to play), then steps 0, 1, 2.
type Stage = -1 | 0 | 1 | 2;
type Mode = "scroll" | "tabs" | "static";
const STEP_MS = 2500;

// Where each value runs along the scroll story (0 to 1 through the section).
const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const fromScroll = (p: number) => ({
  learn: clamp(p / 0.15),
  use: clamp((p - 0.3) / 0.2),
  recall: clamp((p - 0.62) / 0.2),
  step: (p < 0.28 ? 0 : p < 0.6 ? 1 : 2) as Stage,
});

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


const INK_OF = (lit: boolean) => (lit ? "text-ink" : "text-ink-3");

type Progress = { learn: MotionValue<number>; use: MotionValue<number>; recall: MotionValue<number> };

function Node({ node, at, index, p, pulse }: { node: MapNode; at: Point; index: number; p: Progress; pulse: boolean }) {
  const r = node.core ? 10 : 7;
  const isFocus = node.slug === FOCUS;
  const isNear = NEAR.includes(node.slug);
  const isRing = RING.some(([, to]) => to === node.slug);

  const opacity = useTransform<number, number>([p.learn, p.use, p.recall], ([learn, use, recall]) => {
    if (isFocus) return DIM + (1 - DIM) * learn;
    if (isNear) return DIM + (0.7 - DIM) * use + 0.3 * recall;
    if (isRing) return DIM + (1 - DIM) * recall;
    return DIM;
  });
  const driver = isFocus ? p.use : p.recall;
  const lights = isFocus || isNear;
  const fill = useTransform(driver, [0, 1], [BG, lights ? (isFocus ? LAVENDER_FILL : LAVENDER_LIGHT) : BG]);
  const stroke = useTransform(driver, [0, 1], [INK, lights ? LAVENDER : INK]);

  return (
    <motion.g transform={`translate(${at[0]} ${at[1]})`} style={{ opacity }}>
      {/* a very slow breath on lit neurons */}
      <g
        className={cn(pulse && "animate-node-pulse motion-reduce:animate-none")}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <motion.path d={dendrites(index + 1, r)} fill="none" strokeWidth="1" strokeLinecap="round" style={{ stroke }} />
        <motion.circle r={r} strokeWidth="1.5" style={{ fill, stroke }} />
      </g>
      <text
        y={r + (node.core ? 22 : 17)}
        textAnchor="middle"
        stroke={BG}
        strokeWidth="4"
        strokeLinejoin="round"
        paintOrder="stroke"
        className={node.core ? "fill-ink font-display text-[19px]" : "fill-ink-2 font-body text-[12.5px]"}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

function LitEdge({ d, i, p }: { d: string; i: number; p: Progress }) {
  // each link starts drawing a little after the one before it
  const offset = useTransform(p.use, (v) => 1 - clamp((v - i * 0.12) / 0.76));
  const opacity = useTransform(p.use, (v) => (v > 0.001 ? 1 : 0));
  const width = useTransform(p.recall, [0, 1], [1.75, 3.5]);
  return (
    <motion.path
      d={d}
      pathLength={1}
      strokeDasharray="1 1"
      style={{ strokeDashoffset: offset, strokeWidth: width, opacity }}
    />
  );
}

function RingEdge({ d, p }: { d: string; p: Progress }) {
  const opacity = useTransform(p.recall, [0, 1], [0, 0.55]);
  return <motion.path d={d} style={{ opacity }} />;
}

function Network({
  layout,
  p,
  step,
  idPrefix,
  className,
}: {
  layout: Layout;
  p: Progress;
  step: number;
  idPrefix: string;
  className?: string;
}) {
  const { at } = layout;
  const glowId = `${idPrefix}-glow`;
  const glow = useTransform(p.use, [0, 1], [0, 1]);

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label={how.steps[step].alt}
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

      {/* the ring that grows on recall */}
      <g fill="none" stroke={LAVENDER} strokeWidth="1.5" strokeLinecap="round">
        {RING.map(([a, b], i) => (
          <RingEdge key={`${a}-${b}`} d={curve(at[a], at[b], i + 1)} p={p} />
        ))}
      </g>

      {/* the links that light up when the lesson is used */}
      <g fill="none" stroke={LAVENDER} strokeLinecap="round">
        {NEAR.map((to, i) => (
          <LitEdge key={to} d={curve(at[FOCUS], at[to], i)} i={i} p={p} />
        ))}
      </g>

      <motion.circle cx={at[FOCUS][0]} cy={at[FOCUS][1]} r="34" fill={`url(#${glowId})`} style={{ opacity: glow }} />

      {how.nodes.map((node, i) => {
        const lit = node.slug === FOCUS ? step >= 1 : NEAR.includes(node.slug) && step >= 2;
        return <Node key={node.slug} node={node} at={at[node.slug]} index={i} p={p} pulse={lit} />;
      })}
    </svg>
  );
}

const TARGETS: Record<Stage, [number, number, number]> = {
  [-1]: [0, 0, 0],
  0: [1, 0, 0],
  1: [1, 1, 0],
  2: [1, 1, 1],
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  // The server renders the final state, so the map reads fully without JS and under reduced motion.
  const [stage, setStage] = useState<Stage>(2);
  const learn = useMotionValue(1);
  const use = useMotionValue(1);
  const recall = useMotionValue(1);
  const p = { learn, use, recall };

  const mode: Mode = reduce ? "static" : wide ? "scroll" : "tabs";

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Desktop: scroll position is the progress, so scrolling back reverses it.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const applyScroll = (v: number) => {
    const s = fromScroll(v);
    learn.set(s.learn);
    use.set(s.use);
    recall.set(s.recall);
    setStage(s.step);
  };
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (mode === "scroll") applyScroll(v);
  });

  // Tabs: play once when the map comes in, unless someone has already picked a step.
  const inView = useInView(mapRef, { once: true, margin: "0px 0px -30% 0px" });
  const touched = useRef(false);
  const played = useRef(false);
  const timers = useRef<number[]>([]);
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    if (mode === "scroll") {
      clearTimers();
      applyScroll(scrollYProgress.get());
      return;
    }
    if (mode === "static") {
      clearTimers();
      setStage(2);
      return;
    }
    // tabs: below the fold, start dim so the first neuron can fade in when the map arrives
    const el = mapRef.current;
    if (!played.current && !touched.current && el && el.getBoundingClientRect().top > window.innerHeight * 0.7) {
      setStage(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- applyScroll only reads motion values
  }, [mode]);

  useEffect(() => {
    if (mode !== "tabs" || !inView || touched.current || played.current) return;
    played.current = true;
    setStage(0);
    timers.current = [
      window.setTimeout(() => setStage(1), STEP_MS),
      window.setTimeout(() => setStage(2), STEP_MS * 2),
    ];
  }, [inView, mode]);

  useEffect(() => clearTimers, []);

  // Tabs and static: ease the progress values to the current stage.
  useEffect(() => {
    if (mode === "scroll") return;
    const [l, u, r] = TARGETS[mode === "static" ? 2 : stage];
    if (mode === "static") {
      learn.set(l);
      use.set(u);
      recall.set(r);
      return;
    }
    const ease = [0.2, 0.7, 0.2, 1] as const;
    const runs: AnimationPlaybackControls[] = [
      animate(learn, l, { duration: 0.6, ease }),
      animate(use, u, { duration: 1.1, ease }),
      animate(recall, r, { duration: 0.8, ease }),
    ];
    return () => runs.forEach((run) => run.stop());
  }, [stage, mode, learn, use, recall]);

  const pick = (i: Stage) => {
    touched.current = true;
    clearTimers();
    setStage(i);
  };

  const step = Math.max(stage, 0);

  return (
    <section
      id="how"
      ref={sectionRef}
      aria-labelledby="how-title"
      className="relative scroll-mt-24 pt-[72px] md:pt-[120px] lg:h-[250vh] lg:pt-0 motion-reduce:lg:h-auto motion-reduce:lg:pt-[120px]"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:pt-[88px] motion-reduce:lg:static motion-reduce:lg:block motion-reduce:lg:h-auto motion-reduce:lg:pt-0">
        <Container>
          <Reveal className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-x-14">
            <div className="lg:col-start-1 lg:self-end">
              <p className="text-[14px] font-medium text-lavender">{how.eyebrow}</p>
              <h2
                id="how-title"
                className="mt-3 font-display text-[clamp(32px,4.4vw,48px)] font-normal leading-[1.05] tracking-[-0.01em]"
              >
                {how.heading}
              </h2>
            </div>

            <div className="lg:col-start-1">
              {/* desktop scroll story, and the full list under reduced motion */}
              <ol className="hidden space-y-6 border-t border-line pt-6 lg:block motion-reduce:block">
                {how.steps.map((s, i) => (
                  <li
                    key={s.label}
                    aria-current={mode === "scroll" && step === i ? "step" : undefined}
                    className={cn(
                      "transition-colors duration-300 motion-reduce:text-ink motion-reduce:transition-none",
                      INK_OF(mode !== "scroll" || step === i)
                    )}
                  >
                    <h3 className="font-display text-[clamp(24px,2.4vw,28px)] font-normal leading-[1.1]">
                      <span className="mr-3 text-[18px]">{i + 1}</span>
                      {s.label}
                    </h3>
                    <p className="mt-2 max-w-[24em] text-[16px] leading-[1.6]">{s.body}</p>
                  </li>
                ))}
              </ol>

              {/* below lg: tappable steps */}
              <div className="lg:hidden motion-reduce:hidden">
                <div
                  role="group"
                  aria-label={how.tabsLabel}
                  className="inline-flex rounded-full border border-line bg-surface p-1"
                >
                  {how.steps.map((s, i) => (
                    <button
                      key={s.label}
                      type="button"
                      aria-pressed={step === i}
                      onClick={() => pick(i as Stage)}
                      className={cn(
                        "inline-flex min-h-[44px] items-center rounded-full px-4 text-[15px] transition-colors duration-150 motion-reduce:transition-none",
                        step === i ? "bg-ink text-surface" : "text-ink-2 hover:text-ink"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <p className="mt-4 min-h-[3.2em] max-w-[26em] text-[16px] leading-[1.6] text-ink">
                  {how.steps[step].body}
                </p>
              </div>
            </div>

            <div ref={mapRef} className="lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-center">
              <Network layout={TALL} p={p} step={step} idPrefix="how-tall" className="sm:hidden" />
              <Network layout={WIDE} p={p} step={step} idPrefix="how-wide" className="hidden sm:block" />
            </div>

            <p className="max-w-[26em] text-[14px] leading-[1.55] text-ink-3 lg:col-start-1 lg:self-start">
              {how.footnote.quote} {how.footnote.source}
            </p>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
