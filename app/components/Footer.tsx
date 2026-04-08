'use client';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 py-8 px-4 md:px-8"
            style={{ borderTop: '1px solid rgba(74,158,255,0.15)', background: 'rgba(4,12,32,0.7)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="nasa-divider mb-6"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-orbitron font-black text-sm text-white mb-1">
              ARTEMIS <span style={{ color: '#4a9eff' }}>II</span> LIVE TRACKER
            </div>
            <div className="label-tag" style={{ fontSize: '9px' }}>
              Built by{' '}
              <a href="https://kjrlabs.in" target="_blank" rel="noopener noreferrer"
                 className="transition-colors" style={{ color: '#4a9eff' }}>
                KJR Labs
              </a>
              {' '}·{' '}
              <a href="https://twitter.com/kshitijkoranne" target="_blank" rel="noopener noreferrer"
                 className="transition-colors" style={{ color: '#4a9eff' }}>
                @kshitijkoranne
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="label-tag" style={{ fontSize: '9px', color: 'var(--nasa-silver-dim)' }}>
              Data via NASA JPL Horizons · artemis.cdnspace.ca · NASA DSN Now
            </div>
            <div className="label-tag mt-1" style={{ fontSize: '9px', color: 'var(--nasa-silver-dim)' }}>
              Not affiliated with NASA. Fan project for educational purposes.
            </div>
          </div>

          <div className="text-right">
            <a href="https://buymeacoffee.com/kshitijkorz" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-4 py-2 rounded font-orbitron text-xs transition-all duration-300"
               style={{
                 background: 'rgba(74,158,255,0.1)',
                 border: '1px solid rgba(74,158,255,0.3)',
                 color: '#4a9eff',
               }}
               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,158,255,0.2)')}
               onMouseLeave={e => (e.currentTarget.style.background = 'rgba(74,158,255,0.1)')}>
              ☕ SUPPORT
            </a>
          </div>
        </div>

        <div className="nasa-divider mt-6"></div>
        <div className="mt-4 text-center label-tag" style={{ fontSize: '8px', color: 'rgba(107,127,160,0.6)' }}>
          ARTEMIS II · ORION INTEGRITY · LAUNCH APR 1 2026 22:35 UTC · SPLASHDOWN APR 10 2026 · Kennedy Space Center → Pacific Ocean
        </div>
      </div>
    </footer>
  );
}
