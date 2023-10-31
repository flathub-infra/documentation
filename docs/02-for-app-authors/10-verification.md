# Verification

## What is verification?

Verification is a process by which Flathub can confirm that an app is published by its original developer or a third party approved by the developer. This is done by verifying the developer's identity using a link to their website or to their account on a source code hosting site. The methods available for verification depend on the app ID.

## I'm publishing an app on Flathub. How do I get it verified?

First, [log in to Flathub](https://www.flathub.org/login). Go to the developer tab, if you're not already there. Click the "Developer Settings" button under the app you want to verify. At the top of the page, find the "Setup Verification" section. The instructions there will walk you through the verification process.

### Website

To verify an app is associated with a specific website, Flathub uses the app ID in reverse domain name notation to look for a well-known URI. For example, an app ID `com.example.App` would require verifying the `example.com` domain with a response at `https://example.com/.well-known/org.flathub.VerifiedApps.txt` containing the unique code provided by the Flathub website during the verification process.

For convenience and flexibility, verification of the well-known URI will follow redirects.

### Source code hosting site

Apps with IDs indicating supported source code hosting sites like GitHub, GitLab, GNOME GitLab, and KDE GitLab may be verified by authenticating with Flathub using an authorized account. The following app ID prefixes will be matched:
  
  - **GitHub**: `io.github.`
  - **GitLab**: `io.gitlab.`
  - **GNOME GitLab**: `org.gnome.`
  - **KDE GitLab**: `org.kde.`

For GitHub, the authenticated account must be the owner of the repository. If the repository is owned by an organization, the account must be an admin of the organization.

For GitLab, the authenticated account must be the owner of the repository. If the repository is owned by a group, the account must be an owner, maintainer, or developer of that group.

For GNOME and KDE apps, additional checks may be performed to ensure the account is authorized to perform verification for that app.

Apps already on Flathub with a `com.github.` or `com.gitlab.` app ID prefix may be verified, but **no new apps with these prefixes will be verified**; instead, apps should use `io.github.` or `io.gitlab.` to distinguish them from official apps from GitHub or GitLab. Official apps from GitHub and GitLab may request manual verification by contacting [the Flathub admins](mailto:flathub@lists.freedesktop.org).

### I'd like to verify my app that someone else already published

The first step is to gain ownership over your app; see [Someone else has put my app on Flathub—what do I do?](submission#someone-else-has-put-my-app-on-flathubwhat-do-i-do)
