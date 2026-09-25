# DadLAN hardware triage transcript — ASUS / Toshiba L50-A / Lenovo T61 — 19–25 Sep 2026

This document preserves the user-visible hardware troubleshooting conversation from 19 Sep 2026, pushed to the DadLAN repository on 25 Sep 2026. Device serial numbers and network identifiers visible in photos are intentionally omitted.

## Final verified outcomes

- Toshiba Satellite L50-A, PSKLEA-00M001: initially had no RAM. Installing the photographed 4GB SK hynix HMT451S6BFR8A-PB PC3L-12800S module restored POST and display. It then reported no bootable device. After Josh fitted another HDD it began booting the DadLAN Windows image.
- Lenovo ThinkPad T61, type 6457-BP2: Intel Core 2 Duo T7500 @ 2.20GHz, 4GB RAM, 20V/4.5A charger. It stayed stable in BIOS for an extended period, while the existing Windows 10 install was extremely slow and entered Automatic Repair. A Windows reset was then started.
- Lenovo model 10160: Celeron J1800 @ 2.41GHz, 4GB RAM, HDD, Windows 10 Pro build 19045; added to DadLAN inventory context.
- P750 donor RAM shown: SK hynix 4GB 1Rx8 PC3L-12800S HMT451S6BFR8A-PB and Samsung 4GB 2Rx8 PC3-10600S M471B5273CH0-CH9. The SK hynix stick was chosen for the L50-A.

## Conversation

### User — 2026-09-19 05:03Z
Uploaded photos of a partially disassembled ASUS laptop and asked:

> What is this missing
>
> Is it fixable? How much to fix?

### Assistant
Tentatively identified it as an ASUS VivoBook X541-series and said it appeared partly stripped. Likely missing/disconnected items included a 2.5-inch HDD/SSD, drive mounting/connector hardware, main battery and an unplugged Wi-Fi antenna lead; the fan was dusty. Recommended proving that the board POSTed before spending money.

### User — 05:06Z
> I don't have a charger

### Assistant
Recommended not buying internal parts yet. First identify the exact model and correct charger, then test whether it reaches BIOS without storage.

### User — 05:07Z
> How much is this laptop worth

### Assistant
Estimated roughly $20–50 as-is/untested, $50–80 if the board and screen were proven good, and around $100–160 fully working depending on specification. Said not to spend heavily before confirming POST.

### User — 05:09Z
Uploaded photos of a Toshiba Satellite L50-A and an HP laptop and said:

> Eh too much effort I think, I have two other laptops, the Toshiba shows power but no screen
>
> The hp shows charge light briefly then goes off

### Assistant
Prioritised the Toshiba. Suggested hard power reset, RAM reseat, external display and torch/backlight test. For the HP, noted a brief charge light could indicate battery, charger/DC jack or motherboard trouble. The Toshiba chassis label showed 19V / 3.95A.

### User — 05:11Z
Uploaded Windows System Information / Task Manager photos for a Lenovo model 10160 showing Celeron J1800, 4GB RAM, HDD and Windows 10 Pro build 19045.

> Add this to one also to our inventory and your memories

### Assistant
Saved the Lenovo 10160 details to memory and added it as a working additional DadLAN system, with fleet number still to be assigned.

### User — 05:27Z
Uploaded further Toshiba L50-A photos confirming part PSKLEA-00M001, 19V / 3.95A, power LEDs and power-button illumination.

### Assistant
Confirmed the exact L50-A identity and noted that the labelled 19V / 3.42A Toshiba supply was below the chassis-rated current. Recommended testing with a suitable 75W-class 19V supply.

### User — 05:30Z
Uploaded a GX-96W universal adaptor labelled for selectable 12/15/16/18/19V up to 4.5A and 20/24V up to 5A, plus several other chargers.

> Yeah I don't have one of those chargers

### Assistant
Pointed out that the GX-96W could provide 19V / up to 4.5A, sufficient for the L50-A if the correct tip and polarity were used. Asked to see the tip set.

### User — 05:34Z
Uploaded photos of the universal adaptor tip set.

### Assistant
Said the correct Toshiba-sized round barrel tip was likely present. Recommended testing fit only with the adaptor unplugged, selecting 19V and ensuring centre-positive polarity.

### User — 05:38Z
Uploaded photos showing the L50-A powered from the universal adaptor, LEDs on and an external Dell monitor connected but blank.

### Assistant
Said the laptop was receiving enough power to remain on and moved the diagnosis to RAM/display. Suggested cycling external display and, if still blank internally/externally, checking RAM.

### User — 05:52Z
Uploaded photos of a Lenovo ThinkPad T61, type 6457-BP2, its charger and underside.

> This one boots
>
> And it says windows 10, what year was this PC made?

### Assistant
Identified it as a ThinkPad T61 from roughly 2007–2008. Noted that Windows 10 was a later upgrade.

### User — 05:53Z
Uploaded the Windows login screen with old workshop accounts.

> How do I factory reset it? No idea about password

### Assistant
Recommended using Windows Recovery to reset/wipe the machine rather than recovering the old accounts, with a clean USB install as fallback if the old Windows reset failed.

### User — 05:54Z
Uploaded a black/shut-down T61 screen.

> Hmm it just randomly shut down on windows login screen

### Assistant
Paused the reset plan and recommended a BIOS stability test first: leave it in BIOS 10–15 minutes, listen for the fan/check heat, and if possible repeat on charger power without the battery.

### User — 05:57Z
> Yeah that's the charger that came with the laptop

### Assistant
Said that made the charger less suspicious and continued with the BIOS stability test.

### User — 06:01Z
Uploaded the T61 BIOS screen showing BIOS 2.26 dated 2009-05-11, Core 2 Duo T7500 @ 2.20GHz and 4096MB RAM.

### Assistant
Recorded those specifications, clarified that the BIOS date was not the machine's manufacture date, and recommended leaving it in BIOS to test stability.
