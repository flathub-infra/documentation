# AppData guidelines

These aren’t necessarily _requirements_, those are covered in [App-Requirements](/docs/for-app-authors/requirements#appstream). These are more tips/best practices to help you get your AppData up to spec.

Note: these guidelines are curated for Flatpak use-cases, they don’t cover anything else. Don’t forget to consult the [official documentation](https://www.freedesktop.org/software/appstream/docs/chap-Metadata.html) for more in-depth info.

### Use Flathub's `appstream-util`

Flathub uses modified `appstream-util` to validate AppData during build. To run the same check locally, you can install and run it with a simple:

```
$ flatpak install flathub org.freedesktop.appstream-glib
$ flatpak run org.freedesktop.appstream-glib validate tld.domain.appid.metainfo.xml
tld.domain.appid.metainfo.xml: OK
```

### Path and filename

Place the AppData file into `/app/share/metainfo/`, name it `%{id}.metainfo.xml`, where `%{id}` is the [#ID](#id).

The old path is `/app/share/appdata/`—you needn’t fix this, it’ll work, but bonus points if you do.

### Upgrading

If you already have an AppData file, it’s a good idea to run it through `appstream-util upgrade`, which does some automatic fixes.

Although for backwards compatibility with RHEL 7 it uses `<component type="desktop">`, whereas the correct (new) type is `"desktop-application"`.

### Header

All AppData files should start with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- Copyright [year] [name] -->
<component type="desktop-application">
```

Note: the copyright notice is only necessary to pass `validate-strict`, but it’s still a good idea.

### ID

The ID should be the same as the [[App-Requirements#Application-ID]]:

```xml
<!-- Good -->
<id>org.flatpak.qtdemo</id>

<!-- Bad -->
<id>org.flatpak.qtdemo.desktop</id>
<id>qtdemo.desktop</id>

<!-- Incorrect -->
<id>qtdemo</id>
```

Note: when omitting the `.desktop` part, you have to add a `type="desktop-id"` [#Launchable](#Launchable) in order for data to be pulled from the desktop file.

### Translations

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

### Launchable

Basically describes how to launch this software. If a desktop file is linked, `appstream-builder` will pull data from it, namely categories and icons.

```xml
<launchable type="desktop-id">qtdemo.desktop</launchable>
```

### Provides

We can use this to link to other instances using a different ID, whether the app was renamed, but especially if there are distributions using the old naming scheme out there. It also prevents ODRS reviews to be “lost” on a rename.

Note that the old desktop file name is automatically added if we use `rename-desktop-file` in the Flatpak manifest.

```xml
<provides>
  <id>qtdemo.desktop</id>
</provides>
```

### Icons and categories

If there’s a `type="desktop-id"` [#Launchable](#Launchable), they get pulled from it.

Don’t set them in the AppData unless you want to override them (even though then it might be a better idea to patch the desktop file itself).

### OARS information

Use the [OARS website](https://hughsie.github.io/oars/generate.html) to generate these. The old generator also included all the `none`-value entries—it no longer does this, you can safely remove them. If it only consists of `none` values, it’s safe to shorten it to just:

```xml
<content_rating type="oars-1.1" />
```

Note: for some of these, e.g. the above-mentioned, adding them manually is the only way to get them. But beware:

> Although, please bear in mind any application that is found cheating, i.e. adding kudos artificially will have **all** the kudos manually removed with a blacklist rule in the AppStream builder.

### Content

For the quick guidelines for the actual content (descriptions, screenshots), see the Appstream [docs](https://www.freedesktop.org/software/appstream/docs/chap-Quickstart.html).

### Licence

All appdata must contain a valid SPDX licence. However there isn't an [SPDX licence](https://spdx.org/licenses/) for proprietary software. By convention you should use `LicenseRef-proprietary` in this case.

### Checking the generated output

Once an app has been built, you can look for the `/app/share/app-info/xmls/<app-id>.xml.gz` archive, inside which is an XML file with all the info about the app combined into one file.
