# Sandbox Permissions

One of Flatpak's main goals is to increase the security of desktop
systems by isolating applications from one another. This is achieved
using sandboxing and means that, by default, applications that are run
with Flatpak have extremely limited access to the host environment. This
includes:

- No access to any host files except the runtime, the app,
  `~/.var/app/$FLATPAK_ID`, and `$XDG_RUNTIME_DIR/app/$FLATPAK_ID`.
  Only the latter two being writable.
- No access to the network.
- No access to any device nodes (apart from `/dev/null`, etc).
- No access to processes outside the sandbox.
- Limited syscalls. For instance, apps can't use nonstandard network
  socket types or ptrace other processes.
- Limited access to the session D-Bus instance - an app can only own
  its own name on the bus.
- No access to host services like X11, system D-Bus, or PulseAudio.

Most applications will need access to some of these resources in order
to be useful. This is primarily done during the finishing build stage,
which can be configured through the `finish-args` section of the
manifest file (see [manifests](manifests)).

## Portals

Portals have already been mentioned in
[basic-concepts](../getting-started/basic-concepts). They are a framework for
providing access to resources outside of the sandbox, including:

- Opening files with a native file chooser dialog
- Opening URIs
- Printing
- Showing notifications
- Taking screenshots
- Inhibiting the user session from ending, suspending, idling or
  getting switched away
- Getting network status information

In many cases, portals use a system component to implicitly ask the user
for permission before granting access to a particular resource. For
example, in the case of opening a file, the user's selection of a file
using the file chooser dialog is interpreted as implicitly granting the
application access to whatever file is chosen.

This approach enables applications to avoid having to configure blanket
access to large amounts of data or services and gives users control over
what their applications have access to.

Interface toolkits like GTK3 and Qt5 implement transparent support for
portals, meaning that applications don't need to do any additional work
to use them (it is worth checking which portals each toolkit supports).
Applications that aren't using a toolkit with support for portals can
refer to the [xdg-desktop-portal API
documentation](https://flatpak.github.io/xdg-desktop-portal/portal-docs.html)
for information on how to use them.

## Permissions guidelines

While application developers have control over the sandbox permissions
they wish to configure, good practice is encouraged and can be enforced.
For example, the Flathub hosting service places requirements on which
permissions can be used, and software on the host may warn users if
certain permissions are used.

The following guidelines describe which permissions can be freely used,
which can be used on an as-needed basis, and which should be avoided.

### Standard permissions

The following permissions provide access to basic resources that
applications commonly require, and can therefore be freely used:

- `--share=network` - access the network
- `--socket=x11` - show windows using X11
- `--socket=fallback-x11` - show windows using X11, if Wayland is not
  available, overrides `x11` socket permission. Note that you must
  still use `--socket=wayland` for wayland permission
- `--share=ipc` - share IPC namespace with the host (necessary for
  X11)
- `--socket=wayland` - show windows with Wayland
- `--device=dri` - OpenGL rendering
- `--socket=pulseaudio` - play sound with PulseAudio

### D-Bus access

Access to the entire bus with `--socket=system-bus` or
`--socket=session-bus` should be avoided, unless the application is a
development tool.

**Ownership**

Applications are automatically granted access to their own namespace.
Ownership beyond this is typically unnecessary, although there are a
small number of exceptions, such as using [MPRIS to provide media
controls](https://www.freedesktop.org/wiki/Specifications/mpris-spec/).

**Talk**

Talk permissions can be freely used, although it is recommended to use
the minimum required.

### Filesystem access

It is common for applications to require access to different parts of
the host filesystem, and Flatpak provides a flexible set of options for
this. Some examples include:

- `--filesystem=host` - access normal files on the host, not including
  host os or system internals described below
- `--filesystem=home` - access the user's home directory
- `--filesystem=/path/path` - access specific paths
- `--filesystem=xdg-download` - access a specific XDG folder

As a general rule, Filesystem access should be limited as much as
possible. This includes:

- Using portals as an alternative to blanket filesystem access,
  wherever possible.
- Using read-only access wherever possible, using the `:ro` option.
- If some home directory access is absolutely required, using XDG
  directory access only.

The full list of available filesystem options can be found in the
[sandbox-permissions-reference](sandbox-permissions-reference). Other
filesystem access guidelines include:

- The `--persist=path` option can be used to map paths from the
  user's home directory into the sandbox filesystem. This makes it
  possible to avoid configuring access to the entire home directory,
  and can be useful for applications that hardcode file paths in `~/`.
- If an application uses `$TMPDIR` to contain lock files you may want
  to add a wrapper script that sets it to
  `$XDG_RUNTIME_DIR/app/$FLATPAK_ID`.
- Retaining and sharing configuration with non-Flatpak installations
  is to be avoided.

As mentioned above the `host` option does not actually provide complete
access to the host filesystem. The main rules are:

- These directories are blacklisted: `/lib`, `/lib32`, `/lib64`,
  `/bin`, `/sbin`, `/usr`, `/boot`, `/root`, `/tmp`, `/etc`, `/app`,
  `/run`, `/proc`, `/sys`, `/dev`, `/var`
- Exceptions from the blacklist: `/run/media`
- These directories are mounted under `/var/run/host`: `/etc`, `/usr`

The reason many of the directories are blacklisted is because they
already exist in the sandbox such as `/usr` or are not usable in the
sandbox.

### Device access

While not ideal, `--device=all` can be used to access devices like
controllers or webcams.

### dconf access

As of xdg-desktop-portal 1.1.0 and glib 2.60.5 (in the runtime) you do
not need direct DConf access in most cases.

As of now this glib version is included in
`org.freedesktop.Platform//19.08` and `org.gnome.Platform//3.34` and
newer.

If an application existed prior to these runtimes you can tell Flatpak
(\>= 1.3.4) to migrate the DConf settings on the host into the sandbox
by adding `--metadata=X-DConf=migrate-path=/org/example/foo/` to
`finish-args`. The path must be similar to your app-id or it will not be
allowed (case is ignored and `_` and `-` are treated equal).

If you are targeting older runtimes or require direct DConf access for
other reasons you can use these permissions:

    --filesystem=xdg-run/dconf
    --filesystem=~/.config/dconf:ro
    --talk-name=ca.desrt.dconf
    --env=DCONF_USER_CONFIG_DIR=.config/dconf

With those permissions glib will continue using dconf directly.

### gvfs access

As of gvfs 1.48, the gvfs daemons and applications use an on-disk socket
to communicate, rather than an abstract socket so that the gvfs
infrastructure still works when network support is disabled in the
application's sandbox.

A number of different options need to be passed depending on the
application's use of gvfs.

`--talk-name=org.gtk.vfs.*` is necessary to talk to the gvfs daemons
over D-Bus and list mounts using the GIO APIs.

`--filesystem=xdg-run/gvfsd` is necessary to use the GIO APIs to list
and access non-native files using the GIO APIs, using URLs rather than
FUSE paths.

`--filesystem=xdg-run/gvfs` is necessary to give access to the FUSE
mounts non-GIO and legacy applications can use. This is what will make
native files appear under `` /run/user/`id -u`/gvfs/ ``.

Typical GNOME and GTK applications should use:

    --talk-name=org.gtk.vfs.*
    --filesystem=xdg-run/gvfsd

Typical non-GNOME and non-GTK applications should use:

    --filesystem=xdg-run/gvfs

No application should be using `--talk-name=org.gtk.vfs` in its
manifest, as there are no D-Bus services named `org.gtk.vfs`.
