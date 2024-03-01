# Updates

Flathub builds and publishes app updates a few hours after a change is made to an app's manifest, though the exact time to publish can vary depending on the build backlog.

## Automatically publish updates

Since Flathub builds apps based on their manifest (unless you're a trusted developer using direct upload), automating updates to your app's manifest enables you to automatically submit updates of your app to be built by and published on Flathub.

For example, you may use [External Data Checker](./11-external-data-checker.md) to automatically propose (and optionally merge) updates to your app's manifest when you make a new release or tag. Note that External Data Checker runs on manifests once per, so there may be a delay between a release and the associated PR.

Another option is to implement a workflow in your app's source repository to submit a PR to the app's manifest when a release is made, though this would still require manual merging of the PR once the manifest's CI passes.

## For users

Neither Flathub nor Flatpak dictate the update policy on end-user machines; instead, their OS and app store client (like GNOME Software or KDE Discover) determine the available options, and ultimately it's up to the user's preferences.

However, generally:

- **Automatic updates are enabled by default** in GNOME Software, Endless App Center, and Universal Blue images

- **Automatic updates are available** for KDE Discover and elementary AppCenter, but must be enabled by users

- **Automatic updates are performed daily** when enabled

- Most app store clients will **notify users of available updates at least daily**, even when automatic updates are not enabled

- Apps can implement their own update logic using the [UpdateMonitor Portal](https://flatpak.github.io/xdg-desktop-portal/docs/#gdbus-org.freedesktop.portal.Flatpak.UpdateMonitor), e.g. to **prompt users to install an update and restart the app**
