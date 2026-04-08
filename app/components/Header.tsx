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

  const S: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    borderBottom: '1px solid rgba(45,125,210,0.2)',
    background: 'rgba(5,12,26,0.96)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

  return (
    <header style={S}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'12px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>

        {/* Brand */}
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom:2, fontSize:9 }}>NASA · Artemis Program</div>
            <div className="f-display" style={{ fontWeight:900, fontSize:20, color:'#fff' }}>
              ARTEMIS <span style={{ color:'var(--accent-hi)' }}>II</span>
            </div>
          </div>
          <div style={{ width:1, height:36, background:'rgba(45,125,210,0.25)' }} />
          <div style={{ display:'flex', alignItems:'center', gap:7 }}>
            <div className="live-ring"><div className="live-dot" /></div>
            <span className="eyebrow" style={{ color:'var(--green)', fontSize:9 }}>Mission Active</span>
          </div>
        </div>

        {/* MET Clock — hidden on mobile */}
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span className="eyebrow" style={{ marginRight:4, fontSize:9 }}>MET</span>
          {[{v:met.d,u:'d'},{v:met.h,u:'h'},{v:met.m,u:'m'},{v:met.s,u:'s'}].map((x,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
              <div className="card" style={{ padding:'6px 10px', textAlign:'center', minWidth:44 }}>
                <div className="f-mono" style={{ fontWeight:700, fontSize:16, color:'var(--accent-hi)', lineHeight:1 }}>{x.v}</div>
                <div className="eyebrow" style={{ marginTop:2, fontSize:8 }}>{x.u}</div>
              </div>
              {i < 3 && <span className="f-mono" style={{ fontSize:14, color:'rgba(91,163,245,0.3)', marginBottom:8 }}>:</span>}
            </div>
          ))}
        </div>

        {/* Right */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <VisitorCounter />
          <span className="badge badge-blue">Orion · Integrity</span>
        </div>

      </div>
    </header>
  );
}
