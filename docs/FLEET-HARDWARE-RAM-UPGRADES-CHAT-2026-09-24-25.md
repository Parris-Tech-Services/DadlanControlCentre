# DadLAN fleet hardware / RAM / SSD upgrade ChatGPT transcript — 24–25 Sep 2026

This is the user-visible transcript of the DadLAN hardware inventory, ranking, upgrade and RAM-identification conversation.

The transcript intentionally preserves earlier incorrect or tentative assistant claims because they were part of the conversation. Where later evidence corrected them, the correction is retained immediately afterwards.

## Final corrections established by the end of the conversation

- RAM #21 is **not** an 8GB module. Josh physically checked it: it is a **2GB SK hynix, 1Rx8, PC3-12800S / DDR3-1600** module.
- The Toshiba Satellite L50-A / PSKLEA-00M001 has a confirmed installed module: **SK hynix HMT451S6BFR8A-PB, 4GB, 1Rx8, PC3L-12800S, DDR3L-1600**.
- From the currently photographed loose RAM, the best matched second module for the L50-A is **Samsung M471B5173QH0-YK0, 4GB, 1Rx8, PC3L-12800S / DDR3L-1600**.
- The earlier suggestion to add a discrete GPU to Lenovo 7567Y2M was retracted after confirming it is a **ThinkCentre Edge 71z all-in-one**, not a normal tower.
- The 2017 27-inch iMac internal SSD swap is physically difficult because the display is adhesive-mounted; external USB 3 SSD booting was recommended as the safer experiment.
- SSD stock photographed earlier included Samsung, SanDisk, Crucial, WD, Kingston and Samsung/Lenovo OEM SATA SSDs, but later DadLAN swaps mean not every originally photographed SSD can be assumed to still be loose today.

---

## User — 2026-09-24 01:34:32Z

> remember that list of all my laptops and desktops we did the other day?
>
> Give me to me again please

## Assistant

The latest full DadLAN inventory we had was **22 computers: 15 laptops + 7 desktops/AIOs**:

1. HP ProBook x360 435 G8 — Ryzen 5 5600U, 16GB RAM, 256GB NVMe, Radeon Vega 7
2. Toshiba Satellite L50-A (PSKLEA-00M001) — i5-3337U, 4GB RAM, replacement drive, GeForce GT 740M
3. MacBook Air Early 2015 — i5-5250U, 8GB RAM, SSD, Intel HD 6000
4. Lenovo ThinkPad L480 — i3-7130U, 8GB RAM, Samsung 870 EVO 250GB SSD, Intel HD 620
5. HP ProBook 11 EE G2 — i3-6100U, 8GB RAM, 128GB SSD, Intel HD 520
6. Toshiba Satellite L850D — A10-4600M, 8GB RAM, Radeon HD 7660G; upgraded to SSD
7. HP ProBook 4230s — i3-2330M, 8GB RAM, SSD, Intel HD 3000
8. Toshiba Tecra P11 — i7-620M, 8GB RAM, SSD, NVIDIA NVS 2100M
9. Toshiba Satellite L630 — Pentium P6100, 8GB RAM, SSD, Intel HD
10. ASUS X553MA / F553M — Pentium N3540, 8GB RAM; upgraded to SSD
11. HP 15-db0034AU — AMD A6-9225, HDD; display/HDMI issue
12. Compaq Presario CQ56 — Celeron T3500, 4GB RAM; SSD upgrade/clone
13. Compaq 610 — Core 2 Duo T5870, 4GB RAM, HDD, GMA X3100
14. Toshiba Satellite C50D-A — AMD E1-2100, 8GB RAM, Radeon HD 8210; upgraded to SSD
15. ThinkPad T61 6457-BP2 — Core 2 Duo-era ThinkPad, HDD
16. JParrisDesktop — i5-9400, 16GB RAM, GTX 1660 6GB
17. iMac Retina 5K 27-inch 2017 — 3.4GHz quad-core i5, 8GB DDR4, Radeon Pro 570 4GB, 1TB drive
18. Lenovo 7567Y2M desktop — i5-2400S, 8GB RAM, SSD
19. iMac 24-inch Early 2009 — 2.66GHz Core 2 Duo, 4GB DDR3, HDD
20. Lenovo C260 #1 — Celeron J1800, 4GB RAM, HDD
21. Lenovo C260 #2 — Celeron J1800, 4GB RAM, HDD
22. Custom Crosshair V Formula-Z tower — AMD FX-6300, 16GB Corsair DDR3, XFX Radeon R9 290 4GB, 240GB SanDisk SSD + 1TB Seagate ST1000DM003 HDD

