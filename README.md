# DadLAN Control Centre

DadLAN Control Centre is the server-side orchestration dashboard for the ten DadLAN computers. It is an observation and navigation layer over the systems that already own each workflow.

## Roles

- **Action1**: fleet administration and automation
- **MeshCentral**: interactive remote control
- **SMB**: mounted Windows filesystem access
- **ForgeGrid**: compute workers and jobs
- **Jenkins**: CI and builds (planned)
- **LANCommander**: games and deployment (planned)

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The server reads SMB mount metadata and disk statistics from `/mnt/dadlan`, ForgeGrid local state from `/home/josh/dev/6 Laptops/ForgeGrid/forgegrid-data`, and MeshCentral state from its local installation. Optional settings are documented in `.env.example`.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). Integration adapters run only on the server and return normalized observations to `FleetStatusService`. A slow or unavailable integration is isolated with timeouts/fallback values; browser code never receives credentials.

## Security

The app is intended for local/LAN use. Do not expose it publicly. Keep `.env` private. V1 has no destructive operations, no arbitrary shell execution, no Windows permission changes, and no Defender/firewall changes.

## Current limitations

Action1 is an interface-only adapter until an official API credential is configured. ForgeGrid V1 reads local coordinator state and does not schedule jobs. MeshCentral reports console health and known-device records but delegates remote control to MeshCentral. The file browser, terminal, Jenkins, and LANCommander integrations are intentionally not implemented.

## Roadmap

1. Verify Action1 API access and add read-only endpoint status.
2. Match ForgeGrid worker identities to DadLAN hostnames.
3. Add event/activity history.
4. Add safe file navigation and delegated actions.
5. Add Jenkins and LANCommander read-only health adapters.
