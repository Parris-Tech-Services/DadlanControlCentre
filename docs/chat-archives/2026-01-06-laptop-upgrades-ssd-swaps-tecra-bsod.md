# Chat Archive: Old Laptop Upgrades, SSD Swaps, ASUS F550L and Tecra P11 BSOD

**Conversation date:** 6 January 2026, with archive request on 25 September 2026  
**Project context:** DadLAN / old-laptop refurbishment and fleet maintenance  
**Archive note:** This is a historical chat transcript. Later corrections in the conversation supersede earlier guesses. Prices mentioned were current only when discussed. Screenshots/images are described rather than embedded.  
**Privacy note:** One exact residential street address from the chat has been redacted because this repository is public.

---

## User
Shared five laptop screenshots and asked:

> How do I make these computers run faster?

The screenshots showed:

1. Windows laptop, Intel Core i3-7130U @ 2.70 GHz, 8 GB RAM, Intel HD Graphics 620, about 233 GB storage with roughly 208 GB used.
2. Toshiba Satellite C50D-A, AMD E1-2100 APU @ 1.00 GHz, 4 GB RAM, Radeon HD 8210, about 224 GB storage.
3. Toshiba Satellite L850D, AMD A10-4600M @ 2.30 GHz, 8 GB RAM, Radeon HD 7660G, about 932 GB storage.
4. Toshiba Tecra P11, Intel Core i7-M620 @ 2.67 GHz, 4 GB RAM, NVIDIA NVS 2100M, about 238 GB storage.
5. MacBook Air 13-inch Early 2015, macOS Monterey 12.7.6, 1.6 GHz dual-core Intel Core i5, 4 GB 1600 MHz DDR3, Intel HD Graphics 6000.

## Assistant
Recommended the biggest speed wins:

- Ensure Windows machines use SSDs rather than HDDs.
- Free space on the nearly-full i3 laptop.
- Disable non-essential startup apps.
- Use Task Manager to identify CPU/memory-heavy processes.
- Upgrade 4 GB machines to 8 GB RAM where possible.
- For the MacBook Air, keep free storage and reduce login/background items because RAM is soldered.

Specific notes:
- i3-7130U / 8 GB / 233 GB: free disk space first.
- AMD E1-2100 / 4 GB: SSD + 8 GB if supported; CPU remains weak.
- A10-4600M / 8 GB / ~1 TB: SSD swap would be the biggest improvement if it is on HDD.
- i7-M620 / 4 GB: 8 GB RAM + SSD.
- MacBook Air 2015 / 4 GB: free space and lean browser/background usage.

---

## User
Shared Task Manager screenshots from the Windows laptops.

## Assistant
Observed that startup items were already largely disabled and that the major load was coming from:

- Windows Update / Modules Installer Worker / MoUSO Core Worker.
- Windows Defender / Antimalware Service Executable.
- Malwarebytes on one machine.
- High disk activity on older storage.

Recommended:
1. Let Windows Update finish while plugged in.
2. Avoid running two real-time antivirus engines.
3. Reduce unnecessary Windows Search indexing.
4. Check whether disks are HDD or SSD in Task Manager.
5. Remove unnecessary cleaner software such as CCleaner.

---

## User
Asked:

> Ok list the exact 5 laptops and their specs from everything I gave you

## Assistant
Listed:

### 1. Windows laptop
- Device name: DESKTOP-RHHL0GI
- Intel Core i3-7130U @ 2.70 GHz
- 8 GB RAM, 2133 MHz
- Intel HD Graphics 620
- About 233 GB storage, roughly 208 GB used

### 2. Toshiba Satellite C50D-A
- Device: DESKTOP-8Q1G44M
- AMD E1-2100 APU @ 1.00 GHz
- 4 GB DDR3
- AMD Radeon HD 8210
- About 224 GB storage, roughly 42 GB used

### 3. Toshiba Satellite L850D
- Device: DESKTOP-H4HP6RB
- AMD A10-4600M @ 2.30 GHz
- 8 GB DDR3
- AMD Radeon HD 7660G
- About 932 GB storage, roughly 35 GB used

