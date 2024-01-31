# AppData guidelines

These are a set of guidelines for AppData that should be followed for submission on Flathub.

:::note
Please consult the [official appstream documentation](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html) for more in-depth info.
:::

## Validation

All appdata must pass validation by `appstream-util`. Flathub uses modified `appstream-util` to validate AppData during build.

To run the same check locally, you can install and run it with a simple:

```bash
flatpak install -y flathub org.flatpak.Builder
flatpak run --command=appstream-util org.flatpak.Builder validate tld.domain.appid.metainfo.xml
```

## Path and filename

Place the AppData file into `/app/share/metainfo/`, name it `%{id}.metainfo.xml`, where `%{id}` is the [ID](#id).

## Upgrading

If you already have an AppData file, it’s a good idea to run it through `appstream-util upgrade`, which does some automatic fixes.

Although for backwards compatibility with RHEL 7 it uses `<component type="desktop">`, whereas the correct (new) type is `"desktop-application"`.

## Header

All AppData files must start with:

```xml title="tld.domain.appid.metainfo.xml"
<?xml version="1.0" encoding="UTF-8"?>
<!-- Copyright [year] [name] -->
<component type="desktop-application">
```

`type="desktop-application"` is for graphical desktop applications.
Console applications must use `type="console-application"` and extensions
must use `type="addon"`. SDK extensions or runtimes can use
`type="runtime"`.

## ID

The ID must be same as the [Application-ID](./../requirements#application-id):

```xml
<!-- Good -->
<id>org.flatpak.qtdemo</id>

<!-- Bad -->
<id>org.flatpak.qtdemo.desktop</id>
<id>qtdemo.desktop</id>

<!-- Incorrect -->
<id>qtdemo</id>
```

## License

All appdata must have a [metadata license tag](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-metadata_license)
that is the license of the appdata file itself.

If application metadata has not been provided by the upstream, it should be licensed with [Creative Commons Zero, version 1](https://creativecommons.org/choose/zero/).

```xml
<metadata_license>CC0-1.0</metadata_license>
```

Followed by the project license:

```xml
<project_license>GPL-3.0</project_license>
```

The value must be a valid [SPDX license identifier](https://spdx.org/licenses/).

Proprietary applications/custom licenses can use
`LicenseRef-proprietary` with a link to the license:

```xml
<project_license>LicenseRef-proprietary=https://example.org/legal/</project_license>
```

## Name, summary and developer name

```xml
<name>App Name</name>
<summary>Short summary</summary>
```
Please make sure to follow the [quality guidelines](/docs/for-app-authors/appdata-guidelines/quality-guidelines#app-name)
for `name` and `summary`.

A `developer_name` tag must be present. Flathub currently does not support
the newer `developer` tag.

```xml
<developer_name>Developer name</developer_name>
```

## Description

A short and informative description must be present. Please follow the
[specification](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-description)
for the formatting options allowed. All HTML tags are not supported.

The number of paragraphs must not exceed 15. In general it should look
something like this:

```xml
<description>
  <p>Some description</p>
  <p>Some description</p>
  <p>A list of features</p>
  <ul>
    <li>Feature 1</li>
    <li>Feature 2</li>
    <li>Feature 3</li>
  </ul>
</description>
```

## Launchable

All graphical applications having a desktop file must have this tag in
the appdata. If this is present, `appstream-compose` will pull
icons, keywords and categories from the desktop file.

The value must be the [Application-ID](./../requirements#application-id)
followed by `.desktop` suffix.

```xml
<launchable type="desktop-id">org.flatpak.qtdemo.desktop</launchable>
```

If `rename-desktop-file` is used in the manifest, this tag will also
be renamed.

Console applications having no desktop file can use the `provides` tag
described below.

## Provides

This can be used to link to other instances of the application using a
different ID. For example if the the app was renamed at one point or there
are distributions using the old naming scheme out there. It also prevents
ODRS reviews to be “lost” on a rename.

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

## Categories and keywords

If there’s a `type="desktop-id"` [launchable](#launchable), they are
pulled from the desktop file and merged in the appdata. So defining them
seperately in the appdata is not necessary.

Please see the [specification](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html#tag-categories)
on how to define them in appdata.

If they are present in both places, appstream will merge them.

Please don't use, generic categories like
`KDE, GTK, Qt, Application, GNOME, GUI`. These can be placed in `keywords`.

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
```

## Screenshots

All graphical applications must have one or more screenshots in the
appdata. Please make sure to follow the [quality guidelines](/docs/for-app-authors/appdata-guidelines/quality-guidelines#screenshots)
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

## Release

Applications must supply a releases tag in their appdata to pass
validation. Please make sure to also follow the [quality guidelines](/docs/for-app-authors/appdata-guidelines/quality-guidelines#release-notes)
while writing release notes. Releases in appdata should look like this:

```xml
<releases>
  <release version="X.Y.Z" date="YYYY-MM-DD">
    <description>
      <p>Release description</p>
        <ul>
          <li>List of changes</li>
          <li>List of changes</li>
        </ul>
    </description>
  </release>
  <release version="X.Y.Z" date="YYYY-MM-DD">
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

Please note that the `appstream-builder` expects the path to be standard:

- for gettext it’s `share/locale/<lang>/<prefix>.mo`
- for Qt it’s `share/<prefix>/translations/<prefix>_<lang>.qm`

If it’s somewhere different (Qt apps often name the directory “locale” and not “translations”), you can work that around by moving/symlinking it into the proper place.

To see if it was detected correctly, check the [generated output](#checking-the-generated-output).

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

## Checking the generated output

Once an app has been built, you can look for the `/app/share/app-info/xmls/<app-id>.xml.gz` archive, inside which is an XML file with all the info about the app combined into one file.
