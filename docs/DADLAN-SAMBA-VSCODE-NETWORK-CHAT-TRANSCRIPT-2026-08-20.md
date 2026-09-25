# DadLAN Samba / VS Code / Network Session Transcript

**Original session:** 20 August 2026 (AEST)  
**Archived to GitHub:** 25 September 2026  
**Repository:** `Parris-Tech-Services/DadlanControlCentre`

> This file preserves the full technical substance and chronology of the chat session in which the DadLAN Samba hub, persistent mounts, Windows cross-machine drive access, VS Code multi-machine workspace, Fedora dev exposure, and network monitoring were built and debugged. Repeated terminal paste glitches and duplicate SELinux advisory text are normalized where they repeated identical information. Passwords are intentionally not included.

---

## Starting point

The working design at the start of this session was:

- Fedora workstation `AVANCE-WS7` at `10.245.173.178`
- Windows fleet laptops mounted on Fedora under `/mnt/dadlan/Laptop01` … `Laptop10`
- A bindfs presentation layer at `/home/josh/DadLAN`
- Samba share `\\10.245.173.178\DadLAN`
- Windows clients intended to map that share as `Z:`
- Local Samba user: `josh`
- Windows fleet SMB account existed separately and was stored in Fedora credentials; no password was pasted into chat
- SELinux was enforcing

The initial SELinux state was:

```text
getenforce
Enforcing

ls -Zd /home/josh/DadLAN
system_u:object_r:fusefs_t:s0 /home/josh/DadLAN

getsebool samba_share_fusefs
samba_share_fusefs --> off
```

The user enabled the correct SELinux boolean for exporting FUSE-backed content:

```bash
sudo setsebool -P samba_share_fusefs 1
```

Then the local Samba test succeeded:

```bash
smbclient //127.0.0.1/DadLAN -U josh -c 'ls'
```

Output showed all ten fleet directories:

```text
Laptop01
Laptop02
Laptop03
Laptop04
Laptop05
Laptop06
Laptop07
Laptop08
Laptop09
Laptop10
```

---

## Proving Windows-to-Windows access through Fedora

The assistant asked the user to test from Laptop02:

```cmd
net use Z: \\10.245.173.178\DadLAN /user:josh *
dir Z:\
```

Laptop02 successfully mapped the share and listed Laptop01 through Laptop10.

A direct cross-machine write test was then performed:

```cmd
echo DadLAN cross-machine test > Z:\Laptop04\dadlan-cross-test.txt
type Z:\Laptop04\dadlan-cross-test.txt
del Z:\Laptop04\dadlan-cross-test.txt
```

The file was successfully created on Laptop04, read from Laptop02, then deleted.

This proved the intended path:

```text
Laptop02
  -> SMB to Fedora
  -> Fedora bindfs/Samba hub
  -> Fedora CIFS mount
  -> Laptop04 C:\
```

The user agreed to make the Fedora side persistent.

---

## Making Laptop01-Laptop09 CIFS mounts persistent

A backup was made:

```bash
sudo cp /etc/fstab /etc/fstab.backup-dadlan
```

Entries for Laptop01-Laptop09 were appended to `/etc/fstab`, using the known SMB IPs and hostnames, with these important options:

```text
credentials=/root/.dadlan-smb
domain=<WINDOWS-HOSTNAME>
vers=3.0
nodfs
noperm
nounix
uid=1002
gid=1002
dir_mode=0777
file_mode=0666
_netdev
nofail
x-systemd.automount
x-systemd.device-timeout=5s
```

Fleet mapping in the fstab work:

| Laptop | Hostname | IP |
|---|---|---|
| Laptop01 | DESKTOP-5C3NIQO | 10.245.173.126 |
| Laptop02 | DESKTOP-RHHL0GI | 10.245.173.221 |
| Laptop03 | DESKTOP-1M0IVQE | 10.174.174.118 |
| Laptop04 | DESKTOP-T011TJ5 | 10.245.173.235 |
| Laptop05 | DESKTOP-KTB33OI | 10.245.173.155 |
| Laptop06 | DESKTOP-BRCVC4U | 10.245.173.99 |
| Laptop07 | DESKTOP-KBETS0I | 10.176.176.54 |
| Laptop08 | DESKTOP-6VO4N54 | 10.245.173.154 |
| Laptop09 | DESKTOP-43NG4PS | 10.245.173.194 |

