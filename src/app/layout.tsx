import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "DadLAN Control Centre", description: "DadLAN fleet orchestration dashboard" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          src="https://cdn.jsdelivr.net/gh/joshualparris/JoshHub@ebb0d17495c92d3ce09df1fd1bdb5d4c2056914d/public/podcast-launcher-v3.js"
          data-topics="homelab"
          data-label="🎧 Listen to a different homelab podcast"
          data-launcher-label="🎧 Podcasts"
          defer
        />
      </body>
    </html>
  );
}
