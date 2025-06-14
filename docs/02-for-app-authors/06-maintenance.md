# Maintenance

This is a guide on how to maintain an application once it is published
on Flathub. Some familiarity with Git, GitHub and Flatpak is required
to maintain an application.

Please familiarize yourself with the repository layout, branch structure
as discussed below. The workflow involves [submitting updates](/docs/for-app-authors/updates#creating-updates)
or changes via pull requests and merging them when the build is successful
and tested.

Maintainers should try to update the application's runtime whenever
feasible and ensure that it does not rely on an end-of-life (EOL)
runtime. They should also be aware of the [runtime support policies](/docs/for-app-authors/runtimes#currently-hosted-runtimes).

## The repository

The `master` branch of the git repository stores the primary version of
the application that is served in the [Flathub stable repository](https://flathub.org/setup)
and corresponds to the `stable` Flatpak ref branch.

The `beta` git branch can store a secondary version that is served in
the [Flathub beta repository](/docs/for-users/installation#flathub-beta-repository)
and corresponds to the `beta` Flatpak ref branch.

Applications must only use either `master` or `beta` git branches and the
corresponding `stable` and `beta` Flatpak ref branches respectively. No
other git or ref branches are allowed for applications.

Branches named `branch/*` are reserved specifically for BaseApps and
Extensions and must not be used by anyone else. If a build is triggered
from the `branch/foobar` git branch of the Flathub GitHub repo, the
corresponding Flatpak ref branch will be set to `foobar`. Extensions
and baseapps are also allowed to set a custom Flatpak ref branch in the
manifest via the `branch` key.

All of those branches along with `main`, `stable`, `beta/*` and `stable/*`
are automatically _protected_ which means that you can only merge pull
requests and not push directly to them or delete the branches.

Other git branch names are free to use.

### Creating new git branches for publishing

**Publishing to beta**: Please don't use GitHub to create the `beta`
git branch. Please also don't locally create or push the `beta` git branch
first.

The process is:

1. Create a normal pull request with the changes that will be merged to
the future `beta` git branch. Say for example the PR branch is
`my-beta-pr-branch`.

2. Once the build is successful, create the `beta` branch locally using
`git` from the previous parent branch usually `master`:

```sh
git checkout -b beta master
```

3. Now merge the changes from the PR branch to beta:

```sh
git merge my-beta-pr-branch
```

4. Now push the `beta` branch and it will trigger an official build.
Future changes to this branch will have to go through pull requests.

```sh
git push
```

**Creating new branches for extensions/baseapps**: Please don't use
GitHub to create the `beta` git branch. Please also don't locally
create or push the `beta` git branch first.

Extensions or baseapps having multiple branches for example
`branch/22.08, branch/23.08, branch/24.08` should follow the same
process as above.

The only change would be in the second step where the new branch would
be `branch/25.08` (for example) and the previous parent branch would be
`branch/24.08` (for example).

```sh
git checkout -b branch/25.08 branch/24.08
```

## Test builds

A _test_ build will be started on every push to a pull request and if
it is successful the bot will post a link to a Flatpak bundle generated
from the PR contents. This is a temporary build that will be active for
a few days and can be used to test changes made in the PR. Once testing
is done, it should be uninstalled via `flatpak remove` (the ref ending
in `/test`). In some cases it is best to install and use it separately
so that the actual stable installation remains unaffected.

Test builds can also be manually started by commenting `bot, build` in
the pull request.

## Official builds

An _official_ build will be started on every merge or push to the
protected branches of the repository. If successful, the official build
will get published usually within 1-2 hours unless it is held in
[moderation](#build-moderation).

If an official build fails, an issue will be opened in the GitHub
repository of the application by an automated account and Flathub admins
will be also be automatically notified so that they can restart or
create a new build. The maintainer can also communicate via that issue.

If no issue was opened or there was some other issue, please ask the
Flathub admins to restart it by [opening an issue](https://github.com/flathub/flathub/issues)
or via [Matrix](https://matrix.to/#/#flathub:matrix.org).

## Large builds

Most builds are done on GitHub actions using the GitHub hosted runners
but the total execution time of the CI is limited by GitHub to 6 hours,
the available memory is limited to around 10-15 G and the available
free space for the build is limited to around 50 G.

Apps that exhaust any of these limits will fail to build and needs to be
sparingly redirected to external runners. Please [open an issue](https://github.com/flathub/flathub/issues)
if you are the maintainer of such an app.

The external runners have a 9 hour timeout, larger free space and
memory.

Once the app is redirected to external runners, [test builds](#test-builds)
need to be manually started by commenting `bot, build`.

## Building locally

To reproduce the build tooling and environment used by Flathub for test
and official builds, use the `org.flatpak.Builder` package to build the
app. The steps are mentioned in detail in the [submission documentation](/docs/for-app-authors/submission#build-and-install).

## Build moderation

Whenever an _official build_ from a merge commit or push is built, if
any [permission](/docs/for-app-authors/requirements#permissions) is
changed or any critical [Appstream field](/docs/for-app-authors/metainfo-guidelines/)
changes value, the build will be held for moderation.

Moderators will manually review the build and the permission change
and can approve or reject the change if it is wrong or ask for more
information.

If it is rejected [flathubbot](https://github.com/flathubbot) will open
an issue in the app repository with a comment from the moderator. The
maintainer of the app is supposed to reply to that and answer any queries
or fix the issues mentioned.

If it is approved it will get automatically published without the
any publish delay.

If the maintainer logged in to the website once, they will get emails
whenever a build is held for moderation or rejected/approved.

## Quality Review

Flathub has several [quality guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines)
which applications can choose to follow if desired.

### Benefits of passing quality checks

Passing the quality checks enhances an application's visibility
on the Flathub homepage. Applications that meet _all_ the checks can be
featured prominently on the weekly banner and "App of the Day"
highlights on a rotational basis. The more guidelines an application
meets, the higher its chances of being featured in the trending section
of flathub.org. Additionally, some Linux distributions and software
centres may use the list of approved apps to curate their own featured
selections.

These benefits may evolve as we explore new ways for enhanced curation
and promotion.

Once an application is published, quality moderators will do a review
of the application's metadata and will mark the checks as passing or
failed. Some of the checks are automated while some are manual.

The maintainer of the application can view the status of the quality
checks by going to `https://flathub.org/apps/your.app.id` and clicking
the "Details" button.

Once a build fixing the quality issues is published, they can request
a re-review by pressing the "Request Review" button.

Feel free to [ask for help](https://github.com/flathub/flathub/issues/new?assignees=&labels=&projects=&template=1-quality-mod.md&title=Quality+guideline+problems+for+%3Capp+name%3E)
regarding the quality checks.

## `flathub.json`

You can create a file called `flathub.json` to control various
parameters of the build infrastructure. The `flathub.json` file should
reside in the toplevel root, next to the Flatpak manifest.

### Limiting the set of architectures to build on

Flathub has builders for `x86_64`, and `aarch64` as current runtimes
(based on Freedesktop.org SDK 20.08 or later) only support `x86_64` and
`aarch64`. By default all applications build on all these. If your
application does not work on some architectures, you can configure it
to skip or build certain architectures.

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

If you build for both `x86_64` and `aarch64` you do not need a
`flathub.json` file. There will be no new architecture add or removed
on current runtimes, which mean that if that situation ever occurred, it
would only happen when changing the runtime version in your package.

## End of life

:::note
Extensions or BaseApps do not need to be EOL or EOL Rebased.
:::

There may come a point where an application is no longer maintained. In
order to inform users at update or install time that it will no longer
get updates, create a `flathub.json` file in manifest root with the
contents below.

Then open a pull request in the Flathub repository of the application and
once the build on the pull request is successful, merge it. If the
application exists on `beta` branch too, the same process needs
to be followed there as well.

```json title="flathub.json"
{
  "end-of-life": "This application is no longer maintained."
}
```

EOL-ing will remove the listing of the application from the
[Flathub website](https://flathub.org/).

## End of life Rebase

:::note
End of life Rebase PR must be merged once the application under the new
ID is published.
:::

If the application has been [renamed](#renaming-the-flatpak-id),
and you wish users to migrate to the new ID, create a `flathub.json`
file in manifest root with the contents below.

Then open a pull request in the Flathub repository of the application and
once the build on the pull request is successful, merge it. If the
application exists on `beta` branch too, the same process needs
to be followed there as well.

Flatpak will prompt the user when updating or installing whether they
want to migrate to the new ID. Any data managed by Flatpak will also
be migrated automatically on entering yes.

```json title="flathub.json"
{
  "end-of-life": "The application has been renamed to the.new.appid.",
  "end-of-life-rebase": "the.new.appid"
}
```

Note, that it is not possible to EOL rebase from one branch to a
different branch, for example, from `beta` to `stable`. The appid
used in `end-of-life-rebase` must also be available in the same Flatpak
remote.

In case you want to step down as a maintainer but wish someone to take
over maintenance, you can ask in the [tracker issue](https://github.com/flathub/flathub/issues/3693).

## Download statistics

Flathub publishes download statistics for every app and runtime. The raw
JSON files are available at [flathub.org/stats](https://flathub.org/stats/).
This is also the basis for the data shown on flathub.org.

A new app needs to collect data for a certain period before the
'Statistics' tab becomes available on the app details page. These stats
are merged when an app is [EOL rebased](#end-of-life-rebase).

Additionally there are some community members that generously provide
frontends to interpret the data and make it more useful for app developers
at [https://ahayzen.com/direct/flathub.html](https://ahayzen.com/direct/flathub.html)
and [https://klausenbusk.github.io/flathub-stats/](https://klausenbusk.github.io/flathub-stats/).

## Maintainer access to Flathub application repository

This section applies to application repositories hosted in the
[Flathub](https://github.com/flathub) organisation on GitHub.

The GitHub account [submitting](/docs/for-app-authors/submission#submission-pr)
the application to Flathub along with any upstream developers of the
application (if mentioned by the submitter or at reviewer's discretion)
will be given access to the application repository once created. In case
the application belongs to a well-known vendor like KDE or GNOME or
Endless, their respective [team on Flathub](https://github.com/orgs/flathub/teams/)
will also be given access.

If an existing maintainer wants a trusted member or someone involved with
upstream or the Flathub application repository, to also have access, they
should open an issue on [GitHub](https://github.com/flathub/flathub/issues/new).

An upstream developer or author of the application may also use the same
process as above to request access to the repository.

In case an application becomes unmaintained (and the maintainer unreachable)
for a prolonged period of time and you want to volunteer to start
maintaining it, please open an issue on [GitHub](https://github.com/flathub/flathub/issues).

Any such requests will be judged on a case-by-case basis and upstream
authors/developers/contributors to the application
(or the Flathub repository) in question will be preferred.

## Renaming the Flatpak ID

If at any point, the ID needs to be renamed, the application first needs
to be [resubmitted](/docs/for-app-authors/submission) with the new ID.

The old ID must be added to the `provides` and `replaces` tags of the new
[Metainfo file](/docs/for-app-authors/metainfo-guidelines/#renaming-id-tag).

After the submission is merged and the application is _published_ under
the new ID, the old application should be [EOL rebased](#end-of-life-rebase)
to the new ID so that users can transition smoothly.

Note that, such a transition might be confusing to users. So the decision
to change IDs must be carefully planned and done in moderation.

## Getting Help

If anything is not working or there is some behaviour you don’t
understand, come to the [Matrix channel](https://matrix.to/#/#flatpak:matrix.org)
or start a discussion on the [Flathub forum](https://discourse.flathub.org/).
