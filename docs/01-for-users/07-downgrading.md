# Downgrading

It is possible to downgrade an installed application (or runtime) to an
older version.

First you look for the version you are interested in:

```bash
flatpak remote-info --log flathub com.github.tchx84.Flatseal
```

Here is what the output looks like at the time of writing:

```text
Flatseal - Manage Flatpak permissions

        ID: com.github.tchx84.Flatseal
       Ref: app/com.github.tchx84.Flatseal/x86_64/stable
      Arch: x86_64
    Branch: stable
   Version: 2.1.0
   License: GPL-3.0-or-later
Collection: org.flathub.Stable
  Download: 167,1 kB
 Installed: 540,7 kB
   Runtime: org.gnome.Platform/x86_64/45
       Sdk: org.gnome.Sdk/x86_64/45

    Commit: aaa47a00114a1e5eddbcde932c80e13ae27432ff547210012e49e90f1842b512
    Parent: 627f4091cfc8c6af3d51034c388c6bf7bcea341399ca49ca2b28590aee60a6c1
   Subject: Update to v2.1.0 (0a374a00)
      Date: 2023-09-28 12:43:49 +0000
   History:

    Commit: 627f4091cfc8c6af3d51034c388c6bf7bcea341399ca49ca2b28590aee60a6c1
   Subject: Update to v2.0.2 (8122bdf8)
      Date: 2023-07-07 16:26:49 +0000

    Commit: b5b8f7a9e3b5d7d34b1b56a68754f3992c82a143ce20aa996b84ab5572b7d073
   Subject: Update to v2.0.1 (59b9bb76)
      Date: 2023-05-04 15:22:49 +0000

    [...]
```

As an example, let's say you want to downgrade to the previous version,
`2.0.2`. You can see that the commit for that version is
`627f4091cfc8c6af3d51034c388c6bf7bcea341399ca49ca2b28590aee60a6c1`.

So you can downgrade to that version by running:

```bash
sudo flatpak update \
      --commit=627f4091cfc8c6af3d51034c388c6bf7bcea341399ca49ca2b28590aee60a6c1 \
      com.github.tchx84.Flatseal
```

:::note

The example here uses `sudo` for system installations because, unlike
normal updates, downgrades are considered a privileged action. If the
application is installed per-user you would run it as that user.
:::

If you have Flatpak 1.5.0 or later, you can also prevent the app from
being included in updates (either manual or automatic):

```bash
flatpak mask com.github.tchx84.Flatseal
```
