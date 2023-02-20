# Under the Hood

This page provides an overview of how Flatpak works internally. While it
isn't necessary to be familiar with this in order to use Flatpak, some
people might find it interesting. Knowing about Flatpak's architecture
also helps to get a better understanding of how and why it works the way
it does, from a user and application developer perspective.

## "Git for apps"

Flatpak is built on top of a technology called
[OSTree](https://ostreedev.github.io/ostree/introduction/), which is
influenced by and very similar to the Git version control system. Like
Git, OSTree allows versioned data to be tracked and to be distributed
between different repositories. However, where Git is designed to track
source files, OSTree is designed to track binary files and other large
data.

Internally, Flatpak therefore works in a similar way to Git, and many
Flatpak concepts are analogous to Git concepts. Like Git, Flatpak uses
repositories to store data, and it tracks the differences between
versions.

With Flatpak, each application, runtime and extension is a branch in a
repository. An identifier triple, such as
`com.company.App/x86_64/stable` is a reference to that branch. The
output of a Flatpak build process is a directory of files which is
committed to one of these branches.

When an application is installed with Flatpak, it is pulled from the
remote into a new branch in a local repository. Links are then generated
which point from the right places in the filesystem to the
application's files in the repository (these are [hard
links](https://en.wikipedia.org/wiki/Hard_link), which are fast to
resolve and disk space efficient). In other words, every application
that is installed is stored in a local version control repository, and
is then mapped into the local filesystem.

Version tracking is therefore a core part of Flatpak's architecture,
and this makes updating software to the latest version very efficient.
Versioning also makes rollbacks possible, so it's easy to go back to a
previous version, should that be required.

Storing applications in a local OSTree repository has other advantages.
For example, it allows files that are stored on disk to be deduplicated,
so the same file that belongs to multiple applications (or runtimes) is
only stored once.

## Underlying technologies

Flatpak utilises a number of pre-existing technologies. These include:

- The [bubblewrap](https://github.com/containers/bubblewrap) utility
  from [Project Atomic](https://projectatomic.io/), which lets
  unprivileged users set up and run containers, using kernel features
  such as:
  - Namespaces
  - Bind mounts
  - Seccomp rules
- [systemd](https://www.freedesktop.org/wiki/Software/systemd/) to set
  up cgroups for sandboxes
- [D-Bus](https://www.freedesktop.org/wiki/Software/dbus/), a
  well-established way to provide high-level APIs to applications
- The [OSTree](https://ostree.readthedocs.io/en/latest/) system for
  versioning and distributing filesystem trees
- The OCI format from the [Open Container
  Initiative](https://opencontainers.org/), as an alternative to
  OSTree used by the [Fedora
  infrastructure](https://blog.fishsoup.net/2018/12/04/flatpaks-in-fedora-now-live/)
- Flatpak can use either OSTree or OCI for single-file bundles.
- [Appstream](https://www.freedesktop.org/software/appstream/docs/)
  metadata, to allow Flatpak applications to show up nicely in
  software center applications
