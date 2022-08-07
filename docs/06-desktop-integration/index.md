# Desktop Integration

[conventions](conventions) covers the essential aspects
of Linux desktop integration. This page provides further information on
optional desktop integration features. It also provides guidance on how
applications can ensure that their user interfaces fit into the whole
range of Linux desktops and distributions.

This information is primarily intended for developers who are new to
Linux. However it is also relevant to desktop-specific Linux
applications who wish to target a broader range of Linux environments.

While targeting the Linux desktop ecosystem might seem challenging, the
existence of common standards, in combination with these guidelines,
means that supporting the full range of Linux environments needn't be
difficult.

## Locale detection

Application toolkits, such as Electron, GTK and Qt, provide built-in
support for detecting which locale to use. Otherwise, the `setlocale`
function can be used.

## Portals

Portals are the framework for securely accessing resources from outside
an application sandbox. They provide a range of common features to
applications, including:

- Determining network status
- Opening a file with a file chooser
- Opening URIs
- Preventing the device from suspend/sleep/powering off
- Printing
- Sending email
- Showing notifications
- Taking screenshots and screencasts

Toolkits like GTK and Qt provide transparent support for portals:

### Portal support in GTK

GTK will transparently use portals for some functionality when it
detects that it is being used inside a Flatpak sandbox. Here are some
hints for what GTK applications should do to benefit from this.

- Use `g_get_user_config_dir()`, `g_get_user_cache_dir()` and
  `g_get_user_data_dir()` to find the right place to store
  configuration and data
- Use `GtkFileChooserNative` (or `GtkFileChooserButton`) to open
  files. As of _xdg-desktop-portal-gtk_ 1.7.1 it can also
  open directories.
- Use `GtkPrintOperation` for printing
- Use `gtk_show_uri_on_window()` or
  `g_app_info_launch_default_for_uri()` to open URIs
- Use `gtk_application_inhibit()` if you want to inhibit idle or
  logout
- Use `g_application_send_notification()` to show notifications
- Use the `GtkApplication::screensaver-active` property to monitor
  screensaver status

### Portal support in Qt and KDE

Qt and KDE libraries will transparently use portals for some
functionality when they detect that they are being used inside a Flatpak
sandbox. Here are some hints for what Qt or KDE applications should do
to benefit from this.

- Use `QDesktopServices::openUrl(const QUrl &url)` or `KIO::KRun` to
  open URIs or send an email when using `mailto` URL
- Use `QFileDialog` class to open files and, as of Qt `5.18.90`,
  directories. Avoid using `QFileDialog::DontUseNativeDialog`. Note
  that portals cannot currently give access to directories on the host
  filesystem
- Use `KNotification::notify()` to show notification

