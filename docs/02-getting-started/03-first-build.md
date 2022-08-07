# Building your first Flatpak

This tutorial provides a quick introduction to building Flatpaks. In it,
you will learn how to create a basic Flatpak application, which can be
installed and run.

In order to complete this tutorial, you should have followed the [setup
guide on flatpak.org](http://flatpak.org/setup/). You also need to have
installed `flatpak-builder`, which is usually available from the same
repository as the `flatpak` package (e.g. use `apt` or `dnf`). You can
also install it as a flatpak with
`flatpak install flathub org.flatpak.Builder`.

## 1. Install a runtime and the matching SDK

Flatpak requires every app to specify a runtime that it uses for its
basic dependencies. Each runtime has a matching SDK (Software
Development Kit), which contains all the things that are in the runtime,
plus headers and development tools. This SDK is required to build apps
for the runtime.

In this tutorial we will use the Freedesktop 21.08 runtime and SDK. To
install these, run:

    $ flatpak install flathub org.freedesktop.Platform//21.08 org.freedesktop.Sdk//21.08

## 2. Create the app

The app that is going to be created for this tutorial is a simple
script. To create it, copy the following:

    #!/bin/sh
    echo "Hello world, from a sandbox"

Now paste this into an empty file and save it as `hello.sh`.

## 3. Add a manifest

Each Flatpak is built using a manifest file which provides basic
information about the application and instructions for how it is to be
built. To add a manifest to the hello world app, add the following to an
empty file:

```yaml
app-id: org.flatpak.Hello
runtime: org.freedesktop.Platform
runtime-version: "21.08"
sdk: org.freedesktop.Sdk
command: hello.sh
modules:
  - name: hello
    buildsystem: simple
    build-commands:
      - install -D hello.sh /app/bin/hello.sh
    sources:
      - type: file
        path: hello.sh
```

Now save the file alongside `hello.sh` and call it
`org.flatpak.Hello.yml`.

In a more complex application, the manifest would list multiple modules.
The last one would typically be the application itself, and the earlier
ones would be dependencies that are bundled with the app because they
are not part of the runtime.

## 4. Build the application

Now that the app has a manifest, `flatpak-builder` can be used to build
it. This is done by specifying the manifest file and a target directory:

    $ flatpak-builder build-dir org.flatpak.Hello.yml

This command will build each module that is listed in the manifest and
install it to the `/app` subdirectory, inside the `build-dir` directory.

## 5. Test the build

To verify that the build was successful, run the following:

    $ flatpak-builder --user --install --force-clean build-dir org.flatpak.Hello.yml
    $ flatpak run org.flatpak.Hello

This second time we passed in `--force-clean`, which means that the
previously created `build-dir` directory was deleted before the new
build was started.

Congratulations, you\'ve made an app!

## 6. Put the app in a repository

If you want to share the application you can put it in a repository.
This is done by passing the `--repo` argument to `flatpak-builder`:

    $ flatpak-builder --repo=repo --force-clean build-dir org.flatpak.Hello.yml

This does the build again, and at the end exports the result to a local
directory called `repo`. Note that `flatpak-builder` keeps a cache of
previous builds in the `.flatpak-builder` subdirectory, so doing a
second build like this is very fast.

In order for your application to show up in application stores while
testing with a local repository, you might have to run
`flatpak build-update-repo repo`. For more information how to publish to
application stores see [Appdata
files](http://docs.flatpak.org/en/latest/freedesktop-quick-reference.html#appdata-files).

## 7. Install the app

Now we\'re ready to add the repository that was just created and install
the app. This is done with two commands:

    $ flatpak --user remote-add --no-gpg-verify tutorial-repo repo
    $ flatpak --user install tutorial-repo org.flatpak.Hello

The first command adds the repository that was created in the previous
step. The second command installs the app from the repository.

Both these commands use the `--user` argument, which means that the
repository and the app are added per-user rather than system-wide. This
is useful for testing.

Note that the repository was added with `--no-gpg-verify`, since a GPG
key wasn't specified when the app was built. This is fine for testing,
but for official repositories you should sign them with a private GPG
key.

## 8. Run the app

All that's left is to try the app. This can be done with the following
command:

    $ flatpak run org.flatpak.Hello

This runs the app, so that it prints \'Hello world, from a sandbox\'.
