# Building Introduction

[first-build](../getting-started/first-build) has already provided a quick
demonstration of how applications get built with Flatpak. This page
provides an additional general overview of what's involved.

## flatpak-builder

`flatpak-builder` is the primary tool for building Flatpak applications.
It allows you to take the source files for an application and build it
into a Flatpak application. It also allows multiple other dependencies
to be built at the same time, which get bundled into the build.

The input to `flatpak-builder` is a manifest file. This specifies the
parameters for the application that will be built, such as its name and
which runtime it will depend on. The manifest also lists all the modules
that are to be built as part of the build process. A source for each
module can be specified, including links to file archives or version
control repositories. One of the modules (usually the last one) is the
application code itself.

The basic format used to invoke `flatpak-builder` is:

    $ flatpak-builder <build-dir> <manifest>

Where `<build-dir>` is the path to the directory that the application
will be built into, and `<manifest>` is the path to a manifest file. The
contents of `<build-dir>` can be useful for testing and debugging
purposes, but is generally treated as an artifact of the build process.

When `flatpak-builder` is run:

- The build directory is created, if it doesn't already exist
- The source code for each module is downloaded and verified
- The source code for each module is built and installed
- The build is finished by setting sandbox permissions
- The build result is exported to a repository (which will be created
  if it doesn't exist already)

The application can then be installed from the repository and run.

## Software Development Kits (SDKs)

Instead of being built using the host environment, Flatpak applications
are built inside a separate environment, called an SDK.

SDKs are like the regular runtime that applications run in. The
difference is that SDKs also include all the development resources and
tools that are required to build an application, such as build and
packaging tools, header files, compilers and debuggers.

Each runtime has an accompanying SDK. For example, there is both a GNOME
43 runtime and a GNOME 43 SDK. Applications that use the runtime are
built with the matching SDK.

Like runtimes, SDKs will sometimes be automatically installed for you,
but if you do need to manually install them, they are installed in the
same way as applications and runtimes, such as:

    $ flatpak install flathub org.gnome.Sdk//43
