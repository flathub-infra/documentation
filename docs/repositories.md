# Repositories

Flatpak repositories are the primary mechanism for publishing
applications, so that they can be installed by users.

Some aspects of repositories are addressed by other sections of the
documentation. Basic commands for adding, removing and inspecting
repositories can be found in the `using-flatpak`{.interpreted-text
role="doc"} section. Additionally, the section on
`flatpak-builder`{.interpreted-text role="doc"} covers the most common
method for adding applications to repositories.

To use a repository to publish an application, it is possible to either
host your own (covered in the next section,
`hosting-a-repository`{.interpreted-text role="doc"}) or use
[Flathub](http://flathub.org), the primary publishing and hosting
service for Flatpak applications.

Software center applications like GNOME Software or KDE Discover allow
browsing repositories, and can also dynamically promote new or popular
applications. If you use Flathub, the repository will typically have
already been added by users, so adding an application to the repository
is sufficient to make it available to them.

## .flatpakref files

`.flatpakref` files can be used in combination with repositories to
provide an additional, easy way for users to install an application,
often by clicking on the file or a download link.

Internally, `.flatpakref` files are simple description files that
include information about a Flatpak application. An example:

    [Flatpak Ref]
    Name=fr.free.Homebank
    Branch=stable
    Title=fr.free.Homebank from flathub
    Url=https://dl.flathub.org/repo/
    RuntimeRepo=https://dl.flathub.org/repo/flathub.flatpakrepo
    IsRuntime=false
    GPGKey=mQINBFlD2sABEADsiUZUO...

As can be seen, the file includes the ID of the application and the
location of the repository that contains it, as well a link to
information about the repository that provides the application\'s
runtime. `.flatpakref` files therefore contain all the information
needed to install an application.

::: note
::: title
Note
:::

`.flatpakref` files should include the base64-encoded version of the GPG
key that was used to sign the repository. This can be obtained with the
following command:

    $ base64 --wrap=0 < key.gpg
:::

One advantage of `.flatpakref` files is that they can be used to install
applications even if their repository hasn\'t been added by the user. In
this case the repository that contains the application will either be
automatically installed, or the user will be prompted to install it.
This will also happen if the necessary runtime isn\'t present.

`.flatpakref` can be used to install applications from the command line
as well as with graphical software installers. This is done with the
standard `flatpak install` command, which accepts both local and remote
`.flatpakref` files. For example:

    $ flatpak install https://flathub.org/repo/appstream/fr.free.Homebank.flatpakref

Or, if the same file has been downloaded:

    $ flatpak install fr.free.Homebank.flatpakref

## Publishing updates

Flatpak repositories are similar to Git repositories, in that they store
every version of an application by keeping a record of the difference
between each version. This makes updating efficient, since only the
difference (or \"delta\") between two versions needs to be downloaded
when an update is performed.

When a new version of an application is added to a repository, it
immediately becomes available to users. Software centers are able to
automatically check for and install new versions. Those who are using
the command line have to manually run `flatpak update` to check for and
install new versions of any applications they have installed.
