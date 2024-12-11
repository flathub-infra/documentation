# External Data Checker

The [Flatpak External Data Checker](https://github.com/flathub/flatpak-external-data-checker)
is a tool that can be used to automatically check for updates to
external sources in the Flatpak manifest.

## Configuration

A global External Data Checker action runs hourly on Flathub by default.
If the application manifest has a [checker](https://github.com/flathub-infra/flatpak-external-data-checker?tab=readme-ov-file#changes-to-flatpak-manifests)
configured and if there are newer versions of external data found, a
pull request with the update will be created through the
[flathubbot GitHub account](https://github.com/flathubbot).

By default, the global action only supports the [default GitHub branch](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch)
but External Data Checker can be configured to run on multiple branches
through a [custom workflow](/docs/for-app-authors/external-data-checker#run-on-multiple-branches).

If a custom workflow is being used, please
[disable](/docs/for-app-authors/external-data-checker#disable) the
default Flathub provided workflow.

### Only create updates for important modules

You can configure External Data Checker to only create updates for
modules that are marked as important. This is done by creating a
`flathub.json` file with the following contents:

```json title="flathub.json"
{
  "require-important-update": true
}
```

This also needs your module config to have `is-important: true` set.

### Automatically merge PRs

:::danger
This is not allowed by default on Flathub without a
[Linter exception](/docs/for-app-authors/linter#exceptions) to
[flathub-json-automerge-enabled](/docs/for-app-authors/linter#flathub-json-automerge-enabled)
:::

:::note
Automatically merging PRs ensures each update builds, but does not
guarantee the app will launch or run correctly. We highly recommend
human-testing each PR before merging it.
:::

You can configure External Data Checker to automatically merge PRs. This
is done by creating a `flathub.json` file in the root of your manifest's
repo with the following contents:

```json title="flathub.json"
{
  "automerge-flathubbot-prs": true
}
```

### Disable

You can opt out of External Data Checker by creating a `flathub.json`
file in the root of your manifest's repo with the following contents:

```json title="flathub.json"
{
  "disable-external-data-checker": true
}
```


### Run on multiple branches

By default, the Flathub provided External Data checker workflow runs
only on the default branch of the GitHub repository, but a custom
workflow can be defined to run it on multiple branches. This is useful
for extensions or baseapps which have multiple branches - one for each
runtime version.

This uses the docker image published by External Data Checker upstream.

First [opt out](#disable) of the default Flathub provided workflow.

Then, this needs to be committed to the Github repo at
`.github/workflows/update.yaml`.

```yaml
name: Check for updates
on:
  schedule:
    - cron: '0 14 * * 1' # Run once a week, on Monday, at 14:00
  workflow_dispatch: {}
jobs:
  flatpak-external-data-checker:
    runs-on: ubuntu-latest
    if: github.repository_owner == 'flathub'
    strategy:
      matrix:
        branch: [ branch/23.08, branch/24.08, beta ]
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ matrix.branch }}
      - uses: docker://ghcr.io/flathub/flatpak-external-data-checker:latest
        env:
          GIT_AUTHOR_NAME: Flatpak External Data Checker
          GIT_COMMITTER_NAME: Flatpak External Data Checker
          GIT_AUTHOR_EMAIL: 41898282+github-actions[bot]@users.noreply.github.com
          GIT_COMMITTER_EMAIL: 41898282+github-actions[bot]@users.noreply.github.com
          EMAIL: 41898282+github-actions[bot]@users.noreply.github.com
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          args: --update --never-fork <MANIFEST FILENAME>
```
