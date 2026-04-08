import Header        from './components/Header';
import HeroStrip     from './components/HeroStrip';
import TelemetryPanel from './components/TelemetryPanel';
import Timeline      from './components/Timeline';
import LiveStream    from './components/LiveStream';
import CrewProfiles  from './components/CrewProfiles';
import DsnStatus     from './components/DsnStatus';
import Starfield     from './components/Starfield';
import Footer        from './components/Footer';
import SeoContent    from './components/SeoContent';

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <Starfield />

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 60% 40% at 15% 60%, rgba(11,61,145,0.1) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 85% 20%, rgba(45,125,210,0.06) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header />

        <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h1 className="sr-only">
            Artemis II Live Tracker — NASA Moon Mission 2026 — Real-Time Telemetry, Splashdown Countdown &amp; Crew
          </h1>

          {/* 1 — Hero countdown */}
          <HeroStrip />

          {/* 2 — Telemetry row */}
          <TelemetryPanel />

          {/* 3 — Timeline + right column */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Timeline />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <LiveStream />
              <DsnStatus />
            </div>
          </div>

          {/* 4 — Crew */}
          <CrewProfiles />

          {/* 5 — SEO */}
          <SeoContent />
        </main>

        <Footer />
      </div>
    </div>
  );
}
