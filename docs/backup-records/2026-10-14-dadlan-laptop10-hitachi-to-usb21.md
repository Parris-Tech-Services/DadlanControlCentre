# DadLAN Laptop #10: Hitachi HDD Clonezilla preservation session — 14 October 2026

**Status at last directly witnessed:** image creation **started and making progress**, not yet confirmed finished, image-checked or restored. Do not say this backup is complete until verification evidence is supplied.

**Identity correction (user confirmed 14 Oct 2026):** The Hitachi HDD belongs to **DadLAN Laptop #10**. Josh explicitly confirmed its origin. It was installed **temporarily** in a Lenovo ThinkCentre M710s to examine the old installation and produce the backup. Do not treat the Lenovo as Laptop #10 or the HDD as one supplied with the eight Leading Edge refurb computers.

## Source, identity and Windows environment

| Item | Observation / provenance |
| --- | --- |
| Fleet provenance | **DadLAN Laptop #10**, affirmed by Josh; historical inventory identifies Laptop #10 as a **Compaq 610**. This note follows the user's explicit drive-origin confirmation. |
| HDD | Hitachi HTS543212L9A300, nominal **120 GB**, `/dev/sda` **111.8 GiB** on the Lenovo |
| Partition 1 | `/dev/sda1`, **100 MB**, NTFS, **System Reserved** |
| Partition 2 | `/dev/sda2`, **111.7 GiB**, NTFS, Windows system |
| Windows currently booted from HDD | **Windows 10 Home, version 10.0.19045**, **32-bit/x86**; hostname **DESKTOP-MMR0H5N** |
| Hostname link | The 20 Aug 2026 DadLAN Samba session lists Laptop10 at `DESKTOP-MMR0H5N`, independently corroborating the user's drive identification. That is evidence about this Windows install, not proof the temporary Lenovo is Laptop 10. |
| Temporary test machine | **Lenovo ThinkCentre M710s**, machine type/model **10M7A005AU**, **Intel Core i5-7400 3.00 GHz (4 cores)**, **8 GB RAM physically installed** |
| RAM observation | 32-bit Windows reported **8.00 GB installed** but **3.42 GB total physical memory accessible**; replacing the OS with **64-bit** allows access to almost all installed RAM. |
| Lenovo BIOS at test | Legacy boot; BIOS Lenovo M16KT49A dated 24 Apr 2018. Secure Boot shown unsupported in that *current boot configuration*. |
| Disk ownership | Josh personally owns this Hitachi HDD, and separately received the Lenovo for refurbishment. All eight Leading Edge machines reportedly arrived **without installed storage**. |

The Windows Setup screenshot showed the 100 MB system-reserved partition and 111.7 GB primary partition. **No Windows installer partition deletion or formatting was performed during the documented backup setup.** Josh was considering Windows 11 64-bit for the **Lenovo** after preservation, which would be an unsupported-CPU installation on an i5-7400. Windows 10 standard support ended in 2025; preserve this old Win10 installation as historical data, not as a recommended current daily-use OS.

## Boot medium, destination, and Clonezilla workflow

| Role | Observed device |
| --- | --- |
| Live boot tool | **USB #6 SanDisk Cruzer Edge**, ~14.9 GiB, Ventoy carrying **Clonezilla Live 3.3.3-37 amd64**; presented as `/dev/sdb` |
| Backup destination | **USB #21 General UDisk**, nominal 32 GB, ~29.3 GiB, one FAT32 (`vfat`) partition **`/dev/sdc1`**; source device `/dev/sdc` |
| Destination prior inspection | MBR / active FAT32, volume serial **02DEADF1**, originally empty apart from system metadata; device firmware **5.00**, no usable USB device serial reported |
| Clonezilla operation | `device-image` → `local_dev` → `sdc1` → `Beginner` → **`savedisk`**, **source `sda`** |
| Image directory name | **`2026-10-14-12-img`**, on USB #21, selected destination directory `/` |
| Compression | **`zstdmt`** (multi-threaded Zstandard) selected |
| Partition capture | Clonezilla enumerated **`sda1` and `sda2`** for the whole-disk image |
| Space constraint | Source NTFS file system reported **~29.8 GB occupied** during Partclone imaging; destination only **~29.3 GiB**. Image *may* fit after compression, but this had not been demonstrated at last check. |
| FAT32 constraint | Single files cannot exceed **4 GiB minus 1 byte**. Confirm Clonezilla uses image-file splitting and check all resulting parts; do not infer that it was verified merely because FAT32 was mounted. |

