'use client';
import { useState, useEffect } from 'react';

const LAUNCH_MS = 1775082900000; // 2026-04-01T22:35:00Z

const EVENTS = [
  { id:'launch',   label:'Launch',               detail:'SLS lifts off from LC-39B, Kennedy Space Center',          t:1775082900000, type:'milestone' },
  { id:'tli',      label:'Trans-Lunar Injection', detail:'ICPS fires — Orion escapes Earth orbit toward the Moon',   t:1775093700000, type:'maneuver'  },
  { id:'prox',     label:'Proximity Operations',  detail:'Manual spacecraft handling + proximity ops flight test',   t:1775174400000, type:'science'   },
  { id:'record',   label:'Distance Record ★',     detail:'252,760 mi from Earth — farthest humans have ever traveled', t:1775483760000, type:'milestone' },
  { id:'approach', label:'Closest Moon Approach', detail:'Orion passes ~4,067 mi from lunar surface at 60,863 mph',  t:1775507160000, type:'milestone' },
  { id:'eclipse',  label:'Solar Eclipse',         detail:'Moon eclipses Sun — crew observes solar corona ~54 min',   t:1775507700000, type:'science'   },
  { id:'blackout', label:'Comms Blackout',        detail:'~40 min behind the Moon — Deep Space Network loses signal', t:1775509200000, type:'comms'     },
  { id:'return',   label:'Begin Return to Earth', detail:'Orion completes flyby and heads home',                     t:1775511300000, type:'milestone' },
  { id:'mcc1',     label:'Return Burn MCC-R1',    detail:'First return trajectory correction burn',                  t:1775606580000, type:'maneuver'  },
  { id:'mcc2',     label:'Return Burn MCC-R2',    detail:'Second return trajectory correction burn',                 t:1775714400000, type:'maneuver'  },
  { id:'mcc3',     label:'Return Burn MCC-R3',    detail:'Final return trajectory correction burn',                  t:1775829600000, type:'maneuver'  },
  { id:'reentry',  label:'Reentry',               detail:'Skip reentry at 25,000 mph — peak heat shield loads',     t:1775849400000, type:'milestone' },
  { id:'splash',   label:'Splashdown',            detail:'Orion splashes down off San Diego · USS John P. Murtha recovery', t:1775851620000, type:'milestone' },
];

const TYPE_COLOR: Record<string,string> = {
  milestone:'var(--accent-hi)', maneuver:'var(--amber)', science:'var(--green)', comms:'#a78bfa',
};

function getStatus(i: number, now: number) {
  const tMs   = EVENTS[i].t;
  const nextMs = EVENTS[i+1]?.t ?? tMs + 7_200_000;
  if (now > nextMs) return 'done';
  if (now >= tMs)   return 'active';
  return 'upcoming';
}

// Active glow keyframes injected once
const GLOW_CSS = `
@keyframes activeGlow {
  0%,100% { box-shadow: 0 0 6px var(--accent-hi), 0 0 12px rgba(91,163,245,0.4); }
  50%      { box-shadow: 0 0 14px var(--accent-hi), 0 0 28px rgba(91,163,245,0.7); }
}
@keyframes rowPulse {
  0%,100% { background: rgba(45,125,210,0.06); }
  50%      { background: rgba(45,125,210,0.12); }
}
`;

export default function Timeline() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!document.getElementById('tl-glow-css')) {
      const s = document.createElement('style');
      s.id = 'tl-glow-css';
      s.textContent = GLOW_CSS;
      document.head.appendChild(s);
    }
    setMounted(true);
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(id);
  }, []);

  const safeNow = mounted ? now : 0;
  const doneCount = EVENTS.filter((_,i) => getStatus(i,safeNow) === 'done').length;

  // Reversed: current/upcoming at top, done at bottom
  const displayEvents = [...EVENTS].reverse();

  return (
    <div className="card anim-up d3">
      <button className="accordion-trigger" style={{ padding:'14px 18px' }} onClick={() => setOpen(o=>!o)}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span className="eyebrow" style={{ color:'#fff', fontSize:10, letterSpacing:'0.18em' }}>Mission Timeline</span>
          <span className="badge badge-blue">{doneCount} / {EVENTS.length} complete</span>
        </div>
        <svg className={`accordion-chevron${open?' open':''}`} viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{ padding:'0 18px 16px' }}>
          <div className="rule" style={{ marginBottom:12 }} />

          {/* Legend */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:14 }}>
            {Object.entries(TYPE_COLOR).map(([type, color]) => (
              <div key={type} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:color, flexShrink:0 }} />
                <span className="eyebrow" style={{ color, fontSize:8 }}>{type}</span>
              </div>
            ))}
          </div>

          {/* Scroll container */}
          <div style={{ position:'relative', maxHeight:420, overflowY:'auto', paddingRight:2 }}>
            {/* Vertical line */}
            <div style={{ position:'absolute', left:4, top:6, bottom:6, width:1, background:'var(--border)' }} />

            {displayEvents.map((ev) => {
              const origIdx = EVENTS.findIndex(e => e.id === ev.id);
              const s       = getStatus(origIdx, safeNow);
              const color   = TYPE_COLOR[ev.type];
              const isActive = s === 'active';

              return (
                <div key={ev.id}
                     style={{
                       display:'flex', gap:14,
                       padding:'8px 8px',
                       borderRadius:4,
                       marginLeft:-2,
                       borderLeft:`2px solid ${isActive ? color : 'transparent'}`,
                       animation: isActive ? 'rowPulse 2.5s ease-in-out infinite' : 'none',
                       background: isActive ? 'rgba(45,125,210,0.06)' : 'transparent',
                       marginBottom:2,
                     }}>
                  {/* Node */}
                  <div style={{ paddingLeft:2, paddingTop:3, flexShrink:0 }}>
                    <div style={{
                      width:10, height:10, borderRadius:'50%', border:'2px solid',
                      borderColor: s==='done' ? 'var(--green)' : isActive ? 'var(--accent-hi)' : 'rgba(107,131,166,0.4)',
                      background:  s==='done' ? 'rgba(16,185,129,0.3)' : isActive ? 'var(--accent)' : 'transparent',
                      animation:   isActive ? 'activeGlow 2s ease-in-out infinite' : 'none',
                    }} />
                  </div>

                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:6, marginBottom:2 }}>
                      <span className="f-display" style={{
                        fontSize:11, fontWeight:700, letterSpacing:'0.04em',
                        color: s==='upcoming' ? 'var(--text-dim)' : '#fff',
                      }}>
                        {ev.label}
                      </span>
                      {s==='done'   && <span className="eyebrow" style={{ color:'var(--green)', fontSize:8 }}>✓</span>}
                      {isActive && (
                        <span className="badge badge-blue" style={{ fontSize:8, padding:'1px 6px', animation:'rowPulse 2.5s ease-in-out infinite' }}>
                          ● NOW
                        </span>
                      )}
                    </div>
                    <div className="eyebrow" style={{ fontSize:8, marginBottom: s!=='upcoming' ? 3 : 0, color:'var(--text-dim)' }}>
                      {new Date(ev.t).toUTCString().slice(5,16)} UTC · MET+{((ev.t - LAUNCH_MS)/3_600_000).toFixed(1)}h
                    </div>
                    {s !== 'upcoming' && (
                      <div style={{ fontSize:11, color:'var(--text-dim)', lineHeight:1.5 }}>{ev.detail}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
