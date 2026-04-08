import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const VISITOR_KEY = "artemis2:visitors";
const VISITOR_TTL = 60;

async function upstash(command: string[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(`${url}/${command.map(encodeURIComponent).join("/")}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const visitorId = req.headers.get("x-visitor-id") || crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  await upstash(["ZADD", VISITOR_KEY, String(now), visitorId]);
  await upstash(["ZREMRANGEBYSCORE", VISITOR_KEY, "0", String(now - VISITOR_TTL)]);
  const count = await upstash(["ZCARD", VISITOR_KEY]);
  return NextResponse.json({ count: typeof count === "number" ? count : 1, visitor_id: visitorId });
}

export async function GET() {
  const now = Math.floor(Date.now() / 1000);
  await upstash(["ZREMRANGEBYSCORE", VISITOR_KEY, "0", String(now - VISITOR_TTL)]);
  const count = await upstash(["ZCARD", VISITOR_KEY]);
  return NextResponse.json({ count: typeof count === "number" ? count : 1 });
}
