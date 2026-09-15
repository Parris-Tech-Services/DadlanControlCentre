import Link from "next/link";
import { getFleetSnapshot } from "@/lib/fleet";
import type { IntegrationObservation, MachineSnapshot } from "@/lib/types";

function formatBytes(bytes?: number) {
  if (bytes === undefined) return "Unknown";
  const units = ["B", "KB", "MB", "GB", "TB"]; let value = bytes; let unit = 0;
  while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit++; }
  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}
function Dot({ state }: { state: string }) { return <span className={`dot dot-${state}`} aria-hidden="true" />; }
function Signal({ label, observation }: { label: string; observation: IntegrationObservation }) { return <div className="signal"><span>{label}</span><strong><Dot state={observation.state} />{observation.label}</strong></div>; }
function Card({ machine }: { machine: MachineSnapshot }) {
  const disk = machine.observations.smb;
  return <article className="machine-card">
    <div className="card-head"><div><p className="eyebrow">{machine.name}</p><h2>{machine.hostname}</h2><p className="muted">{machine.model}</p></div><div className={`state state-${machine.derived.state}`}><Dot state={machine.derived.state} />{machine.derived.label}</div></div>
    <div className="signals"><Signal label="SMB" observation={disk} /><Signal label="MeshCentral" observation={machine.observations.meshcentral} /><Signal label="ForgeGrid" observation={machine.observations.forgegrid} /><Signal label="Action1" observation={machine.observations.action1} /></div>
    <div className="storage"><span>Disk</span><strong>{formatBytes(disk.freeBytes)} free</strong><small>{disk.totalBytes ? `${formatBytes(disk.usedBytes)} used of ${formatBytes(disk.totalBytes)}` : "No filesystem statistics"}</small></div>
    <div className="card-actions"><Link href={`/machines/${machine.id}`}>Details <span>↗</span></Link>{disk.readable ? <a href={`file://${machine.mountPath}`}>Open files <span>↗</span></a> : <span className="disabled">Files unavailable</span>}</div>
  </article>;
}

export default async function Home() {
  const fleet = await getFleetSnapshot();
  const readable = fleet.machines.filter((machine) => machine.observations.smb.readable).length;
  const meshOnline = fleet.machines.filter((machine) => machine.observations.meshcentral.state === "online").length;
  const machineCount = fleet.machines.length;
  return <main><header className="topbar"><div className="brand-mark">D</div><div><p className="eyebrow">DADLAN / CONTROL PLANE</p><h1>DadLAN Control Centre</h1></div><div className="topbar-meta"><span className="live-pill"><Dot state="online" />Live snapshot</span><time>{new Date(fleet.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time></div></header>
    <section className="hero"><div><p className="eyebrow">Fleet overview</p><h2>{machineCount} Windows machines.<br /><em>One view.</em></h2><p className="hero-copy">A quiet operations layer for files, compute, remote control, LANCommander and DadLAN fleet readiness.</p><Link className="back-link" href="/rollout">September 2026 rollout & optimisation →</Link></div><div className="reachability"><span className="reach-number">{readable}<small>/{machineCount}</small></span><span>filesystem mounts<br /><strong>readable now</strong></span><div className="reach-bar"><i style={{ width: `${machineCount ? (readable / machineCount) * 100 : 0}%` }} /></div></div></section>
    <section className="health-strip"><div className="section-kicker"><span className="section-index">01</span><div><p className="eyebrow">Integration health</p><h2>Systems at a glance</h2></div></div><div className="health-list">{fleet.integrations.map((integration) => <div className="health-item" key={integration.key}><span className={`health-icon health-${integration.state}`}><Dot state={integration.state} /></span><div><strong>{integration.name}</strong><span>{integration.detail}</span></div></div>)}</div></section>
    <section className="fleet-section"><div className="section-kicker"><span className="section-index">02</span><div><p className="eyebrow">Machine registry</p><h2>DadLAN fleet <span>{meshOnline ? `${meshOnline} MeshCentral online` : "Live signals separated by source"}</span></h2></div></div><div className="machine-grid">{fleet.machines.map((machine) => <Card key={machine.id} machine={machine} />)}</div></section>
    <footer><span>DadLAN Control Centre V1</span><span>Server-side integrations / no destructive actions</span></footer>
  </main>;
}
