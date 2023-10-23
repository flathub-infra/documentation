# Updates

Flathub builds and publishes app updates as soon as possible after a change is made to an app's manifest. Depending on the build backlog, this can be anywhere from minutes to hours.

Neither Flathub nor Flatpak dictate the update policy on end-user machines; instead, their OS and app store client (like GNOME Software or KDE Discover) determine the available options, and ultimately it's up to the user's preferences.

However, generally:

- **Automatic updates are enabled by default** in GNOME Software, Endless App Center, and Universal Blue images

- **Automatic updates are available** for KDE Discover and elementary AppCenter, but must be enabled by users

- **Automatic updates are performed daily** when enabled

- Most app store clients will **notify users of available updates at least daily**, even when automatic updates are not enabled

- Apps can implement their own update logic using the [UpdateMonitor Portal](https://flatpak.github.io/xdg-desktop-portal/docs/#gdbus-org.freedesktop.portal.Flatpak.UpdateMonitor), e.g. to **prompt users to install an update and restart the app**
