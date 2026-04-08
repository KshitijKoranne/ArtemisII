'use client';
import { useEffect, useState } from 'react';
import VisitorCounter from './VisitorCounter';

// Launch: April 1, 2026 22:35:00 UTC
const LAUNCH_TIME = new Date('2026-04-01T22:35:00Z').getTime();

function formatMET(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hrs = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return {
    days: String(days).padStart(2, '0'),
    hrs: String(hrs).padStart(2, '0'),
    mins: String(mins).padStart(2, '0'),
    secs: String(secs).padStart(2, '0'),
  };
}

export default function Header() {
  const [met, setMet] = useState({ days: '00', hrs: '00', mins: '00', secs: '00' });
  const [utc, setUtc] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const elapsed = now - LAUNCH_TIME;
      setMet(formatMET(Math.max(0, elapsed)));
      setUtc(new Date().toUTCString().replace('GMT', 'UTC'));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="scanline-wrap relative z-10 border-b" style={{ borderColor: 'rgba(74,158,255,0.2)' }}>
      {/* Top NASA bar */}
      <div className="py-2 px-4 md:px-8 flex items-center justify-between" style={{ background: 'rgba(11,61,145,0.6)' }}>
        <div className="flex items-center gap-3">
          {/* NASA worm logo text */}
          <div className="font-orbitron text-white font-black text-sm tracking-widest">NASA</div>
          <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.25)' }}></div>
          <div className="label-tag">Artemis Program</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="live-dot"></div>
            <span className="label-tag" style={{ color: '#22c55e', letterSpacing: '0.15em' }}>MISSION ACTIVE</span>
          </div>
          <VisitorCounter />
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
           style={{ background: 'rgba(4,12,32,0.7)' }}>
        <div>
          <div className="label-tag mb-1">First Crewed Lunar Flyby Since Apollo 17 · 1972</div>
          <h1 className="font-orbitron font-black text-2xl md:text-3xl lg:text-4xl text-white glow-text tracking-wide">
            ARTEMIS <span style={{ color: '#4a9eff' }}>II</span>
          </h1>
          <div className="font-orbitron text-xs tracking-widest mt-1" style={{ color: 'var(--nasa-silver-dim)' }}>
            ORION · INTEGRITY · APR 1 – APR 10, 2026
          </div>
        </div>

        {/* MET Clock */}
        <div className="panel panel-corner p-4 min-w-[280px]">
          <div className="label-tag mb-3 text-center">Mission Elapsed Time</div>
          <div className="flex items-end gap-1 justify-center">
            {[
              { val: met.days, label: 'DAYS' },
              { val: met.hrs, label: 'HRS' },
              { val: met.mins, label: 'MIN' },
              { val: met.secs, label: 'SEC' },
            ].map((item, i) => (
              <div key={i} className="flex items-end gap-1">
                <div className="text-center">
                  <div className="telem-number font-bold text-2xl md:text-3xl glow-text" style={{ color: '#4a9eff' }}>
                    {item.val}
                  </div>
                  <div className="label-tag" style={{ fontSize: '8px' }}>{item.label}</div>
                </div>
                {i < 3 && (
                  <div className="telem-number text-2xl md:text-3xl mb-1" style={{ color: 'rgba(74,158,255,0.5)' }}>:</div>
                )}
              </div>
            ))}
          </div>
          <div className="nasa-divider my-2"></div>
          <div className="text-center label-tag" style={{ fontSize: '8px', color: 'var(--nasa-silver-dim)' }}>
            {utc}
          </div>
        </div>
      </div>
    </header>
  );
}
