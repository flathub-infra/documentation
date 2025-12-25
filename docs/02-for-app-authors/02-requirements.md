# Requirements

The goal of these requirements is to ensure that the applications hosted
on Flathub are safe to use and integrate well in the desktop experience.

## Inclusion policy

:::tip
Each application is evaluated on a case-by-case basis and if you are
unsure whether it fits the guidelines, please feel free to ask via
[GitHub issues](https://github.com/flathub/flathub/issues) or in the
[Flathub Matrix room](https://matrix.to/#/#flathub:matrix.org).
:::

Flathub aims to provide a curated collection of high-quality, sandboxed
graphical desktop applications that seamlessly integrate with the Linux
desktop environment and enhance the user experience.

This defines specific policies for submission and inclusion, and applies
to all submissions that are (were) submitted or included after the policy
was documented, for as long as they remain on Flathub. Submissions are
accepted at the discretion of the reviewers and are liable to be removed
even after they are included, if it is found to violate any policy. They
must also comply with [Flathub's Terms Of Service](https://flathub.org/terms-and-conditions).
These may evolve over time, and exceptions may be granted in specific
cases.

:::tip
If you believe something is violating these policies, please [open an issue](https://github.com/flathub/flathub/issues).
:::

#### Non-functional submissions

Submissions that are not fully functional, provide a poor user
experience, or contain clearly or easily visible issues will not be
accepted unless these issues are addressed.

#### Console software submissions

Console software submissions are not accepted anymore. Exceptions may
be given to Flatpak or Flathub related tooling.

#### Minimal submissions

Submissions that offer very minimal functionality often consisting of
simple scripts, single or simple sources or aren't suitable as desktop
applications or are forks of existing projects without any significant
modifications will not be accepted.

#### Impermissible submissions

In addition to the other guidelines, the following non-exhaustive types
of application submissions will not be accepted: documentation or help
files only, media-only content (e.g., images, audio, video), fonts,
firmware, simple web wrappers/web consoles, applications only working
in very specific environments such as requiring a specific DE or distro
(unless it is for example a settings app), shell/WM/DE extensions, tray
applets, system utilities (e.g., `sudo`, `xeyes`) and CLI utility
programs (e.g., `elinks`, `gh`).

#### Submissions incompatible or restricted by Flatpak sandbox

Certain types of submissions, such as development tools and IDEs with a
broad scope are generally not well-suited for Flatpak due to inherent
sandboxing limitations and severely degrade the user experience. Unless
these applications are being officially submitted by the upstream
developers and/or upstream has explicitly committed to supporting
Flatpak they will not be accepted.

#### Duplicate submissions

Multiple submissions of the same application (in terms of functionality,
content, visuals, or user experience) each built with different
frameworks or toolkits will not be accepted. Multiple submissions of a
forked app with minimal changes in the fork (in terms of functionality,
content, visuals, or user experience) will not be accepted.

#### Software using emulation or translation layers

Windows software submissions that are using Wine or any submissions
that aren't native to the Linux desktop and is using some emulation or
translation layer will only be accepted if they are submitted officially
by upstream with the intention of maintaining it in an official
capacity.

#### End-of-life dependencies

Submissions using an end-of-life runtime, extension or baseapp
will not be accepted.

Submissions that use high-risk, end-of-life software, such as
OpenSSL 1.x, Python 2, or Qt5 WebKit, and request the network or any
other invasive permissions may be rejected due to security concerns.

Submissions using end-of-life dependencies may not be accepted in
some cases.

Submissions where the main application is itself end-of-life may be
rejected, unless the submitter can demonstrate their ability to
maintain it for the foreseeable future and perform runtime upgrades.

#### Unacceptable software design practices

Submissions that include antipatterns or insecure design choices, for
example, disabling or ignoring security checks, insecure cryptography
practices, exposing sensitive information, overly permissive
configurations etc. will not be accepted.

Submissions with unethical, manipulative or exploitative software
designs will not be accepted. Submissions that promote gambling or
games of chances involving real-world money will not be accepted.

#### Extensions or BaseApps

Flatpak extensions that add support for new languages, language
specific tooling etc. or BaseApps will need a clear use case defined
and prospective users to be accepted.

#### Structure and organisation

The project that is being submitted (if open source or source
available), should be well-organised, structured and should follow the
established conventions of the programming language it uses. They must
also be distributed in a sensible manner such as through Git tags or
tarballs hosted on well-known hosts so that it is easy to consume the
source from the Flatpak manifest and verify it. Proprietary apps must
also be distributed in sensible manner such as through tarballs or some
binary formats hosted on a well-known host. The submission may be
subject to additional scrutiny if it exhibits signs of poor structure,
bad practices, instability, or obfuscation.

#### Misleading, malicious or illegal submissions

Submissions that impersonate; engage or encourage to engage in unlawful
activities; provide false, misleading information and functionality;
attempt to deceive or violate any laws, trademarks and copyrights;
act in a malicious manner or contains malicious code will not be
accepted. In most cases these are liable to be outright rejected or
removed from the store.

## Application ID

:::important
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
at each dot `.`.

_Demangling_ an ID or any of its component means removing any leading
underscore (`_`) and converting any other underscore (`_`) to a
dash (`-`).

The _domain_ from the ID is determined by reversing its components and
demangling them to form a FQDN, which is then matched against
[PSL](https://publicsuffix.org/). If a match is not found in PSL, all
component except the last from the previous final form is taken as the
domain.

The following rules should be followed when creating application IDs.

- The ID must not exceed 255 characters and must have at least 3
  components. Applications must not exceed 5 components.

- Each component must contain only the characters `[A-Z][a-z][0-9]_`. A
  dash `-` is only allowed in the last component.

- The domain portion must be in lowercase and must convert dash `-` to
  underscore `_`. If any component has an initial digit, it needs to
  be prefixed with an underscore similarly.

- The ID must not end in generic terms like `.desktop, .app, .linux`.
  It's fine to repeat the application name in such cases.

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

### Control over domain or repository

- The domain must be directly related to the project or the application
  being submitted and the author or the developer or the project must
  have control over the domain. The corresponding URL must be reachable
  over HTTPS. In some edge cases, if it is not reachable, an exception
  can be granted after manually checking.

  [Verification](/docs/for-app-authors/verification) may require placing
  a token under `https://{domain name}/.well-known/org.flathub.VerifiedApps.txt`

  It's preferable to have visible proof on the webpage linking the
  application or the developer or the project to the domain calculated
  from the ID.

#### Code hosting

A _repository URL_ (or project URL) is calculated for code hosting IDs
by using the domain and by taking the last component of the ID as-is
(except when the last component starts with a leading underscore and then
a digit, in which case following Appstream conventions, the leading
underscore is stripped from that component).

Note, that some code hosting platforms like GitLab may have
case-sensitive namespaces.

- Applications using code hosting IDs must have the repository URL
  reachable. In some cases, if the calculated code hosting URL
  doesn't match exactly, an exception can be granted after manually
  checking.

For example, the repository URL for the ID `io.github.example_foo.bar`
will be `https://github.com/example-foo/bar` and for the ID
`io.sourceforge.example_foo.bar`, it will be
`https://sourceforge.net/projects/example-foo/`.

#### Protected ID prefixes

- `org.gnome.`: Only apps in [this list](https://gitlab.gnome.org/Teams/Releng/AppOrganization/-/blob/main/data/registered-app-ids.yml)
  are allowed to use it.
- `org.kde.`: The project must be hosted in a [group on KDE Invent](https://invent.kde.org/explore/groups?page=1).
- `com.system76.`: The project must be hosted in the [pop-os organization on GitHub](https://github.com/pop-os).

### Extensions and BaseApps

[BaseApps](https://docs.flatpak.org/en/latest/dependencies.html#baseapps)
must have `BaseApp` as the last component of the Flatpak ID and for the
rest of the ID, the above rules apply.

[Flatpak extensions](https://docs.flatpak.org/en/latest/extension.html)
must prefix their ID with the extension point ID, which is either
defined in one of the [runtimes](/docs/for-app-authors/runtimes) or
in an app. If the extension point is defined in an app, it must use
the app's ID as a prefix. They are exempt from the
[domain control rules](/docs/for-app-authors/requirements#control-over-domain-or-repository).

## Renaming Flatpak ID

Flatpak IDs (app IDs) are supposed to be a constant and unique identifier
throughout an app's lifetime. As such, [app ID renames](/docs/for-app-authors/maintenance#renaming-the-flatpak-id)
are conservatively accepted on a case-by-case basis provided valid
reasons for the rename exists.

While exceptions can be made (for example an upstream ID change makes
the currently published app non-functional), in general, the following
types of renames won't be accepted.

- A rename that does not change the domain portion of the app ID will
  not be accepted.

- A rename that changes the domain portion of the app ID but with no
  intention to [verify](/docs/for-app-authors/verification) it will not
  be accepted.

## License

All content hosted on Flathub must allow legal redistribution, and the
license must be correctly specified in the app's [MetaInfo file](/docs/for-app-authors/metainfo-guidelines/#license).

Non-redistributable sources must use [extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data)
source type. Any part of the application such as the name or icon must
not violate any trademarks and must be distinct.

License must be correctly declared in the metainfo file and must
match with license information available in its source.

## Installing license files

Application maintainers and submitters must ensure that license files
for each module in the Flatpak manifest is installed to
`$FLATPAK_DEST/share/licenses/$FLATPAK_ID`.

Recent versions of Flatpak builder can do this automatically for common
license file names, so in most cases nothing needs to be done. But if
it doesn't, please try to use the `license-files` key in the manifest
to specify an array of paths for license files, relative to the source
directory.

Another option is to use `post-install` commands to install the license
files:

```yaml
  - name: my-module
    buildsystem: cmake-ninja
    config-opts:
      - -DFOOBAR=ON
      - ...
    post-install:
      - install -Dm0644 LICENSE -t ${FLATPAK_DEST}/share/licenses/$FLATPAK_ID/my-module
    sources:
      - ...
```

## Permissions

Static permissions should be limited as much as possible and applications
should use [XDG Portals](https://flatpak.github.io/xdg-desktop-portal/docs/)
and XDG standards whenever possible.

Please follow the [Flatpak permission guide](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
when writing the manifest or choosing finish-args. Anything listed in
"Standard Permissions" can be freely used. D-Bus, Filesystem and Device
access should be limited to only what the application needs.

Please avoid choosing broad permissions unless justified.

## No network access during build

All dependencies needed to build and run the application must be present
in the manifest as [sources](https://docs.flatpak.org/en/latest/module-sources.html)
with publicly accessible URLs or must be included as local sources in
the submission pull request. Binary or precompiled files must not be
present in the submission pull request.

There is no network access during the build process. This means using
`--share=network` inside `build-args` will not work.

```yaml
# This will NOT work
build-options:
  build-args:
    - --share=network
```

## Building from source

Unless blocked by technical reasons, all submissions must be built from
the source code. Exceptions can be made to this in certain cases such
as due to maintainability concerns, lack of the necessary tooling or
in the case of well established vendors.

## Patches

Submissions should aim to distribute the application with minimal
modifications and should closely follow the upstream source.

If any modifications are necessary (e.g., through patching), all
patches must be included in the submission along with the manifest.

## Stable releases

The Flathub stable repository is dedicated to hosting only stable
software. The Flathub beta repository can be used to publish beta
software, though it will not be listed on the website and users must
be manually migrated if switched to the stable repo later.

Nightly releases, development snapshots, or any software requiring daily
updates must not be published to either repo.

## Required files

:::important
Under no circumstances should source code nor build artificats be
included in the submission. Flathub is not intended to host neither
application source code nor binaries, including that of any dependencies.
:::

The following files should be included in the submission.

### Manifest

The [application manifest](https://docs.flatpak.org/en/latest/manifests.html)
**must be at the top level** and named after the [application ID](#application-id)
with the extension `.json`, `.yml` or `.yaml` depending on whether it is
a JSON or YAML file.

The [runtime(s)](https://docs.flatpak.org/en/latest/basic-concepts.html#runtimes)
used in the manifest must be hosted on Flathub.

### flathub.json

Flathub builds on both `x86_64` and `aarch64` by default. If the
application is supported on only one architecture, please include a
`flathub.json` file in the submission pull request with the
[proper contents](/docs/for-app-authors/maintenance#limiting-the-set-of-architectures-to-build-on).

The `flathub.json` file should reside in the top-level root, next to
the Flatpak manifest.

### Dependency manifest

There is [no network access](/docs/for-app-authors/requirements#no-network-access-during-build)
during the build process so all dependencies used by the application
must be supplied in the specified in the manifest as sources
with publicly accessible URLs so that they can be downloaded before
the build starts.

There is a [community provided set of tools](https://github.com/flatpak/flatpak-builder-tools)
that can be used to generate dependency manifests for npm, yarn, cargo,
pip etc.

These manifests must be included in the submission.

## Required metadata

Applications must provide the following metadata.

:::important
These metadata files must be integrated in the upstream project. Please
do not include a copy in the submission pull request.

Flatpak manifests using [extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data)
sources for the main application is an exception to this.
:::

## Name and Icon

### No trademark violations

The application name and icon as presented to the Flathub website
and to users must be distinct and must not violate any trademarks.

Official affiliation must not be implied by using a vendor's name in the
application name or icon unless the application is actually part of that
vendor's project.

Icons should be sufficiently distinct to convey the project's own
identity and prevent any risk of user confusion.

Some common examples of things to avoid include:

- A Firefox fork cannot mention `Firefox` in its name or use
  any of the official icon, logo or artwork.
- Third party apps, for example, a music player made for GNOME or COSMIC cannot
  use `GNOME` or `COSMIC` in its name or use any of the official icon, logo or
  artwork.
- A WhatsApp client or wrapper cannot have `WhatsApp` in its name or use
  any of the official icon, logo or artwork.

Vendors often have their own requirements and policies. Some are
listed below. Please refer to them for further details.

- GNOME: https://wiki.gnome.org/Foundation/SoftwarePolicy, https://foundation.gnome.org/licensing-guidelines
- COSMIC: https://github.com/pop-os/cosmic-epoch/blob/master/TRADEMARK.md, https://github.com/pop-os/pop/blob/master/LICENSING.md

### Appstream

All submissions must provide a [Metainfo file](/docs/for-app-authors/metainfo-guidelines/#path-and-filename)
that passes [validation](/docs/for-app-authors/metainfo-guidelines/#validation).

A Metainfo file is mandatory to appear on the Flathub website.

Metainfo file is optional for runtimes, extensions and BaseApps.

#### Description notes

Unofficially packaged, _proprietary_ submissions **must** add a note like
below as the **first** `p` tag of `description`.

Unofficially packaged, open source submissions _may_ also follow this.

```xml
<description>
  <p>**This is a community package of APP NAME and not officially supported by UPSTREAM NAME.**</p>
</description>
```

If the submission is unavailable in English and only exists in a small
number of select locales, a similar note **must** be added.

```xml
<description>
  <p>**This app is only available in LANG NAME.**</p>
</description>
```

If the user needs to perform additional post installation steps to run
the submission, they **must** be mentioned or linked.

```xml
<description>
  <p>**Please follow https://example.org/setup after installation.**</p>
</description>
```

### Desktop file

All graphical applications must include a [desktop file](https://docs.flatpak.org/en/latest/conventions.html#desktop-files).

Desktop file is optional for console applications.

### Icons

Graphical applications must provide, preferably a SVG icon or at least
a 256x256 PNG icon, properly [named and installed](https://docs.flatpak.org/en/latest/conventions.html#application-icons).

Icon is optional for console applications but it is mandatory if
they intend to appear on Flathub website search results.