---

## User — 2026-09-24 01:39:26Z

> is this ranked by power?

## Assistant

No. That list was mostly the inventory order, not a power ranking.

I said that if ranked by overall DadLAN gaming power, the top would start with JParrisDesktop, the Crosshair tower, the 2017 iMac, ProBook x360 435 G8 and Toshiba L50-A, while noting the exact order could depend on game workload.

---

## User — 2026-09-24 01:39:40Z

> give me the full 22 most powerful to weakest please

## Assistant

Initial gaming-oriented ranking:

1. JParrisDesktop — i5-9400, GTX 1660 6GB, 16GB RAM
2. Custom Crosshair V Formula-Z tower — FX-6300, Radeon R9 290 4GB, 16GB RAM
3. iMac 27" Retina 5K 2017 — quad-core i5, Radeon Pro 570 4GB, 8GB RAM
4. HP ProBook x360 435 G8 — Ryzen 5 5600U, Vega 7, 16GB RAM
5. Toshiba Satellite L50-A — i5-3337U, GeForce GT 740M, 4GB RAM
6. Toshiba Satellite L850D — A10-4600M, Radeon HD 7660G, 8GB RAM
7. MacBook Air Early 2015 — i5-5250U, Intel HD 6000, 8GB RAM
8. ThinkPad L480 — i3-7130U, Intel HD 620, 8GB RAM
9. HP ProBook 11 EE G2 — i3-6100U, Intel HD 520, 8GB RAM
10. HP ProBook 4230s — i3-2330M, Intel HD 3000, 8GB RAM
11. Toshiba Tecra P11 — i7-620M, NVIDIA NVS 2100M, 8GB RAM
12. Lenovo 7567Y2M — i5-2400S, integrated graphics, 8GB RAM
13. Toshiba Satellite L630 — Pentium P6100, first-gen Intel HD, 8GB RAM
14. ASUS X553MA / F553M — Pentium N3540, Intel HD Bay Trail, 8GB RAM
15. HP 15-db0034AU — AMD A6-9225, Radeon R4-class graphics
16. Lenovo C260 #1 — Celeron J1800, Intel HD, 4GB RAM
17. Lenovo C260 #2 — Celeron J1800, Intel HD, 4GB RAM
18. Toshiba Satellite C50D-A — AMD E1-2100, Radeon HD 8210, 8GB RAM
19. ThinkPad T61 6457-BP2 — Core 2 Duo-era hardware
20. iMac 24" Early 2009 — 2.66GHz Core 2 Duo, 4GB RAM
21. Compaq Presario CQ56 — Celeron T3500, 4GB RAM
22. Compaq 610 — Core 2 Duo T5870, 4GB RAM, GMA X3100

---

## User — 2026-09-24 01:42:41Z

User supplied a critique of the ranking, noting in particular:

- JParrisDesktop at #1 was sensible.
- #2 Crosshair tower vs #3 2017 iMac was closer because the iMac CPU is much stronger while R9 290 is a little stronger than Radeon Pro 570.
- HP 15-db0034AU was likely too low because Radeon R4 is better than several old integrated GPUs.
- 2009 24-inch iMac could be too low depending on GPU.
- T61 position depends heavily on whether it has NVIDIA NVS 140M or Intel GMA X3100.
- L50-A 4GB RAM was a meaningful bottleneck.

## Assistant

I agreed with most of the critique but corrected the 2009 iMac point: the standard 2.66GHz 24-inch Early 2009 model normally used GeForce 9400M, while GT 120 was associated with the higher configuration.

Revised gaming ranking:

