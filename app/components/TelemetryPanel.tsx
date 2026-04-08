'use client';
import { useEffect, useState, useRef } from 'react';

// Mission constants
const LAUNCH_TIME = new Date('2026-04-01T22:35:00Z').getTime();
const SPLASHDOWN_TIME = new Date('2026-04-10T20:07:00Z').getTime();
const MISSION_DURATION_MS = SPLASHDOWN_TIME - LAUNCH_TIME;

// Physics model fallback (from confirmed NASA data points)
// Outbound: max distance ~252,760 mi from Earth, closest Moon approach ~4,067 mi
// Return: heading back to Earth, splashdown April 10
function computePhysicsModel(now: number) {
  const elapsed_ms = now - LAUNCH_TIME;
  const elapsed_h = elapsed_ms / 3600000;
  const total_h = MISSION_DURATION_MS / 3600000; // ~217.5h

  // Key mission timestamps (hours from launch)
  const TLI_h = 3.0;          // Trans-Lunar Injection
  const CLOSEST_MOON_h = 120.45; // Closest Moon approach (April 6 ~8:26 PM EDT)
  const RECORD_DIST_h = 122.5;   // Max distance record
  const RETURN_START_h = 123.0;  // Begin return
  const REENTRY_h = 215.0;       // Reentry begins
  
  const EARTH_RADIUS_KM = 6371;
  const MOON_DIST_FROM_EARTH_KM = 384400;
  const MAX_DIST_KM = 406_700; // 252,760 miles

  let distFromEarth_km = 0;
  let distFromMoon_km = 0;
  let speed_kmh = 0;
  let phase = '';

  if (elapsed_h < 0) {
    distFromEarth_km = EARTH_RADIUS_KM;
    distFromMoon_km = MOON_DIST_FROM_EARTH_KM;
    speed_kmh = 0;
    phase = 'PRE-LAUNCH';
  } else if (elapsed_h < TLI_h) {
    // Low Earth Orbit / ascent
    const t = elapsed_h / TLI_h;
    distFromEarth_km = EARTH_RADIUS_KM + (400 - EARTH_RADIUS_KM) * t + 400 * t;
    speed_kmh = 28000 - 20000 * t;
    phase = 'EARTH ORBIT';
  } else if (elapsed_h < CLOSEST_MOON_h) {
    // Translunar coast
    const t = (elapsed_h - TLI_h) / (CLOSEST_MOON_h - TLI_h);
    // Acceleration curve outbound
    distFromEarth_km = 400 + (MAX_DIST_KM - 400) * Math.pow(t, 0.85);
    speed_kmh = 38000 * Math.pow(1 - t * 0.7, 1.2) + 3500;
    phase = 'TRANSLUNAR COAST';
  } else if (elapsed_h < RECORD_DIST_h) {
    // Lunar flyby zone
    const t = (elapsed_h - CLOSEST_MOON_h) / (RECORD_DIST_h - CLOSEST_MOON_h);
    distFromEarth_km = MAX_DIST_KM - 2000 + 2000 * t;
    speed_kmh = 3500 + 1000 * t;
    phase = 'LUNAR FLYBY';
  } else if (elapsed_h < RETURN_START_h) {
    distFromEarth_km = MAX_DIST_KM;
    speed_kmh = 3800;
    phase = 'LUNAR FLYBY';
  } else if (elapsed_h < REENTRY_h) {
    // Return coast
    const t = (elapsed_h - RETURN_START_h) / (REENTRY_h - RETURN_START_h);
    distFromEarth_km = MAX_DIST_KM * Math.pow(1 - t, 1.1);
    speed_kmh = 3800 + (40000 - 3800) * Math.pow(t, 1.8);
    phase = 'RETURN TO EARTH';
  } else {
    // Reentry / splashdown
    const t = (elapsed_h - REENTRY_h) / (total_h - REENTRY_h);
    distFromEarth_km = Math.max(0, 50000 * (1 - t));
    speed_kmh = Math.max(0, 40000 * (1 - t));
    phase = 'REENTRY';
  }

  distFromMoon_km = Math.abs(MOON_DIST_FROM_EARTH_KM - distFromEarth_km);
  const gForce = speed_kmh > 30000 ? (speed_kmh / 40000) * 5 : 0.001;

  return {
    distFromEarth_km: Math.round(distFromEarth_km),
    distFromMoon_km: Math.round(distFromMoon_km),
    speed_kmh: Math.round(speed_kmh),
    gForce: gForce.toFixed(3),
    phase,
    source: 'computed',
  };
}

function formatNum(n: number) {
  return n.toLocaleString('en-US');
}