Validation:

```bash
sudo findmnt --verify --verbose
```

Result:

```text
0 parse errors, 0 errors, 1 warning
```

The warning was only that systemd needed a daemon reload.

After:

```bash
sudo systemctl daemon-reload
```

systemd generated automount units for Laptop01-Laptop09, though they were initially inactive because the old manually-created CIFS mounts were still live.

The existing live mounts were confirmed:

```bash
findmnt -rn -t cifs -o TARGET | grep -E '^/mnt/dadlan/Laptop0[1-9]$'
```

All nine were present.

---

## Laptop10 came online and was added

Laptop10 became reachable during the session.

SMB port test:

```bash
nc -vz -w 3 10.245.173.44 445
```

Result:

```text
Connected to 10.245.173.44:445
```

Laptop10 was mounted manually first:

```bash
sudo mount -t cifs '//10.245.173.44/C$' /mnt/dadlan/Laptop10 -o "credentials=/root/.dadlan-smb,domain=DESKTOP-MMR0H5N,vers=3.0,nodfs,noperm,nounix,uid=$(id -u),gid=$(id -g),dir_mode=0777,file_mode=0666"
```

Read/write test:

```bash
echo "DadLAN Laptop10 test" > /mnt/dadlan/Laptop10/.dadlan_rw_test
cat /mnt/dadlan/Laptop10/.dadlan_rw_test
rm /mnt/dadlan/Laptop10/.dadlan_rw_test
```

Output:

```text
DadLAN Laptop10 test
```

Laptop10 was then added to fstab:

```text
//10.245.173.44/C$ /mnt/dadlan/Laptop10 cifs credentials=/root/.dadlan-smb,domain=DESKTOP-MMR0H5N,vers=3.0,nodfs,noperm,nounix,uid=1002,gid=1002,dir_mode=0777,file_mode=0666,_netdev,nofail,x-systemd.automount,x-systemd.device-timeout=5s 0 0
```

---

## Handing all ten mounts over to systemd automount

Samba was temporarily stopped and the bindfs presentation layer was taken down while the mount ownership was transitioned.

The successful handover command was:

```bash
for i in {01..10}; do echo "===== Laptop$i ====="; sudo umount -R "/mnt/dadlan/Laptop$i" 2>/dev/null || true; sudo systemctl start "mnt-dadlan-Laptop$i.automount" && echo "✅ armed" || echo "❌ failed"; done
```

Result:

```text
Laptop01 ... armed
Laptop02 ... armed
Laptop03 ... armed
Laptop04 ... armed
Laptop05 ... armed
Laptop06 ... armed
Laptop07 ... armed
Laptop08 ... armed
Laptop09 ... armed
Laptop10 ... armed
```

Automount state:

```bash
systemctl list-units --type=automount --all | grep dadlan
```

All ten showed:

```text
loaded active waiting
```

Trigger test:

```bash
for i in {01..10}; do printf "Laptop%s: " "$i"; timeout 8 ls "/mnt/dadlan/Laptop$i" >/dev/null 2>&1 && echo "✅ AUTOMOUNT WORKS" || echo "❌ FAILED/OFFLINE"; done
```

All ten returned:

```text
✅ AUTOMOUNT WORKS
```

This established a persistent systemd-backed CIFS layer for Laptop01-Laptop10.

---

## Creating a persistent bindfs service

The desired presentation layer was:

```text
/mnt/dadlan
   -> bindfs
/home/josh/DadLAN
   -> Samba
\\10.245.173.178\DadLAN
```

A systemd unit was created at:

```text
/etc/systemd/system/dadlan-bindfs.service
```

Conceptually it contained:

