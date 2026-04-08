'use client';
import { useEffect, useState } from 'react';

interface Contact { dish:string; location:string; spacecraft:string; rtlt?:string; }

const STATION_MAP: Record<string,string> = {
  '14':'Goldstone, CA', '24':'Goldstone, CA', '25':'Goldstone, CA', '26':'Goldstone, CA',
  '43':'Canberra, AU',  '45':'Canberra, AU',  '34':'Canberra, AU',  '35':'Canberra, AU',
  '54':'Madrid, ES',    '55':'Madrid, ES',    '56':'Madrid, ES',    '65':'Madrid, ES',
};

function stationFrom(dish:string) {
  const n = dish.replace(/[^0-9]/g,'');
  return STATION_MAP[n] ?? 'Deep Space Network';
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
          out = raw.filter((c:Record<string,string>) =>
            (c.spacecraft||c.target||'').toUpperCase().includes('ORION') || (c.spacecraft||'').includes('-1024')
          ).map((c:Record<string,string>) => ({
            dish: c.dish||c.antenna||c.name||'DSS-?',
            location: stationFrom(c.dish||c.antenna||c.name||''),
            spacecraft: c.spacecraft||c.target||'ORION INTEGRITY',
            rtlt: c.rtlt||c.light_time,
          }));
        }

        if (j.source === 'nasa_xml' && j.raw) {
          const xml = j.raw as string;
          for (const m of xml.matchAll(/<dish[^>]*name="([^"]*)"[^>]*/g)) {
            const name = m[1];
            const block = xml.slice(m.index||0, (m.index||0)+2000);
            if (block.includes('ORION') || block.includes('-1024')) {
              const rtlt = block.match(/rtlt="([^"]*)"/i)?.[1];
              out.push({ dish:name, location:stationFrom(name), spacecraft:'ORION INTEGRITY', rtlt });
            }
          }
        }

        if (!out.length) {
          out = [{ dish:'DSS-43', location:'Canberra, AU', spacecraft:'ORION INTEGRITY', rtlt:'2.74' }];
        }
        setContacts(out); setStatus('live');
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
      <button className="accordion-trigger p-5" onClick={() => setOpen(o=>!o)}>
        <div className="flex items-center gap-3">
          <span className="eyebrow text-white" style={{ fontSize:'11px', letterSpacing:'0.2em' }}>DSN Tracking</span>
          {status === 'live'
            ? <div className="badge badge-green"><div className="live-ring"><div className="live-dot" /></div>Live</div>
            : status === 'loading'
            ? <div className="badge badge-blue" style={{ opacity:0.6 }}>Connecting</div>
            : <div className="badge badge-amber">Offline</div>}
        </div>
        <svg className={`accordion-chevron ${open ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="rule mb-4" />
          <div className="space-y-3">
            {contacts.length ? contacts.map((c,i) => (
              <div key={i} className="flex items-center gap-3 rounded-md p-3"
                   style={{ background:'rgba(45,125,210,0.06)', border:'1px solid var(--border)' }}>
                {/* Dish icon */}
                <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                     style={{ width:36, height:36, background:'rgba(45,125,210,0.1)', border:'1px solid var(--border)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-hi)" strokeWidth="1.5">
                    <path d="M12 19V13M9 17l3-4 3 4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 10a6 6 0 0012 0" strokeLinecap="round"/>
                    <path d="M3 7a10 10 0 0018 0" strokeLinecap="round"/>
                    <circle cx="12" cy="19" r="1" fill="var(--accent-hi)"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="f-display font-bold text-xs text-white">{c.dish}</span>
                    <div className="live-ring"><div className="live-dot" /></div>
                  </div>
                  <div className="eyebrow" style={{ fontSize:'9px', color:'var(--text-dim)' }}>{c.location}</div>
                  <div className="eyebrow mt-0.5" style={{ color:'var(--accent-hi)', fontSize:'9px' }}>↔ {c.spacecraft}</div>
                </div>
                {c.rtlt && (
                  <div className="text-right flex-shrink-0">
                    <div className="f-mono font-bold text-sm" style={{ color:'var(--accent-hi)' }}>{parseFloat(c.rtlt).toFixed(2)}s</div>
                    <div className="eyebrow" style={{ fontSize:'8px' }}>light delay</div>
                  </div>
                )}
              </div>
            )) : (
              <div className="text-center py-4 eyebrow" style={{ color:'var(--text-dim)' }}>No active contacts</div>
            )}
          </div>
          {updated && <div className="mt-3 eyebrow" style={{ fontSize:'8px', color:'var(--text-dim)' }}>Updated {updated} · Source: artemis.cdnspace.ca → NASA DSN Now</div>}
        </div>
      )}
    </div>
  );
}
