# Using Flatpak

This page provides an introduction to the `flatpak` command line
interface, and explains essential technical conventions as well as the
most common commands.

End users shouldn't generally need to use this page or the Flatpak
command line interface, since Flatpak can be easily used through
graphical software management tools, though they are of course free to
use the command line if they prefer!

## The flatpak command

`flatpak` is the primary Flatpak command, to which specific commands are
appended. For example, the command to install something is
`flatpak install` and the command to uninstall is `flatpak uninstall`.

## Identifiers

Flatpak identifies each application and runtime using a unique
three-part identifier, such as `com.company.App`. The final segment of
this address is the object's name, and the preceding part identifies
the developer, so that the same developer can have multiple
applications, like `com.company.App1` and `com.company.App2`.

### Identifier triples

Typically it is sufficient to refer to objects using their ID. However,
in some situations it is necessary to refer to a specific version of an
object, or to a specific architecture. For example, some applications
might be available as a stable and a testing version, in which case it
is necessary to specify which one you want to install.

Flatpak allows architectures and versions to be specified using an
object's identifier triple. This takes the form of
`name/architecture/branch`, such as `com.company.App/i386/stable`.
(Branch is the term used to refer to versions of the same object.) The
first part of the triple is the ID, the second part is the architecture,
and the third part is the branch.

Identifier triples can also be used to specify just the architecture or
the branch, by leaving part of the triple blank. For example,
`com.company.App//stable` would just specify the branch, and
`com.company.App/i386//` just specifies the architecture.

The Flatpak CLI provides feedback if the architecture or branch of an
object needs to be specified.

## System versus user

Flatpak commands can be run either system-wide or per-user. Applications
and runtimes that are installed system-wide are available to all users
on the system. Applications and runtimes that are installed per-user are
only available to the users that installed them.

The same principle applies to repositories - repositories that have been
added system-wide are available to all users, whereas per-user
repositories can only be used by a particular user.

Flatpak commands are run system-wide by default. If you are installing
applications for day-to-day usage, it is recommended to stick with this
default behavior.

However, running commands per-user can be useful for testing and
development purposes, since objects that are installed in this way
won't be available to other users on the system. To do this, use the
`--user` option, which can be used in combination with most `flatpak`
commands.

Commands behave in exactly the same way if they are run per-user rather
than system-wide.

## Basic commands

This section covers basic commands needed to install, run and manage
Flatpak applications. For the full list of Flatpak commands, run
`flatpak --help` or see the
[flatpak-command-reference](flatpak-command-reference).

### List remotes

To list the remotes that you have configured on your system, run:

    $ flatpak remotes

This gives a list of the existing remotes that have been added. The list
indicates whether each remote has been added per-user or system-wide.

### Add a remote

The most convenient way to add a remote is by using a `.flatpakrepo`
file, which includes both the details of the remote and its GPG key:

    $ flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

Here, `flathub` is the local name that is given to the remote. The URL
points to the remote's `.flatpakrepo` file. `--if-not-exists` stops the
command from producing an error if the remote already exists.

### Remove a remote

To remove a remote, run:

    $ flatpak remote-delete flathub

In this case, `flathub` is the remote's local name.

### Search

Applications can be found in any of your remotes using the `search`
command. For example:

    $ flatpak search gimp

Search will return any applications matching the search terms. Each
search result includes the application ID and the remote that the
application is in. In this example, the search term is `gimp`.

### Install applications

To install an application, run:

    $ flatpak install flathub org.gimp.GIMP

Here, `flathub` is the name of the remote the application is to be
installed from, and `org.gimp.GIMP` is the ID of the application.

Sometimes, an application will require a particular runtime, and this
will be installed prior to the application.

The details of the application to be installed can also be provided by a
`.flatpakref` file, which can be either remote or local. To specify a
`.flatpakref` instead of manually providing the remote and application
ID, run:

    $ flatpak install https://flathub.org/repo/appstream/org.gimp.GIMP.flatpakref

If the `.flatpakref` file specifies that the application is to be
installed from a remote that hasn't already been added, you will be
asked whether to add it before the application is installed.

Since Flatpak 1.2, the `install` command can search for applications. A
simple:

    $ flatpak install gimp

will confirm the remote and application and proceed to install.

### Running applications

Once an application has been installed, it can be launched using the
`run` command and its application ID:

    $ flatpak run org.gimp.GIMP

### Updating

To update all your installed applications and runtimes to the latest
version, run:

    $ flatpak update

### List installed applications

To list the applications and runtimes you have installed, run:

    $ flatpak list

Alternatively, to just list installed applications, run:

    $ flatpak list --app

### Remove an application

To remove an application, run:

    $ flatpak uninstall org.gimp.GIMP

### Troubleshooting

Flatpak has a few commands that can help you to get things working again
when something goes wrong.

To remove runtimes and extensions that are not used by installed
applications, use:

    $ flatpak uninstall --unused

To fix inconsistencies with your local installation, use:

    $ flatpak repair

Flatpak also has a number of commands to manage the portal permissions
of installed apps. To reset all portal permissions for an app, use
`flatpak permission-reset`:

    $ flatpak permission-reset org.gimp.GIMP

To find out what changes have been made to your Flatpak installation
over time, you can take a look at the logs (since 1.2):

    $ flatpak history