```ini
[Unit]
Description=DadLAN bindfs presentation layer
After=network-online.target
Wants=network-online.target mnt-dadlan-Laptop01.automount ... mnt-dadlan-Laptop10.automount
Before=smb.service

[Service]
Type=simple
User=josh
Group=josh
ExecStartPre=/usr/bin/mkdir -p /home/josh/DadLAN
ExecStart=/usr/bin/bindfs -f -p u=rwX:g=rX:o=rX /mnt/dadlan /home/josh/DadLAN
ExecStop=/usr/bin/fusermount3 -u /home/josh/DadLAN
Restart=on-failure
RestartSec=2

[Install]
WantedBy=multi-user.target
```

Samba was intended to depend on this service using a drop-in under:

```text
/etc/systemd/system/smb.service.d/dadlan.conf
```

with:

```ini
[Unit]
Requires=dadlan-bindfs.service
After=dadlan-bindfs.service
```

### First bindfs failure

The first service start failed with:

```text
fusermount3: user has no write access to mountpoint /home/josh/DadLAN
status=4/NOPERMISSION
```

The old manual bindfs mount was still active:

```bash
findmnt -T /home/josh/DadLAN -o TARGET,SOURCE,FSTYPE,OPTIONS
```

showed:

```text
/home/josh/DadLAN  /mnt/dadlan  fuse.bindfs
```

The old mount was cleanly removed:

```bash
sudo systemctl stop dadlan-bindfs.service
fusermount3 -u /home/josh/DadLAN
```

Then the underlying directory was visible on Btrfs and ownership was corrected:

```bash
sudo chown josh:josh /home/josh/DadLAN
```

Verification:

```text
drwxr-xr-x. ... josh josh ... /home/josh/DadLAN
```

The service was then started successfully:

```bash
sudo systemctl start dadlan-bindfs.service
systemctl --no-pager --full status dadlan-bindfs.service
```

Result:

```text
Loaded: ... enabled
Active: active (running)
Main PID: bindfs
```

---

## Restoring Samba and verifying persistence dependencies

Samba was restarted:

```bash
sudo systemctl restart smb
```

Status:

```text
Active: active (running)
Status: "smbd: ready to serve connections..."
```

Local Samba enumeration again showed Laptop01-Laptop10.

The Samba systemd dependency was explicitly written and reloaded:

```ini
[Unit]
Requires=dadlan-bindfs.service
After=dadlan-bindfs.service
```

Verification:

```bash
systemctl show smb -p Requires -p After | grep dadlan
```

Output included:

```text
Requires=dadlan-bindfs.service ...
After=... dadlan-bindfs.service ...
```

Firewall checks:

```bash
sudo firewall-cmd --zone=FedoraWorkstation --query-service=samba
sudo firewall-cmd --permanent --zone=FedoraWorkstation --query-service=samba
```

Both returned:

```text
yes
```

A Fedora reboot test was proposed, but the user declined because the workstation needed to remain available for work calls. That reboot test remained deferred.

---

## DadLAN Control Centre was built by Codex during the same work

Fedora/Codex built and pushed a V1 of DadLAN Control Centre.

At the time of its first runtime snapshot it reported:

- 10 machine cards
- 9/10 readable SMB mounts (Laptop10 had not yet been integrated at that exact point)
- 3 ForgeGrid workers online in local state
- MeshCentral unavailable because its server was not listening on port 1025
- Action1 not configured
- Jenkins/LANCommander not configured
- ESLint, TypeScript, Vitest, production build, runtime checks and npm audit passed

It was initially started only on:

```text
127.0.0.1:3037
```

Later in this chat, Laptop10 was fully proven read/write and added to the persistent mount set, so the old 9/10 status became stale.

---

## Windows client mapping and stale SMB-session debugging

On Laptop02, an earlier connection existed to:

```text
\\10.245.173.178\DadLAN
```

but without a drive letter.

The user wanted `Z:`. A stale mapping/session caused hangs during directory enumeration.

The old UNC connection was removed:

```powershell
net use \\10.245.173.178\DadLAN /delete /y
```

Then `Z:` was mapped:

```powershell
net use Z: \\10.245.173.178\DadLAN /user:josh * /persistent:yes
```

