# Maintenance

This is a guide in how to maintain your application once it is on Flathub. It assumes your application is already on Flathub, and that you have access rights to its repository. If this is not true, please read the [submission](/docs/for-app-authors/submission) page first and check your email for GitHub repository access requests.

## The repository

The build information for each application on Flathub is stored in a repository on GitHub in the Flathub organization. For example, the Blender one is here: https://github.com/flathub/org.blender.Blender. On the `master` branch of this repository the primary build version of the app is stored. The `beta` branch is built into the beta repository (if you want to use that). Branches named `branch/*` are reserved specifically for BaseApps and extensions. Applications must not use it for naming GitHub branches or pushing their builds.

All of these branches along with `main`, `stable`, `beta/*` and `stable/*` are automatically <em>protected</em> which means that you can only merge pull requests and not push directly to them. Other branch names are free to use however you see fit.

## Buildbot

There is a Buildbot instance running on https://flathub.org/builds, which monitors the GitHub repositories. Each time that `master`, `beta` or `branch/*` branch changes it queues a build of the application, and if the build succeeds on all the architectures, then a test repository is generated where you can download and test the build. The build is published (i.e. signed and imported) into the Flathub Flatpak repo manually (via the web ui) or automatically after three hours, and the build will be available to your users. Use the three hours to test the build and make sure it works. If it doesn't, you can take the build down and try again.

You can track your build status, follow the build log for current and historic builds, start builds or publish a build on the Buildbot instance website. You will need to be logged in with your GitHub account to do this.

## Test builds and pull requests

Buildbot also monitors the comments on any pull requests in your repository, and if they include the magic phrase `bot, build` (by a repo collaborator or owner) then it will start a test build. Test builds are similar to regular builds, except the results will never be published into the Flathub repo. You can however install the app from the test repo, where it will be available for 5 days or until you delete it.

This is a great way to do updates, you do an update locally and tests that it works. Then you can make a pull request against master to verify that it builds on all architectures before you merge it.

## `flathub.json`

You can create a file called `flathub.json` to control various parameters of the build infrastructure.

### Limiting the set of architectures to build on

Flathub has builders for `x86_64`, and `aarch64` as current runtimes (based on Freedesktop.org SDK 20.08 or later) only support `x86_64` and `aarch64`. By default all applications build on all these. If your application does not work on some architectures, you can configure it to skip or build certain architectures.

#### Don’t build on `aarch64`

```json title="flathub.json"
{
  "skip-arches": ["aarch64"]
}
```

#### Only build on `x86_64`

```json title="flathub.json"
{
  "only-arches": ["x86_64"]
}
```

If you build for both `x86_64` and `aarch64` you do not need a `flathub.json` file. There will be no new architecture add or removed on current runtimes, which mean that if that situation ever occured, it would only happen when changing the runtime version in your package.

### End of life

There may come a point where an application is no longer maintained. In order to inform users at update or install time that it will no longer get updates, create `flathub.json` with these contents:

```json title="flathub.json"
{
  "end-of-life": "This application is no longer maintained because..."
}
```

If the application has been renamed, you can additionally include `end-of-life-rebase` with the new ID. Recent flatpak versions will prompt user if they'd like to switch to the renamed app.

```json title="flathub.json"
{
  "end-of-life": "The application has been renamed to the.new.appid.",
  "end-of-life-rebase": "the.new.appid"
}
```

The `end-of-life-rebase` will tell flatpak to automatically migrate the user data from the old package to the new package, making the process transparent for the user.

Please also try to contact a flathub admin to archive the repo by either creating an issue at [flathub/flathub](https://github.com/flathub/flathub/issues/new) or emailing [Flathub admins](mailto:admins@flathub.org).

### Flathub external data checker config

[Flatpak external data checker](/docs/for-app-authors/external-data-checker) is a tool that checks for updates of modules, which have been configured to be updated. If you are using the Flathub infrastructure (repo on the Flathub org), this tool will be run every hour for you and will create merge requests if there are newer version.

#### Only create updates with important modules

You can configure the external data checker to only create updates for modules that are marked as important. This is done by creating a `flathub.json` file with the following contents:

```json title="flathub.json"
{
  "require-important-update": true
}
```

This also needs your module config to have `is-important: true` set.

#### Automatically merging PRs

You can configure the external data checker to automatically merge PRs. This is done by creating a `flathub.json` file with the following contents:

```json title="flathub.json"
{
  "automerge-flathubbot-prs": true
}
```

#### Disable external data checker

You can opt out of this by creating a `flathub.json` file with the following contents:

```json title="flathub.json"
{
  "disable-external-data-checker": true
}
```

## Download statistics

Flathub publishes download statistics for every app or runtime. The raw JSON files are available at [flathub.org/stats](https://flathub.org/stats/). These break out app downloads and updates. This is also the basis for the data shown on flathub.org, additionally there are some community members that generously provide frontends to interpret the data and make it more useful for app developers at [https://ahayzen.com/direct/flathub.html](https://ahayzen.com/direct/flathub.html) and [https://klausenbusk.github.io/flathub-stats/](https://klausenbusk.github.io/flathub-stats/)

## Getting Help

If anything is not working or there is some behaviour you don’t understand, come to the [Matrix channel](https://matrix.to/#/#flatpak:matrix.org) or start a discussion on the [Flathub forum](https://discourse.flathub.org/).