1. JParrisDesktop — i5-9400 + GTX 1660 6GB
2. Crosshair V tower — FX-6300 + R9 290 4GB
3. 2017 27" iMac — quad-core i5 + Radeon Pro 570 4GB
4. HP ProBook x360 435 G8 — Ryzen 5 5600U + Vega 7
5. Toshiba L50-A — i5-3337U + GT 740M
6. Toshiba L850D — A10-4600M + Radeon HD 7660G
7. ThinkPad L480 — i3-7130U + Intel HD 620
8. MacBook Air 2015 — i5-5250U + Intel HD 6000
9. HP ProBook 11 EE G2 — i3-6100U + Intel HD 520
10. HP 15-db0034AU — A6-9225 + Radeon R4
11. HP ProBook 4230s — i3-2330M + Intel HD 3000
12. Toshiba Tecra P11 — i7-620M + NVS 2100M
13. Lenovo 7567Y2M — i5-2400S + Intel HD 2000-class graphics
14. 2009 24" iMac 2.66GHz — Core 2 Duo + GeForce 9400M
15. Toshiba L630 — Pentium P6100 + first-gen Intel HD
16. Toshiba C50D-A — E1-2100 + Radeon HD 8210
17. ASUS X553MA — Pentium N3540 + Bay Trail Intel HD
18. Lenovo C260 #1 — Celeron J1800 + Intel HD
19. Lenovo C260 #2 — Celeron J1800 + Intel HD
20. ThinkPad T61 — provisional pending exact GPU
21. Compaq CQ56 — Celeron T3500 + Intel GMA-era graphics
22. Compaq 610 — Core 2 Duo T5870 + GMA X3100

---

## User — 2026-09-24 01:44:55Z

> write the list again but add which have ssd's vs hdds
>
> also you can look through our chat history to check ram configuration and GPU details ect

## Assistant

I reconstructed the following storage/RAM table from the then-available history:

| # | Computer | RAM | GPU | Storage |
|---|---|---|---|---|
| 1 | JParrisDesktop — i5-9400 | 16GB | GTX 1660 6GB | ~256GB SSD + 1TB HDD |
| 2 | Crosshair V Formula-Z — FX-6300 | 16GB, 2×8GB Corsair DDR3 | XFX R9 290 4GB | 240GB SanDisk SSD + 1TB Seagate HDD |
| 3 | 27" Retina 5K iMac 2017 | 8GB DDR4 | Radeon Pro 570 4GB | 1TB HDD |
| 4 | HP ProBook x360 435 G8 | 16GB | Vega 7 | 256GB KIOXIA NVMe |
| 5 | Toshiba L50-A | 4GB DDR3 | GT 740M 2GB | HDD |
| 6 | Toshiba L850D | 8GB | Radeon HD 7660G | ~120GB SSD |
| 7 | ThinkPad L480 | 8GB | Intel HD 620 | Samsung 870 EVO 250GB |
| 8 | MacBook Air Early 2015 | 8GB | Intel HD 6000 | PCIe SSD/flash |
| 9 | HP ProBook 11 EE G2 | 8GB | Intel HD 520 | 128GB SATA SSD |
| 10 | HP 15-db0034AU | RAM not fully reconfirmed; older records suggested 4GB | Radeon R4 | HDD |
| 11 | HP ProBook 4230s | 8GB | Intel HD 3000 | Samsung 860 EVO 250GB |
| 12 | Toshiba Tecra P11 | 8GB | NVS 2100M | 256GB SSD |
| 13 | Lenovo 7567Y2M | 8GB | Intel HD 2000-class | SSD |
| 14 | 24" iMac Early 2009 | 4GB | GeForce 9400M | HDD |
| 15 | Toshiba L630 | 8GB | first-gen Intel HD | MSI S270 240GB SSD |
| 16 | Toshiba C50D-A | 8GB | Radeon HD 8210 | SSD |
| 17 | ASUS X553MA/F553M | 8GB | Bay Trail Intel HD | SSD |
| 18 | Lenovo C260 #1 | 4GB | Intel HD | HDD |
| 19 | Lenovo C260 #2 | 4GB | Intel HD | HDD |
| 20 | ThinkPad T61 6457-BP2 | 4GB | GPU unconfirmed | HDD |
| 21 | Compaq CQ56 | 4GB | Intel GMA-era | ~120–128GB SSD |
| 22 | Compaq 610 | 4GB | GMA X3100 | 120GB HDD |

---

## User — 2026-09-24 02:01:44Z

> if you had to pick only 5 upgrades across the whole fleet to bump up the power of any one of these machines higher, what 5 would have the biggest impacts?

## Assistant

I initially suggested:

