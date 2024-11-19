# Requirements

The goal of these requirements is to ensure that the applications hosted
on Flathub are safe to use and integrate well in the desktop experience.

## Application ID

:::note
Please choose the ID carefully and don't hesitate to ask the reviewers
for help as it will determine the type of [verification method](/docs/for-app-authors/verification#what-is-verification)
available, if any.

If it needs to be renamed at any point, the application needs to be
[resubmitted](/docs/for-app-authors/maintenance#renaming-the-flatpak-id).
:::

The application ID is a constant and unique identifier of the
application consisting of the reverse-DNS format
`{tld}.{vendor}.{product}`.

The _components_ of the ID are the substrings obtained by splitting it
at each `.`. All components except the last is taken as the _domain portion_
of the ID.

The following rules should be followed when creating application IDs.

- The ID must not exceed 255 characters and must have at least 3
  components. Applications must not exceed 5 components.

- Each component must contain only the characters `[A-Z][a-z][0-9]_`. A
  dash `-` is only allowed in the last component.

- The domain portion must be in lowercase and must convert dash `-` to
  underscore `_` and also prefix any intial digits with an underscore
  `_`.

- The ID must not end in generic terms like `.desktop` or `.app`. It's
  fine to repeat the application name in such cases.

- The ID must exactly match the [ID tag](/docs/for-app-authors/metainfo-guidelines/#id)
  in Metainfo file.

- Applications using code hosting IDs and hosted on
  `github.com, gitlab.com, codeberg.org, framagit.org` must use
  `io.github., io.gitlab., page.codeberg., io.frama.` prefixes
  respectively and must have at least 4 components.

  `com.github., com.gitlab., org.codeberg., org.framagit.` prefixes are
  reserved for official projects of the code hosting platform.

  Applications using code hosting IDs and hosted on Sourceforge can
  use `io.sourceforge., net.sourceforge.` prefixes.

- [BaseApps](https://docs.flatpak.org/en/latest/dependencies.html#baseapps)
  must end their ID in `.BaseApp`.

### Control over domain or repository

The domain is constructed by reversing the components of the domain
portion of the ID and converting underscores to dashes.

- The domain must be directly related to the project or the application
  being submitted and the author or the developer or the project must have
  control over the domain the corresponding URL must be reachable over
  HTTP(S).

  [Verification](/docs/for-app-authors/verification) may require placing
  a token under `https://{host name}/.well-known/org.flathub.VerifiedApps.txt`

  It's preferable to have visible proof on the webpage linking the
  application or the developer or the project to the domain calculated
  from the ID.

#### Code hosting

A _repository URL_ (or project URL) is calculated for code hosting IDs
by using the domain and by taking the last component of the ID as-is.
Note, that some code hosting platforms like GitLab may have
case-sensitive namespaces.

- Applications using code hosting IDs must have the repository URL
  reachable.

For example, the repository URL for the ID `io.github.example_foo.bar`
will be `https://github.com/example-foo/bar` and for the ID
`io.sourceforge.example_foo.bar`, it will be
`https://sourceforge.net/projects/example-foo/`.

[Flatpak extensions](https://docs.flatpak.org/en/latest/extension.html)
and [BaseApps](https://docs.flatpak.org/en/latest/dependencies.html#baseapps)
can be exempt from these rules.

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
JSON or YAML file.

The [runtime(s)](https://docs.flatpak.org/en/latest/basic-concepts.html#runtimes)
used in the manifest must be hosted on Flathub.

#### Permissions

Static permissions should be limited as much as possible and applications
should use [XDG Portals](https://flatpak.github.io/xdg-desktop-portal/docs/)
and XDG standards whenever possible.

Please follow the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
when writing the manifest or choosing finish-args. Anything listed in
"Standard Permissions" can be freely used. DBus, Filesystem and Device
access should be limited to only what the application needs.

Please avoid choosing broad permissions unless justified.

#### No network access during build

All dependencies needed to build and run the application must be present
in the manifest as [sources](https://docs.flatpak.org/en/latest/module-sources.html)
with publicly accessible URLs or must be included as local sources in
the submission pull request.

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

Please avoid making them Flathub specific by including a copy in the
submission pull request and instead try to use them from upstream if
possible.
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
