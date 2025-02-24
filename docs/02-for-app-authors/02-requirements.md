# Requirements

The goal of these requirements is to ensure that the applications hosted
on Flathub are safe to use and integrate well in the desktop experience.

## Submission Policy

:::tip
Each application is evaluated on a case-by-case basis and if you are
unsure whether it fits the guidelines, please feel free to ask via
[GitHub issues](https://github.com/flathub/flathub/issues) or in the
[Flathub Matrix room](https://matrix.to/#/#flathub:matrix.org).
:::

Flathub aims to provide a curated collection of high-quality, sandboxed
graphical desktop applications that seamlessly integrate with the Linux
desktop environment and enhance the user experience.

This policy defines the types of applications that are not eligible
for submission and applies to new submissions only. These guidelines
may evolve over time, and exceptions may be granted in specific cases.

- **Non-functional submissions**: App submissions that are not fully
  functional during review that degrade the user experience will not be
  accepted unless improved.

- **Console app submissions**: Flatpak is generally not well-suited for
  console or terminal-based applications. Any such submissions that is
  not sufficiently user facing or offers overly niche or limited
  functionality will not be accepted.

- **Minimal submissions**: Submissions that offer very minimal
  functionality often consisting of simple scripts, single or simple
  sources or aren't suitable as desktop apps or forks of existing
  projects without any significant modification will not be accepted.

- **Submissions incompatible or restricted by Flatpak sandbox**: Certain
  types of applications, such as development tools and IDEs with a broad
  scope, are generally not well-suited for Flatpak due to inherent
  sandboxing limitations and severely degrade the user experience. Unless
  these applications are being officially submitted by the upstream
  developers and/or upstream has explicitly committed to supporting
  Flatpak they will not be accepted.

- **Misleading or malicious app submissions**: App submissions that
  impersonate, provide false or misleading descriptions, functionality,
  attempt to deceive users, violate trademarks, infringes copyrights or
  contains malicious code will not be accepted.

If the issues identified during the review are resolved and the
submission is improved such that it passes the guidelines, it will be
reconsidered for approval. Submissions are accepted at the discretion
of the reviewers and can be removed even after they are accepted if it
is found to violate any policy. They also must comply with
[Flathub's Terms Of Service](https://flathub.org/terms-and-conditions).

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

The _domain_ is constructed by reversing the components of the domain
portion of the ID and converting underscores to dashes.

- The domain must be directly related to the project or the application
  being submitted and the author or the developer or the project must have
  control over the domain. The corresponding URL must be reachable over
  HTTP(S).

  [Verification](/docs/for-app-authors/verification) may require placing
  a token under `https://{domain name}/.well-known/org.flathub.VerifiedApps.txt`

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

The Flathub stable repository is dedicated to hosting only stable
software. The Flathub beta repository can be used to publish beta
software, though it will not be listed on the website and users must
be manually migrated if switched to the stable repo later.

Nightly releases, development snapshots, or any software requiring daily
updates must not be published to either repo.

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
