# Debugging

This section includes documentation on how to debug Flatpak apps.

## Running debugging tools

Because Flatpak runs each application inside a sandbox, debugging tools
can\'t be used in the usual way, and must instead be run from inside the
sandbox. To get a shell inside an application\'s sandbox, it can be run
with the `--command` option:

    $ flatpak run --command=sh --devel <application-id>

This creates a sandbox for the application with the given ID and,
instead of running the application, runs a shell inside the sandbox.
From the shell prompt, it is then possible to run the application. This
can also be done using any debugging tools that you want to use. For
example, to run the application with `gdb`:

    $ gdb /app/bin/<application-binary>

This works because the `--devel` option tells Flatpak to use the SDK as
the runtime, which includes debugging tools like `gdb`. The `--devel`
option also adjusts the sandbox setup to enable debugging.

::: note
::: title
Note
:::

The Freedesktop SDK (on which many others are based), includes a range
of debugging tools, such as `gdb`, `strace`, `nm`, `dbus-send`, `dconf`,
and many others.
:::

`gdb` is much more useful when it has access to debug information for
the application and the runtime it is using. Flatpak splits this
information off into debug extensions, which you should install before
debugging an application:

    $ flatpak install <runtime-id>.Debug

When the `--devel` option is used, Flatpak will automatically use any
matching debug extensions that it finds.

It is also possible to get a shell inside an application sandbox without
having to install it. This is done using `flatpak-builder`\'s `--run`
option:

    $ flatpak-builder --run <build-dir> <manifest> sh

This sets up a sandbox that is populated with the build results found in
the build directory, and runs a shell inside it.

## Creating a .Debug extension

Like many other packaging systems, Flatpak separates bulky debug
information from regular content and ships it separately, in what is
called a `.Debug` extension.

When an application is built, `flatpak-builder` automatically creates a
`.Debug` extension. This can be disabled with the `no-debuginfo` option.

## Overriding sandbox permissions

It is sometimes useful to have extra permissions in a sandbox when
debugging. This can be achieved using the various sandbox options that
are accepted by the run command. For example:

    $ flatpak run --devel --command=sh --system-talk-name=org.freedesktop.login1 <application-id>

This command runs a shell in the sandbox for the given application,
granting it system bus access to the bus name owned by logind.

## Inspecting portal permissions

Flatpak has a number of commands that allow to manage portal permissions
for applications.

To see all portal permissions of an application, use:

    $ flatpak permission-show <application-id>

To reset all portal permissions of an application, use:

    $ flatpak permission-reset <application-id>

## Interacting with running sandboxes

You can see all the apps that are currently running in Flatpak sandboxes
(since 1.2):

    $ flatpak ps

And, if you need to, you can terminate one by force (since 1.2):

    $ flatpak kill <application-id>
