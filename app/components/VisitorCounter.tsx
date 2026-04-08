'use client';
import { useEffect, useRef, useState } from 'react';

// Generates a stable visitor ID for this browser session
function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = sessionStorage.getItem('artemis_vid');
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('artemis_vid', id);
  }
  return id;
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [animate, setAnimate] = useState(false);
  const prevCount = useRef<number | null>(null);

  async function ping() {
    try {
      const vid = getVisitorId();
      const res = await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'x-visitor-id': vid },
        cache: 'no-store',
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const newCount = data.count ?? 1;
      if (prevCount.current !== null && newCount !== prevCount.current) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 400);
      }
      prevCount.current = newCount;
      setCount(newCount);
    } catch {
      // Silently fail — just show nothing
    }
  }

  useEffect(() => {
    ping();
    const id = setInterval(ping, 30000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (count === null) return null;

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded"
      style={{
        background: 'rgba(34,197,94,0.08)',
        border: '1px solid rgba(34,197,94,0.2)',
      }}
      title="People viewing this tracker right now"
    >
      {/* Pulsing eye icon */}
      <svg
        width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="#22c55e" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span
        className={`telem-number font-bold text-sm ${animate ? 'count-flip' : ''}`}
        style={{ color: '#22c55e', minWidth: '2ch', textAlign: 'right' }}
      >
        {count.toLocaleString()}
      </span>
      <span className="label-tag" style={{ color: 'rgba(34,197,94,0.7)', fontSize: '9px' }}>
        LIVE NOW
      </span>
    </div>
  );
}
