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


## Completed 15-minute PowerShell monitor — 9 October 2026, 11:34–11:50 (computer local time)

The user subsequently supplied **complete** `gaming-samples.csv` and `report(1).txt` from `Monitor-20261009-113405`, superseding the earlier partial two-row ZIP snapshot.

- **61 samples** spanning **969.4 seconds (16 min 9 sec)** from 11:34:05 to 11:50:14 (about 16.16 seconds/sample); final script reported **Finished: 11:50:15**. The monitor **completed its scheduled run**.
- CPU WMI utilisation: **60 valid points and one blank**. Average **4.37%**, median **3.5%**, maximum **25%**. **55 of 60 valid CPU readings were ≤10%**, so the run mostly captured *very light CPU load*, not evidence of gaming stress. CPU WMI clock field stayed 1600 MHz but **is not a reliable measure of effective clocks or thermal throttling**.
- SSD Windows sensor: range **15–47°C**; first sample 17°C, final 45°C, maximum 47°C at several times. Counter `Wear=0` throughout. No problematic SSD temperature observed in these readings; **not a sustained I/O benchmark**.
- Reported battery percentage increased **91% → 95%**. Good evidence that it continued charging during the session, **not** definitive proof the previously damaged charger pin is reliable over time.
- Monitor's Windows event-log collection again reported `System event query unavailable/no matching events: The description string for parameter reference (%1) could not be found`. **Event log assessment incomplete, not clean**. The laptop may still be running the old test script; version has not been verified on that system.
- No HWiNFO **Sensors-only CSV** or in-game FPS/title/use confirmation was supplied. **Actual CPU package temperature, thermal throttling and long-session game stability remain untested.** The absence of visible failures during a light-activity monitoring window is not a gaming stability pass.


**User clarification (9 October 2026):** The laptop was **sitting idle at work** during the entire monitoring session; **no games were played**. Classify this as a **completed 15-minute idle/background-use observation only**, not a gaming workload. Actual in-game performance, CPU temperatures, thermal throttling and 45–60 minute gaming stability remain **NOT TESTED**. Defer gaming test until convenient; avoid presuming user can play during work hours.


## PowerShell peripheral enumeration — 9 October 2026 at 12:15:48 (computer-local time)

User uploaded `ProBook-Peripheral-Tests.txt`, produced by the offered **read-only peripheral inventory script**. It is **device enumeration, not an end-to-end functional test**.

- **HP HD Camera** enumerated `OK`; real video capture and recording untested.
- **Intel(R) Wireless Bluetooth(R)** enumerated `OK`; actual pairing, audio/data transfer untested.
- **Intel USB 3.0 eXtensible Host Controller**, `USB Composite Device`, and `USB Root Hub (USB 3.0)` all enumerated `OK`; **no USB storage listed/connected** in the sample. Each physical USB socket still needs direct testing.
- **Internal Microphone (Conexant ISST Audio)** and **Speakers (Conexant ISST Audio)** separately enumerate `OK`; Conexant ISST Audio and Intel Display Audio hardware each `OK`. User previously confirmed basic speaker playback; mic recording, headphone socket and reliable operation remain untested.
- Keyboard returns two `Enhanced (101- or 102-key)` device entries, both `OK`; **not evidence of a second physical keyboard or that all keys were tested**.
- Pointing devices listed as `Synaptics HID ClickPad`, `PS/2 Compatible Mouse`, `USB Input Device`, all `OK`; tap, click, scroll, gestures not specifically tested.
- Intel UHD Graphics 620 driver **31.0.101.2140**, currently **1366×768**; screen pixel/brightness/hinge condition not checked.
- Wi-Fi Intel Wireless-AC 8265 **Up, 780 Mbps reported link speed**; Ethernet Realtek PCIe GbE **Disconnected**, so wired connection not tested. Wi-Fi link speed is not measured throughput.
- `Get-PnpDevice -PresentOnly | Where Status -ne 'OK'` produced **no rows**. This supports **no currently enumerated PnP status errors**, not proof of fault-free operation or that historic/stale device events have been cleared.

**Result:** Peripheral detection inventory captured successfully; **zero physical port tests, camera recordings, mic recordings, Bluetooth pairings or Ethernet-cable validations have been demonstrated by this upload.** Keep manual/functional checks open.


## Internal microphone functional check — 9 October 2026

After opening Windows Sound settings with `Start-Process "ms-settings:sound"`, the user explicitly confirmed **the input-level meter moves while speaking**. Mark **internal Conexant ISST microphone live input: PASS (user-observed)**. This demonstrates incoming audio signal, beyond mere PnP detection. **A recorded/playback sample, voice intelligibility and microphone quality are not yet verified.** Headphone jack remains untested.


## Webcam live-preview check — 9 October 2026

