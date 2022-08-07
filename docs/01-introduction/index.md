# Introduction to Flatpak

Flatpak is a framework for distributing desktop applications across
various Linux distributions. It has been created by developers who have
a long history of working on the Linux desktop, and is run as an
independent open source project.

## Terminology

- Flatpak: a system for building, distributing, and running sandboxed
  desktop applications on Linux.
- Flatpak application: these are the applications the user installs
  via the `flatpak` command or via a different UI like GNOME Software
  or KDE Discover.
- Runtime: also called platforms, these are integrated platforms to
  provide basic utilities needed for a Flatpak application to work.
- BaseApp: these are integrated platforms for frameworks like
  Electron.
- Flatpak bundle: a specific single-file export format which contains
  a Flatpak app or runtime.

## Target audience

Flatpak can be used by all kinds of desktop applications, and aims to be
as agnostic as possible regarding how applications are built. There are
no requirements regarding which programming languages, build tools,
toolkits or frameworks can be used.

While Flatpak only runs on Linux, it can be used by applications that
target other operating systems, as well as those that are
Linux-specific. Applications can be open source or proprietary (although
some distribution services, like [Flathub](https://flathub.org/), can
have restrictions in this respect).

The only technical requirements made by Flatpak are that applications
follow a small number of Freedesktop standards, in order to enable
desktop integration (see [conventions](conventions)).

## Issues of current model of packaging

It is important to understand the problems of the current model of
packaging applications to understand the existence of Flatpak:

- **Duplicated work packaging apps**: many Linux distributions come
  with their own package manager, package format and repository. This
  requires a lot of maintainers to package the same application in
  various distributions, or the application developer to learn the
  language of each format and then package the application in those
  distributions, or ignore most distributions and package and support
  a couple of distributions. This makes the Linux desktop a difficult
  platform for software vendors to target.
- **Limited to apps that are packaged**: not all applications are
  natively available in every Linux distribution. If an application is
  not available in a specific distribution, the user will have to rely
  on manually downloading the archive of the application, extracting
  it and hoping the application will launch.
- **Limited to distributions that have the apps**: the user is limited
  to the number of distributions that have the needed applications for
  them to properly setup their workflow. This reduces the amount of
  distributions that can be suitable for a user.
- **Hard to innovate in OS space**: the maintainers of the
  distributions have to spend a lot of time packaging applications to
  make the distribution suitable for the end user, instead of focusing
  on their end goals. This delays the progress of each distribution.
- **Old and outdated packages**: LTS distributions often have very old
  versions of applications packaged natively. Bug reproducibility is
  hindered by the different environments that applications are run in,
  and application developers often have little control over how their
  application is packaged by distributions.

Flatpak strives to fix the issues listed above, by conveniently enabling
developers to distribute applications from one source and to target the
entire Linux desktop.

## Reasons to use Flatpak

Flatpak has some major advantages over most system package managers:

- **Universality**: Flatpak allows applications to be installed and
  run on virtually any Linux distribution. This includes non-GNU
  distributions, systemd-free distributions, distributions with a
  read-only operating system (OS), and various architectures without
  the developer needing the relevant hardware on hand.
- **Space for innovations**: Flatpak facilitates distribution
  maintainers to focus on their goals to innovate their distribution.
- **Stability**: breakage in a Flatpak application will not risk the
  system from breaking. This is because Flatpak applications and
  runtimes are contained to not interfere with the system altogether.
- **Rootless install**: elevated privileges are not required when
  installing a Flatpak application or a runtime.
- **Sandboxed applications**: one of Flatpak's main goals is to
  increase the security of desktop systems by isolating applications
  from one another. This is achieved using sandboxing and means that,
  by default, applications that are run with Flatpak have limited
  access to the host environment.

Flatpak has some major advantages over other universal approaches to
distributing applications on Linux:

- **Decentralized by design**: while Flatpak does provide a
  centralized service for distributing applications, it also allows
  decentralized hosting and distribution, so that application
  developers or downstreams can host their own applications and
  application repositories.
- **Desktop integration**: Flatpak also offers native integration for
  the main Linux desktops, so that users can easily browse, install,
  run and use Flatpak applications through their existing desktop
  environment and tools.
- **Space efficiency**: Flatpak deduplicates libraries and other files
  used by multiple applications to save megabytes or even gigabytes
  worth of storage depending on the amount of applications installed.
- **Delta updates**: only changed files are downloaded for updates.

Other benefits for developers include:

- **Forward-compatibility**: the same Flatpak application can be run
  on different versions of the same distribution, including versions
  that haven't been released yet. This doesn't require any changes
  or management by application developers.
- **Bundling**: this allows application developers to ship almost any
  dependency or library as part of their application. This gives
  complete control over which software is used to build applications.
- **Consistent application environments**: because these are the same
  across devices, applications perform as intended. This also makes it
  easier to identify bugs and to do testing.
- **Branches**: this allows developers to ship applications from
  different branches, e.g. `stable`, `beta`, etc. while retaining the
  same name.
- **Maintained platforms**: called runtimes, these contain collections
  of dependencies, which can be used by applications, and which can
  take a lot of the work out of application development.

Information about Flatpak's internals can be found in
[Under the hood](under-the-hood.md).
