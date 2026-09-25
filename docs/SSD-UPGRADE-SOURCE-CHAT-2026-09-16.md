# SSD upgrade source chat — 16 Sep 2026

This file preserves the user-visible SSD / laptop-upgrade conversation from **16 Sep 2026 AEST** (messages were timestamped late 15 Sep UTC), archived to DadLAN Control Centre on **25 Sep 2026** at Josh's request.

This is a transcript/evidence record, not a fresh hardware audit. It intentionally preserves corrections and mistakes made during the conversation. Where image attachments were part of the chat, short attachment notes are included rather than embedding the original binaries.

---

## User — 2026-09-15 22:28:30Z / 2026-09-16 08:28:30 AEST

[3 image attachments: a hand holding a stack of 2.5-inch laptop drives, shown from the side/connectors.]

> Are any of these laptop ssds?

## Assistant

They’re definitely **2.5-inch laptop SATA drives**, but from these angles **most of them look like traditional mechanical HDDs rather than SSDs**. The exposed green circuit boards, metal bodies and thicker construction are typical laptop hard drives.

There are **one or two in the middle that I can’t confidently rule out as SSDs** because their cases/labels are obscured.

If you spread them out **label-side up in one photo**, I can identify each one and tell you:
- HDD vs SSD
- capacity
- SATA speed/type
- which ones are worth keeping.

---

## User — 2026-09-15 22:29:57Z / 2026-09-16 08:29:57 AEST

[5 image attachments: labelled 2.5-inch drives including HGST, Samsung/Seagate Spinpoint, Seagate Mobile HDD, Toshiba and WD Blue units.]

## Assistant

No — **every drive I can clearly identify in these new photos is a mechanical 2.5-inch SATA HDD, not an SSD.**

I can see:
- **HGST 1TB 5400 RPM** — HDD
- **Samsung/Seagate Spinpoint 2TB (ST2000LM003)** — HDD
- **Seagate Mobile HDD 1TB** — HDD
- **Toshiba 1TB 5400 RPM** — HDD
- **Seagate Laptop HDD 1TB (ST1000LM024)** — HDD
- **Western Digital Blue 1TB 5400 RPM (WD10SPZX)** — HDD

The giveaways are the **5400 RPM markings**, “Mobile/Laptop HDD”, breather-hole warnings, and the stamped metal housings for spinning platters.

So from everything photographed so far, **I haven't spotted a SATA SSD yet**.

The good news is you've got quite a few **1–2 TB laptop HDDs**, which could still be useful as bulk storage, backups, USB external drives, or secondary drives. Also, if you've got another pile, send a photo like these and I can pick out an SSD almost immediately.

---

## User — 2026-09-15 22:33:13Z / 2026-09-16 08:33:13 AEST

[8 image attachments: a drawer/stock area containing multiple 2.5-inch SSDs and some HDDs. Clearly visible labels included Crucial BX500 240GB units, SanDisk X400 256GB, Samsung 860 EVO 250GB, WD Green 120GB, Kingston SSDNow 300 120GB, SanDisk X400 256GB, Samsung/Lenovo OEM SSDs, plus HGST/Toshiba/WD HDDs.]

## Assistant

Yes — **this drawer has a bunch of SSDs.** Much better haul than the first pile.

From the labels I can clearly identify:

- **Samsung 860 EVO — 250GB SATA SSD** ⭐
- **SanDisk X400 — 256GB SATA SSD**
- **Crucial BX500 — 240GB SATA SSD** — I can see **at least 3**
- **WD Green — 120GB SATA SSD**
- **Kingston SSDNow 300 — 120GB SATA SSD**
- **Samsung/Lenovo PM871 — 128GB SATA SSD** — looks like **2 of these**
- The partly tape-covered **240GB drive** also appears to be another SSD, probably another Crucial.

So you've got roughly **9–10 usable 2.5-inch SATA SSDs** visible here.

For putting into laptops, I'd grab the **Samsung 860 EVO 250GB first**, then the **SanDisk X400 256GB**, then the **Crucial BX500 240GBs**.

The silver HGST/Toshiba/WD/Seagate drives on the right/bottom are mechanical HDDs. Also, several of those **HGST 900GB 10K drives are SAS**, not normal SATA laptop drives, so don't try forcing those into a laptop SATA connector.

