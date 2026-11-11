# Review

Reviews happen via comments on GitHub PR's where we also have
[labels](https://github.com/flathub/flathub/labels) to make note the
status of a PR which is useful when no actions have happened over a
long period.

## General checklist

- Ensure the domain from the app ID is linked to the submission,
  manually check by going to the website. Check if the domain will allow
  verification on website.
- Ensure submissions meet all the [App Requirements](/docs/for-app-authors/requirements)
- Ensure the applications are functional and do/act what submitter
  claims by using the test builds.
- Check permissions against the [permission requirements](/docs/for-app-authors/requirements#permissions)
  and review [permission assessments](#permission-review).
- Ask authors to fix remaining [linter errors](/docs/for-app-authors/linter#linter-errors)
  or request [linter exceptions](/docs/for-app-authors/linter#exceptions)
  where appropriate. Linter exceptions do not approve permissions.
- Do a test build before merge.
- In general, for the domain `example.com` obtained from the rDNS ID,
  we should verify that the submitter controls the domain or the website
  or in case of community repackages - that the domain is related to
  upstream and the website mentions the app or its authors etc.
- Verify that no user-visible elements of the submission - such as the
  app name or icon in the metainfo or desktop file, violate
  trademarks. Refer to the [requirements](/docs/for-app-authors/requirements#no-trademark-violations).

## Permission review

Open [Permission reviews](https://flathub.org/admin/moderation/permissions)
with a moderator account. The queue shows pending assessments by default.
Use **Outcome** to filter by status and **Include superseded assessments**
to show older assessments.

Open an assessment and review the permission diff, originating pull
request, target branch, destination channel (**Repo**), Flatpak branch,
and decision history.

Superseded and error assessments cannot receive decisions. Follow the
**Superseded by** link to the current assessment, or resolve the
assessment error before deciding.

Choose a decision after reviewing the requested access:

- **Approve** accepts the permissions.
- **Reject** requires a rationale explaining why the access is not
  acceptable.
- **Snooze** defers review for 12 hours, after which the assessment
  returns to the pending queue. The forge outcome remains pending.

The bot posts decision rationale on the pull request, except when
snoozing.

Permission decisions do not approve unrelated moderation requests or
automatically release an existing publication hold. Review held builds
separately.

## Special app-id rules

- `org.gnome` ID is moderated, [this list](https://gitlab.gnome.org/Teams/Releng/AppOrganization/-/blob/main/data/registered-app-ids.yml)
   provides the current applications that are allowed to use it. The
   restriction only applies to the toplevel namespace.
- Apps belonging to a group [here](https://invent.kde.org/explore/groups?page=1)
  are allowed to use `org.kde` IDs. flathub/kde team should be cc-ed
  for `org.kde.` submissions.

## Merge pull requests

Only members of `@flathub/reviewers` can use `/merge`. The `head` value
must be the full 40-character SHA of the current pull request head. The bot
rejects the command if the head changes before the merge.

### New app submissions

Use this command on submission pull requests in `flathub/flathub`:

```text
/merge [branch=<target>] head=<sha> [@collaborator ...]
```

- Apps default to `master`.
- `branch=beta` targets `beta`; `branch=24.08` targets `branch/24.08`.
- For runtime extensions `branch` can be omitted to use the branch declared in
  their manifest: `stable` targets `master`, `beta` targets `beta`, and other
  values target `branch/<branch>`.
- The pull request author is added as a collaborator automatically. Add
  `@user` names to grant access to additional collaborators.

```text
/merge head=<sha>
/merge branch=beta head=<sha>
/merge branch=24.08 head=<sha> @foo @baz
```

### Existing app pull requests

Use this command on pull requests in existing app repositories:

```text
/merge [method=merge|squash|rebase] [force=true|false] head=<sha>
```

The method defaults to `merge` and must be enabled in the repository settings.
Reviewers cannot merge their own app pull requests.

`force` defaults to `false`. Set it to `true` to skip build, permission, and
GitHub branch-protection checks.

```text
/merge force=true head=<sha>
```

### Shared-modules pull requests

Shared-modules uses the same command and options but defaults to `rebase`.
Reviewers can merge their own shared-modules pull requests.

```text
/merge head=<sha>
/merge method=squash head=<sha>
```
