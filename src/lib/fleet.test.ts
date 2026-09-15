import { describe, expect, it } from "vitest";
import { machines } from "./machines";

describe("machine registry", () => {
  it("contains the twelve DadLAN Windows machines", () => {
    expect(machines).toHaveLength(12);
    expect(machines[0]).toMatchObject({ id: "laptop01", hostname: "DESKTOP-5C3NIQO" });
    expect(machines[9]).toMatchObject({ id: "laptop10", hostname: "DESKTOP-MMR0H5N" });
    expect(machines[10]).toMatchObject({ id: "laptop11", hostname: "DESKTOP-CD1U980" });
    expect(machines[11]).toMatchObject({ id: "jparrisdesktop", hostname: "JPARRISDESKTOP" });
  });
});
