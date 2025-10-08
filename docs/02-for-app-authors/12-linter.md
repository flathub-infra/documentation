# Flatpak builder lint

Flatpak builder lint is a linter for Flatpak manifests and builds. It is
primarily developed for Flathub, but can be useful for other Flatpak
repositories as well.

Please follow [installation instructions](https://github.com/flathub-infra/flatpak-builder-lint?tab=readme-ov-file#flatpak)
to install and run it locally.

The `manifest` check and the `repo` check is run against all builds
on Flathub, and can also be run locally.

```bash
flatpak run --command=flatpak-builder-lint org.flatpak.Builder manifest <manifest>
```

The `repo` check below expects an OSTree repository in the current path
called `repo`. This is generated when
[building the manifest with Flatpak Builder](/docs/for-app-authors/submission#build-and-install)
and passing the `--repo=repo` argument.

```bash
flatpak run --command=flatpak-builder-lint org.flatpak.Builder repo repo
```

You can find more information in the [project readme](https://github.com/flathub-infra/flatpak-builder-lint/blob/master/README.md).

## Exceptions

Linter errors can be ignored with exceptions. Exceptions on Flathub
are granted on a case-by-case basis.

Apps on Flathub or meant to be published on Flathub can apply for an
exception by submitting a [pull request](https://github.com/flathub/flatpak-builder-lint/pulls)
to the [exception file](https://github.com/flathub/flatpak-builder-lint/blob/master/flatpak_builder_lint/staticfiles/exceptions.json).

There should be only one entry for the application, but it can contain
multiple exceptions. Please make sure the reason is explanatory.

The syntax is:

```json
"my.app.id": {
    "linter-error": "reason for the exception"
}
```

### Check currently published exceptions

You can check the current set of published exceptions for an application
with:

```bash
curl -s https://flathub.org/api/v2/exceptions/my.app.id
```

## Linter errors

Here is a list of linter errors, and whether exceptions may be applied, by default.

### appid-length-more-than-255-chars

The length of appid string is more than 255 characters.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
for more information.

### appid-less-than-3-components

The appid has less than 3 components after splitting at each `.`. At
least 3 components is needed.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
for more information.

### appid-component-wrong-syntax

The appid contains a disallowed character.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
for more information.

### appid-too-many-components-for-app

The appid has >=6 components after splitting at each `.`. Applications
must try to have at most 6 components.

This is not checked for runtimes or baseapps.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
for more information.

### appid-url-check-internal-error

The URL could not be determined from the appid. This is an internal
error for the linter.

### appid-url-not-reachable

The URL determined from the domain portion of the appid was not
reachable.

Please see the [Control over domain or repository](/docs/for-app-authors/requirements#control-over-domain-or-repository)
section for more information.

### appid-code-hosting-too-few-components

The app id uses a code hosting domain like GitLab, GitHub or Codeberg
and doesn't have 4 components: `{tld}.{domain}.foo.bar`.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
for more information.

### appid-ends-with-lowercase-desktop

The app id ends with lowercase `.desktop`.

Please follow the [Flatpak documentation](https://docs.flatpak.org/en/latest/conventions.html#application-ids)
for more information.

### appid-filename-mismatch

The filename of the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
does not match the app id used in the manifest.

### appid-not-defined

The app id (`id` or `app-id`) is not defined in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

### appid-uses-code-hosting-domain

The app id uses a code hosting domain like GitLab, GitHub or Codeberg
and the first `{tld}` component does not start with `io` for GitHub
and GitLab; `page` for Codeberg.

Please follow the [app id guidelines](/docs/for-app-authors/requirements#application-id)
for more information.

### appstream-external-screenshot-url

The screenshots in [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
aren't mirrored to https://dl.flathub.org/media.

[Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
invokes `appstreamcli compose` for mirroring when `--mirror-screenshots-url=URL`
is passed.

This can happen when mirroring fails due to spurious connectivity issues
and is usually resolved by restarting the build.

Externally uploaded apps must ensure `--mirror-screenshots-url=URL`
was passed to Flatpak Builder.

### appstream-failed-validation

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
has failed validation. The output from the validation is in the `appstream`
block.

AppStream considers both warnings (`W`) and errors (`E`) as fatal
and they must be resolved.

Please use the [linter](/docs/for-app-authors/metainfo-guidelines/#validation)
to validate the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
and fix the issues reported.

#### Appstream Validation Errors

:::note
A full list of error codes and explanations can also be found online in
the [data validation](https://www.freedesktop.org/software/appstream/docs/chap-Validation.html#validator-issues-list)
page.
:::

Flathub increases the severity of the following Appstream checks
to `error`: `all-categories-ignored, category-invalid, cid-desktopapp-is-not-rdns, cid-has-number-prefix, cid-missing-affiliation-gnome, cid-rdns-contains-hyphen, content-rating-missing, desktop-app-launchable-omitted, desktop-file-not-found, invalid-child-tag-name, metainfo-filename-cid-mismatch, metainfo-legacy-path, metainfo-legacy-path, name-has-dot-suffix, releases-info-missing, unknown-tag`
and decreases the severity of the following to not cause an error:
`cid-domain-not-lowercase, component-name-too-long, description-has-plaintext-url, developer-id-invalid, component-name-too-long, summary-too-long`

Explanations for Appstream errors are provided below.

#### cid-has-number-prefix

The `id` tag contains a segment starting with a number. Please see the [application ID guidelines](/docs/for-app-authors/requirements#application-id) for more information.

#### cid-missing-affiliation-gnome

The application is using a `project_group` tag with the value `GNOME` but the [ID](/docs/for-app-authors/metainfo-guidelines/#id) does not start with `org.gnome`. Please see the [documentation](/docs/for-app-authors/metainfo-guidelines/#project-group) on how to use this tag.

#### content-rating-missing

The application is missing an [OARS rating](/docs/for-app-authors/metainfo-guidelines/#open-age-ratings-service-oars) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).

#### desktop-app-launchable-omitted

The application is missing a [launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).

#### invalid-child-tag-name

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has a child tag which isn't allowed under that parent tag.

#### name-has-dot-suffix

The [name](/docs/for-app-authors/metainfo-guidelines/#name-and-summary) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) ends in a dot (`.`).

#### releases-info-missing

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has no [release information](/docs/for-app-authors/metainfo-guidelines/#release).

#### unknown-tag

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has an invalid tag. Non-standard tags must be prefixed with `x-` or should be under `<custom>` tag.

A few common errors that are often reached are documented below in brief.

#### description-markup-invalid, description-para-markup-invalid

The `description` tag in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) contains an unsupported formatting tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#description) for more details.

#### description-enum-item-invalid

The `description` tag in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) contains an unsupported child tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#description) for more details.

#### description-enum-group-translated

A `ul` or `ol` tag in description contains `xml:lang`. Please see the [translation section](/docs/for-app-authors/metainfo-guidelines/#metainfo-translations) on how to use translation attributes.

#### desktop-app-launchable-missing

The application is missing a [launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).

#### tag-not-translatable

A tag which is not translatable is using `xml:lang`. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#metainfo-translations) for more details.

#### tag-duplicated

A tag in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) is duplicated.

#### cid-rdns-contains-hyphen

The [id tag](/docs/for-app-authors/metainfo-guidelines/#id) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has a hyphen (`-`) in the domain part. The entire part of the id except the last component (`.foo`) is considered to be domain.

#### cid-missing-affiliation-freedesktop, cid-missing-affiliation-kde

The application uses a [reserved project group tag](/docs/for-app-authors/metainfo-guidelines/#project-group) value in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).

#### cid-missing-affiliation-freedesktop, cid-missing-affiliation-kde, spdx-expression-invalid, spdx-license-unknown, metadata-license-missing, metadata-license-invalid

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has an invalid or unknown [license tag](/docs/for-app-authors/metainfo-guidelines/#license).

#### screenshot-no-media

The [screenshot tag](/docs/for-app-authors/metainfo-guidelines/#screenshots) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) is not properly defined.

#### screenshot-default-missing

The [screenshot tag](/docs/for-app-authors/metainfo-guidelines/#screenshots) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) is missing `type=default` on one of them.

#### screenshot-image-source-duplicated

The [screenshot tag](/docs/for-app-authors/metainfo-guidelines/#screenshots) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has multiple `image` tags under one `screenshot` tag.

#### metadata-license-missing

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) is missing a [metadata license tag](/docs/for-app-authors/metainfo-guidelines/#license).

#### category-invalid, all-categories-ignored, app-categories-missing

Categories are either invalid, missing or all were filtered. Pleasee see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#categories-and-keywords) for more details.

#### file-read-failed

The desktop file, icon or the MetaInfo file is malformed and reading it failed.

#### metainfo-ancient

The MetaInfo does not start with the [component tag](/docs/for-app-authors/metainfo-guidelines/#header).

#### releases-info-missing

The release tag is missing entirely from the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename). Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#release) for more details.

#### releases-not-in-order

The versions in release tag are not in the [proper order](/docs/for-app-authors/metainfo-guidelines/#release).

#### release-version-missing, release-time-missing

The release tag is missing the version or time attribute. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#release) for more details.

#### content-rating-missing, content-rating-type-missing, content-rating-type-invalid

The [OARS tag](/docs/for-app-authors/metainfo-guidelines/#open-age-ratings-service-oars) is missing from the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) or has no `type` key present or has an invalid `type` key present.

#### custom-key-duplicated

A `custom` tag with same `key` attribute is used twice. It must be used once.

#### type-property-required

The corresponding tag requires a `type` attribute. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines) for the tag.

#### metainfo-localized-description-tag

The MetaInfo file has translated the `description` tag itself. Please see the [translation section](/docs/for-app-authors/metainfo-guidelines/#metainfo-translations) on how to use translation attributes.

#### circular-component-relation

The `extends`, `provides`, `requires` or `recommends` tag in the MetaInfo file references the application's own ID.

#### mimetypes-tag-deprecated

The `mimetype` tag is deprecated in favour of a `mediatypes` child tag under the `provides` tag. Please see the specification on how to use it.

#### custom-invalid-tag

One of the `custom` tags in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) does not have the `value` child tag. Custom tags can have only `value` as child tags.

### appstream-id-mismatch-flatpak-id


The `id` tag in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
does not match the `FLATPAK_ID` (the `id` or `app-id` used in manifest).

Existing applications should ask for exceptions, no new applications
will be accepted with a mismatch.

Please see the [Renaming ID tag](/docs/for-app-authors/metainfo-guidelines/#renaming-id-tag)
section before renaming the tag.

### appstream-launchable-file-missing

The MetaInfo file had a [launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable)
defined but the file was not found in `${FLATPAK_DEST}/share/applications`.

This could be due to the file not being installed in `${FLATPAK_DEST}/share/applications`
or having the wrong filename. The filename must be `$FLATPAK_ID.desktop`.

### appstream-metainfo-missing

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing from the build.

Please make sure to install it to the correct folder and name the file
according to the application id used in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

### appstream-missing-appinfo-file

The build or the OSTree repo is missing the [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file.

This usually indicates something else is wrong. Please review additional
errors if present.

### appstream-missing-categories

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file is missing `categories`.

This is due to the desktop file having no valid categories.

Certain low quality categories are filtered out. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#categories-and-keywords)
for more details.

If this error is accompanied with `desktop-file-low-quality-category`,
it means that all categories set in desktop file or Metainfo file were
filtered.

### appstream-missing-developer-name

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing a developer tag.

Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#developer-name)
on how to define it.

### appstream-missing-project-license

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the `project_license` tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#license).

### appstream-missing-icon-file

A 128px png icon was not generated by `appstreamcli compose`. This is
generated automatically provided atleast a 128px png icon or a SVG icon
is installed to the [correct location](https://docs.flatpak.org/en/latest/conventions.html#application-icons).

The error indicates that the required icon sizes were not supplied or the
generation failed due to some other error. Please see any additional
errors if present.

### appstream-release-tag-missing-timestamp

A `release` tag in the [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file is missing the `timestamp` attribute.

This tag is automatically generated  provided the `date` attribute is
correctly set for the `release` tag in metainfo. A timestamp may not
be generated if the `release` tag in metainfo are misformatted.

### appstream-missing-icon-key

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file is missing an `icon` key.

This tag is automatically generated by `appstreamcli compose` provided
some conditions are met.

The error indicates something else is wrong. Please review additional
errors if present.

### appstream-icon-key-no-type

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file has an `icon` key with no `type` attribute.

Please see the [icon section](/docs/for-app-authors/metainfo-guidelines/#icons)
of the MetaInfo guidelines on how to use this tag.

### appstream-remote-icon-not-mirrored

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file has an `icon` key with `type=remote` but the URL in the tag does not
start with `https://dl.flathub.org/media/`.

Any remote icons from the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
will automatically be mirrored to the above media repo provided
`--mirror-screenshots-url=https://dl.flathub.org/media/` was passed while
[building the Flatpak](/docs/for-app-authors/submission#before-submission)
to [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html).

This should not be reached by applications built on Flathub. Externally
uploaded applications must ensure to mirror media as explained above.

### appstream-missing-screenshots

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file is missing screenshots tags. These are generated
automatically and the error means something else is wrong.

This can happen when screenshot tags are missing/not properly defined in
the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
or if the image file/URL is not reachable. Please see the
[MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#screenshots)
on how to define them.

If the screenshot tag is properly defined but the error happens, it can
mean that [mirroring](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html)
failed due to connectivity issues in the builders.

### appstream-multiple-components

The [AppStream catalog](/docs/for-app-authors/metainfo-guidelines/#checking-the-generated-output)
file is malformed and has multiple `component` tags.

### appstream-no-flathub-manifest-key

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the `flathub::manifest` tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#manifest-location)
on how to define it.

This must be present for externally uploaded apps.

### appstream-screenshots-not-mirrored-in-ostree

The ostree ref is missing a `screenshots/{arch}` ref.

This error should not be reached on Flathub and can be ignored if an
app submission is targetting Flathub.

Externally uploaded apps must ensure to [mirror screenshots](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html), commit the screenshot ref and upload the screenshot ref for all
architectures.

Committing is done after [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder.html)
exported a repo, using `ostree commit --repo=<repo name> --canonical-permissions
--branch=screenshots/<arch> <builddir>/files/share/app-info/media`.

The process is automated when using [flatpak-github-actions](https://github.com/flatpak/flatpak-github-actions#inputs).

### appstream-screenshots-files-not-found-in-ostree

The screenshot filenames defined in catalogue data were not found in the
OSTree screenshot ref.

### appstream-unsupported-component-type

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
either uses an unsupported `component` type or is missing the `type`
attribute.

The following types are supported on Flathub: `addon, console-application, desktop, desktop-application, runtime`.

Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#header) for the details.

### desktop-file-exec-has-flatpak-run

The `Exec` key of the desktop file in the build has `flatpak run` in it.

Desktop files do not need to manually make the `Exec` value `flatpak run ...`
as that is done by `flatpak` itself during installation.

### desktop-file-exec-key-absent

The `Exec` key is missing in the desktop file supplied. Desktop files
must have an `Exec` key.

### desktop-file-failed-validation

The [desktop file(s)](https://docs.flatpak.org/en/latest/conventions.html#desktop-files)
supplied in the build have failed validation with `desktop-file-validate`.

Please fix the errors reported.

### desktop-file-icon-key-absent

The desktop file supplied in the build has no `Icon` key.

There must be an icon key present in the desktop file of a graphical
application.

### desktop-file-icon-key-empty

The desktop file supplied in the build has an empty `Icon` key.

The `Icon` key in the desktop file must have a proper value.

### desktop-file-icon-key-wrong-value

The `Icon` key of the desktop file supplied in the build does not have
a proper value.

The value must be of the following patterns: `$FLATPAK_ID`, `$FLATPAK_ID.foo`
or `$FLATPAK_ID-foo`. It may end with an extension but only `svg, svgz,
png` are allowed.

### desktop-file-icon-not-installed

The `Icon` defined in the desktop file is not installed to the [proper
location](https://docs.flatpak.org/en/latest/conventions.html#application-icons)
or has the wrong filename.

### desktop-file-is-hidden

The desktop file supplied in the build sets `Hidden=true`

### desktop-file-is-nodisplay

The desktop file supplied in the build sets `NoDisplay=true`. This is
only allowed for console applications.

### desktop-file-terminal-key-not-true

This is for console applications only. The desktop file is set to
display on desktop environments but no `Terminal=true` is present.

### desktop-file-not-installed

The [desktop file(s)](https://docs.flatpak.org/en/latest/conventions.html#desktop-files),
are either not installed to the proper location during the build or does
not match the `$FLATPAK_ID`.

### elf-arch-multiple-found

Multiple ELF architectures were found after analysing the contents of the
ref or build directory. All ELFs should match the architecture of the
host.

### elf-arch-not-found

The architecture of ELFs in the ref contents or build directory does
not match the architecture of the OSTree ref.

### external-gitmodule-url-found

Git submodules outside of the GitHub orgs `flathub, flathub-infra, flatpak`
are not allowed in the [Flathub manifest repository on GitHub](https://github.com/flathub/).

### manifest-directory-too-large

The manifest directory of the Flathub GitHub repository exceeds 25 MB
excluding the size of `.git/`.

### finish-args-contains-both-x11-and-fallback

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has both `--socket=x11` and `--socket=fallback-x11`.

Both are never needed.

### finish-args-x11-without-ipc

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--socket=x11` or `--socket=fallback-x11` but no
`--share=ipc`.

### finish-args-legacy-icon-folder-permission

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to `~/.icons`. This is a
[legacy path](https://docs.flatpak.org/en/latest/desktop-integration.html#icons)
and should not be used.

### finish-args-legacy-font-folder-permission

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to `~/.fonts`. This is a
[legacy path](https://docs.flatpak.org/en/latest/desktop-integration.html#fonts)
and should not be used.

### finish-args-incorrect-theme-folder-permission

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to `~/.themes`. The correct way
to integrate third party themes for Flatpaks is to package them as
[Flatpak extensions](https://docs.flatpak.org/en/latest/desktop-integration.html#theming).
[Unmaintained extensions](https://docs.flatpak.org/en/latest/extension.html#creating-an-unmaintained-gtk-theme-extension)
can also be used for this.

### finish-args-full-home-config-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to entire `~/.config`.

### finish-args-full-home-cache-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to entire `~/.cache`.

### finish-args-full-home-local-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to entire `~/.local`.

### finish-args-full-home-local-share-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to entire `~/.local/share`.

### finish-args-absolute-home-path

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a filesystem permission that starts with
`/home` or `/var/home`.

Flatpak cannot access anything in `/home` and `/home/username` becomes
dependent on the username.

`--filesystem=~/foo`, `--filesystem=home`, `--filesystem=home/foo` should
be used instead.

Please consult the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
and the [manual page](https://docs.flatpak.org/en/latest/flatpak-command-reference.html?highlight=filesystem#).

### finish-args-flatpak-appdata-folder-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `filesystem` permission to `~/.var/app`.

### finish-args-flatpak-system-folder-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `filesystem` permission to `/var/lib/flatpak`.

### finish-args-flatpak-user-folder-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `filesystem` permission to `~/.local/share/flatpak`.

### finish-args-host-tmp-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `filesystem` permission to `/tmp`.

### finish-args-host-var-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `filesystem` permission to `/var` or a subdirectory
of it.

### finish-args-absolute-run-media-path

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has an absolute `/run/media/foo` path in `filesystem`
permission.

Media mounting is done by host and the subpath is specific to an instance
of the device or an user.

Please use `/run/media` or `/run/media/` instead.

### finish-args-arbitrary-autostart-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-config/autostart` or
`--filesystem=xdg-config/autostart:create`.

Applications should be using the [background portal](https://flatpak.github.io/xdg-desktop-portal/docs/doc-org.freedesktop.portal.Background.html)
for that.

### finish-args-arbitrary-dbus-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--socket=session-bus` or `--socket=system-bus`.

This must not be used except for very specific cases. Please follow the
[Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html#d-bus-access)
for more information and find out the specific DBus names required using
`--log-session-bus`.

### finish-args-host-filesystem-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `host` filesystem access.

### finish-args-home-filesystem-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `home` filesystem access.

### finish-args-autostart-filesystem-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to `~/.config/autostart`.

### finish-args-systemd-filesystem-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to `~/.config/systemd`.

### finish-args-gnupg-filesystem-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to `~/.gnupg`.

### finish-args-ssh-filesystem-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to `~/.ssh`.

### finish-args-desktopfile-filesystem-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has filesystem access to `~/.local/share/applications`.

### finish-args-uses-no-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--no-talk-name` or `--no-system-talk-name`.

### finish-args-arbitrary-xdg-cache-mode-access

The following errors are included here
finish-args-arbitrary-xdg-cache-ro-access, finish-args-arbitrary-xdg-cache-rw-access
and finish-args-arbitrary-xdg-cache-create-access


The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-cache`, with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG cache directory under
`~/.var/app/<app-id>/cache`. Applications should never access the entirety
of host's cache directory.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html#f3).

### finish-args-arbitrary-xdg-config-mode-access

The following errors are included here
finish-args-arbitrary-xdg-config-ro-access, finish-args-arbitrary-xdg-config-rw-access
and finish-args-arbitrary-xdg-config-create-access


The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-config`, with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG config directory under
`~/.var/app/<app-id>/config`. Applications should never access the entirety
of host's config directory.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html#f3).

### finish-args-arbitrary-xdg-data-mode-access

The following errors are included here
finish-args-arbitrary-xdg-data-ro-access, finish-args-arbitrary-xdg-data-rw-access
and finish-args-arbitrary-xdg-data-create-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-data`, with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG data directory under
`~/.var/app/<app-id>/data`. Applications should never access the entirety
of host's data directory.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html#f3).

### finish-args-fallback-x11-without-wayland

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--socket=wayland` but no `--socket=fallback-x11`.

This means the application won't launch in an X11 session. Applications
supporting native wayland must specify both.

Please follow the [permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
for more information.

### finish-args-flatpak-spawn-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--talk-name=org.freedesktop.Flatpak` or
`--talk-name=org.freedesktop.Flatpak.*`.

This allows applications to launch arbitrary commands on the host and
is restricted and granted on a case-by-case basis.

This must not be used unless absolutely necessary and when no existing
solutions using Flatpak or [portals](https://flatpak.github.io/xdg-desktop-portal/docs/)
exist.

### finish-args-has-socket-gpg-agent

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--socket=gpg-agent`.

This socket allows performing privileged operations with GPG on host.

### finish-args-has-socket-ssh-auth

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--socket=ssh-auth`.

This socket allows performing privileged operations with SSH on host.

### finish-args-has-dev-input

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--device=input`.

This permission was introduced first in Flatpak 1.16.0 and is backwards
incompatible with supported older Flatpak releases like 1.14.x. So it
requires a manual exception to be granted in addition to specifying
`--require-version` in the manifest's finish-args.

### finish-args-has-dev-usb

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--device=usb`.

This permission was introduced first in Flatpak 1.16.0 and is backwards
incompatible with supported older Flatpak releases like 1.14.x. So it
requires a manual exception to be granted in addition to specifying
`--require-version` in the manifest's finish-args.

### finish-args-has-nosocket-socket_name

The following error codes are included here:

finish-args-has-nosocket-x11, finish-args-has-nosocket-fallback-x11,
finish-args-has-nosocket-wayland, finish-args-has-nosocket-pulseaudio,
finish-args-has-nosocket-system-bus, finish-args-has-nosocket-session-bus,
finish-args-has-nosocket-ssh-auth, finish-args-has-nosocket-pcsc,
finish-args-has-nosocket-cups, finish-args-has-nosocket-gpg-agent


The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--nosocket=socket_name`.

These do not need to present in the build manifest. By default no access
is granted unless `--socket=socket_name` is used.

### finish-args-has-nodevice-device_name

The following error codes are included here:

finish-args-has-nodevice-dri, finish-args-has-nodevice-input,
finish-args-has-nodevice-kvm, finish-args-has-nodevice-shm,
finish-args-has-nodevice-all


The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--nodevice=device_name`.

These do not need to present in the build manifest. By default no access
is granted, unless `--device=device_name` is used.

### finish-args-has-unshare-subsystem

The following error codes are included here:

finish-args-has-unshare-network, finish-args-has-unshare-ipc

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--unshare=subsystem_name`.

These do not need to present in the build manifest. By default no access
is granted unless `--share=subsystem_name` is used.

### finish-args-contains-both-x11-and-wayland

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has both `--socket=x11` and `--socket=wayland`.

Both are not needed. If the application does not support native wayland
only `--socket=x11` should be used. If it does support native wayland,
`--socket=fallback-x11` and `--socket=wayland` should be used.

Exceptions may be allowed on a case-by-case basis.

### finish-args-incorrect-dbus-gvfs

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--talk-name=org.gtk.vfs`.

This permission does nothing. Please follow the [reference](https://docs.flatpak.org/en/latest/sandbox-permissions.html#gvfs-access)
for permissions required for proper gvfs access.

### finish-args-not-defined

The manifest has no [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing).

This may be selectively allowed for console applications only.

### finish-args-only-wayland

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has only `--socket=wayland` but no `x11` or `fallback-x11`
access.

This means the application will not be able to launch in a X11 session.

### finish-args-incorrect-secret-service-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--talk-name=org.freedesktop.Secrets`.

This is incorrect. The correct name is in lowercase
`org.freedesktop.secrets`.

### finish-args-freedesktop-dbus-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--talk-name=` starting with
`org.freedesktop.DBus`.

### finish-args-portal-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--talk-name=` starting with
`org.freedesktop.portal.`.

Portal interfaces do not need to be manually added. These are allowed by
Flatpak by default.

### finish-args-portal-impl-component-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--talk-name=` starting with
`org.freedesktop.impl.portal.`. `component` is the last component of the
bus name in lowercase.

### finish-args-mpris-flatpak-id-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--talk-name=org.mpris.MediaPlayer2.$FLATPAK_ID`.

### finish-args-flatpak-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--talk-name=` starting with
`org.freedesktop.Flatpak.`.

### finish-args-own-name-cpt

All `--own-name` in
[finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
are blocked by default unless it exactly matches Flatpak ID or is an
exact subname of the Flatpak ID or is a subname of MPRIS.

An `--own-name=org.foo.bar` will generate an error string of
`finish-args-own-name-org.foo.bar` and if it is `--own-name=org.foo.*`
it will generate `finish-args-own-name-wildcard-org.foo`.

### finish-args-system-own-name-cpt

All `--system-own-name` in
[finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
are blocked by default.

A `--system-own-name=org.foo.bar` will generate an error string of
`finish-args-system-own-name-org.foo.bar` and if it is
`--system-own-name=org.foo.*` it will generate
`finish-args-system-own-name-wildcard-org.foo`.

### finish-args-portal-impl-component-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--system-talk-name=` starting with
`org.freedesktop.impl.portal.`. `component` is the last component of the
bus name in lowercase.

### finish-args-freedesktop-dbus-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--system-talk-name=` starting with
`org.freedesktop.DBus`.

### finish-args-mpris-flatpak-id-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `-system-talk-name=org.mpris.MediaPlayer2.$FLATPAK_ID`.

### finish-args-wildcard-freedesktop-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--system-talk-name=org.freedesktop.*`.

### finish-args-wildcard-gnome-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--system-talk-name=org.gnome.*`.

### finish-args-wildcard-kde-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--system-talk-name=org.kde.*`.

### finish-args-flatpak-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--system-talk-name=` starting with
`org.freedesktop.Flatpak`.

### finish-args-systemd1-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--system-talk-name=` starting with
`org.freedesktop.systemd1`.

### finish-args-login1-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--system-talk-name=` starting with
`org.freedesktop.login1`.

### finish-args-kwin-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--system-talk-name=` starting with
`org.kde.KWin`.

### finish-args-plasmashell-system-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--system-talk-name=` starting with
`org.kde.plasmashell`.

### finish-args-reserved-dir_name

The following error codes are included here:

finish-args-reserved-.flatpak-info, finish-args-reserved-app, finish-args-reserved-dev,
finish-args-reserved-etc, finish-args-reserved-lib, finish-args-reserved-lib32,
finish-args-reserved-proc, finish-args-reserved-root, finish-args-reserved-run/flatpak,
finish-args-reserved-run/host, finish-args-reserved-sbin, finish-args-reserved-usr


The manifest has both `--filesystem=/dir_name` in
[finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing).

These paths are reserved by flatpak itself or the runtime and adding them
to the manifest does nothing.

### finish-args-systemd1-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--talk-name=` starting with
`org.freedesktop.systemd1`.

### finish-args-login1-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--talk-name=` starting with
`org.freedesktop.login1`.

### finish-args-kwin-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--talk-name=` starting with
`org.kde.KWin`.

### finish-args-plasmashell-talk-name

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has a `--talk-name=` starting with
`org.kde.plasmashell`.

### finish-args-unnecessary-appid-talk-name

The manifest has `--talk-name=<FLATPAK_ID>` in
[finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing).

This access is granted automatically by Flatpak and there is no need
to specify manually.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html#d-bus-access)
section for more details.

### finish-args-unnecessary-xdg-cache-subdir-mode-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-cache/foo` with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG cache directory under
`~/.var/app/<app-id>/cache`. Applications usually do not need to access
the host's cache directory or subpaths of it.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html#f3).

### finish-args-unnecessary-xdg-config-subdir-mode-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-config/foo` with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG config directory under
`~/.var/app/<app-id>/config`. Applications usually do not need to access
the host's config directory or subpaths of it.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html#f3).

### finish-args-unnecessary-xdg-data-subdir-mode-access

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has `--filesystem=xdg-data/foo` with or without any
of `:ro, :rw, :create`.

Flatpak creates its own XDG data directory under
`~/.var/app/<app-id>/data`. Applications usually do not need to access
the host's data directory or subpaths of it.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html#f3).

### finish-args-wildcard-freedesktop-talk-name

The manifest has a `talk-name` that is `org.freedesktop.*`.

Wildcard access to bus names in well known namespace is a security issue.

### finish-args-wildcard-gnome-talk-name

The manifest has a `talk-name` that is one of `org.gnome.*`.

Wildcard access to bus names in well known namespace is a security issue.

### finish-args-wildcard-kde-talk-name

The manifest has a `talk-name` that is `org.kde.*`.

Wildcard access to bus names in well known namespace is a security issue.

### finish-args-no-required-flatpak

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has some newly introduced Flatpak context metadata
such as `--device=input` or `--device=usb` but doesn't have
`--require-version`.

### finish-args-insufficient-required-flatpak

The [finish-args](https://docs.flatpak.org/en/latest/manifests.html#finishing)
in the manifest has newly introduced Flatpak context metadata
such as `--device=input` or `--device=usb` but the specified
`--require-version` is insufficient. It should be >=1.16.0.

### flatpak-repo-too-large

The Flatpak repo exported from the build exceeds the maximum allowed
size. The maximum allowed size starts at 10 GB and after that
`(number of app/ refs in the repo) * 12 GB`.

Maintainers should try to reduce the size of the sources in the manifest
and any large source in the manifest should be converted to use
[extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data).

### flat-manager-branch-repo-mismatch

The branch of the ostree ref does not match the target Flathub repo it
is being uploaded to.

The target repo for Flathub is either `stable` or `beta`.

This should not be reached by apps that are built on Flathub. They also
should never use `branch/*` to name the branch of the GitHub repo for the
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

### flat-manager-wrong-ref-branch-for-beta-repo

The target repo is Flathub beta but the branch of ref does not end with
`beta` or `beta-extra`.

### flat-manager-wrong-ref-branch-for-stable-repo

The target repo is Flathub stable but the branch of ref ends with
`beta` or `beta-extra`.

### flat-manager-no-app-ref-uploaded

The flat manager token was of type `app` but no ostree refs starting with
`app/` were uploaded.

This should not be reached by applications built on Flathub. Externally
uploaded applications must ensure they upload the proper application
refs only.

### flathub-json-automerge-enabled

apps if upstream rotates/deletes sources

The `flathub.json` file has `automerge-flathubbot-prs` property enabled.
This is no longer allowed by default.

### flathub-json-eol-rebase-without-message

The `flathub.json` file had `end-of-life-rebase` property but no
`end-of-life` property.

Please consult the [documentation](/docs/for-app-authors/maintenance#end-of-life)
for the proper end-of-life process.

### flathub-json-excluded-all-arches

The `flathub.json` file excluded all currently available architectures on
Flathub ie. `aarch64, x86_64`. At least one must be present otherwise
the build won't be done.

### flathub-json-only-arches-empty

The `flathub.json` file had `only-arches` but it was empty.

### flathub-json-skip-appstream-check

The `flathub.json` file had `skip-appstream-check`. This is a legacy
parameter and has no use.

### jsonschema-schema-error

The manifest schema was malformed.

### jsonschema-validation-error

The manifest schema failed validation.

### manifest-file-is-symlink

The [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is a symlink.

### appid-unprefixed-bundled-extension-extension_id

The Flatpak manifest has a [bundled extension](https://docs.flatpak.org/en/latest/extension.html#bundled-extensions)
whose extension ID does not start with the parent app-id.

### manifest-unknown-properties

The [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has a property that is not recognised by Flatpak Builder.

### manifest-json-warnings

The [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has some invalid JSON structure which json-glib is raising a warning
on.

### manifest-toplevel-build-network-access

The [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has network access during build in the toplevel. This is not allowed
for apps on Flathub.

```yaml
build-options:
  build-args:
    - --share=network
```

### metainfo-svg-screenshots

There is a SVG or SVGZ screenshot link in the
[MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).

### metainfo-launchable-tag-wrong-value

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
has the wrong value in the `launchable` tag.

Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#launchable)
on how to define it.

### metainfo-missing-component-tag

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the initial `component` tag.

All MetaInfo files must start with the [component tag](/docs/for-app-authors/metainfo-guidelines/#header)
with a proper `type` attribute.

### metainfo-missing-launchable-tag

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing the `launchable` tag.

All MetaInfo files for desktop applications must have the
[launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable).

### metainfo-missing-screenshots

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing screenshots or the screenshots are not properly defined
under the `screenshots/screenshot/image` tag.

Please see the [Metainfo guide](/docs/for-app-authors/metainfo-guidelines/#screenshots)
on how to define screenshots in the Metainfo file.

### module-module_name-build-network-access

The module `module_name` has network access during build in the
[Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

```yaml
build-options:
  build-args:
    - --share=network
```

### module-module_name-source-dest-filename-is-path

The `dest-filename` property in the
[Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is a path.

It must be a filename only.

### module-module_name-source-git-branch

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
with type `git`, uses `branch` with a branch name in the
[Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html).

It should use either `commit`, or `tag` and `commit` or a `tag` in place
of `branch`.

### module-module_name-checker-tracks-commits

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is tracking commits in `x-checker-data`. Tracking or updating
a module on each commit is not allowed. See the [stable release section](/docs/for-app-authors/requirements#stable-releases).

### module-module_name-source-git-no-tag-commit-branch

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but, either specifies no `commit` or `tag` property or
the `branch` property does not point to a commit hash.

At least a `commit` or a `tag` or both must be present. If neither is
present and `branch` is used, it must point to a git commit hash.

This is done for reproducibility.

### module-module_name-source-git-no-commit-or-tag

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but no `url` property.

It must point to a web resource and use `url` property.

### module-module_name-source-git-url-not-http

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has type `git`, but `url` property does not use a http/https link.

The `url` property must use a `http` or a `https` link.

### module-module_name-autotools-non-release-build

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
using buildsystem `autotools` sets `--enable-debug=no`.

This is not allowed.

### no-exportable-icon-installed

This means that no exportable icons were found in the [proper location](https://docs.flatpak.org/en/latest/conventions.html#application-icons).

An icon is considered by Flatpak to be exportable if it matches any of
the following patterns: `$FLATPAK_ID, $FLATPAK_ID-foo, $FLATPAK_ID.foo`.

They may end with extension suffixes like `.png`, `.svg` or `.svgz`.

### non-svg-icon-in-scalable-folder

An icon file with an extension other than `.svg, .svgz` was installed to
`$FLATPAK_DEST/share/icons/hicolor/scalable/apps` (`builddir/share/icons/hicolor/scalable/apps`
for the local build directory).

The scalable folder is only reserved for SVG icons.

### non-png-icon-in-hicolor-size-folder

An icon file with an extension other than `.png` was installed to
`$FLATPAK_DEST/share/icons/hicolor/$size/apps` (`builddir/share/icons/hicolor/$size/apps`
for the local build directory).

The sized folders are only reserved for PNG icons.

### toplevel-cleanup-debug

The toplevel `cleanup` property in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has `/lib/debug`.

This must not be cleaned up as it is used to generate debug data for the
Flatpak by [Flatpak Builder](https://docs.flatpak.org/en/latest/flatpak-builder.html).

### toplevel-no-command

The toplevel `command` property in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is absent.

This property is required.

### toplevel-no-modules

The [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
has no `modules` property.

This property is required.

### toplevel-command-is-path

The toplevel `command` property in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is a path.

This must be just the name of the main binary of the application and the
binary must be present in `$FLATPAK_DEST/bin`.

### toplevel-unnecessary-branch

The toplevel `branch` property in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is unnecessary for applications.

On Flathub, the branch is automatically set by the build service
using `--default-branch` argument.

### desktop-file-low-quality-category

The [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files)
has one or more [low-quality categories](/docs/for-app-authors/metainfo-guidelines/#categories-and-keywords)
and no proper (non low-quality) category.

If this error is accompanied with `appstream-missing-categories`, it means
that all categories set in desktop file or Metainfo file were filtered.

### module-module_name-source-md5-deprecated

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using the deprecated and insecure `md5` checksum.

It is recommended to switch to `sha256` or `sha512`.

### module-module_name-source-sha1-deprecated

A module in the [Flatpak manifest](https://docs.flatpak.org/en/latest/manifests.html)
is using the deprecated `sha1` checksum.

It is recommended to switch to `sha256` or `sha512`.

## Linter warnings

Warnings are non-fatal but they should be resolved, if possible. Some of
them might be promoted to an error in the future if needed.

### appstream-screenshot-missing-caption

The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
is missing `caption` tag for one or more screenshots or the `caption`
tag is empty.

Please refer to the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#screenshots)
for more details.

### runtime-is-eol-id-branch

The Flatpak package is using a runtime that is [End-of-Life](/docs/for-app-authors/runtimes#currently-hosted-runtimes).
