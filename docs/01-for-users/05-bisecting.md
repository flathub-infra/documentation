# Bisecting regressions in application builds

In case the newest builds of an application introduce regressions, you
can use `flatpak-bisect` to discover which commit introduced the
regression. It works just like `git bisect`.

In case your distribution doesn't install the `flatpak-bisect` utility,
you can find it distributed alongside the Flatpak source code, in
<https://github.com/flatpak/flatpak/blob/main/scripts/flatpak-bisect>

First you update the application and get its history:

```bash
flatpak-bisect org.gnome.gedit start
```

Then, you should set the current commit as the first bad commit:

```bash
flatpak-bisect org.gnome.gedit bad
```

Now you need to find the hash of the first known good commit. For that,
you can see the build history by running:

```bash
flatpak-bisect org.gnome.gedit log
```

To start bisecting, checkout the first known good commit you find:

```bash
flatpak-bisect org.gnome.gedit checkout 5cd2b0648618c9038fbc6830733817309ade29541cdd8383830bbb76f6accf0d
```

After setting the bad commit and the first known good commit, you can
launch the application to verify if the current commit in the bisecting
session is a good or a bad one.

To mark a commit as good or bad, run:

```bash
flatpak-bisect org.gnome.gedit good
```

Or:

```bash
flatpak-bisect org.gnome.gedit bad
```

`flatpak-bisect` will inform you when the first bad commit is found.
