'use client';
import { useState } from 'react';

const CREW = [
  { name:'Reid Wiseman',    role:'Commander',          agency:'NASA', flag:'🇺🇸',
    bio:'U.S. Navy test pilot. Commander of ISS Expedition 41 in 2014. Led Artemis II as Mission Commander.',
    prev:'ISS Expedition 40/41 · 2014',
    color:'var(--accent-hi)', initials:'RW' },
  { name:'Victor Glover',   role:'Pilot',              agency:'NASA', flag:'🇺🇸',
    bio:'First Black astronaut to pilot a lunar mission. U.S. Navy test pilot. Flew SpaceX Crew Dragon in 2020.',
    prev:'SpX-Crew 1 · 2020–21',
    color:'var(--green)',     initials:'VG' },
  { name:'Christina Koch',  role:'Mission Specialist', agency:'NASA', flag:'🇺🇸',
    bio:'First woman in deep space. Holds the record for longest single spaceflight by a woman — 328 consecutive days aboard ISS.',
    prev:'ISS Expedition 59–62 · 2019–20',
    color:'#c084fc',          initials:'CK' },
  { name:'Jeremy Hansen',   role:'Mission Specialist', agency:'CSA',  flag:'🇨🇦',
    bio:"First non-American to travel to the Moon. Canadian Space Agency astronaut and former CF-18 fighter pilot. First spaceflight.",
    prev:'First spaceflight',
    color:'var(--amber)',     initials:'JH' },
];

export default function CrewProfiles() {
  const [open, setOpen]     = useState(true);
  const [active, setActive] = useState<number|null>(null);

  return (
    <div className="card anim-up d4">
      <button className="accordion-trigger p-5" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-3">
          <span className="eyebrow text-white" style={{ fontSize:'11px', letterSpacing:'0.2em' }}>Crew · Orion Integrity</span>
          <div className="badge badge-blue">4 Astronauts</div>
        </div>
        <svg className={`accordion-chevron ${open ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="rule mb-5" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CREW.map((m, i) => (
              <div key={i}
                   className="card p-4 cursor-pointer transition-all duration-200"
                   style={{ borderColor: active === i ? m.color.replace('var(','').replace(')','') === m.color ? m.color : 'var(--border-hi)' : 'var(--border)',
                            background: active === i ? 'rgba(45,125,210,0.1)' : 'var(--glass)' }}
                   onClick={() => setActive(active === i ? null : i)}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="crew-avatar" style={{ background:`radial-gradient(circle at 35% 35%, ${m.color}22, ${m.color}08)`, border:`1.5px solid ${m.color}50`, color:m.color }}>
                    {m.initials}
                  </div>
                  <div>
                    <div className="f-display font-bold text-sm text-white leading-tight" style={{ letterSpacing:'0.03em' }}>{m.name}</div>
                    <div className="eyebrow mt-0.5" style={{ color:m.color }}>{m.role}</div>
                    <div className="eyebrow mt-0.5" style={{ fontSize:'9px' }}>{m.flag} {m.agency}</div>
                  </div>
                </div>

                {active === i && (
                  <>
                    <div className="rule mb-3" />
                    <p className="text-xs mb-3" style={{ color:'var(--text-mid)', lineHeight:1.6 }}>{m.bio}</p>
                    <div className="rounded p-2.5" style={{ background:'rgba(45,125,210,0.06)', border:'1px solid var(--border)' }}>
                      <div className="eyebrow mb-0.5" style={{ fontSize:'8px' }}>Previous</div>
                      <div className="f-mono text-xs" style={{ color:m.color }}>{m.prev}</div>
                    </div>
                  </>
                )}

                {active !== i && (
                  <div className="eyebrow" style={{ color:'var(--text-dim)', fontSize:'9px' }}>Tap to expand</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
