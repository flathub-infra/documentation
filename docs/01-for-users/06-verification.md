# Verified apps

## What is a verified app?

A verified app is an app that is published on Flathub by its original developer or a third party approved by the developer. Flathub has verified the developer's identity using the app ID and the developer's website or profile on a source code hosting site.

[More information for developers →](../02-for-app-authors/10-verification.md)

## Why are some apps not verified?

Some apps are published on Flathub by third parties that are unaffiliated with the original developer. This is allowed, but such apps are not eligible for verification.

## How do I know if an app is verified?

Some apps have a checkmark on the app page. This means the app is published on Flathub by its original developer or a third party approved by the developer.

## I only want to install verified apps. How do I do that?

You can use the `--subset=verified` option when adding the Flathub remote. This will only add the verified apps to your local repository.

```bash
flatpak remote-add --if-not-exists --subset=verified flathub-verified https://flathub.org/repo/flathub.flatpakrepo
```

If you wish to revert to the full repository, please see the section on
[removing subsets](/docs/for-users/installation#remove-subsets).
