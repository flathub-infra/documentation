# Flatpak builder lint

The Flatpak builder lint tool is a linter for Flatpak manifests. It's used to check for common errors, to enforce a consistent style and permissions.
It can be found in the [flatpak-builder-lint](https://github.com/flathub/flatpak-builder-lint) repository.

It's run against all builds send to Flathub, and can be run locally to check your manifest before submitting it. You can find more information in the readme.

## Linter errors

Here is a list of linter errors, and whether exceptions may be applied, by default.

| Error                                       | Explanation                                                                  | Exceptions |
| ------------------------------------------- | ---------------------------------------------------------------------------- | ---------- |
| `appid-code-hosting-too-few-components`     | The app id has too few components for code hosting service.                  | No[^1]     |
| `appid-uses-code-hosting-domain`            | The app id doesn't follow the domain requirements for code hosting services. | No[^1]     |
| `finish-args-arbitrary-autostart-access`    | Arbitrary `xdg-autostart` access. Please use the portals.                    | No         |
| `finish-args-arbitrary-dbus-access`         | Generic D-Bus access is requested.                                           | No[^4]     |
| `finish-args-arbitrary-xdg-cache-access`    | Filesystem permission want `xdg-cache`.                                      | Yes        |
| `finish-args-arbitrary-xdg-config-access`   | Filesystem permission want `xdg-config`.                                     | Yes        |
| `finish-args-arbitrary-xdg-data-access`     | Filesystem permission want `xdg-data`.                                       | Yes        |
| `finish-args-flatpak-spawn-access`          | The package requested access to `org.freedesktop.Flatpak`.                   | Yes        |
| `finish-args-incorrect-dbus-gvfs`           | D-Bus name `org.gtk.vfs` doesn't exist.                                      | No         |
| `finish-args-not-defined`                   | No `finish-args`. For the case where this is needed put an empty array.      | No         |
| `finish-args-unnecessary-appid-own-name`    | D-Bus permission for app id name is granted automatically.                   | No         |
| `finish-args-unnecessary-xdg-cache-access`  | Filesystem permission want `xdg-cache`.                                      | Yes        |
| `finish-args-unnecessary-xdg-config-access` | Filesystem permission want `xdg-config`.                                     | Yes        |
| `finish-args-unnecessary-xdg-data-access`   | Filesystem permission want `xdg-data`.                                       | Yes        |
| `flathub-json-modified-publish-delay`       | Reduced publishing delay in `flathub.json`.                                  | No[^3]     |
| `flathub-json-skip-appstream-check`         | Skipping the appstream check in `flathub.json`                               | Yes        |
| `module-*-source-git-branch`                | A git source has a branch.                                                   | No         |
| `module-*-source-git-local-path`            | A git source has a file URL.                                                 | No         |
| `module-*-source-git-no-commit-or-tag`      | A git source has no commit or tag (The `*` is the module name).              | No         |
| `module-*-source-git-no-url`                | A git source has no URL specified.                                           | No         |
| `module-*-source-git-url-not-http`          | A git source URL is not http nor https.                                      | No         |
| `toplevel-cleanup-debug`                    | `/lib/debug` is in the top level `cleanup` rule.                             | No         |
| `toplevel-no-command`                       | The `command` property is missing.                                           | No[^2]     |
| `toplevel-no-modules`                       | There are no modules in the manifest.                                        | No         |

[^1]: Unless the package existed before the linter.
[^2]: Exception needed for BaseApps where a default command may not make sense.
[^3]: Granted for `extra-data`.
[^4]: Exception only for tools that reequires D-Bus access and for which the names are not predictable ; this includes D-Bus tools and IDEs. In general it isn't allowed.

## Exceptions

Linter errors can be ignored with exceptions. Exceptions are granted on a case-by-case basis, and it's not because you see a package with an exception that your exception will be granted. Some are grandfathered as their existence predates the linter. The exception pull request needs to be merged for a package submission to be buildable.

To apply for an exception, you need to submit a [Pull Request](https://github.com/flathub/flatpak-builder-lint/pulls) for the JSON [exception file](https://github.com/flathub/flatpak-builder-lint/blob/master/flatpak_builder_lint/staticfiles/exceptions.json). The syntax is:

```json
"my.app.id": {
    "linter-error": "reason for the exception"
}
```

There should be only one entry for the application, but it can contain multiple exceptions. Please make sure the reason is explanatory.
