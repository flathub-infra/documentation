# User vs system install

Flatpak applications can be installed either per-user or system-wide. The
difference is that per-user installations are only available to the user
that installed them, while system-wide installations are available to all
users on the system. System-wide installations can be updated by any user
with administrator privileges.

The choice between per-user and system-wide installations depends on the
use case. Per-user installations are recommended for most users, unless
they have a specific reason to use system-wide installations. The main
advantage of system-wide installations is that they allow multiple users
to share a common set of applications. For example, if you have a
multi-user workstation, you can install applications system-wide so that
all users can use them. Another advantage is that system-wide
installations are generally easier to manage, as you only need to update
them once. However, system-wide installations can be problematic if you
have multiple users with different needs, as it is difficult to ensure
that each user will only have access to the applications they need.

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
