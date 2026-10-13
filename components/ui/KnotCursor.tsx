"use client";

import { useEffect, useRef, useState } from "react";

// The cursor is a small knot of thread around the pointer.
// At rest it is a trefoil that turns slowly, breathes, then goes still.
// Move fast and it pulls tight and spins with you; slow down and it loosens again.
// Over links and buttons it unties completely into a lavender ring. Desktop only, purely decorative.
//
// The shape is one closed curve: a ring drawn twice, plus a smaller circle at half the turn rate.
//   p(u) = 2 (sin 2u, -cos 2u) + k (sin u, cos u)
// k = 0 is a clean ring, k = 1 is the classic trefoil knot. Strands are drawn in order of the
// trefoil's depth, -sin 3u, so the crossings go over and under like real thread.

const SAMPLES = 120;
const CHUNKS = 30;
const RADIUS = 12.5; // px from the center to the outside of the knot, whatever its shape
const RING_SCALE = 7; // 2 units * 7 = a 28px ring
const K_REST = 1; // a clear trefoil
const K_FAST = 1.8; // pulled tight, the lobes stretch out
const MAX_LAG = 10; // px the knot may trail behind the pointer
const IDLE_MS = 3500; // how long the knot keeps turning after the mouse stops
const STEP_MS = 1000 / 60;

const INK = "29,27,38";
const BG = "245,238,226";
const LAVENDER = "124,111,208";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED = "(prefers-reduced-motion: reduce)";
const INTERACTIVE = "a[href], button, [role='button'], summary, label, select";
const TEXT_ENTRY =
  "textarea, [contenteditable='true'], input:not([type='button']):not([type='submit']):not([type='reset']):not([type='checkbox']):not([type='radio']):not([type='range']):not([type='color']):not([type='file'])";

export default function KnotCursor() {
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
    html.classList.add("custom-cursor-on");
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

    let mouseX = -100;
    let mouseY = -100;
    let cx = mouseX; // the knot trails the pointer a little
    let cy = mouseY;
    let lastX = mouseX;
    let lastY = mouseY;
    let seen = false;
    let speed = 0;
    let spinDir = 1;

    let inside = false;
    let hover = false;
    let typing = false;
    let alpha = 0;
    let ring = 0; // 0 knot, 1 lavender ring
    let k = K_REST;
    let angle = 0;
    let clock = 0; // ms of animation, for the breath
    let idle = IDLE_MS; // ms since the mouse last moved

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

    const step = () => {
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      lastX = mouseX;
      lastY = mouseY;
      speed = speed * 0.82 + Math.hypot(dx, dy) * 0.18;
      if (Math.abs(dx) > 0.5) spinDir = dx > 0 ? 1 : -1;
      idle += STEP_MS;
      clock += STEP_MS;

      alpha += ((inside && !typing ? 1 : 0) - alpha) * 0.2;
      ring += ((hover ? 1 : 0) - ring) * (reduced ? 1 : 0.2);

      if (reduced) {
        cx = mouseX;
        cy = mouseY;
        k = hover ? 0 : K_REST;
        return;
      }

      // Tangles quickly, loosens slowly.
      const fast = Math.min(Math.max((speed - 3) / 22, 0), 1);
      const target = hover ? 0 : K_REST + (K_FAST - K_REST) * fast;
      k += (target - k) * (target > k ? 0.25 : 0.06);

      // A slow turn at rest that winds down after the mouse stops, faster while moving.
      const life = Math.max(1 - idle / IDLE_MS, 0);
      angle += (0.006 * life + 0.05 * fast) * spinDir;

      cx += (mouseX - cx) * 0.5;
      cy += (mouseY - cy) * 0.5;
      const lag = Math.hypot(mouseX - cx, mouseY - cy);
      if (lag > MAX_LAG) {
        cx = mouseX + ((cx - mouseX) / lag) * MAX_LAG;
        cy = mouseY + ((cy - mouseY) / lag) * MAX_LAG;
      }
    };

    // Curve points, reused every frame.
    const xs = new Float32Array(SAMPLES + 1);
    const ys = new Float32Array(SAMPLES + 1);
    const order = Array.from({ length: CHUNKS }, (_, i) => i);
    const depth = new Float32Array(CHUNKS);

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      if (alpha < 0.01 || !seen) return;

      const breath = reduced ? 1 : 1 + 0.05 * Math.sin((clock / 4000) * Math.PI * 2) * Math.max(1 - idle / IDLE_MS, 0);
      const s = (RADIUS / (2 + k) + (RING_SCALE - RADIUS / (2 + k)) * ring) * breath;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      for (let i = 0; i <= SAMPLES; i++) {
        const u = (i / SAMPLES) * Math.PI * 2;
        const x = 2 * Math.sin(2 * u) + k * Math.sin(u);
        const y = -2 * Math.cos(2 * u) + k * Math.cos(u);
        xs[i] = cx + (x * cos - y * sin) * s;
        ys[i] = cy + (x * sin + y * cos) * s;
      }

      // Lower strands first, so the upper ones pass over them.
      const per = SAMPLES / CHUNKS;
      for (let c = 0; c < CHUNKS; c++) depth[c] = -Math.sin(3 * (((c + 0.5) * per) / SAMPLES) * Math.PI * 2);
      order.sort((a, b) => depth[a] - depth[b]);

      const color = ring > 0.5 ? LAVENDER : INK;
      const inkAlpha = (ring > 0.5 ? ring : 0.9 * (1 - ring) + 0.1) * alpha;
      ctx.lineJoin = "round";
      for (const c of order) {
        const from = Math.round(c * per);
        const to = Math.round((c + 1) * per);
        ctx.beginPath();
        ctx.moveTo(xs[from], ys[from]);
        for (let i = from + 1; i <= to; i++) ctx.lineTo(xs[i], ys[i]);
        // a paper-colored gap under each strand makes the crossing read as over and under
        ctx.lineCap = "butt";
        ctx.lineWidth = 3.2;
        ctx.strokeStyle = `rgba(${BG},${alpha * (1 - ring)})`;
        ctx.stroke();
        ctx.lineCap = "round";
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = `rgba(${color},${inkAlpha})`;
        ctx.stroke();
      }

      // The exact pointer position, so aiming stays precise.
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${INK},${alpha * (1 - ring)})`;
      ctx.fill();
    };

    function frame(now: number) {
      raf = 0;
      acc += Math.min(now - last, 100);
      last = now;
      let steps = 0;
      // fixed 60Hz steps, so it feels the same on 120Hz screens
      while (acc >= STEP_MS && steps < 4) {
        step();
        acc -= STEP_MS;
        steps++;
      }
      draw();

      const kTarget = hover ? 0 : K_REST;
      const settled =
        steps > 0 &&
        idle >= IDLE_MS &&
        speed < 0.05 &&
        Math.abs(k - kTarget) < 0.005 &&
        Math.abs(ring - (hover ? 1 : 0)) < 0.01 &&
        Math.abs(alpha - (inside && !typing ? 1 : 0)) < 0.01 &&
        Math.abs(mouseX - cx) + Math.abs(mouseY - cy) < 0.1;
      if (!settled && !document.hidden) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!seen) {
        seen = true;
        cx = lastX = mouseX;
        cy = lastY = mouseY;
      }
      inside = true;
      idle = 0;
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
      mouseX = cx = lastX = e.clientX;
      mouseY = cy = lastY = e.clientY;
      speed = 0;
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
      html.classList.remove("custom-cursor-on");
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
  return <canvas ref={canvasRef} aria-hidden="true" className="custom-cursor pointer-events-none fixed inset-0 z-[45]" />;
}
