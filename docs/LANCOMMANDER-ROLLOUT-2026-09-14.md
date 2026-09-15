# DadLAN LANCommander rollout — 14 September 2026

This document records the verified state reached during the DadLAN LANCommander v2.1.15 rollout and the follow-up fleet optimisation work. It is a dated operational snapshot, not a substitute for live checks.

## Architecture and roles

- **JParrisDesktop** is the Windows LANCommander server at `http://10.245.173.58:1337`.
- **AVANCE-WS7** is the Fedora control-plane workstation used for Action1 automation, diagnostics and rollout tooling.
- DadLAN Windows fleet is **Laptop #01 through #11 plus JParrisDesktop** (12 Windows machines total).
- LANCommander client install root used during rollout: `C:\Program Files\DadLAN\LANCommander-2.1.15`.
- Per-user data directory used by the DadLAN wrapper: `C:\Users\<username>\AppData\Local\DadLAN-LANCommander`.
- The wrapper must set `LANCOMMANDER_DATA_DIR` before starting `LANCommander.Launcher.exe`; starting the raw EXE from SYSTEM can create a clean first-run profile and prompt for a server address.

## Server state

Verified on 14 September 2026:

- LANCommander Server **v2.1.15** was running on JParrisDesktop.
- `GET http://10.245.173.58:1337/Health` returned **HTTP 200 / Healthy**.
- User Libraries were disabled so DadLAN clients receive the full server catalogue instead of an empty per-user library.
- The server-side browser LCX upload route returned HTTP 403 during one attempt. The reliable import path was **Import → Use Local File** from JParrisDesktop storage.
- The three games visibly imported into the server catalogue were:
  - Armagetron Advanced
  - Bitfighter
  - Teeworlds

## Network repair: Laptop #03 and #07

Both machines were stuck on LANCommander “Connecting to server”. Action1 diagnostics proved a network segmentation problem rather than a LANCommander fault.

| Laptop | Address before fix | Gateway | TCP 1337 | Health |
|---|---|---|---|---|
| #03 | `10.176.176.57` | `10.176.176.254` | False | Timeout |
| #07 | `10.176.176.54` | `10.176.176.254` | False | Timeout |
| #04 known-good | `10.245.173.235` | `10.245.173.254` | True | HTTP 200 |

After #03 and #07 moved onto the DadLAN `10.245.173.x` network they could reach JParrisDesktop on TCP/1337. Their startup wrappers were then repaired because an earlier SYSTEM-context launch of the raw EXE had caused first-run server-address prompts.

The correct LANCommander server address for clients is:

`http://10.245.173.58:1337`

## Machine rollout snapshot

| Machine | Snapshot status | Notes |
|---|---|---|
| #01 | Ready | Connected and showing server games. Performance improved after cleanup. |
| #02 | Ready / Avance workstation | Connected. Chrome, Meet and OneDrive are legitimate work load and must be preserved. |
| #03 | Ready after network repair | Moved from `10.176.176.x` to `10.245.173.x`; sync restored. |
| #04 | Ready / canary client | Connected; used for headless Teeworlds QA. |
| #05 | Ready | Existing 1.0.4 backup preserved; 2.1.15 installed. Later check showed 8 GB RAM with about 4.3 GB free. |
| #06 | Ready with maintenance pending | Connected; elevated CPU traced to Windows Update / Delivery Optimization activity. |
| #07 | Ready after network repair | Moved from `10.176.176.x`; wrapper/startup corrected. |
| #08 | Ready / low-end | AMD E1-2100; diagnostic scripts themselves can distort CPU readings. LANCommander measured about 5% in a clean process pass. |
| #09 | Ready | LANCommander rollout previously verified. |
| #10 | Upgrade required | Core 2 Duo T5870 supports x64 but Windows 10 is 32-bit; ~3.2 GB RAM and 120 GB 5400-RPM Hitachi HDD. No x86 LANCommander v2.1.15 Windows installer. |
| #11 | Startup validation pending | v2.1.15 installed and rebooted; visible interactive startup still needed final proof. |
| JParrisDesktop | Healthy server | LANCommander v2.1.15; health endpoint good. |

## LCX staging state

These files were byte-size matched and confirmed complete on JParrisDesktop under `D:\DadLAN\LANCommander-Data\Uploads`:

- `Armagetron Advanced.lcx`
- `Bitfighter.lcx`
- `Teeworlds.lcx`
- `ZeroK - Total Annihilation - Comunity engine.lcx`

The next transfer batch was much larger. Battlefield 2 had started writing when checked; the following packages were still incomplete or queued:

- `Battlefield 2_v2_mercle.lcx`
- `Battlefield 1942_RTR_SWWWII_DC.lcx`
- `Battlefield_ Bad Company 2-v4-mercle.lcx`
- `Blur v4.lcx`
- `Dirt 3 Complete Edition.lcx`
- `Kids Games via ScummVM V2.lcx`
- `MechWarrior 4_ Mercenaries.lcx`
- `Need for Speed_ Most Wanted - Black Edition-v1-mercle.lcx`
- `Need for Speed_ ProStreet_v1_mercle.lcx`
- `Quake III Arena Modern Engine.lcx`
- `Unreal Tournament 2004_v3_mercle.lcx`

The long-running Action1 transfer later lost its API token. Resume only incomplete files and compare exact byte sizes with the Fedora originals before importing. Never import a file that is still growing.

## Teeworlds canary

Teeworlds was selected as the smallest practical end-to-end canary.

Required pass gates:

1. server catalogue import
2. client sync
3. download
4. install
5. visible interactive launch from the normal client UI
6. clean exit
7. uninstall
8. reinstall

Teeworlds was visible in LANCommander and LANCommander recognised it as installed on Laptop #02. The human-visible launch attempt did **not** produce a Teeworlds window. Therefore the launch gate remains unresolved and the full canary must not be marked complete yet.

A previous idea of renaming Teeworlds audio assets to suppress sound was abandoned; use native game configuration or a per-app mute instead. During Avance calls, do not alter Chrome/Meet/microphone settings simply to test the game.

## Legacy DadLAN KB diagnosis

Historical DadLAN documentation points to `https://kb.dadlan.au/wiki/LAN_Commander`.

Tests from AVANCE-WS7 showed:

- DNS resolved `kb.dadlan.au` to `202.27.231.37`.
- TCP/443 and TLS worked.
- The Let's Encrypt certificate matched `kb.dadlan.au` and was valid during the test.
- `/`, `/wiki/Main_Page`, and `/wiki/LAN_Commander` all returned `HTTP/2 500` from OpenResty.

Conclusion: the hostname and HTTPS front end are alive, but the old wiki/application backend is failing site-wide. This is not a Fedora/DNS/browser problem. The current DadLAN forum independently returned HTTP 200 during the same diagnostic session.

## Completion gates

Do not call the LANCommander rollout finished until:

- Teeworlds visibly launches from the normal LANCommander client workflow.
- clean exit, uninstall and reinstall are proven.
- #11 starts LANCommander normally after reboot/logon and retains server configuration.
- #10 is rebuilt to a supported x64 client or formally excluded from the normal LANCommander fleet.
- remaining LCX transfers are resumed, byte-verified and imported in controlled batches.
- JParrisDesktop passes a realistic multi-client download/install load test.
- reboot persistence confirms ForgeGrid stays manual-only and LANCommander configuration survives.