If your aim is upgrading that **ProBook or your DadLAN machines**, these SSDs are absolutely the ones I'd use.

---

## User — 2026-09-15 22:34:59Z / 2026-09-16 08:34:59 AEST

> But the probook already has ssd
>
> Look at our previous chat history for specifica

## Assistant

Yep — you’re right. I checked the earlier ProBook context.

Your **HP ProBook 11 G2 already has a Samsung MZNTY128HDHP-000H1 128GB SATA SSD**. We’d also confirmed that its **SMART and Short DST tests passed**, so there wasn’t evidence the SSD was failing.

The ProBook we were working with was the **2016 ProBook 11 G2, Core i3-6100U, 4GB RAM**, and the more useful upgrade we’d identified was **RAM to 8GB**, rather than swapping the SSD.

So I **wouldn’t use one of these drawer SSDs in the ProBook just for the sake of it**. The 240–256GB drives would only be worthwhile there if you specifically want roughly double the storage.

---

## User — 2026-09-15 22:35:34Z / 2026-09-16 08:35:34 AEST

> Look at all our laptops and which need ssd upgrades specifically

## Assistant

Yep. Looking back through our DadLAN inventory and the storage checks we did, the picture is quite clear.

| Laptop | Current drive | SSD upgrade? | What I’d use from this drawer |
|---|---|---|---|
| **#1 HP ProBook x360 435 G8** | 256GB SSD | ❌ No | Leave it |
| **#2 Lenovo ThinkPad L480** | 256GB SSD | ❌ No | Leave it |
| **#3 Toshiba Satellite L850D** | **HDD** | ✅ **Yes — highest priority** | **Samsung 860 EVO 250GB** |
| **#4 HP ProBook 4230s** | SSD | ❌ No | Leave it |
| **#5 Toshiba Tecra P11** | SSD | ❌ No | Leave it |
| **#6 Toshiba Satellite L630** | SSD | ❌ No | Leave it |
| **#7 ASUS X553MA** | **500GB HDD** | ✅ **Yes** | SanDisk X400 256GB / Crucial BX500 240GB |
| **#8 Toshiba Satellite C50D-A** | **750GB HDD** | ✅ Yes, but low-end machine | Crucial BX500 240GB |
| **#9 Compaq Presario CQ56** | **500GB HDD** | ✅ Yes, if we're keeping it | One of the 120–128GB SSDs |
| **#10 Compaq 610** | **120GB HDD** | ⚠️ Probably don't bother | We previously marked this one for retirement |
| **HP ProBook 11 G2** | **Samsung 128GB SSD** | ❌ No | RAM is the more useful upgrade |

So the **four actual SSD-upgrade candidates are #3, #7, #8 and #9**. Of those, I'd spend the good SSDs in this order:

**L850D → X553MA → C50D-A → CQ56.**

The L850D is the one I'd do **first**. It's one of the more useful older DadLAN laptops, and the spinning HDD is one of its main remaining bottlenecks. The C50D-A and CQ56 will feel substantially snappier with SSDs too, but their CPUs remain quite limiting.

And because you've got several 240–256GB SATA SSDs sitting there, **we can actually eliminate HDD boot drives from essentially every DadLAN laptop worth retaining without buying anything**.

---

## User — 2026-09-15 22:56:02Z / 2026-09-16 08:56:02 AEST

[10 image attachments: Custom Computers parts/storage room showing shelves, boxes, RAM tubs, power supplies, drives, fans, GPUs, optical drives and assorted components.]

> Where are ssds most likely to live here

## Assistant

The **most likely SSD spots are in the black shelving area**, not the big server/HDD piles.

The first place I’d check is the **middle shelf in photo 4/6**, where there’s a cardboard box labelled **“OEM MAINBOARD M.2 + NVMe SSD SHIELDS + HEATSINKS”**. Even if that box is nominally heatsinks/shields, whoever organised this room is clearly grouping **M.2/NVMe-related parts there**, so loose M.2 SSDs are very likely nearby.

Second, check the **small clear plastic tubs and anti-static bags beside the DDR4/DDR2 RAM bins** in photos 8–9. M.2 SSDs are small enough that they’re often stored with RAM, Wi-Fi cards and other laptop components.

For the **2.5-inch SATA SSDs** like the Samsung 860 EVO / Crucial BX500s you showed earlier, I’d look in the **low black drawers/cubbies around those shelves**, or any box containing laptop drives. They’re physically identical in footprint to the 2.5-inch HDDs, so they may simply be mixed together.

