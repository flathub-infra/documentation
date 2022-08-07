# Tips and Tricks

This page explains a few useful features of the Flatpak CLI.

## Testing an app with a different runtime

You can (for testing) run an application with a different runtime than
it typically uses. For instance, to run stable gedit with the latest
unstable gnome runtime you can do:

    $ flatpak run --runtime-version=master org.gnome.gedit

You can also use a completely different runtime (but same version
number):

    $ flatpak run --runtime=org.gnome.Sdk org.gnome.gedit

If you just want to use the sdk instead of the platform like the above,
a better approach is to use `-d`.

::: warning
::: title
Warning
:::

Running against a runtime with a completely different ABI is undefined
and unsupported behavior.
:::

## Downgrading

It is possible to downgrade an installed application (or runtime) to an
older build.

First you look for the commit you are interested in:

    $ flatpak remote-info --log flathub org.gnome.Recipes

Then you deploy the commit:

    $ sudo flatpak update \
      --commit=ec07ad6c54e803d1428e5580426a41315e50a14376af033458e7a65bfb2b64f0 \
      org.gnome.Recipes

::: note
::: title
Note
:::

The example here uses `sudo` for system installations because, unlike
normal updates, downgrades are considered a privileged action. If the
application is installed per-user you would run it as that user.
:::

If you have Flatpak 1.5.0 or later, you can also prevent the app from
being included in updates (either manual or automatic):

    $ flatpak mask org.gnome.Recipes

## Bisecting regressions in application builds

In case the newest builds of an application introduce regressions, you
can use `flatpak-bisect` to discover which commit introduced the
regression. It works just like `git bisect`.

In case your distribution doesn\'t install the `flatpak-bisect` utility,
you can find it distributed alongside the Flatpak source code, in
<https://github.com/flatpak/flatpak/blob/master/scripts/flatpak-bisect>

First you update the application and get its history:

    $ flatpak-bisect org.gnome.gedit start

Then, you should set the current commit as the first bad commit:

    $ flatpak-bisect org.gnome.gedit bad

Now you need to find the hash of the first known good commit. For that,
you can see the build history by running:

    $ flatpak-bisect org.gnome.gedit log

To start bisecting, checkout the first known good commit you find:

    $ flatpak-bisect org.gnome.gedit checkout 5cd2b0648618c9038fbc6830733817309ade29541cdd8383830bbb76f6accf0d

After setting the bad commit and the first known good commit, you can
launch the application to verify if the current commit in the bisecting
session is a good or a bad one.

To mark a commit as good or bad, run:

    $ flatpak-bisect org.gnome.gedit good

Or:

    $ flatpak-bisect org.gnome.gedit bad

`flatpak-bisect` will inform you when the first bad commit is found.

## Adding a custom installation

By default Flatpak installs apps system-wide, and can also be made to
install per-user with the `--user` option accepted by most commands. A
third option is to set up a custom installation, which could be stored
on an external hard drive.

First ensure that the config directory exists:

    $ sudo mkdir -p /etc/flatpak/installations.d

Then open a file in that directory as root:

    $ sudoedit /etc/flatpak/installations.d/extra.conf

And write something like this:

    [Installation "extra"]
    Path=/run/media/mwleeds/ext4_4tb/flatpak/
    DisplayName=Extra Installation
    StorageType=harddisk

See
[flatpak-installation(5)](http://docs.flatpak.org/en/latest/flatpak-command-reference.html#flatpak-installation)
for the full format specification. Replace the path with the actual path
you want to use. You can use `df` to see mounted file systems and
`mkdir` to create a `flatpak` directory so the path specified by `Path=`
exists.

Then you can add a remote using a command like:

    $ flatpak --installation=extra remote-add flathub https://flathub.org/repo/flathub.flatpakrepo

And install to it with:

    $ flatpak --installation=extra install flathub org.inkscape.Inkscape

::: note
::: title
Note
:::

If your custom installation is the only one with the remote you\'re
installing from, `--installation` can be omitted.
:::

And run apps from it with:

    $ flatpak --installation=extra run org.inkscape.Inkscape

::: note
::: title
Note
:::

If your custom installation is the only one with the app you\'re
running, `--installation` can be omitted.
:::

## Configuring resource limits for apps

When systemd is available, Flatpak tries to put app processes in a scope
such as `app-com.brave.Browser-*.scope` (in the case of Brave), with `*`
replaced by an arbitrary suffix. This means you can create a file like
`~/.config/systemd/user/app-flatpak-com.brave.Browser-.scope.d/memory.conf`
with contents like:

    [Scope]
    MemoryHigh=1G

Then after a `systemctl --user daemon-reload`, those
`systemd.resource-control(5)` parameters will apply to all instances of
that app.