### 4. Toshiba Tecra P11
- Device: DESKTOP-KTB33OI
- Intel Core i7-M620 @ 2.67 GHz
- 4 GB DDR3
- NVIDIA NVS 2100M
- About 238 GB storage, roughly 128 GB used

### 5. MacBook Air 13-inch Early 2015
- macOS Monterey 12.7.6
- 1.6 GHz dual-core Intel Core i5
- 4 GB 1600 MHz DDR3
- Intel HD Graphics 6000

---

## User
Asked for the exact next best step, cost and steps for each laptop, and mentioned an exact home address in Dubbo, NSW.

**Public archive redaction:** [exact residential street address removed]

## Assistant
Recommended, at that point in the conversation:

1. **i3-7130U / 8 GB / SSD:** free 50–80 GB of storage first, cost $0.
2. **Satellite C50D-A / 4 GB:** upgrade RAM to 8 GB.
3. **Satellite L850D / 8 GB / 1 TB HDD:** replace HDD with a 2.5-inch SATA SSD.
4. **Tecra P11 / 4 GB / SSD:** upgrade to 8 GB RAM.
5. **MacBook Air 2015:** free storage and reduce background/login items.

The assistant also noted Windows Update could temporarily make these machines feel much slower.

---

## User
Asked:

> L850d exactly which screwdriver torq screws are needed to open the HDD case

## Assistant
Explained the L850D HDD cover uses Phillips screws rather than Torx, recommending a small PH0 Phillips driver, with PH1 possibly useful for some larger chassis/caddy screws.

---

## User
Asked:

> Cheapest ssds in Dubbo nsw

## Assistant
Recommended a known-brand 2.5-inch SATA SSD for the L850D and listed examples such as PNY CS900 and Crucial BX500.

---

## User
Shared a screenshot of an extremely cheap generic AliExpress 2.5-inch SATA SSD and asked:

> Would this work

## Assistant
Said it would likely physically connect but advised against using a no-name ultra-cheap SSD because of the risk of fake capacity, poor performance and early failure. Recommended known brands such as Kingston, Crucial, WD, Samsung or PNY.

---

## User
Shared a screenshot of a Crucial BX500 500 GB 2.5-inch SATA SSD listed at $115 and asked:

> Anything cheaper than this?

## Assistant
Suggested cheaper known-brand 2.5-inch SATA SSD options available online at the time, while reiterating that the L850D needs a standard 2.5-inch SATA SSD.

---

## User
Shared photos of a friend's old laptop hard drive.

The drive shown was:
- Seagate/Samsung Spinpoint Momentus
- Model ST1000LM024
- 1 TB
- 2.5-inch SATA laptop HDD

Asked:

> I want to swap my friends laptops HDD for one of my ssd's, which one should I take of the 5?
>
> This is their old HDD (nay and Jay sweeting)

## Assistant
Explained the replacement must be a 2.5-inch SATA SSD, not M.2/NVMe. Suggested choosing a reliable 2.5-inch SATA SSD with enough capacity for the friend's data.

---

## User
Clarified:

> So I mean you know the five laptops I told you about earlier where three of them have ssds in them which are three of the windows laptops I want to take the SSD from one of those three laptops and put it into my friends computer does that make sense so which of those three computers specifically should I take the SSD from and put in my friends computer does that make sense

## Assistant
Initially reasoned that the donor must specifically contain a 2.5-inch SATA SSD and warned that M.2/NVMe drives would not fit. The answer at this stage was tentative because the exact donor-drive form factors had not yet been confirmed.

---

## User
Shared a photo of the friend's laptop underside label and said:

> This is my friend Naomi's laptop

The label identified:
- ASUS
- Model F550L
- 19 V, 3.42 A, 65 W

## Assistant
Identified the laptop as an ASUS F550L and explained that it uses a standard 2.5-inch SATA drive bay, matching the friend's 1 TB 2.5-inch SATA HDD.

---

## User
Clarified:

> In the order I show you my five laptops earlier the ssds are in laptop 1 2 and 4

## Assistant
Recommended checking laptop 1, 2 and 4 for SATA versus NVMe with PowerShell:

