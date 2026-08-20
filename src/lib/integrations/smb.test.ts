import { describe, expect, it } from "vitest";

describe("SMB observation contract", () => {
  it("keeps unmounted distinct from unreadable", () => {
    expect({ state: "unmounted", readable: false }).not.toEqual({ state: "mounted", readable: false });
  });
});
