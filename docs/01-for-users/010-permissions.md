# Modifying default permissions

Often applications on Flathub may come with a broader set of permissions
by default than what a specific user may require. This is often done to
support a wide userbase. However maintainers are encouraged to allow
only a limited set of permissions by default.

For example, Firefox comes with `--socket=pcsc` for smart card access
but someone may not own one. In these cases, users can remove or modify
the default permissions to improve security and better fit their needs.

There are several tools available like [Flatseal](https://flathub.org/apps/com.github.tchx84.Flatseal),
GNOME Settings and KDE Settings.

Once Flatseal is installed, opening it will list all installed Flatpak
apps. Users can use the toggle button beside each permission to enable
or disable it. Please refer to [Flatseal's documentation](https://github.com/tchx84/Flatseal/blob/master/DOCUMENTATION.md)
for more information.

Alternatively, those who are comfortable with the terminal can use
`flatpak override` for the same purpose.

```bash
# Show permissions
flatpak info --show-permissions org.mozilla.firefox

# Override a permission
flatpak override --user --nosocket=pcsc org.mozilla.firefox

# Show overrides
flatpak override --user --show org.mozilla.firefox

# Reset all overrides
flatpak override --user --reset org.mozilla.firefox
```