interface TelemetryData {
  distFromEarth_km: number;
  distFromMoon_km: number;
  speed_kmh: number;
  gForce: string;
  phase: string;
  source: string;
}

export default function TelemetryPanel() {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [apiStatus, setApiStatus] = useState<'loading' | 'live' | 'computed'>('loading');
  const prevRef = useRef<TelemetryData | null>(null);

  useEffect(() => {
    async function fetchOrbit() {
      try {
        const res = await fetch('/api/orbit', { cache: 'no-store' });
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        if (json.error) throw new Error(json.error);

        // Map community API fields
        const mapped: TelemetryData = {
          distFromEarth_km: Math.round((json.earth_distance_km || json.earthDistance || json.distance_from_earth) ?? 0),
          distFromMoon_km: Math.round((json.moon_distance_km || json.moonDistance || json.distance_from_moon) ?? 0),
          speed_kmh: Math.round((json.speed_kmh || json.velocity_kmh || json.speed) ?? 0),
          gForce: ((json.g_force || json.gforce || 0)).toFixed(3),
          phase: json.phase || json.mission_phase || '',
          source: 'live',
        };
        setData(mapped);
        setApiStatus('live');
      } catch {
        // Fallback to physics model
        const computed = computePhysicsModel(Date.now());
        setData(computed);
        setApiStatus('computed');
      }
      prevRef.current = data;
    }

    fetchOrbit();
    // Refresh every 30 seconds
    const id = setInterval(fetchOrbit, 30000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Live tick for computed mode
  useEffect(() => {
    if (apiStatus !== 'computed') return;
    const id = setInterval(() => {
      setData(computePhysicsModel(Date.now()));
    }, 2000);
    return () => clearInterval(id);
  }, [apiStatus]);

  const tiles = data ? [
    {
      label: 'Distance from Earth',
      value: formatNum(data.distFromEarth_km),
      unit: 'KM',
      sub: `${formatNum(Math.round(data.distFromEarth_km * 0.621371))} MI`,
      color: '#4a9eff',
    },
    {
      label: 'Distance from Moon',
      value: formatNum(data.distFromMoon_km),
      unit: 'KM',
      sub: `${formatNum(Math.round(data.distFromMoon_km * 0.621371))} MI`,
      color: '#94a3b8',
    },
    {
      label: 'Spacecraft Speed',
      value: formatNum(data.speed_kmh),
      unit: 'KM/H',
      sub: `MACH ${(data.speed_kmh / 1225).toFixed(1)}`,
      color: '#22c55e',
    },
    {
      label: 'G-Force on Crew',
      value: data.gForce,
      unit: 'g',
      sub: 'Earth surface = 1.000g',
      color: '#f59e0b',
    },
  ] : null;

  return (
    <section className="fade-in-up delay-2">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="label-tag text-white" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>ORION TELEMETRY</div>
          {data?.phase && (
            <div className="phase-badge">{data.phase}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {apiStatus === 'live' ? (
            <>
              <div className="live-dot"></div>
              <span className="label-tag" style={{ color: '#22c55e' }}>LIVE · NASA FEED</span>
            </>
          ) : apiStatus === 'computed' ? (
            <>
              <div className="w-2 h-2 rounded-full" style={{ background: '#f59e0b' }}></div>
              <span className="label-tag" style={{ color: '#f59e0b' }}>COMPUTED · PHYSICS MODEL</span>
            </>
          ) : (
            <span className="label-tag animate-pulse">CONNECTING...</span>
          )}
        </div>
      </div>

      {/* Telemetry tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tiles ? tiles.map((tile, i) => (
          <div key={i} className="panel panel-corner p-4 md:p-5">
            <div className="label-tag mb-3">{tile.label}</div>
            <div className="telem-number font-bold text-xl md:text-2xl mb-1" style={{ color: tile.color }}>
              {tile.value}
            </div>
            <div className="label-tag" style={{ color: tile.color, opacity: 0.7 }}>{tile.unit}</div>
            <div className="nasa-divider my-2"></div>
            <div className="label-tag" style={{ fontSize: '8px' }}>{tile.sub}</div>
          </div>
        )) : (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="panel p-4 md:p-5 animate-pulse">
              <div className="h-3 w-24 rounded mb-3" style={{ background: 'rgba(74,158,255,0.15)' }}></div>
              <div className="h-8 w-32 rounded mb-2" style={{ background: 'rgba(74,158,255,0.1)' }}></div>
              <div className="h-2 w-16 rounded" style={{ background: 'rgba(74,158,255,0.08)' }}></div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
