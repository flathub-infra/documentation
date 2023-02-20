# Manifests

The input to `flatpak-builder` is a JSON or YAML file that describes the
parameters for building an application, as well as instructions for each
of the modules that are to be built. This file is called the manifest.

This page provides information and guidance on how to use manifests,
including an explanation of the most common parameters that can be
specified. It is recommended to have followed the
[first-build](../getting-started/first-build) tutorial before reading this
section, and to be familiar with [flatpak-builder](flatpak-builder).

Manifest files should be named using the application ID. For example,
the manifest file for GNOME Dictionary is named
`org.gnome.Dictionary.yml`. This page uses this manifest file for all
its examples.

A complete list of all the properties that can be specified in manifest
files can be found in the
[flatpak-builder-command-reference](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html), as
well as the `flatpak-manifest` man page.

## Basic properties

Each manifest file should specify basic information about the
application that is to be built, including the `app-id`, `runtime`,
`runtime-version`, `sdk` and `command` parameters. These properties are
typically specified at the beginning of the file.

For example, the GNOME Dictionary manifest includes:

```yaml
app-id: org.gnome.Dictionary
runtime: org.gnome.Platform
runtime-version: "43"
sdk: org.gnome.Sdk
command: gnome-dictionary
```

Specifying a runtime and runtime version allows that the runtime that is
needed by your application to be automatically installed on users\'
systems.

## File renaming

Exports are application files that are made available to the host, and
include things like the application's `.desktop` file and icon.

The names of files that are exported by a Flatpak must be prefixed using
the application ID, such as `org.gnome.Dictionary.desktop`. The best way
to do this is to rename these files directly in the application's
source.

If renaming exported files to use the application ID is not possible,
`flatpak-builder` allows them to be renamed as part of the build
process. This can be done by specifying one of the following properties
in the manifest:

- `rename-icon` - rename the application icon
- `rename-desktop-file` - rename the `.desktop` filename
- `rename-appdata-file` - rename the AppData file

Each of these properties accepts the name of the source file to be
renamed. `flatpak-builder` then automatically renames the file to match
the application ID. Note that this renaming method can introduce
internal naming conflicts, and that renaming files in tree is therefore
the most reliable approach.

## Finishing

Applications that are run with Flatpak have extremely limited access to
the host environment by default, but applications require access to
resources outside of their sandbox in order to be useful. Finishing is
the build stage where the application's sandbox permissions are
specified, in order to give access to these resources.

The finishing manifest section uses the `finish-args` property, which
can be seen in the Dictionary manifest file:

```yaml
finish-args:
  # X11 + XShm access
  - --share=ipc
  - --socket=x11
  # Wayland access
  - --socket=wayland
  # Needs to talk to the network:
  - --share=network
  # Needs to save files locally
  - --filesystem=xdg-documents
  - --metadata=X-DConf=migrate-path=/org/gnome/dictionary/
```

Guidance on which permissions to use can be found in the
[sandbox-permissions](sandbox-permissions), and a full list of
`finish-args` options can be found in
[sandbox-permissions-reference](../reference-docs/sandbox-permissions-reference).

If you\'re wondering about the last finish arg, see [this blog
post](https://blogs.gnome.org/mclasen/2019/07/12/settings-in-a-sandbox-world/).

## Cleanup

The cleanup property can be used to remove files produced by the build
process that are not wanted as part of the application, such as headers
or developer documentation. Two properties in the manifest file are used
for this.

First, a list of filename patterns can be included:

    cleanup:
      - '/include'
      - '/bin/foo-*'
      - '*.a'

The second cleanup property is a list of commands that are run during
the cleanup phase:

    cleanup-commands:
      - 'sed s/foo/bar/ /bin/app.sh'

Cleanup properties can be set on a per-module basis, in which case only
filenames that were created by that particular module will be matched.

## Modules

The module list specifies each of the modules that are to be built as
part of the build process. One of these modules is the application
itself, and other modules are dependencies and libraries that are
bundled as part of the Flatpak. While simple applications may only
specify one or two modules, and therefore have short modules sections,
some applications can bundle numerous modules and therefore have lengthy
modules sections.

GNOME Dictionary's modules section is short, since it just contains the
application itself, and looks like:

```yaml
modules:
  - name: gnome-dictionary
    buildsystem: meson
    config-opts:
      - -Dbuild_man=false
    sources:
      - type: archive
        url: https://download.gnome.org/sources/gnome-dictionary/43/gnome-dictionary-43.1.tar.xz
        sha256: 16b8bc248dcf68987826d5e39234b1bb7fd24a2607fcdbf4258fde88f012f300
      - type: patch
        path: appdata_oars.patch
```

As can be seen, each listed module has a `name` (which can be freely
assigned) and a list of `sources`. Each source has a `type`, and
available types include:

> - `archive` - `.tar` or `.zip` archive files
> - `git` - Git repositories
> - `bzr` - Bazaar repositories
> - `file` - local file (these are copied into the source directory)
> - `dir` - local directory (these are copied into the source
>   directory)
> - `script` - an array of shell commands (these are put in a
>   shellscript file)
> - `shell` - an array of shell commands that are run during source
>   extraction
> - `patch` - a patch (are applied to the source directory)
> - `extra-data` - data that can be downloaded at install time; this
>   can include archive or package files

Different properties are available for each source type, which are
listed in the [flatpak-builder-command-reference](https://docs.flatpak.org/en/latest/flatpak-builder-command-reference.html).

### Supported build systems

Modules can be built with a variety of build systems, including:

- [autotools](https://www.gnu.org/software/automake/manual/html_node/Autotools-Introduction.html)
- [cmake](https://cmake.org/)
- [cmake-ninja](https://cmake.org/cmake/help/v3.0/generator/Ninja.html)
- [meson](http://mesonbuild.com/)
- [qmake](https://doc.qt.io/qt-5/qmake-overview.html)
- the "[Build API](https://github.com/cgwalters/build-api/)"

A "simple" build method is also available, which allows a series of
commands to be specified.

### Shared Modules

[Shared Modules (or
shared-modules)](https://github.com/flathub/shared-modules) is a
repository containing various manifests to build common libraries. It is
intended to be used as a git submodule.

To add it to your repository, run this command:

```bash
git submodule add https://github.com/flathub/shared-modules.git
```

Then, add whichever module you want. In this example, we will use
\`gtk2\`:

```yaml
modules:
  - shared-modules/gtk2/gtk2.json
```

To update the submodule, run this command:

```bash
git submodule update --remote --merge
```

To remove the submodule, run these commands:

```bash
git submodule deinit -f -- shared-modules
rm -rf .git/modules/shared-modules
git rm -f shared-modules
rm .gitmodules
```

### Flatpak Builder Tools

[Flatpak Builder Tools (or
flatpak-builder-tools)](https://github.com/flatpak/flatpak-builder-tools)
is a collection of scripts to aid using _flatpak-builder]_.
In this repository, each directory contains instructions to generate a
manifest for the respective platform.

## Example manifests

A [complete manifest for GNOME Dictionary built from
Git](https://github.com/flathub/org.gnome.Dictionary/blob/master/org.gnome.Dictionary.yml).
It is also possible to browse [all the manifests hosted by
Flathub](https://github.com/flathub).
