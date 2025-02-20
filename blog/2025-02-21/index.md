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
- [ ] Permissions: static and runtime
- [ ] Reproducible builds
- [ ] clients (GNOME Software/KDE Discover/CLI)
- [ ] updates (e.g. what gets held)

Apps take a long journey from a developer's source code to being used on someone's device; let's take a look at that journey from a perspective of safety.

## Flatpak Security & Sandboxing

Each app on Flathub is distributed as a [Flatpak](https://flatpak.org/). This app packaging format was specifically designed with security and safety at its core, and has been continuously improved over the past decade. It has received endorsements, development, and wide adoption from organizations such as Bambu Lab, Bitwig, CodeThink, Collabora, Discord, The Document Foundation, elementary, Endless, GDevelop, KiCad, Kodi, GNOME, Intel, KDE, LibreOffice, Mozilla, OBS Studio, Plex, Prusa Research, Purism, Red Hat, System76, Telegram, Valve, and many more.

From a technical perspective, Flatpak does not require elevated privileges to install apps, isolates apps from one another, and limits app access to the host environment. It makes deep use of existing Linux security technologies such as cgroups, namespaces, bind mounts, and seccomp as well as [Bubblewrap](https://github.com/containers/bubblewrap) for sandboxing.

### Permissions: Static & Runtime

As a result of using Flatpak and its sandboxing, each app must define what _static_ permissions it needs to function. These are clearly defined up front and include access to common resources such as the network, Bluetooth, and audio devices. Apps must also define whether or not they are designed for the more secure Wayland display protocol and what permanent file access they need—if any—without user prompting. Static permissions are designed to be as narrowly-scoped as possible and are unchanging per release of an app. They are not designed to be modified by an end user except in cases of development or debugging.

Apps can also make use of _runtime_ permissions via an API called Portals. These permissions do not need defining or granting ahead of time, as desktop environments provide the mechanisms to give user consent and control over them e.g. by indicating their use, directly prompting the user before the permission is granted, and allowing revocation. Portals APIs include handling auto-start and background activity; access to the camera, clipboard, documents, files, location, screen casting, screenshots, secrets like passwords, trash, and USB devices; setting global shortcuts; inhibiting suspend or shut down; capturing input; monitoring memory, network, or power profiles; sending notifications; printing; setting a wallpaper; and more. In each case, the OS or desktop environment is in charge of managing if and how a user is notified or prompted for permissions—and if the permission is not granted, the app must handle it gracefully.

Read more about permissions from the [Flatpak documentation](https://docs.flatpak.org/en/latest/sandbox-permissions.html) and [XDG Desktop Portal documentation](https://flatpak.github.io/xdg-desktop-portal/docs/).

### Shared Runtimes

## Submission & Human Review

Every app must be submitted to Flathub for consideration to be hosted and distributed. At this stage, humans from Flathub review the app to ensure it follows the [requirements](https://docs.flathub.org/docs/for-app-authors/requirements). Read the linked docs for detailed information, but some key requirements of interest regarding safety are:

- **Apps must be sandboxed Flatpaks with narrow permissions**, including using appropriate runtime permissions instead of broad static permissions whenever possible.

- **Apps must not be misleading or malicious**, which covers impersonating other apps or including outright malicious code or functionality.

- **App IDs must accurately reflect the developer's domain name** or code hosting location; e.g. if an app is submitted that purports to be Lutris, its ID must be obviously associated with that app (in this case, [Lutris.net](https://lutris.net)).

Each of these requirements are checked—and if a reviewer finds something out of place, they have the power to request changes to the submission or reject it completely.

## Automated Testing
