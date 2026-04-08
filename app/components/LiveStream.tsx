'use client';
import { useState } from 'react';

export default function LiveStream() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="panel panel-corner fade-in-up delay-3 overflow-hidden">
      <div className="flex items-center justify-between p-4 md:p-5 cursor-pointer"
           onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className="live-dot"></div>
          <div>
            <div className="label-tag mb-0.5">Live Coverage</div>
            <div className="font-orbitron font-bold text-sm text-white">NASA LIVE TV</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="phase-badge" style={{ fontSize: '9px' }}>NASA YOUTUBE</div>
          <div className="font-orbitron text-xs" style={{ color: '#4a9eff' }}>
            {expanded ? '▲ COLLAPSE' : '▼ EXPAND'}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 md:px-5 md:pb-5">
          <div className="nasa-divider mb-4"></div>
          <div className="relative w-full overflow-hidden rounded"
               style={{ paddingBottom: '56.25%', border: '1px solid rgba(74,158,255,0.2)' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/21X5lGlDOfg?autoplay=1&mute=1"
              title="NASA Live TV — Artemis II"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="label-tag" style={{ fontSize: '9px' }}>NASA Official YouTube · Muted by default · Click unmute for audio</div>
          </div>
        </div>
      )}
    </div>
  );
}
