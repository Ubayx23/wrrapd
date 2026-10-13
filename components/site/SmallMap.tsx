"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { how, type SmallMapNode } from "@/content/site";
import { clamp, curve, dendrites, type Point } from "@/lib/neurons";
import { cn } from "@/lib/utils";

// The mobile map from before the four fields: seven neurons in lavender, driven by the same three
// progress values as the desktop map (learn, use, recall), so the tabs and reduced motion work the same.

const FOCUS = "overthinking";
const INK = "#1D1B26";
const BG = "#F5EEE2";
const LAVENDER = "#7C6FD0";
const LAVENDER_FILL = "rgba(124,111,208,0.85)";
const LAVENDER_LIGHT = "#C9C0F2";
const DIM = 0.28;

type Edge = [string, string];
type Layout = {
  width: number;
  height: number;
  at: Record<string, Point>;
  /** Every label sits beside its node. */
  side: Record<string, "left" | "right">;
  /** The faint network. */
  base: Edge[];
  /** Lit when the lesson is used, linked from FOCUS and drawn on top of the faint network. */
  near: string[];
  /** The extra ring that fades in on the last step. */
  ring: Edge[];
};

// Hand placed in a fixed 360 x 460 box: nodes at least 70 apart, each label on the outer side of its node.
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

type Progress = { learn: MotionValue<number>; use: MotionValue<number>; recall: MotionValue<number> };

function Node({
  node,
  layout,
  index,
  p,
  pulse,
}: {
  node: SmallMapNode;
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

/** The smaller lavender map under lg: overthinking is learned, used, and its links grow on the last step. */
export default function SmallMap({
  p,
  step,
  idPrefix,
  className,
}: {
  p: Progress;
  step: number;
  idPrefix: string;
  className?: string;
}) {
  const layout = SMALL;
  const { at } = layout;
  const glowId = `${idPrefix}-glow`;
  const glow = useTransform(p.use, [0, 1], [0, 1]);
  const nodes = how.smallMap.nodes;

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label={how.smallMap.alts[step]}
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

