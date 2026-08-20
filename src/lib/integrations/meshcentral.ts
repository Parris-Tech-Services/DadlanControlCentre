import { readFile } from "node:fs/promises";
import https from "node:https";
import type { IntegrationObservation, Machine } from "../types";

const meshUrl = process.env.MESHCENTRAL_URL || "https://10.245.173.178:1025";
const dataPath = process.env.MESHCENTRAL_DATA_PATH || "/home/josh/dev/6 Laptops/Mesh/meshcentral-data";

function checkConsole(): Promise<boolean> {
  return new Promise((resolve) => {
    const request = https.get(meshUrl, { rejectUnauthorized: false, timeout: 2500 }, (response) => { response.resume(); resolve((response.statusCode || 500) < 500); });
    request.on("error", () => resolve(false));
    request.on("timeout", () => { request.destroy(); resolve(false); });
  });
}

async function nodes() {
  try {
    const lines = (await readFile(`${dataPath}/meshcentral.db`, "utf8")).split(/\r?\n/).filter(Boolean);
    return lines.map((line) => JSON.parse(line) as { type?: string; name?: string; rname?: string; host?: string; ip?: string; time?: number }).filter((row) => row.type === "node");
  } catch { return []; }
}

export async function readMeshObservation(machine: Machine): Promise<IntegrationObservation & { consoleUrl?: string }> {
  const [reachable, records] = await Promise.all([checkConsole(), nodes()]);
  const known = records.find((record) => [record.name, record.rname].includes(machine.hostname));
  if (!reachable) return { state: "unavailable", label: "Unavailable", observedAt: new Date().toISOString(), detail: known ? "Known in MeshCentral; console unavailable" : "MeshCentral console unavailable", consoleUrl: meshUrl };
  if (!known) return { state: "unknown", label: "Not enrolled", observedAt: new Date().toISOString(), detail: "No matching device record", consoleUrl: meshUrl };
  return { state: "online", label: "Known", observedAt: new Date().toISOString(), detail: `Known device${known.host ? ` at ${known.host}` : ""}; live state requires console confirmation`, consoleUrl: meshUrl };
}

export async function readMeshHealth() {
  const available = await checkConsole();
  return { state: available ? "healthy" as const : "unavailable" as const, detail: available ? "Console responding" : "Console unavailable", url: meshUrl };
}
