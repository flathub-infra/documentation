---
slug: enhanced-license-compliance-tools
title: Enhanced License Compliance Tools for Flathub
authors:
  - cassidyjames
  - ramcq
tags:
  - legal
---

***tl;dr:*** Flathub has improved tooling to make license compliance easier for developers. Distros should rebuild OS images with updated runtimes from Flathub; app developers should ensure they're using up-to-date runtimes and verify that licenses and copyright notices are properly included.

<!-- truncate -->

In early August, a concerned community member brought to our attention that copyright notices and license files were being omitted when software was bundled as Flatpaks and distributed via Flathub. This was a genuine oversight across multiple projects, and we're glad we've been able to take the opportunity to correct and improve this for runtimes and apps across the Flatpak ecosystem.

Over the past few months, we've been working to enhance our tooling and infrastructure to better support license compliance. With the support of the Flatpak, freedesktop-sdk, GNOME and KDE teams, we've developed and deployed significant improvements that make it easier than ever for developers to ensure their applications properly include license and copyright notices.

## What's New

In coordination with maintainers of the [freedesktop-sdk](https://gitlab.com/freedesktop-sdk/freedesktop-sdk/-/merge_requests/27806), [GNOME](https://gitlab.gnome.org/GNOME/gnome-build-meta/-/merge_requests/4056), and [KDE](https://invent.kde.org/packaging/flatpak-kde-runtime/-/merge_requests/264) runtimes, we've implemented enhanced license handling that automatically includes license and copyright notice files in the runtimes themselves, deduplicated to be as space-efficient as possible. This improvement has been applied to all supported freedesktop-sdk, GNOME, and KDE runtimes, plus backported to freedesktop-sdk 22.08 and newer, GNOME 45 and newer, KDE 5.15-22.08 and newer, and KDE 6.6 and newer. These updated runtimes cover over 90% of apps on Flathub and have already rolled out to users as regular Flatpak updates.

We've also worked with the Flatpak developers to add new functionality to [flatpak-builder](https://github.com/flatpak/flatpak-builder/pull/655) 1.4.5 that automatically recognizes and includes common license files. This enhancement, now deployed to the Flathub build service, helps ensure apps' own licenses as well as the licenses of any bundled libraries are retained and shipped to users along with the app itself.

These improvements represent an important milestone in the maturity of the Flatpak ecosystem, making license compliance easier and more automatic for the entire community.

## Recommended Actions

### App Developers

We encourage you to rebuild your apps with flatpak-builder 1.4.5 or newer to take advantage of the new automatic license detection. You can verify that license and copyright notices are properly included in your Flatpak's `/app/share/licenses` - both for your app and any included dependencies. In most cases, simply rebuilding your app will automatically include the necessary licenses, but you can also fine-tune which license files are included using the license-files key in your app's Flatpak manifest if needed.

For apps with binary sources (e.g. debs or rpms), we encourage app maintainers to explicitly include relevant license files in the Flatpak itself for consistency and auditability.

**End-of-life runtime transition:** To focus our resources on maintaining high-quality, up-to-date runtimes, we'll be completing the removal of several end-of-life runtimes in January 2026. Apps using runtimes older than freedesktop-sdk 22.08, GNOME 45, KDE 5.15-22.08 or KDE 6.6 will be marked as EOL shortly. Once these older runtimes are removed, the apps will need to be updated to use a supported runtime to remain available on Flathub. While this won't affect existing app installations, after this date, new users will be unable to install these apps from Flathub until they're rebuilt against a current runtime. Flatpak manifests of any affected apps will remain on the Flathub GitHub organization to enable developers to update them at any time.

If your app currently targets an end-of-life runtime that did receive the backported license improvements, we still strongly encourage you to upgrade to a newer, supported runtime to benefit from ongoing security updates and platform improvements.

### Distributors

If you redistribute binaries from Flathub, such as pre-installed runtimes or apps, you should rebuild your distributed images (ISOs, containers, etc.) with the updated runtimes and apps from Flathub.  You can verify that appropriate licenses are included with the Flatpaks in the runtime filesystem at `/usr/share/licenses` inside each runtime.

## Get in Touch

App developers, distributors, and community members are encouraged to connect with the team and other members of the community in our Discourse forum and Matrix chat room. If you are an app developer or distributor and have any questions or concerns, you may also reach out to us at admins@flathub.org.

## Thank You!

We are grateful to Jef Spaleta from Fedora for his care and confidentiality in bringing this to our attention and working with us collaboratively throughout the process. Special thanks to Boudhayan Bhattcharya (bbhtt) for his tireless work across Flathub, Flatpak and freedesktop-sdk, on this as well as many other important areas. And thank you to Abderrahim Kitouni (akitouni), Adrian Vovk (AdrianVovk), Aleix Pol Gonzalez (apol), Bart Piotrowski (barthalion), Ben Cooksley (bcooksley), Javier Jardón (jjardon), Jordan Petridis (alatiera), Matthias Clasen (matthiasc), Rob McQueen (ramcq), Sebastian Wick (swick), Timothée Ravier (travier), and any others behind the scenes for their hard work and timely collaboration across multiple projects to deliver these improvements.

Our Linux app ecosystem is truly strongest when individuals from across companies and projects come together to collaborate and work towards shared goals. We look forward to continuing to work together to ensure app developers can easily ship their apps to users across all Linux distributions and desktop environments. ♥