Authentication succeeded, but `dir Z:\` initially hung.

---

## SELinux alerts during SMB browsing

Fedora generated alerts such as:

```text
SELinux is preventing smbd[...] from getattr access on the lnk_file
/home/josh/DadLAN/Laptop10/Windows.old/Users/All Users
```

and:

```text
SELinux is preventing samba-dcerpcd from ioctl/read access on fusefs_t-backed DadLAN paths
```

The troubleshooting UI suggested broad options such as:

```bash
setsebool -P samba_export_all_ro 1
setsebool -P samba_export_all_rw 1
```

and generated-policy approaches using `audit2allow`.

Those broader changes were deliberately **not** applied because:

1. `samba_share_fusefs` was already the targeted boolean needed for the FUSE share.
2. The denied objects were often Windows compatibility junctions such as `Windows.old/Users/All Users`.
3. Basic Samba read/write functionality could be tested independently.
4. Later evidence showed the hangs were more strongly associated with Samba leases/oplocks than current SELinux denials.

A separate LANCommander SELinux alert also appeared:

```text
SELinux is preventing (LANCommander.) from execute access on LANCommander.Server
```

This was identified as a separate issue and not mixed into the Samba fix.

---

## Isolating the Windows hang

Fedora could enumerate the bindfs path immediately:

```bash
timeout 10 ls -la /home/josh/DadLAN/Laptop01 | head -30; echo "EXIT=$?"
```

Result:

```text
EXIT=0
```

Fedora could also enumerate the same path through Samba immediately:

```bash
timeout 10 smbclient //127.0.0.1/DadLAN -U josh -c 'cd Laptop01; ls'; echo "EXIT=$?"
```

Result:

```text
EXIT=0
```

Therefore:

```text
Windows C$ -> Fedora CIFS      OK
Fedora bindfs                 OK
Fedora local Samba client     OK
Windows client auth/session   OK
Windows first filesystem op   HANGING
```

Fresh `ausearch` output during the later hang did not show a new SELinux AVC at the exact time of the hang, further weakening the case that SELinux was the direct cause.

---

## smbstatus exposed the real pattern: leases/oplocks everywhere

While the Windows client was stuck, Fedora ran:

```bash
sudo smbstatus
```

Important session information:

```text
Samba version 4.24.5

10.245.173.221 (Laptop02) SMB3_11 partial(AES-128-CMAC)
10.245.173.126 (Laptop01) SMB3_11 partial(AES-128-GMAC)
```

There were many read handles and `LEASE(RH)` entries under the DadLAN share, including deep paths in:

- `Windows/WinSxS`
- `Windows.old`
- WSL paths
- XboxGames
- ProgramData
- Recycle Bin
- junction-like compatibility folders

The session concluded that the unusual re-export architecture:

```text
Windows C$
  -> CIFS mount on Fedora
  -> bindfs/FUSE
  -> Samba re-export
  -> Windows client
```

was a poor fit for aggressive SMB oplock/lease caching.

---

## Fix: disable oplocks specifically on the DadLAN share

The Samba config was backed up:

```bash
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.backup-before-no-oplocks
```

After a few terminal paste glitches, the `[DadLAN]` share was successfully changed to include:

```ini
[DadLAN]
    oplocks = no
    level2 oplocks = no
    comment = DadLAN Fleet Files
    path = /home/josh/DadLAN
    browseable = yes
    read only = no
    guest ok = no
    valid users = josh
    hosts allow = 127.0.0.1 10.245.173.0/24 10.174.174.0/24 10.176.176.0/24
    hosts deny = ALL
    create mask = 0660
    directory mask = 0770
