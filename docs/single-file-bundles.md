# Single-file bundles

Hosting a repository is the preferred way to distribute an application,
since repositories allow applications to be updated. However, sometimes
it can be appropriate to use a single-file bundle. These can be used to
provide a direct download of the application, to distribute applications
using removable media, or to send them as email attachments.

::: warning
::: title
Warning
:::

Since single-file bundles don\'t include dependencies or AppStream data,
the preferred way of distributing applications offline is with the
create-usb command; see `usb-drives`{.interpreted-text role="doc"}.
:::

Flatpak allows single file bundles to be created with the `build-bundle`
and `build-import-bundle` commands, which allow an application in a
repository to be converted into a bundle and back again:

    $ flatpak build-bundle [OPTION...] LOCATION FILENAME NAME [BRANCH]
    $ flatpak build-import-bundle [OPTION...] LOCATION FILENAME

For example, to create a bundle named [dictionary.flatpak]{.title-ref}
containing the GNOME dictionary app from the repository at
\~/repositories/apps, run:

    $ flatpak build-bundle ~/repositories/apps dictionary.flatpak org.gnome.Dictionary

You can also set a runtime repo in the bundle:

    $ flatpak build-bundle ~/repositories/apps dictionary.flatpak org.gnome.Dictionary --runtime-repo=https://flathub.org/repo/flathub.flatpakrepo

To import the bundle into a repository on another machine, run:

    $ flatpak build-import-bundle ~/my-apps dictionary.flatpak

Alternatively, bundles can also be installed directly without importing
them:

    $ flatpak install dictionary.flatpak
