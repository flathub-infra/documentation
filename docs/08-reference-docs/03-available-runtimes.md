# Available Runtimes

This page provides information about available Flatpak runtimes. It is
primarily intended as information for application developers and
distributors.

There are currently three main runtimes available: Freedesktop, GNOME
and KDE. These are all hosted on [Flathub](https://flathub.org/). Each
runtime comes with the corresponding SDK for building, and extensions
for specific uses.

What is mentioned here is just a high level look at the contents. To
have up to date information simply install the runtime and open a shell
inside of it (`flatpak run org.freedesktop.Sdk//22.08`) from there you
can look around or use tools like `pkg-config --list-all`. In the
runtime shell you can also inspect `/usr/manifest.json`, which lists the
sources used to build it.

## Freedesktop

The Freedesktop runtime is the standard runtime that can be used for any
application and contains a set of essential libraries and services,
including D-Bus, GLib, Gtk3, PulseAudio, X11 and Wayland.

The Freedesktop runtime is maintained
[here](https://gitlab.com/freedesktop-sdk/freedesktop-sdk/) and has a
website [here](https://freedesktop-sdk.io/).

Available Freedesktop runtimes:

ID Description

---

org.freedesktop.Platform Runtime
org.freedesktop.Sdk SDK

The following runtime extensions are available:

ID Description

---

org.freedesktop.Platform.Locale Runtime translations (extension)
org.freedesktop.Platform.VAAPI.Intel{,.i386} Intel vaapi drivers (extension)
org.freedesktop.Platform.ffmpeg-full All ffmpeg codecs (extension)
org.freedesktop.Platform.Compat.{architecture} 32 bits compatible extension
org.freedesktop.Platform.Compat.{architecture}.debug 32 bits compatible extension (debug)
org.freedesktop.Platform.GL{,32}.default Mesa drivers (extension)
org.freedesktop.Platform.GL{,32}.mesa-git Mesa drivers, latest (extension)
org.freedesktop.Sdk.Debug SDK debug information (extension)
org.freedesktop.Sdk.Locale SDK translations (extension)
org.freedesktop.Sdk.Docs SDK documentation (extension)
org.freedesktop.Sdk.Extension.toolchain-{architecture} SDK cross compilers (extension)

## GNOME

The GNOME runtime is appropriate for any application that uses the GNOME
platform. It is based on the Freedesktop runtime and adds the GNOME
platform, including:

- Clutter
- Gjs
- GObject Introspection
- GStreamer
- GVFS
- Libnotify
- Libsecret
- LibSoup
- PyGObject
- Vala
- WebKitGTK

The GNOME runtime is maintained
[here](https://gitlab.gnome.org/GNOME/gnome-build-meta).

Available GNOME runtimes:

ID Description

---

org.gnome.Platform Runtime
org.gnome.Sdk SDK

The following runtime extensions are available:

ID Description

---

org.gnome.Platform.Locale Runtime translations (extension)
org.gnome.Sdk.Debug SDK debug information (extension)
org.gnome.Sdk.Locale SDK translations (extension)
org.gnome.Sdk.Docs SDK documentation (extension)

## KDE

The KDE runtime is also based on the Freedesktop runtime and adds Qt and
KDE Frameworks. It is appropriate for any application that makes use of
the KDE platform and most Qt-based applications.

The KDE runtime is maintained
[here](https://invent.kde.org/packaging/flatpak-kde-runtime).

Available KDE runtimes:

ID Description

---

org.kde.Platform Runtime
org.kde.Sdk SDK

The following runtime extensions are available:

ID Description

---

org.kde.Platform.Locale Runtime translations (extension)
org.kde.Sdk.Debug SDK debug information (extension)
org.kde.Sdk.Locale SDK translations (extension)
org.kde.Sdk.Docs SDK documentation (extension)

## elementary

The elementary runtime is appropriate for any application that would
like to publish in elementary AppCenter. It is based on the GNOME
runtime and adds the elementary platform, including:

- elementary Icons
- elementary Stylesheet
- elementary Sound Theme
- Granite

The elementary runtime is maintained
[here](https://github.com/elementary/flatpak-platform).

Available elementary runtimes:

ID Description

---

io.elementary.Platform Runtime
io.elementary.Sdk SDK

The following runtime extensions are available:

ID Description

---

io.elementary.Platform.Locale Runtime translations (extension)
io.elementary.Sdk.Debug SDK debug information (extension)
io.elementary.Sdk.Locale SDK translations (extension)
io.elementary.Sdk.Docs SDK documentation (extension)
