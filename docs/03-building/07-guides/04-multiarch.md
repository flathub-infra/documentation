# Multiarch support

Flatpak has multiarch/multilib support, but it's not enabled by default
and require some additional steps to enable it. This section covers
enabling multiarch/multilib in your application bundle.

## Running 32-bit programs

In order to set up the run time environment for 32-bit executables,
first you\'ll need to allow it in `finish-args`:

```yaml
finish-args:
  - --allow=multiarch
```

This is enough for static binaries, but most real-world GNU/Linux
programs are linked dynamically. Those need some shared libraries to
work.

Freedesktop.org and GNOME SDKs both provide a special flatpak extension
with a set of libraries for corresponding architecture. This extension
can be attached to an app of different architecture. In order to enable
the extension for your app, define an extension point for it in the app
manifest:

```yaml
add-extensions:
  org.freedesktop.Platform.Compat.i386:
    directory: lib/i386-linux-gnu
    version: "21.08"

  # This is not strictly required, but needed for debugging 32-bit programs
  org.freedesktop.Platform.Compat.i386.Debug:
    directory: lib/debug/lib/i386-linux-gnu
    version: "21.08"
    no-autodownload: true
```

For GNOME runtime, use `org.gnome.Platform.Compat.i386` instead.

Note that this extension `version` must match the `runtime-version` of
the application.

If the 32-bit programs make use of GPU acceleration, or have some
graphical UI in general, you\'ll also need 32-bit GL drivers. Add an
extension point for it:

```yaml
add-extensions:
  org.freedesktop.Platform.GL32:
    directory: lib/i386-linux-gnu/GL
    version: "1.4"
    versions: 21.08;1.4
    subdirectories: true
    no-autodownload: true
    autodelete: false
    add-ld-path: lib
    merge-dirs: vulkan/icd.d;glvnd/egl_vendor.d;OpenCL/vendors;lib/dri;lib/d3d;vulkan/explicit_layer.d;vulkan/implicit_layer.d
    download-if: active-gl-driver
    enable-if: active-gl-driver
```

Note that the `versions` property here must contain both `1.4` and the
same value as in `runtime-version`.

Make sure to create directories where the extensions will be mounted
(the mount points are specified in `directory` properties and are
relative to the app bundle mount point, i.e. to `/app/`). This can be
done at stage of the build.

Finally, you need to make the dynamic library loader know the paths to
32-bit libraries. In order to do this, you can install a
`/app/etc/ld.so.conf` file with contents like this:

```text
/app/lib32
/app/lib/i386-linux-gnu
```

Here `/app/lib32` is the directory where you install additional 32-bit
libraries, if any.

You can combine the above two steps in a special module, e.g.

```yaml
modules:
  - name: bundle-setup
    buildsystem: simple
    build-commands:
      - mkdir -p /app/lib/i386-linux-gnu
      - mkdir -p /app/lib/debug/lib/i386-linux-gnu
      - mkdir -p /app/lib/i386-linux-gnu/GL
      - install -Dm644 ld.so.conf /app/etc/ld.so.conf
    sources:
      - type: file
        dest-filename: ld.so.conf
        url: data:/app/lib32%0A/app/lib/i386-linux-gnu%0A
```

## Building 32-bit modules

The section above describes how to run 32-bit programs that are already
built. This section will describe the process of building 32-bit
components yourself to ship them with the application. It assumes that
you are already familiar with building (single-arch) flatpaks. If not,
please refer to [flatpak-builder](flatpak-builder) guide
first.

First of all, you\'ll need to enable some SDK extensions at build time:

```yaml
sdk-extensions:
  - org.freedesktop.Sdk.Compat.i386
  - org.freedesktop.Sdk.Extension.toolchain-i386
```

The first one is the 32-bit portion of the SDK, containing 32-bit
libraries and development files.

The second one is a cross-compiler. Usually `gcc -m32` is used for
multilib builds, but the flatpak SDK comes with gcc without multilib
support. Thus, you will need a cross-compiler for building x86 on x86_64
just as you would need it for any foreign architecture like aarch64.

In order to build a 32-bit module, some global build options needs to be
overridden. Examples here assume that 32-bit libraries are installed in
`/app/lib32` directory:

```yaml
modules:
  - name: some-lib-32bit
    build-options:
      &compat-i386-build-options # Make sure 32-bit dependencies are first on pkg-config search path
      prepend-pkg-config-path: /app/lib32/pkgconfig:/usr/lib/i386-linux-gnu/pkgconfig
      # Add /app/lib32 to linker search path for modules without pkg-config
      ldflags: -L/app/lib32
      # Add the cross-compiler to PATH
      prepend-path: /usr/lib/sdk/toolchain-i386/bin
      # Tell the build systems to use the cross-compiler for compilation
      env:
        CC: i686-unknown-linux-gnu-gcc
        CXX: i686-unknown-linux-gnu-g++
      # Tell the build systems to install libraries to /app/lib32
      libdir: /app/lib32
```

These `build-options` need to be set for each 32-bit module. If your app
manifest is in YAML format, the YAML anchors can come in handy and save
you from copy-pasting the same snippet. You can define the 32-bit
`build-options` object somewhere in the manifest, add an anchor to it,
and then point each 32-bit modules\' `build-options` to that anchor:

```yaml
x-compat-i386-build-options: &compat-i386-build-options
  prepend-pkg-config-path: /app/lib32/pkgconfig:/usr/lib/i386-linux-gnu/pkgconfig
  ldflags: -L/app/lib32
  prepend-path: /usr/lib/sdk/toolchain-i386/bin
  env:
    CC: i686-unknown-linux-gnu-gcc
    CXX: i686-unknown-linux-gnu-g++
  libdir: /app/lib32

modules:
  - name: some-lib-32bit
    build-options: *compat-i386-build-options

  - name: some-other-lib-32bit
    build-options: *compat-i386-build-options
```

Of course, in order to actually use 32-bit modules you\'ve build,
you\'ll also need all the same setup from the previous section.
