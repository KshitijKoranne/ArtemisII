'use client';
import { useEffect, useState } from 'react';

// Hardcoded timestamps as ms to avoid SSR/hydration mismatch
const LAUNCH_MS = 1743547200000; // 2026-04-01T22:35:00Z
const MAX_D = 406700;

function physics(now: number) {
  const h = (now - LAUNCH_MS) / 3_600_000;
  let dist = 0, spd = 0;
  if      (h < 3)   { dist = 400 + 3200*(h/3);                      spd = 28000 - 20000*(h/3); }
  else if (h < 120) { const t=(h-3)/117; dist=3600+(MAX_D-3600)*Math.pow(t,0.82); spd=38000*Math.pow(1-t*0.72,1.1)+3200; }
  else if (h < 123) { dist = MAX_D;                                  spd = 3800; }
  else if (h < 215) { const t=(h-123)/92; dist=MAX_D*Math.pow(1-t,1.05); spd=3800+(38000-3800)*Math.pow(t,1.9); }
  else              { const t=(h-215)/2.5; dist=Math.max(0,50000*(1-t)); spd=Math.max(0,38000*(1-t)); }
  return {
    dist: Math.round(dist),
    moon: Math.round(Math.abs(384400 - dist)),
    spd:  Math.round(spd),
    g:    spd > 28000 ? (spd/40000)*4.5 : 0.001,
  };
}

function fmt(n: number) { return n.toLocaleString('en-US'); }

export default function TelemetryPanel() {
  const [data, setData] = useState<{ dist:number; moon:number; spd:number; g:number } | null>(null);
  const [src,  setSrc]  = useState<'live'|'computed'|'loading'>('loading');

  useEffect(() => {
    // Immediately show computed data — no waiting for API
    setData(physics(Date.now()));
    setSrc('computed');

    // Then try API in background
    async function tryLive() {
      try {
        const r = await fetch('/api/orbit', { cache:'no-store' });
        if (!r.ok) throw new Error();
        const j = await r.json();
        if (j.error) throw new Error();
        const d = {
          dist: Math.round(j.earth_distance_km || j.earthDistance || j.distance_from_earth || 0),
          moon: Math.round(j.moon_distance_km  || j.moonDistance  || j.distance_from_moon  || 0),
          spd:  Math.round(j.speed_kmh || j.velocity_kmh || j.speed || 0),
          g:    parseFloat(j.g_force || j.gforce || 0),
        };
        // Only use if values look real (not 0)
        if (d.dist > 1000) { setData(d); setSrc('live'); }
      } catch { /* stay on computed */ }
    }
    tryLive();
    const id = setInterval(() => {
      setData(physics(Date.now()));
      tryLive();
    }, 30000);
    return () => clearInterval(id);
  }, []);

  // Fast tick for computed mode
  useEffect(() => {
    if (src !== 'computed') return;
    const id = setInterval(() => setData(physics(Date.now())), 2000);
    return () => clearInterval(id);
  }, [src]);

  const tiles = data ? [
    { label:'Distance from Earth', val:fmt(data.dist), unit:'km', sub:`${fmt(Math.round(data.dist*0.621371))} mi`, color:'var(--accent-hi)' },
    { label:'Distance from Moon',  val:fmt(data.moon), unit:'km', sub:`${fmt(Math.round(data.moon*0.621371))} mi`, color:'var(--text-mid)'  },
    { label:'Speed',               val:fmt(data.spd),  unit:'km/h', sub:`Mach ${(data.spd/1225).toFixed(1)}`,    color:'var(--green)'     },
    { label:'G-Force on Crew',     val:data.g.toFixed(3), unit:'g', sub:'Earth surface = 1.000g',               color:'var(--amber)'     },
  ] : null;

  return (
    <div className="anim-up d2">
      <div className="section-head">
        <span className="eyebrow" style={{ color:'#fff', fontSize:11, letterSpacing:'0.2em' }}>Live Telemetry</span>
        <div className="section-head-line" />
        {src === 'live'
          ? <span className="badge badge-green"><div className="live-ring"><div className="live-dot" /></div>NASA Feed</span>
          : src === 'computed'
          ? <span className="badge badge-amber">Physics Model</span>
          : <span className="badge badge-blue" style={{ opacity:0.6 }}>Connecting…</span>}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }}>
        {tiles ? tiles.map((t,i) => (
          <div key={i} className="card" style={{ padding:'14px 16px' }}>
            <div className="eyebrow" style={{ marginBottom:10, fontSize:9 }}>{t.label}</div>
            <div className="num-lg" style={{ color:t.color, marginBottom:2 }}>{t.val}</div>
            <div className="eyebrow" style={{ color:t.color, opacity:0.65, fontSize:9 }}>{t.unit}</div>
            <div className="rule" style={{ margin:'10px 0' }} />
            <div className="eyebrow" style={{ fontSize:8, color:'var(--text-dim)' }}>{t.sub}</div>
          </div>
        )) : Array.from({length:4}).map((_,i) => (
          <div key={i} className="card" style={{ padding:'14px 16px', opacity:0.5 }}>
            <div style={{ height:10, width:80, borderRadius:4, background:'rgba(45,125,210,0.1)', marginBottom:12 }} />
            <div style={{ height:28, width:100, borderRadius:4, background:'rgba(45,125,210,0.08)' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
