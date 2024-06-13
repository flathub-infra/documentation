---
slug: linter-restricting-automatic-merge
title: "Linter breaking change: restricting automatic merge"
authors: [barthalion]
tags: [linter]
---

Starting next week, June 17th, the linter will no longer allow enabling
automatic merge for pull requests created by flatpak-external-data-checker,
unless the app uses an extra-data source or has been added to the exceptions list.

<!-- truncate -->

The verified apps utilizing `automerge-flathubbot-prs` before May 28th have
been grandfathered and no explicit action is required from the maintainers. If
your app does not meet these criteria, you can still
[request an exception][excreq] by creating a pull request to the
flatpak-builder-lint repository. Exception requests will be judged on a
case-by-case basis on providing valid reasons.

The `automerge-flathubbot-prs` feature has been introduced back in 2019 to
reduce maintenance overhead of applications dependent on non-redistributable
data. If [an extra-data source][extdatasrc] used by the app disappears because
of an update, the automation would ensure that it is still possible to install
the app, without requiring manual intervention from the maintainers.

Over time, the feature has started to be misused as a general purpose
automation for publishing updates without proper testing. This has led to a
number of issues where apps became broken overnight, which could have been
easily prevented if the update was tested before merging.

[excreq]: https://docs.flathub.org/docs/for-app-authors/linter/#exceptions
[extdatasrc]: https://docs.flatpak.org/en/latest/module-sources.html#extra-data
