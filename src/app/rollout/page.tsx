import styles from "./rollout.module.css";
import Link from "next/link";

const machines = [
  ["#01", "HP ProBook x360 435 G8", "Ready", "LANCommander connected; idle load improved after runaway LCX scan and ForgeGrid cleanup."],
  ["#02", "Lenovo ThinkPad L480", "Ready / Avance workstation", "LANCommander connected. Chrome/Meet/OneDrive are legitimate workload; ForgeGrid is manual-only."],
  ["#03", "Toshiba Satellite L850D", "Ready after network repair", "Moved from 10.176.176.x to DadLAN 10.245.173.x; TCP/1337 and LANCommander sync restored."],
  ["#04", "HP ProBook 4230s", "Ready / canary client", "LANCommander connected; used for headless Teeworlds install/uninstall/reinstall validation."],
  ["#05", "Toshiba Tecra P11", "Ready", "8 GB RAM with ~4.3 GB free during check; alternate counters showed 0% instantaneous CPU load."],
  ["#06", "Toshiba Satellite L630", "Ready with maintenance pending", "LANCommander connected; elevated CPU traced to Windows Update and Delivery Optimization activity."],
  ["#07", "ASUS X553MA", "Ready after network repair", "Moved from 10.176.176.x to DadLAN 10.245.173.x; launcher wrapper repaired."],
  ["#08", "Toshiba Satellite C50D-A", "Ready / low-end", "AMD E1-2100; heavy diagnostics caused misleading spikes. LANCommander itself measured about 5% in the clean pass."],
  ["#09", "Compaq Presario CQ56", "Ready", "LANCommander client rollout previously verified."],
  ["#10", "Compaq 610", "Upgrade required", "Core 2 Duo T5870 is x64-capable but Windows 10 is 32-bit; ~3.2 GB RAM and 120 GB 5400-RPM HDD. Audit RAM ceiling/SSD before rebuild."],
  ["#11", "HP ProBook", "Startup validation pending", "v2.1.15 installed; reboot completed but interactive LANCommander startup still needed final verification."],
  ["Server", "JParrisDesktop", "Healthy", "LANCommander Server v2.1.15 on 10.245.173.58:1337; /Health returned HTTP 200 Healthy."],
] as const;

const completedLcx = ["Armagetron Advanced.lcx", "Bitfighter.lcx", "Teeworlds.lcx", "ZeroK - Total Annihilation - Comunity engine.lcx"];
const queuedLcx = [
  "Battlefield 2_v2_mercle.lcx (was in progress before transfer token expiry)",
  "Battlefield 1942_RTR_SWWWII_DC.lcx",
  "Battlefield_ Bad Company 2-v4-mercle.lcx",
  "Blur v4.lcx",
  "Dirt 3 Complete Edition.lcx",
  "Kids Games via ScummVM V2.lcx",
  "MechWarrior 4_ Mercenaries.lcx",
  "Need for Speed_ Most Wanted - Black Edition-v1-mercle.lcx",
  "Need for Speed_ ProStreet_v1_mercle.lcx",
  "Quake III Arena Modern Engine.lcx",
  "Unreal Tournament 2004_v3_mercle.lcx",
];

