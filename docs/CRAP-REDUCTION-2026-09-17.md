# CRAP reduction — 17 September 2026

## Goal

Bring DadlanControlCentre below a repository headline CRAP score of 30 and keep it there in CI.

## Before

The fleet-wide crap4all audit recorded DadlanControlCentre at **42.00**. The worst function was `readMeshObservation` in `src/lib/integrations/meshcentral.ts` with cyclomatic complexity **6** and no supported coverage artifact, so crap4all conservatively used 0% coverage:

`CRAP = 6² × (1 - 0)³ + 6 = 42`

Because an uncovered CC5 function scores exactly 30, the work targeted both the CC6 hotspot and nearby branch-heavy CC5 candidates rather than stopping after one extraction.

## Changes

1. Split MeshCentral device lookup and observation construction into small pure helpers. `readMeshObservation` now delegates classification instead of containing all branches itself.
2. Added deterministic unit tests for reachable/unreachable, enrolled/not-enrolled and `rname` matching MeshCentral cases.
3. Extracted the combined SMB/MeshCentral unknown-state predicate from fleet status derivation.
4. Split ForgeGrid worker matching and worker-state rendering into focused helpers.
5. Split SMB mount validation and read-error rendering into focused helpers.
6. Reworked byte formatting so it no longer uses a branch-heavy loop/conditional expression in one function.
7. Extended GitHub Actions CI with a CRAP gate using Lizard and the canonical 0%-coverage form of the CRAP equation. The job fails if any scanned function reaches **30 or higher**.
8. Kept the existing typecheck, test and production-build checks. A green CI tick therefore requires typecheck + tests + build + CRAP < 30.

## Behaviour preserved

The changes are refactors rather than feature changes. MeshCentral still reports the same externally visible states and details for known devices, unknown devices and console outages. ForgeGrid, SMB and fleet-derived reachability retain their existing state rules.

## Verification

The final measured CRAP score and CI run are recorded after the first post-refactor CI execution. The permanent CRAP gate makes the threshold a regression check rather than a one-off audit.
