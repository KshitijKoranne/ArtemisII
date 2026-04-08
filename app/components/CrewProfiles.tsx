'use client';
import { useState } from 'react';
import Image from 'next/image';

// Official NASA public domain portrait photos
const CREW = [
  {
    name:'Reid Wiseman',   role:'Commander',          agency:'NASA', flag:'🇺🇸',
    bio:'U.S. Navy test pilot. Commander of ISS Expedition 41 in 2014. Led Artemis II as Mission Commander.',
    prev:'ISS Expedition 41 · 2014',
    color:'var(--accent-hi)', initials:'RW',
    photo:'https://www.nasa.gov/wp-content/uploads/2023/11/jsc2021e025006.jpg',
  },
  {
    name:'Victor Glover',  role:'Pilot',              agency:'NASA', flag:'🇺🇸',
    bio:'First Black astronaut to pilot a lunar mission. U.S. Navy test pilot. Flew SpaceX Crew Dragon in 2020.',
    prev:'SpX-Crew 1 · 2020–21',
    color:'var(--green)', initials:'VG',
    photo:'https://www.nasa.gov/wp-content/uploads/2023/11/jsc2020e026707.jpg',
  },
  {
    name:'Christina Koch', role:'Mission Specialist', agency:'NASA', flag:'🇺🇸',
    bio:'First woman in deep space. Holds the record for the longest single spaceflight by a woman — 328 days.',
    prev:'ISS Expedition 59–62 · 2019–20',
    color:'#c084fc', initials:'CK',
    photo:'https://www.nasa.gov/wp-content/uploads/2023/11/jsc2019e040042.jpg',
  },
  {
    name:'Jeremy Hansen',  role:'Mission Specialist', agency:'CSA',  flag:'🇨🇦',
    bio:'First non-American to travel to the Moon. Canadian Space Agency astronaut and former CF-18 fighter pilot.',
    prev:'First spaceflight',
    color:'var(--amber)', initials:'JH',
    photo:'https://www.asc-csa.gc.ca/images/astronauts/hansen/hansen-2019-official-portrait.jpg',
  },
];

export default function CrewProfiles() {
  const [open,   setOpen]   = useState(true);
  const [active, setActive] = useState<number|null>(null);

  return (
    <div className="card anim-up d4">
      <button
        className="accordion-trigger"
        style={{ padding:'14px 18px' }}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span className="eyebrow" style={{ color:'#fff', fontSize:10, letterSpacing:'0.18em' }}>
            Crew · Orion Integrity
          </span>
          <span className="badge badge-blue">4 Astronauts</span>
        </div>
        <svg className={`accordion-chevron${open?' open':''}`} viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{ padding:'0 18px 18px' }}>
          <div className="rule" style={{ marginBottom:16 }} />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))', gap:12 }}>
            {CREW.map((m, i) => {
              const isActive = active === i;
              return (
                <div
                  key={i}
                  onClick={() => setActive(isActive ? null : i)}
                  style={{
                    background:   isActive ? 'rgba(45,125,210,0.09)' : 'rgba(5,12,26,0.6)',
                    border:       `1px solid ${isActive ? 'rgba(91,163,245,0.4)' : 'var(--border)'}`,
                    borderRadius: 8,
                    padding:      16,
                    cursor:       'pointer',
                    transition:   'border-color 0.2s, background 0.2s',
                  }}
                >
                  {/* Avatar row */}
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom: isActive ? 14 : 8 }}>
                    {/* Photo circle */}
                    <div style={{
                      width:52, height:52,
                      borderRadius:'50%',
                      border:`2px solid ${m.color}60`,
                      overflow:'hidden',
                      flexShrink:0,
                      position:'relative',
                      background:'rgba(45,125,210,0.1)',
                    }}>
                      <img
                        src={m.photo}
                        alt={m.name}
                        width={52}
                        height={52}
                        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}
                        onError={(e) => {
                          // Fallback to initials if photo fails
                          const t = e.currentTarget.parentElement;
                          if (t) {
                            e.currentTarget.style.display = 'none';
                            t.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:Orbitron,sans-serif;font-weight:900;font-size:13px;color:${m.color}">${m.initials}</div>`;
                          }
                        }}
                      />
                    </div>

                    <div>
                      <div className="f-display" style={{ fontSize:12, fontWeight:700, color:'#fff', letterSpacing:'0.03em', marginBottom:2 }}>
                        {m.name}
                      </div>
                      <div className="eyebrow" style={{ color:m.color, marginBottom:1 }}>{m.role}</div>
                      <div className="eyebrow" style={{ fontSize:8 }}>{m.flag} {m.agency}</div>
                    </div>
                  </div>

                  {isActive ? (
                    <>
                      <div className="rule" style={{ marginBottom:10 }} />
                      <p style={{ fontSize:11, color:'var(--text-mid)', lineHeight:1.6, marginBottom:10 }}>
                        {m.bio}
                      </p>
                      <div style={{
                        background:'rgba(45,125,210,0.06)',
                        border:'1px solid var(--border)',
                        borderRadius:4,
                        padding:'8px 10px',
                      }}>
                        <div className="eyebrow" style={{ fontSize:8, marginBottom:3 }}>Previous mission</div>
                        <div className="f-mono" style={{ fontSize:11, color:m.color }}>{m.prev}</div>
                      </div>
                    </>
                  ) : (
                    <div className="eyebrow" style={{ color:'var(--text-dim)', fontSize:9 }}>Tap to expand</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
