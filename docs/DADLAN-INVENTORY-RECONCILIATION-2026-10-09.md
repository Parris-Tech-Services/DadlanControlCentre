# DadLAN hardware inventory reconciliation — 9 October 2026

## What was wrong

`docs/data/laptop-inventory-2026-08-03.csv` originally held only eight photographed devices from 3 August. It was **not** an exhaustive DadLAN inventory. Updating its ProBook row on 9 October without merging the wider 22-machine September inventory left most of Josh's machines absent.

The CSV has been reconciled **at the existing path** for backward compatibility. Its filename still contains the date of the original August snapshot, but **its content is a broader inventory reconciled on 9 October 2026**.

## Reconciliation totals

- **27 distinct inventory rows**: **20 laptops**, **7 desktops/all-in-ones**, based on available records; not a fresh physical stocktake.
- The **September 24–25 fleet inventory of 22** = **15 laptops + 7 desktops/all-in-ones**.
- The **August photo inventory of 8** adds **5 otherwise unlisted laptops**: two distinct Acer Aspire 3 N20C5 units, ASUS A541U, HP ProBook 450 G5 and ASUS VivoBook Go 15.
- Two September laptops also appear in August (Toshiba L50-A and ThinkPad T61) and were merged instead of double-counted.
- The August Lenovo C260 (machine type 10160, 4GB RAM, 500GB HDD) **may be one of the two Lenovo C260 units** from September. The physical-to-inventory identity has not been established: 27 rows is a reconciled working inventory, **not a certified distinct-device count**. If this 10160 is a third physical C260, create a separately identified record after verification.
- **12 enrolments** in `src/lib/machines.ts`: Laptop #01–#11 and JParrisDesktop. The remaining rows are broader photographed / repair / historic inventory, *not automatically active network clients*.

## Sources actually consulted

1. [September fleet hardware transcript](FLEET-HARDWARE-RAM-UPGRADES-CHAT-2026-09-24-25.md) — 22 devices, CPU, RAM, graphics and storage updates (some historical/reported, not scans).
2. [August photographed laptop inventory](LAPTOP-INVENTORY-CONVERSATION-2026-08-03.md) — eight devices, asset labels, partial specifications.
3. [Machine IDs in source code](../src/lib/machines.ts) — active 11 numbered laptops plus the desktop.
4. [SSD evidence reconstruction](SSD-EVIDENCE-2026-09-25.md) — verified drive models and September replacements, with ambiguous cases explicitly documented.
5. [September RAM/SSD/gaming history](DADLAN-RAM-SSD-GAMING-CHAT-2026-09-17-25.md) — correction of HP ProBook #11 RAM to 8GB and fleet numbering.
6. [L50-A/T61 hardware triage](HARDWARE-TRIAGE-L50A-T61-CHAT-2026-09-19-25.md) — observed ThinkPad T61 CPU/RAM and L50-A recovery.
7. [9 October HP ProBook 450 G5 note](HP-PROBOOK-450-G5-2026-10-09.md) — photo-confirmed hardware and repaired charging fault.

## Evidence/confidence rules

- **Benchmarks/HWiNFO/SMART/photos of running hardware** take precedence over factory specifications, model-family inference and suggestions.
- A **reported or later-discussed upgrade** is labelled separately from a confirmed model-level SSD identity. When an SSD appears installed in August but a same-model drive appears loose in September, **do not assert it remains installed** without a later check.
- **Unknown** means genuinely not confirmed. Do not extrapolate SSD capacities from generic models.
- **Enrolled DadLAN fleet** records are not equivalent to all owned, photographed, loaned, repair or recycling assets.
- The inventory is **a historical working reconstruction through 9 October**, not real-time status from Action1, SMB or physical stocktake.
- The **older December/January friend-owned ASUS F550L** and a separately discussed **HP OmniBook** are not automatically counted as Josh-owned DadLAN hardware without ownership evidence.

## Outstanding reconciliation priorities

1. Identify which Lenovo C260 is the photographed model 10160 (or establish it as a third separate device).
2. Verify the present SSD identity on HP ProBook 4230s because the same 860 EVO model appeared among later loose stock.
3. Physically verify RAM, storage and GPU for the Acer and ASUS refurbishment laptops; avoid treating their factory family specs as current hardware.
4. Confirm the HP ProBook 450 G5 internal SSD capacity, battery health and whether it joins the active fleet (its DadLAN ID remains empty).
5. Cross-check with a current Action1/SMB fleet export and physically present devices before calling the inventory exhaustive.

**Do not silently remove a row or fabricate device identifiers when updating the catalogue.**
