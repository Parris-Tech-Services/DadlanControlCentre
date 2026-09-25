# SSD evidence reconstruction — 25 Sep 2026

This document records the SSD evidence reconstructed from Josh's recent ChatGPT conversations, photographs, benchmark outputs, cloning/restore sessions and purchase records.

## Evidence rules used

- **Confirmed installed** = a benchmark, diagnostic, CrystalDiskInfo/HWiNFO/system output, or a later physical/photo observation directly tied the SSD to the machine.
- **Photo-confirmed loose stock** = the SSD was visible among loose/sorted drives, but a later destination may not be known.
- **Planned/proposed** = discussed as an intended assignment, but there is not enough surviving evidence to record the install as fact.
- Do **not** add all rows together to infer a unique SSD count. The same physical drive may appear in an earlier loose-stock photo and a later installed-machine record.
- The original chat images did not expose reliable GPS/EXIF location metadata in the recovered evidence. “Photo location” below therefore means the physical context shown in the photo (drawer/sorter, machine, adapter, etc.), not a street address.

## Timeline and evidence

### 19 Sep 2025 — MSI SPATIUM S270 purchase

Purchase record:
- **3 × MSI SPATIUM S270 240GB**
- 2.5-inch SATA III
- Centre Com order **#1711213**
- recorded purchase price: **$29 each**
- recorded total: **about $88.04**

Several machines were discussed as possible recipients over time. Those were plans, not proof of final installation.

Later evidence proves at least one destination:
- **Toshiba Satellite L630 / DadLAN #06 → MSI S270 240GB**

### 17–19 Aug 2026 — benchmark / system inventory evidence

The DadLAN benchmark/script work directly identified these installed SSDs:

| Machine | Confirmed SSD | Evidence type |
|---|---|---|
| DadLAN #01 HP ProBook x360 435 G8 | **KIOXIA KBG40ZNV256G, 256GB NVMe** | Action1/benchmark system output |
| DadLAN #02 Lenovo ThinkPad L480 | **Samsung SSD 870 EVO, 250GB SATA** | Action1/benchmark system output |
| DadLAN #04 HP ProBook 4230s | **Samsung SSD 860 EVO, 250GB** | DadLAN benchmark data |
| DadLAN #05 Toshiba Tecra P11 | **TOSHIBA THNSNC256GBS / THNSNC256GBSJ, 256GB** | Action1/benchmark system output |
| DadLAN #06 Toshiba Satellite L630 | **MSI S270, 240GB SATA** | repeated DadLAN benchmark output |

Important ambiguity:
- A **Samsung 860 EVO 250GB** was later photographed among loose SSD stock in September 2026.
- Therefore either Josh owns more than one 860 EVO, or the drive was removed from the 4230s between the August benchmark and the September photo session.
- The surviving evidence does not resolve which.

### 12–16 Sep 2026 — HP ProBook 11 EE G2

HWiNFO/System Summary and HP diagnostics identified:
- **Samsung MZNTY128HDHP-000H1**
- **128GB SATA SSD**
- OEM Samsung PM871-family unit
- SMART: passed
- Short DST: passed

This is a direct model-level identification from the machine, not a capacity-only inference.

### 16 Sep 2026, about 08:30–08:33 AEST — loose SSD drawer/sorter photos

A photo session showed loose drives together in an SSD drawer/sorter context. Labels visible in the recovered discussion included:

| SSD | Capacity | Quantity visible | Confidence |
|---|---:|---:|---|
| **Samsung 860 EVO** | 250GB | 1 | label identifiable |
| **SanDisk X400** | 256GB | 1 | label identifiable |
| **Crucial BX500** | 240GB | at least 3 | multiple visible |
| **WD Green SSD** | 120GB | 1 | visible loose |
| **Kingston SSDNow 300** | 120GB | 1 | family identifiable |
| **Samsung / Lenovo PM871** | 128GB | about 2 | OEM labels visible |
| Partly tape-covered SSD | about 240GB | 1 | probably Crucial, **not certain** |

The same broader photo set also contained silver 2.5-inch mechanical HDDs and enterprise HGST 10K SAS drives. These must not be counted as SSDs just because they have a similar rectangular form factor.

### 16 Sep 2026, about 08:58–09:00 AEST — labelled/tested SSD stock photos

A later photo group showed labelled SSD stock / sorter boxes with health notes discussed in chat.

| SSD | Capacity | Recorded health/status |
|---|---:|---|
| **Samsung 850 EVO** | 250GB | **94%** |
| **SanDisk SSD Plus** | 240GB | recorded as **“Flawless”** |
| **Toshiba Q Series Pro** | 128GB | **99%** |
| **Kingston SSD** | 120GB | **87%** |
| **Kingston SSD** | 120GB | **Flawless** |
| **Kingston SSD** | 120GB | **95%** |
| **Kingston SSD** | 120GB | **88%** |
| **Kingston SSD** | 120GB | **92%** |
| another Kingston | 120GB | sixth unit photographed; health mapping not preserved |

There were **six Kingston 120GB SSDs photographed in that group**.

A Kingston SSDNow 300 120GB was identified elsewhere in the same photo session, but the surviving record does not prove which health result belongs to that specific unit.

These photos may overlap with the earlier drawer/sorter photo. Do not count both photo groups as separate inventories.

### 16 Sep 2026 — Toshiba L850D clone/restore

A Macrium full-disk image of the original Toshiba L850D HDD was created and verified.

