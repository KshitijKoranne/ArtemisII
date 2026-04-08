import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const res = await fetch('https://artemis.cdnspace.ca/api/orbit', {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error('orbit fetch failed');
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
  }
}
