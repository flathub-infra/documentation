---
slug: linter-restricting-automatic-merge
title: "Linter breaking change: restricting automatic merge"
authors: [barthalion]
tags: [linter]
---

Starting next week, June 17th, the linter will no longer allow enabling
automatic merge for pull requests created by flatpak-external-data-checker,
unless the app uses an extra-data source or has been added to the exceptions list.

The verified apps utilizing `automerge-flathubbot-prs` before May 28th have been
grandfathered and no explicit action is required from the maintainers. If your app
does not meet these criteria, you can still request an exception by creating a
pull request to the flatpak-builder-lint repository.

The `automerge-flathubbot-prs` feature has been introduced back in 2019 to reduce
maintenance overhead of the applications dependent on the non-redistributable data.
If an extra-data used by the app disappears because of an update, the automation
would ensure the app is still possible to install, without requiring manual
intervention from the maintainers.

Over time, the feature has started to be misused as a general purpose automation
for publishing updates without proper testing. This has led to a number of issues
where apps become broken overnight, which could have been easily prevented if the
update was tested before merging.
