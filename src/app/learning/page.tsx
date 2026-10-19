import type { Metadata } from "next";
import Link from "next/link";
import { networkingCurriculum } from "@/lib/learning/networkingCurriculum";

export const metadata: Metadata = { title: "Networking modules | DadLAN Control Centre", description: "Ten MSP networking modules that follow the Subnet Lab." };

export default function LearningPage() {
  return (
    <main>
      <header className="topbar detail-top"><Link className="back-link" href="/">← Fleet</Link></header>
      <section className="detail-hero">
        <div>
          <p className="eyebrow">Learning</p>
          <h1>Networking modules</h1>
          <p className="model-line">The ten topics after the <Link href="/subnetting">Subnet Lab</Link>, each with a read-only exercise on the DadLAN fleet.</p>
        </div>
      </section>
      <section className="detail-section">
        <ol style={{ display: "grid", gap: 14, paddingLeft: 22 }}>
          {networkingCurriculum.map((m) => (
            <li key={m.id}>
              <Link href={`/learning/${m.id}`}><strong>{m.title}</strong></Link>
              <div style={{ opacity: 0.8 }}>{m.summary}</div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