I’d search in this order:

1. **“M.2 + NVMe SSD shields/heatsinks” shelf**
2. **Clear tubs / anti-static bags near DDR RAM**
3. **Laptop-drive boxes/drawers**
4. **Motherboard/accessory boxes**
5. Only then the larger miscellaneous HDD/server-drive piles

If you take **one closer photo of each shelf/drawer**, I can basically guide you around the room and say **“open that box / skip that one”**.

---

## User — 2026-09-15 22:58:20Z / 2026-09-16 08:58:20 AEST

[6 image attachments: closer views of the shelves and labelled cardboard SSD sorter. Labels included “OEM MAINBOARD M.2 + NVME SSD SHIELDS + HEATSINKS”, RAM bins, and a small sorter labelled by capacities/interfaces such as 128GB NVMe, 128GB M.2 SATA, 128GB mSATA, 250GB 2.5-inch SATA and 120GB 2.5-inch SATA.]

## Assistant

Yep — **you’ve found the actual SSD storage area now**.

The strongest evidence is the little cardboard sorter in your photos. I can read compartments labelled roughly:

- **128GB NVMe**
- **128GB M.2 SATA**
- **128GB mSATA**
- and another section for **2.5" SATA SSDs**

The small box you’re holding is even more explicit: one side says **250GB 2.5" SATA**, the other says **120GB 2.5" SATA**. The black rectangular drives inside that box are almost certainly the same kind of 2.5-inch SATA SSDs as the Crucial/Samsung ones you showed earlier.

So I’d focus here now, not the HDD drawers.

For our laptops, the most useful finds would be:
- **240/250/256GB 2.5" SATA SSDs** for the older DadLAN laptops that still have HDDs
- **larger 500GB+ 2.5" SATA SSDs** if any are hiding in those compartments
- NVMe/M.2 drives are useful too, but **not for the old laptops we were targeting unless that specific laptop supports them**

The **“OEM mainboard M.2 + NVMe SSD shields/heatsinks”** box looks mostly like brackets/heatsinks, whereas **this labelled SSD sorter is the jackpot**.

If you pull everything out of the **250GB 2.5" SATA section** and photograph the labels face-up, I can tell you which 3–4 are best to take for the laptop upgrades.

---

## User — 2026-09-15 22:59:54Z / 2026-09-16 08:59:54 AEST

[6 image attachments: individual SSDs laid out on carpet, including multiple Kingston 120GB units with health labels, Toshiba Q Series Pro 128GB 99%, Samsung 850 EVO 250GB 94%, and SanDisk SSD Plus 240GB marked “Flawless”.]

> How much do these cost each individually?

## Assistant

For these specific **used SATA SSDs**, I’d value them roughly like this in Australia right now:

| Drive | Condition shown | Fair used value |
|---|---:|---:|
| Kingston 120GB | 87% | **$20–25** |
| Kingston 120GB | “Flawless” | **$25–35** |
| Toshiba Q Series Pro 128GB | 99% | **$25–35** |
| Kingston 120GB | 95% | **$25–30** |
| Kingston 120GB | 88% | **$20–25** |
| Kingston 120GB | 92% | **$20–30** |
| **Samsung 850 EVO 250GB** | 94% | **$45–55** |
| **SanDisk SSD Plus 240GB** | “Flawless” | **$35–45** |

That puts the whole group at roughly **$215–280 used value**.

The market backs that up fairly well: used Kingston 120GB SATA SSDs are commonly around **$20–$35 each**, used Samsung 850 EVO 250GB drives are around **$50–60**, and used SanDisk 240GB SSD Plus drives are around **$30–45**.

The Toshiba Q Series Pro 128GB is older but actually a decent drive; current used examples are roughly equivalent to **A$30-ish before postage**, so I wouldn’t treat it as junk.

For DadLAN, I’d particularly grab the **Samsung 850 EVO 250GB** and **SanDisk 240GB**. Those are materially more useful than the 120GB ones.

---

## User — 2026-09-15 23:02:39Z / 2026-09-16 09:02:39 AEST

