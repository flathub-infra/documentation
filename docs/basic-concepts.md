# Basic concepts

Flatpak can be understood through a small number of key concepts. It is
useful to be familiar with these before learning about how to use
Flatpak from the command line, or using it to build applications.

![image](./diagram.svg)

## Runtimes

Runtimes provide the basic dependencies that are used by applications.
Each application must be built against a runtime, and this runtime must
be installed on a host system in order for the application to run
(Flatpak can automatically install the runtime required by an
application). Multiple different runtimes can be installed at the same
time, including different versions of the same runtime.

Runtimes are distribution agnostic and do not depend on particular
distribution versions. This means that they provide a stable,
cross-distribution base for applications, and allow applications to
continue to work irrespective of operating system updates.

## Bundled libraries

If an application requires any dependencies that aren\'t in its runtime,
they can be bundled as part of the application. This gives application
developers flexibility regarding the dependencies that they use,
including using:

- libraries that aren\'t available in a runtime
- different versions of libraries from the ones that are in a runtime
- patched versions of libraries

## Sandboxes

With Flatpak, each application is built and run in an isolated
environment, which is called the \'sandbox\'. Each sandbox contains an
application and its runtime. By default, the application can only access
the contents of its sandbox. Access to user files, network, graphics
sockets, subsystems on the bus and devices have to be explicitly
granted. Access to other things, such as other processes, is
deliberately not possible.

By necessity, some resources that are inside the sandbox need to be
exposed outside, to be used by the host system. These are known as
\'exports\', since they are files that are exported out of the sandbox,
and include things like the application\'s `.desktop` file and icon.

## Portals

Portals are a mechanism through which applications can interact with the
host environment from within a sandbox. They give the ability to
interact with data, files and services without the need to add sandbox
permissions.

Examples of capabilities that can be accessed through portals include
opening files through a file chooser dialog, or printing. Interface
toolkits can implement transparent support for portals, so access to
resources outside of the sandbox will work securely and out of the box.

More information about portals can be found in
`sandbox-permissions`{.interpreted-text role="doc"}.

## Repositories

Flatpak applications and runtimes are typically stored and published
using repositories, which behave very similarly to Git repositories. A
Flatpak repository can contain a single object or multiple objects, and
each object is versioned, which allows upgrading and even downgrading.

Each system which is using Flatpak can be configured to access any
number of remote repositories. Once a system has been configured to
access a \'remote\', the remote repository\'s content can be inspected
and searched, and it can be used as the source of applications and
runtimes.

When an update is performed, new versions of installed applications and
runtimes are downloaded from the relevant remotes. Like with Git, only
the difference between versions is downloaded, which makes the process
very efficient.
