# Becoming a Flathub Team Member

Flathub, as a centralized application repository, relies on a dedicated
team of mainly volunteer contributors to maintain the quality, security,
and consistency of the repository.

These contributors are generally responsible for tasks including, but
not limited to:

* Reviewing new application submissions.
* Reviewing [Build Moderation](/docs/for-app-authors/maintenance#build-moderation)
  requests.
* Performing [Quality Guideline](/docs/for-app-authors/metainfo-guidelines/quality-guidelines)
  reviews for applications.
* Triaging and responding to issues or queries from application
  developers.
* Updating, adopting maintenance of, or contributing to Flatpaks when
  necessary.
* Auditing existing applications to ensure compliance with current
  Flathub guidelines and best practices.

As Flathub continues to grow, expanding the contributor base becomes
important for distributing the workload effectively and improving
sustainability.

While there is no strict requirement, members are generally expected to
remain active in their areas of responsibility, stay up to date with
Flathub policies and announcements, and engage with the community.

Please note that membership is entirely voluntary and there are no
benefits, incentives, or compensations associated with it currently.
Membership is intended for trusted individuals who are willing to
remain active and engaged with the project. If you wish to
contribute, please refer to the contribution areas below.

The criteria described here may change in the future without prior
notice, but such changes will generally not be applied retroactively to
existing members.

:::important
Please ensure that at least one approval is obtained before making any
changes to the policies defined here.
:::

## Contribution Areas

Contributions of all kind is very welcome, and there are no requirements
to participate. Some contribution areas are mentioned below.

### Packaging and app maintenance

:::tip
Please see the [maintenance docs](/docs/for-app-authors/maintenance)
:::

The collection of applications, extensions, and BaseApps on Flathub is
largely maintained by a community of volunteer packagers and
upstream developers. If you are a user of an application or have
experience with packaging, distributions, or software maintenance, you
can contribute by helping maintain existing applications or by adopting
unmaintained ones.

If you are a user you can consider installing [test builds](/docs/for-app-authors/maintenance#test-builds)
and providing feedback to the maintainer before merging.

If a maintainer has limited time or bandwidth to review and submit
updates, you can consider contributing by opening pull requests to the
application's repository. Useful contributions may include updating
the application version, upgrading dependencies and runtimes, fixing
build failures, and addressing other packaging or maintenance issues.

For (semi-)actively maintained applications, please contact the
current maintainer first to determine whether they would like help.

If an application is unmaintained, or if the existing maintainer has
not responded to or reviewed your proposed changes after a reasonable
period of time, you may open an [issue](https://github.com/flathub/flathub/issues)
requesting an admin to review. If the proposed changes are approved,
you may be granted maintainer access to the application.

The same process can be followed to [create new branches](/docs/for-app-authors/maintenance#creating-new-branches-for-extensions-or-baseapps)
of extensions or BaseApps which are often a requirement for an app to
migrate to a newer runtime.

You can consider picking up or submitting in the [shared-modules repo](https://github.com/flathub/shared-modules).

### Localisation

If you are an active translator, you can contribute by helping to
[translate](https://hosted.weblate.org/engage/flathub/) the main Flathub
website to your language.

### Documentation

If you are a user or an existing maintainer on Flathub, you can
contribute by improving the [user](/docs/category/for-users) and
[developer](/docs/category/for-app-authors) documentation on Flathub.

### Community support

You can contribute to the community by helping other users, answering
questions, providing feedback, and sharing tips and tutorials on
[Flathub Discourse](https://discourse.flathub.org/). You can also
provide community support through the
[Matrix channel](https://matrix.to/#/#flathub:matrix.org).

### Submission reviews

If you are familiar with Flathub's submission requirements and review
process, you can help review submissions and ensure they comply with
the [requirements](/docs/for-app-authors/requirements).

### Quality guideline reviews

If you have a design or UI/UX background, you can help developers by
answering their [Quality Guideline](/docs/for-app-authors/metainfo-guidelines/quality-guidelines)
[questions](https://github.com/flathub/flathub/issues?q=is%3Aissue%20state%3Aopen%20label%3Aquality-guidelines).

These contributions often involve reviewing or creating application
icons, providing certain design feedback, or helping improve
[application metadata](/docs/for-app-authors/metainfo-guidelines).

### Code contribution

The entire set of tooling used to run Flathub is available as open
source in the [flathub-infra organisation](https://github.com/flathub-infra).

You can contribute by opening a bug report, tackling an open issue or
fixing a bug you encountered. Some contributions to these projects may
require familiarity with Flatpak, its associated tooling, and various
Flathub workflows and processes.

A list of relevant components is provided below.

* [Flathub website frontend](https://github.com/flathub-infra/website/tree/main/frontend)
  (React, Typescript, NextJS)
* [Flathub website backend](https://github.com/flathub-infra/website/tree/main/backend)
  (Python, FastAPI)
* [Flathub build dispatcher](https://github.com/flathub-infra/vorarbeiter)
  (Python, FastAPI)
* [Flathub build linter](https://github.com/flathub-infra/flatpak-builder-lint)
  (Python)
* [Flatpak external data checker](https://github.com/flathub-infra/flatpak-external-data-checker)
  (Python)

### Other contributions

Flathub also benefits greatly from contributions to upstream projects.
Some relevant projects are listed below.

* [XDG desktop portals](https://flatpak.github.io/xdg-desktop-portal/docs/for-contributors.html)
* [Flatpak](https://github.com/flatpak/flatpak/blob/main/CONTRIBUTING.md)
* [Flatpak Builder](https://github.com/flatpak/flatpak-builder/)
* [Flatpak runtimes](/docs/for-app-authors/runtimes#currently-hosted-runtimes)
* [Flatpak builder tools](https://github.com/flatpak/flatpak-builder-tools)
* [Flatpak GitHub actions](https://github.com/flatpak/flatpak-github-actions)
* [Flatpak documentation](https://docs.flatpak.org/en/latest/)

## Team Membership Process

New membership requests must be sponsored by an existing member who will
open an issue in the [memberships repository](https://github.com/flathub-infra/memberships)
linking relevant activity and/or contributions.

Please note that all requests are evaluated on a case-by-case basis and
may take additional factors into consideration. Requests may also be
denied when necessary.

A request is approved after receiving at least one approval from an
existing member unless it receives two denials, otherwise, the request
will remain open until a conclusion is reached. Approvals or denials
from the member opening the request will not count.

## Membership Criteria

### Reviewer Team

Members in the Reviewer Team are primarily responsible for reviewing,
approving and merging new submissions.

Criteria:

* Past examples of performing a reasonable number of non-trivial new
  submission reviews within the last 3 months of the request.
* Familiarity with Flathub requirements, Flatpak permission system
  and general knowledge about software building and distribution
  practices.

### Trusted Maintainer Team

Members of the Trusted Maintainer Team are granted access to all
Flathub submission repositories, including relevant access to the
developer portal in the website.

They are primarily responsible for assisting with the maintenance and
continuity of Flatpaks in situations where the original maintainer is
unavailable or unresponsive.

Criteria:

* Past experience of maintaining a reasonable number of Flatpaks in the
  Flathub application repositories, within the last 3 months of the
  request.
* Past examples of assisting with package adoption, co-maintenance, or
  maintenance efforts with adherence to proper maintenance practices.
* Familiarity with Flathub requirements, Flatpak permission system,
  general knowledge about software building, distribution
  practices and Flathub-related tooling.

### Build Moderation Team

Members of the Build Moderation Team are responsible for reviewing build
and moderation requests, approving or denying them as appropriate, and
providing clarification or follow-up when developers raise questions.

Criteria:

* Members of any of the above teams are eligible
* Familiarity with Flathub requirements and Flatpak permission system.

### Quality Moderation Team

Members of the Quality Moderation Team are responsible for reviewing
applications for compliance with the
[Quality Guidelines](/docs/for-app-authors/metainfo-guidelines/quality-guidelines)
and responding to clarification requests from application developers.

Criteria:

* General knowledge and awareness about the Linux application ecosystem
* Experience in application design and UI/UX design or research
* Familiarity with Flathub guidelines

### `flathub-infra` repositories

Most of the tooling and infrastructure used by Flathub is maintained in
the `flathub-infra` organisation.

Access to the repositories there is granted based on contributions to
the relevant project for a reasonable period of time through all of
pull requests, reviews, issue triaging, and familiarity with the
associated project and its workflows.

Access may initially be limited to the triage or write permission and
may later be expanded based on requirements and continued maintenance
activity.

### `shared-modules` repository

This repository contains manifests for commonly used Flatpak modules
that can be consumed as a git submodule.

Write access is granted to contributors willing to maintain one or
more modules in the repository and the access may be revoked if the
contributor no longer maintains the relevant modules or if those modules
are removed from the repository. Permissions are granted once the
account is added to the CODEOWNERS file.

### Flathub application repository

Please see [Maintainer access to Flathub application repository](/docs/for-app-authors/maintenance#maintainer-access-to-flathub-application-repository).

## Revocation of Membership

In the event of prolonged inactivity, team membership may be revoked.

Inactivity is defined as the absence of any meaningful activity in the
relevant GitHub repositories or namespaces for a period exceeding one
year.
