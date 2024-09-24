# Updates

Flathub builds and publishes app updates after a change is made to an app's manifest. The exact time to publish can vary depending on the backlog.

## Creating updates

Updating an application on Flathub (unless it is a direct-upload) is done by submitting a pull
request to the application repository on GitHub. Once the pull request is submitted, a [test
build](/docs/for-app-authors/maintenance#test-builds-and-pull-requests) will be triggered
against it. Once that is successful and the CI passes, the maintainers can merge the pull request
which will create an "official build" on [Buildbot](/docs/for-app-authors/maintenance#buildbot).

The official build, if successful, is directly published to the Flathub repository.

Pull requests with updates can be automated with [External Data Checker](/docs/for-app-authors/external-data-checker)
or by using a custom workflow that will submit a pull request to the Flathub repository.

Any action from Flathub and `peter-evans/create-pull-request` is allowed
to be used.

This can be used in place of the regular global x-checker action to
support updating your dependency manifests or metainfo files.

Please remember to [disable](/docs/for-app-authors/external-data-checker#disable)
the global x-checker action and restrict scheduled jobs to once a week
to not overload Flathub's CI. An example is provided below.

This expects [Flatpak-builder-tools](https://github.com/flatpak/flatpak-builder-tools)
to be present as a submodule.

```yaml
name: Update Python sources
on:
  schedule:
    - cron: '0 0 * * 0'
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  update-python-sources:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - name: Install Linux dependencies
        run: sudo apt-get update -qq && sudo apt-get install -y jq flatpak
      - name: Enable Flathub
        run: flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
      - name: Install runtimes
        run: flatpak install -y flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
      - name: Extract commit
        id: app-commit
        run: echo "commit=$( jq '.modules[] | select(.name == "flatpak-builder-lint") | .sources[] | select(.type == "git") | .commit' com.example.manifest.json )" >> $GITHUB_OUTPUT
      - name: Clone application repo
        uses: actions/checkout@v4
        with:
          repository:
          ref: ${{ steps.app-commit.outputs.commit }}
          path: app
      - name: Generate python sources
        run: flatpak-pip-generator --runtime='org.freedesktop.Sdk//24.08' --requirements-file='/app/foo/bar/requirements.txt' --output pypi-dependencies.json
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v6
        with:
          commit-message: Update python sources
          title: Update python sources
          base: master
```


## For users

Neither Flathub nor Flatpak dictate the update policy on end-user machines; instead, their OS and app store client (like GNOME Software or KDE Discover) determine the available options, and ultimately it's up to the user's preferences.

However, generally:

- **Automatic updates are enabled by default** in GNOME Software, Endless App Center, and Universal Blue images

- **Automatic updates are available** for KDE Discover and elementary AppCenter, but must be enabled by users

- **Automatic updates are performed daily** when enabled

- Most app store clients will **notify users of available updates at least daily**, even when automatic updates are not enabled

- Apps can implement their own update logic using the [UpdateMonitor Portal](https://docs.flatpak.org/en/latest/portal-api-reference.html#gdbus-interface-org-freedesktop-portal-Flatpak-UpdateMonitor), e.g. to **prompt users to install an update and restart the app**
