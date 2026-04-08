export default function SeoContent() {
  const sections = [
    {
      head: 'About Artemis II',
      body: "NASA's Artemis II launched April 1, 2026 — the first crewed mission of the Artemis program and the first crewed lunar flyby since Apollo 17 in 1972. Four astronauts fly aboard Orion spacecraft named Integrity on a 10-day mission around the Moon.",
    },
    {
      head: 'Live Telemetry',
      body: 'This Artemis II live tracker shows real-time distance from Earth, distance from the Moon, spacecraft speed, and G-force sourced from NASA AROW via artemis.cdnspace.ca (JPL Horizons relay). A physics model is used as fallback when the API is unavailable.',
    },
    {
      head: 'Splashdown',
      body: 'Artemis II splashdown is scheduled for April 10, 2026 at approximately 20:07 UTC, off San Diego, California. Recovery is by the USS John P. Murtha. Orion uses a skip reentry trajectory at around 25,000 mph with the AVCOAT heat shield.',
    },
  ];

  return (
    <section className="anim-up d5" aria-label="About Artemis II" style={{ borderTop: '1px solid var(--border)', paddingTop: 24, marginTop: 8 }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map(s => (
          <div key={s.head}>
            <h2 className="eyebrow mb-2 text-white" style={{ fontSize: '10px' }}>{s.head.toUpperCase()}</h2>
            <p className="text-xs" style={{ color: 'var(--text-dim)', lineHeight: 1.7 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
