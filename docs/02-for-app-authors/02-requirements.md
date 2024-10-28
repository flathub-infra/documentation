# Requirements

The goal of these requirements is to ensure that the applications hosted
on Flathub are safe to use and integrate well in the desktop experience.

:::tip
If you have any further questions, please ask on [Matrix](https://matrix.to/#/#flatpak:matrix.org).
:::

## Application ID

:::note
The ID chosen will determine the type of [verification method](/docs/for-app-authors/verification#what-is-verification)
available, if any. It must be a constant and unique identifier of the
application. If it needs to be renamed at any point, the application
needs to be [resubmitted](/docs/for-app-authors/maintenance#renaming-the-flatpak-id).
:::

Please choose the ID carefully and don't hesitate to ask the reviewers
for help.

The following rules should be followed when creating application IDs.

- The ID must not exceed 255 characters and must have at least 3
  components.

  The ID can be split into _components_ at each `.`. Each component must
  contain only the characters `[A-Z][a-z][0-9]_`.  A dash `-` is only
  allowed in the last component.

  All components except the last is taken as the _domain portion_ of
  the ID.

- The domain portion must be in lowercase and must convert dash `-` to
  underscore `_` and also prefix any intial digits with an underscore
  `_`.

```
# Correct
com.example_site.foo
com._0example.foo

# Wrong
com.example-site.foo
com.0example.foo
```

- The ID must not end in generic terms like `.desktop` or `.app`. It's
  fine to repeat the application name in such cases.

- The ID must exactly match the [ID tag](/docs/for-app-authors/metainfo-guidelines/#id)
  in Metainfo file.

- Applications using code hosting IDs and hosted on
  `github.com, gitlab.com, codeberg.org, framagit.org` must use
  `io.github, io.gitlab, page.codeberg, io.frama` prefixes depending on
  where the project is hosted and must have at least 4 components.

  Projects hosted on Sourceforge can use `io.sourceforge, net.sourceforge`
  prefixes.

  They must not use `com.github, com.gitlab, org.codeberg, org.framagit`
  unless the project is an official project of the code hosting
  platform.

### Control over domain or repository

- The domain being used in the ID must be directly related to the
  application being submitted. Please don't use your personal domain to
  submit an app you didn't develop/aren't involved with.

  It must be a domain directly related to the original project and the
  author/developer/project of the application must have control over the
  domain portion of the ID and the corresponding URL must be reachable
  over HTTP(S).

  For example for the ID `com.example_site.foo.bar` the URL
  `http(s)://foo.example-site.com` must be reachable and must be under
  control of author/developer/project of the application.

  It's also preferable to have some visible proof on the webpage that
  connects the application being submitted or its developer/project with
  the domain being used in the ID.

- For GitHub and Codeberg IDs of the form
  `io.github.example_foo.bar, page.codeberg.example_foo.bar` the
  repository must be reachable at `https://github.com/example-foo/bar` or
  `https://codeberg.org/example-foo/bar` respectively.

  For Sourceforge IDs of the form
  `io.sourceforge.example_foo.bar, net.sourceforge.example_foo.bar`, the
  project URL must be reachable at
  `https://sourceforge.net/projects/example-foo/`.

  For Sourcehut IDs, of the form `site.srht.example.bar`, the
  repository must be reachable at `https://sr.ht/~example/bar/`. Note
  that Sourcehut namespaces are case sensitive.

  For Gitlab IDs of the form `io.gitlab.example_foo.bar,
  io.frama.example_foo.bar, org.gnome.gitlab.example_foo.bar,
  org.freedesktop.gitlab.example_foo.bar`, the repository must be
  reachable at `https://gitlab.com/example-foo/bar` and so on.

  If there are more components for example
  `io.gitlab.example_foo.example_bar.example-app`,
  the repository must be reachable at
  `https://gitlab.com/example-foo/example-bar/example-app`
  and so on.

  Note that Gitlab namespaces are case sensitive.

Applications are not allowed to have more than 5 components in the ID.

BaseApps must end their ID in `.BaseApp`.

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

The [runtime(s)](https://docs.flatpak.org/en/latest/basic-concepts.html#runtimes)
used in the manifest must be hosted on Flathub.

#### No network access during build

All dependencies needed to build and run the application must be present
in the manifest as sources with publicly accessible URLs or must be
included as local sources in the submission pull request.

There is no network access during the build process.

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

These manifests must be included in the submission.

## Required metadata

Applications must have the following metadata included.

:::note
These metadata files should directly come from the upstream project
whenever possible as these are widely adopted Freedesktop standards.

Please try to avoid making them Flathub specific and submit or include
them upstream whenever possible.
:::

### Appstream

All submissions must provide a [Metainfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
that passes [validation](/docs/for-app-authors/metainfo-guidelines/#validation).

A Metainfo file is mandatory to appear on the Flathub website.

Metainfo file is optional for runtimes, extensions and baseapps.

### Desktop file

All graphical applications must include a [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files)

Desktop file is optional for console applications.

### Icons

Graphical applications must provide, preferably a SVG icon or at least
a 256x256 PNG icon, properly [named and installed](https://docs.flatpak.org/en/latest/conventions.html#application-icons).

Icon is optional for console applications but it is mandatory to appear
on Flathub website search results.

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
