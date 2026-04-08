'use client';
import { useEffect, useRef } from 'react';

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    let raf: number;

    type Star = { x: number; y: number; r: number; o: number; s: number; p: number };
    let stars: Star[] = [];

    const init = () => {
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.1 + 0.2,
        o: Math.random() * 0.5 + 0.08,
        s: Math.random() * 0.018 + 0.004,
        p: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const s of stars) {
        s.p += s.s;
        ctx.globalAlpha = s.o * (0.65 + 0.35 * Math.sin(s.p));
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.5 }}
    />
  );
}