```powershell
Get-PhysicalDisk | Select FriendlyName, MediaType, BusType, Size
```

If more than one was SATA, the recommendation was to choose the largest/least important donor SSD.

---

## User
Asked:

> How does naze laptop compare to my laptops

## Assistant
Explained that Naomi/Nay's ASUS F550L was being heavily held back by its mechanical 1 TB HDD, while several of the user's laptops already had SSDs. Recommended SSD first, then RAM if needed.

---

## User
Asked to rank all six laptops by specs and provided this list:

1. Intel i3-7130U, 8 GB RAM, ~233 GB SSD, Intel HD 620, Windows 10.
2. Toshiba Satellite C50D-A, AMD E1-2100, 4 GB RAM, ~224 GB storage, Radeon HD 8210, Windows 10.
3. Toshiba Satellite L850D, AMD A10-4600M, 8 GB RAM, ~932 GB HDD, Radeon HD 7660G, Windows 10.
4. Toshiba Tecra P11, Intel i7-M620, 4 GB RAM, ~238 GB SSD, NVIDIA NVS 2100M, Windows 10.
5. MacBook Air 13-inch Early 2015, 1.6 GHz dual-core i5, 4 GB DDR3, Intel HD 6000, macOS Monterey.
6. Naomi Sweeting's ASUS F550L, 8 GB RAM, 1 TB 2.5-inch SATA HDD; CPU not yet specified.

## Assistant
At that stage, ranked the machines approximately:

1. i3-7130U / 8 GB / SSD
2. MacBook Air 2015 / 4 GB / SSD
3. Tecra P11 i7-M620 / 4 GB / SSD
4. ASUS F550L / 8 GB / HDD, CPU unknown
5. L850D A10-4600M / 8 GB / HDD
6. C50D-A E1-2100 / 4 GB

Noted that the ASUS position depended heavily on its exact CPU.

---

## User
Asked:

> Ok if Naomi's one has ssd where does it go on the list now

## Assistant
Estimated that the ASUS F550L with 8 GB RAM and an SSD would likely move to second place, pending the exact CPU model.

---

## User
Said:

> CPU is i7 for nays

## Assistant
Updated the rough ranking, with the caveat that the exact i7 model still mattered:

1. Nay/Naomi ASUS F550L — i7 / 8 GB / SSD
2. i3-7130U laptop — 8 GB / SSD
3. MacBook Air 2015 — i5 / 4 GB / SSD
4. Toshiba Tecra P11 — i7-M620 / 4 GB / SSD
5. Toshiba L850D — A10-4600M / 8 GB / HDD
6. Toshiba C50D-A — E1-2100 / 4 GB

---

# Tecra P11 BSOD troubleshooting

## User
Shared photos of the Toshiba Tecra P11 repeatedly blue-screening.

The visible blue-screen information included:
- `KMODE_EXCEPTION_NOT_HANDLED`
- `What failed: Netwsw00.sys`

Asked:

> Tecra keeps bsoding please help me fix it

## Assistant
Identified `Netwsw00.sys` as the Intel Wi-Fi driver and recommended:

1. Boot without Wi-Fi if possible.
2. Enter Windows Recovery.
3. Boot Safe Mode without networking.
4. Open Device Manager.
5. Remove the Intel wireless adapter driver.
6. Restart.
7. If necessary, reinstall a stable Toshiba/Intel wireless driver later, or disable the internal Wi-Fi adapter and use a USB Wi-Fi dongle.

Also suggested `sfc /scannow`, DISM and CHKDSK only if crashes continued after addressing the Wi-Fi driver.

---

## User
Shared a photo of Windows Recovery **Advanced options**.

## Assistant
Directed:

> Start-up Settings → Restart → press 4 for Safe Mode.

---

## User
Shared a photo of the Startup Settings menu with:
- 4) Enable Safe Mode
- 5) Enable Safe Mode with Networking
- etc.

## Assistant
Directed the user to press **4**, not networking.

---

## User
Shared a Device Manager screenshot.

Under **Network adapters**:
- Intel(R) 82577LM Gigabit Network Connection
- Intel(R) Centrino(R) Advanced-N 6200 AGN
- Microsoft Kernel Debug Network Adapter

