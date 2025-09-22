# Verification

## What is verification?

Verification is the process by which Flathub and developers confirm that
an app is published by the original developer or an authorized party.

Verification is done by verifying the developer's identity through their
ownership of the domain associated with the app ID.

The methods available for verification depend on the app ID.

## I'm publishing an app on Flathub. How do I get it verified?

If the app was submitted through the Flathub GitHub submission process,
you will need collaborator access to the application repository. Invites
are sent when the submission is accepted, if you don't have access,
please [open an issue](https://github.com/flathub/flathub/issues) asking
for it.

Once you have access [log in to Flathub](https://flathub.org/login). Go
to the "Developer Portal". Click on your app and then click
"Verification". Then follow the instructions shown.

### Website

To verify an app is associated with a specific domain, Flathub uses the
domain from the app ID to look for a well-known URI. For example, an
app ID like `com.example.App` would require verifying ownership of
the `example.com` domain by placing the uniquely generated token at
`https://example.com/.well-known/org.flathub.VerifiedApps.txt`.

The verification token is unique and constant for each app. If multiple
apps needs to be verified under the same domain, include each token on
its own line. Lines beginning with `#` are ignored and can be used as
comments. For example:

```ini
# com.example.App
00000000-aaaa-0000-aaaa-000000000000

# com.example.AnotherApp
aaaaaaaa-0000-aaaa-0000-aaaaaaaaaaaa
```

For convenience and flexibility, verification of the well-known URI will
follow redirects but HTTPS is mandatory.

### Source code hosting site

Apps with IDs indicating supported source code hosting sites like
GitHub, GitLab, GNOME GitLab, and KDE GitLab may be verified by
authenticating with Flathub using an authorized account. The following
app ID prefixes will be matched:

  - **GitHub**: `io.github.`
  - **GitLab**: `io.gitlab.`
  - **GNOME GitLab**: `org.gnome.`
  - **KDE GitLab**: `org.kde.`

For GitHub, the authenticated account must be the owner of the
repository. If the repository is owned by an organization, the account
must be an admin of the organization.

For GitLab, the authenticated account must be the owner of the
repository. If the repository is owned by a group, the account must be
an owner, maintainer, or developer of that group.

For GNOME and KDE apps, additional checks may be performed to ensure the
account is authorized to perform verification for that app.

Apps already on Flathub with a `com.github.` or `com.gitlab.` app ID
prefix may be verified with login provider verification, but no new
apps with these prefixes will be accepted

Official apps from these code hosting platforms like GitHub, GitLab
and others may request manual verification by
[opening an issue](https://github.com/flathub/flathub/issues/new).

### I'd like to verify my app that someone else already published

The first step is to gain ownership over your app; see [Someone else has put my app on Flathub—what do I do?](/docs/for-app-authors/submission#someone-else-has-put-my-app-on-flathubwhat-do-i-do)

### I have an existing app but I cannot verify it due to wrong application ID

In most cases, the application needs to be resubmitted with the correct
application ID. Please read the application ID [requirements](/docs/for-app-authors/requirements#application-id)
carefully and then follow the [resubmition guide](/docs/for-app-authors/maintenance/#renaming-the-flatpak-id)
to resubmit it.

### I have an existing app which follows all application ID rules but website shows the wrong domain

If your application ID follows all the [requirements](/docs/for-app-authors/requirements/#application-id)
but the Flathub website shows an incorrect or unexpected domain for
verification please
[open an issue](https://github.com/flathub-infra/website/issues).

### I published an extension or a runtime, but the website does not show the verification check

Verification is only for applications. Extensions or runtimes are not
supported.
