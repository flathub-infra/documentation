---
title: Slow connection to Flathub
sidebar_position: 11
---

# What to do when Flathub is slow for you

If downloads from Flathub are slow for you, this page shows practical steps you can take to diagnose the problem, potential workarounds, and how to report the issue to the Flathub team with useful information.

Keep calm and collect data — clear, reproducible information makes it much easier for maintainers to help.

## Quick checklist

- Try another website (e.g., https://example.com) to check whether the problem is specific to Flathub.
- Try a different device or network (mobile hotspot, another Wi‑Fi) if possible.
- Collect the diagnostic outputs listed below.
- Open a report and attach the outputs (see the reporting template section).

## Local quick checks

Run these commands in a terminal on the machine that is experiencing slowness. Replace <target> with the hostname shown below when appropriate (recommended targets are `dl.flathub.org` and `flathub.org`).


### Basic connectivity and DNS

```bash
# Check basic reachability
ping -c 6 dl.flathub.org

# Check which IP(s) dl.flathub.org resolves to
dig +short dl.flathub.org
```

### Measure HTTP download speed

```bash
# Download a small file and show timing information (curl)
curl -sS -w "\n
URL: %{url_effective}\nDNS: %{time_namelookup}s
Connect: %{time_connect}s
StartTransfer: %{time_starttransfer}s
Total: %{time_total}s
Size: %{size_download} bytes\n" -o /dev/null https://dl.flathub.org/repo/appstream/x86_64/appstream.xml.gz
```

### TCP path and per‑hop latency

```bash
# traceroute (classic)
traceroute dl.flathub.org

# or use mtr for a more thorough path+loss report (may need sudo)
mtr --report --report-cycles 10 dl.flathub.org
```

### HTTP headers and potential redirects

```bash
curl -I https://dl.flathub.org/repo/ | sed -n '1,20p'
```

### Test with a different DNS

```bash
# Example using Google DNS (8.8.8.8) for a single dig query
dig @8.8.8.8 dl.flathub.org +short
```

## Flatpak-specific checks

Run these commands to show what Flatpak is doing and which remote you have configured.

```bash
# Flatpak version and configuration
flatpak --version

# List remotes and the flathub remote URL
flatpak remotes --show-details

# Try a verbose update to see where it stalls (this can be long)
flatpak update --appstream --verbose --ostree-verbose

# Try installing/updating a single app with verbose output to capture the failure
flatpak update --verbose --ostree-verbose org.gnome.Calculator
```

Note: the Flathub downloads usually originate from `dl.flathub.org` (the repository mirror system). If `flatpak` shows a different domain in verbose output, include that in your report.

## Collecting logs and artifacts to attach

When you report the issue, include the following items (attach outputs as plain text or a GitHub Gist):

- Date and local time when you ran the tests and your timezone.
- Your OS and version (e.g., Fedora 39, Ubuntu 24.04) and whether Flatpak is the user or system installation.
- The outputs of these commands (copy-paste or attach files):

	- `flatpak --version`
	- `flatpak remotes --show-details`
	- `ping -c 6 dl.flathub.org`
	- `dig +short dl.flathub.org` (and one `dig` using a public DNS like `8.8.8.8`)
	- `curl -sS -w "\nDNS: %{time_namelookup}s Connect: %{time_connect}s StartTransfer: %{time_starttransfer}s Total: %{time_total}s\n" -o /dev/null https://dl.flathub.org/repo/appstream/x86_64/appstream.xml.gz`
	- `traceroute dl.flathub.org` or `mtr --report --report-cycles 10 dl.flathub.org`
	- Output of the failing `flatpak update` or `flatpak install` run with `--verbose --ostree-verbose`.

- If you see TLS/PEM or certificate errors, copy the exact error message.
- If you use a proxy, VPN, or an enterprise firewall, describe it (it often explains routing issues).

Redact any personal data (home IP addresses are fine to include but you can replace them with X.X.X.X if you prefer). If you are not comfortable posting raw logs publicly, create a private gist and share a link in the issue.

## Common easy fixes to try before reporting

- Switch DNS to a public resolver (e.g., 1.1.1.1, 8.8.8.8) to see if DNS is the issue.
- Try another network (phone hotspot) to determine if the issue is with your ISP.
- Reboot your router/modem and the client machine.
- Try the operation at another time (peak evening hours may be slower).

## Workarounds

- Use a different network (mobile tethering) to finish urgent installs/updates.
- Temporarily try a VPN — this can bypass a congested ISP path.

## How to report to Flathub

Preferred place for actionable reports is the Flathub issue tracker (GitHub). When opening an issue, add the diagnostic outputs gathered above and follow the template below.

- Open a new issue at: https://github.com/flathub/flathub/issues/new/choose

- Title it like: `Slow downloads from Flathub (dl.flathub.org) — [your country/ISP]`.

Paste the following template into the issue body and replace the placeholders.

````markdown
Title: Slow downloads from Flathub (dl.flathub.org) — <country or ISP>

Description
-----------
Describe what you observed in one or two sentences (for example: "Flatpak updates/downloads are very slow, ~50 KB/s, but other websites are fast").

When it happened
-----------------
Date/time (local): <YYYY-MM-DD HH:MM TZ>

System
------
- OS: <distro and version>
- flatpak: <output of `flatpak --version`>
- Flatpak install type: <user/system>

Basic connectivity
------------------
```
ping -c 6 dl.flathub.org
dig +short dl.flathub.org
dig @8.8.8.8 dl.flathub.org
curl -sS -w "DNS: %{time_namelookup}s Connect: %{time_connect}s StartTransfer: %{time_starttransfer}s Total: %{time_total}s\n" -o /dev/null https://dl.flathub.org/repo/appstream/x86_64/appstream.xml.gz
traceroute dl.flathub.org
```

Flatpak output
--------------
Attach the verbose output from a failing `flatpak update` or `flatpak install` run, for example:
```
flatpak update --verbose --ostree-verbose
```

Other notes
-----------
- ISP / network: <ISP name, home/office, NAT/CGNAT if known>
- Any proxy, VPN, or special routing in use: <yes/no + details>

Attachments
-----------
- Paste logs or attach a GitHub Gist or text files with the outputs listed above.

Please redact any personal data you don't want to share publicly.
````



## Final notes

Collecting reproducible diagnostics saves time for both you and the maintainers. Even when the fix is managed on Flathub's side (mirrors, CDN, DNS), your report helps identify the scope (regional, ISP) and priority.


