'use client';
import { useEffect, useState } from 'react';

const LAUNCH = new Date('2026-04-01T22:35:00Z').getTime();
const SPLASH = new Date('2026-04-10T20:07:00Z').getTime();
const TOTAL  = SPLASH - LAUNCH;

const PHASE_MAP = [
  [0,     3,    'Earth Orbit'],
  [3,     117,  'Translunar Coast'],
  [117,   123,  'Lunar Flyby ✓'],
  [123,   215,  'Return to Earth'],
  [215,   220,  'Reentry'],
] as const;

function getPhase(met_h: number) {
  for (const [a, b, label] of PHASE_MAP) if (met_h >= a && met_h < b) return label;
  return met_h >= 220 ? 'Splashdown ✓' : 'Pre-Launch';
}

export default function HeroStrip() {
  const [state, setState] = useState({ d:'--', h:'--', m:'--', s:'--', pct:0, phase:'—' });

  useEffect(() => {
    const tick = () => {
      const now  = Date.now();
      const rem  = Math.max(0, SPLASH - now);
      const sec  = Math.floor(rem / 1000);
      const pct  = Math.min(100, Math.max(0, ((now - LAUNCH) / TOTAL) * 100));
      const met_h = (now - LAUNCH) / 3600000;
      setState({
        d: String(Math.floor(sec / 86400)).padStart(2,'0'),
        h: String(Math.floor((sec % 86400) / 3600)).padStart(2,'0'),
        m: String(Math.floor((sec % 3600) / 60)).padStart(2,'0'),
        s: String(sec % 60).padStart(2,'0'),
        pct,
        phase: getPhase(met_h),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { val: state.d, label: 'days' },
    { val: state.h, label: 'hrs'  },
    { val: state.m, label: 'min'  },
    { val: state.s, label: 'sec'  },
  ];

  return (
    <div className="card card-bracket anim-up d1"
         style={{ padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* right glow */}
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'45%',
        background:'radial-gradient(ellipse at right center,rgba(45,125,210,0.07) 0%,transparent 70%)',
        pointerEvents:'none' }} />

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, flexWrap:'wrap' }}>

        {/* Left text */}
        <div style={{ flex:1, minWidth:220 }}>
          <div className="eyebrow" style={{ marginBottom:6 }}>First crewed lunar flyby since Apollo 17 · 1972</div>
          <div className="f-display" style={{ fontWeight:900, fontSize:'clamp(18px,2.5vw,26px)', color:'#fff', marginBottom:4 }}>
            Splashdown Countdown
          </div>
          <div className="eyebrow" style={{ color:'var(--text-mid)' }}>
            Pacific Ocean · Off San Diego · Apr 10 2026 · ~20:07 UTC
          </div>

          {/* Progress */}
          <div style={{ marginTop:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
              <span className="eyebrow" style={{ color:'var(--green)', fontSize:8 }}>▲ Launch Apr 1</span>
              <span className="badge badge-blue" style={{ fontSize:9 }}>{state.phase}</span>
              <span className="eyebrow" style={{ fontSize:8 }}>Splashdown Apr 10 ▲</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width:`${state.pct}%` }} />
            </div>
            <div style={{ textAlign:'right', marginTop:5 }}>
              <span className="eyebrow" style={{ color:'var(--accent-hi)', fontSize:9 }}>{state.pct.toFixed(1)}% complete</span>
            </div>
          </div>
        </div>

        {/* Countdown digits */}
        <div style={{ display:'flex', alignItems:'flex-end', gap:6, flexShrink:0 }}>
          {units.map((u, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-end', gap:6 }}>
              <div style={{
                textAlign:'center',
                background:'rgba(45,125,210,0.08)',
                border:'1px solid rgba(45,125,210,0.22)',
                borderRadius:6,
                padding:'clamp(10px,1.5vw,16px) clamp(14px,2vw,22px)',
              }}>
                <div className="num-xl" style={{ color:'var(--accent-hi)' }}>{u.val}</div>
                <div className="eyebrow" style={{ marginTop:4 }}>{u.label}</div>
              </div>
              {i < 3 && (
                <div className="f-mono" style={{ fontSize:26, fontWeight:300, color:'rgba(91,163,245,0.25)', marginBottom:18 }}>:</div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
