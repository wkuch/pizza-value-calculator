'use client';

import { useEffect, useRef, useState } from 'react';

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export default function BackgroundFX() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const handleMove = (evt: PointerEvent) => {
      setMouseX(evt.clientX);
      setMouseY(evt.clientY);
    };

    const handleDown = (evt: PointerEvent) => {
      const x = evt.clientX;
      const y = evt.clientY;
      const id = rippleIdRef.current++;
      setRipples((prev) => [...prev, { id, x, y }]);
      // Cleanup ripple after animation completes
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 900);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerdown', handleDown);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-[5]">
      {mouseX !== null && mouseY !== null && (
        <div
          aria-hidden
          style={{ transform: `translate3d(${mouseX - 200}px, ${mouseY - 200}px, 0)` }}
          className="pointer-glow h-[400px] w-[400px] opacity-60 will-change-transform"
        />
      )}
      {/* Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          style={{ left: r.x, top: r.y }}
          className="ripple-effect"
        />
      ))}
    </div>
  );
}


