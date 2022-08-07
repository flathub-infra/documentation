# Hosting a repository

:::note

Flathub uses flat-manager to host its Flatpak repository. See
<https://github.com/flatpak/flat-manager>
:::

The section on [flatpak-builder](../building/flatpak-builder) describes
how to generate repositories. The resulting repository can be hosted on
a web server for consumption by users.

## Important details

Flatpak repositories use archive-z2, meaning that they contain a single
file for each file in the application. This means that pull operations
involve a lot of HTTP requests. Since new requests can be slow, it is
important to enable HTTP keep-alive on the web server that is hosting
your repository.

Flatpak supports something called static deltas. These are single files
that contain all the data needed to go between two revisions (or from
nothing to a revision). Creating such deltas will take up more space on
the server, but will make downloads much faster. This can be done with
the `flatpak build-update-repo --generate-static-deltas` option.

## .flatpakrepo files

`.flatpakrepo` files are a convenient way to let users add a repository.
These are simple description files which contain information about the
repository. For example, the Flathub repo file looks like:

    [Flatpak Repo]
    Title=Flathub
    Url=https://dl.flathub.org/repo/
    Homepage=https://flathub.org/
    Comment=Central repository of Flatpak applications
    Description=Central repository of Flatpak applications
    Icon=https://dl.flathub.org/repo/logo.svg
    GPGKey=mQINBFlD2sABEADsiUZUO...

Here you can see that the repo file contains descriptive metadata, such
as the repository name, description, icon and website. The file also
contains information that is needed to add the repository, including a
download URL and the repository's GPG key.

`.flatpakrepo` files can be used to add a repository from the command
line. For example, the command to add Flathub using its repo file is:

    $ flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

The command line isn't the only way to add a repository using a
`.flatpakrepo` file - on desktops that support Flatpak, it is just a
matter of clicking the repository file or a download link that points to
it.

:::note

`.flatpakrepo` files should include the base64-encoded version of the
GPG key that was used to sign the repository. This can be obtained with
the following command:

    $ base64 --wrap=0 < key.gpg

:::
