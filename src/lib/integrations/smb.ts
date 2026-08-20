import { access, constants, readdir } from "node:fs/promises";
import { statfs } from "node:fs";
import { promisify } from "node:util";
import { execFile } from "node:child_process";
import type { Machine, StorageObservation } from "../types";

const execFileAsync = promisify(execFile);
const statfsAsync = promisify(statfs);

async function mountInfo(path: string) {
  try {
    const { stdout } = await execFileAsync("findmnt", ["-T", path, "-n", "-o", "FSTYPE,SOURCE"], { timeout: 2500 });
    const [fstype, source] = stdout.trim().split(/\s+/, 2);
    return { fstype, source };
  } catch {
    return undefined;
  }
}

export async function readSmbObservation(machine: Machine): Promise<StorageObservation> {
  const observedAt = new Date().toISOString();
  const mount = await mountInfo(machine.mountPath);
  if (!mount || mount.fstype !== "cifs") {
    return { state: "unmounted", label: "Not mounted", observedAt, readable: false, detail: "No CIFS mount detected" };
  }

  try {
    await access(machine.mountPath, constants.R_OK);
    await readdir(machine.mountPath, { withFileTypes: true });
    const stats = await statfsAsync(machine.mountPath);
    const totalBytes = Number(stats.blocks) * Number(stats.bsize);
    const freeBytes = Number(stats.bavail) * Number(stats.bsize);
    return {
      state: "mounted",
      label: "Mounted",
      observedAt,
      readable: true,
      totalBytes,
      freeBytes,
      usedBytes: Math.max(0, totalBytes - Number(stats.bfree) * Number(stats.bsize)),
      source: mount.source,
      detail: "CIFS mount is readable",
    };
  } catch (error) {
    return { state: "mounted", label: "Mounted, unreadable", observedAt, readable: false, source: mount.source, detail: error instanceof Error ? error.message : "Read check failed" };
  }
}
