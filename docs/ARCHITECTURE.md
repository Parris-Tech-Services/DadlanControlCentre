# Architecture

```text
SMB mount metadata ───────┐
ForgeGrid local/API state ─┤
MeshCentral health + DB ───┼─> FleetStatusService ─> Next API / server UI
Action1 adapter skeleton ──┘
```

The machine registry is a static domain boundary containing DadLAN number, hostname, model, and mount path. It never uses an IP address as identity.

Each adapter is server-only and returns an observation with a state, label, detail, and observation time. SMB distinguishes a real CIFS mount from an empty directory and never recursively scans a Windows drive. Storage comes from Linux `statfs`. ForgeGrid reads its existing state model without altering scheduling. MeshCentral uses the verified local HTTPS console and NDJSON database; no custom remote desktop is implemented.

`getFleetSnapshot()` runs independent observations concurrently and applies fallbacks so one timeout cannot block the dashboard. React pages consume the aggregate snapshot rather than polling integrations from individual cards.
