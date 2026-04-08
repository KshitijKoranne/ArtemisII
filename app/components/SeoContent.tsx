// This component renders keyword-rich content that helps Google understand the page.
// It's visible but styled subtly — not hidden, which Google penalizes.
export default function SeoContent() {
  return (
    <section
      className="panel p-5 md:p-6 fade-in-up delay-6"
      style={{ background: 'rgba(4,12,32,0.6)' }}
      aria-label="About this tracker"
    >
      <div className="nasa-divider mb-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm" style={{ color: 'rgba(200,211,232,0.55)', lineHeight: 1.7 }}>
        <div>
          <h2 className="font-orbitron font-bold text-xs mb-2" style={{ color: 'rgba(74,158,255,0.7)', letterSpacing: '0.15em' }}>
            ABOUT ARTEMIS II
          </h2>
          <p>
            NASA's <strong style={{ color: 'rgba(200,211,232,0.75)' }}>Artemis II</strong> is the first crewed mission of the Artemis program,
            launched April 1, 2026. Four astronauts — Reid Wiseman, Victor Glover, Christina Koch, and Jeremy Hansen —
            are flying aboard <strong style={{ color: 'rgba(200,211,232,0.75)' }}>Orion spacecraft "Integrity"</strong> on a
            10-day lunar flyby, the first crewed journey to the Moon since Apollo 17 in 1972.
          </p>
        </div>
        <div>
          <h2 className="font-orbitron font-bold text-xs mb-2" style={{ color: 'rgba(74,158,255,0.7)', letterSpacing: '0.15em' }}>
            LIVE TELEMETRY
          </h2>
          <p>
            This <strong style={{ color: 'rgba(200,211,232,0.75)' }}>Artemis II live tracker</strong> shows real-time distance from Earth,
            distance from the Moon, spacecraft speed, and G-force on the crew. Data is sourced from
            NASA's AROW (Artemis Real-time Orbit Website) via the community relay at artemis.cdnspace.ca,
            backed by JPL Horizons ephemeris data. When live data is unavailable, a physics model
            provides estimated trajectory data.
          </p>
        </div>
        <div>
          <h2 className="font-orbitron font-bold text-xs mb-2" style={{ color: 'rgba(74,158,255,0.7)', letterSpacing: '0.15em' }}>
            SPLASHDOWN
          </h2>
          <p>
            <strong style={{ color: 'rgba(200,211,232,0.75)' }}>Artemis II splashdown</strong> is scheduled for
            April 10, 2026 at approximately 8:07 PM UTC, off the coast of San Diego, California.
            Recovery will be performed by the USS John P. Murtha. This tracker displays a live
            countdown to splashdown with mission progress. The Artemis II reentry uses a skip
            reentry trajectory at ~25,000 mph.
          </p>
        </div>
      </div>
    </section>
  );
}
