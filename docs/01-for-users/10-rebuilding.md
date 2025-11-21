# Rebuilding a Flatpak from published sources

:::tip
[flathub-repro-checker](https://github.com/flathub-infra/flathub-repro-checker)
checker can be used to check reproducibility of apps published on
Flathub. 
:::

Most of the time, if you want to rebuild a Flaptak from Flathub, you can
go to the [Flathub organization on GitHub](https://github.com/flathub),
find the repository for the application that you want to rebuild, clone
it and then follow the [Building your first Flatpak](https://docs.flatpak.org/en/latest/first-build.html)
steps from the Flatpak documentation. But let's say that you want to
rebuild a specific version of the Flatpak exactly as it was published
on Flathub, for example, to verify that the build is reproducible.

In this guide, we will describe the process of doing that. This is
equivalent to downloading an `SRPM` and rebuilding the RPM from it, but
for Flatpaks.

Let's pick a small Flatpak as an example:
[`org.kde.minuet`](https://github.com/flathub/org.kde.minuet)

Let's first install the latest version from Flathub:

```bash
flatpak --user install flathub org.kde.minuet
```

We can now find the git commit that was used to build this Flatpak by
looking at the `Subject` field in the output of the `flatpak info`
command:

```bash
flatpak info --user org.kde.minuet//stable
```

```
Minuet - Music Education Software

          ID: org.kde.minuet
         Ref: app/org.kde.minuet/x86_64/stable
        Arch: x86_64
      Branch: stable
     Version: 0.4.0.25042
     License: GPL-2.0+
      Origin: flathub
  Collection: org.flathub.Stable
Installation: user
   Installed: 33,8 MB
     Runtime: org.kde.Platform/x86_64/6.9
         Sdk: org.kde.Sdk/x86_64/6.9

      Commit: 1263d36e453073b96beaa15112c4dc8587679a2137da7441aabed305c4a6bc84
      Parent: 412c1376ef4d002ade6e6c7fb45494a0e7a3f09e2c03d07ebc604bb3f5a17511
     Subject: Merge pull request #102 from PunkPangolin/patch-1 (b403e3f69e11)
        Date: 2025-07-01 13:59:17 +0000
```

Here it is the commit [b403e3f69e11](https://github.com/flathub/org.kde.minuet/commit/b403e3f69e11).

But that does not tell us the exact version and commits of the
runtime and the SDK that were used to build it. Moreover, the sources
used to build it may also no longer be accessible from the remote
servers.

So, to fully reproduce the build without relying on external parties, we
need to get the processed manifest from the Flatpak and fetch the
sources from Flathub.

The processed manifest is stored in the Flatpak itself:

```bash
flatpak run --user --command=/bin/cat org.kde.minuet /app/manifest.json
```

```json
{
  "id" : "org.kde.minuet",
  "runtime" : "org.kde.Platform",
  "runtime-version" : "6.9",
  "runtime-commit" : "f930fae18cfc829f51db18b9324905a3bebee0ec7e9d4d62afbb17f696fb20d0",
  "sdk" : "org.kde.Sdk",
  "sdk-commit" : "3170c974605b5af73a78bef2ae022df9b8dd7496569928a3766f0706c6c6515d",
  "command" : "minuet",
  "modules" : [
    {
      "name" : "fluidsynth",
      "buildsystem" : "cmake-ninja",
      "sources" : [
        {
          "url" : "https://github.com/FluidSynth/fluidsynth/archive/refs/tags/v2.4.6.tar.gz",
          "sha256" : "a6be90fd4842b9e7246500597180af5cf213c11bfa3998a3236dd8ff47961ea8",
          "x-checker-data" : {
            "type" : "anitya",
            "project-id" : 10437,
            "stable-only" : true,
            "url-template" : "https://github.com/FluidSynth/fluidsynth/archive/refs/tags/v$version.tar.gz"
          },
          "type" : "archive"
        }
      ]
    },
    {
      "name" : "minuet",
      "buildsystem" : "cmake-ninja",
      "config-opts" : [
        "-DBUILD_WITH_QT6=ON"
      ],
      "sources" : [
        {
          "url" : "https://download.kde.org/stable/release-service/25.04.2/src/minuet-25.04.2.tar.xz",
          "sha256" : "6d01871df0f666fbfc9c84bad6c7146955690e6a37b46738e98058f8a5bfb514",
          "x-checker-data" : {
            "type" : "anitya",
            "project-id" : 8763,
            "stable-only" : true,
            "url-template" : "https://download.kde.org/stable/release-service/$version/src/minuet-$version.tar.xz"
          },
          "type" : "archive"
        },
        {
          "path" : "mr-37.patch",
          "type" : "patch"
        }
      ]
    }
  ],
  "cleanup" : [
    "/lib64/pkgconfig",
    "/include",
    "/share/man"
  ],
  "finish-args" : [
    "--device=dri",
    "--share=ipc",
    "--socket=fallback-x11",
    "--socket=pulseaudio",
    "--socket=wayland"
  ],
  "rename-icon" : "minuet",
  "source-date-epoch" : 1321009871
}
```

Notice that this manifest includes the exact commit of the runtime and
SDk it was built against.

Let's store this manifest in a new folder:

```bash
mkdir org.kde.minuet
cd org.kde.minuet
flatpak run --user --command=/bin/cat --filesystem=$(pwd) org.kde.minuet /app/manifest.json >manifest.json
```

Now we install the sources extension of the app from Flathub to obtain
the sources referenced in this manifest:

```bash
flatpak install --user flathub org.kde.minuet.Sources//stable
```

```
flatpak info --user org.kde.minuet.Sources

          ID: org.kde.minuet.Sources
         Ref: runtime/org.kde.minuet.Sources/x86_64/stable
        Arch: x86_64
      Branch: stable
      Origin: flathub
  Collection: org.flathub.Stable
Installation: user
   Installed: 29,5 MB

      Commit: fdafb56a6e907f87a359c8a048471fc1747291bdcbe0e952ad2d0cf3d66fc0dc
      Parent: b8d569cd9611b64193264db7bd811e9dd322143fe4f2e438355a8be8dbab291c
     Subject: Merge pull request #102 from PunkPangolin/patch-1 (b403e3f69e11)
        Date: 2025-07-01 13:59:16 +0000
```

The sources extension can now be found in the Flatpak runtime folder:

```console
$ tree ~/.local/share/flatpak/runtime/org.kde.minuet.Sources/x86_64/stable/fdafb56a6e907f87a359c8a048471fc1747291bdcbe0e952ad2d0cf3d66fc0dc/files
.
├── downloads
│   ├── 6d01871df0f666fbfc9c84bad6c7146955690e6a37b46738e98058f8a5bfb514
│   │   └── minuet-25.04.2.tar.xz
│   └── a6be90fd4842b9e7246500597180af5cf213c11bfa3998a3236dd8ff47961ea8
│       └── v2.4.6.tar.gz
└── manifest
    ├── mr-37.patch
    └── org.kde.minuet.json
```

We first create a `.flatpak-builder` folder which should lie alongside
the manifest in the same directory. Then we copy the sources
(`archive`, `git` etc.) and place them inside the `.flatpak-builder`
folder:

```bash
mkdir -p .flatpak-builder
cp -a ~/.local/share/flatpak/runtime/org.kde.minuet.Sources/x86_64/stable/fdafb56a6e907f87a359c8a048471fc1747291bdcbe0e952ad2d0cf3d66fc0dc/files/downloads .flatpak-builder
```

The patch file needs to be placed alongside the manifest:

```bash
cp ~/.local/share/flatpak/runtime/org.kde.minuet.Sources/x86_64/stable/fdafb56a6e907f87a359c8a048471fc1747291bdcbe0e952ad2d0cf3d66fc0dc/files/manifest/*.patch .
```

Before we start building the Flatpak with those, we have to make sure
that we are using the right commit for the runtime and SDK.

We first install the runtime and the SDK:

```bash
flatpak --user install flathub org.kde.{Platform,Sdk}//6.9
```

Then we update them to the commit obtained from the manifest above:

```bash
flatpak --user update \
      --commit=f930fae18cfc829f51db18b9324905a3bebee0ec7e9d4d62afbb17f696fb20d0 \
      org.kde.Platform//6.9
flatpak --user update \
      --commit=3170c974605b5af73a78bef2ae022df9b8dd7496569928a3766f0706c6c6515d \
      org.kde.Sdk//6.9
```

Now we can rebuild the Flatpak using:

```bash
flatpak run org.flatpak.Builder --user --disable-download --repo=repo --force-clean --disable-rofiles-fuse builddir manifest.json
```

This process can be reproduced for any Flatpak on Flathub and any
version of the Flatpak as long as the sources extension is available
and older versions haven't been pruned.

### Notes

- Flathub may periodically prune older versions to keep the Flatpak
  repository size in check. The last three commits of an app should
  be available.

- If the manifest has `git` sources, flatpak-builder may try to fetch
  them from the git remote. If the remote repository is no longer
  available, the manifest can be edited to replace the `url` of `git`
  sources with `file://` or `dir` counterparts pointing to the git repo
  obtained from the sources extension.

- Flatpak Builder does not pin extensions to an exact commit in the
  generated manifest. This can be worked around by inspecting the
  extension repository's git history and copying the corresponding
  build recipe from that point into the application manifest.

- Flathub uploads the sources extension only from `x86_64` build
  pipelines. If a manifest has architecture specific binary sources,
  the sources of only one architecture will be available. This is not an
  issue for applications that are entirely built from source tarballs or
  git repos.
