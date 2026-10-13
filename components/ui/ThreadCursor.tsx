"use client";

import { useEffect, useRef, useState } from "react";

// A dot with a loose thread behind it. Move fast and the thread swings into a small tangle;
// slow down and it settles and straightens. Desktop only, purely decorative.

const POINTS = 24;
const SEGMENT = 6;
const DAMPING = 0.9;
const GRAVITY = 0.12;
const ITERATIONS = 4;
// At speed, each segment turns a little around the one before it, more toward the tail, so a
// fast flick winds the thread into a soft loop. It fades as the mouse slows.
const SPIN = 0.55;
// Points two apart stay at least this many segments apart, so the thread bends but never kinks.
const SMOOTH = 1.9;
const STEP_MS = 1000 / 60;

const INK = "29,27,38";
const LAVENDER = "124,111,208";
const DOT_R = 4;
const RING_R = 14;

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const INTERACTIVE = "a[href], button, [role='button'], summary, label[for], select";
const TEXT_ENTRY =
  "textarea, [contenteditable='true'], input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file'])";

export default function ThreadCursor() {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Only on devices that hover with a fine pointer. Touch renders nothing.
  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const html = document.documentElement;
    html.classList.add("thread-cursor-on");

    const reducedMq = window.matchMedia(REDUCED);
    let reduced = reducedMq.matches;

    // Canvas size, read only on resize.
    let width = 0;
    let height = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      wake();
    };

    // Rope state: current and previous positions (verlet).
    const px = new Float32Array(POINTS);
    const py = new Float32Array(POINTS);
    const ox = new Float32Array(POINTS);
    const oy = new Float32Array(POINTS);
    const hang = (x: number, y: number) => {
      for (let i = 0; i < POINTS; i++) {
        px[i] = ox[i] = x;
        py[i] = oy[i] = y + i * SEGMENT;
      }
    };

    let mouseX = -100;
    let mouseY = -100;
    let lastX = mouseX;
    let lastY = mouseY;
    let seen = false;
    let speed = 0; // smoothed mouse speed, px per step
    let turn = 1; // which way the loops curl, follows the way the mouse is turning
    let lastDx = 0;
    let lastDy = 0;

    let inside = false;
    let hover = false;
    let typing = false;
    let alpha = 0; // whole cursor, fades on leave / enter and over text fields
    let ring = 0; // 0 dot, 1 lavender ring

    let raf = 0;
    let last = 0;
    let acc = 0;

    function wake() {
      if (!raf && !document.hidden) {
        last = performance.now();
        acc = 0;
        raf = requestAnimationFrame(frame);
      }
    }

    // Moves points i and j to `rest` apart. Point 0 is pinned to the dot, so it never moves.
    const pull = (i: number, j: number, rest: number, onlyIfShorter: boolean) => {
      const ax = px[i] - px[j];
      const ay = py[i] - py[j];
      const d = Math.hypot(ax, ay) || 0.0001;
      if (onlyIfShorter && d >= rest) return;
      const diff = (d - rest) / d;
      if (j === 0) {
        px[i] -= ax * diff;
        py[i] -= ay * diff;
      } else {
        px[i] -= ax * diff * 0.5;
        py[i] -= ay * diff * 0.5;
        px[j] += ax * diff * 0.5;
        py[j] += ay * diff * 0.5;
      }
    };

    const step = () => {
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      lastX = mouseX;
      lastY = mouseY;
      speed = speed * 0.85 + Math.hypot(dx, dy) * 0.15;
      const cross = lastDx * dy - lastDy * dx;
      if (Math.abs(cross) > 4) turn = cross > 0 ? 1 : -1;
      lastDx = dx;
      lastDy = dy;

      const ease = 0.2;
      alpha += ((inside && !typing ? 1 : 0) - alpha) * ease;
      ring += ((hover ? 1 : 0) - ring) * (reduced ? 1 : 0.22);

      if (reduced) return 0;

      // Only fast movement curls, and it fades as the mouse slows.
      const curl = SPIN * Math.min(Math.max((speed - 6) / 30, 0), 1) * turn;

      px[0] = ox[0] = mouseX;
      py[0] = oy[0] = mouseY;
      let moved = 0;
      for (let i = 1; i < POINTS; i++) {
        const vx = (px[i] - ox[i]) * DAMPING;
        const vy = (py[i] - oy[i]) * DAMPING;
        ox[i] = px[i];
        oy[i] = py[i];
        px[i] += vx;
        py[i] += vy + GRAVITY;
        moved = Math.max(moved, Math.abs(vx) + Math.abs(vy));
      }
      if (curl) {
        for (let i = 1; i < POINTS; i++) {
          const th = curl * (i / POINTS);
          const c = Math.cos(th);
          const sn = Math.sin(th);
          const ax = px[i] - px[i - 1];
          const ay = py[i] - py[i - 1];
          px[i] = px[i - 1] + ax * c - ay * sn;
          py[i] = py[i - 1] + ax * sn + ay * c;
        }
      }
      for (let n = 0; n < ITERATIONS; n++) {
        for (let i = 1; i < POINTS; i++) pull(i, i - 1, SEGMENT, false);
        for (let i = 2; i < POINTS; i++) pull(i, i - 2, SEGMENT * SMOOTH, true);
      }
      // A thread doesn't stretch: walk from the dot and pull back any segment that got too long.
      for (let i = 1; i < POINTS; i++) {
        const ax = px[i] - px[i - 1];
        const ay = py[i] - py[i - 1];
        const d = Math.hypot(ax, ay);
        if (d > SEGMENT) {
          px[i] = px[i - 1] + (ax / d) * SEGMENT;
          py[i] = py[i - 1] + (ay / d) * SEGMENT;
        }
      }
      return moved;
    };

    const curve = (from: number, to: number) => {
      // quadratic curves through the midpoints, from the point (or midpoint) at `from` to `to`
      for (let i = from; i < to; i++) {
        const mx = (px[i] + px[i + 1]) / 2;
        const my = (py[i] + py[i + 1]) / 2;
        ctx.quadraticCurveTo(px[i], py[i], mx, my);
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (alpha < 0.01 || !seen) return;

      if (!reduced) {
        const split = Math.round(POINTS * (2 / 3));
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(px[0], py[0]);
        curve(1, split - 1);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(${INK},${0.55 * alpha})`;
        ctx.stroke();

        // the tail: thinner and fainter
        ctx.beginPath();
        ctx.moveTo((px[split - 1] + px[split]) / 2, (py[split - 1] + py[split]) / 2);
        curve(split, POINTS - 1);
        ctx.lineTo(px[POINTS - 1], py[POINTS - 1]);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(${INK},${0.3 * alpha})`;
        ctx.stroke();
      }

      const r = DOT_R + (RING_R - DOT_R) * ring;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, r, 0, Math.PI * 2);
      if (ring < 0.99) {
        ctx.fillStyle = `rgba(${INK},${(1 - ring) * alpha})`;
        ctx.fill();
      }
      if (ring > 0.01) {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(${LAVENDER},${ring * alpha})`;
        ctx.stroke();
      }
    };

    function frame(now: number) {
      raf = 0;
      acc += Math.min(now - last, 100);
      last = now;
      let moved = 0;
      let steps = 0;
      // fixed 60Hz steps, so the thread feels the same on 120Hz screens
      while (acc >= STEP_MS && steps < 4) {
        moved = Math.max(moved, step());
        acc -= STEP_MS;
        steps++;
      }
      if (steps === 0) moved = 1;
      draw();

      const alphaTarget = inside && !typing ? 1 : 0;
      const settled =
        moved < 0.02 &&
        speed < 0.05 &&
        Math.abs(alpha - alphaTarget) < 0.01 &&
        Math.abs(ring - (hover ? 1 : 0)) < 0.01;
      if (!settled && !document.hidden) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!seen) {
        seen = true;
        lastX = mouseX;
        lastY = mouseY;
        hang(mouseX, mouseY);
      }
      inside = true;
      wake();
    };

    // Element checks happen on pointer over, never inside the loop.
    const onOver = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      typing = !!el?.closest(TEXT_ENTRY);
      hover = !typing && !!el?.closest(INTERACTIVE);
      wake();
    };

    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      inside = false;
      wake();
    };

    const onEnter = (e: MouseEvent) => {
      // coming back in somewhere else: drop the thread there instead of dragging it across the page
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastX = mouseX;
      lastY = mouseY;
      speed = 0;
      if (seen) hang(mouseX, mouseY);
      seen = true;
      inside = true;
      wake();
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onReduced = () => {
      reduced = reducedMq.matches;
      if (!reduced) hang(mouseX, mouseY);
      wake();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });
    html.addEventListener("mouseenter", onEnter, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reducedMq.addEventListener("change", onReduced);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("thread-cursor-on");
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onLeave);
      html.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMq.removeEventListener("change", onReduced);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="thread-cursor pointer-events-none fixed inset-0 z-[45]" />;
}
