import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // Try community DSN API first
    const res = await fetch('https://artemis.cdnspace.ca/api/dsn', {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error('community dsn failed');
    const data = await res.json();
    return NextResponse.json({ source: 'community', ...data }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    // Fallback: NASA DSN XML
    try {
      const res = await fetch('https://eyes.nasa.gov/dsn/data/dsn.xml', {
        next: { revalidate: 0 },
      });
      const xml = await res.text();
      return NextResponse.json({ source: 'nasa_xml', raw: xml }, {
        headers: { 'Cache-Control': 'no-store' },
      });
    } catch {
      return NextResponse.json({ error: 'dsn_unavailable' }, { status: 502 });
    }
  }
}