```

An intermediate `testparm` warning showed why `level2 oplocks = no` also had to be explicit:

```text
Invalid combination of parameters for service DadLAN.
Level II oplocks can only be set if oplocks are also set.
```

After both were disabled:

```bash
sudo testparm -s
```

returned a clean configuration.

Samba was restarted:

```bash
sudo systemctl restart smb && systemctl is-active smb
```

Result:

```text
active
```

---

## The oplock fix solved the Windows hang

On Laptop02:

```powershell
Test-Path 'Z:\Laptop01\DadLan_Banner.png'
```

returned:

```text
True
```

The old Z mapping was removed and rebuilt persistently:

```powershell
net use Z: /delete /y
net use Z: \\10.245.173.178\DadLAN /user:josh * /persistent:yes
```

Then:

```powershell
dir Z:\Laptop01
```

successfully listed the root of Laptop01, including directories such as:

- `$Recycle.Bin`
- `actions-runner`
- `dev`
- `Program Files`
- `ProgramData`
- `Users`
- `Windows`

and files including:

- `DadLan_Banner.png`
- `hiberfil.sys`
- `pagefile.sys`
- `swapfile.sys`

A second end-to-end cross-machine write test was done from Laptop02 to Laptop04:

```powershell
'Laptop02 writing to Laptop04 through DadLAN' | Set-Content 'Z:\Laptop04\DadLAN-cross-test.txt'
Get-Content 'Z:\Laptop04\DadLAN-cross-test.txt'
Remove-Item 'Z:\Laptop04\DadLAN-cross-test.txt'
```

Output:

```text
Laptop02 writing to Laptop04 through DadLAN
```

This definitively proved read/write Windows-to-Windows access through the Fedora hub.

The session explicitly decided **not** to enable `samba_export_all_rw`, run `restorecon` against the Windows-junction paths, or build an `audit2allow` module merely to silence old alerts.

---

## Laptop01 mapping

Laptop01 mapped the share with:

```powershell
net use Z: \\10.245.173.178\DadLAN /user:josh * /persistent:yes
```

Windows reported an old remembered Z mapping:

```text
Z: has a remembered connection to \\100.77.229.29\JOSHP.
Do you want to overwrite the remembered connection?
```

The user chose `Y`, replacing the old mapping with the new DadLAN hub.

---

## Using the Samba hub for VS Code / AI coding

The user asked whether Samba could be used to vibe-code other computers' C: drives with VS Code.

The answer was yes for file access. Example:

```powershell
code -n "Z:\Laptop04\dev\MyProject"
```

The important distinction recorded in chat:

- If VS Code runs on Laptop02 and opens `Z:\Laptop04\dev\Project`, the project files physically live on Laptop04.
- VS Code terminals, compilers, Node/Python processes and most agent execution still run on Laptop02 unless a separate remote-execution mechanism is used.
- For safety and performance, AI agents should be scoped to project folders rather than an entire remote C: drive.

---

## Why opening the entire DadLAN root in VS Code hung

The user opened the whole DadLAN share in VS Code and saw:

```text
Laptop01
Laptop02
...
Laptop10
```

VS Code/Copilot became effectively stuck while “compounding with the codebase”.

The reason identified was that opening `Z:\` handed VS Code/Copilot ten complete Windows C: drives, including:

- Windows
- WinSxS
- Windows.old
- Program Files
- WSL
- Recycle Bin
- junctions
- huge system files
- millions of filesystem entries

The guidance was:

- Use File Explorer for the full `Z:\` browse view.
- Use VS Code only on specific project folders, e.g. `Z:\Laptop04\dev\MyProject`.

---

## Creating C:\dev on every Windows laptop via Action1

The user requested a script that:

- checks for `C:\dev`
- leaves it if it already exists
- creates it if missing

The supplied PowerShell script was:

```powershell
$DevPath = "C:\dev"

if (Test-Path -LiteralPath $DevPath -PathType Container) {
    Write-Output "OK: $DevPath already exists. No changes made."
    exit 0
}

