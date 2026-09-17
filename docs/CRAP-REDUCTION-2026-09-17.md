# CRAP reduction — 17 September 2026

## Goal

Bring DadlanControlCentre below a repository headline CRAP score of 30 and keep it there in CI.

## Before

The fleet-wide crap4all audit recorded DadlanControlCentre at **42.00**. The worst function was `readMeshObservation` in `src/lib/integrations/meshcentral.ts` with cyclomatic complexity **6** and no supported coverage artifact, so crap4all conservatively used 0% coverage:

`CRAP = 6² × (1 - 0)³ + 6 = 42`

Because an uncovered CC5 function scores exactly 30, the work targeted both the CC6 hotspot and nearby branch-heavy CC5 candidates rather than stopping after one extraction.

## Files changed

- `src/lib/integrations/meshcentral.ts`
- `src/lib/integrations/meshcentral.test.ts` (new)
- `src/lib/fleet.ts`
- `src/lib/integrations/forgegrid.ts`
- `src/lib/integrations/smb.ts`
- `src/app/page.tsx`
- `.github/workflows/ci.yml`
- `docs/CRAP-REDUCTION-2026-09-17.md` (new)

## What changed

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

## After

GitHub Actions run **35217880371** on commit `aa5f85a60e1023c755d2f7b1e57dbc557dca3bd7` verified:

- TypeScript typecheck: **passed**
- Vitest: **8/8 tests passed** across 4 test files
- Next.js 16.3.1 production build: **passed**
- CRAP gate: **passed**
- Repository maximum CRAP: **20.00**
- Maximum cyclomatic complexity: **4**
- Worst functions at the new ceiling: `readForgeGridHealth` and `derived`

With unavailable coverage still conservatively treated as 0%, the new ceiling is:

`CRAP = 4² × (1 - 0)³ + 4 = 20`

That is a reduction from **42 → 20**, or about **52.4%**.

## Regression protection

The CRAP check is now part of normal `main` and pull-request CI. Any future function that reaches CRAP **30 or higher** causes the CI job to fail, preventing this repository from silently drifting back above the requested threshold.
