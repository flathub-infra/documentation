# Freedesktop quick reference

In order to ensure interoperability, flatpak adheres strictly to a
number of freedesktop standards and practices. This page describes the
basic conventions that should be followed when building a flatpak app.

## Icons

Application icons can be in either png or svg format, must use the
application's appid as a prefix and be placed in
`/app/share/icons/hicolor/$size/apps/`

Example:

    /app/share/icons/hicolor/128x128/apps/org.gnome.Dictionary.png

If interested, you can read the full spec
[here](https://standards.freedesktop.org/icon-theme-spec/icon-theme-spec-latest.html)

## Desktop files

Desktop files are used by desktop environments in order to identify and
display available applications to the user, they contain information
about how to launch the application, its icon and categories among
others.

A minimal desktop file needs at least the application's _Name_, _Exec_
command, _Type_ and _Icon_:

    [Desktop Entry]
    Name=Gnome Dictionary
    Exec=gnome-dictionary --database=dictionary.db
    Type=Application
    Icon=org.gnome.Dictionary

Your desktop file should be prefixed with your application's appid and
placed in `/app/share/applications/` within your app.

Example:

    /app/share/applications/org.gnome.Dictionary.desktop

It's recommended to use `desktop-file-validate` to check your file for
errors before including it.

A special note about the `Exec` line: When installing an app, Flatpak
will automatically rewrite the included `.desktop` file so that the app
will be started through Flatpak. The rewritten desktop file is then
exported to a path such as
`exports/share/applications/org.gnome.Dictionary.desktop` under your
Flatpak installation directory (usually `/var/lib/flatpak/` or
`~/.local/share/flatpak/`). In the case of
`org.gnome.Dictionary.desktop`, the rewritten `Exec` line looks like
this:

    Exec=/usr/bin/flatpak run --branch=stable --arch=x86_64 --command=gnome-dictionary org.gnome.Dictionary --database=dictionary.db

The command from the original desktop file will be part of the
`--command` argument to Flatpak and arguments will be passed through.
This means that in most cases, it should match the value of the
`command:` line in your app's manifest.

If you want the `--command` argument to be omitted from the
`flatpak run` command in the generated desktop file, you can leave the
`Exec` value in the source desktop file empty:

    [Desktop Entry]
    Name=Gnome Dictionary
    Exec=
    Type=Application
    Icon=org.gnome.Dictionary

This way, the generated `Exec` line looks like this:

    Exec=/usr/bin/flatpak run --branch=stable --arch=x86_64 org.gnome.Dictionary

:::note

With Flatpak ≤ 1.12.7, a warning may be shown when exporting a build
with an empty Exec= line to a repository:

    (flatpak build-export:189863): GLib-CRITICAL **: 22:15:27.398: g_path_is_absolute: assertion 'file_name != NULL' failed

This warning can be ignored.
:::

You can find more general information about desktop files
[here](https://wiki.archlinux.org/title/desktop_entries). If interested,
you can read also the full spec
[here](https://specifications.freedesktop.org/desktop-entry-spec/latest/).

## Appdata files

Appdata files are used by application stores (e.g. KDE Discover, GNOME
Software) in order to display metadata about your application, such as a
description, screenshots, changelogs when updates are available, and
other miscellaneous things.

Your Appdata file should be prefixed with your application's appid and
placed in `/app/share/metainfo/`. You should also use
`appstream-util validate-relax` to check your file for errors before
including it.

Example:

    /app/share/metainfo/org.gnome.Dictionary.appdata.xml

If interested, you can read the full spec
[here](https://www.freedesktop.org/software/appstream/docs/).
