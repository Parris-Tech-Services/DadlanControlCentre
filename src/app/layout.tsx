import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "DadLAN Control Centre", description: "DadLAN fleet orchestration dashboard" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          src="https://cdn.jsdelivr.net/gh/joshualparris/JoshHub@35c4348b4adfbc1c64bad8a3d3e31ede008a4441/public/podcast-dock.js"
          data-topics="homelab"
          data-label="🎧 Listen to a different homelab podcast"
          defer
        />
      </body>
    </html>
  );
}