export default function RolloutPage() {
  return <main>
    <header className="topbar detail-top"><Link className="back-link" href="/">← Fleet overview</Link><div className="topbar-meta"><span className="live-pill">Snapshot: 14 Sep 2026</span></div></header>
    <section className={`detail-hero ${styles.hero}`}><div><p className="eyebrow">DadLAN / September 2026</p><h1>LANCommander rollout<br />& fleet optimisation</h1><p className="model-line">Verified rollout notes, performance findings, network repairs and remaining work.</p></div><div className="state state-reachable">Operational snapshot</div></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">01</span><div><p className="eyebrow">Current platform</p><h2>LANCommander is live</h2></div></div><div className={styles.kpis}><div><span>Server</span><strong>v2.1.15</strong><small>JParrisDesktop · 10.245.173.58:1337</small></div><div><span>Health endpoint</span><strong>HTTP 200</strong><small>/Health returned Healthy</small></div><div><span>Catalogue</span><strong>3 imported</strong><small>Teeworlds · Bitfighter · Armagetron</small></div><div><span>User libraries</span><strong>Disabled</strong><small>All server games shown to DadLAN clients</small></div></div></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">02</span><div><p className="eyebrow">Fleet state</p><h2>Twelve Windows machines</h2></div></div><div className={styles.table}>{machines.map(([id, model, state, note]) => <article key={id}><div><strong>{id}</strong><span>{model}</span></div><b>{state}</b><p>{note}</p></article>)}</div></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">03</span><div><p className="eyebrow">Network repair</p><h2>#03 and #07</h2></div></div><div className={styles.copy}><p>Both clients were stuck on “Connecting to server” because Ethernet had placed them on <code>10.176.176.0/24</code> with gateway <code>10.176.176.254</code>. A known-good client was on <code>10.245.173.0/24</code> with gateway <code>10.245.173.254</code>.</p><p>After moving #03 and #07 onto the DadLAN <code>10.245.173.x</code> network, TCP port 1337 and the LANCommander health endpoint became reachable. Their startup wrappers were then repaired so the launcher uses the intended <code>LANCOMMANDER_DATA_DIR</code> rather than creating a first-run profile.</p></div></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">04</span><div><p className="eyebrow">Performance work</p><h2>What actually improved the fleet</h2></div></div><div className={styles.copy}><p>The first performance snapshots were contaminated by management activity. A stuck <code>cmd.exe /c dir /s /b C:\\*.lcx</code> whole-drive scan was consuming a full CPU thread on several machines, and ForgeGrid workers were also active. These were stopped before the clean baseline.</p><p>ForgeGrid now follows an opt-in policy: Fedora coordinator/agentbridge user services are inactive and disabled; Windows ForgeGrid services are Manual, scheduled autostart tasks disabled, Run/RunOnce entries removed, and Startup-folder ForgeGrid shortcuts removed. Normal Start Menu shortcuts remain so ForgeGrid can still be started manually.</p></div><div className={styles.kpis}><div><span>Laptop #02</span><strong>61.6% → 20.9%</strong><small>Chrome/Meet remained open</small></div><div><span>Laptop #04</span><strong>99.9% → 35.8%</strong><small>Large drop after cleanup</small></div><div><span>Laptop #01</span><strong>34.1% → 23.1%</strong><small>SearchIndexer settling</small></div><div><span>Laptop #06</span><strong>54.9% → 50.5%</strong><small>Windows Update still active</small></div></div></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">05</span><div><p className="eyebrow">LCX staging</p><h2>Transfer state</h2></div></div><div className={styles.columns}><div><h3>Confirmed complete on JParrisDesktop</h3><ul>{completedLcx.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Incomplete / queued when transfer stopped</h3><ul>{queuedLcx.map((item) => <li key={item}>{item}</li>)}</ul></div></div><p className={styles.note}>The long Action1 transfer process later lost its API token, so incomplete packages must be resumed and byte-size verified against Fedora before import. Do not import a growing/partial LCX.</p></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">06</span><div><p className="eyebrow">Canary</p><h2>Teeworlds status</h2></div></div><div className={styles.copy}><p>Teeworlds is imported and visible in LANCommander. Laptop #04 was selected for the headless install → verify → uninstall → reinstall path. Laptop #02 was selected for the human-visible launch test because it was physically closest during Avance work.</p><p>The visible launch test did <strong>not</strong> produce a Teeworlds window, so the interactive launch step remains unresolved. LANCommander recognised the game as installed. Do not mark the end-to-end canary complete until a normal user clicks Play and the game window remains open.</p></div></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">07</span><div><p className="eyebrow">Legacy KB</p><h2>kb.dadlan.au diagnosis</h2></div></div><div className={styles.copy}><p><code>kb.dadlan.au</code> resolves to <code>202.27.231.37</code>, TCP/443 is reachable, and its Let&apos;s Encrypt certificate for <code>kb.dadlan.au</code> was valid when tested. The root page, <code>/wiki/Main_Page</code> and <code>/wiki/LAN_Commander</code> all returned the same OpenResty <strong>HTTP 500</strong> response.</p><p>That means the historical KB hostname and HTTPS front end are alive, but the old wiki/application backend is failing site-wide. The current DadLAN forum was independently healthy during the same check.</p></div></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">08</span><div><p className="eyebrow">Optimisation policy</p><h2>Safe defaults</h2></div></div><div className={styles.copy}><p>Keep Defender, Windows Update and system-managed paging intact. Prefer targeted startup cleanup, Windows Search Classic on dedicated game clients, sensible indexing exclusions for game/archive directories, Storage Sense without deleting Downloads, scheduled drive optimisation/TRIM, Game Mode, trusted driver updates and maintenance outside LAN events.</p><p>Avoid folklore tweaks such as disabling Defender, disabling the page file, permanent Windows Update shutdown, HPET/timer registry hacks, mass service removal or destructive “debloat” scripts. Measure first, change the specific bottleneck, then repeat the same baseline.</p></div></section>

    <section className="detail-section"><div className="section-kicker"><span className="section-index">09</span><div><p className="eyebrow">Next gates</p><h2>Do not call rollout finished until</h2></div></div><div className={styles.columns}><div><h3>LANCommander</h3><ul><li>Teeworlds visibly launches from the normal client UI.</li><li>Clean exit, uninstall and reinstall all pass.</li><li>#11 startup/connectivity is verified.</li><li>#10 is either rebuilt x64 or formally excluded.</li></ul></div><div><h3>Fleet</h3><ul><li>#06 completes Windows Update and is re-baselined.</li><li>Incomplete LCX transfers are resumed and byte-verified.</li><li>JParrisDesktop passes a realistic multi-client download/install load test.</li><li>Reboot persistence confirms ForgeGrid stays manual-only and LANCommander configuration survives.</li></ul></div></div></section>

    <footer><span>Operational snapshot — verify live state before acting</span><span>No credentials or secrets are stored on this page</span></footer>
  </main>;
}
