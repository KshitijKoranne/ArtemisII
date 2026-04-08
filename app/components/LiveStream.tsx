'use client';
import { useState } from 'react';

export default function LiveStream() {
  const [loaded, setLoaded] = useState(false);
  const [open,   setOpen]   = useState(false);

  return (
    <div className="card anim-up d3">
      <button className="accordion-trigger p-5" onClick={() => setOpen(o => !o)}>
        <div className="flex items-center gap-3">
          <div className="live-ring"><div className="live-dot" /></div>
          <span className="eyebrow text-white" style={{ fontSize:'11px', letterSpacing:'0.2em' }}>NASA Live TV</span>
          <div className="badge badge-green">Streaming</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="eyebrow" style={{ color:'var(--text-dim)' }}>{open ? 'Hide' : 'Watch'}</span>
          <svg className={`accordion-chevron ${open ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="rule mb-4" />
          <div className="relative rounded overflow-hidden"
               style={{ paddingBottom:'56.25%', background:'#000', border:'1px solid var(--border)' }}>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background:'#000' }}>
                <div className="text-center">
                  <div className="live-ring mx-auto mb-3"><div className="live-dot" /></div>
                  <div className="eyebrow">Loading NASA stream…</div>
                </div>
              </div>
            )}
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/21X5lGlDOfg?autoplay=1&mute=1"
              title="NASA Live — Artemis II"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div className="mt-3 eyebrow" style={{ color:'var(--text-dim)' }}>
            NASA Official YouTube · Muted by default · Click the player to unmute
          </div>
        </div>
      )}
    </div>
  );
}
