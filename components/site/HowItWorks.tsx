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
import SmallMap from "@/components/site/SmallMap";
import { fields, how, type Field, type MapNode } from "@/content/site";
import { clamp, curve, dendrites, type Point } from "@/lib/neurons";
import { cn } from "@/lib/utils";

// Three progress values drive the whole map, each from 0 to 1:
//   learn: the predicting brain (neuroscience) fades in
//   use: it fills blue and glows, and its line to the future draws in
//   recall: lines draw from the future to one lesson in each other field, then the rest of the map
//           fades in behind. One knot, four fields.
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
const fromScroll = (p: number) => ({
  learn: clamp(p / 0.15),
  use: clamp((p - 0.3) / 0.2),
  recall: clamp((p - 0.62) / 0.3),
  step: (p < 0.28 ? 0 : p < 0.6 ? 1 : 2) as Stage,
});

// The story: one lesson, its knot, and one lesson in each of the other fields.
const FOCUS = "the-predicting-brain";
const HUB = "the-future";
const SPOKES = ["thoughts-arent-facts", "imagined-suffering", "the-second-arrow", "tie-your-camel"];
const IN_STORY = new Set([FOCUS, HUB, ...SPOKES]);

const INK = "#1D1B26";
const BG = "#F5EEE2";
const COLOR: Record<Field, string> = {
  neuroscience: "#6E9BD8",
  psychology: "#7C6FD0",
  philosophy: "#E9A27F",
  religion: "#8FAF86",
};
const DOT: Record<Field, string> = {
  neuroscience: "bg-field-neuroscience",
  psychology: "bg-field-psychology",
  philosophy: "bg-field-philosophy",
  religion: "bg-field-religion",
};
const fieldOf = (slug: string) => how.nodes.find((n) => n.slug === slug)?.field ?? "knot";
const colorOf = (slug: string) => {
  const f = fieldOf(slug);
  return f === "knot" ? INK : COLOR[f];
};

// Opacity of the story nodes before they light, and of the rest of the map before and after it fades in.
const DIM = 0.3;
const REST_FROM = 0.14;
const REST_TO = 0.5;

type Edge = [string, string];
type Side = "left" | "right";
type Layout = {
  width: number;
  height: number;
  at: Record<string, Point>;
  /** Labels beside the node. Without it, labels sit under each node. */
  side?: Record<string, Side>;
  /** The rest of the map, drawn faint behind the story. */
  base: Edge[];
};

// Desktop, every lesson. Positions came from a small layout search (measured label widths, every link
// sampled along its curve) and were then fixed here: no label touches another label, a node or a line,
// and nodes sit at least 82 apart. The future stays in the middle so its four spokes read as one fan.
const WIDE: Layout = {
  width: 640,
  height: 480,
  at: {
    "the-future": [320, 240],
    "the-predicting-brain": [365, 65],
    "thoughts-arent-facts": [191, 305],
    "imagined-suffering": [414, 404],
    "the-second-arrow": [292, 109],
    "tie-your-camel": [165, 191],
    overthinking: [494, 265],
    "holding-back": [479, 118],
    attachment: [480, 29],
    "self-sabotage": [300, 399],
    "wired-together": [589, 177],
    "the-stress-response": [620, 303],
    "the-spotlight-effect": [364, 339],
    "loss-aversion": [119, 261],
    "whats-in-your-control": [160, 398],
    intention: [119, 97],
  },
  side: {
    "the-future": "right",
    "the-predicting-brain": "left",
    "thoughts-arent-facts": "left",
    "imagined-suffering": "right",
    "the-second-arrow": "left",
    "tie-your-camel": "left",
    overthinking: "right",
    "holding-back": "right",
    attachment: "left",
    "self-sabotage": "left",
    "wired-together": "left",
    "the-stress-response": "left",
    "the-spotlight-effect": "left",
    "loss-aversion": "left",
    "whats-in-your-control": "left",
    intention: "left",
  },
  // Only short links that cross no label, no node and no other link, so the map never reads as a tangle.
  base: [
    ["the-spotlight-effect", "imagined-suffering"],
    ["loss-aversion", "tie-your-camel"],
    ["loss-aversion", "thoughts-arent-facts"],
    ["self-sabotage", "the-spotlight-effect"],
    ["holding-back", "attachment"],
    ["whats-in-your-control", "thoughts-arent-facts"],
    ["intention", "tie-your-camel"],
    ["self-sabotage", "imagined-suffering"],
    ["thoughts-arent-facts", "tie-your-camel"],
    ["holding-back", "the-predicting-brain"],
    ["overthinking", "wired-together"],
    ["overthinking", "imagined-suffering"],
    ["wired-together", "the-stress-response"],
  ],
};

