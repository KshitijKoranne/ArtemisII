# 🚀 Artemis II Live Tracker

Real-time tracker for NASA's Artemis II crewed lunar flyby mission — built by [KJR Labs](https://kjrlabs.in).

**Mission:** April 1–10, 2026 · Orion "Integrity" · First crewed deep-space mission since Apollo 17 (1972)

## Features

- **Live Telemetry** — Distance from Earth/Moon, spacecraft speed, G-force (via NASA AROW relay)
- **Splashdown Countdown** — Animated countdown with mission progress bar
- **Mission Timeline** — 15 events with live complete/active/upcoming states
- **Crew Profiles** — Wiseman, Glover, Koch, Hansen
- **NASA Live TV** — Embedded YouTube stream
- **DSN Status** — Which dish is tracking Orion right now
- **Starfield Background** — Animated canvas star field

## Data Sources

| Data | Source | Update Rate |
|---|---|---|
| Orbital telemetry | `artemis.cdnspace.ca/api/orbit` (JPL Horizons relay) | 5 min |
| DSN tracking | `artemis.cdnspace.ca/api/dsn` → `eyes.nasa.gov/dsn/data/dsn.xml` | 10s / 60s |
| NASA live stream | YouTube embed | Live |

If live APIs are unreachable, the tracker falls back to a physics model computed from known trajectory data points.

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS**
- **Vercel Edge Functions** (CORS proxy for NASA APIs)
- Fonts: Orbitron · Space Mono · DM Sans

## Deploy on Vercel

```bash
npm install
npm run dev        # local dev
vercel --prod      # deploy
```

Or connect the GitHub repo directly to Vercel — zero config needed.

## Credits

- Orbital data: [artemis.cdnspace.ca](https://artemis.cdnspace.ca) community API
- NASA AROW: [NASA Artemis Real-time Orbit Website](https://www.nasa.gov/missions/artemis/artemis-2/track-nasas-artemis-ii-mission-in-real-time/)
- DSN fallback: [NASA DSN Now](https://eyes.nasa.gov/dsn/dsn.html)

*Not affiliated with NASA. Fan project for educational purposes.*

---

Built by [@kshitijkoranne](https://twitter.com/kshitijkoranne) · [KJR Labs](https://kjrlabs.in) · [Buy me a coffee](https://buymeacoffee.com/kshitijkorz)
