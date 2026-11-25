# Windows hardware health and repair evidence

This guide supports the fleet's existing inventory and observation role. It is not a live inventory update, asset identity confirmation, remote management operation, or permission to touch a work/client machine.

## Record after cooling or storage repair

- Identify the authorised device by model and private inventory ID. Document CPU topology, BIOS version/date, storage type/capacity, battery design/full capacity and the original symptom.
- Preserve before/after evidence with exact test dates, workload, ambient conditions if known, sample counts and independent source names. Record minimum/mean/maximum CPU temperature, load, package power, effective clock and cooldown. If fan RPM is unavailable, say so. A cooler system at limited package power is not proof of maximum-power cooling.
- Record actual benchmark version, settings, iteration/thread count, score and exit status. A watchdog timeout or missing output is not a completed benchmark. Use comparable workloads and distinguish observed limits from hypotheses.
- Record SSD health, remaining endurance where available, spare/temperature values and C: free GiB. SMART health does not guarantee future reliability. A capacity upgrade requires compatibility confirmation, backed-up data, tested restoration and a safe clone/reinstall plan; retain the original drive until the replacement is verified.
- Record battery capacity and cycles separately from instantaneous charge. If WMI readings are absent, a Windows battery report can provide an alternative. Use local trend monitoring, not automatic battery replacement or remote upload.
- Collect read-only processor, driver, PnP, event and security observations while a user is working. An aggregate device status may conflict with its actual error code/driver state; investigate before reinstalling. Preserve security features. Defer disruptive diagnostics to an agreed maintenance window.

## Evidence states

Use separate states for measured thermal behaviour, completed benchmark, verified functional repair, outstanding diagnosis, proposed upgrade, and actual post-upgrade verification. Don't promote an old catalogue or local health log into centrally confirmed live fleet enrolment. No new remote-control integration, patch agent, firmware update or automated cleanup is introduced by this guide. Keep private device records out of this public repository and any public deployment.
