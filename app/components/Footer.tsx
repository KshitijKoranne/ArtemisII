export default function Footer() {
  return (
    <footer className="relative z-10 mt-12 py-6 px-4 md:px-8 border-t" style={{ borderColor:'var(--border)', background:'rgba(5,12,26,0.8)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="f-display font-black text-sm text-white mb-1" style={{ letterSpacing:'0.05em' }}>
            ARTEMIS <span style={{ color:'var(--accent-hi)' }}>II</span> TRACKER
          </div>
          <div className="eyebrow" style={{ fontSize:'9px' }}>
            Built by{' '}
            <a href="https://kjrlabs.in" target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent-hi)' }}>KJR Labs</a>
            {' · '}
            <a href="https://twitter.com/kshitijkoranne" target="_blank" rel="noopener noreferrer" style={{ color:'var(--accent-hi)' }}>@kshitijkoranne</a>
          </div>
        </div>
        <div className="eyebrow text-center" style={{ fontSize:'9px', color:'var(--text-dim)' }}>
          Data: NASA JPL Horizons · artemis.cdnspace.ca · NASA DSN Now<br/>
          Not affiliated with NASA · Fan project for educational purposes
        </div>
        <a href="https://buymeacoffee.com/kshitijkorz" target="_blank" rel="noopener noreferrer"
           className="badge badge-blue" style={{ padding:'8px 16px', textDecoration:'none' }}>
          ☕ Support
        </a>
      </div>
    </footer>
  );
}
