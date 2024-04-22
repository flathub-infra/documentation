# Uninstallation

## Uninstalling applications

These instructions will show you how to uninstall any application installed
through Flatpak.

To just uninstall an application and keep its data in `~/.var/app/<app-id>`
intact, you can run:

```bash
flatpak uninstall <appid>
```

You can also use `flatpak remove <appid>` as `remove` is an alias for
`uninstall`.

:::danger
This will uninstall all application data stored by Flatpak. Please
proceed carefully.
:::

To uninstall and also delete the data from `~/.var/app/<app-id>`, you can
run:

```bash
flatpak uninstall --delete-data <appid>
```

It will ask you to confirm using `y/N` before proceeding. Anything
stored outside of `~/.var/app/<app-id>` is outside of Flatpak's control
and might be left as is.

Often when you may have multiple branches of an application installed
for example `beta` and `stable` or the same application installed from
multiple different remotes or the same application installed both in
system and user location.

Then `flatpak uninstall` will present you with a choice for the specific
ref to uninstall. For example:

```
$ flatpak uninstall org.example.foo

Similar installed refs found for ‘org.example.foo’:

   1) app/org.example.foo/x86_64/stable (system)
   2) app/org.example.foo/x86_64/beta (system)
   3) app/org.example.foo/x86_64/beta (user)
   4) All of the above

Which do you want to use (0 to abort)? [0-4]:
```

If you want only the `beta` branch uninstalled from the `system` location,
choose type `2` in the terminal.

:::note
Please be careful not to pass `--delete-data` here, if you want to keep
some of them installed.
:::

If you want all of them uninstalled, type `4` in the terminal.

You can also uninstall applications from software stores provided by
your desktop environment or distribution like GNOME Software or
KDE Discover.

## Uninstalling unused dependencies

Often when you have uninstalled a bunch of applictions, there might be
leftover runtimes that aren't needed anymore. To remove them you can run:

```bash
flatpak uninstall --unused
```

## Removing remotes

If you want to delete the remote too, you can run:

```bash
flatpak remote-delete <remote-name>
```

To see a list of remote names, you can run:

```bash
flatpak remote-list
```

If you have applications or runtimes still installed from that remote,
you will be asked whether to remove them too.

If you want to just remove the remote but keep applications installed
you can run:

```bash
flatpak remote-delete --force <remote-name>
```
