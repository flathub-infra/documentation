# Submission

App submissions are extremely welcome and the process is straightforward.

## Before submission

Please follow the [requirements](/docs/for-app-authors/requirements) to
ensure that the submission is technically and legally compatible for
Flathub.

It's best practice to make sure your submission correctly builds and runs
locally with Flatpak. This will help you to fix any potential issues and
expedite the review process.

Flathub recommends using [org.flatpak.Builder](https://github.com/flathub/org.flatpak.Builder)
to build the application.

```bash
flatpak install -y flathub org.flatpak.Builder
```

### Build and install

Add the Flathub repo user-wide:

   ```bash
   flatpak remote-add --if-not-exists --user flathub https://dl.flathub.org/repo/flathub.flatpakrepo
   ```

Then build your manifest:

   ```bash
   flatpak run org.flatpak.Builder --force-clean --sandbox --user --install --install-deps-from=flathub --ccache --mirror-screenshots-url=https://dl.flathub.org/media/ --repo=repo builddir <manifest>
   ```

   If you are using an [extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data) source:

   ```bash
   flatpak run org.flatpak.Builder --force-clean --sandbox --user --install-deps-from=flathub --ccache --mirror-screenshots-url=https://dl.flathub.org/media/ --repo=repo builddir <manifest>
   flatpak remote-add --user --no-gpg-verify my-app file://$(pwd)/repo
   flatpak install --user -y my-app $FLATPAK_ID
   ```

### Run and test

   ```bash
   flatpak run <app id>
   ```

### Run the linter

   Please try to run the [linter](/docs/for-app-authors/linter) once
   locally. Consult the documentation for explanation of the errors. For
   certain errors you might need an [exception](/docs/for-app-authors/linter#exceptions).

   :::note
   Some linter errors regarding external icons, screenshots or screenshot
   files may happen in a local build but not on Flathub CI. Those can be
   safely ignored. Feel free to ask for help with any linter issues.
   :::

   ```bash
   flatpak run --command=flatpak-builder-lint org.flatpak.Builder manifest <manifest>
   flatpak run --command=flatpak-builder-lint org.flatpak.Builder repo repo
   ```

Once this is done you can open the submission pull request!

## Submission PR

Flathub submissions are managed through pull requests on GitHub.

1. Fork the [Flathub repository on GitHub](https://github.com/flathub/flathub/fork) with _"Copy the master branch only"_ unchecked.
2. Clone the fork:
   ```bash
   git clone --branch=new-pr git@github.com:your_github_username/flathub.git && cd flathub
   ```
3. Create a new branch with your app’s name:
   ```bash
   git checkout -b your_app_name
   ```
4. Add the [required files](/docs/for-app-authors/requirements#required-files)
   using git, commit them and push.

5. Now open a pull request against the `new-pr` branch on GitHub.
   The title of the PR should be "Add org.example.MyAwesomeApp".

## After submission

Once your pull request has been submitted, it will be reviewed. Reviewers
may post comments and may ask for certain fixes or clarifications. Once
all comments are resolved, a _test_ build can be started on the pull
request by commenting `bot, build $FLATPAK_ID`.

If the test build is successful, the application is tested by installing
and running it. Further feedback may be provided after that.

If the submission is approved, it will be marked as ready and
merged into a new repository under the [Flathub GitHub organisation](https://github.com/flathub/)
by the reviewers at a later time. Once the repository is created, you
will receive an invitation to have write access to it. Please make sure
to accept it before it expires.

Once you have access, please see the [App Maintenance](/docs/for-app-authors/maintenance)
guide.

Note that submissions can be rejected at any stage or recalled post-merge
if it is determined to be not suitable for Flathub or does not meet the
guidelines.

## FAQ

### Someone else has put my app on Flathub—what do I do?

Flathub is primarily intended as a service that is used by app developers
to distribute their apps. However, third party submissions are allowed
as long as the application's license and terms of use (if any) do not block it.

If an application that belongs to you is being distributed without your
consent or involvement, please get in touch by [opening an issue](https://github.com/flathub/flathub/issues/new)
or contacting privately by [email](mailto:admins@flathub.org) so that
the next steps can be discussed.

### There’s an app that I’d like to see on Flathub, but I’m not the developer

If there’s an app that you'd like to be distributed on Flathub, the
best first course of action is to approach the app’s developers and ask
them to submit it. Please remain respectful, patient and courteous when
making such requests.

You can also submit it yourself following the submission process
outlined above, or start a topic on the
[Flathub forum](https://discourse.flathub.org/c/requests/5) to find
interested volunteers.

### How long does it take to get submissions reviewed and merged?

There is no definite time limit as all reviewers are volunteers and
are often busy with other Flathub- or infrastructure-related work.

Merges are also done in batches. So you might have to wait for a while.

### How long does it take to get the build published after merge?

Usually it should be published within 4-5 hours. Sometimes it might be
delayed due to load. You can track the build by going to the
[Buildbot interface](https://flathub.org/builds).

Once published it should show up on the website within a few hours.

### I don't see any screenshots from the test builds-why?

Screenshots don't work from any test builds. If this is a submission, it
will work after the submission is merged and an _official_ build is
created and published.

### I can't see the app in my authored apps on the developer portal-why?

Once the app’s submission has been merged and the _official_ build has been
published, the website should show the app on your authored apps after a short
time.  You need to have write access to the Flathub app repository and log in
to the website.

If it does not work, please press the "Refresh" button [here](https://flathub.org/developer-portal)
and it should show up.

If it still does not work feel free to contact us.

## Getting help

Please don't hesitate to ask for help. General queries can be made on the
[Matrix channel](https://matrix.to/#/#flathub:matrix.org) and on
[Discourse](https://discourse.flathub.org/). Technical queries or
requests can be made through
[issues](https://github.com/flathub/flathub/issues/new). Private matters
can be discussed via [email](mailto:admins@flathub.org).
