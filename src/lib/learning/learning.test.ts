import { describe, expect, it } from "vitest";
import { networkingCurriculum } from "./networkingCurriculum";
import { dadlanExercises } from "./dadlanExercises";

describe("DadLAN networking modules", () => {
  it("has ten modules, each with a read-only DadLAN exercise", () => {
    expect(networkingCurriculum).toHaveLength(10);
    for (const m of networkingCurriculum) expect(dadlanExercises[m.id]?.length, m.id).toBeGreaterThanOrEqual(2);
    expect(Object.keys(dadlanExercises).sort()).toEqual(networkingCurriculum.map((m) => m.id).sort());
  });

  it("marks exactly one correct option per ticket step and valid quiz answers", () => {
    for (const m of networkingCurriculum) {
      for (const step of m.scenario.steps) expect(step.options.filter((o) => o.correct)).toHaveLength(1);
      for (const q of m.quiz) expect(q.answerIndex).toBeLessThan(q.options.length);
    }
  });
});
