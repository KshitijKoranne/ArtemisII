# Artemis II Live Tracker

Real-time tracker for NASA's Artemis II crewed lunar flyby mission. Built by [KJR Labs](https://kjrlabs.in).

## Features

- **Live Telemetry** — Distance from Earth/Moon, speed, G-force via NASA AROW relay (artemis.cdnspace.ca) with physics model fallback
- **Splashdown Countdown** — Animated countdown to April 10, 2026 with mission progress bar
- **Mission Timeline** — 15 events from launch to splashdown with live complete/active/upcoming states
- **Crew Profiles** — Wiseman, Glover, Koch, Hansen with mission bios
- **NASA Live Stream** — Embedded NASA YouTube live coverage
- **DSN Status** — Which dish is currently tracking Orion (community API + NASA XML fallback)
- **Animated Starfield** — Canvas-rendered twinkling stars

## Data Sources

| Data | Source | Refresh |
|------|--------|---------|
| Distance, speed, altitude | artemis.cdnspace.ca/api/orbit (JPL Horizons relay) | 30s |
| DSN tracking | artemis.cdnspace.ca/api/dsn → eyes.nasa.gov/dsn/data/dsn.xml | 30s |
| NASA Live stream | YouTube embed (NASA official) | Live |
| Timeline / Crew | Hardcoded from NASA press kit | Static |

## Deploy to Vercel

1. Fork or clone this repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
3. Select `KshitijKoranne/ArtemisII`
4. Click Deploy — no env vars needed

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KshitijKoranne/ArtemisII)

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Vercel Edge Functions (API proxy for CORS)
- Google Fonts: Orbitron + Space Mono + DM Sans

## Disclaimer

Not affiliated with NASA. Fan project for educational purposes. Data from NASA JPL Horizons & community feeds.

---
Built by [KJR Labs](https://kjrlabs.in) · [@kshitijkoranne](https://twitter.com/kshitijkoranne)
