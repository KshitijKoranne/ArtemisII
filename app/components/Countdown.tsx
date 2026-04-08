'use client';
import { useEffect, useState } from 'react';

const SPLASHDOWN = new Date('2026-04-10T20:07:00Z').getTime();
const LAUNCH_TIME = new Date('2026-04-01T22:35:00Z').getTime();

interface CountdownState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  progress: number;
  complete: boolean;
}

export default function Countdown() {
  const [state, setState] = useState<CountdownState>({
    days: '--', hours: '--', minutes: '--', seconds: '--',
    progress: 0, complete: false,
  });
  const [prevSec, setPrevSec] = useState('--');

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const remaining = SPLASHDOWN - now;
      const total = SPLASHDOWN - LAUNCH_TIME;
      const elapsed = now - LAUNCH_TIME;
      const progress = Math.min(100, Math.max(0, (elapsed / total) * 100));

      if (remaining <= 0) {
        setState({ days: '00', hours: '00', minutes: '00', seconds: '00', progress: 100, complete: true });
        return;
      }

      const d = Math.floor(remaining / 86400000);
      const h = Math.floor((remaining % 86400000) / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);

      const sec = String(s).padStart(2, '0');
      setPrevSec(prev => { if (prev !== sec) return sec; return prev; });

      setState({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: sec,
        progress,
        complete: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { val: state.days, label: 'DAYS' },
    { val: state.hours, label: 'HOURS' },
    { val: state.minutes, label: 'MIN' },
    { val: state.seconds, label: 'SEC' },
  ];

  return (
    <div className="panel panel-corner p-5 md:p-6 fade-in-up delay-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="label-tag mb-1">Splashdown Countdown</div>
          <div className="font-orbitron font-bold text-sm md:text-base" style={{ color: '#f0f4ff' }}>
            RETURN TO EARTH · PACIFIC OCEAN
          </div>
          <div className="label-tag mt-1" style={{ fontSize: '9px' }}>
            Apr 10, 2026 · ~20:07 UTC · Off San Diego, CA
          </div>
        </div>
        {state.complete && (
          <div className="phase-badge glow-green" style={{ borderColor: 'rgba(34,197,94,0.5)', color: '#22c55e' }}>
            SPLASHDOWN ✓
          </div>
        )}
      </div>

      {/* Countdown digits */}
      <div className="flex items-stretch gap-2 md:gap-3 mb-5">
        {units.map((unit, i) => (
          <div key={i} className="flex-1 flex items-center gap-2 md:gap-3">
            <div className="flex-1 text-center"
                 style={{ background: 'rgba(74,158,255,0.07)', border: '1px solid rgba(74,158,255,0.18)', borderRadius: 4, padding: '12px 4px' }}>
              <div className="telem-number font-bold text-2xl md:text-4xl lg:text-5xl glow-text" style={{ color: '#4a9eff' }}>
                {unit.val}
              </div>
              <div className="label-tag mt-1" style={{ fontSize: '8px' }}>{unit.label}</div>
            </div>
            {i < 3 && (
              <div className="telem-number text-2xl md:text-3xl self-center pb-4" style={{ color: 'rgba(74,158,255,0.4)' }}>:</div>
            )}
          </div>
        ))}
      </div>

      {/* Mission progress bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="label-tag" style={{ fontSize: '8px' }}>MISSION PROGRESS</div>
          <div className="telem-number text-xs" style={{ color: '#4a9eff' }}>{state.progress.toFixed(1)}%</div>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(74,158,255,0.12)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${state.progress}%`,
              background: 'linear-gradient(to right, #0b3d91, #1a6fd8, #4a9eff)',
              boxShadow: '0 0 8px rgba(74,158,255,0.6)',
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <div className="label-tag" style={{ fontSize: '8px', color: '#22c55e' }}>▲ LAUNCH · APR 1</div>
          <div className="label-tag" style={{ fontSize: '8px' }}>SPLASHDOWN · APR 10 ▲</div>
        </div>
      </div>
    </div>
  );
}
