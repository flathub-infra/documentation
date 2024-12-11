# Updates

Flathub builds and publishes app updates after a change is made to an
app's manifest. The exact time to publish can vary depending on the
backlog.

## Creating updates

Updating an application on Flathub (unless it is a direct-upload) is
done by submitting a pull request to the application repository on
GitHub. Once the pull request is submitted, a [test build](/docs/for-app-authors/maintenance#buildbot)
will be triggered against it. Once that is successful and the CI passes,
the maintainers can merge the pull request which will create an
"official build" on [Buildbot](/docs/for-app-authors/maintenance#buildbot).

The official build, if successful, is directly published to the Flathub repository.

Pull requests with updates can be automated with [External Data Checker](/docs/for-app-authors/external-data-checker)
or by using a custom workflow that will submit a pull request to the
Flathub repository.

Any action from Flathub and `peter-evans/create-pull-request` is allowed
to be used.

This can be used in place of the regular global x-checker action to
support updating your dependency manifests or metainfo files. Please
remember to [disable](/docs/for-app-authors/external-data-checker#disable)
the global x-checker action if you are using this to generate application
updates and restrict scheduled jobs to once a week to not overload
Flathub's CI.

## For users

Neither Flathub nor Flatpak dictate the update policy on end-user
machines; instead, their OS and app store client
(like GNOME Software or KDE Discover) determine the available options,
and ultimately it's up to the user's preferences.

However, generally:

- **Automatic updates are enabled by default** in GNOME Software, Endless App Center, and Universal Blue images

- **Automatic updates are available** for KDE Discover and elementary AppCenter, but must be enabled by users

- **Automatic updates are performed daily** when enabled

- Most app store clients will **notify users of available updates at least daily**, even when automatic updates are not enabled

- Apps can implement their own update logic using the [UpdateMonitor Portal](https://docs.flatpak.org/en/latest/portal-api-reference.html#gdbus-interface-org-freedesktop-portal-Flatpak-UpdateMonitor), e.g. to **prompt users to install an update and restart the app**
