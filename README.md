# DadLAN Control Centre

DadLAN Control Centre is the server-side orchestration dashboard for the DadLAN fleet. It is an observation and navigation layer over the systems that already own each workflow.

The September 2026 rollout expanded the tracked Windows fleet to **12 machines**: Laptop #01–#11 plus **JParrisDesktop**, which now hosts LANCommander Server v2.1.15. AVANCE-WS7 Fedora remains the control-plane workstation used for diagnostics and automation.

## Roles

- **Action1**: fleet administration and automation
- **MeshCentral**: interactive remote control
- **SMB**: mounted Windows filesystem access
- **ForgeGrid**: compute workers and jobs, now manual/on-demand rather than auto-starting
- **Jenkins**: CI and builds (planned)
- **LANCommander**: active games catalogue/deployment service on JParrisDesktop

## September 2026 rollout

The current operational snapshot is visible in the app at `/rollout` and documented in:

- [LANCommander rollout — 14 Sep 2026](docs/LANCOMMANDER-ROLLOUT-2026-09-14.md)
- [Windows fleet optimisation — 14 Sep 2026](docs/FLEET-OPTIMISATION-2026-09-14.md)
- [SSD evidence reconstruction — 25 Sep 2026](docs/SSD-EVIDENCE-2026-09-25.md)
- [SSD inventory chat transcript — 25 Sep 2026](docs/SSD-CHAT-TRANSCRIPT-2026-09-25.md)
- [Fleet hardware / RAM / upgrade chat transcript — 24–25 Sep 2026](docs/FLEET-HARDWARE-RAM-UPGRADES-CHAT-2026-09-24-25.md)
- [DadLAN RAM / SSD / gaming capability chat — 17–25 Sep 2026](docs/DADLAN-RAM-SSD-GAMING-CHAT-2026-09-17-25.md)

Highlights include the v2.1.15 server rollout, #03/#07 subnet repair, ForgeGrid manual-only policy, performance cleanup, LCX staging state, Laptop #10 x64 remediation path, legacy `kb.dadlan.au` HTTP 500 diagnosis, and the still-open Teeworlds visible-launch canary.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The server reads SMB mount metadata and disk statistics from `/mnt/dadlan`, ForgeGrid local state from `/home/josh/dev/6 Laptops/ForgeGrid/forgegrid-data`, and MeshCentral state from its local installation. Optional settings are documented in `.env.example`.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Integration adapters run only on the server and return normalized observations to `FleetStatusService`. A slow or unavailable integration is isolated with timeouts/fallback values; browser code never receives credentials.

## Security

The control features are intended for local/LAN use. Keep `.env` private. V1 has no destructive operations, no arbitrary shell execution, no Windows permission changes, and no Defender/firewall changes.

A public/static deployment may be used to review the rollout documentation and UI, but it does **not** have direct reachability to private DadLAN SMB, MeshCentral, Action1 or LANCommander endpoints unless an explicitly secured bridge is added later. No API credentials or secrets belong in the repository or public deployment.

## Current limitations

Action1 remains an interface-only adapter inside this web app even though external rollout tooling uses the Action1 API. ForgeGrid V1 reads local coordinator state and does not schedule jobs. MeshCentral reports console health and known-device records but delegates remote control to MeshCentral. The file browser, terminal and Jenkins integrations are intentionally not implemented. LANCommander live health is documented and operational externally; a read-only in-app LANCommander adapter remains a future integration.

## Roadmap

1. Add a read-only LANCommander health/catalogue adapter.
2. Verify Action1 API access through a server-side adapter without exposing credentials.
3. Match ForgeGrid worker identities to DadLAN hostnames while preserving manual-only startup policy.
4. Add event/activity and performance-baseline history.
5. Add safe file navigation and delegated actions.
6. Add Jenkins read-only health integration.
