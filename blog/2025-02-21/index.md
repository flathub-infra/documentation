---
slug: app-safety-layered-approach-source-to-user
title: "Flathub Safety: A Layered Approach from Source to User"
image: ./safety.png
authors:
  - cassidyjames
tags:
  - moderation
---

With thousands of apps and billions of downloads, Flathub has a responsibility to help ensure the safety of our millions of active users. We take this responsibility very seriously with a layered, in-depth approach including sandboxing, permissions, transparency, policy, human review, automation, reproducibility, auditability, verification, and user interface.

<!-- truncate -->

Apps and updates can be fairly quickly published to Flathub, but behind the scenes each one takes a long journey full of safety nets to get from a developer’s source code to being used on someone’s device. While information about this process is available between various documentation pages and the Flathub source code, I thought it could be helpful to share a comprehensive look at that journey all in one place.

## Flatpak Security & Sandboxing

Each app on Flathub is distributed as a [Flatpak](https://flatpak.org/). This app packaging format was specifically designed with security and safety at its core, and has been continuously improved over the past decade. It has received endorsements, development, and wide adoption from organizations such as Bambu Lab, Bitwig, CodeThink, Collabora, Discord, The Document Foundation, elementary, Endless, GDevelop, KiCad, Kodi, GNOME, Intel, KDE, LibreOffice, Mozilla, OBS Studio, Plex, Prusa Research, Purism, Red Hat, System76, Telegram, Valve, and many more.

![Flatpak logo](flatpak.png)

From a technical perspective, Flatpak does not require elevated privileges to install apps, isolates apps from one another, and limits app access to the host environment. It makes deep use of existing Linux security technologies such as cgroups, namespaces, bind mounts, and seccomp as well as [Bubblewrap](https://github.com/containers/bubblewrap) for sandboxing.

Flatpak apps are also built from a declarative manifest, which defines the exact sources and environment to build from to enable auditability and as much reproducibility as possible.

Due to Flatpak’s sandboxing, apps don’t have permission to access many aspects of the host OS or user data they might need. To get that access, apps must either request it using Portals or static permissions.

### Dynamic permissions

Most permissions can be requested and granted on demand via an API
called [Portals](https://flatpak.github.io/xdg-desktop-portal/docs/).
These permissions do not need to be given ahead of time, as desktop
environments provide the mechanisms to give user consent and control
over them e.g. by indicating their use, directly prompting the user
before the permission is granted, and allowing revocation.

![Illustration of portal, light](xdg-portal-light.png#gh-light-mode-only)
![Illustration of a portal, dark](xdg-portal-dark.png#gh-dark-mode-only)

Portals include APIs for handling auto-start and background activity;
access to the camera, clipboard, documents, files, location, screen
casting, screenshots, secrets like passwords, trash, and USB devices;
setting global shortcuts; inhibiting suspend or shut down; capturing
input; monitoring memory, network, or power profiles; sending
notifications; printing; setting a wallpaper; and more. In each case,
the user’s desktop environment (like GNOME or KDE) manages if and how a
user is notified or prompted for permissions—and if the permission is
not granted, the app must handle it gracefully.

Portals is a fairly new addition to the Freedesktop ecosystem; desktop
environments need to implement them and app developers are increasingly
adopting them.

### Static permissions

Static permissions are set by application developers at build time.
They allow exposing specific resources from the host into the sandbox
which makes them accessible as if the sandbox was not there. They serve
multiple purposes:

1. Give Flatpak apps access to basic and safe resources  for which
   dynamic permissions would not make sense. For example Wayland or
   access to dri device nodes for hardware acceleration
2. Allow apps who haven't implemented portals to be functional
3. Provide a solution when a portal is not available yet for a
   specific feature

See also

* [Sandbox Permissions on flatpak.org](https://docs.flatpak.org/en/latest/sandbox-permissions.html)
* [Permissions on flathub.org](https://docs.flathub.org/docs/for-app-authors/requirements#permissions)

Static permissions are reviewed by Flathub human reviewers when a new
application is submitted and when they are updated between releases.

### Shared Runtimes & Modules

Every app is built against a [Flatpak runtime](https://docs.flatpak.org/en/latest/basic-concepts.html#runtimes) hosted by Flathub. The runtimes provide basic dependencies, are well-maintained by the Linux community, and are organized according to various platforms a developer may target; for example, GNOME, KDE, or a generic FreeDesktop SDK. This means many apps—especially those targeting a platform like GNOME or KDE and using its developer libraries—don’t need to pull in external dependencies for critical components.

Runtimes are automatically installed with apps that require them, and are updated separately by the user’s OS, app store, or CLI when needed. When a dependency in a runtime is updated, e.g. for a critical security update, it rolls out as an update to all users of apps that use that runtime.

In some cases there are commonly-used libraries not provided directly by one of the available runtimes. Flathub provides [shared modules](https://docs.flathub.org/docs/for-app-authors/shared-modules) for these libraries to centralize the maintenance.

If an app needs to bundle other dependencies, they must be defined in the manifest. We also provide [tooling to automatically suggest updates](https://github.com/flathub-infra/flatpak-external-data-checker) to these dependencies.

## Submission & Human Review

Once an app is developed, it must be submitted to Flathub for consideration to be hosted and distributed. At this stage, human Flathub reviewers will review the app to ensure it follows the [requirements](https://docs.flathub.org/docs/for-app-authors/requirements). Of note:

- **Apps must be sandboxed with as narrow permissions as possible** while still functioning, including using appropriate runtime permissions instead of broad static permissions when possible. All broad
  static permissions need to be justified by the submitter during review.

- **Apps must not be misleading or malicious**, which covers impersonating other apps or including outright malicious code or functionality.

- **App IDs must accurately reflect the developer’s domain name** or code hosting location; e.g. if an app is submitted that purports to be Lutris, its ID must be obviously associated with that app (in this case, [Lutris.net](https://lutris.net)).

Each of the documented requirements are checked—and if a reviewer finds something out of place they request changes to the submission, ask for rationale, or reject it completely.

## Automated Testing

In addition to human review, Flathub also makes use of automated testing for a number of quality and safety checks. For example, our automated tests block unsafe or outright wrong permissions, such as apps requesting access to whole session or system buses or unsafe bus names. Our automated tests also help ensure reproducible builds by disallowing pointing at bare git branches without a specific commit.

## Reproducibility & Auditability

Once an app has been approved and passes initial tests, it is built using the open source and publicly-available flatpak-builder utility from the approved public manifest, on Flathub’s infrastructure, and without network access. Sources for the app are validated against the documented checksums, and the build fails if they do not match.

For further auditability, we specify the git commit of the manifest repo used for the build in the Flatpak build subject. The build itself is signed by Flathub’s key, and Flatpak/OSTree verify these signatures when installing and updating apps.

We mirror the exact sources each app is built against in case the original source goes down or there is some other issue, and anyone can build the Flatpak back from those mirrored sources to reproduce or audit the build. The manifest used to build the app is hosted on Flathub's GitHub org, plus distributed to every user in the app’s sandbox at `/app/manifest.json`—both of which can be compared, inspected, and used to rebuild the app exactly as it was built by Flathub.

## Verification

Apps can be [verified](https://docs.flathub.org/docs/for-app-authors/verification) on Flathub; this process confirms that an app is published by the original developer or an authorized party by proving ownership of the app ID. While all apps are held to the same high standards of safety and review on Flathub, this extra layer helps users confirm that the app they are getting is _also_ provided or authorized by its developer.

![Verified checkmark](verified.png)

Over half of the apps on Flathub so far are verified, with the number regularly increasing.

## App Store Clients

Once an app is developed, submitted, tested, approved, built, and distributed, it appears in app store clients like Flathub.org, KDE Discover, GNOME Software, and elementary AppCenter—as well as the Flatpak CLI. While exact implementations vary and the presentation is up to the specific app store client, generally each will show:

- Static permissions and their impact on safety
- Open Age Rating Service rating and details
- If an app uses outdated runtimes
- Release notes for each release
- If static permissions increase between releases

Flathub.org and GNOME Software also display the app’s verified status.

## Updates

Once an app is accepted onto Flathub, it still remains subject to
various built-in protections to ensure security.

- **Flathub maintains ownership over the manifest repo**, while app developers are invited as limited collaborators
- **The manifest repo’s default branch is protected**, preventing direct pushes without a pull request
- **The manifest repo’s commit history cannot be rewritten**, making it harder to sneak something in
- **Flathub’s automated tests must pass** before a PR can be merged and an update can be pushed
- **Static permission changes are held for human review** before an update is released to users
- **Critical MetaInfo changes are held for human review**, e.g. if an app name, developer name, app summary, or license changes

## Special Cases

There are a few special cases to some of the points above which I would be remiss not to mention.

Flathub has granted a select group of trusted partners, including Mozilla and OBS Studio, the ability to directly upload their builds from their own infrastructure. These projects have an entire CI pipeline which validates the state of their app, and they perform QA before tagging the release and pushing it to Flathub. Even for these few cases of direct uploads, we require a public manifest and build pipeline to enable similar reproducibility and auditability as outlined above. We also require the apps to be verified, and still run automated tests such as our linter against them.

Lastly, some apps (around 6%) use [extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data) to instruct Flatpak to download and unpack an existing package (e.g. a Debian package) during installation. This process runs in a tight unprivileged Flatpak sandbox that does not allow host filesystem or network access, and the sandbox cannot be modified by app developers. These are largely proprietary apps that cannot be built on Flathub’s infrastructure, or apps using complex toolchains that require network access during build. This is discouraged since it does not enable the same level of auditability nor multi-architecture support that building from source does. As a result, this is heavily scrutinized during human review and only accepted as a last resort.

Even with the above, the vast majority of apps are built reproducibly
from source on Flathub’s infrastructure and 83% of the app catalog
supports multiple architectures. The handful of apps that aren’t built
from source still greatly benefit from the transparency and auditability
built into all of the other layers.

## Incident Response

While we expect to catch the vast majority of safety issues with the above, we are also able to respond to anything that may have slipped through. For example, we have the ability to remove an app from the Flathub remote in case we find that it’s malicious. We can also revert, recall, or block broken or malicious app updates.

We take security reports and legal issues very seriously; please [contact the Flathub admins](mailto:admins@flathub.org) to report an issue, or [chat with us on Matrix](https://matrix.to/#/#flathub:matrix.org).

---

## In Summary…

As you can see, Flathub takes safety very seriously. We’ve worked with the greater Linux and FreeDesktop ecosystem for _over a decade_ on efforts such as Flatpak, OSTree, Portals, and even desktop environments and app store clients to help build the best app distribution experience—for both users and app developers—with safety as a core requirement. We believe our in-depth, multi-layered approach to safety has set a high bar that few others have met—and we will continue to raise it.

Thank you to all contributors to Flatpak, Flathub, and the technologies
our ecosystem relies on. Thanks to the thousands of developers for
trusting us with app distribution, and to bbhtt, Jordan, and Sonny for
reviewing this post. And as always, thank you to the millions of users
trusting Flathub as your source of apps on Linux. ♥