1. Lenovo 7567Y2M: add a discrete GPU.
2. JParrisDesktop: upgrade GTX 1660.
3. Toshiba L50-A: 4GB → 8/16GB RAM.
4. ProBook x360 435 G8: ensure Vega 7 has dual-channel RAM.
5. Crosshair tower: replace FX platform with used Ryzen platform.

These were later narrowed after Josh clarified that recommendations must be limited to hardware he already has access to.

---

## User — 2026-09-24 02:04:04Z

> look back through all our chats for the hardware i have actually had access to ddr 3 or 2 or 4 ram through avance or custom computers, ssd's ect, i dont have spare graphics cards lying around
>
> how much money would all your upgrades actually cost, be as specific as possible and give me links to their parts online

## Assistant

I initially mixed Josh's existing stock with hypothetical online purchases. During that answer I also corrected the Lenovo 7567Y2M point after identifying it as a **ThinkCentre Edge 71z all-in-one**, not a normal desktop tower.

I mentioned that the photographed/recorded loose stock included DDR2/DDR3/DDR3L/DDR4 SO-DIMMs and multiple SATA SSDs, but the exact current loose-state needed better reconstruction.

---

## User — 2026-09-24 02:16:03Z

> Where was this stuff?
>
> Used R5 3600 + B450 board + 16GB DDR4 + Wraith cooler; keep R9 290, case,

## Assistant

I clarified that it was **not** a specific bundle Josh had found or had access to. It was a hypothetical used-market combination assembled from separate listings. I retracted it from the "hardware you actually have access to" list.

---

## User — 2026-09-24 02:16:26Z

> no only tell me stuff i have access to right now

## Assistant

I tightened the rule to only hardware with evidence of current or recent physical access. At that point I still incorrectly identified RAM #21 as an 8GB Hynix DDR3L stick. This was later disproved by Josh physically checking RAM #21.

---

## User — 2026-09-24 02:17:33Z

> no look through our past chats i sent you photos of a head of hdd's ssds ram ect, you aren't looking hard enough

## Assistant

I acknowledged that the earlier search had been too narrow and said I would search specifically for the photographed RAM, HDD and SSD piles from Avance/Custom Computers.

---

## User — 2026-09-24 02:26:41Z

User attached multiple screenshots from the older DadLAN hardware-sorting chats. They showed, among other things:

- Toshiba L630 originally containing:
  - Team Group TSD32048M1333C9-E, 2GB DDR3-1333
  - Micron MT16JSF25664HZ-1G1F1, 2GB PC3-8500S / DDR3-1066
- Toshiba Tecra P11 originally shown with two Samsung 2GB PC3-8500S / DDR3-1066 modules.
- HP ProBook 4230s shown with Micron 4GB DDR3-1333 / PC3-10600S.
- Toshiba C50D-A shown with Samsung M471B5173QH0-YK0, 4GB 1Rx8 PC3L-12800S DDR3L-1600.
- The numbered loose RAM layout, including a photographed set of around 22 SO-DIMMs.
- A large stack of 2.5-inch SATA hard drives.
- HDD labels including HGST 1TB 5400RPM, Samsung/Seagate Spinpoint 2TB ST2000LM003, Seagate Mobile HDD 1TB, Toshiba 1TB 5400RPM, Seagate ST1000LM024 1TB and Western Digital Blue 1TB.
- The loose SSD drawer with Samsung, SanDisk, Crucial, WD and Kingston SSDs.

User wrote:

> You said this
>
> I just looked and found them easily
>
> You need to look way harder for the specific HDD ssd and ram models makes photos chats ect
>
> Try looking again harder this time

## Assistant

I reconstructed more of the older stock:

### RAM / module history recovered

- Toshiba L850D: 2×4GB Samsung M471B5273DH0-CK0, PC3-12800S DDR3-1600 = 8GB.
- HP ProBook 4230s: existing Micron 4GB DDR3-1333 / PC3-10600S plus a 4GB stick from numbered stock = 8GB.
- Toshiba Tecra P11: RAM #4 + #7, two 4GB DDR3-1600 modules = 8GB.
- Toshiba L630: RAM #8 + #15, two matching Micron 4GB DDR3-1600 = 8GB.
- Toshiba C50D-A: existing Samsung M471B5173QH0-YK0 4GB 1Rx8 PC3L-12800S plus another 4GB DDR3L module = 8GB.
- HP ProBook 11 EE G2: original HP SPS 820569-001 4GB DDR4-2133 replaced by AZW 8GB DDR4 SO-DIMM.
- ThinkPad L480: 2×4GB DDR4.

