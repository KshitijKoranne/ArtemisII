'use client';
import { useEffect, useRef, useState } from 'react';

function getVid(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem('a2_vid');
  if (!id) { id = `v${Date.now()}${Math.random().toString(36).slice(2,7)}`; sessionStorage.setItem('a2_vid', id); }
  return id;
}

export default function VisitorCounter() {
  const [count, setCount]   = useState<number|null>(null);
  const [flash, setFlash]   = useState(false);
  const prev = useRef<number|null>(null);

  useEffect(() => {
    async function ping() {
      try {
        const r = await fetch('/api/visitors', { method:'POST', headers:{'x-visitor-id': getVid()}, cache:'no-store' });
        if (!r.ok) return;
        const { count: c } = await r.json();
        if (prev.current !== null && c !== prev.current) { setFlash(true); setTimeout(() => setFlash(false), 350); }
        prev.current = c; setCount(c);
      } catch {}
    }
    ping();
    const id = setInterval(ping, 30000);
    return () => clearInterval(id);
  }, []);

  if (!count) return null;

  return (
    <div className="badge badge-green" style={{ gap:6 }} title="Viewers right now">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
      </svg>
      <span className={flash ? 'num-change' : ''} style={{ fontFamily:'JetBrains Mono', fontSize:11, fontWeight:600 }}>
        {count.toLocaleString()}
      </span>
      <span style={{ opacity:0.7 }}>live</span>
    </div>
  );
}
