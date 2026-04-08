'use client';
import { useState, useEffect } from 'react';

const LAUNCH = new Date('2026-04-01T22:35:00Z').getTime();

const EVENTS = [
  { id:'launch',    label:'Launch',                   detail:'SLS lifts off from LC-39B, Kennedy Space Center',                              t:new Date('2026-04-01T22:35:00Z'), type:'milestone' },
  { id:'tli',       label:'Trans-Lunar Injection',     detail:'ICPS fires — Orion escapes Earth orbit toward the Moon',                        t:new Date('2026-04-02T01:35:00Z'), type:'maneuver'  },
  { id:'prox',      label:'Proximity Operations',      detail:'Manual spacecraft handling + proximity ops flight test objectives',             t:new Date('2026-04-03T00:00:00Z'), type:'science'   },
  { id:'record',    label:'Distance Record ★',         detail:'252,760 mi from Earth — farthest humans have ever traveled. Breaks Apollo 13', t:new Date('2026-04-06T13:56:00Z'), type:'milestone' },
  { id:'approach',  label:'Closest Moon Approach',     detail:'Orion passes ~4,067 mi from lunar surface at 60,863 mph',                       t:new Date('2026-04-06T20:26:00Z'), type:'milestone' },
  { id:'eclipse',   label:'Solar Eclipse',             detail:'Moon eclipses the Sun — crew observes corona for ~54 minutes',                  t:new Date('2026-04-06T20:35:00Z'), type:'science'   },
  { id:'blackout',  label:'Comms Blackout',            detail:'~40 min behind the Moon, Deep Space Network loses signal',                      t:new Date('2026-04-06T21:00:00Z'), type:'comms'     },
  { id:'return',    label:'Begin Return to Earth',     detail:'Orion completes flyby and heads home',                                          t:new Date('2026-04-06T21:35:00Z'), type:'milestone' },
  { id:'mcc1',      label:'Return Burn MCC-R1',        detail:'First return trajectory correction burn',                                       t:new Date('2026-04-08T00:03:00Z'), type:'maneuver'  },
  { id:'mcc2',      label:'Return Burn MCC-R2',        detail:'Second trajectory correction burn',                                             t:new Date('2026-04-09T06:00:00Z'), type:'maneuver'  },
  { id:'mcc3',      label:'Return Burn MCC-R3',        detail:'Final trajectory correction burn',                                              t:new Date('2026-04-10T14:00:00Z'), type:'maneuver'  },
  { id:'reentry',   label:'Reentry',                   detail:'Skip reentry at 25,000 mph — peak heat shield loads',                           t:new Date('2026-04-10T19:30:00Z'), type:'milestone' },
  { id:'splash',    label:'Splashdown',                detail:'Orion splashes down off San Diego · USS John P. Murtha recovery',               t:new Date('2026-04-10T20:07:00Z'), type:'milestone' },
];

const TYPE_COLOR: Record<string,string> = {
  milestone:'var(--accent-hi)', maneuver:'var(--amber)', science:'var(--green)', comms:'#a78bfa'
};

function status(idx: number, now: number) {
  const tMs   = EVENTS[idx].t.getTime();
  const nextMs = EVENTS[idx+1]?.t.getTime() ?? tMs + 7200000;
  if (now > nextMs) return 'done';
  if (now >= tMs)   return 'active';
  return 'upcoming';
}

export default function Timeline() {
  const [now, setNow]     = useState(Date.now());
  const [open, setOpen]   = useState(true);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  // Find active or next upcoming index to auto-scroll to
  const focusIdx = EVENTS.findIndex((_, i) => status(i, now) === 'active')
    ?? EVENTS.findIndex((_, i) => status(i, now) === 'upcoming');

  return (
    <div className="card anim-up d3">
      {/* Accordion header */}
      <button className="accordion-trigger p-5" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-3">
          <span className="eyebrow text-white" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>Mission Timeline</span>
          <div className="badge badge-blue">{EVENTS.filter((_,i) => status(i,now)==='done').length} / {EVENTS.length} complete</div>
        </div>
        <svg className={`accordion-chevron ${open ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="rule mb-4" />
          {/* Type legend */}
          <div className="flex flex-wrap gap-3 mb-4">
            {Object.entries(TYPE_COLOR).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                <span className="eyebrow" style={{ color, fontSize: '9px' }}>{type}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div style={{ position:'absolute', left:4, top:6, bottom:6, width:1, background:'var(--border)' }} />

            <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 4 }}>
              {EVENTS.map((ev, i) => {
                const s = status(i, now);
                const color = TYPE_COLOR[ev.type];
                return (
                  <div key={ev.id}
                       className="flex gap-4 py-2.5 rounded px-2 -mx-2 transition-colors duration-200"
                       style={{ background: s === 'active' ? 'rgba(45,125,210,0.07)' : 'transparent',
                                borderLeft: s === 'active' ? `2px solid ${color}` : '2px solid transparent' }}>
                    <div className="flex-shrink-0 pt-0.5" style={{ paddingLeft: 0 }}>
                      <div className={`tl-node ${s === 'done' ? 'tl-done' : s === 'active' ? 'tl-active' : 'tl-upcoming'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="f-display font-bold text-xs"
                              style={{ color: s === 'upcoming' ? 'var(--text-dim)' : 'var(--text)', letterSpacing: '0.04em' }}>
                          {ev.label}
                        </span>
                        {s === 'done'   && <span className="eyebrow" style={{ color:'var(--green)', fontSize:'8px' }}>✓</span>}
                        {s === 'active' && <span className="badge badge-blue" style={{ fontSize:'8px', padding:'1px 7px' }}>NOW</span>}
                      </div>
                      <div className="eyebrow mb-1" style={{ fontSize:'9px' }}>
                        {ev.t.toUTCString().slice(5,22)} UTC
                        · MET+{((ev.t.getTime()-LAUNCH)/3600000).toFixed(1)}h
                      </div>
                      {s !== 'upcoming' && (
                        <div className="text-xs" style={{ color:'var(--text-dim)', lineHeight:1.5 }}>{ev.detail}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
