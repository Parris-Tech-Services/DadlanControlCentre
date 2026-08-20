import { describe, expect, it } from "vitest";
import { action1Observation } from "./action1";

describe("Action1 adapter", () => {
  it("degrades when credentials are not configured", () => {
    expect(action1Observation()).toMatchObject({ state: "unavailable", label: "Not configured" });
  });
});
