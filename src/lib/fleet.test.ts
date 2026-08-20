import { describe, expect, it } from "vitest";
import { machines } from "./machines";

describe("machine registry", () => {
  it("contains the ten DadLAN machines", () => {
    expect(machines).toHaveLength(10);
    expect(machines[0]).toMatchObject({ id: "laptop01", hostname: "DESKTOP-5C3NIQO" });
    expect(machines[9]).toMatchObject({ id: "laptop10", hostname: "DESKTOP-MMR0H5N" });
  });
});
