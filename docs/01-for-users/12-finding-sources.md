---
title: Finding sources of a published Flatpak
sidebar_position: 12
---

All applications and runtimes published on Flathub come with a manifest
listing the sources they used. In most of the cases, that manifest can
be used to rebuild the Flatpak directly. See [Rebuilding a Flatpak from published sources](/docs/for-users/rebuilding)
for how to do this.

Application manifests are located in `/app/manifest.json` while runtime
manifests can be found at `/usr/manifest.json`.

Below is an *incomplete* excerpt.

```bash
flatpak install flathub org.kde.Platform//6.9
flatpak run --command=cat org.kde.Platform//6.9 /usr/manifest.json
```

```json
{
  "id" : "org.kde.Sdk",
  "id-platform" : "org.kde.Platform",
  "branch" : "6.9",
  "runtime" : "org.freedesktop.Platform",
  "runtime-version" : "24.08",
  "runtime-commit" : "a993292d6ff150598dad4cd1f725aeee01a668b9e721b559ea1b6f6240174d58",
  "sdk" : "org.freedesktop.Sdk",
  "sdk-commit" : "880e38dedfd737008ddd0ebbbd0daaaed26b0d20011b0ce622d411a36446d607",
  "build-options" : {
    "env" : {
      "CMAKE_BUILD_TYPE" : "RelWithDebInfo"
    }
  },
  "modules" : [
    {
      "name" : "licence-extractor",
      "buildsystem" : "simple",
      "sources" : [
        {
          "commands" : [
            "DESTINATION=/usr/share/licenses/org.kde.Platform/$(basename `pwd`)/",
            "DESTINATION=${DESTINATION%-[0-9]*}",
            "mkdir -p $DESTINATION",
            "cp -v ${LICENSES:-LICENSES/*} $DESTINATION"
          ],
          "dest-filename" : "install-licenses.sh",
          "type" : "script"
        }
      ],
      "build-commands" : [
        "install -m755 install-licenses.sh /usr/bin"
      ]
    },
    {
      "name" : "qt6-qtbase",
      "buildsystem" : "cmake-ninja",
      "config-opts" : [
        "-DINSTALL_ARCHDATADIR=lib",
        "-DQT_DISABLE_RPATH=ON",
        "-DBUILD_WITH_PCH=FALSE",
        "-DQT_FEATURE_openssl_linked=ON",
        "-DQT_FEATURE_system_sqlite=ON"
      ],
      "sources" : [
        {
          "url" : "https://download.qt.io/official_releases/qt/6.9/6.9.3/submodules/qtbase-everywhere-src-6.9.3.tar.xz",
          "sha256" : "c5a1a2f660356ec081febfa782998ae5ddbc5925117e64f50e4be9cd45b8dc6e",
          "x-checker-data" : {
            "type" : "anitya",
            "project-id" : 7927,
            "stable-only" : true,
            "versions" : {
              "<" : "6.10.0"
            },
            "url-template" : "https://download.qt.io/official_releases/qt/6.9/$version/submodules/qtbase-everywhere-src-$version.tar.xz"
          },
          "type" : "archive"
        },
        {
          "paths" : [
            "patch/qtbase-find_package-paths.patch"
          ],
          "type" : "patch"
        },
        {
          "commands" : [
            "install-licenses.sh"
          ],
          "type" : "shell"
        }
      ]
    }
  ]
}
```

The the git commit from which the Flatpak originated is mentioned in
the OSTree commit subject. It can be found using the
`flatpak info` or `flatpak remote-info` commands.

The repository with the source code might be listed in the Flatpak
metadata, the `os-release` file or other well-known locations. For
applications, you will find the repositories in the
[Flathub organization](https://github.com/flathub/) on Github. Runtimes
are usually hosted in external repositories by their respective projects.
They may or may not be using different tooling in order to be built.
Please refer to each project for further details.

```bash
flatpak info flathub org.kde.Platform//6.9
```

```
KDE Application Platform - Shared libraries used by KDE applications

        ID: org.kde.Platform
       Ref: runtime/org.kde.Platform/x86_64/6.9
      Arch: x86_64
    Branch: 6.9
   License: GPL-2.0+
Collection: org.flathub.Stable
  Download: 393,0 MB
 Installed: 1,0 GB

    Commit: 76413ad56178752c98dbda74682640d85a2b10b0d37f6f3680b29adf00265a6b
    Parent: 12d7f68172eb7bf16d7853e37b17d035efbe82e8d42eb658a05483632bb7a27a
   Subject: build of org.kde.Sdk, Wed Oct 15 12:57:40 PM UTC 2025, 094cc415694670dd34c808a48e500a73d1b177bb
      Date: 2025-10-16 08:30:37 +0000
```

We an see that the subject mentions
`094cc415694670dd34c808a48e500a73d1b177bb` which we can find [here](https://invent.kde.org/packaging/flatpak-kde-runtime/-/commit/094cc415694670dd34c808a48e500a73d1b177bb).

The runtimes on Flathub originate from the following repositories:

  - `org.freedesktop.Platform` can be found in the [freedesktop-sdk](https://gitlab.com/freedesktop-sdk/freedesktop-sdk/)
    group on gitlab.com.
  - `org.gnome.Platform` can be found in [gnome/gnome-build-meta](https://gitlab.gnome.org/GNOME/gnome-build-meta/)
    repository on the GNOME gitlab.
  - `org.kde.Platform` can be found in [packaging/flatpak-kde-runtime](https://invent.kde.org/packaging/flatpak-kde-runtime)
    repository on the KDE gitlab.
