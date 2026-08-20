import { machines } from "./machines";
import type { FleetSnapshot, IntegrationHealth, IntegrationObservation, MachineSnapshot } from "./types";
import { readSmbObservation } from "./integrations/smb";
import { readForgeGridHealth, readForgeGridObservations } from "./integrations/forgegrid";
import { readMeshHealth, readMeshObservation } from "./integrations/meshcentral";
import { action1Observation } from "./integrations/action1";

function safe<T>(work: () => Promise<T>, fallback: T): Promise<T> { return work().catch(() => fallback); }
function derived(smb: MachineSnapshot["observations"]["smb"], mesh: IntegrationObservation) {
  if (mesh.state === "online") return { state: "reachable" as const, label: "Reachable" };
  if (smb.readable) return { state: "partially-reachable" as const, label: "Filesystem reachable" };
  if (smb.state === "unmounted" && mesh.state === "unavailable") return { state: "unknown" as const, label: "Unknown" };
  return { state: "unreachable" as const, label: "No live signal" };
}

export async function getFleetSnapshot(): Promise<FleetSnapshot> {
  const [forgeHealth, meshHealth, machineResults] = await Promise.all([
    safe(readForgeGridHealth, { state: "unavailable" as const, detail: "ForgeGrid unavailable" }),
    safe(readMeshHealth, { state: "unavailable" as const, detail: "MeshCentral unavailable", url: "https://10.245.173.178:1025" }),
    Promise.all(machines.map(async (machine) => {
      const [smb, forgegrid, meshcentral] = await Promise.all([
        safe(() => readSmbObservation(machine), { state: "unknown" as const, label: "Unknown", detail: "SMB observation failed" }),
        safe(() => readForgeGridObservations(machine), { state: "unknown" as const, label: "Unknown", detail: "ForgeGrid observation failed" }),
        safe(() => readMeshObservation(machine), { state: "unavailable" as const, label: "Unavailable", detail: "MeshCentral observation failed" }),
      ]);
      const action1 = action1Observation();
      const snapshot = { ...machine, observations: { smb, forgegrid, meshcentral, action1 }, derived: derived(smb, meshcentral) };
      return snapshot;
    })),
  ]);

  const integrations: IntegrationHealth[] = [
    { key: "smb", name: "SMB", state: machineResults.some((m) => m.observations.smb.readable) ? "healthy" : "degraded", detail: `${machineResults.filter((m) => m.observations.smb.readable).length}/10 mounts readable` },
    { key: "forgegrid", name: "ForgeGrid", state: forgeHealth.state, detail: forgeHealth.detail },
    { key: "meshcentral", name: "MeshCentral", state: meshHealth.state, detail: meshHealth.detail },
    { key: "action1", name: "Action1", state: "not-configured", detail: "API adapter ready; credentials not configured" },
    { key: "jenkins", name: "Jenkins", state: "not-configured", detail: "Not integrated in V1" },
    { key: "lancommander", name: "LANCommander", state: "not-configured", detail: "Not integrated in V1" },
  ];
  return { generatedAt: new Date().toISOString(), machines: machineResults, integrations };
}
