'use client';
import { useEffect, useState } from 'react';

const LAUNCH = new Date('2026-04-01T22:35:00Z').getTime();
const SPLASH = new Date('2026-04-10T20:07:00Z').getTime();
const MAX_DIST = 406700;

function physics(now: number) {
  const h = (now - LAUNCH) / 3600000;
  let dist = 0, moon = 0, spd = 0;
  if      (h < 3)   { dist = 400  + 3200 * (h/3);   spd = 28000 - 20000*(h/3); }
  else if (h < 120) { const t=(h-3)/117; dist=3600+(MAX_DIST-3600)*Math.pow(t,0.82); spd=38000*Math.pow(1-t*0.72,1.1)+3200; }
  else if (h < 123) { dist=MAX_DIST; spd=3800; }
  else if (h < 215) { const t=(h-123)/92; dist=MAX_DIST*Math.pow(1-t,1.05); spd=3800+(38000-3800)*Math.pow(t,1.9); }
  else              { const t=(h-215)/2.5; dist=Math.max(0,50000*(1-t)); spd=Math.max(0,38000*(1-t)); }
  moon = Math.abs(384400 - dist);
  return { dist: Math.round(dist), moon: Math.round(moon), spd: Math.round(spd), g: (spd > 28000 ? (spd/40000)*4.5 : 0.001).toFixed(3) };
}

function fmt(n: number) { return n.toLocaleString('en-US'); }

const TILES = [
  { key: 'dist', label: 'Distance from Earth', unit: 'km', sub: (v:number) => `${fmt(Math.round(v*0.621371))} mi`, color: 'var(--accent-hi)' },
  { key: 'moon', label: 'Distance from Moon',  unit: 'km', sub: (v:number) => `${fmt(Math.round(v*0.621371))} mi`, color: 'var(--text-mid)' },
  { key: 'spd',  label: 'Speed',               unit: 'km/h', sub: (v:number) => `Mach ${(v/1225).toFixed(1)}`,   color: 'var(--green)' },
  { key: 'g',    label: 'G-Force on Crew',      unit: 'g',   sub: () => 'Earth surface = 1.000g',                 color: 'var(--amber)' },
];

export default function TelemetryPanel() {
  const [data, setData]     = useState<Record<string,number|string>|null>(null);
  const [src,  setSrc]      = useState<'live'|'computed'|'loading'>('loading');

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch('/api/orbit', { cache: 'no-store' });
        if (!r.ok) throw new Error();
        const j = await r.json();
        if (j.error) throw new Error();
        const d = { dist: Math.round(j.earth_distance_km||j.earthDistance||j.distance_from_earth||0),
                    moon: Math.round(j.moon_distance_km||j.moonDistance||j.distance_from_moon||0),
                    spd:  Math.round(j.speed_kmh||j.velocity_kmh||j.speed||0),
                    g:    ((j.g_force||j.gforce||0)).toFixed(3) };
        setData(d); setSrc('live');
      } catch {
        setData(physics(Date.now()) as unknown as Record<string,number|string>); setSrc('computed');
      }
    }
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  // Live tick for computed
  useEffect(() => {
    if (src !== 'computed') return;
    const id = setInterval(() => setData(physics(Date.now()) as unknown as Record<string,number|string>), 2000);
    return () => clearInterval(id);
  }, [src]);

  return (
    <div className="anim-up d2">
      <div className="section-head">
        <span className="eyebrow text-white" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>Live Telemetry</span>
        <div className="section-head-line" />
        {src === 'live'
          ? <div className="badge badge-green"><div className="live-ring"><div className="live-dot" /></div>NASA Feed</div>
          : src === 'computed'
          ? <div className="badge badge-amber">Physics Model</div>
          : <div className="badge badge-blue" style={{ opacity: 0.6 }}>Connecting…</div>}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {TILES.map(t => {
          const raw = data ? data[t.key] : null;
          const num = typeof raw === 'number' ? raw : parseFloat(raw as string);
          return (
            <div key={t.key} className="card p-4 md:p-5">
              <div className="eyebrow mb-3">{t.label}</div>
              {raw !== null ? (
                <>
                  <div className="num-lg mb-0.5" style={{ color: t.color }}>
                    {t.key === 'g' ? raw : fmt(num)}
                  </div>
                  <div className="eyebrow" style={{ color: t.color, opacity: 0.65 }}>{t.unit}</div>
                  <div className="rule my-3" />
                  <div className="eyebrow" style={{ fontSize: '9px', color: 'var(--text-dim)' }}>
                    {t.sub(num)}
                  </div>
                </>
              ) : (
                <div className="h-8 rounded animate-pulse mt-1" style={{ background: 'rgba(45,125,210,0.1)' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
