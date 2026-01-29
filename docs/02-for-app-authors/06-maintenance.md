# Maintenance

This is a guide on how to maintain an application once it is published
on Flathub. Some familiarity with Git, GitHub and Flatpak is required
to maintain an application.

## Requirements and expectations

_A **maintainer** refers to anyone responsible for maintaining an
application, extension, runtime, or baseapp published on Flathub._

### Understanding limits

Developing and maintaining software can be demanding, and maintainers
may at times face time constraints, burnout, or shifting priorities. In
such cases, they may consider appointing co-maintainers, delegating
responsibilities, or [reaching out to Flathub admins](/docs/for-app-authors/maintenance#getting-help)
for help. Maintainers should also avoid submitting or maintaining more
applications than they can reasonably manage within their capacity.

### Requirements

- Adhere to and comply with the Flathub policies (for example, the
  [requirements](/docs/for-app-authors/requirements)) that were in
  effect at the time their submission was accepted.

### Expectations

None of the expectations outlined below are strict requirements. They
represent best practices intended to support long-term sustainability
and provide a smooth, frictionless experience for everyone. However,
persistent or repeated disregard for these expectations may
influence submission reviews and, in some cases, lead to action being
taken. For example, prolonged absence or an unmaintained state may
result in pull requests being merged or the application being marked
end-of-life (EOL) by a Flathub admin or trusted maintainer.

Current and prospective maintainers on Flathub are expected to:

- Be familiar with Git, GitHub, Flatpak, and `flatpak-builder`.

- Be able to build the application and its dependencies offline using
  `flatpak-builder`.

- Understand the Flathub repository layout and branch structure as
  discussed below.

- Follow the established [update workflow](/docs/for-app-authors/updates#creating-updates)
  which involves submitting updates and other changes via pull requests,
  and merging them only after successful builds and appropriate testing.

- Test the builds produced in pull requests before merging the pull
  request.

- Keep the runtime up to date where feasible, and avoid
  relying on end-of-life (EOL) runtimes in accordance with the
  [runtime support policies](/docs/for-app-authors/runtimes#currently-hosted-runtimes).

- Keep their submission in a functional, well-maintained state and
  be responsive to issues and pull requests.

- Be aware of Flathub policy changes and adapt to them when notified
  or requested.

- Mark the application as [end-of-life (EOL)](/docs/for-app-authors/maintenance#end-of-life)
  if development has ceased or the application is no longer functional.

- Understand that Flathub is largely run and managed by volunteers in
  their free time, and that much of the infrastructure is generously
  donated. Abuse of these resources should be avoided, and there should
  be no expectation of prioritized support or work.

- Stay engaged with the Flathub community through available channels,
  including the [Flathub Discourse](https://discourse.flathub.org/), the
  [Flathub blog](https://docs.flathub.org/blog), and the
  [Flathub Matrix channel](https://matrix.to/#/#flathub:matrix.org).

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

The process is described below.

#### Creating the beta branch

:::important
Please make a pull request first targeting the current default git
branch before creating or pushing the `beta` git branch.
:::

First, create a pull request targeting the current default git branch
(usually `master`) with the changes that will be merged to the future
`beta` git branch.

Say, for example the PR branch is `my-pr-branch`.

```sh
git checkout -b my-pr-branch master

# git add, git commit, git push
# Open PR
```

Once the build is successful, create the `beta` branch locally using
`git` from the previous parent branch (usually `master`):

```sh
git checkout -b beta master
```

Now merge the changes from the PR branch to the newly created `beta`
branch:

```sh
git merge my-pr-branch
```

Finally, push the `beta` branch and it will trigger an official build.

```sh
git push
```

Once pushed, the branch protections on the `beta` branch will be active
and any future change to this branch will have to go through the usual
pull request workflow.

#### Creating new branches for extensions or baseapps

:::important
Please make a pull request first targeting the current default git
branch before creating or pushing the new git branch.
:::

Extensions or baseapps having multiple branches, for example
`branch/22.08, branch/23.08, branch/24.08`, should follow the same
process as above.

First, create a pull request targeting the current default git branch
(say `branch/24.08`) with the changes that will be merged to the future
`branch/25.08` git branch.

Say, for example the PR branch is `my-pr-branch`.

```sh
git checkout -b my-pr-branch branch/24.08

# git add, git commit, git push
# Open PR
```

Once the build is successful, create the `branch/25.08` branch locally
using `git` from the previous parent branch, in this case it is
`branch/24.08`:

```sh
git checkout -b branch/25.08 branch/24.08
```

Now merge the changes from the PR branch to the newly created
`branch/25.08` branch:

```sh
git merge my-pr-branch
```

Finally, push the `branch/25.08` branch and it will trigger an
official build.

```sh
git push
```

Once pushed, the branch protections on this branch will be active and
any future change to this branch will have to go through the usual pull
request workflow.

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
or external medium capacity runners. The total execution time of the CI
and memory/CPU resources are limited in these cases.

Apps that exhaust any of these limits will fail to build and needs to be
sparingly redirected to external runners. Please [open an issue](https://github.com/flathub/flathub/issues)
if you are the maintainer of such an app.

Once the app is redirected to external runners, any further
[test builds](#test-builds) need to be manually started by commenting
`bot, build`.

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

:::warning
Dropping the build for an architecture that already had a version published,
will cause it to remain stuck on that version indefinitely. Please
[open an issue](https://github.com/flathub/flathub/issues/new) and
ask for removal of that architecture.
:::

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

### Default access

The GitHub account [submitting](/docs/for-app-authors/submission#submission-pr)
the application to Flathub along with any upstream developers of the
application (if mentioned by the submitter or at reviewer's discretion)
will be given access to the application repository once created. In case
the application belongs to a well-known vendor like KDE or GNOME or
Endless, their respective [GitHub team on Flathub](https://github.com/orgs/flathub/teams/)
will also be given access.

### Requesting access

If an existing maintainer of the Flatpak, a trusted member/contributor,
or an upstream developer/author of the application wants to request
access for themselves or others, they should [open an issue on GitHub](https://github.com/flathub/flathub/issues/new).

In case an application becomes unmaintained (and/or the current
maintainer(s) unreachable) for a prolonged period of time and someone
wants to volunteer to start maintaining it, they should also
[open an issue on GitHub](https://github.com/flathub/flathub/issues/new).
In this case having some prior contributions either to the upstream
application in question or to Flatpak/Flathub ecosystem is necessary.

### Removing access

If an existing maintainer wishes to step down, adjust access
(for themselves or others), or if the upstream project wants to take
over as the sole maintainer(s), they should also
[open an issue on GitHub](https://github.com/flathub/flathub/issues/new).

### Note

A visible history of contribution or other proof of affiliation may be
requested in order to verify the access request.

Any such requests will be judged on a case-by-case basis and requests
from upstream authors/developers to the application in question will
generally be preferred.

Requests can be granted or denied at the discretion of the Flathub
admins.

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
