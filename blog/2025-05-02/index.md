---
slug: vorarbeiter-is-here
title: "Vorarbeiter is here"
authors:
  - barthalion
tags:
  - infrastructure
---

We have replaced Buildbot with a custom service, and we hope you haven't noticed.

<!-- truncate -->

[Vorarbeiter][vorarbeiter] is a German word for "foreman" and a living proof of
my school-related trauma. The new service is a middleman between GitHub and
GitHub Actions. It is happily humming since April 21st, and largely does what
Buildbot did: builds apps, with a sprinkle of publishing logic.

While what happens under the hood is solid, there is no UI yet. Flathub bot
will still inform developers about build status for their pull requests, but
there is little visibility of what happens post-merge.

Additionally, Vorarbeiter no longer allows to manually publish, cancel or
delete builds. The publishing happens every hour regardless of the age of the
build. The previous 3-hour-long delay was too conservative, and barely anyone
was giving a final test for a post-merge builds. Similarly, cancelling builds
doesn't seem as necessary as before. GitHub Actions runners are ephemeral and
new commits on the same branch or pull request will automatically cancel the
previous in-progress build.

Last but not least, because of limitations of the free GitHub Actions runners,
some apps are designated as _large builds_. Large builds take place on machines
provisioned in AWS, boasting faster CPUs and larger disks to accommodate
heavier requirements.

While large builds do not incur costs per se thanks to the generous [AWS
credits for open source projects program][aws], we still want to be mindful of
how much credits we are spending, which is why we don't run large runners all
the time. This is possible thanks to [RunsOn][runson], which handles all the
magic for us. It receives pipeline events from GitHub and provisions new
machines automatically within seconds, and tears them down the moment the build
if finished. This is completely invisible to developers, but is both faster and
more cost-effective, even if we were to pay the bill ourselves.

[vorarbeiter]: https://github.com/flathub-infra/vorarbeiter
[runson]: https://runs-on.com/
[aws]: https://aws.amazon.com/blogs/opensource/aws-promotional-credits-open-source-projects/

