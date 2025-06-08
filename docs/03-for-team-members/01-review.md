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
- Ensure it uses proper permissions, ask to submit linter exceptions
  if needed.
- Do a test build before merge.

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

## Links

- `org.gnome` ID is moderated, [this list](https://gitlab.gnome.org/Teams/Releng/AppOrganization/-/blob/main/data/registered-app-ids.yml)
   provides the current applications that are allowed to use it.
- Apps belonging to a group [here](https://invent.kde.org/explore/groups?page=1)
  are allowed to use `org.kde` IDs.
