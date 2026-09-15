# DadLAN Control Centre ↔ JoshMemory

Last updated: 15 September 2026

JoshMemory is the fleet's durable development-continuity layer; DadLAN Control Centre is a view/control surface for machines and distributed work. These roles must remain separate.

## Current continuity architecture

Shared JoshMemory handoffs, durable project facts and accountability references are stored in a private GitHub-backed append-only store (`joshualparris/JoshDashboard4`, `joshmemory-cloud/v1/`). This means the continuity layer remains available even when AVANCE-WS7 or every DadLAN worker is powered off.

## Authority

- GitHub + live checkout: current code truth.
- Live machine/API evidence: current runtime truth.
- JoshMemory: historical context, checkpoints, provenance and references.
- DadLAN/ForgeGrid: coordination/execution state.

A dashboard should never present a remembered handoff as current machine truth without reconciling it against live evidence.

## Control-plane rule

AVANCE-WS7 may remain the local coordinator for ForgeGrid and policy, but it is no longer the storage root for JoshMemory. The control centre can display/use JoshMemory context without becoming the only place that context exists.

## Recovery

Action1 remains an out-of-band Windows bootstrap/recovery channel. It is not the canonical project-state store and should not become the normal JoshMemory transport.

## Future integration

A useful future DadLAN panel would show, per canonical repository:

- latest handoff objective/next action;
- recorded machine/agent;
- recorded branch/HEAD;
- live branch/HEAD when available;
- discrepancy warning;
- current lease/active worker once leases are implemented;
- links to external verification evidence.

Canonical JoshMemory implementation/history: https://github.com/joshualparris/JoshMemory