type Progress = { learn: MotionValue<number>; use: MotionValue<number>; recall: MotionValue<number> };

/** The rest of the map comes in after the story lines have drawn. */
const restIn = (recall: number) => clamp((recall - 0.55) / 0.45);

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
  const hub = node.field === "knot";
  const r = hub ? 11 : 7;
  const color = hub ? INK : COLOR[node.field as Field];
  const isFocus = node.slug === FOCUS;
  const isHub = node.slug === HUB;
  const spoke = SPOKES.indexOf(node.slug);
  const side = layout.side?.[node.slug];

  const opacity = useTransform<number, number>([p.learn, p.use, p.recall], ([learn, use, recall]) => {
    if (isFocus) return DIM + (1 - DIM) * learn;
    if (isHub) return DIM + (1 - DIM) * use;
    if (spoke >= 0) return DIM + (1 - DIM) * spokeIn(recall, spoke);
    return REST_FROM + (REST_TO - REST_FROM) * restIn(recall);
  });
  // Story nodes fill with their color as they light. The knot fills ink; lessons fill their field color.
  const lit = useTransform<number, number>([p.use, p.recall], ([use, recall]) =>
    isFocus || isHub ? use : spoke >= 0 ? spokeIn(recall, spoke) : 0
  );
  const fill = useTransform(lit, [0, 1], [BG, color]);

  // Beside the node, the label clears the longest dendrite (about 2r) plus a little air.
  const gap = Math.round(r * 2.1 + 6);
  const label: { x: number; y: number; anchor: "start" | "middle" | "end" } = side
    ? { x: side === "left" ? -gap : gap, y: 0, anchor: side === "left" ? "end" : "start" }
    : { x: 0, y: r + (hub ? 23 : 18), anchor: "middle" };

  return (
    <motion.g transform={`translate(${at[0]} ${at[1]})`} style={{ opacity }}>
      {/* a very slow breath on lit neurons */}
      <g
        className={cn(pulse && "animate-node-pulse motion-reduce:animate-none")}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <path
          d={dendrites(index + 1, r, side ?? "below")}
          fill="none"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <motion.circle r={r} stroke={color} strokeWidth={hub ? 1.75 : 1.5} style={{ fill }} />
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
        className={hub ? "fill-ink font-display text-[19px]" : "fill-ink-2 font-body text-[14px]"}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

/** Each spoke from the knot starts drawing a little after the one before it, in the first part of recall. */
const spokeIn = (recall: number, i: number) => clamp((recall - i * 0.1) / 0.3);

function StoryEdge({ d, color, progress }: { d: string; color: string; progress: MotionValue<number> }) {
  const offset = useTransform(progress, (v) => 1 - v);
  const opacity = useTransform(progress, (v) => (v > 0.001 ? 1 : 0));
  return (
    <motion.path
      d={d}
      pathLength={1}
      strokeDasharray="1 1"
      stroke={color}
      strokeWidth="2.25"
      style={{ strokeDashoffset: offset, opacity }}
    />
  );
}

function Spoke({ d, color, i, p }: { d: string; color: string; i: number; p: Progress }) {
  const progress = useTransform(p.recall, (v) => spokeIn(v, i));
  return <StoryEdge d={d} color={color} progress={progress} />;
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
  const rest = useTransform(p.recall, (v) => REST_FROM + (REST_TO - REST_FROM) * restIn(v));
  const nodes = how.nodes.filter((node) => node.slug in at);
  // the story nodes draw last, so they sit on top of the faint map
  nodes.sort((a, b) => Number(IN_STORY.has(a.slug)) - Number(IN_STORY.has(b.slug)));

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label={how.steps[step].alt}
      className={cn("h-auto w-full overflow-visible", className)}
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={COLOR.neuroscience} stopOpacity="0.5" />
          <stop offset="100%" stopColor={COLOR.neuroscience} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the rest of the map, faint, fading in behind on the last step */}
      <motion.g fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="1.25" strokeLinecap="round" style={{ opacity: rest }}>
        {layout.base.map(([a, b], i) => (
          <path key={`${a}-${b}`} d={curve(at[a], at[b], i)} />
        ))}
      </motion.g>

      {/* the story: the lesson to its knot, then the knot to one lesson in each other field */}
      <g fill="none" strokeLinecap="round">
        <StoryEdge d={curve(at[FOCUS], at[HUB], 0)} color={COLOR.neuroscience} progress={p.use} />
        {SPOKES.map((to, i) => (
          <Spoke key={to} d={curve(at[HUB], at[to], i + 1)} color={colorOf(to)} i={i} p={p} />
        ))}
      </g>

      <motion.circle cx={at[FOCUS][0]} cy={at[FOCUS][1]} r="34" fill={`url(#${glowId})`} style={{ opacity: glow }} />

      {nodes.map((node, i) => {
        const lit = node.slug === FOCUS ? step >= 1 : SPOKES.includes(node.slug) && step >= 2;
        return <Node key={node.slug} node={node} layout={layout} index={i} p={p} pulse={lit} />;
      })}
    </svg>
  );
}

