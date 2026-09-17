import { readFile } from "node:fs/promises";
import https from "node:https";
import type { IntegrationObservation, Machine } from "../types";

const meshUrl = process.env.MESHCENTRAL_URL || "https://10.245.173.178:1025";
const dataPath = process.env.MESHCENTRAL_DATA_PATH || "/home/josh/dev/6 Laptops/Mesh/meshcentral-data";

type MeshRecord = { type?: string; name?: string; rname?: string; host?: string; ip?: string; time?: number };
type MeshObservation = IntegrationObservation & { consoleUrl?: string };

function checkConsole(): Promise<boolean> {
  return new Promise((resolve) => {
    const request = https.get(meshUrl, { rejectUnauthorized: false, timeout: 2500 }, (response) => { response.resume(); resolve((response.statusCode || 500) < 500); });
    request.on("error", () => resolve(false));
    request.on("timeout", () => { request.destroy(); resolve(false); });
  });
}

async function nodes(): Promise<MeshRecord[]> {
  try {
    const lines = (await readFile(`${dataPath}/meshcentral.db`, "utf8")).split(/\r?\n/).filter(Boolean);
    return lines.map((line) => JSON.parse(line) as MeshRecord).filter((row) => row.type === "node");
  } catch {
    return [];
  }
}

function findMeshRecord(records: MeshRecord[], hostname: string): MeshRecord | undefined {
  return records.find((record) => record.name === hostname || record.rname === hostname);
}

function unavailableObservation(known: boolean, observedAt: string): MeshObservation {
  if (known) {
    return { state: "unavailable", label: "Unavailable", observedAt, detail: "Known in MeshCentral; console unavailable", consoleUrl: meshUrl };
  }
  return { state: "unavailable", label: "Unavailable", observedAt, detail: "MeshCentral console unavailable", consoleUrl: meshUrl };
}

function knownObservation(record: MeshRecord, observedAt: string): MeshObservation {
  if (record.host) {
    return { state: "online", label: "Known", observedAt, detail: `Known device at ${record.host}; live state requires console confirmation`, consoleUrl: meshUrl };
  }
  return { state: "online", label: "Known", observedAt, detail: "Known device; live state requires console confirmation", consoleUrl: meshUrl };
}

export function classifyMeshObservation(reachable: boolean, records: MeshRecord[], machine: Machine, observedAt = new Date().toISOString()): MeshObservation {
  const known = findMeshRecord(records, machine.hostname);
  if (!reachable) return unavailableObservation(Boolean(known), observedAt);
  if (!known) return { state: "unknown", label: "Not enrolled", observedAt, detail: "No matching device record", consoleUrl: meshUrl };
  return knownObservation(known, observedAt);
}

export async function readMeshObservation(machine: Machine): Promise<MeshObservation> {
  const [reachable, records] = await Promise.all([checkConsole(), nodes()]);
  return classifyMeshObservation(reachable, records, machine);
}

export async function readMeshHealth() {
  const available = await checkConsole();
  return { state: available ? "healthy" as const : "unavailable" as const, detail: available ? "Console responding" : "Console unavailable", url: meshUrl };
}
