# External Data Checker

The [Flatpak External Data Checker](https://github.com/flathub/flatpak-external-data-checker) is a tool that can be used to automatically check for updates to external sources
in the application manifest. It is designed to be used in conjunction with the [Flathub](https://flathub.org) build system, but can be used with any Flatpak repository.

## Configuration

External Data Checker runs hourly on Flathub by default. If the application manifest has a [checker](https://github.com/flathub-infra/flatpak-external-data-checker?tab=readme-ov-file#changes-to-flatpak-manifests) configured and if there are newer versions of external data found, a merge request
with the update will be created through the [flathubbot GitHub account](https://github.com/flathubbot).

By default, External Data Checker runs on the [default GitHub branch](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch) only but it can be configured to run on multiple branches through a [custom workflow](https://github.com/flathub-infra/flatpak-external-data-checker?tab=readme-ov-file#custom-workflow). A custom schedule can also be configured with the above workflow.

If a custom workflow is being used, please [disable](/docs/for-app-authors/external-data-checker#disable) the default Flathub provided workflow.

### Only create updates for important modules

You can configure External Data Checker to only create updates for modules that are marked as important. This is done by creating a `flathub.json` file with the following contents:

```json title="flathub.json"
{
  "require-important-update": true
}
```

This also needs your module config to have `is-important: true` set.

### Automatically merge PRs

:::danger
This is not allowed by default on Flathub unless the app is [extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data)
:::

:::note
Automatically merging PRs ensures each update builds, but does not guarantee the app will launch or run correctly. We highly recommend human-testing each PR before merging it.
:::

You can configure External Data Checker to automatically merge PRs. This is done by creating a `flathub.json` file in the root of your manifest's repo with the following contents:

```json title="flathub.json"
{
  "automerge-flathubbot-prs": true
}
```

### Disable

You can opt out of External Data Checker by creating a `flathub.json` file in the root of your manifest's repo with the following contents:

```json title="flathub.json"
{
  "disable-external-data-checker": true
}
```
