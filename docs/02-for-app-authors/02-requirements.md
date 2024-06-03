import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Requirements

The goal of these requirements is to ensure that the applications hosted on Flathub are safe to use
and integrate well in the desktop experience.

:::tip
If you have any further questions, please ask on [Matrix](https://matrix.to/#/#flatpak:matrix.org).
:::

## License

All content hosted on Flathub must allow legal redistribution, and the license must be
correctly specified in the app's [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#license).
Non-redistributable files can be downloaded at install time using the
[extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data)
source type.

## Application ID

Each application should have a unique application ID, following the standard reverse-DNS schema. See [the Flatpak documentation](http://docs.flatpak.org/en/latest/conventions.html#application-ids) for more information on this. The Application ID should be a real URL of a domain that the app author has control over or where their app is hosted.

Ignoring this will lead to problems down the line, such as not being able to verify the app and receiving payments. It also decides, which verification methods will be available. For e.g. using `io.github.flathub.TestApp` would only allow for `Github` or `Website` verification.

## Repository layout

The manifest must be at the top level and named after the application ID with the extension
.json, .yml or .yaml. All patches and data files required also go in the repository.

### Required files

Every repository must contain a manifest describing how to build the application.

The file must be named using the [Application ID](#application-id)
followed by `.json, .yaml, .yml` depending on whether it is JSON or YAML.

#### flathub.json

Flathub supports building on `x86_64` and `aarch64` by default. If the
application is supported on only one architecture, please include a
`flathub.json` file in the submission with the [proper contents](/docs/for-app-authors/maintenance#limiting-the-set-of-architectures-to-build-on).

#### Example manifest

This assumes that upstream brings MetaInfo, icons and desktop files and installs them via their post build install. In this case we're using `meson` as the buildsystem.

<Tabs groupId="manifest-language" defaultValue="json" queryString>
  <TabItem value="json" label="json" default>

```json title="io.github.example.MyCoolApp.json"
{
  "id": "io.github.example.MyCoolApp",
  // The runtime is the environment that the application will run in, so you can use dependencies it provides
  "runtime": "org.freedesktop.Platform",
  "runtime-version": "23.08",
  "sdk": "org.freedesktop.Sdk",
  // This is the command that will be run when the application is launched
  "command": "mycoolapp",
  // These are the permissions that the application needs
  // Read more about finishing here: https://docs.flatpak.org/en/latest/manifests.html#finishing
  "finish-args": [
    "--socket=fallback-x11",
    "--socket=wayland",
    "--socket=pulseaudio",
    "--share=network",
    "--share=ipc"
  ],
  "modules": [
    {
      "name": "mycoolapp",
      // There are other types of buildsystems, like autotools, cmake, cmake-ninja, simple, qmake
      "buildsystem": "meson",
      "sources": [
        {
          "type": "archive",
          "url": "https://github.com/example/mycoolapp/releases/download/v1.0.0/mycoolapp-source-1.0.0.tar.xz",
          "dest": "mycoolapp",
          "sha256": "e198214acdbb57363561dee2d73f27199999af26c283723067525bd854703e12",
          // Automatically check for updates and create merge requests
          "x-checker-data": {
            // There are different types of checkers, see the documentation for more information
            "type": "anitya",
            // This is the ID of the project on anitya
            "project-id": 1,
            "url-template": "https://github.com/example/mycoolapp/releases/download/v$version/mycoolapp-source-$version.tar.xz"
          }
        }
      ]
    }
  ]
}
```

  </TabItem>
  <TabItem value="yml" label="yml">

```yml title="io.github.example.MyCoolApp.yml"
id: io.github.example.MyCoolApp
# The runtime is the environment that the application will run in, so you can use dependencies it provides
runtime: org.freedesktop.Platform
runtime-version: "23.08"
sdk: org.freedesktop.Sdk
# This is the command that will be run when the application is launched
command: mycoolapp
# These are the permissions that the application needs
# Read more about finishing here: https://docs.flatpak.org/en/latest/manifests.html#finishing
finish-args:
  - --socket=fallback-x11
  - --socket=wayland
  - --socket=pulseaudio
  - --share=network
  - --share=ipc
modules:
  - name: mycoolapp
    # There are other types of buildsystems, like autotools, cmake, cmake-ninja, simple, qmake
    buildsystem: meson
    sources:
      - type: archive
        url: https://github.com/example/mycoolapp/releases/download/v1.0.0/mycoolapp-source-1.0.0.tar.xz
        dest: mycoolapp
        sha256: e198214acdbb57363561dee2d73f27199999af26c283723067525bd854703e12
        # Automatically check for updates and create merge requests
        x-checker-data:
          # There are different types of checkers, see the documentation for more information
          type: anitya
          # This is the ID of the project on anitya
          project-id: 1
          url-template: https://github.com/example/mycoolapp/releases/download/v$version/mycoolapp-source-$version.tar.xz
```

  </TabItem>
</Tabs>

### Acceptable, but should be submitted upstream

- Any patches necessary to build and run the application in the Flatpak
  environment
- Additional metadata files like the MetaInfo file, screenshots, icons
  and desktop file

### Strongly discouraged

Patches which add or remove application functionality or large and
complicated patchsets do not belong in the Flathub repository. The
packaging on Flathub should reflect, as closely as possible, the
application in its unadulterated form, direct from its authors.

## Stable releases, reproducible builds

Flathub only hosts stable application releases, and not development snapshots.
Manifests should therefore refer to tarballs or git tags and not the tip of a
branch.

When building from a git tag, both the tag name and the commit id should be specified in your manifest, like so:

```json
   "tag": "1.0.4",
   "commit": "cdfb19b90587bc0c44404fae30c139f9ec1cca5c"
```

This ensures that the build is reproducible, since tag can change their values over time. A commit can also be specified without a tag, however tag names are encouraged as they are better for readability.
## No network access at build time

Accessing the network is not allowed during the build process.
Everything that an app requires must be included within the manifest.

If upstream has vendored tarballs those can be used.

There is a [community provided set of tools](https://github.com/flatpak/flatpak-builder-tools)
to generate a dependency manifest for Flatpak.

This can be used for projects using npm, yarn, cargo etc. that
traditionally depend on fetching dependencies at build time.

## External data checker for proprietary applications

External Data Checker is a tool that can automate updating sources in
the Flatpak manifest and send PRs.

Please see the [readme](https://github.com/flathub-infra/flatpak-external-data-checker)
on how to use it.

## Branches and runtimes

Applications must be built against an SDK or runtime that hosted on Flathub.

Applications that target the `stable` Flathub repo are not allowed to
use SDKs or runtimes that are in the `beta` repository and vice-versa.

The easiest way to see which runtimes are currently available is to
install the flathub remote and run:

```bash
flatpak remote-ls --runtime --show-details flathub
```

## Desktop integration

Flathub is primarily focused on graphical desktop applications and they have the following expectations to ensure effective desktop integration.

Do note that CLI applications do not require a `.desktop` file but TUI applications _should_ have a `.desktop` file with `Terminal=true`.

### Appstream

Appstream is the standard used to provide metadata about applications. Applications must provide appstream data and pass [validation](/docs/for-app-authors/metainfo-guidelines/#validation).

Please read the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines) for more information.

### Desktop files

Applications must include a desktop file and pass `desktop-file-validate`.

See [the desktop file spec](https://standards.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html) for more details.

If you need to change the desktop file, use the command `desktop-file-edit` on a post installation rule.

### Application icons

Applications must provide at least a 256x256 PNG icon or a SVG icon.

Icons must have square dimensions and must not [violate any trademarks](/docs/for-app-authors/metainfo-guidelines/quality-guidelines#no-trademark-violations).

## Permissions

Permissions should be limited as much as possible.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
for more information.

A full list of permissions can be found in the [flatpak-metadata](https://docs.flatpak.org/en/latest/flatpak-command-reference.html#flatpak-metadata)
page.

### Unrestricted permissions

The following permissions can be freely used:

- `--share=network`
- `--share=ipc`
- `--socket=x11`
- `--socket=fallback-x11`
- `--socket=wayland`
- `--socket=pulseaudio`
- `--device=dri`

`--socket=x11` and `--socket=fallback-x11` are mutually exclusive and either also need `--share=ipc` to be requested.

In general there should not be `--socket=x11` and `--socket=wayland`, beside a few exceptional cases.

### DBus access

Applications should not grant `--socket=system-bus` or `--socket=session-bus`, unless they are
development tools. The `--log-session-bus` and `--log-system-bus` flags can be used with `flatpak run`
in order to track down usage.

#### Ownership

By default you are granted access to `--own-name=$your_app_id`. So, the app-id used in the flatpak manifest and the bus name used
has to match. If they don't match you might need to grant access with `--own-name`.

Flatpak will also by default grant access to subnames of the MPRIS bus in the form of `org.mpris.MediaPlayer2.$your_app_id`. If that's
not used by your application, you will need to add a `--talk-name` or `--own-name` as required. See the bus policy [documentation](https://docs.flatpak.org/en/latest/flatpak-command-reference.html#session-bus-policy-metadata) on this.

Any ownership beyond that is usually questionable.

#### Talk

Talk permissions are largely unrestricted, with the exception of `org.freedesktop.Flatpak` but always try to use the minimum subset needed.

### Filesystem access

Applications should ideally use [portals](https://flatpak.github.io/xdg-desktop-portal/docs/) for
file access. Further file access is often necessary and is acceptable, although it should be limited as much as possible.

Additional recommendations:

- For access to XDG directories, variables such as `xdg-music` and `xdg-run/foo` are recommended (see `man flatpak-metadata`).

- Always append `:ro` if write access is not needed.

- If an application hardcodes a path in `$HOME` and you don’t grant `home` access you can
  use `--persist` and it will map the `$HOME` directory to your private directory e.g.
  `--persist=.mozilla`. If the application takes args to set config/data dirs then use them.

- Do not attempt to retain configs from non-flatpak installations. While possible it is
  recommended that flatpak installs stay self-contained.

- If an application uses `$TMPDIR` to contain lock files it may make sense to use `--env=TMPDIR=/var/tmp` or if
  it shares those files outside the sandbox you may need to create a wrapper script that sets it to `$XDG_CACHE_HOME`.

- Locations `xdg-config`, `xdg-data` and `xdg-cache` are restricted and need a [linter](linter) exception.

### Device access

While not ideal, `--device=all` can be used to access devices like controllers or webcams.
