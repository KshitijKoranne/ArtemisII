'use client';
import { useEffect, useState } from 'react';

const LAUNCH_TIME = new Date('2026-04-01T22:35:00Z').getTime();

interface TimelineEvent {
  id: string;
  label: string;
  detail: string;
  time: Date;
  met_h: number; // hours from launch
  type: 'milestone' | 'maneuver' | 'science' | 'comms';
}

const EVENTS: TimelineEvent[] = [
  { id: 'launch', label: 'Launch', detail: 'SLS lifts off from LC-39B, Kennedy Space Center', time: new Date('2026-04-01T22:35:00Z'), met_h: 0, type: 'milestone' },
  { id: 'leo', label: 'Low Earth Orbit', detail: 'Orion inserted into elliptical parking orbit', time: new Date('2026-04-01T23:10:00Z'), met_h: 0.58, type: 'maneuver' },
  { id: 'tli', label: 'Trans-Lunar Injection', detail: 'Interim Cryogenic Propulsion Stage fires to escape Earth orbit', time: new Date('2026-04-02T01:35:00Z'), met_h: 3.0, type: 'maneuver' },
  { id: 'tco', label: 'Translunar Coast', detail: 'Crew performs systems tests in deep space', time: new Date('2026-04-02T12:00:00Z'), met_h: 13.4, type: 'science' },
  { id: 'prox', label: 'Proximity Operations', detail: 'Manual spacecraft handling, proximity ops demonstration', time: new Date('2026-04-03T00:00:00Z'), met_h: 25.4, type: 'maneuver' },
  { id: 'record', label: 'Distance Record', detail: '252,760 mi from Earth — farthest humans have ever traveled', time: new Date('2026-04-06T14:00:00Z'), met_h: 111.4, type: 'milestone' },
  { id: 'approach', label: 'Closest Moon Approach', detail: 'Orion passes ~4,067 mi from lunar surface at 60,863 mph', time: new Date('2026-04-06T20:26:00Z'), met_h: 117.85, type: 'milestone' },
  { id: 'eclipse', label: 'Solar Eclipse', detail: 'Moon eclipses the Sun — crew observes solar corona for 54 min', time: new Date('2026-04-06T20:35:00Z'), met_h: 118.0, type: 'science' },
  { id: 'blackout', label: 'Comm Blackout', detail: 'Orion passes behind the Moon, 40-min comms blackout', time: new Date('2026-04-06T21:00:00Z'), met_h: 118.4, type: 'comms' },
  { id: 'flyby_complete', label: 'Flyby Complete', detail: 'Crew emerges from behind the Moon, returns toward Earth', time: new Date('2026-04-06T21:35:00Z'), met_h: 119.0, type: 'milestone' },
  { id: 'mcc_r1', label: 'Return Burn MCC-R1', detail: 'First return trajectory correction burn', time: new Date('2026-04-08T00:03:00Z'), met_h: 145.5, type: 'maneuver' },
  { id: 'mcc_r2', label: 'Return Burn MCC-R2', detail: 'Second return trajectory correction burn', time: new Date('2026-04-09T06:00:00Z'), met_h: 175.4, type: 'maneuver' },
  { id: 'mcc_r3', label: 'Return Burn MCC-R3', detail: 'Final return trajectory correction burn', time: new Date('2026-04-10T14:00:00Z'), met_h: 209.4, type: 'maneuver' },
  { id: 'reentry', label: 'Reentry', detail: 'Orion skips off atmosphere at 25,000 mph, peak heating', time: new Date('2026-04-10T19:30:00Z'), met_h: 216.9, type: 'milestone' },
  { id: 'splashdown', label: 'Splashdown', detail: 'Orion splashes down off San Diego, USS John P. Murtha recovery', time: new Date('2026-04-10T20:07:00Z'), met_h: 217.5, type: 'milestone' },
];

