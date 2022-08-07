# Flatpak Builder

`flatpak-builder` has already been introduced in
[first-build](first-build) and
[building-introduction](building-introduction). This page
provides additional detail on how to use `flatpak-builder`, including
the various command options that are available.

## Exporting

`flatpak-builder` provides two options for exporting an application in
order to run it. The first is to export to a repository, from which the
application can be run. The second is to automatically install locally.

### Exporting to a repository

The `--repo` option allows a repository to be specified, for the
application to be exported to. This takes the format:

    $ flatpak-builder --repo=<repo> <build-dir> <manifest>

Here, `<repo>` is a path to a repository. If no repository exists at the
specified location, the repository will be created. If the application
is already in the specified repository, `flatpak-builder` will add the
build as a new version of the existing application.

You can put more than one application in the same repository by using
the same `--repo` path for multiple invocations of `flatpak-builder`.

:::note

By default, `flatpak-builder` splits off translations and debug
information into separate _.Locale_ and _.Debug_
extensions. These extensions are automatically exported into a
repository along with the application.
:::

### Installing builds directly

Instead of exporting to a repository, the Flatpak that is produced by
`flatpak-builder` can be automatically installed locally, using the
`--install` option:

    $ flatpak-builder --install <build-dir> <manifest>

This approach has the advantage of skipping the separate install step
that is needed when exporting to a repository.

## Signing

Every commit to a Flatpak repository should be signed with a GPG
signature. If `flatpak-builder` is being used to modify or create a
repository, a GPG key should therefore be passed to it. This can be done
with the `--gpg-sign` option, such as:

    $ flatpak-builder --gpg-sign=<key> --repo=<repository> <manifest>

Here, `<key>` is the ID of the GPG key that is to be used. The
`--gpg-homedir` option can also be used to specify the home directory of
the key that is being used.

Though it generally isn't recommended, it is possible not to use GPG
verification. In this case, the `--no-gpg-verify` option should be used
when adding the repository. Note that it is necessary to become root in
order to update a repository that does not have GPG verification
enabled.
