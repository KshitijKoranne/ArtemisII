import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artemis II Live Tracker",
  description: "Real-time tracker for NASA's Artemis II crewed lunar flyby mission. Live telemetry, crew profiles, mission timeline, and splashdown countdown.",
  openGraph: {
    title: "Artemis II Live Tracker",
    description: "Track NASA's first crewed lunar mission since Apollo 17 in real time.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
