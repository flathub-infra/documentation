# Flatpak builder lint

The Flatpak builder lint tool is a linter for Flatpak manifests. It's used to check for common errors, to enforce a consistent style and permissions.
It can be found in the [flatpak-builder-lint](https://github.com/flathub/flatpak-builder-lint) repository.

Please follow [installation instructions](https://github.com/flathub/flatpak-builder-lint#flatpak) to install and run locally.

It's run against all builds sent to Flathub, and can be run locally to check your manifest before submitting it. You can find more information in the readme.

## Linter errors

Here is a list of linter errors, and whether exceptions may be applied, by default.

### appid-code-hosting-too-few-components

**Exceptions allowed**: No[^1]

The app id uses a code hosting domains like gitlab, github or codeberg
and doesn't have 4 components: `{tld}.{doamin}.foo.bar`.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
and [Flatpak conventions](https://docs.flatpak.org/en/latest/conventions.html#application-ids)
for more information.

### appid-ends-with-lowercase-desktop

**Exceptions allowed**: No[^1]

The app id ends with lowecase `.desktop`.

Please follow the [Flatpak documentation](https://docs.flatpak.org/en/latest/conventions.html#application-ids)
for more information.

### appid-filename-mismatch

**Exceptions allowed**: No

The filename of the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
does not match the app id used in the manifest.

### appid-not-defined

**Exceptions allowed**: No

The app id is not defined in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

This can happen when `id` or `app-id` property is missing from the
manifest and consequently the [Flatpak build metadata](https://docs.flatpak.org/en/latest/flatpak-command-reference.html#flatpak-metadata)
is missing the `name` property.

`id` or `app-id` is mandatory in manifest.

### appid-uses-code-hosting-domain

**Exceptions allowed**: No[^1]

The app id uses a code hosting domains like gitlab, github or codeberg
and the first `{tld}` component does not start with `io` for github
and gitlab; `page` for codeberg.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
and [Flatpak conventions](https://docs.flatpak.org/en/latest/conventions.html#application-ids)
for more information.

### appstream-external-screenshot-url

**Exceptions allowed**: No

The screenshots in [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file which are not of [type](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-screenshots)
`source` aren't mirrored to https://dl.flathub.org/media or the legacy
https://dl.flathub.org/repo/screenshots.

[Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
invokes `appstreamcli compose` for mirroring when `--mirror-screenshots-url=URL`
is passed.

This can happen when mirroring fails due to spurious connectivity issues
and is usually resolved by restarting the build.

Externally uploaded apps must ensure `--mirror-screenshots-url=URL`
was passed to Flatpak Builder.

### appstream-failed-validation

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
has failed validation. The output from the validation is in the `appstream`
block.

AppStream considers both warnings (`W`) and errors (`E`) as fatal
and they must be resolved.

Please use the [linter](/docs/for-app-authors/metainfo-guidelines/#validation)
to validate the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
and fix the issues reported.

Flathub increases the severity of the following checks from the upstream
default of `info` to `error`. So they are documented below.

- `cid-has-number-prefix` - The `id` tag contains a segement starting with a number. Please see the [application ID guidelines](/docs/for-app-authors/requirements#application-id) for more information.
- `cid-missing-affiliation-gnome` - The application is using a `project_group` tag with the value `GNOME` but the [ID](/docs/for-app-authors/metainfo-guidelines/#id) does not start with `org.gnome`. Please see the [documentation](/docs/for-app-authors/metainfo-guidelines/#project-group) on how to use this tag.
- `content-rating-missing` - The application is missing an [OARS rating](/docs/for-app-authors/metainfo-guidelines/#oars-information) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).
- `desktop-app-launchable-omitted` - The application is missing a [launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).
- `invalid-child-tag-name` - The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has a child tag which isn't allowed under that parent tag.
- `name-has-dot-suffix` - The [name](/docs/for-app-authors/metainfo-guidelines/#name-summary-and-developer-name) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) ends in a dot (`.`).
- `releases-info-missing` - The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has no [release information](/docs/for-app-authors/metainfo-guidelines/#release).
- `unknown-tag` - The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has an invalid tag. Non-standard tags must be prefixed with `x-` or should be under `<custom>` tag.

A full list of error codes and explanations can also be found online in the
[data validation](https://www.freedesktop.org/software/appstream/docs/chap-Validation.html#validator-issues-list)
page.

### appstream-id-mismatch-flatpak-id

**Exceptions allowed**: No[^1]

The `id` tag in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
does not match the `FLATPAK_ID` (the `id` or `app-id` used in manifest).

No new submissions are allowed with a mismatch between the two.

Existing applications may use the the `rename-appdata-file` or
`rename-desktop-file` [property](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
in the manifest or a patch to update the `id` tag in the MetaInfo file.
Exceptions may be allowed for existing applications on a case-by-case
basis.

Please also make sure to add a `provides` and `replaces` tag when patching
manually. See the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#provides)
for more details.

### appstream-launchable-file-missing

**Exceptions allowed**: No

The MetaInfo file had a [launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable)
defined but the file was not found in `${FLATPAK_DEST}/share/applications`.

This could be due to the tag having an incorrect value or the file
was not installed in `${FLATPAK_DEST}/share/applications` or has the
wrong filename.

### appstream-metainfo-missing

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing from the build.

Please make sure to install it to the correct folder and name the file
according to the application id used in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

### appstream-missing-appinfo

**Exceptions allowed**: No

The build or the ostree repo is missing the folder `files/share/app-info`.

Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
for more details.

A [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
must be supplied during the build with the [proper filename](/docs/for-app-authors/metainfo-guidelines/#path-and-filename),
[id tag](/docs/for-app-authors/metainfo-guidelines/#id),proper `desktop-id` in `launchable` [tag](/docs/for-app-authors/metainfo-guidelines/#launchable)
and all of them must match the app id used in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

### appstream-missing-appinfo-file

**Exceptions allowed**: No

The build or the OSTree repo is missing the [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file.

This can happen when compose fails.

A [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
must be supplied during the build with the [proper filename](/docs/for-app-authors/metainfo-guidelines/#path-and-filename),
[id tag](/docs/for-app-authors/metainfo-guidelines/#id), proper `desktop-id` in `launchable` [tag](/docs/for-app-authors/metainfo-guidelines/#launchable)
and all of them must match the app id used in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

### appstream-missing-categories

**Exceptions allowed**: No

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file is missing `categories`.

This is due to the desktop file having no valid categories.

Certain low quality categories are filtered out. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#categories-and-keywords)
for more details.

### appstream-missing-developer-name

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the `developer` tag with a child `name` tag or the legacy
`developer_name` tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#name-summary-and-developer-name).

This must be present for proper display and classification by app stores.

### appstream-missing-project-license

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the `project_license` tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#license).

This must be present for proper display of the license by the app store.

### appstream-missing-icon-file

**Exceptions allowed**: No

The build or the OSTree repo is missing a 128px png icon generated by
`appstreamcli compose`.

Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
for more details.

### appstream-missing-icon-key

**Exceptions allowed**: No

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file is missing an `icon` key.

This tag is automatically generated by
`appstreamcli compose` provided some conditions are met. Please see
the [icon section](/docs/for-app-authors/metainfo-guidelines/#icons) of
the MetaInfo guidelines for more details.

This check is only performed on graphical desktop applications.

### appstream-icon-key-no-type

**Exceptions allowed**: No

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file has an `icon` key with no `type` attribute. Please see
the [icon section](/docs/for-app-authors/metainfo-guidelines/#icons) of
the MetaInfo guidelines on how to use this tag.

This check is only performed on graphical desktop applications.

### appstream-remote-icon-not-mirrored

**Exceptions allowed**: No

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file has an `icon` key with `type=remote` but the URL in the tag does not
start with `https://dl.flathub.org/media/`.

Any remote icons from the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) will automatically be mirrored
to the above media repo provided `--mirror-screenshots-url=https://dl.flathub.org/media/`
was passed while [building the Flatpak](/docs/for-app-authors/submission#before-submission)
to [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html).

This should not be reached by applications built on Flathub. Externally
uploaded applications must ensure to mirror media as explained above.

### appstream-missing-screenshots

**Exceptions allowed**: No

No image tag of screenshots in the [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file has [type](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-screenshots)
`thumbnail`. Thumbnail images are generated automatically by
`appstreamcli compose` when the image in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
meets the required size.

This can happen when screenshot tags are missing/not properly defined in
the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
or if the image file/URL is malformed or is below the required size.

Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#screenshots)
on how to define them.

If the screenshot tag is fine but the error happens, it can mean that
[mirroring](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
failed due to connectivity issues. Unless the link is dead, this should
usually be resolved by restarting the build.

### appstream-multiple-components

**Exceptions allowed**: No

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file is malformed and has multiple `component` tags.

### appstream-no-flathub-manifest-key

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the `flathub::manifest` tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#manifest-location)
on how to define it.

This must be present for externally uploaded apps.

### appstream-screenshots-not-mirrored-in-ostree

**Exceptions allowed**: No

The ostree ref is missing a `screenshots/{arch}` ref.

This error should not be reached on Flathub. Externally uploaded apps
must ensure to [mirror screenshots](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html),
commit the screenshot ref and upload the screenshot ref for all
architectures.

Committing is done after [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder.html)
exported a repo, using `ostree commit --repo=<repo name> --canonical-permissions
--branch=screenshots/<arch> <builddir>/files/share/app-info/media`.

The process is automated when using [flatpak-github-actions](https://github.com/flathub-infra/flatpak-github-actions#inputs).

### appstream-unsupported-component-type

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
either uses an unsupported `component` type or is missing the `type`
attribute. As a result the [AppStream catalog data](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
has the wrong component type.

The following types are supported on Flathub: `addon, console-application, desktop, desktop-application, runtime`.
Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#header) for the details.

### desktop-file-exec-has-flatpak-run

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files),
exactly matching the `$FLATPAK_ID` is checked.

The `Exec` key of the desktop file in the build has `flatpak run` in it.

Desktop files do not need to manually make the `Exec` value `flatpak run ...`
as that is done by `flatpak` itself during installation.

### desktop-file-exec-key-absent

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files),
exactly matching the `$FLATPAK_ID` is checked.

The `Exec` key is missing in the desktop file supplied.

Desktop files must have an `Exec` key even when using `DBusActivable=true`.

### desktop-file-failed-validation

**Exceptions allowed**: No

The [desktop file(s)](https://docs.flatpak.org/en/latest/conventions.html#desktop-files)
supplied in the build have failed validation with `desktop-file-validate`.

Please correct the errors reported.

### desktop-file-icon-key-absent

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files),
exactly matching the `$FLATPAK_ID` is checked.

The desktop file supplied in the build has no `Icon` key.

There must be an icon key present in the desktop file of a graphical
application.

### desktop-file-icon-key-empty

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files),
exactly matching the `$FLATPAK_ID` is checked.

The desktop file supplied in the build has an empty `Icon` key.

The `Icon` key in the desktop file must have a proper value.

### desktop-file-icon-key-wrong-value

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files),
exactly matching the `$FLATPAK_ID` is checked.

The `Icon` key of the desktop file supplied in the build does not have
a proper value.

The value must be of the following patterns: `$FLATPAK_ID`, `$FLATPAK_ID.foo`
or `$FLATPAK_ID-foo`. It may end with an extension but only `svg, png, xpm`
are allowed.

### desktop-file-is-hidden

**Exceptions allowed**: Yes[^2]

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files),
exactly matching the `$FLATPAK_ID` is checked.

The desktop file supplied in the build sets `Hidden=true` or
`NoDisplay=true`.

### desktop-file-not-installed

**Exceptions allowed**: No

The [desktop file(s)](https://docs.flatpak.org/en/latest/conventions.html#desktop-files),
are either not installed to the proper location during the build or does
not match the `$FLATPAK_ID`.

Console applications are allowed to have no desktop files installed,
[extra-data](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html?highlight=extra-data#)
and graphical applications must install a desktop file during the build.

### finish-args-absolute-home-path

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--filesystem=` permission that starts with
`/home` or `/var/home`.

Flatpak cannot access anything in `/home` and `/home/username` becomes
dependent on the username, so it'll work in only one machine.

`--filesystem=~/foo`, `--filesystem=home`, `--filesystem=home/foo` should
be used. Consult the [sandbox permission reference](https://docs.flatpak.org/en/latest/sandbox-permissions-reference.html#filesystem-permissions)
and the [manual page](https://docs.flatpak.org/en/latest/flatpak-command-reference.html?highlight=filesystem#).

### finish-args-absolute-run-media-path

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has an absolute `/run/media/foo` path in `filesystem`
permission.

Media mounting is done by host and the subpath is specific to an instance
of the device or an user.

Please use `/run/media` or `/run/media/` instead.

### finish-args-arbitrary-autostart-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-config/autostart` or
`--filesystem=xdg-config/autostart:create`.

Applications should be using the [background portal](https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.Background.html)
for that.

### finish-args-arbitrary-dbus-access

**Exceptions allowed**: Yes[^4]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--socket=session-bus` or `--socket=system-bus`.

This must not be used except for very specific cases. Please follow the
[requirements section](/docs/for-app-authors/requirements#dbus-access) to
find out specific permissions needed.

### finish-args-arbitrary-xdg-cache-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-cache`, with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG cache directory under
`~/.var/app/<app-id>/cache`.
Applications do not need to access the host's cache directory.

Please see the [Flatpak permission reference](https://docs.flatpak.org/en/latest/sandbox-permissions-reference.html#f5).

### finish-args-arbitrary-xdg-config-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-config`, with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG config directory under
`~/.var/app/<app-id>/config`.
Applications do not need to access the host's config directory.

Please see the [Flatpak permission reference](https://docs.flatpak.org/en/latest/sandbox-permissions-reference.html#f5).

### finish-args-arbitrary-xdg-data-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-data`, with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG data directory under
`~/.var/app/<app-id>/data`.
Applications do not need to access the host's data directory.

Please see the [Flatpak permission reference](https://docs.flatpak.org/en/latest/sandbox-permissions-reference.html#f5).

### finish-args-fallback-x11-without-wayland

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--socket=wayland` but no `--socket=fallback-x11`.

This means the application won't launch in an X11 session. Applications
supporting native wayland must specify both.

Follow the [permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
for more information.

### finish-args-flatpak-spawn-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--talk-name=org.freedesktop.Flatpak`.

This allows applications to launch arbitrary commands on the host and
is restricted and granted on a case-by-case basis.

This must not be used unless absolutely necessary and when no existing
solutions using Flatpak or [portals](https://flatpak.github.io/xdg-desktop-portal/docs/)
exist.

### finish-args-has-nosocket-socket

The following error codes are included here:

finish-args-has-nosocket-x11, finish-args-has-nosocket-fallback-x11,
finish-args-has-nosocket-wayland, finish-args-has-nosocket-pulseaudio,
finish-args-has-nosocket-system-bus, finish-args-has-nosocket-session-bus,
finish-args-has-nosocket-ssh-auth, finish-args-has-nosocket-pcsc,
finish-args-has-nosocket-cups, finish-args-has-nosocket-gpg-agent

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--nosocket=socket`.

Socket is one of the value [Flatpak allows](https://docs.flatpak.org/en/latest/flatpak-command-reference.html#flatpak-run).

These do not need to present in the build manifest. By default no access
is granted.

### finish-args-has-nodevice-device

The following error codes are included here:

finish-args-has-nodevice-dri, finish-args-has-nodevice-input,
finish-args-has-nodevice-kvm, finish-args-has-nodevice-shm,
finish-args-has-nodevice-all

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--nodevice=device`.

Device is one of the value [Flatpak allows](https://docs.flatpak.org/en/latest/flatpak-command-reference.html#flatpak-run).

These do not need to present in the build manifest. By default no access
is granted.

### finish-args-has-unshare-subsystem

The following error codes are included here:

finish-args-has-unshare-network, finish-args-has-unshare-ipc

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--unshare=subsystem`.

Subsystem is one of the value [Flatpak allows](https://docs.flatpak.org/en/latest/flatpak-command-reference.html#flatpak-run).

These do not need to present in the build manifest. By default no access
is granted.

### finish-args-incorrect-dbus-gvfs

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--talk-name=org.gtk.vfs`.

This permission does nothing. Please follow the [reference](https://docs.flatpak.org/en/latest/sandbox-permissions.html#gvfs-access)
for permissions required for proper gvfs access.

### finish-args-not-defined

**Exceptions allowed**: Yes[^2]

The manifest has no [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing).

This is only selectively allowed for console applications if needed.

### finish-args-only-wayland

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has only `--socket=wayland` but no `x11` or `fallback-x11`
access.

This means the application will not be able to launch in a X11 session.

### finish-args-portal-own-name

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `own-name` starting with
`org.freedesktop.portal.`.

Portal interfaces do not need to be manually added. These are allowed by
Flatpak by default.

### finish-args-portal-talk-name

**Exceptions allowed**: No

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `talk-name` starting with
`org.freedesktop.portal.`.

Portal interfaces do not need to be manually added. These are allowed by
Flatpak by default.

### finish-args-redundant-home-and-host

**Exceptions allowed**: No

The manifest has both `--filesystem=home` and `--filesystem=host` in
[finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing).

`host` grants access to `home`. Specifying both is redundant.

### finish-args-reserved-dir

The following error codes are included here:

finish-args-reserved-.flatpak-info, finish-args-reserved-app, finish-args-reserved-dev,
finish-args-reserved-etc, finish-args-reserved-lib, finish-args-reserved-lib32,
finish-args-reserved-proc, finish-args-reserved-root, finish-args-reserved-run/flatpak,
finish-args-reserved-run/host, finish-args-reserved-sbin, finish-args-reserved-usr

**Exceptions allowed**: No

The manifest has both `--filesystem=/dir` in
[finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
where `dir` is one of `.flatpak-info, app, dev, etc, lib, lib32, lib64, proc, root, run/flatpak, run/host, sbin, usr`.

These paths are reserved by flatpak itself or the runtime and adding them
to the manifest does nothing.

### finish-args-unnecessary-appid-own-name

**Exceptions allowed**: No

The manifest has `--own-name=<FLATPAK_ID>` in
[finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing).

This access is granted automatically by Flatpak and there is no need
to specify manually. Please see the [bus access](/docs/for-app-authors/requirements#dbus-access)
section to know more.

### finish-args-unnecessary-xdg-cache-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-cache/foo` with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG cache directory under
`~/.var/app/<app-id>/cache`. Applications do not need to access the
host's cache directory or subpaths of it.

Please see the [Flatpak permission reference](https://docs.flatpak.org/en/latest/sandbox-permissions-reference.html#f5).

### finish-args-unnecessary-xdg-config-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-config/foo` with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG cache directory under
`~/.var/app/<app-id>/config`. Applications do not need to access the
host's config directory or subpaths of it.

Please see the [Flatpak permission reference](https://docs.flatpak.org/en/latest/sandbox-permissions-reference.html#f5).

### finish-args-unnecessary-xdg-data-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-data/foo` with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG cache directory under
`~/.var/app/<app-id>/data`. Applications do not need to access the
host's config directory or subpaths of it.

Please see the [Flatpak permission reference](https://docs.flatpak.org/en/latest/sandbox-permissions-reference.html#f5).

### finish-args-wildcard-freedesktop-own-name

**Exceptions allowed**: No

The manifest has a `own-name` that is `org.freedesktop.*`.

Wildcard access to bus names in well known namespace is a security issue.

### finish-args-wildcard-gnome-own-name

**Exceptions allowed**: No

The manifest has a `own-name` that is one of `org.gnome.*`.

Wildcard access to bus names in well known namespace is a security issue.

### finish-args-wildcard-kde-own-name

**Exceptions allowed**: Yes

The manifest has a `own-name` that is `org.kde.*`.

Wildcard access to bus names in well known namespace is a security issue.

Exceptions to this are allowed in case of legacy tray usage.

### finish-args-wildcard-freedesktop-talk-name

**Exceptions allowed**: No

The manifest has a `talk-name` that is `org.freedesktop.*`.

Wildcard access to bus names in well known namespace is a security issue.

### finish-args-wildcard-gnome-talk-name

**Exceptions allowed**: No

The manifest has a `talk-name` that is one of `org.gnome.*`.

Wildcard access to bus names in well known namespace is a security issue.

### finish-args-wildcard-kde-talk-name

**Exceptions allowed**: Yes

The manifest has a `talk-name` that is `org.kde.*`.

Wildcard access to bus names in well known namespace is a security issue.

### flat-manager-branch-repo-mismatch

**Exceptions allowed**: No

The branch of the ostree ref does not match the target Flathub repo it
is being uploaded to.

The target repo for Flathub is either `stable` or `beta`.

This should not be reached by apps that are built on Flathub. They also
should never use `branch/*` to name the branch of the Github repo for the
app. Please see [this](/docs/for-app-authors/maintenance#the-repository)
for more details.

Externally uploaded applications must ensure to upload `stable` branch refs
to the `stable` Flathub repo or `beta` branch refs to the `beta` Flathub
repo.

The branch is set during the build process by Flatpak Builder using
`--default-branch=BRANCH` or the `branch` or `default-branch` property
in the manifest. Please see [Flatpak Builder documentation](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
for more details.

Apps built on Flathub must avoid setting either key in the manifest.

### flat-manager-no-app-ref-uploaded

**Exceptions allowed**: No

The flat manager token was of type `app` but no ostree refs starting with
`app/` were uploaded.

This should not be reached by applications built on Flathub. Externally
uploaded applications must ensure they upload the proper application
refs only.

### flathub-json-eol-rebase-without-message

**Exceptions allowed**: No

The `flathub.json` file had `end-of-life-rebase` property but no
`end-of-life` property.

Please consult the [documentation](/docs/for-app-authors/maintenance#end-of-life)
for the proper end-of-life process.

### flathub-json-excluded-all-arches

**Exceptions allowed**: No

The `flathub.json` file excluded all currently available architectures on
Flathub ie. `aarch64, x86_64`. At least one must be present otherwise
the build won't be done.

### flathub-json-modified-publish-delay

**Exceptions allowed**: Yes[^5]

The `flathub.json` file had `publish-delay-hours` with value less than 3.

This is only allowed for [extra-data](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html?highlight=extra-data#)
applications.

### flathub-json-only-arches-empty

**Exceptions allowed**: No

The `flathub.json` file had `only-arches` but it was empty.

### flathub-json-skip-appstream-check

**Exceptions allowed**: No

The `flathub.json` file had `skip-appstream-check`.

This is only allowed for [BaseApps](https://docs.flatpak.org/en/latest/introduction.html?highlight=baseapp#terminology)
or [Extensions](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html?highlight=extension#).
For regular applications this does nothing currently.

### jsonschema-schema-error

**Exceptions allowed**: No

The manifest schema was malformed.

### jsonschema-validation-error

**Exceptions allowed**: No

The manifest schema failed validation.

### metainfo-missing-component-tag

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the initial `component` tag.

All MetaInfo files must start with the [component tag](/docs/for-app-authors/metainfo-guidelines/#header)
with a proper `type` attribute.

### metainfo-missing-component-type

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the `type` attribute in the `component` tag.

All MetaInfo files must use a supported `type` attribute in the `component`
tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#header)
for the details.

### metainfo-missing-launchable-tag

**Exceptions allowed**: No

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the `launchable` tag.

All MetaInfo files for desktop applications must have the
[launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable).

### module-module_name-source-dest-filename-is-path

**Exceptions allowed**: No

The `dest-filename` property in the
[Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is a path.

It must be a filename only.

### module-module_name-source-git-branch

**Exceptions allowed**: No

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
with type `git`, uses `branch` with a branch name in the
[Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

It should use either `commit`, or `tag` and `commit` or a `tag` in place
of `branch`.

### module-module_name-source-git-local-path

**Exceptions allowed**: No

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but specifies a local path using `path`.

It must point to a web resource and use `url` property.

### module-module_name-source-git-no-commit-or-tag

**Exceptions allowed**: No

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but, either specifies no `commit` or `tag` property or
the `branch` property does not point to a commit hash.

At least a `commit` or a `tag` or both must be present. If neither is
present and `branch` is used, it must point to a git commit hash.

This is done for reproducibility.

### module-module_name-source-git-no-commit-or-tag

**Exceptions allowed**: No

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but no `url` property.

It must point to a web resource and use `url` property.

### module-module_name-source-git-url-not-http

**Exceptions allowed**: No

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but `url` property does not use a http/https link.

The `url` property must use a `http` or a `https` link.

### module-module_name-autotools-non-release-build

**Exceptions allowed**: No

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
using buildsystem `autotools` sets `--enable-debug=no`.

This is not allowed.

### no-exportable-icon-installed

**Exceptions allowed**: No

This means that no exportable icons were found in the [proper location](https://docs.flatpak.org/en/latest/conventions.html#application-icons).
An icon is considered by Flatpak to be exportable if it matches any of
the following patterns: `$FLATPAK_ID, $FLATPAK_ID-foo, $FLATPAK_ID.foo`.
They may end with extension suffixes like `.png` or `.svg`.

### toplevel-cleanup-debug

**Exceptions allowed**: No

The toplevel `cleanup` property in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has `/lib/debug`.

This must not be cleaned up as it is used to generate debug data for the
Flatpak by [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder.html).

### toplevel-no-command

**Exceptions allowed**: No

The toplevel `command` property in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is absent.

This property is required.

### toplevel-no-modules

**Exceptions allowed**: No

The [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has no `modules` property.

This property is required.

[^1]: Only if the package existed before the linter was introduced.
[^2]: Only for console applications.
[^3]: Might be granted on a case-by-case basis.
[^4]: Only for tools that requires D-Bus access and the bus names are not predictable like D-Bus tools and IDEs.
[^5]: Granted for `extra-data`.

## Linter warnings

Warnings are non-fatal but they should be resolved, if possible. Some of
them might be promoted to an error in the future if needed.

### appstream-name-too-long

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
has a `name` tag of length greater that 20 characters.

Please refer to the [quality guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines#not-too-long)
for more details.

Only the English name is checked.

### appstream-screenshot-missing-caption

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing `caption` tag for one or more screenshots or the `caption`
tag is empty.

Please refer to the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#screenshots)
for more details.

### appstream-summary-ends-in-dot

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
has a `summary` tag ending with the dot or period character `.`.

Please refer to the [quality guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines#no-weird-formatting-1)
for more details.

Only the English summary is checked.

### appstream-summary-too-long

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
has a `summary` tag of length greater that 35 characters.

Please refer to the [quality guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines#not-too-long-1)
for more details.

Only the English summary is checked.

### desktop-file-exec-key-empty

The [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files)
has a empty `Exec=` key.

Although this gets rewritten to a fallback by Flatpak during installation
an `Exec` key with a value should be present for compatibility.

### desktop-file-low-quality-category

The [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files)
has one or more low-quality category and no proper (non low-quality)
category.

The following are considered to be low-quality categories:
`KDE, GTK, Qt, Application, GNOME` and are best suited for `Keywords`
instead.

Low quality categories are filtered by `appstreamcli compose`. Proper
category names should be used. Please refer to the [category specification](https://specifications.freedesktop.org/menu-spec/latest/apa.html)
for category names.

### finish-args-contains-both-x11-and-fallback

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has both `--socket=x11` and `--socket=fallback-x11`.

The latter is only needed when using `--socket=wayland`. Both are never
needed.

### finish-args-contains-both-x11-and-wayland

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has both `--socket=x11` and `--socket=wayland`.

Both are not needed. If the application does not support native wayland
only `--socket=x11` should be used. If it does support native wayland,
`--socket=fallback-x11` and `--socket=wayland` should be used.

### finish-args-deprecated-shm

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--device=shm`. This is deprecated.

### finish-args-redundant-device-all

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--device=all` and `--device=DEVICE` both.

`all` grants access to all devices except `shm`.

### finish-args-x11-without-ipc

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--socket=x11` but no `--share=ipc`.

Applications needing `--socket=x11` also need SysV IPC access.

### flathub-json-deprecated-arch_name-arch-excluded

The `flathub.json` file tries to exclude (`exclude-arches`) a deprecated
architecture on Flathub. `arch_name` is one of `i386` or `arm`.

This can be safely removed.

### flathub-json-deprecated-arch_name-arch-included

The `flathub.json` file tries to include (`only-arches`) a deprecated
architecture on Flathub. `arch_name` is one of `i386` or `arm`.

This can be safely removed.

### flathub-json-exclude-arches-empty

The `flathub.json` file has empty `exclude-arches`.

### flathub-json-redundant-only-arches

The `flathub.json` file has `only-arches` with `aarch64, x86_64`.

These are the only two architectures available on Flathub currently.
Specifying both explicitly is redundant.

### module-module_name-source-md5-deprecated

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using the deprecated and insecure `md5` checksum.

It is recommended to switch to `sha256` or `sha512`.

### module-module_name-source-sha1-deprecated

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using the deprecated `sha1` checksum.

It is recommended to switch to `sha256` or `sha512`.

### module-module_name-autotools-redundant-prefix

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
using the `autotools` buildsystem is setting `--prefix` in `config-opts`
to a value of `/app, /usr, ${FLATPAK_DEST}`.

This is set by [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder.html)
itself and is redundant.

### module-module_name-buildsystem-is-plain-cmake

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using plain `cmake` as buildsystem.

It is recommended to switch to `cmake-ninja` as that is usually faster.

### module-module_name-cmake-non-release-build

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using `cmake` or `cmake-ninja` as buildsystem has a `CMAKE_BUILD_TYPE`
value, not of `Release, RelWithDebInfo, MinSizeRel`.

It is recommended to use one of those as the build type.

### module-module_name-cmake-redundant-prefix

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
using `cmake` or `cmake-ninja` buildsystem is setting `CMAKE_INSTALL_PREFIX`
in `config-opts` to a value of `/app, /usr, ${FLATPAK_DEST}`.

This is set by [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder.html)
itself and is redundant.

### toplevel-command-is-path

The toplevel `command` property in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is a path.

This must be just the name of the main binary of the application and the
binary must be present in `$FLATPAK_DEST/bin`.

### toplevel-unnecessary-branch

The toplevel `branch` property in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is unnecessary.

On Flathub, the branch is set by the builder using `--default-branch`
argument of [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder.html).

Specifying the branch property may lead to other errors.

## Exceptions

Linter errors can be ignored with exceptions. Exceptions are granted on a case-by-case basis.

The exception pull request needs to be merged for a package submission to be buildable.

To apply for an exception, you need to submit a [Pull Request](https://github.com/flathub/flatpak-builder-lint/pulls) for the JSON [exception file](https://github.com/flathub/flatpak-builder-lint/blob/master/flatpak_builder_lint/staticfiles/exceptions.json). The syntax is:

```json
"my.app.id": {
    "linter-error": "reason for the exception"
}
```

There should be only one entry for the application, but it can contain
multiple exceptions. Please make sure the reason is explanatory.
