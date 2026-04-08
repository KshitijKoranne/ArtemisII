'use client';
import { useState, useEffect } from 'react';

const LAUNCH = new Date('2026-04-01T22:35:00Z').getTime();

const EVENTS = [
  { id:'launch',   label:'Launch',               detail:'SLS lifts off from LC-39B, Kennedy Space Center', t:new Date('2026-04-01T22:35:00Z'), type:'milestone' },
  { id:'tli',      label:'Trans-Lunar Injection', detail:'ICPS fires — Orion escapes Earth orbit toward the Moon', t:new Date('2026-04-02T01:35:00Z'), type:'maneuver'  },
  { id:'prox',     label:'Proximity Operations',  detail:'Manual spacecraft handling + proximity ops flight test', t:new Date('2026-04-03T00:00:00Z'), type:'science'   },
  { id:'record',   label:'Distance Record ★',     detail:'252,760 mi from Earth — farthest humans have ever traveled', t:new Date('2026-04-06T13:56:00Z'), type:'milestone' },
  { id:'approach', label:'Closest Moon Approach', detail:'Orion passes ~4,067 mi from lunar surface at 60,863 mph', t:new Date('2026-04-06T20:26:00Z'), type:'milestone' },
  { id:'eclipse',  label:'Solar Eclipse',         detail:'Moon eclipses Sun — crew observes corona for ~54 min', t:new Date('2026-04-06T20:35:00Z'), type:'science'   },
  { id:'blackout', label:'Comms Blackout',        detail:'~40 min behind the Moon, no signal from Deep Space Network', t:new Date('2026-04-06T21:00:00Z'), type:'comms'     },
  { id:'return',   label:'Begin Return to Earth', detail:'Orion completes flyby and heads home', t:new Date('2026-04-06T21:35:00Z'), type:'milestone' },
  { id:'mcc1',     label:'Return Burn MCC-R1',    detail:'First return trajectory correction burn', t:new Date('2026-04-08T00:03:00Z'), type:'maneuver'  },
  { id:'mcc2',     label:'Return Burn MCC-R2',    detail:'Second return trajectory correction burn', t:new Date('2026-04-09T06:00:00Z'), type:'maneuver'  },
  { id:'mcc3',     label:'Return Burn MCC-R3',    detail:'Final return trajectory correction burn', t:new Date('2026-04-10T14:00:00Z'), type:'maneuver'  },
  { id:'reentry',  label:'Reentry',               detail:'Skip reentry at 25,000 mph — peak heat shield loads', t:new Date('2026-04-10T19:30:00Z'), type:'milestone' },
  { id:'splash',   label:'Splashdown',            detail:'Orion splashes down off San Diego · USS John P. Murtha recovery', t:new Date('2026-04-10T20:07:00Z'), type:'milestone' },
];

const TYPE_COLOR: Record<string,string> = {
  milestone:'var(--accent-hi)', maneuver:'var(--amber)', science:'var(--green)', comms:'#a78bfa',
};

function getStatus(i: number, now: number) {
  const tMs   = EVENTS[i].t.getTime();
  const nextMs = EVENTS[i+1]?.t.getTime() ?? tMs + 7200000;
  if (now > nextMs) return 'done';
  if (now >= tMs)   return 'active';
  return 'upcoming';
}

export default function Timeline() {
  const [now,  setNow]  = useState(Date.now());
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  const doneCount = EVENTS.filter((_,i) => getStatus(i,now) === 'done').length;

  return (
    <div className="card anim-up d3">
      <button className="accordion-trigger" style={{ padding:'14px 18px' }} onClick={() => setOpen(o=>!o)}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span className="eyebrow" style={{ color:'#fff', fontSize:10, letterSpacing:'0.18em' }}>Mission Timeline</span>
          <span className="badge badge-blue">{doneCount} / {EVENTS.length} complete</span>
        </div>
        <svg className={`accordion-chevron${open?' open':''}`} viewBox="0 0 24 24" strokeWidth="2"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && (
        <div style={{ padding:'0 18px 16px' }}>
          <div className="rule" style={{ marginBottom:12 }} />

          {/* legend */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:12 }}>
            {Object.entries(TYPE_COLOR).map(([type,color]) => (
              <div key={type} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:color, flexShrink:0 }} />
                <span className="eyebrow" style={{ color, fontSize:8 }}>{type}</span>
              </div>
            ))}
          </div>

          <div style={{ position:'relative', maxHeight:400, overflowY:'auto', paddingRight:2 }}>
            {/* vertical line */}
            <div style={{ position:'absolute', left:4, top:6, bottom:6, width:1, background:'var(--border)' }} />

            {EVENTS.map((ev,i) => {
              const s     = getStatus(i, now);
              const color = TYPE_COLOR[ev.type];
              return (
                <div key={ev.id}
                     style={{
                       display:'flex', gap:14, padding:'8px 8px 8px',
                       borderRadius:4, marginLeft:-2,
                       borderLeft:`2px solid ${s==='active' ? color : 'transparent'}`,
                       background: s==='active' ? 'rgba(45,125,210,0.06)' : 'transparent',
                     }}>
                  <div className={`tl-node ${s==='done'?'tl-done':s==='active'?'tl-active':'tl-upcoming'}`} style={{ marginLeft:2 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:6, marginBottom:2 }}>
                      <span className="f-display" style={{ fontSize:11, fontWeight:700, color: s==='upcoming' ? 'var(--text-dim)' : '#fff', letterSpacing:'0.04em' }}>
                        {ev.label}
                      </span>
                      {s==='done'   && <span className="eyebrow" style={{ color:'var(--green)', fontSize:8 }}>✓</span>}
                      {s==='active' && <span className="badge badge-blue" style={{ fontSize:8, padding:'1px 6px' }}>NOW</span>}
                    </div>
                    <div className="eyebrow" style={{ fontSize:8, marginBottom: s!=='upcoming'?4:0 }}>
                      {ev.t.toUTCString().slice(5,16)} UTC · MET+{((ev.t.getTime()-LAUNCH)/3600000).toFixed(1)}h
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
