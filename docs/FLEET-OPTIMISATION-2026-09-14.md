# DadLAN Windows fleet optimisation — 14 September 2026

## Goal

Make every DadLAN Windows machine as responsive and reliable as practical without destructive “debloat” changes, without disabling security, and without breaking legitimate workloads such as Avance Chrome/Google Meet use on Laptop #02.

## What the diagnostics discovered

The first performance snapshots overstated several machines' idle load because the diagnostic work itself was heavy.

A stuck command was discovered on multiple clients:

`cmd.exe /c "dir /s /b C:\\*.lcx 2>nul"`

That whole-drive recursive LCX search could consume a full CPU thread and generate extensive filesystem activity. It was stopped and should not be used again. Search known DadLAN directories rather than scanning the entire system drive.

ForgeGrid was also starting automatically and consuming resources during normal DadLAN/Avance use. The agreed policy is now **manual/on-demand only**.

## ForgeGrid autostart policy

### AVANCE-WS7 Fedora

`forgegrid-agentbridge.service` and `forgegrid-coordinator.service` were made **inactive and disabled** as user systemd units. They remain installed and can be started manually.

### Windows DadLAN machines

Policy applied during the cleanup pass:

- ForgeGrid Windows services retained but changed to **Manual** startup.
- ForgeGrid scheduled autostart tasks disabled.
- ForgeGrid HKLM/HKCU Run and RunOnce entries removed where present.
- ForgeGrid shortcuts removed only from Startup folders.
- normal Start Menu/Desktop shortcuts preserved for manual launch.
- active ForgeGrid workers stopped before clean performance baselines.

Do not revert to always-on ForgeGrid. Interactive Avance work and LAN gaming have priority over opportunistic distributed compute.

## Clean baseline findings

The most useful before/after set after removing ForgeGrid and the runaway LCX scan was:

| Machine | Before | After | Interpretation |
|---|---:|---:|---|
| #02 | 61.6% CPU | 20.9% CPU | Major improvement while Chrome/Meet remained open. |
| #04 | 99.9% CPU | 35.8% CPU | Large reduction; further UI/game-specific testing still useful. |
| #01 | 34.1% CPU | 23.1% CPU | Improved; SearchIndexer was still settling. |
| #06 | 54.9% CPU | 50.5% CPU | Small change because Windows Update remained the dominant workload. |

Laptop #05's normal formatted WMI performance counters were unreliable, but alternate telemetry showed 0% instantaneous processor load with about 4.3 GB free of 8 GB RAM. That is evidence of a healthy snapshot, not proof that every future workload will be idle.

Laptop #08 initially appeared very busy, but a clean process pass showed the diagnostic PowerShell process itself dominating CPU. `LANCommander.Launcher` was only around 5% during that sample. Because its AMD E1-2100 is extremely weak, use lightweight monitoring on this machine and avoid interpreting management-script overhead as normal workload.

## Machine-specific guidance

### Laptop #01

- Keep ForgeGrid manual-only.
- SearchIndexer was observed using significant CPU during the contaminated test. Let indexing settle, then only exclude game/archive directories if they do not need content indexing.
- Do not assume the LCX library is the indexing cause unless the indexed path is confirmed.

### Laptop #02 — Avance workstation

- Chrome, Google Meet and OneDrive are legitimate workloads and must remain available.
- Do not optimise this machine by closing Josh's work apps.
- ForgeGrid must yield completely unless manually requested.
- Evaluate RAM pressure under the real Avance workload rather than an artificial empty desktop.

### Laptop #04

- Keep ForgeGrid manual-only.
- Earlier high load was badly contaminated by the runaway scan.
- Continue to treat it as a canary client for LANCommander install/uninstall testing.

### Laptop #05

- Use alternate CIM/raw counter methods where formatted WMI counters are broken.
- Current snapshot looked healthy; do not “repair” WMI simply to obtain pretty monitoring if the OS is otherwise stable.

### Laptop #06

- `wuauserv` and `DoSvc` were active during the high CPU period.
- Let Windows Update/Delivery Optimization complete and reboot if required.
- Re-run the same lightweight baseline afterward before making any additional change.
- Do not permanently disable Windows Update.

### Laptop #08

- AMD E1-2100 APU is the main structural limitation.
- Keep diagnostics light.
- LANCommander itself did not appear to be the dominant CPU consumer in the clean pass.
- Use this client for lighter games where practical.

### Laptop #10

Hardware discovery showed:

- Intel Core 2 Duo T5870 2.00 GHz
- CPU `DataWidth = 64` / x64 capable
- Windows 10 Home 32-bit
- about 3.2 GB RAM
- Hitachi HTS543212L9A300 120 GB mechanical HDD

LANCommander v2.1.15 does not ship a Windows x86 installer, so the current OS is the blocker. Before reinstalling anything, identify the exact laptop model, RAM slot layout/ceiling and whether a standard 2.5-inch SATA SSD replacement is practical. An SSD and RAM increase should precede a 64-bit OS rebuild if the hardware supports them.

## Safe Windows optimisation policy

Use evidence-based changes only:

- keep ForgeGrid manual-only
- preserve Defender
- preserve Windows Update; schedule heavy maintenance outside DadLAN sessions
- keep pagefile system-managed unless measured workload proves a reason to change it
- use Windows Search Classic on dedicated game clients where appropriate
- exclude large game/archive directories from content indexing only when search value is negligible
- keep Storage Sense conservative and never automatically delete Downloads without explicit approval
- verify scheduled drive optimisation; allow Windows to TRIM SSDs and optimise HDDs normally
- keep useful free space on the OS drive
- enable Game Mode
- on Windows 11, test supported Optimizations for windowed games
- audit trusted chipset/GPU/network/storage driver updates
- test Balanced versus Best Performance while plugged in; keep the faster mode only if there is a real benefit without thermal throttling
- on very weak clients, test reduced visual effects rather than stripping Windows services
- change NIC power management only where disconnect/reconnect evidence justifies it

Avoid:

- disabling Defender
- disabling the pagefile
- permanent Windows Update shutdown
- HPET/timer registry folklore
- broad registry “gaming tweak” packs
- destructive debloat scripts
- mass service removal
- unbounded whole-drive scans during fleet diagnostics

## Validation still worth doing

For each machine after changes settle:

1. 60-second lightweight CPU average/median/peak
2. RAM commit and available MB
3. paging/hard-fault activity
4. disk active time and latency
5. top CPU process during the same interval
6. LANCommander health request latency
7. LANCommander sync duration
8. moderate time-limited CPU load to detect power/thermal throttling
9. reboot persistence: Action1 returns, ForgeGrid stays off, LANCommander settings persist

For JParrisDesktop, add a realistic multi-client test: several working clients simultaneously sync/download/install a small game while watching server CPU, RAM, D: latency/throughput, Ethernet throughput and `/Health` response time.