There was also an **F3607gw** device with a warning under Other devices.

## Assistant
Identified the problematic Wi-Fi adapter as:

> **Intel(R) Centrino(R) Advanced-N 6200 AGN**

Recommended uninstalling that device and deleting the driver software if Windows offered the checkbox.

---

## User
Shared the Uninstall Device confirmation dialog for the Intel Centrino Advanced-N 6200 AGN.

## Assistant
Directed the user to click **Uninstall**, then restart normally, using Ethernet temporarily if needed.

---

## User
Shared Device Manager after the Intel Centrino adapter disappeared from the Network adapters list.

## Assistant
Said the driver removal had succeeded, advised restarting, and noted the **F3607gw** warning device could also be disabled temporarily if necessary.

---

## User
Restarted and shared another BSOD photo:

> Yeah I restarted and it bsod again after those steps

The new BSOD showed:
- `DRIVER_IRQL_NOT_LESS_OR_EQUAL`
- `What failed: Netwsw00.sys`

## Assistant
Confirmed that the crash was still coming from the same Intel Wi-Fi driver and recommended a stronger removal path:

1. Boot Safe Mode without networking.
2. Uninstall/disable **Intel Centrino Advanced-N 6200 AGN**.
3. Use Ethernet temporarily.
4. If Windows keeps reinstalling the old driver, remove the driver package with `pnputil`.

Commands suggested:

```cmd
pnputil /enum-drivers | findstr /i intel
```

Then, after identifying the matching `oemXX.inf`:

```cmd
pnputil /delete-driver oemXX.inf /uninstall /force
```

The assistant also suggested that the simplest long-term solution could be leaving the old Intel 6200 disabled and using a small USB Wi-Fi adapter.

---

# Current hardware facts preserved from this conversation

| # | Laptop | CPU | RAM | Storage in this conversation | GPU |
|---|---|---|---|---|---|
| 1 | Windows laptop / DESKTOP-RHHL0GI | Intel Core i3-7130U @ 2.70 GHz | 8 GB | ~233 GB SSD, nearly full at the time | Intel HD Graphics 620 |
| 2 | Toshiba Satellite C50D-A | AMD E1-2100 @ 1.00 GHz | 4 GB | ~224 GB, later clarified as one of the laptops with an SSD | Radeon HD 8210 |
| 3 | Toshiba Satellite L850D | AMD A10-4600M @ 2.30 GHz | 8 GB | ~932 GB / 1 TB HDD | Radeon HD 7660G |
| 4 | Toshiba Tecra P11 | Intel Core i7-M620 @ 2.67 GHz | 4 GB | ~238 GB SSD | NVIDIA NVS 2100M |
| 5 | MacBook Air 13-inch Early 2015 | 1.6 GHz dual-core Intel Core i5 | 4 GB DDR3 | SSD | Intel HD Graphics 6000 |
| 6 | Naomi/Nay's ASUS F550L | Intel Core i7 (exact model not captured here) | 8 GB | Originally 1 TB ST1000LM024 2.5-inch SATA HDD; SSD upgrade planned | Not captured |

### Confirmed SSD donor machines
The user clarified that **laptops 1, 2 and 4** were the three Windows laptops containing SSDs at that point.

### ASUS drive compatibility
Naomi/Nay's ASUS F550L uses a **2.5-inch SATA** drive bay, so a donor SSD must also be a **2.5-inch SATA SSD**.

### Tecra P11 Wi-Fi failure
The recurring BSOD was repeatedly tied to:

- Intel Centrino Advanced-N 6200 AGN
- Driver: `Netwsw00.sys`
- Stop codes seen:
  - `KMODE_EXCEPTION_NOT_HANDLED`
  - `DRIVER_IRQL_NOT_LESS_OR_EQUAL`

---

## Archive request

On 25 September 2026 the user asked:

> push this whole conversation to my most relevant GitHub repo

This archive was added to the DadLAN Control Centre repository because the conversation is primarily about the user's old-laptop fleet, hardware upgrades, donor SSD decisions and fleet troubleshooting.
