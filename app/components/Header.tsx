'use client';
import { useEffect, useState } from 'react';
import VisitorCounter from './VisitorCounter';

const LAUNCH_TIME = new Date('2026-04-01T22:35:00Z').getTime();

function getMET(now: number) {
  const e = Math.max(0, Math.floor((now - LAUNCH_TIME) / 1000));
  return {
    d: String(Math.floor(e / 86400)).padStart(2,'0'),
    h: String(Math.floor((e % 86400) / 3600)).padStart(2,'0'),
    m: String(Math.floor((e % 3600) / 60)).padStart(2,'0'),
    s: String(e % 60).padStart(2,'0'),
  };
}

export default function Header() {
  const [met, setMet] = useState(getMET(Date.now()));

  useEffect(() => {
    const id = setInterval(() => setMet(getMET(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="relative z-20 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(5,12,26,0.95)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">

        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <div>
            <div className="eyebrow mb-0.5">NASA · Artemis Program</div>
            <div className="f-display font-black text-xl md:text-2xl text-white" style={{ letterSpacing: '0.05em' }}>
              ARTEMIS <span style={{ color: 'var(--accent-hi)' }}>II</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-10" style={{ background: 'var(--border-hi)' }} />
          <div className="hidden md:flex items-center gap-2">
            <div className="live-ring"><div className="live-dot" /></div>
            <span className="eyebrow" style={{ color: 'var(--green)', letterSpacing: '0.18em' }}>Mission Active</span>
          </div>
        </div>

        {/* Center: MET clock */}
        <div className="hidden lg:flex items-center gap-1">
          <span className="eyebrow mr-2">MET</span>
          {[
            { val: met.d, u: 'd' },
            { val: met.h, u: 'h' },
            { val: met.m, u: 'm' },
            { val: met.s, u: 's' },
          ].map((x, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="card px-2.5 py-1.5 text-center" style={{ minWidth: 46 }}>
                <div className="f-mono font-bold text-lg" style={{ color: 'var(--accent-hi)', lineHeight: 1 }}>{x.val}</div>
                <div className="eyebrow mt-0.5" style={{ fontSize: '9px' }}>{x.u}</div>
              </div>
              {i < 3 && <span className="f-mono text-lg" style={{ color: 'var(--border-hi)', marginBottom: 10 }}>:</span>}
            </div>
          ))}
        </div>

        {/* Right: Visitor + status */}
        <div className="flex items-center gap-3">
          <VisitorCounter />
          <div className="hidden md:block">
            <div className="badge badge-blue">Orion · Integrity</div>
          </div>
        </div>

      </div>
    </header>
  );
}