Recorded image location:
`\\NASDA717A\JOSHP\L850D_HDD_Image\Macrium-Full-Disk\`

A replacement SSD was connected using a **Volans USB-to-SATA adapter**.

Windows/Macrium saw the target as:
- about **111.79GB usable**
- via **ASMedia USB 3.1**

That strongly indicates a nominal **120GB SSD**.

Restore layout recorded:
- System Reserved ~50MB
- main NTFS ~111.22GB
- Recovery ~530MB

The exact SSD brand/model was not preserved. It should remain recorded as:
- **Toshiba L850D → ~120GB SSD, exact model unverified**

Do not assign WD Green, Kingston, or another specific 120GB model without fresh evidence.

### 17–18 Sep 2026 — Compaq Presario CQ56 clone/restore

The CQ56 originally had a roughly **500GB WD HDD**.

A small SSD connected via the Volans/ASMedia USB-SATA adapter appeared as:
- about **111.79GB usable**

This again indicates a nominal **120GB-class SSD**.

The image was restored/cloned to that drive, the Windows partition was resized, and the SSD was installed.

Current evidence-safe record:
- **Compaq CQ56 → ~120–128GB SSD, exact model unverified**

Do not infer which Kingston/WD/other 120GB unit it was.

### 16–19 Sep 2026 — ASUS X553MA and Toshiba C50D-A

On **9 Sep 2026**, audit state still showed:
- ASUS X553MA → **500GB HDD**
- Toshiba C50D-A → **750GB HGST HDD**

On **16 Sep**, both were still among machines physically confirmed as not having SSDs.

By **19 Sep**, later inventory discussions described both as SSD-equipped/recently converted.

However, there is no surviving model-level evidence tying:
- SanDisk X400,
- Crucial BX500,
- WD Green,
- Kingston,
- or another specific loose SSD

to either machine.

Safe record:
- **ASUS X553MA → SSD installed, exact model unverified**
- **Toshiba C50D-A → SSD installed, exact model unverified**

Earlier statements such as “X553MA got the SanDisk X400” or “C50D-A got a Crucial BX500” should be treated as proposed assignments unless re-verified.

### 23 Sep 2026 — Crosshair V Formula-Z DadLAN tower

A physical SSD-label photo and later CrystalDiskInfo evidence identify:

- **SanDisk SSD Plus 240GB**
- model **SDSSDA240G / SDSSDA-240G**
- firmware **Z32080RL**
- SATA/600, AHCI
- health **Good / 100%**
- temperature about **40°C**
- power-on hours about **335h**
- power-on count **1,054**
- host reads about **4,077GB**
- host writes about **1,793GB**
- unexpected power losses **83**
- recorded bad/reallocated/uncorrectable/CRC errors: **0**

This ties one of the previously loose/tested SanDisk SSD Plus 240GB drives directly to the Crosshair tower by 23 Sep 2026.

The same tower also has a separate **1TB Seagate ST1000DM003 HDD**.

## Evidence-safe SSD state as of 25 Sep 2026

| SSD | Best status supported by recovered evidence |
|---|---|
| KIOXIA KBG40ZNV256G 256GB NVMe | Installed, HP ProBook x360 435 G8 |
| Samsung 870 EVO 250GB | Installed, ThinkPad L480 |
| Samsung 860 EVO 250GB | Confirmed in HP 4230s Aug 2026; same model later photographed loose, so uniqueness/current location unresolved |
| Toshiba THNSNC256GBS 256GB | Installed, Toshiba Tecra P11 |
| MSI SPATIUM S270 240GB | Installed, Toshiba L630 |
| Samsung MZNTY128HDHP-000H1 128GB | Installed, HP ProBook 11 EE G2 |
| SanDisk SSD Plus SDSSDA240G 240GB | Installed, Crosshair V Formula-Z tower |
| ~120GB unknown SSD | Installed/restored to Toshiba L850D |
| ~120–128GB unknown SSD | Installed/restored to Compaq CQ56 |
| unknown SSD | ASUS X553MA; later evidence says SSD-equipped, exact model unverified |
| unknown SSD | Toshiba C50D-A; later evidence says SSD-equipped, exact model unverified |
| SanDisk X400 256GB | photographed loose; later destination not firmly established |
| Crucial BX500 240GB × at least 3 | photographed loose; final destinations not firmly established |
| WD Green 120GB | photographed loose; final destination unknown |
| Kingston SSDNow 300 120GB | photographed loose; final destination unknown |
| Samsung/Lenovo PM871 128GB × about 2 | photographed loose; possible overlap with OEM Samsung stock |
| Samsung 850 EVO 250GB | photographed/tested; 94%; current location not established |
| Toshiba Q Series Pro 128GB | photographed/tested; 99%; current location not established |
| six Kingston 120GB drives | photographed/tested; likely overlap with other Kingston evidence |
| two remaining MSI S270 units | originally part of 3-pack; current whereabouts not proved |

## What still needs re-verification

A future physical/software inventory should capture, for every current DadLAN machine:
1. computer identity
2. SSD/HDD model string
3. serial number if safe to keep privately
4. capacity
5. SMART health
6. current installed/loose status

The highest-priority unresolved loose-stock identities are:
- Crucial BX500 units
- SanDisk X400
- Kingston 120GB units
- WD Green 120GB
- Samsung 850 EVO
- Toshiba Q Series Pro
- the two MSI S270s not yet tied to a current machine

## Provenance note

This reconstruction comes from user-visible ChatGPT conversations and hardware photos/screenshots supplied by Josh, plus DadLAN benchmark/diagnostic outputs discussed in those chats. Original photo binaries are not embedded in this repository by this commit; this document records what the photos and diagnostic screens established and distinguishes certainty from inference.