> So if I offered Brendon custom computers $65 to $90 for the first 3 or 4 in that list for laptops 3, 7 and 8, and maybe 9 would that be good?
>
> Kingston 120GB  
> 87%  
> $20–25  
> Kingston 120GB  
> “Flawless”  
> $25–35  
> Toshiba Q Series Pro 128GB  
> 99%  
> $25–35  
> Kingston 120GB  
> 95%  
> $25–30

## Assistant

Yes — **$65–$90 total is a sensible offer**, especially if Brendan is happy to sell them as tested used stock.

Current Australian listings put used Kingston 120GB SATA SSDs broadly around **$20–$35 each**, with examples around that range depending on condition.

So I’d frame it as: **$65 for 3 = ~$22 each**, which is a good deal for you but still reasonable; **$80–$90 for 4 = $20–$22.50 each**, also fair. I probably **wouldn’t go beyond $90 for those four**, because 120/128GB SATA SSDs are now pretty small despite being perfectly useful DadLAN boot drives.

For laptops **#3, #7 and #8**, absolutely. For **#9**, yes if we’re keeping it in service. I’d offer Brendan something like **“Would you take $85 for these four?”** and be quite comfortable at $90.

One wrinkle: because you also found that **250GB Samsung 850 EVO (94%) and 240GB SanDisk**, I’d actually prefer those for the more useful DadLAN machines and use the 120/128GB drives for the lowest-priority nodes. They give you much more breathing room for essentially the same physical installation effort.

---

## User — 2026-09-15 23:05:19Z / 2026-09-16 09:05:19 AEST

> Doesn't 8 already have ssd?
>
> So we only need like 3x ssds for 3, 7 and 9?

## Assistant

You remembered something real, but the **latest fleet state says #8 does not currently have an SSD**.

An older DadLAN note says the **SSD was moved out of the C50D-A (#8) into the P750**, with an HDD moved back into the C50D-A. The later benchmark confirms #8 currently has a **750GB HGST mechanical HDD**.

For what’s actually worth spending money on, though, I’d buy **3 SSDs max**:

- **#3 L850D** — definitely; HDD is a significant bottleneck.
- **#7 X553MA** — yes if the SSD is cheap/spare.
- **#9 CQ56** — only because these SSDs are cheap; it still has a 500GB HDD.
- **#8 C50D-A** — leave the HDD in it. Its very weak E1-2100 CPU is the real problem, and our fleet plan says replace it rather than spend on it.

So **yes: I’d negotiate for 3 drives for #3, #7 and #9**, not four. And I'd try **$60–$65 for three of those 120/128GB SSDs** first.

---

## User — 2026-09-15 23:07:27Z / 2026-09-16 09:07:27 AEST

> You are right
>
> I checked
>
> 3, 78910 all don't have ssd's

## Assistant

Yep — that lines up cleanly now.

So the **verified HDD-only DadLAN machines are #3, #7, #8, #9 and #10**.

For upgrades, I’d still prioritise **#3 first**, then **#7**, then **#9**. I’d leave **#8 and #10** alone unless you end up with spare SSDs for basically nothing, because their CPUs are the bigger limitation.

---

## User — 2026-09-25 10:19:15Z / 2026-09-25 20:19:15 AEST

> Push this whole conversation to our most relevant GitHub repo

## Archive destination

**Repository:** `Parris-Tech-Services/DadlanControlCentre`

This conversation is directly relevant to DadLAN fleet storage, SSD sourcing, upgrade priorities and the September 2026 hardware evidence trail.

## Key evidence carried forward

The strongest source-chat facts are:

- On **16 Sep 2026**, Josh physically checked the fleet and confirmed that **DadLAN #3, #7, #8, #9 and #10 did not have SSDs at that time**.
- The ProBook 11 G2 already had a **Samsung MZNTY128HDHP-000H1 128GB SATA SSD**, so RAM rather than storage was the priority.
- Custom Computers stock photographed in the chat included multiple 120–256GB 2.5-inch SATA SSDs, including **Samsung 850/860 EVO, SanDisk X400/SSD Plus, Crucial BX500, WD Green, Toshiba Q Series Pro and Kingston SSDs**.
- The upgrade priority discussed was **#3 L850D first, #7 X553MA second, #9 CQ56 third**, while **#8 C50D-A and #10 Compaq 610** were poor candidates for paid SSD upgrades because CPU/platform limitations were more severe.
- Price/offer discussion centred on roughly **A$60–65 for three 120/128GB SSDs** or up to around **A$90 for four**, subject to condition and seller agreement.

