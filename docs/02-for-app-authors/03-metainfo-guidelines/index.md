# MetaInfo guidelines

These are a set of guidelines for MetaInfo that should be followed for submission on Flathub.

:::tip
Please check the [Quality Guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines)
page too, to make your application metadata more presentable.
:::

:::note
Please consult the [official AppStream documentation](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html) for more in-depth info.
:::

## Validation

All MetaInfo files included in build must pass validation using the
[linter](/docs/for-app-authors/linter) which can also validate the
MetaInfo file. Install `org.flatpak.Builder` from Flathub:

```sh
flatpak install -y flathub org.flatpak.Builder
```
Then the MetaInfo file validation can be performed with:

```sh
flatpak run --command=flatpak-builder-lint org.flatpak.Builder appstream %{id}.metainfo.xml
```

This runs `appstreamcli validate` from the [AppStream project](https://github.com/ximion/appstream/)
with some Flathub specific checks integrated into it.

Both errors and warnings are considered to be fatal by `appstreamcli`
and needs to be resolved.

:::note
A full list of error codes and explanations can also be found online in
the [data validation](https://www.freedesktop.org/software/appstream/docs/chap-Validation.html#validator-issues-list)
page.
:::

Flathub increases the severity of the following checks from the upstream
default of `info` to `error`. So they are documented below.

- `cid-has-number-prefix` - The `id` tag contains a segment starting with a number. Please see the [application ID guidelines](/docs/for-app-authors/requirements#application-id) for more information.
- `cid-missing-affiliation-gnome` - The application is using a `project_group` tag with the value `GNOME` but the [ID](/docs/for-app-authors/metainfo-guidelines/#id) does not start with `org.gnome`. Please see the [documentation](/docs/for-app-authors/metainfo-guidelines/#project-group) on how to use this tag.
- `content-rating-missing` - The application is missing an [OARS rating](/docs/for-app-authors/metainfo-guidelines/#oars-information) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).
- `desktop-app-launchable-omitted` - The application is missing a [launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).
- `invalid-child-tag-name` - The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has a child tag which isn't allowed under that parent tag.
- `name-has-dot-suffix` - The [name](/docs/for-app-authors/metainfo-guidelines/#name-summary-and-developer-name) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) ends in a dot (`.`).
- `releases-info-missing` - The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has no [release information](/docs/for-app-authors/metainfo-guidelines/#release).
- `unknown-tag` - The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has an invalid tag. Non-standard tags must be prefixed with `x-` or should be under `<custom>` tag.

A few common errors that are often reached are documented below in brief.

- `description-markup-invalid, description-para-markup-invalid` - The `description` tag in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) contains an unsupported formatting tag. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#description) for more details.
- `description-has-plaintext-url` - The `description` tag in [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) contains a plaintext URL which is not allowed.
- `desktop-app-launchable-missing` - The application is missing a [launchable tag](/docs/for-app-authors/metainfo-guidelines/#launchable) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).
- `tag-not-translatable` - A tag which is not translatable is using `xml:lang`. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#metainfo-translations) for more details.
- `tag-duplicated` - A tag in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) is duplicated.
- `cid-rdns-contains-hyphen` - The [id tag](/docs/for-app-authors/metainfo-guidelines/#id) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has a hyphen (`-`) in the domain part. The entire part of the id except the last component (`.foo`) is considered to be domain.
- `cid-missing-affiliation-freedesktop, cid-missing-affiliation-kde` - The application uses a [reserved project group tag](/docs/for-app-authors/metainfo-guidelines/#project-group) value in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename).
- `spdx-expression-invalid, spdx-license-unknown` - The [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has an invalid or unknown [license tag](/docs/for-app-authors/metainfo-guidelines/#license).
- `screenshot-no-media` - The [screenshot tag](/docs/for-app-authors/metainfo-guidelines/#screenshots) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) is not properly defined.
- `screenshot-default-missing` - The [screenshot tag](/docs/for-app-authors/metainfo-guidelines/#screenshots) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) is missing `type=default` on one of them.
- `screenshot-image-source-duplicated` - The [screenshot tag](/docs/for-app-authors/metainfo-guidelines/#screenshots) in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) has multiple `image` tags under one `screenshot` tag.
- `metadata-license-missing` - the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) is missing a [metadata license tag](/docs/for-app-authors/metainfo-guidelines/#license).
- `category-invalid, all-categories-ignored, app-categories-missing` - Categories are either invalid, missing or all were filtered. Pleasee see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines/#categories-and-keywords) for more details.
- `file-read-failed` - The desktop file, icon or the MetaInfo file is malformed and reading it failed.
- `metainfo-ancient` - The MetaInfo does not start with the [component tag](/docs/for-app-authors/metainfo-guidelines/#header).
- `releases-not-in-order` - The versions in release tag are not in the [proper order](/docs/for-app-authors/metainfo-guidelines/#release).
- `content-rating-missing, content-rating-type-missing, content-rating-type-invalid` - The [OARS tag](/docs/for-app-authors/metainfo-guidelines/#oars-information) is missing from the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) or has no `type` key present or has an invalid `type` key present.
- `custom-key-duplicated` - A `custom` tag with same `key` attribute is used twice. It must be used once.
- `type-property-required` - The corresponding tag requires a `type` attribute. Please see the [MetaInfo guidelines](/docs/for-app-authors/metainfo-guidelines) for the tag.
- `metainfo-localized-description-tag` - The MetaInfo file has translated the `description` tag itself. Please see the [translation section](/docs/for-app-authors/metainfo-guidelines/#metainfo-translations) on how to use translation attributes.
- `circular-component-relation` - The `extends`, `provides`, `requires` or `recommends` tag in the MetaInfo file references the application's own ID.
- `mimetypes-tag-deprecated` - The `mimetype` tag is deprecated in favour of a `mediatypes` child tag under the `provides` tag. Please see the specification on how to use it.
- `custom-invalid-tag` - One of the `custom` tags in the [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename) does not have the `value` child tag. Custom tags can have only `value` as child tags.

## Path and filename

:::note
`/app/share/appdata` and `%{id}.appdata.xml` are considered to be the legacy path and filename, respectively.
:::

Place the MetaInfo file into `/app/share/metainfo/`, name it `%{id}.metainfo.xml`, where `%{id}` is the [ID](#id).
This ID and the filename must match exactly with the `id` set in the [Flatpak manifest](/docs/for-app-authors/requirements#example-manifest).

## MetaInfo generator

:::note
Please check the generated output and add any mandatory or recommended tags mentioned below.
:::

The [AppStream MetaInfo Creator](https://www.freedesktop.org/software/appstream/metainfocreator/)
tool can be used to generate a basic file.

## Header

All MetaInfo files must start with:

```xml title="tld.vendor.appid.metainfo.xml"
<?xml version="1.0" encoding="UTF-8"?>
<!-- Copyright [year] [name] -->
<component type="desktop-application">
```

`type="desktop-application"` is for graphical desktop applications.
Console applications must use `type="console-application"` and extensions
must use `type="addon"`. SDK extensions or runtimes can use
`type="runtime"`.

## ID

The ID must be exactly the same as the [Application-ID](./../requirements#application-id):

```xml
<!-- Good -->
<id>org.flatpak.qtdemo</id>

<!-- Bad -->
<id>org.flatpak.qtdemo.desktop</id>
<id>qtdemo.desktop</id>

<!-- Incorrect -->
<id>qtdemo</id>
```

### Renaming ID tag

The ID tag in the [MetaInfo file](#path-and-filename) is supposed to be
a constant and unique identifier of an application and should not be
renamed unless absolutely necessary.

Please avoid renaming it, if the application is distributed across
multiple distribution channels other than Flathub.

If a rename is necessary, please add the old application ID as a
[provides tag](#provides) and a [replaces tag](#replaces) in the
MetaInfo file of the new application. `rename-appdata-file` and
`rename-desktop-file` in the Flatpak manifest automatically adds
the old ID to the `provides` tag.

## License

All MetaInfo must have a [metadata license tag](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-metadata_license)
that is the license of the MetaInfo file itself.

If application metadata has not been provided by the upstream, it should be licensed with [FSFAP](https://www.gnu.org/prep/maintain/html_node/License-Notices-for-Other-Files.html) or [Creative Commons Zero, version 1](https://creativecommons.org/choose/zero/).
Please see the [specification](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-metadata_license)
for other recommended licenses.

```xml
<metadata_license>CC0-1.0</metadata_license>
```

Followed by a mandatory `project_license` tag:

```xml
<project_license>GPL-3.0-only</project_license>
```

The value must be a valid [SPDX license identifier](https://spdx.org/licenses/). License [expression operators](https://spdx.github.io/spdx-spec/v2-draft/SPDX-license-expressions/#d4-composite-license-expressions) like `AND, OR, WITH` are supported.

Proprietary applications/custom licenses can use `LicenseRef-proprietary`
with a link to the license:

```xml
<project_license>LicenseRef-proprietary=https://example.org/legal/</project_license>
```

## Name, summary and developer name

```xml
<name>App Name</name>
<summary>Short summary</summary>
```

Please make sure to follow the [quality guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines#app-name)
for `name` and `summary`.

:::note
The deprecated `developer_name` tag is also supported for backwards compatibility
:::

A `developer` [tag](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-developer)
with a `name` child tag must be present. Only one `developer` tag is
allowed and the `name` tag also must be present only once in
[untranslated](#metainfo-translations) form.

```xml
<developer id="tld.vendor">
  <name>Developer name</name>
</developer>
```

Please see the [translations section](#metainfo-translations) to
translate these tags.

## Description

A short and informative description must be present.

Only the following tags are supported: `p` (paragraph), `ol, ul` (ordered
and unordered list), `li` (list items), `em` for italicized
emphasis and `code` for inline code in monospace.

Descriptions must not contain any direct links.

```xml
<description>
  <p>Some <em>description</em></p>
  <p>Some <code>description</code></p>
  <p>A list of features</p>
  <ul>
    <li>Feature 1</li>
    <li>Feature 2</li>
    <li>Feature 3</li>
  </ul>
  <p>The app can do:</p>
  <ol>
    <li>Feature 1</li>
    <li>Feature 2</li>
    <li>Feature 3</li>
  </ol>
</description>
```

Please see the [translations section](#metainfo-translations) to
translate these tags.

## Launchable

All graphical applications having a desktop file must have this tag in
the MetaInfo. If this is present, `appstreamcli compose` will pull
icons, keywords and categories from the desktop file.

The value must exactly be the [Application-ID](./../requirements#application-id)
followed by `.desktop` suffix. Multiple launchable tags must not be used.

```xml
<launchable type="desktop-id">org.flatpak.qtdemo.desktop</launchable>
```

If `rename-desktop-file` is used in the manifest, this tag will also
be renamed.

Console applications having no desktop file can use the `provides` tag
described below.

## Provides

This can be used to link to other instances of the application using a
different ID. It also prevents ODRS reviews to be “lost” on a rename.

:::note

The old desktop file name is automatically added if we use `rename-desktop-file` in the Flatpak manifest.

:::

```xml
<provides>
  <id>qtdemo.desktop</id>
</provides>
```

Console applications must add their main binary name to the provides tag:

```xml
<provides>
  <binary>foo</binary>
</provides>
```

Please see the [specification](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-provides)
to know more.

## Replaces

In general renaming the application ID should be avoided, but if it was
renamed at some point, this tag can be used to indicate that the
application in current `id` tag replaces the one in this tag.

```xml
<id>org.example.current-app</id>
  [...]
  <replaces>
    <id>org.example.old-app</id>
  </replaces>
```

## Categories and keywords

If there’s a [launchable](#launchable) defined for a desktop application,
they are pulled from the desktop file and merged in the [AppStream Catalog data](https://www.freedesktop.org/software/appstream/docs/chap-CatalogData.html).
So defining them separately in the MetaInfo is not strictly necessary.

Please see the [Menu specification](https://specifications.freedesktop.org/menu-spec/latest/apa.html)
for a list of valid category names.

Please see the [Appstream specification](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-categories)
on how to define them in the MetaInfo file.

If they are present in both places, `appstreamcli compose` will merge them.

Please don't use, generic categories like
`GTK, Qt, KDE, GNOME, Motif, Java, GUI, Application, XFCE, DDE` as these
are filtered by Appstream. These can be placed in `keywords` if
necessary.

Please see the [translations section](#metainfo-translations) to
translate the `keyword` tag.

## Icons

All desktop applications must install icons of the [required size](/docs/for-app-authors/requirements#application-icons)
to the [proper location](https://docs.flatpak.org/en/latest/conventions.html#application-icons)
and must also have a [launchable](#launchable) entry so that  `appstreamcli compose`
can fetch the icon from the desktop file.

Console applications wanting to set icons for application stores, can
also [install icons](https://docs.flatpak.org/en/latest/conventions.html#application-icons).
If icons are installed an `icon` tag with `type=stock` can be used. The
value must be the filename of the icon (usually the `$FLATPAK_ID`) and
must not contain the extension suffix.

If console applications do not install an icon, an `icon` tag with
`type=remote` can be used with the tag value being a direct HTTP(S)
link to an icon.

```xml
<icon type="stock">org.flatpak.qtdemo</icon>
<icon type="remote">https://example.org/icon.png</icon>
```

## Project Group

The `<project_group/>` tag can be used if the application is affiliated
with a known software project like for example GNOME, KDE or Mozilla.

The following project group tag values `Freedesktop, FreeDesktop, GNOME, KDE`
are  "protected", meaning only application IDs starting with
`org.freedesktop, org.gnome, org.kde` respectively are allowed to use
them.

These IDs are only allowed for official applications from respective
project groups.

```xml
<project_group>GNOME</project_group>
```

## Brand color

Applications should set a [brand color](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-branding)
in both light and dark variants like so:

```xml
<branding>
  <color type="primary" scheme_preference="light">#ff00ff</color>
  <color type="primary" scheme_preference="dark">#993d3d</color>
</branding>
```

This is used by Flathub and native app store clients on banners, app
pages, etc.

Brand color and app banners can be previewd at https://docs.flathub.org/banner-preview/

## OARS information

Use the [OARS website](https://hughsie.github.io/oars/generate.html) to
generate these and make sure to use `type="oars-1.1"`.

Applications must be properly tagged by OARS data based on their content.

```xml
<content_rating type="oars-1.1" />
```

## URL

At minimum `url type="homepage"` tag must be present to pass validation
but it is best to include other links too.

```xml
<url type="bugtracker">https://example.org/issues</url>
<url type="homepage">https://example.org/</url>
<url type="donation">https://example.org/donate</url>
<url type="contact">https://example.org/contact</url>
<url type="faq">https://example.org/faq</url>
<url type="translate">https://example.org/translate</url>
<url type="vcs-browser">https://example.org/repository</url>
```

Including the `url type="vcs-browser"` tag for open-source projects
to display the source code repository is highly recommended.

## Screenshots

All graphical applications must have one or more screenshots in the
MetaInfo. Please make sure to follow the [quality guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines#screenshots)
for screenshots.

The link inside `image` tag must be a direct link to a image resource on
the web. If the images are hosted in a git repository, the
link should be from a tag or a commit and not a branch.

It should look something like this:

```xml
<screenshots>
  <screenshot type="default">
    <image>https://example.org/example1.png</image>
    <caption>A caption</caption>
  </screenshot>
  <screenshot>
    <image>https://example.org/example2.png</image>
    <caption>A caption</caption>
  </screenshot>
</screenshots>
```

Please see the [translations section](#metainfo-translations) to
translate these tags.

## Release

Applications must supply a releases tag in their MetaInfo to pass
validation. Please make sure to also follow the [quality guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines#release-notes)
while writing release notes.

Paragraphs in release description must not contain any direct URLs.
Flathub supports showing a detailed release note link when
`<url type="details">` tag is used. Release dates must
not be in the future and versions must be [properly ordered](https://www.freedesktop.org/software/appstream/docs/chap-AppStream-Misc.html#spec-vercmp-recommendations).

:::tip
`appstreamcli vercmp <version 1> <version 2>` can be used to compare the
order of two versions.
:::


Releases in MetaInfo should look like this:

```xml
<releases>
  <release version="1.0.1" date="2024-01-18">
  <url type="details">https://example.org/changelog.html#version_1.0.1</url>
    <description>
      <p>Release description</p>
        <ul>
          <li>List of changes</li>
          <li>List of changes</li>
        </ul>
    </description>
  </release>
  <release version="1.0.0" date="2023-08-07">
  <url type="details">https://example.org/changelog.html#version_1.0.0</url>
    <description>
      <p>Release description</p>
        <ul>
          <li>List of changes</li>
          <li>List of changes</li>
        </ul>
    </description>
  </release>
</releases>
```

## Translations

Appstream provides translation information, so that software centers can inform users if the app is translated into their language. If the app uses Mozilla `.xpi` or Google `.pak` files for translation, the translation info is populated automatically. If the app uses gettext `.mo` or Qt `.qm` files, you’ll need to provide the prefix of these files with a `<translation/>` tag:

```xml
<translation type="gettext">gnome-builder</translation>
<translation type="qt">qtdemo</translation>
```

You can specify this tag multiple times if needed.

Please note that the `appstreamcli compose` expects the translations at:

- For `gettext` it’s `${FLATPAK_DEST}/share/locale/<lang>/LC_MESSAGES/<id>.mo` where `id` is the value in the translation tag.
- For `qt` if the `id` string has slashes it's either `${FLATPAK_DEST}/share/<id>_<lang>.qm` or `${FLATPAK_DEST}/share/<id>/<lang>.qm`. If the `id` string has no slashes it's
  `${FLATPAK_DEST}/share/locale/<lang>/LC_MESSAGES/<id>.qm` where `id` is the value in the translation tag.

To see if it was detected correctly, check the [generated output](#checking-the-generated-output).

## MetaInfo translations

:::note
English tag values must not use the `xml:lang` property. A tag value
without `xml:lang` must be present.
:::

Various tags in MetaInfo support translations using the `xml:lang="<lang>"`
property.

The following tags can have translations: `name`, `name` child tag in
`developer`, `summary`, `keywords`, `image`, `caption` and `description`.

The `description` tag has to be translated by each `<p>` and `<li>` tags.

```xml

<name>App name</name>
<name xml:lang="de">Translated App name</name>

<summary>A summary</summary>
<summary xml:lang="de">Translated summary</summary>

<developer id="tld.vendor">
  <name>Developer name</name>
  <name xml:lang="de">Translated developer name</name>
</developer>

<description>
  <p>Some description</p>
  <p xml:lang="de">Translated description</p>
  <ul>
    <li>A list</li>
    <li xml:lang="de">Translated list</li>
  </ul>
</description>

<screenshots>
  <screenshot type="default">
    <image>https://example.org/example1.png</image>
    <image xml:lang="de">https://example.org/example1_de.png</image>
    <caption>A caption</caption>
    <caption xml:lang="de">Translated caption</caption>
  </screenshot>
</screenshots>

<keywords>
  <keyword translate="no">Keyword</keyword>
  <keyword xml:lang="de">Translated keyword</keyword>
</keywords>
```

By default elements in MetaInfo that can be translatable will be marked
as such. However `translate="no"` can be used to explicitly mark them
as forbidden. The whole block of the `description` tag can be excluded
by using `translate="no"`.

```xml
<developer id="tld.vendor">
  <name translate="no">Developer name</name>
</developer>
```

## Manifest location

Applications that are directly uploaded to Flathub through their own
infrastructure and does not have a Github repo on the [Flathub
organisation](https://github.com/flathub) must add the location to their
flatpak manifest like so:

```xml
 <custom>
    <value key="flathub::manifest">https://example.com/url_with_a_git_hash/com.example.my-app.json</value>
 </custom>
```

## Extensions

Extensions need to follow only some of the guidelines outlined above. All extensions should include a MetaInfo file
and all application extensions must use the `extends` tag.

An example of a MetaInfo file for extension is provided in the [Flatpak documentation](https://docs.flatpak.org/en/latest/extension.html#extension-manifest).

## Preview

The MetaInfo file can be previewed using [GNOME Software](https://apps.gnome.org/Software/)
either by installing the Flatpak package from the test build or locally.

Note that test builds done from Flathub infrastructure will be missing
screenshots.

GNOME Software also has a flag to preview the MetaInfo file:
`gnome-software --show-metainfo /path/to/$FLATPAK_ID.metainfo.xml`.

Appstreamcli also offers a way to preview on the command line using
`appstreamcli get --details --datapath /path/to/$FLATPAK_ID.metainfo.xml`
or `appstreamcli get --details $ID` when the catalogue data is installed
locally to the appstream cache (usually this means the Flatpak package is
installed).

## Checking the generated output

Once an app has been built with a proper MetaInfo file, Flatpak Builder
automatically invokes `appstreamcli` with the `compose` argument that
composes the application metadata gathered from the desktop file, icon
and the MetaInfo file into a combined XML file called the [AppStream Catalog data](https://www.freedesktop.org/software/appstream/docs/chap-CatalogData.html#sect-AppStream-XML).

This file must not be manually created or modified. The file can be found
in `<builddir>/files/share/app-info/xmls/<app-id>.xml.gz` or
`${FLATPAK_DEST}/share/app-info/xmls/<app-id>.xml.gz` inside the sandbox.

The compose process also creates icons in `<builddir>/files/share/app-info/icons/flatpak/{64x64, 128x128}/<app-id>.png`
provided a PNG icon of size 64px or more, or a SVG icon was installed
to the [proper location](https://docs.flatpak.org/en/latest/conventions.html#application-icons)
during the build.

Note that Flathub [requires](/docs/for-app-authors/requirements#application-icons)
at least a 128px icon to be present.
