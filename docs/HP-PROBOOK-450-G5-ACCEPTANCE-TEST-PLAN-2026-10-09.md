# HP ProBook 450 G5 — DadLAN acceptance test plan (9 October 2026)

**Status: baseline captured; detailed HWiNFO NVMe SMART data obtained; physical, actual CPU-temperature and extended stability tests NOT yet completed.** This document distinguishes confirmed earlier reports from proposed real-world verification. A four-file ZIP test kit was created in the 9 October 2026 ChatGPT conversation: `ProBook450G5-Tests.ps1`, `Manual-Checklist.md`, `Screen-Colour-Test.html` and `README.md`. The user **ran the Baseline mode on the actual ProBook** and uploaded its output; Monitor and Storage have not been evidenced. The first script's Windows event-log collection failed because one provider's message description was malformed. A **v2 corrected ZIP** was generated in ChatGPT with event metadata export and fallback; this revised script **has not yet been tested on the user's laptop**. No remote execution is claimed.

## First returned test files — 9 October 2026, 11:11–11:14 reported local timestamps

User uploaded **four files**: `1.HTM` (HWiNFO v8.54 hardware HTML report), `battery.html` (Windows battery report), `report.txt` (test-kit `-Mode Baseline` result), and `a(1).txt` (Windows System Information export). **The Baseline mode demonstrably ran**. These are reports, not evidence that Monitor, Storage, physical-port or gaming tests ran.

- **CPU turbo demonstrated** in HWiNFO snapshot: i5-8250U operating point approximately **3,391.7 MHz**, versus base 1.6 GHz. Report is a hardware-information snapshot, **not HWiNFO Sensors CSV**. No measured CPU package temperature, max temperature, thermal-throttling flag or game workload.
- **Intel SSDPEKKF256G7H HWiNFO SMART:** reported **98% device health**, **95% spare**, **1,489 power-on hours**, **1,342 power cycles**, **549 unsafe shutdowns**, **0 media errors**, **4.25 TB host writes**, **5.66 TB reads**. HWiNFO SSD temp **22°C**, warning threshold 65°C, critical 80°C, cumulative **13 minutes above warning**, **0 minutes above critical**. User PowerShell baseline logged a **19°C** SSD temperature; don't equate readings from different times and sensors. Historical max reported **75°C**. The 549 unsafe shutdowns are a historical SMART count and do not by themselves prove current crashes or imminent failure. No extended SMART error log or full sustained-storage check.
- **Display identification:** Chi Mei `CMN15DB` panel; 1366×768, approximate HWiNFO-calculated **66.179% sRGB coverage**. Color-gamut estimation is not a physical panel-condition assessment.
- **Memory:** one 8 GB Samsung DDR4-2400 module, **one channel active of two supported**, so matching 8 GB DIMM would likely enable dual-channel if second slot functional.
- **Fingerprint sensor:** DigitalPersona/Synaptics sensor enumerated; actual Windows Hello operation not tested.
- **Battery:** HWiNFO confirms 47,994 mWh design, 40,972 mWh full charge, 14.6% wear, 107 cycles. HWiNFO showed **Charging / On AC** with approx **15,287 mW charge rate** at 79% battery; baseline later indicated 81%. This supports momentary charging but not sustained reliability or unplugged runtime.
- **Baseline event collection error:** `System event query unavailable/no matching events: The description string for parameter reference (%1) could not be found`. **The event log check did NOT complete, and this is not a finding of no errors.** Follow up with a simpler event query selecting TimeCreated, Id, ProviderName and LevelDisplayName without Message, or repair the script; do not erase historical Windows errors.
- **Baseline software:** `smartctl` absent, but HWiNFO supplied substantial SMART fields. Don't require installing smartctl solely to obtain values already provided.

**Acceptance state after uploads:** HWiNFO SMART inventory obtained; thermal-throttling under load, actual game uptime, sustained SSD copy/hash, hands-on screen/input/I/O, camera capture, Bluetooth pairing, Ethernet cabling and connector reliability **remain untested**. Do not mark them passed on the basis of detection or a baseline snapshot.

## Machine baseline (confirmed by user reports)

- HP ProBook 450 G5, Intel Core i5-8250U (4C/8T), Intel UHD 620, 1366×768 screen.
- 8 GB Samsung M471A1K43BB1-CRC DDR4-2400 in one detected module, two sockets enumerated (second not physically inspected).
- Intel SSDPEKKF256G7H 256 GB NVMe, Windows Healthy/OK. PowerShell reports SSD temperature 66°C during BitLocker decryption, then 62°C, 56°C and 30°C on later checks; historical max 75°C, wear counter 0. Full NVMe SMART error/power-on readings are still missing.
- HP battery 40,972/47,994 mWh ≈85.4% design capacity, 107 reported cycles; actual battery runtime untested.
- Windows 10 IoT Enterprise LTSC build 19044 reports activated. C: fully decrypted, protection off, no key protectors.
- Bent charging pin previously corrected; power-on and Administrator sign-in restored. Audio playback user-reported working.
- Intel Wireless-AC 8265 linked at 780 Mbps (link speed, not internet speed); HP HD Camera and Intel Bluetooth detected as present and OK; Realtek Ethernet seen disconnected.
- Earlier hardware survey had an ACPI\HPQ6007 missing driver; later present-only device-error output returned no entries. Reconcile only if current fault reappears.
- Datto RMM user-uninstalled; follow-up service query returned no matching Datto/VNC services. Old RMM/UltraVNC crash events were historical; full remnants audit unperformed.

