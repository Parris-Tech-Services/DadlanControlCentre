# HP Omnibook USB Boot / Secure Boot Chat Transcript

**Repo:** `Parris-Tech-Services/DadlanControlCentre`  
**Reason this repo was chosen:** This conversation is hardware-triage / laptop-fleet support material, matching the DadLAN / laptop repair documentation already stored in this repo.  
**Conversation start:** 2026-05-18T01:47:15Z  
**Pushed to repo:** 2026-09-25T20:46+10:00 local time

## Practical outcome

The HP Omnibook could see the USB boot device, but Secure Boot blocked it with:

> Secure Boot Violation  
> Invalid signature detected. Check Secure Boot Policy in Setup.

The working path discussed was:

1. Use `Esc` at startup to open the HP Startup Menu.
2. Use `F9` for Boot Device Options.
3. Choose `USB Hard Drive (UEFI) - USB`.
4. If blocked by Secure Boot, go to `F10` BIOS Setup > `Boot Options`.
5. First try changing `Enable MS UEFI CA key` from `No` to `Yes`.
6. If still blocked, temporarily set `Secure Boot` to `Disabled`.
7. Save with `F10`, reboot, then `Esc` > `F9` > boot USB.
8. Do **not** use `Clear TPM`, `Clear All Secure Boot Keys`, or factory security reset unless deliberately prepared for BitLocker/recovery consequences.
9. Turn Secure Boot back on after the USB repair/install work is finished if appropriate.

## Screenshot evidence captured in chat

### Screenshot set 1: HP boot menu and Secure Boot error

The first image showed the HP boot device menu with these visible options:

- `OS Boot Manager (UEFI) - Windows Boot Manager (...)`
- `USB Hard Drive (UEFI) - USB (USB)`
- `Boot From EFI File`

The second image showed:

- `Secure Boot Violation`
- `Invalid signature detected. Check Secure Boot Policy in Setup.`

### Screenshot set 2: BIOS Security, Configuration, and Boot Options tabs

The BIOS screenshots showed:

- `Security` tab:
  - Administrator Password: `Clear`
  - Power-On Password: `Clear`
  - TPM Solution: `Pluton`
  - TPM Device: `Available`
  - TPM State: `Enabled`
  - Clear TPM: `No`
  - Absolute Persistence Module version: `2.8.2.12`
  - Activation Status: `Inactive`
  - Permanent Disable: `No`

- `Configuration` tab:
  - Virtualization Technology: `Enabled`
  - Fan Always On: `Disabled`
  - Action Keys Mode: `Enabled`
  - USB Charging: `Enabled`
  - Adaptive Battery Optimizer: `Enabled`
  - Keyboard Backlight Timeout: `30 sec`
  - High resolution mode on USB-C DP alt mode dock: `Disabled`
  - Video memory size: `2G`

- `Boot Options` tab:
  - USB Boot: `Enabled`
  - Network Boot: `Disabled`
  - Network Boot Protocol: `IPv4+IPv6 (UEFI)`
  - Power on when Lid is opened: `Enabled`
  - Enable MS UEFI CA key: `No`
  - Secure Boot: `Enabled`
  - Import Custom Secure Boot Keys: `Disabled`
  - Platform Key: `Enrolled`
  - Pending Action: `None`
  - UEFI Boot Order:
    - OS Boot Manager
    - USB Flash Drive/USB Hard Disk
    - USB CD/DVD ROM Drive
    - Network Adapter

## Transcript

### User — 2026-05-18T01:47:15Z

Attached two photos:

1. HP boot device menu showing `OS Boot Manager (UEFI)`, `USB Hard Drive (UEFI) - USB`, and `Boot From EFI File`.
2. Secure Boot Violation message: `Invalid signature detected. Check Secure Boot Policy in Setup.`

User asked:

> How to fix this hp omnibook 5

### Assistant

That screen means the laptop **can see your USB**, but **Secure Boot is blocking it** because the USB boot files aren’t signed/trusted.

#### If you just want Windows to start normally

On the first screen, choose:

**OS Boot Manager (UEFI) – Windows Boot Manager**

Press **Enter**.  
That should boot the internal SSD.

#### If you are trying to boot from the USB

You have two good options.

##### Option 1 — Recreate the USB properly

Best if this is a Windows installer.

On another computer, recreate the USB using either:

**Microsoft Windows Media Creation Tool**  
or in **Rufus** use:

