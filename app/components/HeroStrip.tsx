'use client';
import { useEffect, useState } from 'react';

const LAUNCH   = new Date('2026-04-01T22:35:00Z').getTime();
const SPLASH   = new Date('2026-04-10T20:07:00Z').getTime();
const TOTAL    = SPLASH - LAUNCH;

export default function HeroStrip() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState('RETURN TO EARTH');
  const [timeLeft, setTimeLeft] = useState({ d:'--', h:'--', m:'--', s:'--' });

  useEffect(() => {
    const tick = () => {
      const now   = Date.now();
      const pct   = Math.min(100, Math.max(0, ((now - LAUNCH) / TOTAL) * 100));
      const rem   = Math.max(0, SPLASH - now);
      const s     = Math.floor(rem / 1000);
      setProgress(pct);
      setTimeLeft({
        d: String(Math.floor(s / 86400)).padStart(2,'0'),
        h: String(Math.floor((s % 86400) / 3600)).padStart(2,'0'),
        m: String(Math.floor((s % 3600) / 60)).padStart(2,'0'),
        s: String(s % 60).padStart(2,'0'),
      });
      const met_h = (now - LAUNCH) / 3600000;
      if      (met_h < 3)    setPhase('EARTH ORBIT');
      else if (met_h < 117)  setPhase('TRANSLUNAR COAST');
      else if (met_h < 123)  setPhase('LUNAR FLYBY ✓');
      else if (met_h < 215)  setPhase('RETURN TO EARTH');
      else                   setPhase('REENTRY');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { val: timeLeft.d, label: 'days' },
    { val: timeLeft.h, label: 'hrs'  },
    { val: timeLeft.m, label: 'min'  },
    { val: timeLeft.s, label: 'sec'  },
  ];

  return (
    <div className="card card-bracket relative overflow-hidden anim-up d1" style={{ padding: '32px 28px 28px' }}>
      {/* Subtle right-side glow */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%',
        background: 'radial-gradient(ellipse at right center, rgba(45,125,210,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="flex flex-col md:flex-row md:items-center gap-8">

        {/* Left: context */}
        <div className="flex-1">
          <div className="eyebrow mb-2">First crewed lunar flyby since Apollo 17 · 1972</div>
          <h2 className="f-display font-black text-white mb-1" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '0.04em' }}>
            Splashdown Countdown
          </h2>
          <div className="eyebrow" style={{ color: 'var(--text-mid)' }}>Pacific Ocean · Off San Diego · Apr 10 2026 · ~20:07 UTC</div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <span className="eyebrow" style={{ color: 'var(--green)' }}>▲ Launch Apr 1</span>
              <div className="badge badge-blue">{phase}</div>
              <span className="eyebrow">Splashdown Apr 10 ▲</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-1.5 text-right eyebrow" style={{ color: 'var(--accent-hi)' }}>
              {progress.toFixed(1)}% complete
            </div>
          </div>
        </div>

        {/* Right: countdown digits */}
        <div className="flex items-end gap-2 md:gap-3">
          {units.map((u, i) => (
            <div key={i} className="flex items-end gap-2 md:gap-3">
              <div className="text-center" style={{
                background: 'rgba(45,125,210,0.08)',
                border: '1px solid rgba(45,125,210,0.2)',
                borderRadius: 6,
                padding: 'clamp(10px,1.5vw,18px) clamp(14px,2vw,24px)',
              }}>
                <div className="num-xl" style={{ color: 'var(--accent-hi)' }}>{u.val}</div>
                <div className="eyebrow mt-1">{u.label}</div>
              </div>
              {i < 3 && (
                <div className="f-mono text-2xl md:text-3xl font-light mb-4" style={{ color: 'rgba(91,163,245,0.3)' }}>:</div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