const TYPE_COLORS: Record<string, string> = {
  milestone: '#4a9eff',
  maneuver: '#f59e0b',
  science: '#22c55e',
  comms: '#a78bfa',
};

const TYPE_LABELS: Record<string, string> = {
  milestone: 'MILESTONE',
  maneuver: 'MANEUVER',
  science: 'SCIENCE',
  comms: 'COMMS',
};

export default function Timeline() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 10000);
    return () => clearInterval(id);
  }, []);

  function getStatus(event: TimelineEvent): 'complete' | 'active' | 'upcoming' {
    const eventTime = event.time.getTime();
    const nextEvent = EVENTS.find(e => e.met_h > event.met_h);
    const nextTime = nextEvent ? nextEvent.time.getTime() : eventTime + 7200000;

    if (now > nextTime) return 'complete';
    if (now >= eventTime) return 'active';
    return 'upcoming';
  }

  function formatTime(d: Date) {
    return d.toUTCString().slice(5, 22).replace(' ', ' · ');
  }

  return (
    <section className="fade-in-up delay-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="label-tag text-white" style={{ fontSize: '11px', letterSpacing: '0.2em' }}>MISSION TIMELINE</div>
        <div className="flex gap-3">
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <div key={type} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: TYPE_COLORS[type] }}></div>
              <span className="label-tag" style={{ fontSize: '8px', color: TYPE_COLORS[type] }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-4 md:p-5">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px" style={{ background: 'rgba(74,158,255,0.2)' }}></div>

          <div className="space-y-1">
            {EVENTS.map((event, i) => {
              const status = getStatus(event);
              const color = TYPE_COLORS[event.type];
              return (
                <div key={event.id}
                     className={`relative flex gap-4 py-2.5 px-2 rounded transition-all duration-300 ${status === 'active' ? 'scanline-wrap' : ''}`}
                     style={{
                       background: status === 'active' ? 'rgba(74,158,255,0.06)' : 'transparent',
                       borderLeft: status === 'active' ? `2px solid ${color}` : '2px solid transparent',
                       marginLeft: '-2px',
                     }}>
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0 mt-0.5" style={{ width: 30 }}>
                    <div className="w-[10px] h-[10px] rounded-full mx-auto"
                         style={{
                           background: status === 'complete' ? 'rgba(74,158,255,0.3)' : status === 'active' ? color : 'transparent',
                           border: `2px solid ${status === 'upcoming' ? 'rgba(74,158,255,0.25)' : color}`,
                           boxShadow: status === 'active' ? `0 0 8px ${color}` : 'none',
                           marginLeft: '10px',
                         }}>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className={`font-orbitron font-bold text-xs ${status === 'complete' ? 'line-through' : ''}`}
                            style={{ color: status === 'complete' ? 'var(--nasa-silver-dim)' : status === 'active' ? color : 'var(--nasa-white)', letterSpacing: '0.05em' }}>
                        {event.label}
                      </span>
                      {status === 'complete' && (
                        <span className="label-tag" style={{ color: '#22c55e', fontSize: '8px' }}>✓ COMPLETE</span>
                      )}
                      {status === 'active' && (
                        <span className="phase-badge" style={{ borderColor: `${color}55`, color, fontSize: '8px', padding: '2px 6px' }}>● NOW</span>
                      )}
                      <span className="label-tag" style={{ color: TYPE_COLORS[event.type], fontSize: '8px' }}>
                        {TYPE_LABELS[event.type]}
                      </span>
                    </div>
                    <div className="label-tag mb-1" style={{ fontSize: '9px', color: 'var(--nasa-silver-dim)' }}>
                      {formatTime(event.time)} UTC · MET +{event.met_h.toFixed(1)}h
                    </div>
                    <div className="text-xs" style={{ color: status === 'upcoming' ? 'rgba(200,211,232,0.5)' : 'rgba(200,211,232,0.8)', lineHeight: 1.4 }}>
                      {event.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
