// Drawing helpers shared by the two neuron maps in How it works (components/site/HowItWorks.tsx and SmallMap.tsx).

export type Point = [number, number];

export const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

/** Small seeded random, so the hand-drawn strokes are the same on the server and the client. */
export function random(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// The direction of the label from its node, in SVG degrees (0 is right, 90 is down).
export const LABEL_ANGLE = { below: 90, right: 0, left: 180 } as const;

/** 4 to 6 short curved dendrites around a node, leaving a 60 degree sector free on the label's side. */
export function dendrites(seed: number, r: number, label: keyof typeof LABEL_ANGLE) {
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
export function curve([x1, y1]: Point, [x2, y2]: Point, i: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const bow = (i % 2 ? 1 : -1) * 0.12;
  return `M${x1} ${y1}Q${(mx - dy * bow).toFixed(1)} ${(my + dx * bow).toFixed(1)} ${x2} ${y2}`;
}
