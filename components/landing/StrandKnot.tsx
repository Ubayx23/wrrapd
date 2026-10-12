"use client";

import { useEffect, useRef } from "react";
import { rng } from "@/lib/random";

type Props = {
  /** Flip to true to start the untangle. */
  untangling: boolean;
  /** Where the line settles: the hero margin line, in viewport coordinates. */
  getTarget: () => DOMRect | null;
  /** Fires once the line has settled into the margin. */
  onDone: () => void;
};

type RGB = [number, number, number];
const FILL: RGB = [143, 178, 240];
const EDGE: RGB = [196, 111, 209];
const INK: RGB = [30, 42, 63];
const MARGIN: RGB = [206, 92, 92];

const M = 170; // points on the chain
const UNTANGLE_MS = 2400;
const SETTLE_MS = 700;
const TAU = Math.PI * 2;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const color = (a: RGB, b: RGB, t: number, alpha = 1) =>
  `rgba(${Math.round(mix(a[0], b[0], t))},${Math.round(mix(a[1], b[1], t))},${Math.round(mix(a[2], b[2], t))},${alpha})`;

type Strand = { base: number; freq: number; phase: number; amp: number; start: number; end: number };

export default function StrandKnot({ untangling, getTarget, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const live = useRef({ untangling, getTarget, onDone });

  useEffect(() => {
    live.current = { untangling, getTarget, onDone };
  }, [untangling, getTarget, onDone]);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let mobile = false;
    let halfWidth = 15;
    const pos = new Float32Array(M * 2);
    const prev = new Float32Array(M * 2);
    const rest = new Float32Array(M * 2);
    const restLen = new Float32Array(M - 1);
    const nx = new Float32Array(M);
    const ny = new Float32Array(M);
    const collapse = new Float32Array(M); // 0 = full bundle, 1 = single line
    const from = new Float32Array(M * 2);
    const to = new Float32Array(M * 2);
    let strands: Strand[] = [];

    let homeX = 0;
    let homeY = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    let time = 0;
    let raf = 0;
    let drag = -1;
    let dragX = 0;
    let dragY = 0;
    let phase: "live" | "untangle" | "settle" | "done" = "live";
    let phaseStart = 0;
    let lineT = 0; // 0..1 progress of the untangle, drives colour
    let settleT = 0;

    function build() {
      const r = cv!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      if (!W || !H) return;
      cv!.width = Math.round(W * dpr);
      cv!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      mobile = W < 640;
      halfWidth = mobile ? 15 : 26;
      homeX = W / 2;
      homeY = H * 0.47;
      cx = tx = homeX;
      cy = ty = homeY;
      const rx = Math.min(W * (mobile ? 0.4 : 0.33), 460);
      const ry = Math.min(H * (mobile ? 0.27 : 0.3), 300);

      for (let i = 0; i < M; i++) {
        const u = i / (M - 1);
        const x =
          0.5 * Math.sin(TAU * 2.1 * u + 0.4) + 0.3 * Math.sin(TAU * 3.7 * u + 1.9) + 0.16 * Math.sin(TAU * 6.3 * u + 0.7);
        const y =
          0.46 * Math.cos(TAU * 1.7 * u + 1.1) + 0.32 * Math.sin(TAU * 3.1 * u + 2.6) + 0.16 * Math.cos(TAU * 5.6 * u + 0.2);
        rest[2 * i] = x * rx;
        rest[2 * i + 1] = y * ry;
        pos[2 * i] = prev[2 * i] = homeX + rest[2 * i];
        pos[2 * i + 1] = prev[2 * i + 1] = homeY + rest[2 * i + 1];
      }
      for (let i = 0; i < M - 1; i++) {
        restLen[i] = Math.hypot(rest[2 * i + 2] - rest[2 * i], rest[2 * i + 3] - rest[2 * i + 1]);
      }

      const R = rng(7);
      const count = mobile ? 24 : 52;
      strands = Array.from({ length: count }, () => ({
        base: R() * 2 - 1,
        freq: 1.5 + R() * 4,
        phase: R() * TAU,
        amp: 0.25 + R() * 0.35,
        start: Math.floor(R() * 4),
        end: M - 1 - Math.floor(R() * 6),
      }));
      collapse.fill(0);
    }

    function tailness(u: number) {
      return clamp(1 - Math.min(u, 1 - u) / 0.14);
    }

    function simulate() {
      time += 1 / 60;
      cx += (tx - cx) * 0.035;
      cy += (ty - cy) * 0.035;
      const amp = mobile ? 4 : 7;

      for (let i = 0; i < M; i++) {
        const u = i / (M - 1);
        const tail = tailness(u);
        const wx = Math.sin(time * 0.7 + i * 0.19) * amp + Math.sin(time * 0.31 + i * 0.053) * amp * 0.8;
        const wy = Math.cos(time * 0.6 + i * 0.23) * amp + Math.cos(time * 0.27 + i * 0.071) * amp * 0.8;
        const gx = cx + rest[2 * i] + wx;
        const gy = cy + rest[2 * i + 1] + wy;
        const k = 0.01 + (1 - tail) * 0.018;
        const x = pos[2 * i];
        const y = pos[2 * i + 1];
        const vx = (x - prev[2 * i]) * 0.93;
        const vy = (y - prev[2 * i + 1]) * 0.93;
        prev[2 * i] = x;
        prev[2 * i + 1] = y;
        pos[2 * i] = x + vx + (gx - x) * k;
        pos[2 * i + 1] = y + vy + (gy - y) * k + 0.12 * (0.25 + tail);
      }

      if (drag >= 0) {
        pos[2 * drag] = prev[2 * drag] = dragX;
        pos[2 * drag + 1] = prev[2 * drag + 1] = dragY;
      }

      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < M - 1; i++) {
          const ax = pos[2 * i];
          const ay = pos[2 * i + 1];
          const bx = pos[2 * i + 2];
          const by = pos[2 * i + 3];
          const d = Math.hypot(bx - ax, by - ay) || 1;
          const diff = ((d - restLen[i]) / d) * 0.3;
          const ox = (bx - ax) * diff;
          const oy = (by - ay) * diff;
          if (i !== drag) {
            pos[2 * i] += ox;
            pos[2 * i + 1] += oy;
          }
          if (i + 1 !== drag) {
            pos[2 * i + 2] -= ox;
            pos[2 * i + 3] -= oy;
          }
        }
      }
    }

    function beginUntangle(now: number) {
      phase = "untangle";
      phaseStart = now;
      drag = -1;
      from.set(pos);
      const x0 = W * 0.04;
      const span = W * 0.92;
      for (let i = 0; i < M; i++) {
        to[2 * i] = x0 + (i / (M - 1)) * span;
        to[2 * i + 1] = H / 2;
      }
    }

    function beginSettle(now: number) {
      const rect = live.current.getTarget();
      if (!rect || !rect.height) {
        finish();
        return;
      }
      phase = "settle";
      phaseStart = now;
      from.set(pos);
      const x = rect.left + rect.width / 2;
      for (let i = 0; i < M; i++) {
        to[2 * i] = x;
        to[2 * i + 1] = rect.top + (i / (M - 1)) * rect.height;
      }
    }

    function finish() {
      phase = "done";
      settleT = 1;
      live.current.onDone();
    }

    function morph(now: number, duration: number, stagger: number) {
      const t = clamp((now - phaseStart) / duration);
      for (let i = 0; i < M; i++) {
        const u = i / (M - 1);
        const e = ease(clamp((t - u * stagger) / (1 - stagger)));
        pos[2 * i] = mix(from[2 * i], to[2 * i], e);
        pos[2 * i + 1] = mix(from[2 * i + 1], to[2 * i + 1], e);
        if (phase === "untangle") collapse[i] = e;
      }
      return t;
    }

    function tracePath(offsets: (i: number) => [number, number], start: number, end: number) {
      let [px, py] = offsets(start);
      ctx!.beginPath();
      ctx!.moveTo(px, py);
      for (let i = start + 1; i < end; i++) {
        const [qx, qy] = offsets(i + 1);
        const [x, y] = offsets(i);
        ctx!.quadraticCurveTo(x, y, (x + qx) / 2, (y + qy) / 2);
        px = qx;
        py = qy;
      }
      ctx!.lineTo(px, py);
    }

    function draw() {
      if (!W) return;
      ctx!.clearRect(0, 0, W, H);
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";

      if (phase === "settle" || phase === "done") {
        tracePath((i) => [pos[2 * i], pos[2 * i + 1]], 0, M - 1);
        ctx!.strokeStyle = color(INK, MARGIN, settleT, mix(1, 0.32, settleT));
        ctx!.lineWidth = mix(1.5, 2, settleT);
        ctx!.stroke();
        return;
      }

      for (let i = 0; i < M; i++) {
        const a = Math.max(0, i - 1);
        const b = Math.min(M - 1, i + 1);
        const dx = pos[2 * b] - pos[2 * a];
        const dy = pos[2 * b + 1] - pos[2 * a + 1];
        const len = Math.hypot(dx, dy) || 1;
        nx[i] = -dy / len;
        ny[i] = dx / len;
      }

      // hold the blue and purple through the first part of the pull, then fade to ink
      const e = ease(clamp((lineT - 0.3) / 0.7));
      const fillColor = color(FILL, INK, e);
      const edgeColor = color(EDGE, INK, e);
      const edgeWidth = mix(mobile ? 4 : 5.2, 1.5, e);
      const fillWidth = mix(mobile ? 2.5 : 3.3, 1.5, e);
      const list = lineT >= 0.999 ? strands.slice(0, 1) : strands;

      for (const s of list) {
        const offsets = (i: number): [number, number] => {
          const u = i / (M - 1);
          const tail = tailness(u);
          const off =
            halfWidth *
            (s.base * 0.6 + s.amp * Math.sin(TAU * s.freq * u + s.phase + time * 0.25)) *
            (1 + 1.8 * tail * tail) *
            (1 - collapse[i]);
          return [pos[2 * i] + nx[i] * off, pos[2 * i + 1] + ny[i] * off];
        };
        tracePath(offsets, s.start, s.end);
        ctx!.strokeStyle = edgeColor;
        ctx!.lineWidth = edgeWidth;
        ctx!.stroke();
        ctx!.strokeStyle = fillColor;
        ctx!.lineWidth = fillWidth;
        ctx!.stroke();
      }
    }

    function frame(now: number) {
      if (phase === "live") {
        if (live.current.untangling) beginUntangle(now);
        else simulate();
      }
      if (phase === "untangle") {
        lineT = morph(now, UNTANGLE_MS, 0.45);
        if (lineT >= 1) beginSettle(now);
      } else if (phase === "settle") {
        settleT = morph(now, SETTLE_MS, 0.25);
        if (settleT >= 1) finish();
      }
      draw();
      raf = phase === "done" ? 0 : requestAnimationFrame(frame);
    }

    function local(e: PointerEvent) {
      const r = cv!.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }
    function follow(px: number, py: number) {
      tx = homeX + (px - homeX) * 0.45;
      ty = homeY + (py - homeY) * 0.45;
    }
    function onDown(e: PointerEvent) {
      if (phase !== "live") return;
      const [px, py] = local(e);
      const reach = e.pointerType === "mouse" ? 30 : 48;
      let best = -1;
      let bestD = reach * reach;
      for (let i = 0; i < M; i++) {
        const d = (pos[2 * i] - px) ** 2 + (pos[2 * i + 1] - py) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best < 0) return;
      drag = best;
      dragX = px;
      dragY = py;
      cv!.setPointerCapture(e.pointerId);
    }
    function onMove(e: PointerEvent) {
      const [px, py] = local(e);
      if (drag >= 0) {
        dragX = px;
        dragY = py;
        follow(px, py);
      } else if (e.pointerType === "mouse") {
        follow(px, py);
      }
    }
    function onUp() {
      drag = -1;
    }
    function onLeave() {
      if (drag < 0) {
        tx = homeX;
        ty = homeY;
      }
    }

    build();
    const ro = new ResizeObserver(() => {
      if (phase !== "live") return;
      build();
      if (reduced) draw();
    });
    ro.observe(cv);

    if (reduced) {
      draw();
    } else {
      cv.addEventListener("pointerdown", onDown);
      cv.addEventListener("pointermove", onMove);
      cv.addEventListener("pointerup", onUp);
      cv.addEventListener("pointercancel", onUp);
      cv.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onUp);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="A tangled knot of blue and purple threads, like a mind full of looping thoughts."
      className="absolute inset-0 block h-full w-full touch-none"
    />
  );
}
