'use client';
import { useState } from 'react';

export default function LiveStream() {
  const [open, setOpen] = useState(false);

  return (
    <div className="card anim-up d3">
      <button className="accordion-trigger" style={{ padding:'14px 18px' }} onClick={() => setOpen(o=>!o)}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div className="live-ring"><div className="live-dot" /></div>
          <span className="eyebrow" style={{ color:'#fff', fontSize:10, letterSpacing:'0.18em' }}>NASA Live TV</span>
          <span className="badge badge-green">Streaming</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span className="eyebrow" style={{ fontSize:9 }}>{open ? 'Hide' : 'Watch'}</span>
          <svg className={`accordion-chevron${open?' open':''}`} viewBox="0 0 24 24" strokeWidth="2"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </button>

      {open && (
        <div style={{ padding:'0 18px 18px' }}>
          <div className="rule" style={{ marginBottom:14 }} />
          <div style={{ position:'relative', width:'100%', paddingBottom:'56.25%', background:'#000', borderRadius:6, overflow:'hidden', border:'1px solid var(--border)' }}>
            <iframe
              style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
              src="https://www.youtube.com/embed/21X5lGlDOfg?autoplay=1&mute=1"
              title="NASA Live — Artemis II"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="eyebrow" style={{ marginTop:10, color:'var(--text-dim)' }}>
            NASA Official YouTube · Muted by default · Click player to unmute
          </div>
        </div>
      )}
    </div>
  );
}
