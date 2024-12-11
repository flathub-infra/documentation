# User vs system install

Flatpak applications can be installed either per-user or system-wide. The
difference is that per-user installations are only available to the user
that installed them, while system-wide installations are available to all
users on the system. System-wide installations can be updated by any user
with administrator privileges. The choice between per-user and
system-wide installations depends on the use case.

### Per-user installations

Per-user installations are installed in the user's home
directory, in `~/.local/share/flatpak`. This means that the applications
and runtimes are not available to other users on the system.

To install an application or runtime per-user, run:

```bash
flatpak install --user <remote> <name>
```

To update an application or runtime, run:

```bash
flatpak update --user <name>
```

### System-wide installations

System-wide installations are installed in the system's installation
directory, which is usually `/var/lib/flatpak`. System-wide installations
are available to all users on the system.

To install an application or runtime system-wide, run:

```bash
flatpak install <remote> <name>
```

To update an application or runtime, run:

```bash
flatpak update <name>
```
