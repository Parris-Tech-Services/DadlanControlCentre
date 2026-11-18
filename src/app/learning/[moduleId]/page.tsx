import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { networkingCurriculum } from "@/lib/learning/networkingCurriculum";
import { dadlanExercises } from "@/lib/learning/dadlanExercises";
import { LessonText } from "../LessonText";

export function generateStaticParams() {
  return networkingCurriculum.map((m) => ({ moduleId: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ moduleId: string }> }): Promise<Metadata> {
  const { moduleId } = await params;
  const m = networkingCurriculum.find((x) => x.id === moduleId);
  return { title: m ? `${m.title} | DadLAN Control Centre` : "Module not found" };
}

function Kicker({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return <div className="section-kicker"><span className="section-index">{index}</span><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div></div>;
}

export default async function NetworkingModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const index = networkingCurriculum.findIndex((x) => x.id === moduleId);
  if (index < 0) notFound();
  const m = networkingCurriculum[index];
  const next = networkingCurriculum[index + 1];
  const s = m.scenario;

  return (
    <main>
      <header className="topbar detail-top"><Link className="back-link" href="/learning">← Networking modules</Link></header>
      <section className="detail-hero">
        <div>
          <p className="eyebrow">Module {m.order} of {networkingCurriculum.length}</p>
          <h1>{m.title}</h1>
          <p className="model-line">{m.summary}</p>
        </div>
      </section>
      <nav className="detail-nav"><a href="#lesson">Lesson</a><a href="#dadlan">Try it on DadLAN</a><a href="#ticket">Ticket</a><a href="#check">Check yourself</a></nav>

      <section className="detail-section">
        <p><strong>Why it matters:</strong> {m.whyItMatters}</p>
        <ul>{m.objectives.map((o) => <li key={o}>{o}</li>)}</ul>
      </section>

      <section id="lesson" className="detail-section">
        <Kicker index="01" eyebrow="Lesson" title="Concepts" />
        {m.sections.map((sec) => (
          <div key={sec.id} style={{ marginTop: 18 }}>
            <h3>{sec.title}</h3>
            <LessonText body={sec.body} />
          </div>
        ))}
        <h3 style={{ marginTop: 18 }}>Key terms</h3>
        <ul>{m.keyTerms.map((k) => <li key={k.term}><strong>{k.term}:</strong> {k.definition}</li>)}</ul>
        <h3>Commands</h3>
        <ul>{m.commands.map((c) => <li key={c.command}><code>{c.command}</code> — {c.purpose}</li>)}</ul>
        <h3>Common mistakes</h3>
        <ul>{m.commonMistakes.map((x) => <li key={x}>{x}</li>)}</ul>
      </section>

      <section id="dadlan" className="detail-section">
        <Kicker index="02" eyebrow="Practical" title="Try it on DadLAN (read-only)" />
        <ol>{(dadlanExercises[m.id] ?? []).map((x) => <li key={x}><LessonText body={x} /></li>)}</ol>
      </section>

      <section id="ticket" className="detail-section">
        <Kicker index="03" eyebrow="Ticket" title={s.title} />
        <p><strong>{s.ticket.requester}, {s.ticket.client}</strong> ({s.ticket.priority} priority): “{s.ticket.summary}”</p>
        <ul>{s.ticket.symptoms.map((x) => <li key={x}>{x}</li>)}</ul>
        <p>Recent change: {s.ticket.recentChanges.join(" ")}</p>
        {s.steps.map((step, i) => (
          <details key={step.id} style={{ marginTop: 10 }}>
            <summary><strong>Step {i + 1}:</strong> {step.prompt}</summary>
            <ul>{step.options.map((o) => <li key={o.text}>{o.correct ? "✅ " : "❌ "}{o.text}<br /><small>{o.feedback}</small></li>)}</ul>
          </details>
        ))}
        <details style={{ marginTop: 10 }}>
          <summary><strong>Resolution and ticket note</strong></summary>
          <p>{s.resolution}</p>
          <p><code>{s.ticketNote}</code></p>
        </details>
      </section>

      <section id="check" className="detail-section">
        <Kicker index="04" eyebrow="Check yourself" title="Quiz and flashcards" />
        <ol>
          {m.quiz.map((q) => (
            <li key={q.id} style={{ marginBottom: 10 }}>
              <details>
                <summary>{q.question}</summary>
                <ul>{q.options.map((o, i) => <li key={o}>{i === q.answerIndex ? <strong>{o} ✅</strong> : o}</li>)}</ul>
                <small>{q.explanation}</small>
              </details>
            </li>
          ))}
        </ol>
        <h3>Flashcards</h3>
        {m.flashcards.map((f) => <details key={f.id}><summary>{f.front}</summary><p>{f.back}</p></details>)}
      </section>

      <section className="detail-section muted-section">
        <p className="eyebrow">Sources</p>
        <ul>{m.sources.map((src) => <li key={src.url}><a href={src.url} target="_blank" rel="noreferrer">{src.title}</a></li>)}</ul>
      </section>

      <footer>{next ? <Link href={`/learning/${next.id}`}>Next: {next.title} →</Link> : <Link href="/learning">All modules</Link>}</footer>
    </main>
  );
}
