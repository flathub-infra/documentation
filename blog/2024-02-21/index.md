---
slug: improved-build-validation
title: Improved build validation, increased moderation, and the long-awaited switch to libappstream
authors: [barthalion]
tags: [flathub, moderation, linter]
---

Flathub's automatic build validation is more thorough now, and includes checks for issues we previously would have only flagged manually. There is a chance that if your app has been passing the continuous integration checks previously, it will fail now; here's why, and what to do about it.

<!-- truncate -->

If your application no longer passes the build validation stage in either Buildbot (for apps maintained on GitHub) or flat-manager (for direct uploads), make sure to look for specific messages in the log. Explanations for various error messages can be found in [the documentation][1]. If you are interested in running the linter locally or integrating it with your own CI, please refer to [the project page][2].

We have also started moderating all permission changes and some critical MetaInfo changes. For example, if a build adds or removes a static permission (as seen in the `finish-args` array in the manifest) or changes the app’s user-facing name, it will be withheld for manual human review. Reviewers may reject a build and reach out for clarification about the change.

![An example build withheld for manual review](moderation.png)

Flathub has also switched to a modern, well-maintained AppStream library, known as `libappstream`. This enables developers to use all features described in the [AppStream 1.0 specification][3], including specifying supported screen sizes for mobile devices, or video snippets to accompany static screenshots. It also improves the validation of AppStream metadata. Many thanks to [Philip Withnall][4], [Luna Dragon][5] and [Hubert Figuière][6] for their work on this across the Flatpak stack, and [Matthias Klumpp][7] for implementing knobs needed by Flathub in the library itself.

This work has been ongoing since 2021. At one point along the way we briefly switched over to `libappstream`, but had to revert due to unexpected breakage; however, today we are finally ready with all blocking issues addressed! While we were focused on closing the gaps to prevent potentially broken builds from being published, we regret that we failed to provide a heads-up about the coming validation changes. Any future breaking changes will be properly announced on this blog, and going forward we will also inform maintainers of affected apps about required changes in advance.

[1]: https://docs.flathub.org/docs/for-app-authors/linter/
[2]: https://github.com/flathub-infra/flatpak-builder-lint
[3]: https://www.freedesktop.org/software/appstream/docs/
[4]: https://tecnocode.co.uk/
[5]: https://nullrequest.com/
[6]: https://www.figuiere.net/hub/
[7]: https://blog.tenstral.net/
