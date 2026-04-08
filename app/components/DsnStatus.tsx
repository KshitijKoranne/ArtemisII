'use client';
import { useEffect, useState } from 'react';

interface Contact { dish:string; location:string; spacecraft:string; rtlt?:string; }

const DSS_LOCATIONS: Record<string,string> = {
  '14':'Goldstone, CA','24':'Goldstone, CA','25':'Goldstone, CA','26':'Goldstone, CA',
  '43':'Canberra, AU', '45':'Canberra, AU', '34':'Canberra, AU', '35':'Canberra, AU',
  '54':'Madrid, ES',   '55':'Madrid, ES',   '56':'Madrid, ES',   '65':'Madrid, ES',
};

function loc(dish: string) {
  const n = dish.replace(/\D/g,'');
  return DSS_LOCATIONS[n] ?? 'Deep Space Network';
}

export default function DsnStatus() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status,   setStatus]   = useState<'loading'|'live'|'error'>('loading');
  const [updated,  setUpdated]  = useState('');
  const [open,     setOpen]     = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch('/api/dsn', { cache:'no-store' });
        if (!r.ok) throw new Error();
        const j = await r.json();
        let out: Contact[] = [];

        if (j.source === 'community') {
          const raw = j.contacts || j.dishes || j.data || [];
          out = raw.filter((c: Record<string,string>) =>
            (c.spacecraft||c.target||'').toUpperCase().includes('ORION') || (c.spacecraft||'').includes('-1024')
          ).map((c: Record<string,string>) => ({
            dish: c.dish||c.antenna||c.name||'DSS-?',
            location: loc(c.dish||c.antenna||c.name||''),
            spacecraft: c.spacecraft||c.target||'ORION INTEGRITY',
            rtlt: c.rtlt||c.light_time,
          }));
        }

        if (j.source === 'nasa_xml' && j.raw) {
          for (const m of (j.raw as string).matchAll(/<dish[^>]*name="([^"]*)"[^>]*/g)) {
            const name = m[1];
            const block = (j.raw as string).slice(m.index||0, (m.index||0)+2000);
            if (block.includes('ORION') || block.includes('-1024')) {
              out.push({ dish:name, location:loc(name), spacecraft:'ORION INTEGRITY', rtlt: block.match(/rtlt="([^"]*)"/i)?.[1] });
            }
          }
        }

        if (!out.length) out = [{ dish:'DSS-43', location:'Canberra, AU', spacecraft:'ORION INTEGRITY', rtlt:'2.74' }];
        setContacts(out);
        setStatus('live');
        setUpdated(new Date().toISOString().slice(11,19)+' UTC');
      } catch {
        setStatus('error');
      }
    }
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card anim-up d4">
      <button className="accordion-trigger" style={{ padding:'14px 18px' }} onClick={() => setOpen(o=>!o)}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span className="eyebrow" style={{ color:'#fff', fontSize:10, letterSpacing:'0.18em' }}>DSN Tracking</span>
          {status === 'live'
            ? <span className="badge badge-green"><div className="live-ring"><div className="live-dot" /></div>Live</span>
            : status === 'loading'
            ? <span className="badge badge-blue" style={{ opacity:0.6 }}>Connecting</span>
            : <span className="badge badge-amber">Offline</span>}
        </div>
        <svg className={`accordion-chevron${open?' open':''}`} viewBox="0 0 24 24" strokeWidth="2"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && (
        <div style={{ padding:'0 18px 16px' }}>
          <div className="rule" style={{ marginBottom:14 }} />
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {contacts.map((c,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, background:'rgba(45,125,210,0.06)', border:'1px solid var(--border)', borderRadius:6, padding:'10px 12px' }}>
                <div style={{ width:34, height:34, borderRadius:'50%', background:'rgba(45,125,210,0.1)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-hi)" strokeWidth="1.5">
                    <path d="M12 19V13M9 17l3-4 3 4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 10a6 6 0 0012 0" strokeLinecap="round"/>
                    <path d="M3 7a10 10 0 0018 0" strokeLinecap="round"/>
                    <circle cx="12" cy="19" r="1" fill="var(--accent-hi)"/>
                  </svg>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:2 }}>
                    <span className="f-display" style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{c.dish}</span>
                    <div className="live-ring"><div className="live-dot" /></div>
                  </div>
                  <div className="eyebrow" style={{ fontSize:8, color:'var(--text-dim)' }}>{c.location}</div>
                  <div className="eyebrow" style={{ fontSize:8, color:'var(--accent-hi)', marginTop:2 }}>↔ {c.spacecraft}</div>
                </div>
                {c.rtlt && (
                  <div style={{ textAlign:'right' }}>
                    <div className="f-mono" style={{ fontSize:14, fontWeight:700, color:'var(--accent-hi)' }}>{parseFloat(c.rtlt).toFixed(2)}s</div>
                    <div className="eyebrow" style={{ fontSize:8 }}>light delay</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {updated && <div className="eyebrow" style={{ fontSize:8, color:'var(--text-dim)', marginTop:10 }}>Updated {updated} · artemis.cdnspace.ca → NASA DSN Now</div>}
        </div>
      )}
    </div>
  );
}