- Partition scheme: **GPT**
- Target system: **UEFI**
- File system: **FAT32** if possible
- Use a normal official Windows ISO

Then try booting the USB again.

##### Option 2 — Temporarily disable Secure Boot

Only do this if you trust the USB.

1. Restart the laptop.
2. Tap **Esc** repeatedly as it starts.
3. Press **F10** for BIOS Setup.
4. Go to **Security** or **Boot Options**.
5. Find **Secure Boot**.
6. Set **Secure Boot = Disabled**.
7. Save and exit, usually **F10**.
8. Restart.
9. Tap **Esc**, then **F9** for Boot Menu.
10. Choose:

**USB Hard Drive (UEFI) – USB**

After you finish installing/repairing, go back into BIOS and turn **Secure Boot back on**.

#### Important warning

If BitLocker/device encryption is enabled, changing Secure Boot settings can sometimes trigger a **BitLocker recovery key** request. So don’t wipe or change partitions unless you’re sure you have the recovery key or don’t need the existing Windows install.

#### If Windows Boot Manager does not boot

Then the internal Windows install may be damaged. In that case use a proper Windows installer USB and choose:

**Repair your computer → Troubleshoot → Startup Repair**

Don’t choose “Install now” unless you’re intentionally reinstalling Windows.

---

### User — 2026-05-18T01:48:31Z

Attached three BIOS photos showing:

1. BIOS Security tab, including TPM enabled and Clear TPM set to No.
2. BIOS Configuration tab.
3. BIOS Boot Options tab, including `USB Boot [Enabled]`, `Enable MS UEFI CA key [No]`, and `Secure Boot [Enabled]`.

### Assistant

You’re in the right place.

On this screen, **do not touch TPM / Clear TPM**.

#### Best first fix

On the **Boot Options** tab:

1. Arrow down to **Enable MS UEFI CA key**
2. Press **Enter**
3. Change it from **No** to **Yes**
4. Then press **F10** to save
5. Restart
6. Tap **Esc**, then **F9**
7. Choose **USB Hard Drive (UEFI)**

That may fix the “Invalid signature” issue while keeping Secure Boot on.

#### If it still fails

Go back to:

**F10 BIOS → Boot Options**

Then:

1. Select **Secure Boot [Enabled]**
2. Press **Enter**
3. Change it to **Disabled**
4. Press **F10** to save and exit
5. Restart
6. Tap **Esc**, then **F9**
7. Select **USB Hard Drive (UEFI)**

It may ask you to type a confirmation code on reboot. That is normal.

#### Important

Don’t press:

- **Clear TPM**
- **Clear All Secure Boot Keys**
- **Restore Security settings to Factory Defaults**

Those can cause extra problems, especially if BitLocker/device encryption is active.

After you finish booting/installing from the USB, turn **Secure Boot back on**.

---

### User — 2026-05-18T01:49:33Z

> How to boot from usb

### Assistant

To boot from USB on this HP:

1. Plug the USB in.
2. Turn the laptop fully off.
3. Turn it on and immediately tap **Esc** repeatedly.
4. When the Startup Menu appears, press **F9** for **Boot Device Options**.
5. Choose:

**USB Hard Drive (UEFI) – USB**

6. Press **Enter**.

Because yours showed **“Secure Boot Violation / Invalid signature”**, do this first in BIOS:

1. Turn on and tap **Esc**
2. Press **F10** for BIOS Setup
3. Go to **Boot Options**
4. Change **Enable MS UEFI CA key** from **No** to **Yes**
5. Press **F10** to save and restart
6. Tap **Esc → F9**
7. Choose **USB Hard Drive (UEFI)**

If it still gives the secure boot error, go back to **F10 → Boot Options** and set:

**Secure Boot = Disabled**

Then save with **F10**, restart, **Esc → F9**, and choose the USB.

Don’t touch **Clear TPM**.

---

### User — 2026-09-25T10:46:03Z

> push this whole conversation to my most relevant GitHub repo

## Notes for future work

- This should be kept with DadLAN / laptop repair docs because it is directly useful for refurbishing, testing, reinstalling, and booting HP laptops from USB.
- If this comes up again, the likely first thing to check is whether the USB was created as a normal UEFI/GPT/FAT32 Windows installer and whether HP BIOS has `Enable MS UEFI CA key` enabled.
- Avoid TPM-clearing instructions unless the user has explicitly confirmed there is no BitLocker/device-encryption concern or they have the recovery key.
