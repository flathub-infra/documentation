# Requirements & Conventions

Flatpak deliberately makes as few requirements of applications as
possible. However, a small number of standard Linux desktop conventions
are expected, primarily to ensure that applications integrate with Linux
desktops and app centers. Developers might also encounter a small number
of Linux technical conventions.

Information on further desktop integration options can be found in
[desktop-integration](../desktop-integration).

## Expected Standards

Applications that use Flatpak are generally expected to comply with the
following standards. Applications that have previously targeted the
Linux desktop will typically need to make very few (if any) changes to
do this.

### Application IDs

As described in [using-flatpak](../getting-started/using-flatpak), Flatpak
requires each application to have a unique identifier, which has a form
such as `org.gnome.Dictionary`.

The format is in reverse-DNS style so the first section is generally a
domain controlled by the project and the trailing section represents the
specific project. There are some exceptions to this, such as extensions
using the base application-id of the project they extend rather than
their own.

As will be seen below and in future sections, this ID is expected to be
used in a number of places. Developers must follow the standard [D-Bus
naming conventions for bus
names](https://dbus.freedesktop.org/doc/dbus-specification.html#message-protocol-names)
when creating their own IDs. This format is already recommended by the
[Desktop File
specification](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html#file-naming)
and [Appstream
specification](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#sect-Metadata-GenericComponent)
also.

For some practical examples of bad IDs

- `org.example.desktop`

  This is a bad ID because the Appstream standard for legacy reasons
  treats IDs ending with `.desktop` as a special case causing
  inconsistency. For this same reason, `.Desktop` suffixes should not
  be used for newly named applications. Don't hesitate to repeat the
  application name even if it already is part of the domain name
  section of the identifier (eg. `org.example.Example`).

- `io.github.Foo`

  This is problematic because while `foo.github.io` may be unique to
  your project it does not include a project specific identifier. This
  may cause issues if another project creates `io.github.Foo-Bar`
  which should be its own namespace but areas of `flatpak` may treat
  them similar. A better ID would be `io.github.foo.Foo` even if its
  redundant.

- `org.example-site.Foo`

  This ID is not valid according to the DBus specification. You can
  use `org.example_site.Foo` instead.

- `com.github.foo.Bar`

  While a project may be hosted on GitHub it does not have any control
  over the `github.com` domain. Instead you should use `io.github` as
  shown above.

### AppData files

AppData files provide metadata about applications, which is used by
application stores (such as Flathub, GNOME Software and KDE Discover).
The [Freedesktop AppStream
specification](https://www.freedesktop.org/software/appstream/docs/)
provides a complete reference for providing AppData.

AppData files should be named with the application ID and the
`.metainfo.xml` file extension, and should be placed in
`/app/share/metainfo/`. For example:

    /app/share/metainfo/org.gnome.Dictionary.metainfo.xml

A legacy convention of having the `.appdata.xml` installed in
`/app/share/appdata` is also accepted as well, and `flatpak-builder`
will check either directory with either extension.

The `appstream-util validate-relax` command can be used to check AppData
files for errors.

### Application icons

Applications are expected to provide an application icon, which is used
for their application launcher. These icons should be provided in
accordance with the [Freedesktop icon
specification](https://standards.freedesktop.org/icon-theme-spec/icon-theme-spec-latest.html).

Icons should be named with the application's ID, be in either PNG or
SVG format, and must be placed in the standard location:

    /app/share/icons/hicolor/$size/apps/

For example, the path to the 128✕128px version of GNOME Dictionary's
icon is:

    /app/share/icons/hicolor/128x128/apps/org.gnome.Dictionary.png

### Desktop files

Desktop files are used to provide the desktop environment with
information about each application. The [Freedesktop
specification](https://standards.freedesktop.org/desktop-entry-spec/latest/)
provides a complete reference for writing desktop files, and [additional
information about
them](https://wiki.archlinux.org/index.php/desktop_entries) is available
online.

Desktop files should be named with the application's ID, followed by
the `.desktop` file extension, and should be placed in
`/app/share/applications/`. For example:

    /app/share/applications/org.gnome.Dictionary.desktop

A minimal desktop file should contain at least the application's
_name_, _exec_ command, _type_, _icon_ name and _categories_:

    [Desktop Entry]
    Name=Gnome Dictionary
    Exec=org.gnome.Dictionary
    Type=Application
    Icon=org.gnome.Dictionary
    Categories=GNOME;GTK;Office;Dictionary;

The `desktop-file-validate` command can be used to check for errors in
desktop files.

## Exporting through extra-data

Files downloaded through `extra-data` are only downloaded when
installing, as such they aren't yet available for `flatpak-builder` to
automatically export during the build process.

When using `extra-data`, place any files that must be exported under
this location:

    /app/extra/export/share/

For example, if GNOME Dictionary used `extra-data` to download a 96x96
icon this would be its path:

    /app/extra/export/share/icons/hicolor/96x96/apps/org.gnome.Dictionary.png

## Technical conventions

The following are standard technical conventions used by Flatpak and
Linux desktops. Those with Linux experience will likely already be aware
of them. However, developers who are new to Linux might find some of
this information useful.

### D-Bus

D-Bus is the standard IPC framework used on Linux desktops. A lot of
applications won't need to use it, but it is supported by Flatpak
should it be required.

D-Bus can be used for application launching and communicating with some
system services. Applications can also provide their own D-Bus services
(when doing this, the D-Bus service name is expected to be the same as
the application ID).

### Filesystem layout

Each Flatpak sandbox, which is the environment in which an application
is run, contains the filesystem of the application's runtime. This
follows [standard Linux filesystem
conventions](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard).

For example, the root of the sandbox contains the `/etc` directory for
configuration files and `/usr` for multi-user utilities and
applications. In addition to this, each sandbox contains a top-level
`/app` directory, which is where the application's own files are
located.

## XDG base directories

[XDG base
directories](https://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html)
are standard locations for user-specific application data. Popular
toolkits provide convenience functions for accessing XDG base
directories. These include:

- Electron: XDG base directories can be accessed with `app.getPath`
- Glib: provides access to the XDG base directories through the
  `g_get_user_cache_dir ()`, `g_get_user_data_dir ()`,
  `g_get_user_config_dir ()` functions
- Qt: provides access to XDG base directories with the [QStandardPaths
  Class](http://doc.qt.io/qt-5/qstandardpaths.html)

However, applications that aren't using one of these toolkits can
expect to find their XDG base directories in the following locations:

Base directory Usage Default location

---

XDG_CONFIG_HOME User-specific configuration files \~/.var/app/\<app-id\>/config
XDG_DATA_HOME User-specific data \~/.var/app/\<app-id\>/data
XDG_CACHE_HOME Non-essential user-specific data \~/.var/app/\<app-id\>/cache
XDG_STATE_HOME State data such as undo history \~/.var/app/\<app-id\>/.local/state

For example, GNOME Dictionary will store user-specific data in:

    ~/.var/app/org.gnome.Dictionary/data/gnome-dictionary

Note that applications can be configured to use non-default base
directory locations (see [sandbox-permissions](sandbox-permissions).

Note that `$XDG_STATE_HOME` is only supported by Flatpak 1.13 and later.
If your app needs to work on earlier versions of Flatpak, you can use
the `--persist=.local/state` and `--unset-env=XDG_STATE_HOME` finish
args so the app will use the correct directory, even after Flatpak is
later upgraded to \>1.13.
