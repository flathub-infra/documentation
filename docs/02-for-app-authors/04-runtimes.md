# Runtimes

Runtimes supply the essential dependencies required by applications, and
each application must be built to target a specific runtime and
its associated branch.

As runtimes are distribution-agnostic, they offer a stable,
cross-platform foundation for applications ensuring they remain
functional independent of operating system updates.

From a user and developer perspective, it is advantageous for Flatpak
apps to standardize around a limited number of runtimes derived from a
shared base runtime. This approach simplifies hosting and maintenance,
enhances compatibility and increases consistency.

## Currently hosted runtimes

Flathub hosts three major runtimes currently.

- [Freedesktop runtime](https://gitlab.com/freedesktop-sdk/freedesktop-sdk):
  This is the base runtime for the GNOME and KDE runtimes and provides
  the toolchain stack, graphics stack and all the Flatpak extension points
  used by other runtimes.

  A given branch of the Freedesktop runtime has a 2 year support period
  after which they are declared EOL. A new major version is published on
  August of every year. The release schedule can be found on [Gitlab](https://gitlab.com/freedesktop-sdk/freedesktop-sdk/-/wikis/Releases)
  and announcements of new major version releases are made on
  [Flathub Discourse](https://discourse.flathub.org/c/announcements/6).
  Release notifications are also available by subscribing to releases
  via Gitlab notifications or via the RSS link in the [releases page](https://gitlab.com/freedesktop-sdk/freedesktop-sdk/-/releases).

  The Freedesktop platform (`org.freedesktop.Platform` and
  `org.freedesktop.Sdk`) provides strict ABI/API stability in a major
  version.

- [GNOME runtime](https://gitlab.gnome.org/GNOME/gnome-build-meta):
  This is the GNOME runtime built on top of the Freedesktop runtime and
  provides additional libraries and tooling used by the GNOME Platform.

  Major version releases of the runtime are synced with [GNOME releases](https://release.gnome.org/calendar/)
  and are announced on [GNOME Discourse](https://discourse.gnome.org/tag/announcement).
  Usually a given branch of the runtime is supported for an year and
  EOL-ed upon the release of a newstable version.

- [KDE runtime](https://invent.kde.org/packaging/flatpak-kde-runtime):
  This is the KDE runtime built on top of the Freedesktop runtime and
  provides the Qt stack along with additional libraries used by the KDE
  platform.

  Qt5 LTS (based on KDE's Qt patch collection) branches are created on
  Freedesktop runtime major version releases and Qt6 branches are created
  on new Qt6 releases. More information about the support policy can be
  found on the [wiki](https://community.kde.org/Policies/Flatpak_Runtime_Update_Policy)
  and announcements for new runtime branch releases are made on the
  [KDE Discourse](https://discuss.kde.org/c/announcement/9).

### Check software available in runtimes

The best way to check software packaged in the runtime is to look at
their respective manifests in the git repository or release contents.

This can be done using:

```bash
flatpak run --command=cat <runtime ID>//<runtime branch> /usr/manifest.json|jq -r '."modules"|.[]|."name"'|sed -E 's#.*/(.*)\.bst#\1#'|sort -u

# List all contents in GNOME 47 runtime
flatpak run --command=cat org.gnome.Platform//47 /usr/manifest.json|jq -r '."modules"|.[]|."name"'|sed -E 's#.*/(.*)\.bst#\1#'|sort -u
```

`pkg-config` can be used for modules that install pkg-config files:

```bash
flatpak run --command=pkg-config <Sdk ID>//<sdk branch> --list-all

# Check version appstream in Freedesktop SDK 24.08
flatpak run --command=pkg-config org.freedesktop.Sdk//24.08 --modversion appstream
```

`ldconfig` can be used to list all libraries:

```bash
flatpak run --command=ldconfig <runtime ID>//<runtime branch> -p

# Check libraries in Freedesktop runtime 24.08
flatpak run --command=ldconfig org.freedesktop.Platform//24.08 -p|awk '/\.so/ {print $1}'
```
