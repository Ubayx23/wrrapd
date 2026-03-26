'use client';

import { useRef, useEffect } from 'react';

interface EtherealShadowProps {
  color?: string;
  animation?: { scale?: number; speed?: number };
  noise?: { opacity?: number; scale?: number };
}

export function EtherealShadow({
  color = 'rgba(76,61,143,0.9)',
  animation = { scale: 80, speed: 70 },
  noise = { opacity: 0.3, scale: 1.2 },
}: EtherealShadowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const speedFactor = (animation.speed ?? 70) * 0.00006;
    const scaleFactor = animation.scale ?? 80;

    const draw = () => {
      t += speedFactor;
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(width, height);

      const blobs = [
        { x: cx + Math.sin(t * 0.7) * scaleFactor * 2.2, y: cy + Math.cos(t * 0.5) * scaleFactor * 1.6, r: baseR * 0.6 },
        { x: cx + Math.cos(t * 0.4) * scaleFactor * 2.8, y: cy + Math.sin(t * 0.6) * scaleFactor * 2.0, r: baseR * 0.5 },
        { x: cx + Math.sin(t * 0.9) * scaleFactor * 1.4, y: cy + Math.cos(t * 0.3) * scaleFactor * 2.6, r: baseR * 0.55 },
      ];

      blobs.forEach(({ x, y, r }) => {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(7,7,15,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, [color, animation.scale, animation.speed]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#07070F', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: noise.opacity ?? 0.3,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="etheral-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={String((0.65 / (noise.scale ?? 1.2)).toFixed(4))}
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#etheral-noise)" />
      </svg>
    </div>
  );
}
