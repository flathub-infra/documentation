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
and [flatpak conventions](https://docs.flatpak.org/en/latest/conventions.html#application-ids)
for more information.

### appid-ends-with-lowercase-desktop

**Exceptions allowed**: No[^1]

The app id ends with lowecase `.desktop`.

Please follow the [flatpak documentation](https://docs.flatpak.org/en/latest/conventions.html#application-ids)
for more information.

### appid-filename-mismatch

**Exceptions allowed**: No

The filename of the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
does not match the app id used in the manifest.

### appid-not-defined

**Exceptions allowed**: No

The app id is not defined in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

This can happen when `id` or `app-id` property is missing from the
manifest and consequently the [flatpak build metadata](https://docs.flatpak.org/en/latest/flatpak-command-reference.html#flatpak-metadata)
is missing the `name` property.

`id` or `app-id` is mandatory in manifest.

### appid-uses-code-hosting-domain

**Exceptions allowed**: No[^1]

The app id uses a code hosting domains like gitlab, github or codeberg
and the first `{tld}` component does not start with `io` for github
and gitlab; `page` for codeberg.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
and [flatpak conventions](https://docs.flatpak.org/en/latest/conventions.html#application-ids)
for more information.

### appstream-external-screenshot-url

**Exceptions allowed**: No

The screenshots in [appinfo catalogue](https://www.freedesktop.org/software/appstream/docs/chap-CatalogData.html)
file which are not of [type](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-screenshots)
`source` aren't mirrored to https://dl.flathub.org/repo/screenshots.

The catalogue file is automatically generated when [building the flatpak](https://docs.flatpak.org/en/latest/building-introduction.html#flatpak-builder)
by appstream which also does the mirroring when
`--mirror-screenshots-url=URL` is passed to
[flatpak-builder](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html).

This can happen when mirroring fails due to spurious connectivity issues
and is usually resolved by restarting the build.

Externally uploaded apps must ensure `--mirror-screenshots-url=URL`
was passed to flatpak-builder.

### appstream-failed-validation

**Exceptions allowed**: No

The [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
has failed validation.

Please use [Flathub's appstream-util](https://docs.flathub.org/docs/for-app-authors/appdata-guidelines/#use-flathubs-appstream-util)
to validate the file and fix the issues reported.

### appstream-metainfo-missing

**Exceptions allowed**: No

The [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
is missing from the build.

Please make sure to install it to the correct folder and name the file
according to the application id used in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

### appstream-missing-appinfo

**Exceptions allowed**: No

The build or the ostree repo is missing the folder `files/share/app-info`.

The folder is automatically created during the build process by appstream
compose.

This can happen when compose fails or doesn't run at all.

An [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
must supplied during the build with a proper filename, [id tag](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-id-generic),
proper `desktop-id` in `launchable` [tag](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-launchable)
and all of them must match the app id used in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

### appstream-missing-appinfo-file

**Exceptions allowed**: No

The build or the ostree repo is missing the appstream catalogue file
`files/share/app-info/xmls/$FLATPAK_ID.xml.gz`.

The file is automatically created during the build process by appstream
compose.

This can happen when compose fails.

An [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
must supplied during the build with a proper filename, [id tag](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-id-generic),
proper `desktop-id` in `launchable` [tag](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-launchable)
and all of them must match the app id used in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

### appstream-missing-developer-name

The [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
is missing the `developer_name` tag.

This must be present for proper display and classification by app stores.

### appstream-missing-project-license

The [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
is missing the `project_license` tag.

This must be present for proper display of the license by the app store.

### appstream-missing-icon-file

**Exceptions allowed**: No

The build or the ostree repo is missing a 128px png icon in
`files/share/app-info/icons/flatpak/128x128/$FLATPAK_ID.png`.

The file is automatically created during the build process by appstream
compose provided a png icon of size 128px or more or an svg icon was
installed to the [proper location](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
during the build.

### appstream-missing-screenshots

**Exceptions allowed**: No

The image tags of screenshots in [appinfo catalogue](https://www.freedesktop.org/software/appstream/docs/chap-CatalogData.html)
are not of [type](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-screenshots)
`thumbnail`. The file and the type is automatically created during the
build process by appstream compose.

This can happen when screenshot tags are missing/not properly defined in
the [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
or if the image file/URL is malformed. The URL must be a direct link to
a png or svg resource on the web.

If the screenshot tag is fine but the error happens, it can mean that
[mirroring](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
failed due to connectivity issues. This is usually resolved by restarting
the build.

### appstream-multiple-components

**Exceptions allowed**: No

The [appinfo catalogue](https://www.freedesktop.org/software/appstream/docs/chap-CatalogData.html)
file is malformed and has multiple `component` tags.

## appstream-no-flathub-manifest-key

**Exceptions allowed**: No

The [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
is missing the `flathub::manifest` tag.

This must be present for externally uploaded apps.

### appstream-screenshots-not-mirrored-in-ostree

**Exceptions allowed**: No

The ostree ref is missing a `screenshots/{arch}` ref.

This error should not be reached on Flathub. Externally uploaded apps
must ensure to [mirror screenshots](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html),
commit the screenshot ref and upload the screenshot ref for all
architectures.

Committing is done after flatpak-builder exported a repo, using
`ostree commit --repo=<repo name> --canonical-permissions
--branch=screenshots/<arch> <builddir>/screenshots`. For
flatpak-builder >= 1.3.4, the last path is `<builddir>/files/share/app-info/media`.

The process is automated when using [flatpak-github-actions](https://github.com/flatpak/flatpak-github-actions#inputs).

### desktop-file-exec-has-flatpak-run

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files),
exactly matching the `$FLATPAK_ID` is checked.

The `Exec` key of the desktop file in the build has `flatpak run` in it.

Desktop files do not need to manually make the `Exec` value `flatpak run ...`
as that is done by `flatpak` itself during installation.

### desktop-file-exec-key-absent

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files),
exactly matching the `$FLATPAK_ID` is checked.

The `Exec` key is missing in the desktop file supplied.

Desktop files must have an `Exec` key even when using `DBusActivable=true`.

### desktop-file-failed-validation

**Exceptions allowed**: No

The [desktop file(s)](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
supplied in the build have failed validation with `desktop-file-validate`.

Please correct the errors reported.

### desktop-file-icon-key-absent

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files),
exactly matching the `$FLATPAK_ID` is checked.

The desktop file supplied in the build has no `Icon` key.

There must be an icon key present in the desktop file of a graphical
application.

### desktop-file-icon-key-empty

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files),
exactly matching the `$FLATPAK_ID` is checked.

The desktop file supplied in the build has an empty `Icon` key.

The `Icon` key in the desktop file must have a proper value.

### desktop-file-icon-key-wrong-value

**Exceptions allowed**: No

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files),
exactly matching the `$FLATPAK_ID` is checked.

The `Icon` key of the desktop file supplied in the build does not have
a proper value.

The value must be of the following patterns: `$FLATPAK_ID`, `$FLATPAK_ID.foo`
or `$FLATPAK_ID-foo`. It may end with an extension but only `svg, png, xpm`
are allowed.

### desktop-file-is-hidden

**Exceptions allowed**: Yes[^2]

Only the main [desktop file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files),
exactly matching the `$FLATPAK_ID` is checked.

The desktop file supplied in the build sets `Hidden=true` or
`NoDisplay=true`.

### desktop-file-not-installed

**Exceptions allowed**: No

The [desktop file(s)](https://docs.flatpak.org/en/latest/conventions.html#appdata-files),
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

### finish-args-arbitrary-xdg-dir-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-<dir>` where `<dir>` is one of
`data, config, cache`, with or without any of `:ro, :rw, :create`.

Flatpak creates its own XDG config, cache and data directories under
`~/.var/app/<app-id>`. Applications do not need to access the host's
XDG directories.

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
solutions using flatpak or [portals](https://flatpak.github.io/xdg-desktop-portal/docs/)
exist.

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

### finish-args-redundant-home-and-host

**Exceptions allowed**: No

The manifest has both `--filesystem=home` and `--filesystem=host` in
[finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing).

`host` grants access to `home`. Specifying both is redundant.

### finish-args-reserved-dir

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

This access is granted automatically by flatpak and there is no need
to specify manually. Please see the [bus access](/docs/for-app-authors/requirements#dbus-access)
section to know more.

### finish-args-unnecessary-xdg-dir-access

**Exceptions allowed**: Yes[^3]

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-dir/foo` where `dir` is one of
`data, config, cache`, with or without any of `:ro, :rw, :create`.

Flatpak creates its own XDG config, cache and data directories under
`~/.var/app/<app-id>`. Certain settings from host are exposed to Flatpak
by the portal. Applications do not need to access the host's
XDG directories or subpaths of them.

### flat-manager-branch-repo-mismatch

**Exceptions allowed**: No

The branch of the ostree ref does not match the target Flathub repo it
is being uploaded to.

The target repo for Flathub is either `stable` or `beta`.

This should not be reached by apps that are built on Flathub. They also
should never use `branch/*` to name the branch of the Github repo for the
app. Please see [this](https://docs.flathub.org/docs/for-app-authors/maintenance#the-repository)
for more details.

Externally uploaded applications must ensure to upload `stable` branch refs
to the `stable` Flathub repo or `beta` branch refs to the `beta` Flathub
repo.

The branch is set during the build process by flatpak-builder using
`--default-branch=BRANCH` or the `branch` or `default-branch` property
in the manifest. Please see [flatpak-builder documentation](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
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

### module-module_name-source-dest-filename-is-path

**Exceptions allowed**: No

The `dest-filename` property in the
[flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is a path.

It must be a filename only.

### module-module_name-source-git-branch

**Exceptions allowed**: No

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, specifies no `commit` property and has `branch` property
in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

In this case the `branch` must point to a commit hash of length 40
characters.

This is done for reproducibility.

### module-module_name-source-git-local-path

**Exceptions allowed**: No

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but specifies a local path using `path`.

It must point to a web resource and use `url` property.

### module-module_name-source-git-no-commit-or-tag

**Exceptions allowed**: No

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but, either specifies no `commit` or `tag` property or
the `branch` property does not point to a commit hash.

At least a `commit` or a `tag` or both must be present. If neither is
present and `branch` is used, it must point to a git commit hash.

This is done for reproducibility.

### module-module_name-source-git-no-commit-or-tag

**Exceptions allowed**: No

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but no `url` property.

It must point to a web resource and use `url` property.

### module-module_name-source-git-url-not-http

**Exceptions allowed**: No

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but `url` property does not use a http/https link.

The `url` property must use a `http` or a `https` link.

### module-module_name-autotools-non-release-build

**Exceptions allowed**: No

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
using buildsystem `autotools` sets `--enable-debug=no`.

This is not allowed.

### toplevel-cleanup-debug

**Exceptions allowed**: No

The toplevel `cleanup` property in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has `/lib/debug`.

This must not be cleaned up as it is used to generate debug data for the
flatpak by flatpak-builder.

### toplevel-no-command

**Exceptions allowed**: No

The toplevel `command` property in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is absent.

This property is required.

### toplevel-no-modules

**Exceptions allowed**: No

The [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
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

The [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
has a `name` tag of length greater that 20 characters.

Please refer to the [quality guidelines](/docs/for-app-authors/appdata-guidelines/quality-guidelines#not-too-long)
for more details.

Only the English name is checked.

### appstream-screenshot-missing-caption

The [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
is missing `caption` tag for one or more screenshots or the `caption`
tag is empty.

Please refer to the [quality guidelines](/docs/for-app-authors/appdata-guidelines/quality-guidelines#image-captions)
for more details.

### appstream-summary-too-long

The [appdata file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
has a `summary` tag of length greater that 35 characters.

Please refer to the [quality guidelines](/docs/for-app-authors/appdata-guidelines/quality-guidelines#not-too-long-1)
for more details.

Only the English summary is checked.

### desktop-file-exec-key-empty

The [desktop file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
has a empty `Exec=` key.

Although this gets rewritten to a fallback by flatpak during installation
an `Exec` key with a value should be present for compatibility.

### desktop-file-low-quality-category

The [desktop file](https://docs.flatpak.org/en/latest/conventions.html#appdata-files)
has one or more low-quality category and no proper (non low-quality)
category.

The following are considered to be low-quality categories:
`KDE, GTK, Qt, Application, GNOME`.

Low quality categories are filtered by appstream. Proper category names
should be used. Please refer to the [category specification](https://specifications.freedesktop.org/menu-spec/latest/apa.html)
for more details.

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
`--socket=fallback=x11` and `--socket=wayland` should be used.

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

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using the deprecated and insecure `md5` checksum.

It is recommended to switch to `sha256` or `sha512`.

### module-module_name-source-sha1-deprecated

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using the deprecated `sha1` checksum.

It is recommended to switch to `sha256` or `sha512`.

### module-module_name-autotools-redundant-prefix

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
using the `autotools` buildsystem is setting `--prefix` in `config-opts`
to a value of `/app, /usr, ${FLATPAK_DEST}`.

This is set by flatpak-builder itself and is redundant.

### module-module_name-buildsystem-is-plain-cmake

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using plain `cmake` as buildsystem.

It is recommended to switch to `cmake-ninja` as that is usually faster.

### module-module_name-cmake-non-release-build

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using `cmake` or `cmake-ninja` as buildsystem has a `CMAKE_BUILD_TYPE`
value, not of `Release, RelWithDebInfo, MinSizeRel`.

It is recommended to use one of those as the build type.

### module-module_name-cmake-redundant-prefix

A module in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
using `cmake` or `cmake-ninja` buildsystem is setting `CMAKE_INSTALL_PREFIX`
in `config-opts` to a value of `/app, /usr, ${FLATPAK_DEST}`.

This is set by flatpak-builder itself and is redundant.

### toplevel-command-is-path

The toplevel `command` property in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is a path.

This must be just the name of the main binary of the application and the
binary must be present in `$FLATPAK_DEST/bin`.

### toplevel-unnecessary-branch

The toplevel `branch` property in the [flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is unnecessary.

On Flathub, the branch is set by the builder using `--default-branch`
argument of flatpak-builder.

Specifying the branch property may lead to other errors.

## Exceptions

Linter errors can be ignored with exceptions. Exceptions are granted on a case-by-case basis, and it's not because you see a package with an exception that your exception will be granted. Some are grandfathered as their existence predates the linter. The exception pull request needs to be merged for a package submission to be buildable.

To apply for an exception, you need to submit a [Pull Request](https://github.com/flathub/flatpak-builder-lint/pulls) for the JSON [exception file](https://github.com/flathub/flatpak-builder-lint/blob/master/flatpak_builder_lint/staticfiles/exceptions.json). The syntax is:

```json
"my.app.id": {
    "linter-error": "reason for the exception"
}
```

There should be only one entry for the application, but it can contain multiple exceptions. Please make sure the reason is explanatory. The reason must not be "app-id predates this linter rule" for
manually added exceptions by application maintainers.
