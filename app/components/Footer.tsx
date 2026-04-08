export default function Footer() {
  return (
    <footer style={{
      marginTop: 48,
      paddingTop: 20,
      paddingBottom: 24,
      borderTop: '1px solid rgba(45,125,210,0.15)',
      background: 'rgba(5,12,26,0.8)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
        <div>
          <div className="f-display" style={{ fontWeight: 900, fontSize: 13, color: '#fff', letterSpacing: '0.05em', marginBottom: 4 }}>
            ARTEMIS <span style={{ color: 'var(--accent-hi)' }}>II</span> TRACKER
          </div>
          <div className="eyebrow" style={{ fontSize: 9 }}>
            Built by{' '}
            <a href="https://kjrlabs.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-hi)', textDecoration: 'none' }}>KJR Labs</a>
            {' · '}
            <a href="https://twitter.com/kshitijkoranne" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-hi)', textDecoration: 'none' }}>@kshitijkoranne</a>
          </div>
        </div>

        <div className="eyebrow" style={{ fontSize: 9, textAlign: 'center', color: 'var(--text-dim)' }}>
          Data: NASA JPL Horizons · artemis.cdnspace.ca · NASA DSN Now<br />
          Not affiliated with NASA · Fan project for educational purposes
        </div>

        <a href="https://buymeacoffee.com/kshitijkorz" target="_blank" rel="noopener noreferrer"
           className="badge badge-blue"
           style={{ padding: '8px 16px', textDecoration: 'none', fontSize: 11 }}>
          ☕ Support
        </a>
      </div>
    </footer>
  );
}