try {
    New-Item -Path $DevPath -ItemType Directory -Force -ErrorAction Stop | Out-Null
    Write-Output "CREATED: $DevPath"
    exit 0
}
catch {
    Write-Error "FAILED to create $DevPath - $($_.Exception.Message)"
    exit 1
}
```

Action1 then ran it across all ten endpoints.

Results:

| Endpoint | Result |
|---|---|
| Laptop01 | `C:\dev` already existed |
| Laptop02 | `C:\dev` already existed |
| Laptop03 | created |
| Laptop04 | created |
| Laptop05 | created |
| Laptop06 | created |
| Laptop07 | created |
| Laptop08 | created |
| Laptop09 | created |
| Laptop10 | created |

All ten Action1 executions completed successfully.

---

## Creating a VS Code multi-root DadLAN workspace

The desired workspace consisted only of the `dev` folders:

```text
Z:\Laptop01\dev
Z:\Laptop02\dev
Z:\Laptop03\dev
Z:\Laptop04\dev
Z:\Laptop05\dev
Z:\Laptop06\dev
Z:\Laptop07\dev
Z:\Laptop08\dev
Z:\Laptop09\dev
Z:\Laptop10\dev
```

A PowerShell-generated VS Code workspace was proposed with named folders and exclusions for:

- `node_modules`
- `.git/objects`
- `.git/subtree-cache`
- `.next`
- `dist`
- `build`

The first attempt tried writing to:

```text
C:\Users\Josh\Desktop\DadLAN.code-workspace
```

and failed because that Desktop path did not exist on Laptop01.

The fix was to resolve the real Desktop path:

```powershell
$desktop = [Environment]::GetFolderPath('Desktop')
$path = Join-Path $desktop 'DadLAN.code-workspace'
```

and then write/open the workspace there.

---

## VS Code still slowed down across ten dev roots

After all ten `dev` roots were loaded, VS Code itself opened them successfully, but Copilot/Agent became slow again when asked workspace-wide questions such as:

> how many projects do we have

The conclusion was that even ten development roots can contain enough repositories and files to make recursive network workspace discovery expensive.

Recommended workspace settings:

```json
"settings": {
    "git.autoRepositoryDetection": false,
    "search.followSymlinks": false,

    "files.watcherExclude": {
        "**/node_modules/**": true,
        "**/.git/**": true,
        "**/.next/**": true,
        "**/dist/**": true,
        "**/build/**": true,
        "**/.venv/**": true,
        "**/venv/**": true
    },

    "search.exclude": {
        "**/node_modules/**": true,
        "**/.git/**": true,
        "**/.next/**": true,
        "**/dist/**": true,
        "**/build/**": true,
        "**/.venv/**": true,
        "**/venv/**": true
    }
}
```

The user was told how to open the workspace configuration via:

```text
Ctrl+Shift+P
Workspaces: Open Workspace Configuration File
```

then save and run:

```text
Developer: Reload Window
```

The recommended AI workflow became:

1. Use the multi-root workspace mainly for browsing/discovery.
2. Disable automatic Git repo discovery across all roots.
3. When actually coding, open one specific repository in a separate VS Code window.
4. Build a small DadLAN project index rather than forcing Copilot to rediscover all repos across eleven SMB roots every time.

---

## Adding Fedora development files as Laptop11

The user asked to add Fedora's development folder as number 11.

It was clarified that the useful path was Fedora's:

```text
/home/josh/dev
```

not Linux `/dev`.

The user ran:

```bash
sudo mkdir -p /mnt/dadlan/Laptop11/dev
sudo mount --bind /home/josh/dev /mnt/dadlan/Laptop11/dev
```

Verification:

```bash
ls /home/josh/DadLAN/Laptop11/dev
```

showed Fedora projects/files including items such as:

- `6 Laptops`
- `DadlanControl`
- `DadlanControlCentre`
- `Jenkins`
- `lancommander`
- `LANCommander.Server-Linux-x64-v2.1.10.zip`
- `ForgeGrid`-related work under the broader dev tree
- multiple other development/research directories

The VS Code workspace entry proposed for Fedora was:

```json
{
    "name": "Laptop11 Fedora dev",
    "path": "Z:\\Laptop11\\dev"
}
```

Important unresolved item: this bind mount was created with `mount --bind` and therefore still needs to be made persistent across Fedora reboots.

---

## Network-load checks

The user asked whether the new setup was causing a lot of network load.

Fedora interface:

```text
eno1 = 10.245.173.178
```

`nload eno1` initially showed very low traffic, around:

```text
Incoming current ~181 kbit/s
Outgoing current ~12 kbit/s
```

Later it showed roughly:

```text
Incoming current ~1.63 Mbit/s
Outgoing current ~1.51 Mbit/s
Recent incoming max ~3.41 Mbit/s
Recent outgoing max ~1.90 Mbit/s
```

This was still a very low load.

The user then installed and ran:

```bash
sudo dnf install -y iftop
sudo iftop -i eno1 -n -N
```

The live `iftop` view showed the biggest Fedora-local flows were roughly:

- Fedora `10.245.173.178` <-> Laptop01 `10.245.173.126`: about 1.1 Mbit/s each way at that moment
- Fedora <-> Laptop02 `10.245.173.221`: a few hundred kbit/s
- other DadLAN laptops: mostly only a few kbit/s
- small internet/cloud flows also visible

Bottom-line traffic was roughly:

```text
TX ~1.38 Mbit/s
RX ~1.56 Mbit/s
TOTAL ~2.94 Mbit/s
```

Conclusion: the DadLAN network was **not bandwidth-saturated**. VS Code sluggishness was attributed primarily to recursive filesystem metadata/indexing over the double-SMB architecture, not to raw network throughput.

The chat also noted that `iftop -i eno1` shows traffic entering/leaving Fedora, not literally all traffic on the entire home LAN, but it is a very good view of the DadLAN hub traffic because cross-laptop filesystem access is routed through Fedora.

---

## Final proven architecture at the end of this session

```text
Laptop01 C:\  --\
Laptop02 C:\  ---\
Laptop03 C:\  ----\
Laptop04 C:\  -----\
Laptop05 C:\  ------\
Laptop06 C:\  -------+--> Fedora CIFS automounts
Laptop07 C:\  ------/      /mnt/dadlan/Laptop01..10
Laptop08 C:\  -----/                    |
Laptop09 C:\  ----/                  bindfs
Laptop10 C:\  ---/                      |
                                   /home/josh/DadLAN
                                          |
                                        Samba
                                          |
                              \\10.245.173.178\DadLAN
                                          |
                                         Z:
                                          |
                         Windows clients / VS Code / AI
