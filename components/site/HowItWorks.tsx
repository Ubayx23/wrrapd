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
import SectionHeader from "@/components/ui/SectionHeader";
import { how, type MapNode } from "@/content/site";
import { cn } from "@/lib/utils";

// Three progress values drive the whole map, each from 0 to 1:
//   learn: the first neuron fades in   use: it fills lavender and its links draw in
//   recall: the links thicken and a second ring grows (the "notice the pattern" step)
// Desktop (lg, motion allowed) ties them to scroll: the content pins under the nav while a 150vh
// spacer scrolls past. Below lg a smaller seven neuron map plays the three tab states once on view.
// Under reduced motion the map sits at the final state with all three steps listed.

// Stages for the tabs: -1 is armed (everything dim, waiting to play), then steps 0, 1, 2.
type Stage = -1 | 0 | 1 | 2;
type Mode = "scroll" | "tabs" | "static";
const STEP_MS = 2500;
// Where the pinned content sits under the nav on desktop.
const PIN_TOP = 112;

// Where each value runs along the scroll story (0 to 1 while the content is pinned).
const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const fromScroll = (p: number) => ({
  learn: clamp(p / 0.15),
  use: clamp((p - 0.3) / 0.2),
  recall: clamp((p - 0.62) / 0.2),
  step: (p < 0.28 ? 0 : p < 0.6 ? 1 : 2) as Stage,
});

const FOCUS = "overthinking";

type Point = [number, number];
type Edge = [string, string];
type Side = "left" | "right";
type Layout = {
  width: number;
  height: number;
  at: Record<string, Point>;
  /** Labels beside the node. Without it, labels sit under each node. */
  side?: Record<string, Side>;
  /** The faint network. */
  base: Edge[];
  /** Lit when the lesson is used, linked from FOCUS and drawn on top of the faint network. */
  near: string[];
  /** The extra ring that fades in on the last step. Not in the faint network, so the map grows. */
  ring: Edge[];
};

// Desktop, all fifteen neurons. Labels sit under each node; positions are staggered so no two labels share a line.
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
  base: [
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
  ],
  near: ["thoughts-arent-facts", "the-observer", "the-future"],
  ring: [
    ["the-observer", "presence"],
    ["the-future", "purpose-in-the-moment"],
    ["thoughts-arent-facts", "the-loop"],
    ["the-future", "holding-back"],
  ],
};

