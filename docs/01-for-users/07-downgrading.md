# Downgrading

It is possible to downgrade an installed application (or runtime) to an
older build.

First you look for the commit you are interested in:

```bash
flatpak remote-info --log flathub org.gnome.Recipes
```

Then you deploy the commit:

```bash
sudo flatpak update \
      --commit=ec07ad6c54e803d1428e5580426a41315e50a14376af033458e7a65bfb2b64f0 \
      org.gnome.Recipes
```

:::note

The example here uses `sudo` for system installations because, unlike
normal updates, downgrades are considered a privileged action. If the
application is installed per-user you would run it as that user.
:::

If you have Flatpak 1.5.0 or later, you can also prevent the app from
being included in updates (either manual or automatic):

```bash
flatpak mask org.gnome.Recipes
```
