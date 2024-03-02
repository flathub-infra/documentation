# External Data Checker

The [Flatpak External Data Checker](https://github.com/flathub/flatpak-external-data-checker) is a tool that can be used to check for updates to external data sources. It is designed to be used in conjunction with the [Flathub](https://flathub.org) build system, but can be used with any Flatpak repository.

Check the project's README for addition information not covered here.

## Configuration

If you are using the Flathub infrastructure (i.e. your app's manifest is in a repo on the Flathub org), External Data Checker will be run every hour for you and will create merge requests if there are newer versions of external data found, depending on your configuration.

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
Automatically merging PRs ensures each update _builds_, but does not guarantee the app will launch or run correctly. We highly recommend human-testing each PR before merging it.
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