Windows IoT LTSC **Camera app was not installed**; this was an absent optional application, **not** a camera-hardware failure. User ran a locally created browser page calling `navigator.mediaDevices.getUserMedia({video:true,audio:false})`, permitted access, and **explicitly confirmed a live picture appears**. **HP HD Camera browser webcam live preview PASS (user-observed).** This proves current webcam video capture/preview is operational with this browser. **Saving a recording, video/audio synchronisation, image quality and long-duration camera stability have not been tested.** The test page was local and not intended to upload footage.


## Bluetooth pairing attempt with Android — 9 October 2026

User opened Bluetooth settings and said pairing **seemed to work on the Windows side**, but the **Android phone reported "Couldn't connect"**. This is **PARTIAL / INCONCLUSIVE** for functional Bluetooth: a phone may pair with a PC yet not establish an always-connected Bluetooth service, so the phone's message does not alone prove faulty hardware. **No successful Bluetooth data transfer, audio output, or connected peripheral demonstrated yet**. Recommended next check: launch `fsquirt.exe` on Windows, choose **Receive files**, then send a small photo from Android via Bluetooth; record actual successful receipt or exact error. Do **not** mark Bluetooth end-to-end PASS yet.


## Bluetooth Android-to-ProBook transfer PASS — 9 October 2026

Following the earlier Android "Couldn't connect" message, user ran the advised Windows `fsquirt.exe` **Receive files** Bluetooth workflow, sent a photo from Android and explicitly reported **"yep that worked"**. **Bluetooth file transfer confirmed by user — PASS for Android to ProBook file reception**. This resolves the earlier incomplete functional transfer check. No separate Bluetooth headset audio, mouse peripheral, or laptop-to-phone transfer was shown; don't mark those distinct workflows as tested.

User also supplied a photo showing Windows Task Manager at **CPU 5% / 3.37 GHz**, **RAM 2.5/7.9 GB (32%)**, **SSD Disk 0 at 1%**, **GPU 0 at 0%**. These are isolated low-load readings, not a CPU temperature or sustained gaming stress test.


## Physical USB flash-drive check — 9 October 2026

User replied **"yep its fine"** to request to test USB flash-drive detection and access in **each USB port**. PowerShell `Get-CimInstance Win32_DiskDrive | Where-Object InterfaceType -eq 'USB'` enumerated:
- Model: **Lexar USB Flash Drive USB Device**
- Status: **OK**
- Size: **4,005,711,360 bytes (~4 GB)**

**Result: PASS (user-reported USB ports work; USB mass-storage enumeration corroborated).** The user indicated the port checks worked; the supplied PowerShell snapshot independently proves a connected Lexar device was enumerated as OK, but it does **not individually enumerate every port and does not establish file read/write or transfer throughput for each socket**. If a port-specific problem arises later, record exact affected physical socket.

**Do not confuse this ~4 GB Lexar flash drive with previously catalogued ~16 GB Lexar Ventoy USB #8**. Neither drive's serial has been verified from this output. USB-C/HDMI/card reader functions remain untested unless specifically user-confirmed.


## Keyboard and touchpad function confirmed — 9 October 2026

User opened Notepad as directed and replied **"yes they work fine"** to checking typing, arrow keys, Backspace, Enter and Shift, plus touchpad clicking, right-clicking and scrolling. **PASS (user-observed) for basic keyboard typing/navigation and touchpad clicks/scrolling.** This is a functional check beyond PnP enumeration. It does **not** prove every individual key, Fn combinations, all multi-touch gestures or long-term reliability has been comprehensively tested.

## Acceptance record (not yet passed)

| Test area | Status |
| --- | --- |
| Repaired connector safety under repeated use | NOT TESTED |
| **15-minute idle baseline** (no game running) | **COMPLETED** — 61 samples, normal low CPU load; Windows event export failed |
| CPU temperature / thermal throttling in gaming | NOT TESTED |
| NVMe SMART health, endurance and media-error summary | **REPORTED by HWiNFO** (98% health, 0 media errors, 549 unsafe shutdowns); extended error log not checked |
| SSD controlled copy/hash workload | NOT TESTED |
| Peripheral PnP enumeration and driver status | **COMPLETED** — devices reported OK, no present-only status errors; not physical function |
| Internal microphone live input meter | **PASS — user confirmed it responds while speaking**; recording quality untested |
| USB flash drive / physical USB sockets | **PASS — user reports ports work**; ~4 GB Lexar USB drive enumerated OK; individual read/write throughput unverified |
| Keyboard and touchpad basic functions | **PASS — user confirmed typing, navigation, clicks and scrolling work** |
| Screen, hinges, headphone jack, HDMI and other ports | PHYSICAL FUNCTION NOT TESTED |
| Webcam browser live preview | **PASS — visible live image confirmed by user**; recording not tested |
| Bluetooth receive-file transfer from Android | **PASS — user confirmed receiving a photo with fsquirt.exe**; other Bluetooth uses not tested |
| Actual Ethernet cable/link | NOT TESTED |
| 45–60 minute gaming stability and sensor logs | NOT TESTED |

Update statuses only from new user-supplied results, not just because a script or checklist has been provided.