### SSD stock recovered from the photographed drawer

- Samsung 860 EVO 250GB
- SanDisk X400 256GB
- Crucial BX500 240GB × at least 3
- WD Green 120GB
- Kingston SSDNow 300 120GB
- Samsung/Lenovo PM871 128GB × about 2
- another partly covered ~240GB SSD, likely Crucial
- later stock evidence elsewhere also included Samsung 850 EVO 250GB, SanDisk SSD Plus 240GB, Toshiba Q Series Pro 128GB and several Kingston 120GB SSDs.

### HDD stock recovered

- HGST 1TB 5400RPM
- Samsung/Seagate Spinpoint ST2000LM003 2TB
- Seagate Mobile HDD 1TB
- Toshiba 1TB 5400RPM
- Seagate ST1000LM024 1TB
- WD Blue 1TB 5400RPM
- enterprise HGST 900GB 10K SAS drives were also visible but are not normal laptop SATA drives.

---

## User — 2026-09-24 02:31:32Z

> Do it

## Assistant

I proposed five upgrades using only Josh's known-access hardware. The initial version still contained the later-disproved claim that an 8GB Hynix DDR3L module was RAM #21.

The other recommendations were:

- L50-A: move to a spare 240/256GB SATA SSD.
- 2017 27-inch iMac: use a spare SSD for faster boot/game storage.
- HP 15-db0034AU: HDD → SATA SSD.
- ThinkPad T61: HDD → SATA SSD.

---

## User — 2026-09-24 02:52:50Z

> where was this
>
> Add the SK Hynix HMT41GS6BFR8A-PB 8GB DDR3L-1600 alongside its existing 4GB

## Assistant

I said this was supposedly RAM #21 from the numbered pile and associated it with an August discussion. This association was later shown to be wrong.

---

## User — 2026-09-24 02:54:01Z

> how hard is this to get apart
>
> 2017 27" iMac

## Assistant

I explained:

- RAM access: very easy via rear access door.
- Internal HDD/SSD access: difficult because the display is held with adhesive.
- Reaching the drive requires cutting display adhesive, disconnecting the 5K panel, replacing the drive, cleaning adhesive and resealing with new strips.
- Recommended safer experiment: boot the iMac from an external USB 3 SATA SSD first.

---

## User — 2026-09-24 04:18:55Z

