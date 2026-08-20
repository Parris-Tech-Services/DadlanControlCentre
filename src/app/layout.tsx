import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "DadLAN Control Centre", description: "DadLAN fleet orchestration dashboard" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
