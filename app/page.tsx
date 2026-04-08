import Header from './components/Header';
import TelemetryPanel from './components/TelemetryPanel';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import CrewProfiles from './components/CrewProfiles';
import LiveStream from './components/LiveStream';
import DsnStatus from './components/DsnStatus';
import Starfield from './components/Starfield';
import Footer from './components/Footer';
import SeoContent from './components/SeoContent';

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--nasa-blue-dark)' }}>
      <Starfield />
      <div className="relative z-10">
        <Header />
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
          {/* H1 for SEO — visually part of the flow, screen-reader friendly */}
          <h1 className="sr-only">
            Artemis II Live Tracker — NASA Moon Mission 2026 — Real-Time Telemetry, Splashdown Countdown &amp; Crew
          </h1>
          <TelemetryPanel />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Countdown />
            <LiveStream />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Timeline />
            </div>
            <div>
              <DsnStatus />
            </div>
          </div>
          <CrewProfiles />
          <SeoContent />
        </main>
        <Footer />
      </div>
    </div>
  );
}
