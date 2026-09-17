import { describe, expect, it } from "vitest";
import type { Machine } from "../types";
import { classifyMeshObservation } from "./meshcentral";

const machine: Machine = {
  id: "laptop01",
  name: "Laptop #01",
  hostname: "DESKTOP-5C3NIQO",
  model: "HP ProBook x360 435 G8",
  mountPath: "/mnt/laptop01",
};

const observedAt = "2026-09-17T00:00:00.000Z";

describe("classifyMeshObservation", () => {
  it("reports a known device when the console is reachable", () => {
    expect(classifyMeshObservation(true, [{ type: "node", name: machine.hostname, host: "10.245.173.201" }], machine, observedAt)).toMatchObject({
      state: "online",
      label: "Known",
      observedAt,
      detail: "Known device at 10.245.173.201; live state requires console confirmation",
    });
  });

  it("matches MeshCentral's remote-name field", () => {
    expect(classifyMeshObservation(true, [{ type: "node", rname: machine.hostname }], machine, observedAt)).toMatchObject({
      state: "online",
      detail: "Known device; live state requires console confirmation",
    });
  });

  it("reports a reachable console with no matching enrollment", () => {
    expect(classifyMeshObservation(true, [], machine, observedAt)).toMatchObject({
      state: "unknown",
      label: "Not enrolled",
      detail: "No matching device record",
    });
  });

  it("distinguishes known devices when the console itself is unavailable", () => {
    expect(classifyMeshObservation(false, [{ type: "node", name: machine.hostname }], machine, observedAt)).toMatchObject({
      state: "unavailable",
      detail: "Known in MeshCentral; console unavailable",
    });
  });

  it("reports a plain console outage for an unknown device", () => {
    expect(classifyMeshObservation(false, [], machine, observedAt)).toMatchObject({
      state: "unavailable",
      detail: "MeshCentral console unavailable",
    });
  });
});
