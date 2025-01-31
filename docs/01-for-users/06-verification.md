# Verified apps

## What is a verified app?

A verified app on Flathub is one whose developer has confirmed their
ownership of the app ID using a uniquely generated token. This usually
also may mean that either the app is maintained directly by the
developer or a party authorised or approved by them.

[More information for developers →](../02-for-app-authors/10-verification.md)

## Why are some apps not verified?

Some apps are published on Flathub by the community or third parties
and not directly maintained by the original developer. This means such
apps are not eligible for verification.

## How do I know if an app is verified?

Apps will have a blue tick on the Flathub app page indicating they are
verified.

## I only want to install verified apps. How do I do that?

You can use the `--subset=verified` option when adding the Flathub
remote. This will only add the verified apps to your local repository.

```bash
flatpak remote-add --if-not-exists --subset=verified flathub-verified https://flathub.org/repo/flathub.flatpakrepo
```

If you wish to revert to the full repository, please see the section on
[removing subsets](/docs/for-users/installation#remove-subsets).
