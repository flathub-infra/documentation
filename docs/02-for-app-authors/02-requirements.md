# Requirements

The goal of these requirements is to ensure that the applications hosted
on Flathub are safe to use and integrate well in the desktop experience.

:::tip
If you have any further questions, please ask on [Matrix](https://matrix.to/#/#flatpak:matrix.org).
:::

## Application ID

The ID chosen will determine the type of [verification method](/docs/for-app-authors/verification#what-is-verification)
available. It must be a constant and unique identifier of the application.

Please choose it carefully and don't hesitate to ask the reviewers for
help.

The following rules should be followed when creating application IDs.

- The ID must not exceed 255 characters, must have at least 3 components
  and must not end in `.desktop`.

  The ID can be split into _components_ at each `.`. Each component must
  contain only the characters `[A-Z][a-z][0-9]_`.  A dash `-` is only
  allowed in the last component.

  All components except the last is taken as the _domain portion_ of
  the ID.

- The ID must exactly match the [ID tag](/docs/for-app-authors/metainfo-guidelines/#id)
  in Metainfo file.

- The domain portion must be in lowercase and must convert dash `-` to
  underscore `_` and also prefix any intial digits with an underscore
  `_`.

```
# Good
com.example_site.foo
com._0example.foo

# Wrong
com.example-site.foo
com.0example.foo
```

- Applications using code hosting IDs and hosted on
  `github.com, gitlab.com, codeberg.org, framagit.org` must use
  `io.github, io.gitlab, page.codeberg, io.frama` prefixes depending on
  where the project is hosted and must have at least 4 components.

  Projects hosted on Sourceforge can use `io.sourceforge, net.sourceforge`
  prefixes.

  They must not use `com.github, com.gitlab, org.codeberg, org.framagit`
  unless the project is an official project of the code hosting
  platform.

### Control over domain

- The author/developer/project of the application must have control
  over the domain portion of the ID and the corresponding URL must be
  reachable over HTTP(S).

  For example for the ID `com.example_site.foo.bar` the URL
  `http(s)://foo.example-site.com` must be reachable and must be under
  control of author/developer/project of the application.

- For code hosting IDs starting with `io.github.eg_foo.bar, page.codeberg.eg_foo.bar`
  the repository must be reachable at `https://github.com/eg-foo/bar` or
  `https://codeberg.org/eg-foo/bar` respectively.

  For a Sourceforge ID starting with `io.sourceforge.eg_foo.bar`, the
  project URL must be reachable at `https://sourceforge.net/projects/eg-foo`.

  For `io.gitlab.eg_foo.bar, io.frama.eg_foo.bar, org.gnome.gitlab.eg_foo.bar,
  org.freedesktop.gitlab.eg_foo.bar`, the repository must be reachable at
  `https://gitlab.com/eg_foo/bar` and so on. If there are more components
  for example `io.gitlab.foo_1.bar_1.app`, the repository must be
  reachable at  `https://gitlab.com/foo-1/bar-1/app` and so on.

Applications are not allowed to have >6 components in the IDs. This is
only allowed for baseapps and runtimes.

## License

All content hosted on Flathub must allow legal redistribution, and the
license must be correctly specified in the app's [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#license).

Non-redistributable sources must use [extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data)
source type.

### No trademark violation

The application name and icon must not violate any trademarks and must
be distinct.

## Stable releases

Flathub only hosts stable releases and not development snapshots or
nightly releases. Manifests should therefore use stable and versioned
sources and must not update to new versions of the main application,
daily in a consistent manner.

## Required files

The following files should be included in the submission.

### Manifest

The [application manifest](https://docs.flatpak.org/en/latest/manifests.html)
must be at the top level and named after the [application ID](#application-id)
with the extension `.json`, `.yml` or `.yaml` depending on whether it is
JSON or YAML.

All sources used in the manifest must be remotely fetchable using the
URL or must be included with the submission. The [runtime(s)](https://docs.flatpak.org/en/latest/basic-concepts.html#runtimes)
used in the manifest must be hosted on Flathub.

### flathub.json

Flathub builds on both `x86_64` and `aarch64` by default. If the
application is supported on only one architecture, please include a
`flathub.json` file in the submission with the
[proper contents](/docs/for-app-authors/maintenance#limiting-the-set-of-architectures-to-build-on).

### Dependency manifest

Flathub does not allow accessing the network during the build process
so all dependencies used by the application must be supplied in the
manifest or should be vendored.

There is a [community provided set of tools](https://github.com/flatpak/flatpak-builder-tools)
that can be used to generate dependency manifests for npm, yarn, cargo,
pip etc.

This manifest must be included in the submission.

## Required metadata

Applications must have the following metadata included.

These metadata files should directly come from upstream whenever possible.

### Appstream

All submissions must provide a [Metainfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
that passes [validation](/docs/for-app-authors/metainfo-guidelines/#validation).

### Desktop file

All graphical applications must include a [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files)

Desktop file is optional for console applications.

### Icons

Graphical applications must provide, preferably a SVG icon or at least
a 256x256 PNG icon, properly [named and installed](https://docs.flatpak.org/en/latest/conventions.html#application-icons).

Icon is optional for console applications.

## Permissions

Static permissions should be limited as much as possible and applications
should use [XDG Portals](https://flatpak.github.io/xdg-desktop-portal/docs/)
and XDG standards whenever possible.

Please see the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
and choose the permissions required for the application.

## Best practices

- Applications should build all components of the manifest from source
  when possible.

- The application should be distributed with minimum modifications and
  should closely follow upstream.

- Patches, which add or remove application functionality, large and
  complicated patchsets, binary files, source code or any additional
  tooling must not be in the submission.

- Applications should try to make sure their metadata follows the
  [quality guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines).
