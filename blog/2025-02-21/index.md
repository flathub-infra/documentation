---
slug: app-safety-layered-approach-source-to-user
title: "Flathub Safety: A Layered Approach from Source to User"
authors:
  - cassidyjames
tags:
  - moderation
---

With thousands of apps and billions of downloads, Flathub has a responsibility to ensure safety of our millions of active users. We take this responsibility very seriously with a layered, in-depth approach including policy, human review, transparency, automation, sandboxing, permissions, and user interface.

<!-- truncate -->

- [x] app submission checks
- [ ] automated tests
- [ ] Verification
- [x] Flatpak itself (sandboxing)
- [x] Permissions: static and runtime
- [ ] Reproducible builds
- [ ] clients (GNOME Software/KDE Discover/CLI)
- [ ] updates (e.g. what gets held)

Apps take a long journey from a developer's source code to being used on someone's device; let's take a look at that journey from a perspective of safety.

## Flatpak Security & Sandboxing

Each app on Flathub is distributed as a [Flatpak](https://flatpak.org/). This app packaging format was specifically designed with security and safety at its core, and has been continuously improved over the past decade. It has received endorsements, development, and wide adoption from organizations such as Bambu Lab, Bitwig, CodeThink, Collabora, Discord, The Document Foundation, elementary, Endless, GDevelop, KiCad, Kodi, GNOME, Intel, KDE, LibreOffice, Mozilla, OBS Studio, Plex, Prusa Research, Purism, Red Hat, System76, Telegram, Valve, and many more.

![Flatpak logo](flatpak.png)

From a technical perspective, Flatpak does not require elevated privileges to install apps, isolates apps from one another, and limits app access to the host environment. It makes deep use of existing Linux security technologies such as cgroups, namespaces, bind mounts, and seccomp as well as [Bubblewrap](https://github.com/containers/bubblewrap) for sandboxing.

Due to this sandboxing, apps don't have permission to access to many aspects of the host OS or user data they might need. To get that access, apps must request it using Portals or static permissions.

### Portals

Most permissions should be requested and granted on demand via an API called _Portals_. These permissions do not need to be granted ahead of time, as desktop environments provide the mechanisms to give user consent and control over them e.g. by indicating their use, directly prompting the user before the permission is granted, and allowing revocation.

![Illustration of portal, light](xdg-portal-light.png#gh-light-mode-only)
![Illustration of a portal, dark](xdg-portal-dark.png#gh-dark-mode-only)

Portals include APIs for handling auto-start and background activity; access to the camera, clipboard, documents, files, location, screen casting, screenshots, secrets like passwords, trash, and USB devices; setting global shortcuts; inhibiting suspend or shut down; capturing input; monitoring memory, network, or power profiles; sending notifications; printing; setting a wallpaper; and more. In each case, the user's desktop environment (like GNOME or KDE) manages if and how a user is notified or prompted for permissions—and if the permission is not granted, the app must handle it gracefully.

Read more about Portals from the [XDG Desktop Portal documentation](https://flatpak.github.io/xdg-desktop-portal/docs/).

### Static Permissions

Apps must also define any _static_ permissions they need to function. These are clearly defined up front and include access to resources such as the network, Bluetooth, and audio devices. For regular file handling such as opening or saving, apps can use the File Chooser portal. In some cases apps may only make sense with permanent access to specific a folder, in which case a narrowly-scoped static permission (e.g. read-only access to the user's Music folder) may be used.

Static permissions are designed to be as narrowly-scoped as possible and are unchanging per release of an app. They are not designed to be modified by an end user except in cases of development or debugging. Due to this, Flatpak always prefers apps to use Portals over static permissions whenever possible.

Read more about static permissions from the [Flatpak documentation](https://docs.flatpak.org/en/latest/sandbox-permissions.html).

### Shared Runtimes

Every app is built against a Flatpak runtime hosted by Flathub. The runtimes provide basic dependencies, are well-maintained by the Linux community, and are organized according to various platforms a developer may target; for example, GNOME, KDE, or a generic FreeDesktop SDK. This means many apps—especially those targeting a platform like GNOME or KDE and using its developer libraries—don't need to pull in external dependencies.

Runtimes are automatically installed with apps that require them, and are updated separately by the user's OS, app store, or CLI when needed. When a dependency in a runtime is updated, e.g. for a critical security update, it rolls out as an update to all users of apps that use that runtime.

Learn more about runtimes from the [Flatpak documentation](https://docs.flatpak.org/en/latest/basic-concepts.html#runtimes).

### Shared Modules

In some cases there are commonly-used libraries not provided directly by one of the available runtimes. Flathub provides Git submodules for these libraries to centralize the maintenance, as well as automated tooling to propose updating these libraries in apps.

Learn more about shared modules from the [Flathub documentation](https://docs.flathub.org/docs/for-app-authors/shared-modules).

## Submission & Human Review

Every app must be submitted to Flathub for consideration to be hosted and distributed. At this stage, humans from Flathub review the app to ensure it follows the [requirements](https://docs.flathub.org/docs/for-app-authors/requirements). Read the linked docs for detailed information, but some key requirements of interest regarding safety are:

- **Apps must be sandboxed Flatpaks with narrow permissions**, including using appropriate runtime permissions instead of broad static permissions whenever possible.

- **Apps must not be misleading or malicious**, which covers impersonating other apps or including outright malicious code or functionality.

- **App IDs must accurately reflect the developer's domain name** or code hosting location; e.g. if an app is submitted that purports to be Lutris, its ID must be obviously associated with that app (in this case, [Lutris.net](https://lutris.net)).

Each of these requirements are checked—and if a reviewer finds something out of place, they can request changes to the submission or reject it completely.

## Automated Testing

In addition to human review, Flathub makes use of automated testing for a number of quality and safety checks.

<!-- …need to cover this in more detail -->

## Verification

Apps can be [verified](https://docs.flathub.org/docs/for-app-authors/verification) on Flathub; this process confirms that an app is published by the original developer or an authorized party by proving ownership of the app ID. While all apps are held to the same high standards of safety and review on Flathub, this extra layer helps users confirm that the app they are getting is _also_ provided or authorized by its developer.

![Verified](verified.png)

Around half of the apps on Flathub so far are verified, with the number regularly increasing.