If you are not using one of these toolkits, it is possible to access the
portals API directly. See the [Portals API
documentation](https://flatpak.github.io/xdg-desktop-portal/portal-docs.html)
for more information.

## Notifications

A number of toolkits and frameworks provide transparent support for
Linux desktop notifications. This includes Electron, GTK, KDE and QML.

## Status icons

Status icons are the same concept as the system tray or the taskbar on
Windows, or menu bar icons on Mac. These are supported on most Linux
distributions, through libappindicator.

A number of Linux distributions don't show status icons. It is still
possible to provide a status icon, and it will be shown in some
distributions. However, in order to ensure compatibility, it is
recommended to only use status icons in a supplementary manner, and not
to rely on them as the only mechanism for providing status information
or access to particular features. This includes "minimize to tray" (or
equivalent) functionality.

XEmbed style icons will function with the `x11` permission but all other
status icon interfaces require extra permissions to escape the sandbox
and these services are not designed to be robust against untrusted
software.

## System search

GNOME-based distributions, like CentOS, Fedora, Red Hat Enterprise Linux
and Ubuntu, provide the option to integrate with system search, by
providing a [search
provider](https://developer.gnome.org/SearchProvider/). This allows
application-provided search results to appear in the Activities
Overview.

## Window controls

Window controls are the buttons used to close, maximize and minimize
windows. These do vary across Linux desktops, particularly in terms of
which controls are shown. Whether applications attempt to follow these
variations is up to their discretion. Providing the exact same controls
as used by a particular desktop environment should not be seen as a hard
requirement.

From a user experience perspective, it is important to ensure that
window controls appear on the same side of the window as other desktops.
On Linux this is the right side of the window (like Windows).

On X11 applications can rely on system-provided titlebars if they don't
want to draw their own window controls. For a consistent Wayland
experience applications must always provide their own. Typically
toolkits handle this but raw wayland clients can use
[libdecor](https://gitlab.gnome.org/jadahl/libdecor) for a general
solution.

## Window decorations

If your application uses a dark visual style as well as system-provided
window decorations, the `GTK_THEME_VARIANT=dark` X11 window property
should be used, to ensure that window decorations match the rest of the
application window. This can be done by running:

    xprop -f _GTK_THEME_VARIANT 8u -set _GTK_THEME_VARIANT dark

## Global menus

If your application uses
[Gtk.Application:menubar](https://docs.gtk.org/gtk4/class.Application.html#properties)
or [QMenuBar](https://doc.qt.io/qt-6/qmenubar.html) it will work as
expected from within a sandboxed application.

## Theming

Flatpak applications cannot directly use the system theme. This happens
because flatpaks do not have the ability to use data files or libraries
in `/usr` (where system themes are typically located). The solution to
this was to package themes as Flatpaks, as relying upon the host to have
the correct version for every flatpak defeats the portability benefits
it provides. These themes are provided as
[extensions](https://github.com/flatpak/flatpak/wiki/Extensions), to the
Freedesktop runtime when the extension point is Gtk, and to the KDE
runtime when the extension point is Qt.

The theming system requires Flatpak 0.8.4+ and applications using up to
date `org.gnome.Platform` 3.24+, or `org.freedesktop.Platform` 1.6+, or
`org.kde.Platform` 5.9+.

### Installing themes

#### Instructions for Gtk

The current Gtk themes are packaged in the
[flathub](https://flathub.org/) repository which you can add (if it's
not already added) by running:

    $ flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo

To see a list of currently packaged themes you can use the command
`flatpak search gtk3theme` (available since Flatpak version 0.10.1). In
case you use an older version of Flatpak than that, you can use the
command `flatpak remote-ls flathub | grep org.gtk.Gtk3theme`. The
difference in output between these two commands is that the first prints
the application ID, the remote from which the theme comes and the
theme's description, while the second prints only the full name of the
theme's flatpak package.

You can install themes with the command
`flatpak install flathub org.gtk.Gtk3theme.Foo`, replacing `Foo` with
the name of the desired theme.

#### Instructions for Qt

For the Qt theming to work, the flatpak packages kstyle and
platformtheme must be installed. These are packed in the kdeapps
repository which you can add by running:

    $ flatpak remote-add kdeapps https://distribute.kde.org/kdeapps.flatpakrepo

Afterwards the two packages can be installed with the following
commands:

    $ flatpak install kdeapps org.kde.KStyle.Adwaita//5.9
    $ flatpak install kdeapps org.kde.PlatformTheme.QGnomePlatform//5.9

### Applying themes

There is no ideal way to specify the theme Flatpak applications use. The
applications will try to match the system theme currently being used, if
it corresponds to any of the Flatpak themes installed, and will fall
back to Adwaita (if they use Gtk2 or Gtk3) or the default Qt theme (if
they use Qt) if a corresponding theme isn't detected.

As of Flatpak 0.10.1, the Flatpak system can detect whether the system
themes available correspond to any Flatpak themes available in the
repositories, and, if so, will automatically install found themes at
update time based upon the `gtk-theme` Dconf key. This key however can
contain only one value, the one of the currently being used theme, which
means that the Flatpak versions of matching themes that aren't
currently being used aren't installed until those themes are enabled.
If none of the corresponding system themes are currently being used, the
applications will fall back to Adwaita or the default Qt theme.

On X11, Gtk3 picks up the themes via XSettings. Specifically, the GNOME
XSettings daemon `gsd-xsettings` reads the DConf values and converts
them into the XSettings values. For this to work, you need an xsettings
daemon that is correctly configured. Gtk3 on Wayland picks up themes
directly via Dconf. For this to work, you can either use KDE (with
`kde-gtk-config` \> 5.11.95), GNOME, which works out of the box, or
manually configure the dconf keys under `/org/gnome/desktop/interface/`.
For the DConf option to work on Wayland the application must also be
configured to have DConf access.

### Other notes on theming

In regards to icon themes, since Flatpak 0.8.8 the host icons are
exposed to the guest, so that there is usually no need for the presence
of Flatpak icon themes.

If you use the _Global Dark Theme_ option (removed in GNOME-Tweaks 3.28)
in `gnome-tweak-tool` it will not work as that simply writes to
`settings.ini` which isn't available in the sandbox. Use dark versions
of themes instead if they exist.
