# Flatpak builder lint

The Flatpak builder lint tool is a linter for Flatpak manifests. It's used to check for common errors, to enforce a consistent style and permissions.
It can be found in the [flatpak-builder-lint](https://github.com/flathub/flatpak-builder-lint) repository.

It's run against all builds sent to Flathub, and can be run locally to check your manifest before submitting it. You can find more information in the readme.

## Linter errors

Here is a list of linter errors, and whether exceptions may be applied, by default.

| Error                                       | Explanation                                                                  | Exceptions |
| ------------------------------------------- | ---------------------------------------------------------------------------- | ---------- |
| `appid-code-hosting-too-few-components`     | The app id has too few components for code hosting service.                  | No[^1]     |
| `appid-not-defined`                         | Application Id is missing.                                                   | No         |
| `appid-ends-with-lowercase-desktop`         | Application Id ends with lowercase `desktop`.                                | No[^1]     |
| `appid-filename-mismatch`                   | Manifest filename does not match app-id.                                     | No         |
| `appid-uses-code-hosting-domain`            | The app id doesn't follow the domain requirements for code hosting services. | No[^1]     |
| `appstream-external-screenshot-url`         | Screenshots in appinfo aren't mirrored to dl.flathub.org/repo/screenshots.   | No         |
| `appstream-failed-validation`               | Appdata file failed validation.                                              | No[^2]     |
| `appstream-missing-appinfo`                 | Ostree ref is missing `files/share/app-info`.                                | No[^2]     |
| `appstream-missing-appinfo-file`            | Appstream catalogue is missing or wasn't generated.                          | No[^2]     |
| `appstream-missing-icon-file`               | A 128px icon in appstream catalogue is missing or wasn't generated.          | No[^2]     |
| `appstream-missing-screenshots`             | Appstream catalogue is missing screenshots.                                  | No[^2]     |
| `appstream-metainfo-missing`                | Appdata file is missing.                                                     | No[^2]     |
| `appstream-multiple-components`             | Appstream catalogue has more than one `components` tag                       | No         |
| `appstream-screenshots-not-mirrored-in-ostree`[^a] | Appstream screenshots not mirrored in ostree repo.                    | No         |
| `finish-args-arbitrary-autostart-access`    | Arbitrary `xdg-autostart` access. Please use the portals.                    | No         |
| `finish-args-arbitrary-dbus-access`         | Generic D-Bus access is requested.                                           | No[^4]     |
| `finish-args-arbitrary-xdg-cache-access`    | Filesystem permission has `xdg-cache`.                                       | Yes        |
| `finish-args-arbitrary-xdg-config-access`   | Filesystem permission has `xdg-config`.                                      | Yes        |
| `finish-args-arbitrary-xdg-data-access`     | Filesystem permission has `xdg-data`.                                        | Yes        |
| `finish-args-broken-kde-tray-permission`    | Permission has `org.kde.StatusNotifierItem` which does not work in Flatpak   | No         |
| `finish-args-fallback-x11-without-wayland`  | Permission has `fallback-x11` without `wayland`.                             | Yes        |
| `finish-args-flatpak-spawn-access`          | The package requested access to `org.freedesktop.Flatpak`.                   | Yes        |
| `finish-args-incorrect-dbus-gvfs`           | D-Bus name `org.gtk.vfs` doesn't exist.                                      | No         |
| `finish-args-not-defined`                   | No `finish-args`. For the case where this is needed put an empty array.      | No         |
| `finish-args-redundant-home-and-host`       | Filesystem permission has both `home` and `host`.                            | No         |
| `finish-args-unnecessary-appid-own-name`    | D-Bus permission for app id name is granted automatically.                   | No         |
| `finish-args-unnecessary-xdg-cache-access`  | Filesystem permission has a subpath of `xdg-cache`.                          | Yes        |
| `finish-args-unnecessary-xdg-config-access` | Filesystem permission has a subpath of `xdg-config`.                         | Yes        |
| `finish-args-unnecessary-xdg-data-access`   | Filesystem permission has a subpath of `xdg-data`.                           | Yes        |
| `flat-manager-branch-repo-mismatch`         | The ref branch does not match the target flathub repository.                 | No         |
| `flat-manager-no-app-ref-uploaded`          | No application refs (`app/`) found.                                          | No         |
| `flathub-json-modified-publish-delay`       | Reduced publishing delay in `flathub.json`.                                  | No[^3]     |
| `flathub-json-eol-rebase-misses-new-id`     | Missing app-id in `end-of-life` in flathub.json.                             | No         |
| `flathub-json-eol-rebase-without-message`   | `end-of-life-rebase` without `end-of-life` message in flathub.json.          | No         |
| `flathub-json-only-arches-empty`            | Empty `only-arches` in flathub.json.                                         | No         |
| `flathub-json-excluded-all-arches`          | `exclude-arches` in flathub.json excludes all buildable arches.              | No         |
| `flathub-json-skip-appstream-check`         | Skipping the appstream check in `flathub.json`                               | Yes        |
| `jsonschema-schema-error`                   | flatpak-manifest.schema.json has invalid schema.                             | N/A        |
| `jsonschema-validation-error`               | flatpak-manifest.schema.json failed validation.                              | N/A        |
| `module-*-source-dest-filename-is-path`     | A module with `dest-filename` has path.                                      | No         |
| `module-*-source-git-branch`                | A git source has a branch.                                                   | No         |
| `module-*-source-git-local-path`            | A git source has a file URL.                                                 | No         |
| `module-*-source-git-no-commit-or-tag`      | A git source has no commit or tag (The `*` is the module name).              | No         |
| `module-*-source-git-no-url`                | A git source has no URL specified.                                           | No         |
| `module-*-source-git-url-not-http`          | A git source URL is not http nor https.                                      | No         |
| `module-*-autotools-non-release-build`      | A module using autotools is built with `--enable-debug` enabled.             | No         |
| `toplevel-cleanup-debug`                    | `/lib/debug` is in the top level `cleanup` rule.                             | No         |
| `toplevel-no-command`                       | The `command` property is missing.                                           | No[^2]     |
| `toplevel-no-modules`                       | There are no modules in the manifest.                                        | No         |

[^1]: Unless the package existed before the linter.
[^2]: Unless BaseApps or extensions. (Might also be granted on a case-by-case basis)
[^3]: Granted for `extra-data`.
[^4]: Exception only for tools that requires D-Bus access and for which the names are not predictable; this includes D-Bus tools and IDEs. In general it isn't allowed.

## Exceptions

Linter errors can be ignored with exceptions. Exceptions are granted on a case-by-case basis, and it's not because you see a package with an exception that your exception will be granted. Some are grandfathered as their existence predates the linter. The exception pull request needs to be merged for a package submission to be buildable.

To apply for an exception, you need to submit a [Pull Request](https://github.com/flathub/flatpak-builder-lint/pulls) for the JSON [exception file](https://github.com/flathub/flatpak-builder-lint/blob/master/flatpak_builder_lint/staticfiles/exceptions.json). The syntax is:

```json
"my.app.id": {
    "linter-error": "reason for the exception"
}
```

There should be only one entry for the application, but it can contain multiple exceptions. Please make sure the reason is explanatory.
