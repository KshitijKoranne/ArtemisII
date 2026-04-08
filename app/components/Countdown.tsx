'use client';
import { useEffect, useState } from 'react';

const LAUNCH = new Date('2026-04-01T22:35:00Z').getTime();
const SPLASH = new Date('2026-04-10T20:07:00Z').getTime();
const TOTAL  = SPLASH - LAUNCH;

export default function Countdown() {
  const [t, setT] = useState({ d:'--', h:'--', m:'--', s:'--', pct: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const rem = Math.max(0, SPLASH - now);
      const sec = Math.floor(rem / 1000);
      setT({
        d:   String(Math.floor(sec / 86400)).padStart(2,'0'),
        h:   String(Math.floor((sec % 86400) / 3600)).padStart(2,'0'),
        m:   String(Math.floor((sec % 3600) / 60)).padStart(2,'0'),
        s:   String(sec % 60).padStart(2,'0'),
        pct: Math.min(100, Math.max(0, ((now - LAUNCH) / TOTAL) * 100)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { val: t.d, label: 'days' },
    { val: t.h, label: 'hrs'  },
    { val: t.m, label: 'min'  },
    { val: t.s, label: 'sec'  },
  ];

  return (
    <div className="card card-bracket anim-up d1" style={{ padding: '28px 24px' }}>
      {/* top */}
      <div style={{ marginBottom: 20 }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>First crewed lunar flyby since Apollo 17 · 1972</div>
        <div className="f-display" style={{ fontWeight: 900, fontSize: 'clamp(16px,2.2vw,24px)', color: '#fff', marginBottom: 3 }}>
          Splashdown Countdown
        </div>
        <div className="eyebrow" style={{ color: 'var(--text-mid)' }}>
          Pacific Ocean · Off San Diego · Apr 10 2026 · ~20:07 UTC
        </div>
      </div>

      {/* digits */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {units.map((u, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            <div style={{
              textAlign: 'center',
              background: 'rgba(45,125,210,0.08)',
              border: '1px solid rgba(45,125,210,0.22)',
              borderRadius: 6,
              padding: '12px 18px',
            }}>
              <div className="num-xl" style={{ color: 'var(--accent-hi)' }}>{u.val}</div>
              <div className="eyebrow" style={{ marginTop: 4 }}>{u.label}</div>
            </div>
            {i < 3 && (
              <div className="f-mono" style={{ fontSize: 28, fontWeight: 300, color: 'rgba(91,163,245,0.25)', marginBottom: 18 }}>:</div>
            )}
          </div>
        ))}
      </div>

      {/* progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span className="eyebrow" style={{ color: 'var(--green)', fontSize: 9 }}>▲ Launch Apr 1</span>
          <div className="badge badge-blue" style={{ fontSize: 9 }}>Return to Earth</div>
          <span className="eyebrow" style={{ fontSize: 9 }}>Splashdown Apr 10 ▲</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${t.pct}%` }} />
        </div>
        <div style={{ textAlign: 'right', marginTop: 5 }}>
          <span className="eyebrow" style={{ color: 'var(--accent-hi)', fontSize: 9 }}>{t.pct.toFixed(1)}% complete</span>
        </div>
      </div>
    </div>
  );
}