```

Additional local Fedora development exposure:

```text
/home/josh/dev
   -> bind mount
/mnt/dadlan/Laptop11/dev
   -> bindfs/Samba
Z:\Laptop11\dev
```

---

## State at end of conversation

### Confirmed working

- Laptop01-Laptop10 C$ accessible from Fedora.
- Laptop10 specifically confirmed read/write.
- All ten CIFS mounts have working systemd automount units.
- All ten automount tests passed.
- `dadlan-bindfs.service` is enabled and active.
- Samba is active.
- Samba requires/starts after `dadlan-bindfs.service`.
- Fedora firewall allows Samba at runtime and permanently.
- `samba_share_fusefs` is enabled.
- `[DadLAN]` has `oplocks = no` and `level2 oplocks = no`.
- Laptop02 can browse `Z:\Laptop01`.
- Laptop02 can create/read/delete files on Laptop04.
- Laptop01 can map `Z:`.
- All ten Windows laptops have `C:\dev`.
- Fedora `/home/josh/dev` is exposed as `Laptop11/dev` for the current boot.
- Network traffic during testing was low.

### Deliberately not done

- No Fedora reboot test, because the user needed AVANCE-WS7 available for calls.
- No `samba_export_all_rw` SELinux boolean.
- No broad `restorecon` against Windows junctions exposed through FUSE.
- No `audit2allow` policy module for the Samba alerts.

### Still worth doing

1. Make the Fedora `/home/josh/dev -> /mnt/dadlan/Laptop11/dev` bind mount persistent.
2. Verify the full Fedora persistence chain after a future reboot when downtime is acceptable.
3. Decide how to roll persistent `Z:` mapping securely to all Windows laptops without embedding the Samba password in plain text in Action1.
4. Generate a lightweight project index across Laptop01-Laptop11 `dev` folders.
5. Keep VS Code/Copilot scoped to specific repositories for active coding instead of recursively indexing all eleven roots.
6. Revisit MeshCentral on port 1025 separately; its earlier local service was not listening during the Control Centre V1 check.
7. Address the separate LANCommander SELinux execution issue independently if it remains relevant.

---

## Key lesson from the session

The hub-and-spoke design works:

```text
Windows machine A -> Fedora Samba hub -> Windows machine B
```

The critical stability fix was **disabling Samba oplocks and Level II oplocks specifically on the DadLAN re-export share**. The share itself was functional under SELinux with `samba_share_fusefs`; the Windows-client hangs were caused by the re-exported filesystem interacting badly with SMB leases/oplocks, not by network saturation.