/** Four chips, one per field, each with its colored dot. */
function Legend({ className }: { className?: string }) {
  return (
    <ul aria-label={how.legendLabel} className={cn("flex flex-wrap gap-2", className)}>
      {fields.map((f) => (
        <li
          key={f.key}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-ink-2"
        >
          <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", DOT[f.key])} />
          {f.label}
        </li>
      ))}
    </ul>
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
      animate(recall, r, { duration: 1.6, ease }),
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
        <div className="lg:sticky motion-reduce:lg:static" style={{ top: PIN_TOP }}>
          <Container>
            <Reveal className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,38fr)_minmax(0,62fr)] lg:gap-x-14">
              <SectionHeader
                id="how-title"
                layout="stacked"
                eyebrow={how.eyebrow}
                heading={how.heading}
                intro={how.intro}
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
                  <p aria-live="polite" className="body-text mt-5 min-h-[4.8em] max-w-[30em]">
                    {how.steps[step].body}
                  </p>
                </div>
              </div>

              <div ref={mapRef} className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
                <Legend className="mb-4 hidden justify-end lg:flex" />
                <SmallMap p={p} step={step} idPrefix="how-small" className="mx-auto max-w-[420px] lg:hidden" />
                <Network layout={WIDE} p={p} step={step} idPrefix="how-wide" className="hidden lg:block" />
              </div>
            </Reveal>
          </Container>
        </div>
        {/* desktop: room to scroll while the content stays pinned */}
        <div aria-hidden="true" className="hidden h-[150vh] lg:block motion-reduce:lg:hidden" />
      </div>

      {/* same idea, four fields: desktop only, mobile keeps just the footnote */}
      <Container className="mt-8 lg:mt-16">
        <Reveal>
          <ul
            aria-label={how.strip.label}
            className="hidden gap-8 border-t border-line pt-8 lg:grid lg:grid-cols-4"
          >
            {how.strip.items.map((item) => (
              <li key={item.field}>
                <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.08em] text-ink-2">
                  <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", DOT[item.field])} />
                  {fields.find((f) => f.key === item.field)?.label}
                </p>
                <p className="body-text mt-2">{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 hidden text-[14px] leading-[1.55] text-ink-3 lg:block">{how.strip.note}</p>
          <p className="max-w-[40em] text-[14px] leading-[1.55] text-ink-3 lg:mt-2">
            {how.footnote.quote} {how.footnote.source}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
