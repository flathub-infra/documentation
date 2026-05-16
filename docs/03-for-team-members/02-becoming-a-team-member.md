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

Please note that memberships are entirely voluntary and there are not
any benefits or compensations available currently.

The criteria described here may change in the future without prior
notice, but such changes will generally not be applied retroactively to
existing members.

:::important
Please ensure that at least one approval is obtained before making any
changes to the policies defined here.
:::

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
