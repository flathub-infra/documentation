# Dependencies

Flatpak provides a number of different options for how applications can
depend on other software. When setting out to build an application with
Flatpak for the first time, it is therefore necessary to decide how
application dependencies will be organized.

This page outlines what the options are, and provides guidance on when
to use each one.

## Runtimes

As was described in [basic-concepts](basic-concepts),
runtimes provide basic dependencies that can be used by applications.
They also provide the environment that applications run in. Flatpak
requires each application to specify a runtime. Therefore, one of the
first decisions you need to make when building an application with
Flatpak, is which runtime it will use.

An overview of the runtimes that are available can be found in the
[available-runtimes](available-runtimes) page. There are
deliberately only a small number of runtimes to choose from. Typically,
runtimes are picked on the basis of which dependencies an application
requires. If a runtime exists that provides libraries that you plan on
using, this is usually the correct runtime to use!

:::tip

Runtimes require regular maintenance, and application developers should
generally not consider creating their own.
:::

Runtimes are automatically installed for users when they install an
application, and build tools can also automatically install them for you
(`flatpak-builder`'s `--install-deps-from` option is useful for this).
However, if you do need to manually install your chosen runtime, this
can be done in the same way as installing an application, with the
`flatpak install` command. For example, the command to install the GNOME
3.26 runtime is:

    $ flatpak install flathub org.gnome.Platform//3.26

## Bundling

One of the key advantages of Flatpak is that it allows application
authors to bundle whatever libraries or dependencies that they want.
This means that developers aren't constrained by which libraries are
available through Linux distributions.

When it comes to building an application for the first time, you will
need to decide which dependencies to bundle. This can include:

- libraries that aren't in your chosen runtime
- different versions of libraries that are in your chosen runtime
- patched versions of libraries
- data or other resources that form part of the application

As will be seen, bundled dependencies can be automatically downloaded as
part of the build process. It is also possible to apply patches and
perform other transformations.

While bundling is very powerful and flexible, it also places a greater
maintenance burden on the application developer. Therefore, while it is
possible to bundle as much as you would like, it is generally
recommended to try and keep the number of bundled modules as low as
possible. If a dependency is available as part of a runtime, it is
generally better to use that version rather than bundle it yourself.

The specifics of how to bundle libraries is covered in the
[manifests](manifests) section.

## Base apps

Runtimes and bundling are the two main ways in which dependencies are
handled with Flatpak. They allow applications to rely on stable
collections of dependencies on the one hand, and to have flexibility and
control on the other.

However, in some cases, dependencies come as part of a bigger framework
or toolkit, which doesn't fit into a runtime but which is also
cumbersome to manually bundle as a series of individual modules. This is
where _base apps_ come in.

Base apps contain collections of bundled dependencies which can then be
bundled as part of an application. They don't get rebuilt as part of
the build process, which makes building faster (particularly when
bundling large dependencies). And because each base app is only built
once, it is guaranteed to be identical wherever it is used, so it will
only be saved once on disk.

Base apps are a relatively specialized concept and only some
applications need to use them (the most common base app is used for
[Electron
applications](https://github.com/flathub/io.atom.electron.BaseApp)).
However, if your application uses a large, complex or specialized
framework, it is a good idea to check for available base apps before you
start building.
