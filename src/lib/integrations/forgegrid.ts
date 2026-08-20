import { readFile } from "node:fs/promises";
import type { IntegrationObservation, Machine } from "../types";

const dataPath = "/home/josh/dev/6 Laptops/ForgeGrid/forgegrid-data";

type Worker = { node_name?: string; status?: string; last_seen?: string; id?: string };
type Job = { worker_id?: string; task?: string; status?: string };

async function readJson<T>(name: string): Promise<T | undefined> {
  try { return JSON.parse(await readFile(`${dataPath}/${name}`, "utf8")) as T; } catch { return undefined; }
}

export async function readForgeGridObservations(machine: Machine): Promise<IntegrationObservation> {
  const workers = await readJson<Record<string, Worker>>("workers.json");
  if (!workers) return { state: "unavailable", label: "Unavailable", observedAt: new Date().toISOString(), detail: "ForgeGrid state is not readable" };
  const match = Object.values(workers).find((worker) => worker.node_name?.toLowerCase() === machine.hostname.toLowerCase() || worker.node_name?.toLowerCase().includes(machine.name.toLowerCase()));
  if (!match) return { state: "unknown", label: "Unknown", observedAt: new Date().toISOString(), detail: "No worker identity matches this hostname" };
  return { state: match.status === "online" ? "online" : "offline", label: match.status === "online" ? "Worker online" : "Worker offline", observedAt: match.last_seen, detail: match.node_name };
}

export async function readForgeGridHealth(): Promise<{ state: "healthy" | "degraded" | "unavailable"; detail: string }> {
  const [workers, jobs] = await Promise.all([readJson<Record<string, Worker>>("workers.json"), readJson<Record<string, Job>>("jobs.json")]);
  if (!workers || !jobs) return { state: "unavailable", detail: "Local coordinator state unavailable" };
  const online = Object.values(workers).filter((worker) => worker.status === "online").length;
  return { state: online > 0 ? "healthy" : "degraded", detail: `${online} worker${online === 1 ? "" : "s"} online in local coordinator state` };
}
