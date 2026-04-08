import Header from './components/Header';
import TelemetryPanel from './components/TelemetryPanel';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import CrewProfiles from './components/CrewProfiles';
import LiveStream from './components/LiveStream';
import DsnStatus from './components/DsnStatus';
import Starfield from './components/Starfield';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--nasa-blue-dark)' }}>
      <Starfield />

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

          {/* Row 1: Telemetry */}
          <TelemetryPanel />

          {/* Row 2: Countdown + Live Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Countdown />
            <LiveStream />
          </div>

          {/* Row 3: Timeline + DSN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Timeline />
            </div>
            <div>
              <DsnStatus />
            </div>
          </div>

          {/* Row 4: Crew */}
          <CrewProfiles />

        </main>

        <Footer />
      </div>
    </div>
  );
}
