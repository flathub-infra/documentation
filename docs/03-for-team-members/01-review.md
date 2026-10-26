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

Once the PR ready to be merged you can use the merge command to merge
the submission. The syntax is

```
/merge:<optional target repo default branch, default:master> head=<pr head commit sha, 40 chars> <additional colloborators @foo @baz, default: PR author>

# Examples

/merge head=SHA -> creates 'master'
/merge:beta head=SHA -> creates 'beta'
/merge:24.08 head=SHA -> creates 'branch/24.08'
/merge:24.08 head=SHA @foo @baz -> creates 'branch/24.08', adds PR author, GitHub user 'foo' and 'baz' to colloborators
```