## Gate 0 — power and safety (must precede extended load)

- [ ] Inspect the previously bent charger connection: securely seated, no looseness, crackling, arcing, hot plug or electrical smell **without bending/wiggling the connector**.
- [ ] Inspect battery/chassis for swelling or damage; ventilated hard surface; back up any important files.
- [ ] Stop testing for charging instability, smoke/odour, swelling, abnormal grinding sounds or unexpected loss of power. Do not stress-test a suspect power connector.

## Test 1 — CPU temperatures and real DadLAN gaming throttling

- [ ] Download **HWiNFO from official https://www.hwinfo.com/download/**, start Sensors-only, and enable a **CSV sensor log**.
- [ ] Log CPU Package temperature, Core Thermal Throttling (where reported), core effective clocks, package power, SSD temperature and relevant GPU readings; record idle baseline.
- [ ] Run a normal DadLAN game (e.g. Alien Swarm, Quake or Doom) **45 minutes** with HWiNFO running and the bundled script in `-Mode Monitor -Minutes 45`.
- [ ] Record game/title/settings, min/max and sustained temperatures, flags, cooling fan behaviour, stutters, crashes and changes in clock speeds.
- [ ] Sustained temperatures near ~95°C or repeat thermal throttling require investigation; transient spikes are not a diagnosis. Stop early if physical signs of distress arise.
- [ ] Do not mistake Windows WMI `CurrentClockSpeed` or `MaxClockSpeed` for reliable turbo/thermal-throttling data. **Actual CPU temperature is not available from the basic PowerShell script.**

## Test 2 — detailed NVMe SMART and controlled I/O

- [x] Basic NVMe SMART health/counters obtained in HWiNFO hardware report (98% health, zero media errors, 549 unsafe shutdowns; see returned files above). **Optional** smartmontools can corroborate detail and fetch error-log entries from https://github.com/smartmontools/smartmontools/releases .
- [ ] **Optional independent corroboration:** Run `smartctl --scan-open` and identify the **Intel SSDPEKKF256G7H** exact device path; then run `smartctl -x ACTUAL_PATH_FROM_SCAN`. Review NVMe critical warning, media/data integrity errors, error log entries, available spare, percentage used, temperature, power-on hours and unsafe shutdowns (if reported).
- [ ] After power connector safety is established, run the local supplied script **`-Mode Storage -SizeMB 1024`**. Explicitly writes 1 GiB + copies 1 GiB of disposable generated data in a unique test folder, hashes original/copy with SHA-256, then removes only its two temporary data files. **This mode is not read-only.**
- [ ] Verify hashes match, record times/temperature before and after. This is a bounded representative copy/hash test, **not** a multi-hour endurance/stress test.
- [ ] Never use NVMe secure erase, diskpart clean, format, BIOS flashing or firmware/sanitize commands in this test.

## Test 3 — screen, chassis, keyboard, touchpad, microphone, audio and ports

- [ ] Open local offline `Screen-Colour-Test.html`, press F11 and cycle white, black, red, green, blue and grey. Check stuck pixels, brightness steps, uneven backlight, flicker, lines and screen hinges.
- [ ] Inspect chassis, lid, hinges, missing screws and vents. Never force the hinge or work on internals while powered.
- [ ] In Notepad, exercise all keys: alphanumeric, arrows, function keys and modifiers. Test touchpad tap/physical click, scrolling and right-click.
- [ ] Verify stereo speaker sound. Plug in known-good headphones; play audio; test the built-in mic with Windows input meter or a locally recorded clip.
- [ ] Test **each** fitted USB-A/USB-C port individually with a known-good device and file reading. Connect known-good external display to HDMI. Test card reader with an appropriate working card if fitted.
- [ ] Optional HP firmware diagnostics: power on, press Esc repeatedly, then F2 for HP PC Hardware Diagnostics UEFI; select component tests where available. Official reference: https://support.hp.com/au-en/document/ish_2854458-2733239-16 .

## Test 4 — actual camera, Bluetooth and wired network function

- [ ] Open camera in Windows Camera or trusted local app; preview and record 10 seconds (the device being detected alone is not an operational test).
- [ ] Pair a Bluetooth headset/phone/mouse and actually use it for several minutes.
- [ ] Connect a known-good Ethernet cable and switch/router, check `Get-NetAdapter -Name Ethernet | Format-List Name,Status,LinkSpeed`, confirm DHCP/address and a successful local transfer. Wi-Fi on the same PC can obscure which route is used.
- [ ] Test Wi-Fi reconnect and 15-minute local file transfer/browsing stability; 780 Mbps reported **link speed** is not throughput.
- [ ] Optional: `Get-PnpDevice -PresentOnly | Where-Object Status -ne 'OK'` to check currently enumerated faults.

