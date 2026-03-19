'use client';
import { useEffect, useRef, useCallback } from 'react';
import createGlobe, { COBEOptions } from 'cobe';

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.3, 0.27, 0.6],
  markerColor: [0.48, 0.41, 0.93],
  glowColor: [0.28, 0.22, 0.55],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [-33.8688, 151.2093], size: 0.06 },
    { location: [51.5074, -0.1278], size: 0.08 },
    { location: [48.8566, 2.3522], size: 0.07 },
    { location: [32.7767, -96.797], size: 0.07 },
    { location: [1.3521, 103.8198], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.08 },
  ],
};

export default function Globe() {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const rRef = useRef(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rRef.current = delta / 200;
    }
  };

  const onRender = useCallback((state: Record<string, number>) => {
    if (!pointerInteracting.current) phi += 0.003;
    state.phi = phi + rRef.current;
    state.width = width * 2;
    state.height = width * 2;
  }, []);

  const onResize = () => {
    if (canvasRef.current) width = canvasRef.current.offsetWidth;
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    const globe = createGlobe(canvasRef.current!, {
      ...GLOBE_CONFIG,
      width: width * 2,
      height: width * 2,
      onRender,
    });
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    });
    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1/1',
      maxWidth: 680,
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0,
          transition: 'opacity 0.5s ease',
          cursor: 'grab',
        }}
        onPointerDown={e => updatePointerInteraction(e.clientX - pointerInteractionMovement.current)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={e => updateMovement(e.clientX)}
        onTouchMove={e => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
      {/* Label below globe */}
      <div style={{
        position: 'absolute',
        bottom: -32,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Poppins, sans-serif',
        fontSize: 12,
        color: 'rgba(255,255,255,0.25)',
        whiteSpace: 'nowrap',
        letterSpacing: '0.5px',
      }}>
        you are not alone in this.
      </div>
    </div>
  );
}
