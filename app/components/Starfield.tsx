'use client';
import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const stars: { x: number; y: number; r: number; opacity: number; twinkleSpeed: number; twinklePhase: number }[] = [];

    function init() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      stars.length = 0;
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          r: Math.random() * 1.2 + 0.2,
          opacity: Math.random() * 0.6 + 0.1,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    }

    let frame = 0;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      frame++;
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const opacity = star.opacity * (0.7 + 0.3 * Math.sin(star.twinklePhase));
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx!.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
