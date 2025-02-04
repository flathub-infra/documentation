---
slug: flathub-build-infrastructure-revamp
title: What's next for Flathub build infrastructure
authors: [barthalion]
tags: [infrastructure]
---

There is a storm coming and we are re-architecting our build infrastructure.

<!-- truncate -->

Buildbot has never been designed to do what Flathub needs: taking arbitrary inputs like application IDs and dynamically creating new pipelines. However, there's no misuse one cannot achieve if something is being configured in A Real Programming Language, and so, back in 2019, [Alex Larsson][alex] piled a bunch of hacks so we could have not only dynamic configuration based on Flathub organization in GitHub, but also some custom views displaying latest builds.

Fast-forward to 2025, these hacks no longer work with the latest release of Buildbot, rendering our soft fork stuck on a version from 2021. For whatever reason, updating GitHub CI status stopped to work well, allowing people to merge untested code changes. It also requires periodical restarts because it grinds to a halt for no particular reason, dropping new builds in the meantime. The worst offense: I never liked it.

Interlude: Equinix Metal née Packet has been sponsoring our heavy-lifting servers doing actual building for the past 5 years. Unfortunately, they are shutting down, meaning we need to move out by the end of April 2025.

This perfect storm means we need to effectively re-architecture build infrastructure from scratch.

## webhook-proxy

Let's start from improving Buildbot reliability where it falls short. While GitHub shows delivery status of webhook events, and even provides a button to trigger another attempt, there's no public API exposing this data.

As there's no way I'm fixing Buildbot itself, I decided we need a middleman which will take care of redelivering if Buildbot's webhook endpoint responded with non-200 response.

[webhook-proxy][webhook-proxy] is a simple Python service which accepts payloads from GitHub, marks new pull requests as pending CI, then forwards unchanged events to Buildbot. Should Buildbot have a hiccup, it will open a circuit breaker and retry with exponential back off until it eventually succeeds.

It ain't much, but it's honest work.

## justpak

An important piece of the future Buildbot replacement is being agnostic of its CI/CD implementation. The idea is to provide only a business logic service, while actual building is delegated elsewhere. As such, it requires some relatively generic tool to execute tasks instead of maintaining two or more pipeline definitions for whatever is the CI/CD solution of the decade.

After evaluating modern `make` replacements, I settled on [just][just]. It seems simple enough for executing external commands, and has a nifty way of defining recipes with a specific shebang from the get-go, so it's all a single file even when using a mix of Python and Bash.

I copied all build steps done by the Buildbot workers to specific recipes to have a single entry point. Then I started doing back flips with GitHub Actions to see if this is a viable way in the first place; turns out it is, although not without some hurdles.

While GitHub Actions have a native way of executing all steps inside a Docker container, the host running said container is full of bloat and barely has any free disk space. [bbhtt][bbhtt] suggested how to remove unneeded files, which also meant each build step is prefixed with `docker run` as we want to re-use existing [flatpak-builder-lint][flatpak-builder-lint] image instead of meddling with Ubuntu.

Then I went to GNOME GitLab to implement identical pipeline because I have no mouth and I must write YAML. GitLab has its set of quirks but after configuring its runners to stop dropping job output and kindly asking GitLab to stop unconditionally kill jobs whose logs exceeded a certain size, we've got the answer: it will blend!

| Application ID     | Buildbot | GitHub Actions    | GNOME GitLab |
|--------------------|----------|-------------------|--------------|
| Vim                | 4m 29s   | 3m 03s            | 1m 46s       |
| Fractal            | 28m 29s  | 31m 09s           | 23m 37s      |
| QGIS               | 123m 00s | 198m 00s          | 124m 43s     |
| Ungoogled Chromium | 75m 28s  | timed out at 6h | 177m 29s     |

Apps on the smaller size can be safely built on GitHub Actions, but anything larger like Chromium, LibreOffice or KDE runtime will need some special treatment by being routed to GNOME GItLab. It's still not as fast as existing infrastructure is, but it will no longer be existing in a quarter, so there's nothing to be complaining about here. As both GitHub Actions and GitLab CI allow triggering workflows through API, it will be also easy to integrate with some external system.

The work-in-progress repo can be found [here][justpak].

I was initially panicking about replacing aarch64 runners, but it turns out GitHub is providing that since September 2024. Build times are in line with the table above, meaning we are only worried about outliers. I have submitted Flathub to Works on Arm program, and if it gets accepted, we will handle that similarly to x86_64.

## The rest of the owl

It's all cool and dandy, but the crucial part is still missing: a service encapsulating business logic. Buildbot encapsulates starting new builds, figuring out where they should go (Is it a test build? Is it a beta build?), retries for failed builds and managing publishing, all of that with a fancy UI.

There's no punchline here: I'm only starting the legwork to figure out which language and framework to use. If you would like to see something specific implemented, don't hesitate to request it [here][vorarbeiter].

[alex]: https://blogs.gnome.org/alexl/
[webhook-proxy]: https://github.com/flathub-infra/webhook-proxy
[just]: https://just.systems/
[justpak]: https://github.com/barthalion/justpak
[bbhtt]: https://bbhtt.space/about/
[flatpak-builder-lint]: https://github.com/flathub-infra/flatpak-builder-lint
[vorarbeiter]: https://github.com/flathub-infra/vorarbaiter
