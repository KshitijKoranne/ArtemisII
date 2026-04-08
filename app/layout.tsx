import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://artemis2-nasa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Artemis II Live Tracker — Real-Time NASA Moon Mission 2026",
    template: "%s | Artemis II Live Tracker",
  },
  description:
    "Track NASA's Artemis II mission live — real-time telemetry, splashdown countdown, crew profiles, mission timeline & NASA live stream. First crewed lunar flyby since Apollo 17, 1972. Orion spacecraft returns April 10, 2026.",
  keywords: [
    "Artemis II","Artemis 2","NASA moon mission 2026","Artemis II live tracker",
    "Artemis II splashdown","Orion spacecraft","Orion Integrity","NASA live tracker",
    "moon mission live","lunar flyby 2026","Reid Wiseman","Victor Glover",
    "Christina Koch","Jeremy Hansen","Artemis II crew","Artemis II countdown",
    "NASA Artemis live","Artemis II reentry","crewed moon mission",
    "Artemis II splashdown April 10","SLS rocket","first humans moon since 1972",
  ],
  authors: [{ name: "KJR Labs", url: "https://kjrlabs.in" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Artemis II Live Tracker",
    title: "Artemis II Live Tracker — NASA Moon Mission 2026",
    description: "Real-time tracker for NASA's Artemis II — humanity's first crewed lunar flyby since 1972. Live speed, distance, splashdown countdown & crew.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Artemis II Live Tracker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artemis II Live Tracker — NASA Moon Mission 2026",
    description: "Track Orion live — distance from Earth, splashdown countdown, crew. First crewed lunar flyby since Apollo 17.",
    creator: "@kshitijkoranne",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Artemis II Live Tracker",
              url: SITE_URL,
              description: "Real-time tracker for NASA's Artemis II crewed lunar flyby mission.",
              author: { "@type": "Organization", name: "KJR Labs", url: "https://kjrlabs.in" },
              about: {
                "@type": "Event",
                name: "NASA Artemis II Moon Mission",
                startDate: "2026-04-01", endDate: "2026-04-10",
                organizer: { "@type": "Organization", name: "NASA", url: "https://nasa.gov" },
                performer: [
                  { "@type": "Person", name: "Reid Wiseman",   jobTitle: "Commander" },
                  { "@type": "Person", name: "Victor Glover",  jobTitle: "Pilot" },
                  { "@type": "Person", name: "Christina Koch", jobTitle: "Mission Specialist" },
                  { "@type": "Person", name: "Jeremy Hansen",  jobTitle: "Mission Specialist" },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
