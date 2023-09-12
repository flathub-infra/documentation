# Requirements

The goal of these requirements is to ensure that the applications hosted on Flathub are safe to use
and integrate well in the desktop experience.

:::tip
If you have any further questions, please ask on [Matrix](https://matrix.to/#/#flatpak:matrix.org).
:::

## License

All content hosted on Flathub must allow legal redistribution, and the license must be
correctly specified in the app's appdata file. Non-redistributable files can be downloaded at install time
using the `extra-data` source type.

## Application ID

Each application should have a unique application ID, following the standard reverse-DNS schema. See [the Flatpak documentation](http://docs.flatpak.org/en/latest/conventions.html#application-ids) for more information on this. The Application ID should be a real URL of a domain that the app author has control over or where their app is hosted.

Ignoring this will lead to problems down the line, such as not being able to verify the app and receiving payments. It also decides, which verification methods will be available. For e.g. using `io.github.flathub.TestApp` would only allow for `Github` or `Website` verification.

## Repository layout

The manifest must be at the top level and named after the application ID with the extension
.json, .yml or .yaml. All patches and data files required also go in the repository.

### Required files

Every repository must contain a manifest describing how to build the application. If the application, and hence repository, is called `com.example.MyCoolApp`, this file must be called `com.example.MyCoolApp.json` or `com.example.MyCoolApp.yaml`. This is the only required file!

This manifest may import other manifest files in the same repository. It's quite common to add the [shared-modules](shared-modules) repository as a submodule.

### Optional

- `README.md` with whatever information you see fit, but be advised that users are unlikely to ever read this. However packaging notes are valuable.
- `flathub.json` (described below)

### Acceptable, but should be submitted upstream

- Any patches necessary to build and run the application in the Flatpak environment
- Additional metadata files (`com.example.MyCoolApp.metainfo.xml` and `com.example.MyCoolApp.desktop`) which are mandatory for Flathub apps but not shipped by some (primarily cross-platform) applications

### Strongly discouraged

Patches which add (or remove) application functionality do not belong in the Flathub repository. The application on Flathub should reflect, as closely as possible, the application in its unadulterated form, direct from its authors.

There is a grey area here for functionality which is only appropriate in a Flatpak environment. The policy on Flathub is that this should live in the upstream version of the application, for several reasons:

- The Flatpak environment can be detected at runtime by looking for a file named `/.flatpak-info`.
- Code maintained outside the main application tree is likely to break as the application evolves.
- It is entirely possible to build and distribute Flatpak applications through channels other than Flathub. In particular, tools like [GNOME Builder](https://wiki.gnome.org/Apps/Builder) take advantage of Flatpak to automatically fetch, build and run the application with a single click on any (Linux) computer. To enable this, not only does all functionality need to live upstream, but so too does the Flatpak manifest!

For cross-platform applications which have a policy of not including platform-specific code in their main tree, the recommended approach is for the application author to create a separate repository for the Flatpak (or perhaps desktop Linux in general) version of the app.

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

Accessing the network is not allowed during the build process, to download extra files, everything that an app requires must be included within the manifest. There is a [community provided set of tools](https://github.com/flatpak/flatpak-builder-tools) to make this easier for some projects (such as npm) that would traditionally want to access the network.

## External data checker for proprietary applications

If application is distributed under proprietary license and uses `extra-data` to avoid redistribution, it shall specify `x-checker-data` key to be automatically scanned for URL changes and new releases. Example usage is described in the [flatpak-external-data-checker's documentation](https://github.com/flathub/flatpak-external-data-checker#changes-to-flatpak-manifests).

## Branches and runtimes

Flathub always builds in the flatpak branchname `stable` and it always passes
`--default-branch=stable`. This means that a branch key doesn't need to be specified. If one is specified, it should be `stable`.

Applications must be built against an SDK that is itself hosted on Flathub.
This requirement also applies to SDK extensions that may be required in order to build an application.
The easiest way to see which runtimes are currently available is to install the flathub remote and
run:

```bash
flatpak remote-ls --runtime --show-details flathub
```

## Bundled Dependencies

Bundled dependencies should meet the requirements on this page, including the license requirements.

Take care to check the build directory for unnecessary files. These should be added to `cleanup`, in order to ensure smaller package sizes.

## Patches

It is fine to patch dependencies, but please send these upstream wherever possible!

## Desktop integration

Flathub is primarily focused on graphical desktop applications and they have the following expectations to ensure effective desktop integration.

Do note that CLI applications do not require a `.desktop` file but TUI applications _should_ have a `.desktop` file with `Terminal=true`.

### Appstream

Appstream is the standard used to provide metadata about applications. Applications must provide appstream data and pass `flatpak run org.freedesktop.appstream-glib validate`. If application metadata has not been provided by the upstream, it should be licensed with [Creative Commons Zero, version 1](https://creativecommons.org/choose/zero/), by stating `CC0-1.0` in `metadata_license`.

In [AppData guidelines](appdata-guidelines) you'll find tips/best practices to help you get your AppData up to spec. For information about appstream, see [its documentation](https://www.freedesktop.org/software/appstream/docs/index.html).

### .desktop files

Applications must include a desktop file and pass `desktop-file-validate`. You should make sure that the upstream project has one for future release if they don't.

See [the desktop file spec](https://standards.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html) for more details.

If you need to change the desktop file, use the command `desktop-file-edit` on a post installation rule.

### Application icons

Applications must provide application icons in at least 128×128px size, or a scalable SVG. Application icons should either be included as scalable SVGs or high-resolution PNGs, and unless they are directly copied from upstream during the package building, they should be limited to the minimum number. In general you shouldn't need to add any icon to your submission, but if you do, you should make sure to contribute upstream, so it is no longer needed in the future.

"stock icons" are not supported.

## Permissions

The Flatpak sandbox is still a work in progress. However, permissions should still be limited
as much as possible (see `man flatpak-metadata` for an overview of permissions).

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

By default you are granted access to `--own-name=$your_app_id` any ownership beyond that is
usually questionable but there are exceptions such as `org.mpris.MediaPlayer2.$media_player_name`.

#### Talk

Talk permissions are largely unrestricted, with the exception of `org.freedesktop.Flatpak` but always try to use the minimum subset needed.

### Filesystem access

Applications should ideally use [portals](https://github.com/flatpak/flatpak/wiki/Portals) for
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
