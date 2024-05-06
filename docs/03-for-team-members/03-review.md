# Review

All submitted applications are reviewed to meet the [App Requirements](/docs/for-app-authors/requirements). These reviews happen via comments on PR’s where we also have [labels](https://github.com/flathub/flathub/labels) to make note the status of a PR which is useful when no actions have happened over a long period.

Once a PR has been reviewed and is ready to be merged you should use the github action on the review repo with the /merge and /merge:beta commands. Any @names after the command will be invited as collaborators to the repository.

If you wish to do this manually you should:

1. Create a new repository matching the application-id under the
   [flathub](https://github.com/flathub) organization
2. Push their latest commits to it (optionally rebase the commits)
3. In _Settings > Branches_ mark `master` as protected to preserve history
4. Add the author of the PR in _Settings > Collaborators & Teams > Collaborators_
5. Close the PR linking to this new repository


## Links

- `org.gnome` ID is moderated, [this list](https://gitlab.gnome.org/Teams/Releng/AppOrganization/-/blob/main/data/registered-app-ids.yml) provides the current applications that are allowed to
use it. (Note, that Flathub hosts some third party apps using that id for historical reasons but no new apps should be accepted if it isn't on that list).
- Apps belonging to a group [here](https://invent.kde.org/explore/groups?page=1) are allowed to use `org.kde` IDs.
