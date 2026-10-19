import type { ReactNode } from "react";
import { markdownTablesToLists } from "@/lib/learning/networkingCurriculum";

// Light markdown (paragraphs, lists, **bold**, `code`; tables become lists)
// rendered as React elements, never raw HTML.
function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    return part;
  });
}

export function LessonText({ body }: { body: string }) {
  const blocks = markdownTablesToLists(body).split(/\n\s*\n/).map((b) => b.split("\n").filter((l) => l.trim() !== ""));
  return (
    <div style={{ lineHeight: 1.65 }}>
      {blocks.map((lines, i) => {
        if (lines.every((l) => /^\s*- /.test(l))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*- /, ""))}</li>)}</ul>;
        if (lines.every((l) => /^\s*\d+\. /.test(l))) return <ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\s*\d+\. /, ""))}</li>)}</ol>;
        return <p key={i}>{lines.map((l, j) => <span key={j}>{j > 0 && <br />}{inline(l)}</span>)}</p>;
      })}
    </div>
  );
}
