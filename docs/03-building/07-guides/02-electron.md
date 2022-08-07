# Electron

Due to the nature of Electron, building Electron applications as
Flatpaks requires a few extra steps compared with other applications.
Thankfully, several tools and resources are available which make this
much easier.

This guide provides information on how building Electron applications
differs from other applications. It also includes information on the
tooling for building Electron applications and how to use it.

The guide walks through the [manifest
file](https://github.com/flathub/electron-sample-app/blob/master/flatpak/org.flathub.electron-sample-app.yml)
of the [sample Electron Flatpak
application](https://github.com/flathub/electron-sample-app). Before you
start, it is a good idea to take a look at this, either online or by
downloading the application.

## Building the sample application

While it isn't strictly necessary, you might want to try building and
running the sample application yourself.

To get setup for the build, download or clone the sample app from
GitHub, and navigate to the `/flatpak` directory in the terminal. You
must also install the Electron base app and the Node.js SDK extension:

    $ flatpak install flathub org.electronjs.Electron2.BaseApp//21.08
    $ flatpak install flathub org.freedesktop.Sdk.Extension.node14//21.08

Then you can run the build:

    $ flatpak-builder build org.flathub.electron-sample-app.yml --install --force-clean --user

Finally, the application can be run with:

    $ flatpak run org.flathub.electron-sample-app

## Basic configuration

The first part of the sample application's manifest specifies the
application's ID. It also configures the runtime and SDK:

```yaml
app-id: org.flathub.electron-sample-app
runtime: org.freedesktop.Platform
runtime-version: "21.08"
sdk: org.freedesktop.Sdk
```

The Freedesktop runtime is generally the best runtime to use with
Electron applications, since it is the most minimal runtime, and other
dependencies will be specific to Electron itself.

## The Electron base app

Next, the manifest specifies that the Electron base app should be used,
by specifying the `base` and `base-version` properties in the
application manifest:

```yaml
base: org.electronjs.Electron2.BaseApp
base-version: "21.08"
```

Base apps are described in [dependencies](dependencies).
Using the Electron base app is much faster and more convenient than
manually building Electron dependencies. It also has the advantage of
reducing the amount of duplication on users\' machines, since it means
that Electron is only saved once on disk.

## The Node.js SDK extension

In order to build Electron-based apps, you need Node.js available at
build time. Flathub provides Node.js LTS versions as extensions for the
SDK, so you can install one of them and add it in your apps\' manifest:

```yaml
sdk-extensions:
  - org.freedesktop.Sdk.Extension.node14
```

Enable the extension by adding it to `PATH`:

```yaml
build-options:
  append-path: /usr/lib/sdk/node14/bin
```

Note that the extension name (last portion of reverse-dns notation,
`node14` in this example) must be the same in `sdk-extensions` and
`append-path`.

## Command

The `command` property indicates that a script called `run.sh` is to be
executed to run the application. This will be explained in further
detail later.

```yaml
command: run.sh
```

## Sandbox permissions

The standard guidelines on sandbox permissions apply to Electron
applications. However, Electron does not currently support Wayland, so
for display access, only X11 should be used. The sample app also
configures pulseaudio for sound and enables network access:

```yaml
finish-args:
  - --share=ipc
  - --socket=x11
  - --socket=pulseaudio
  - --share=network
```

## Build options

These build options aren't strictly necessary, but can be useful if
something goes wrong. `env` allows setting an array of environment
variables, in this case we set `NPM_CONFIG_LOGLEVEL` to `info` so that
`npm` gives us more detailed error messages.

```yaml
build-options:
  cflags: -O2 -g
  cxxflags: -O2 -g
  env:
    NPM_CONFIG_LOGLEVEL: info
```

## The application module

The final section of the manifest defines how the application module
should be built. This is where some of the additional logic for Electron
and Node.js can be found.

By default, `flatpak-builder` doesn't allow build tools to access the
network. This means that tools which rely on downloading sources will
not work. Therefore, Node.js packages must be downloaded prior to
running the build. Setting the `electron_config_cache` environment
variable means that these will be found when it comes to the build.

The next part of the manifest describes how the application should be
built. The simple buildsystem option is used, which allows a sequence of
commands to be specified, which are used for the build. The download
location and hash of the application are also specified.

```yaml
name: electron-sample-app
buildsystem: simple
build-options:
  env:
    XDG_CACHE_HOME: /run/build/electron-sample-app/flatpak-node/cache
    npm_config_cache: /run/build/electron-sample-app/flatpak-node/npm-cache
    npm_config_nodedir: /usr/lib/sdk/node14
    npm_config_offline: "true"
subdir: main
sources:
  - type: archive
    url: https://github.com/flathub/electron-sample-app/archive/1.0.1.tar.gz
    sha256: a2feb3f1cf002a2e4e8900f718cc5c54db4ad174e48bfcfbddcd588c7b716d5b
    dest: main
```

## Bundling NPM packages

The next line is how NPM modules get bundled as part of Flatpaks:

```yaml
- generated-sources.json
```

Since even simple Node.js applications depend on dozens of packages, it
would be impractical to specify all of them as part of a manifest file.
A [Python
script](https://github.com/flatpak/flatpak-builder-tools/tree/master/node)
has therefore been developed to download Node.js packages with NPM or
Yarn and include them in an application's sources.

The Python script requires a `package-lock.json` (or `yarn.lock`) file.
This file contains information about the packages that an application
depends on, and can be generated by running
`npm install --package-lock-only` from an application's root directory.
The script is then run as follows:

    $ python3 flatpak-node-generator.py npm --xdg-layout package-lock.json

This generates the manifest JSON needed to build the NPM/Yarn packages
for the application, which are outputted to a file called
`generated-sources.json`. The content of this file can be copied to the
application's manifest but, because it is often very long, it is often
best to link to it from the main manifest, which is done by adding
`generated-source.json` as a line in the manifest section, as seen
above.

## Launching the app

The Electron app is run through a simple script. This can be given any
name but must be specified in the manifest's `"command":` property. See
below a sample wrapper for launching app:

```yaml
- type: script
  dest-filename: run.sh
  commands:
    - zypak-wrapper.sh /app/main/electron-sample-app "$@"
```

## Build commands

Last but not least, since the simple build option is being used, a list
of build commands must be provided. As can be seen, `npm` is run with
the `npm_config_offline=true` environment variable, installing
dependencies from packages that have already been cached. These are
copied to `/app/main/`. Finally the `run.sh` script is installed to
`/app/bin/` so that it will be on `$PATH`:

```yaml
build-commands:
  # Install npm dependencies
  - npm install --offline
  # Build the app; in this example the `dist` script
  # in package.json runs electron-builder
  - |
    . ../flatpak-node/electron-builder-arch-args.sh
    npm run dist -- $ELECTRON_BUILDER_ARCH_ARGS  --linux --dir
  # Bundle app and dependencies
  - cp -a dist/linux*unpacked /app/main
  # Install app wrapper
  - install -Dm755 -t /app/bin/ ../run.sh
```

Note that if the application you are trying to package contains a
`build` block in `package.json` with instructions for Linux, this can
cause `electron-builder` to try to fetch additional binaries at
build-time (Even if *\--dir* option is used). The following
example shows a configuration that will try to download AppImage
binaries:

```json
"build": {
  "linux": {
    "target": "AppImage",
  }
}
```

The preferred way of fixing this, is not a patch, but a build-time edit
using `jq`. The following command will replace `"target": "AppImage"`
with `"target": "dir"`:

```bash
jq '.build.linux.target="dir"' <<<$(<package.json) > package.json
```