> what was the title of the chat this was mentioned ... [question about the supposed RAM #21 8GB Hynix]

## Assistant

I could not reliably recover the exact old chat title and said the RAM #21 discussion had been associated with 17 August. This was still based on the incorrect #21 identification.

---

## User — 2026-09-24 05:02:22Z

> im looking at RAM number 21 and its a 2GB 1Rx8 PC3 12800S 11 11 B2 Hynix, im not seeing the 8GB Hynix, are you sure its 21?

## Assistant

I corrected the record:

- RAM #21 = **2GB Hynix DDR3-1600 / PC3-12800S, 1Rx8**.
- The later association of #21 with an 8GB HMT41GS6BFR8A-PB was not supported by Josh's physical evidence and should be treated as an assistant mistake.
- The supposed 8GB Hynix module was removed from the confirmed spare inventory until physically located.

---

## User — 2026-09-24 05:05:29Z

> Well with all that in mind write this again fact checked

User pasted the previous five-upgrade plan and asked for a corrected version.

## Assistant

I rewrote the plan with the #21 correction:

1. Toshiba L50-A: add a compatible 4GB DDR3L-1600 module to go from 4GB to 8GB.
2. Toshiba L50-A: HDD → remaining 240/250/256GB SATA SSD.
3. HP 15-db0034AU: HDD → remaining SATA SSD.
4. ThinkPad T61: HDD → remaining 120/128/240GB SATA SSD.
5. 2017 27-inch iMac: preferably use a spare SATA SSD externally over USB 3 instead of opening the display.

I also reiterated that the photographed SSD pile had included SanDisk X400, Samsung 860 EVO, multiple Crucial BX500s, PM871 modules, WD Green, Kingston SSDNow and separate MSI S270 purchases, but not every drive could be assumed still loose after subsequent swaps.

---

## User — 2026-09-24 05:08:01Z

> this is not what im asking
>
> "compatible spare" is way too vague
>
> I want to know specifically from what I have access to, which ram's, which best upgrades, which computers, be way more specific

## Assistant

I became more specific and recommended a concrete module from the numbered stock for the L50-A, but this still relied on reconstructed numbering that was less trustworthy than direct label matching.

I also proposed:
- SanDisk X400 256GB → L50-A
- Crucial BX500 240GB → HP 15-db0034AU
- Samsung/Lenovo PM871 128GB → ThinkPad T61
- another Crucial BX500 → Lenovo C260

I explicitly noted that SSD identities were historically photographed but not all were guaranteed still loose today.

---

## User — 2026-09-24 05:17:19Z

User attached fresh photos of loose DDR3L SO-DIMMs and asked:

> For the Toshiba L50-A
>
> Which one?

The visible modules included:

- Samsung 4GB PC3L-12800S modules
- SK hynix 4GB 2Rx8 PC3-12800S modules
- Micron MT16JSF51264HZ / 4GB modules
- Micron MT8KTF51264HZ-1G6E1, 4GB 1Rx8 PC3L-12800S
- Crucial CT51264BF160B.JM8FP, 4GB DDR3L-1600 SO-DIMM 1.35V CL11
- other Samsung DDR3L modules.

## Assistant

I initially recommended one of the Crucial **CT51264BF160B.JM8FP 4GB DDR3L-1600 1.35V** sticks as a clean electrical/spec match, while noting that matching the installed module's 1Rx8/2Rx8 rank would be even better if the exact installed label could be recovered.

---

## User — 2026-09-24 05:18:53Z

User attached another photo of DDR3L modules and asked:

> There are all 3L, which is best?

The photo clearly showed:

- Samsung **M471B5173QH0-YK0**, 4GB, 1Rx8, PC3L-12800S
- Samsung **M471B5273CH0-YK0**, 4GB, 2Rx8, PC3L-12800S
- Micron 4GB 1Rx8 PC3L-12800S
- Crucial CT51264BF160B.JM8FP 4GB DDR3L-1600 1.35V CL11 modules.

## Assistant

I said the best module depended on the rank of the Hynix already in the L50-A:

- if installed Hynix is 1Rx8 → Samsung M471B5173QH0-YK0
- if installed Hynix is 2Rx8 → Samsung M471B5273CH0-YK0

I said matching rank was more useful than brand because all candidate sticks were 4GB DDR3L-1600.

---

## User — 2026-09-24 05:20:52Z

> Ok can you lookup from the other day what's inside the L50-A

## Assistant

I recovered that the L50-A had:

- 1× 4GB SK hynix DDR3L-1600 SO-DIMM
- PC3L-12800S
- one slot occupied, one empty

I incorrectly said the exact Hynix part number was not preserved.

---

## User — 2026-09-24 05:24:06Z

User attached screenshots from the old chat showing that the exact part number **was** preserved.

The screenshot showed the blue SK hynix module labelled:

**HMT451S6BFR8A-PB**
**4GB 1Rx8 PC3L-12800S**

The old chat text also said this blue SK hynix stick was the better match for the Toshiba L50-A compared with a slower Samsung PC3-10600S module.

User wrote:

> The old chat did preserve that part number

## Assistant

I corrected the record:

The RAM currently inside the **Toshiba L50-A** is:

**SK hynix HMT451S6BFR8A-PB**
- 4GB
- 1Rx8
- PC3L-12800S
- DDR3L-1600
- 1.35V class
- label timings shown as 11-13-B4

Therefore, from the loose DDR3L modules Josh had just photographed, the best matching upgrade is:

**Samsung M471B5173QH0-YK0**
- 4GB
- 1Rx8
- PC3L-12800S
- DDR3L-1600

Recommended final L50-A configuration:

**SK hynix HMT451S6BFR8A-PB 4GB 1Rx8 + Samsung M471B5173QH0-YK0 4GB 1Rx8 = 8GB total, with a closely matched DDR3L-1600 pair.**

---

## User — 2026-09-25 10:04:12Z

> Push this whole conversation to our most relevant GitHub repo

## Repository selection

The most relevant writable repository is **Parris-Tech-Services/DadlanControlCentre**. Its README already contains DadLAN fleet rollout, SSD evidence and SSD transcript documentation, making it the natural home for this hardware/RAM/upgrade transcript.