### Actual sequence and troubleshooting

1. Josh investigated why 8 GB installed RAM was limited to ~3.42 GB: source Windows was x86/32-bit, not a faulty RAM module.
2. A Windows installation was started for evaluation but **stopped before erasing** the original HDD, so the original installation could be preserved.
3. The Clonezilla ISO started through Ventoy Normal Mode with heavy horizontal graphics corruption. Rebooting via **Ventoy GRUB2 Mode** reached the GNU GRUB Clonezilla menu; **Clonezilla live (VGA 800x600)** booted successfully.
4. Transient boot messages included VMX disabled outside TXT, SGX disabled/unsupported, and an audio device warning. These did not prevent Clonezilla launching.
5. Initial attempt: `device-image` → Samba/NAS. Network DHCP succeeded, but the NAS was on a different work subnet. SMB mount failed with **error (115), could not connect**, ping had **100% loss**, and TCP/445 checks returned **FAILED**. No NAS image was created by that attempt. Do not publish private credentials or work-network topology.
6. Switched to local USB: `lsblk` positively identified **`sda` Hitachi**, **`sdb` Cruzer Edge**, **`sdc` UDisk**. Selected `sdc1` as image repository, skipped automatic filesystem repair (`no-fsck`), selected `savedisk` and source `sda`.
7. At approx. **12:19 AEDT, 14 Oct 2026**, the Partclone progress screenshot showed imaging of `/dev/sda2` in progress: **4.14% data blocks processed**, elapsed **00:00:22**, estimate about **8m28s remaining**, no errors visibly reported at that moment. This is **not evidence of final completion**.

## Mandatory follow-up before wiping/reinstalling

- [ ] Observe **successful completion** of Clonezilla with no disk or destination-space errors, and record outcome / time.
- [ ] Use **Clonezilla image verification/check** against `2026-10-14-12-img` on USB #21; record result. Ideally conduct a test restoration to another spare disk before declaring the image independently restorable.
- [ ] Confirm image directory contains the required parts, all split files, and adequate actual occupied capacity. **Do not** mistake FAT32 free space or an empty folder for a valid backup.
- [ ] Copy the **entire image directory** to a private, appropriately authorised backup location (for example Josh's personal NAS from a device with network access) and check the copied files. Do not upload private raw disk-image contents to GitHub.
- [ ] Record restored/source-disk relationship for DadLAN Laptop #10 in inventory; do not change its hardware model or claim the HDD remains fitted after removal.
- [ ] Only after backup confirmation, decide on wiping/reusing the personally owned HDD in the Lenovo and installing a 64-bit OS. For a donated/refurbished machine consider an officially supported OS; the Lenovo i5-7400 is not on Microsoft's Windows 11 supported CPU list.
- [ ] Change the personal QNAP administrator password previously shown visibly in a photo; store no passwords, access tokens or secrets here.

## Related records

- [USB #21 media record](../usb-inventory/USB-21-2026-10-14.md)
- [DadLAN historic hardware inventory](../data/laptop-inventory-2026-08-03.csv)
- [DadLAN Laptop10 previous Samba/hostname proof](../DADLAN-SAMBA-VSCODE-NETWORK-CHAT-TRANSCRIPT-2026-08-20.md)
- [DubboEwaste Lenovo refurbishment field note](https://github.com/joshualparris/DubboEwaste/blob/main/docs/field-notes/2026-10-14-lenovo-hitachi-laptop10.md)

**Records reflect screenshots and user confirmations, not independent remote inspection of the physical drives or successful restoration.**