## Test 5 — 45–60 minute gaming stability and error log correlation

- [ ] Start HWiNFO CSV logging, start script `-Mode Monitor -Minutes 45`, launch representative DadLAN game; log the title, settings and any freezes/graphics reset, crackles or disconnects.
- [ ] Review local script `gaming-samples.csv`, `system-errors.csv` and HWiNFO CSV. Correlate Windows Event Log time with symptoms. Look for WHEA, Disk/stornvme, Display/graphics reset, unexpected Kernel-Power 41 and other relevant failures, without treating every DCOM warning as critical.
- [ ] Repeat a different target game if the first session succeeds and normal DadLAN usage merits more coverage.
- [ ] Report pass/fail, exact game and duration. **Do not claim full reliability after one short session.**

## Collected output and privacy

The optional PowerShell test kit generated in ChatGPT has three explicitly selected modes:
- `-Mode Baseline`: read-only inventory/current-status snapshot.
- `-Mode Monitor -Minutes 45`: read-only logging of CPU WMI utilisation/current clock, SSD temperature and battery level at intervals, followed by Windows system error export.
- `-Mode Storage -SizeMB 1024`: explicit local write/copy/hash test, then cleanup of only temporary files created by the script.

All outputs stay in the user’s **Desktop\DadLAN-ProBook450G5-Tests** dated subfolders; nothing automatically uploads to GitHub or any cloud service. Sensor temperature/throttling metrics require separately logged HWiNFO data. Review local logs for names, file paths, serials and other private values before sharing with ChatGPT. **Never upload unreviewed diagnostic logs to this public repository.** Script is written for Windows PowerShell 5.1. **Version 1 Baseline executed on the user's Windows laptop** and identified an event-log export issue; **version 2 event-log collector is a locally produced untested correction**. Run carefully, report errors and do not infer clean event logs from an export failure.


## Partial ZIP return — 9 October 2026, 11:33–11:34 (computer-local reported time)

The user shared a ZIP named `Fix flashing charger light.zip` containing **both Baseline snapshots** (11:14 and 11:33), a **Monitor folder containing only two CSV rows**, earlier HWiNFO/battery HTML, older Windows summary and unrelated desktop shortcut/URL items. Shortcuts were **not executed**. No 15-minute completion or actual game-running evidence is included.

- Second Baseline completed at **11:33:59**; at 11:33:54 CPU WMI load **18%**, SSD reported **17°C**, battery **91%**. All core hardware IDs still consistent with prior record.
- **The 11:33 Baseline still reports the original event error** `System event query unavailable/no matching events: The description string for parameter reference (%1) could not be found`. This exact wording belongs to the **v1** script in the originally provided ZIP; v2's revised implementation would use `Event collection FAILED`, `Event export FAILED`, or `System critical/error event records`/fallback messages. **Most likely the script run at C:\\DadLAN-ProBook450G5-Test-Kit\\ProBook450G5-Tests.ps1 was the earlier version despite the user having received v2**. We cannot confirm installation without inspecting that actual file on the laptop. Do not claim the v2 fix passed or that event logs were clean.
- Monitor started **11:34:05** with requested 15-minute runtime; ZIP includes only records at **11:34:05** (CPU 2%; SSD 17°C; battery 91%) and **11:34:22** (CPU 25%; SSD 18°C; battery 91%). Monitor `report.txt` contains only header/start instructions, **no completion**. The ZIP may have been made while monitoring was still in progress; do not infer program failure or completion. No HWiNFO Sensors CSV/logged CPU thermals in ZIP.
- Next evidence required: full `Monitor-20261009-113405\gaming-samples.csv` and final `report.txt` after monitor completes, plus HWiNFO **Sensors-only logging CSV** captured while actually playing a game. If testing v2 event collector, replace on-disk script and verify it contains the new `# Never access .Message here` comment before re-running baseline.

## Acceptance record (not yet passed)

| Test area | Status |
| --- | --- |
| Repaired connector safety under repeated use | NOT TESTED |
| CPU temperature / thermal throttling in gaming | NOT TESTED |
| NVMe SMART health, endurance and media-error summary | **REPORTED by HWiNFO** (98% health, 0 media errors, 549 unsafe shutdowns); extended error log not checked |
| SSD controlled copy/hash workload | NOT TESTED |
| Screen, keyboard, touchpad, hinges, mic, headphones and ports | NOT TESTED |
| Actual webcam, Bluetooth and Ethernet use | NOT TESTED |
| 45–60 minute gaming stability and sensor logs | NOT TESTED |

Update statuses only from new user-supplied results, not just because a script or checklist has been provided.
