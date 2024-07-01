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

1. Build and install:

   ```bash
   flatpak run org.flatpak.Builder --force-clean --sandbox --user --install --install-deps-from=flathub --ccache --mirror-screenshots-url=https://dl.flathub.org/media/ --repo=repo builddir <manifest>
   ```

   If you are using an [extra-data](https://docs.flatpak.org/en/latest/module-sources.html#extra-data) source, please use `flatpak-builder` from your distribution:

   ```bash
   flatpak-builder --force-clean --sandbox --user --install --install-deps-from=flathub --ccache --mirror-screenshots-url=https://dl.flathub.org/media/ --repo=repo builddir <manifest>
   ```

2. Run and test:

   ```bash
   flatpak run <app id>
   ```

3. Please run the [linter](/docs/for-app-authors/linter) once.
   Consult the documentation for explanation of the errors. For certain
   errors you might need an [exception](/docs/for-app-authors/linter#exceptions).

   ```bash
   flatpak run --command=flatpak-builder-lint org.flatpak.Builder manifest <manifest>
   flatpak run --command=flatpak-builder-lint org.flatpak.Builder repo repo
   ```

   Following the above instructions, if you see
   `appstream-screenshots-files-not-found-in-ostree` in errors, you can
   ignore this.

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

Once your pull request has been submitted, it will be reviewed. Note
that all reviewers are volunteers and have the right to reject an
application if it does not meet all guidelines.

Once approved, the reviewers will merge it and a new repository will be
created for your application.

You will receive an invitation to have write access for the repository.
Please make sure to accept it before it expires.

Once you have access, please see the [App Maintenance](/docs/for-app-authors/maintenance)
guide.

## FAQ

### Someone else has put my app on Flathub—what do I do?

Flathub is primarily intended as a service that is used by app developers
to distribute their apps however third party submissions are allowed
as long as the license and any terms do not block it.

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
outlined above or you can also start a topic on the
[Flathub forum](https://discourse.flathub.org/c/requests/5) to find
interested volunteers.

### How long does it take to get submissions reviewed and merged?

There is no definite time limit as all reviewers are volunteers and
are often busy with other Flathub or infrastructure related work.

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

The website should show the app on your authored apps after a while
the _official_ build has been published post merge. You need to have
write access to the Flathub app repository and login to the website.

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
