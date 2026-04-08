import Header       from './components/Header';
import HeroStrip    from './components/HeroStrip';
import TelemetryPanel from './components/TelemetryPanel';
import Timeline     from './components/Timeline';
import LiveStream   from './components/LiveStream';
import CrewProfiles from './components/CrewProfiles';
import DsnStatus    from './components/DsnStatus';
import Starfield    from './components/Starfield';
import Footer       from './components/Footer';
import SeoContent   from './components/SeoContent';

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ background:'var(--bg)' }}>
      <Starfield />

      {/* Ambient glow blobs */}
      <div style={{
        position:'fixed', inset:0, pointerEvents:'none', zIndex:0,
        background:'radial-gradient(ellipse 60% 40% at 15% 60%, rgba(11,61,145,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 85% 20%, rgba(45,125,210,0.07) 0%, transparent 70%)',
      }} />

      <div className="relative z-10">
        <Header />

        <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-5">
          <h1 className="sr-only">Artemis II Live Tracker — NASA Moon Mission 2026 — Real-Time Telemetry, Splashdown Countdown &amp; Crew</h1>

          {/* 1. HERO — Splashdown countdown (most emotionally engaging) */}
          <HeroStrip />

          {/* 2. TELEMETRY — 4 live number tiles */}
          <TelemetryPanel />

          {/* 3. SECONDARY ROW — Timeline + Live stream side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Timeline />
            <div className="space-y-5">
              <LiveStream />
              <DsnStatus />
            </div>
          </div>

          {/* 4. CREW — Accordion, expandable cards */}
          <CrewProfiles />

          {/* 5. SEO content footer */}
          <SeoContent />
        </main>

        <Footer />
      </div>
    </div>
  );
}