// Under lg, only the seven neurons marked mobile in content/site.ts. Hand placed in a fixed 360 x 460 box:
// nodes in a loose zigzag at least 70 apart, each label on the outer side of its node, links in the middle.
const SMALL: Layout = {
  width: 360,
  height: 460,
  at: {
    "thoughts-arent-facts": [168, 52],
    presence: [306, 40],
    "the-observer": [250, 112],
    overthinking: [128, 190],
    "the-future": [240, 252],
    "holding-back": [132, 336],
    attachment: [234, 414],
  },
  side: {
    "thoughts-arent-facts": "left",
    presence: "left",
    "the-observer": "right",
    overthinking: "left",
    "the-future": "right",
    "holding-back": "left",
    attachment: "right",
  },
  base: [
    [FOCUS, "thoughts-arent-facts"],
    [FOCUS, "the-observer"],
    [FOCUS, "the-future"],
    [FOCUS, "holding-back"],
    ["holding-back", "attachment"],
    ["the-future", "attachment"],
  ],
  near: ["thoughts-arent-facts", "the-observer", "the-future"],
  ring: [
    ["the-observer", "presence"],
    ["the-future", "holding-back"],
  ],
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

// The direction of the label from its node, in SVG degrees (0 is right, 90 is down).
const LABEL_ANGLE = { below: 90, right: 0, left: 180 } as const;

/** 4 to 6 short curved dendrites around a node, leaving a 60 degree sector free on the label's side. */
function dendrites(seed: number, r: number, label: keyof typeof LABEL_ANGLE) {
  const rand = random(seed * 7919 + 13);
  const count = 4 + Math.floor(rand() * 3);
  const start = LABEL_ANGLE[label] + 30;
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



type Progress = { learn: MotionValue<number>; use: MotionValue<number>; recall: MotionValue<number> };

function Node({
  node,
  layout,
  index,
  p,
  pulse,
}: {
  node: MapNode;
  layout: Layout;
  index: number;
  p: Progress;
  pulse: boolean;
}) {
  const at = layout.at[node.slug];
  const r = node.core ? 10 : 7;
  const isFocus = node.slug === FOCUS;
  const isNear = layout.near.includes(node.slug);
  const isRing = layout.ring.some(([, to]) => to === node.slug);
  const side = layout.side?.[node.slug];

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

  // Beside the node, the label clears the longest dendrite (about 2r) plus a little air.
  const gap = Math.round(r * 2.1 + 6);
  const label: { x: number; y: number; anchor: "start" | "middle" | "end" } = side
    ? { x: side === "left" ? -gap : gap, y: 0, anchor: side === "left" ? "end" : "start" }
    : { x: 0, y: r + (node.core ? 22 : 17), anchor: "middle" };

  return (
    <motion.g transform={`translate(${at[0]} ${at[1]})`} style={{ opacity }}>
      {/* a very slow breath on lit neurons */}
      <g
        className={cn(pulse && "animate-node-pulse motion-reduce:animate-none")}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <motion.path
          d={dendrites(index + 1, r, side ?? "below")}
          fill="none"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ stroke }}
        />
        <motion.circle r={r} strokeWidth="1.5" style={{ fill, stroke }} />
      </g>
      <text
        x={label.x}
        y={label.y}
        textAnchor={label.anchor}
        dominantBaseline={side ? "central" : undefined}
        stroke={BG}
        strokeWidth="4"
        strokeLinejoin="round"
        paintOrder="stroke"
        data-map-label=""
        className={
          node.core
            ? "fill-ink font-display text-[19px]"
            : cn("fill-ink-2 font-body", side ? "text-[14px]" : "text-[12.5px]")
        }
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
  const nodes = how.nodes.filter((node) => node.slug in at);

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
        {layout.base.map(([a, b], i) => (
          <path key={`${a}-${b}`} d={curve(at[a], at[b], i)} />
        ))}
      </g>

      {/* the ring that grows on the last step */}
      <g fill="none" stroke={LAVENDER} strokeWidth="1.5" strokeLinecap="round">
        {layout.ring.map(([a, b], i) => (
          <RingEdge key={`${a}-${b}`} d={curve(at[a], at[b], i + 1)} p={p} />
        ))}
      </g>

      {/* the links that light up when the lesson is used */}
      <g fill="none" stroke={LAVENDER} strokeLinecap="round">
        {layout.near.map((to, i) => (
          <LitEdge key={to} d={curve(at[FOCUS], at[to], i)} i={i} p={p} />
        ))}
      </g>

      <motion.circle cx={at[FOCUS][0]} cy={at[FOCUS][1]} r="34" fill={`url(#${glowId})`} style={{ opacity: glow }} />

      {nodes.map((node, i) => {
        const lit = node.slug === FOCUS ? step >= 1 : layout.near.includes(node.slug) && step >= 2;
        return <Node key={node.slug} node={node} layout={layout} index={i} p={p} pulse={lit} />;
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
  const trackRef = useRef<HTMLDivElement>(null);
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

  // Desktop: scroll position is the progress, so scrolling back reverses it. It runs from the moment the
  // content pins (track top at PIN_TOP) until the track's end reaches the bottom of the screen, which is
  // before the pin lets go, so the last step holds for a moment.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: [`start ${PIN_TOP}px`, "end end"] });
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
    <section id="how" aria-labelledby="how-title" className="section-space scroll-mt-24">
      <div ref={trackRef}>
        <div
          className="lg:sticky motion-reduce:lg:static"
          style={{ top: PIN_TOP }}
        >
          <Container>
            <Reveal className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-x-14">
              <SectionHeader
                id="how-title"
                layout="stacked"
                eyebrow={how.eyebrow}
                heading={how.heading}
                className="lg:col-start-1 lg:self-end"
              />

              <div className="lg:col-start-1">
                {/* desktop scroll story, and the full list under reduced motion */}
                <ol className="hidden space-y-6 border-t border-line pt-6 lg:block motion-reduce:block">
                  {how.steps.map((s, i) => (
                    <li
                      key={s.label}
                      aria-current={mode === "scroll" && step === i ? "step" : undefined}
                      className={cn(
                        "transition-opacity duration-300 motion-reduce:transition-none",
                        mode === "scroll" && step !== i && "opacity-45"
                      )}
                    >
                      <h3 className="font-display text-[clamp(24px,2.4vw,28px)] font-normal leading-[1.1] text-ink">
                        <span className="mr-3 text-[18px]">{i + 1}</span>
                        {s.label}
                      </h3>
                      <p className="body-text mt-2 max-w-[24em]">{s.body}</p>
                    </li>
                  ))}
                </ol>

                {/* below lg: three tabs, full width, and the active step's text under them */}
                <div className="lg:hidden motion-reduce:hidden">
                  <div
                    role="group"
                    aria-label={how.tabsLabel}
                    className="grid grid-cols-3 gap-1 rounded-[22px] border border-line bg-surface p-1"
                  >
                    {how.steps.map((s, i) => (
                      <button
                        key={s.label}
                        type="button"
                        aria-pressed={step === i}
                        onClick={() => pick(i as Stage)}
                        className={cn(
                          "flex min-h-[52px] items-center justify-center rounded-[18px] px-2 text-center text-[14px] leading-[1.2] transition-colors duration-150 motion-reduce:transition-none",
                          step === i ? "bg-ink text-surface" : "text-ink-2 hover:text-ink"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  {/* fixed height for the longest step, so the map never jumps */}
                  <p aria-live="polite" className="body-text mt-5 min-h-[6.4em] max-w-[30em]">
                    {how.steps[step].body}
                  </p>
                </div>
              </div>

              <div ref={mapRef} className="lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-center">
                <Network
                  layout={SMALL}
                  p={p}
                  step={step}
                  idPrefix="how-small"
                  className="mx-auto max-w-[420px] lg:hidden"
                />
                <Network layout={WIDE} p={p} step={step} idPrefix="how-wide" className="hidden lg:block" />
              </div>

              <p className="max-w-[26em] text-[14px] leading-[1.55] text-ink-3 lg:col-start-1 lg:self-start">
                {how.footnote.quote} {how.footnote.source}
              </p>
            </Reveal>
          </Container>
        </div>
        {/* desktop: room to scroll while the content stays pinned */}
        <div aria-hidden="true" className="hidden h-[150vh] lg:block motion-reduce:lg:hidden" />
      </div>
    </section>
  );
}
