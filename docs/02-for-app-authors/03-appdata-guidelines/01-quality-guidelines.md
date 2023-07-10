# Quality guidelines

For the quick guidelines for the actual content (descriptions, screenshots), see the Appstream [docs](https://www.freedesktop.org/software/appstream/docs/chap-Quickstart.html).

The following guidelines are optional, but recommended. We will likely promote apps that follow them in certain places.
Therefor `must` is used in the following text, but it's not a requirement, it means that apps not following these guidelines will likely not be promoted.

## General

### No trademark violations

Your app should not violate any trademarks. This includes the name, icon, and summary.

For example, if your app is a Telegram client or web wrapper, it should not be called `Telegram for Linux` or use the official Telegram icon. Instead, it should have its own identity (e.g. `Paper Plane`, with a custom icon). If it's made clear that it's a third party client it can be ok to mention the original service (e.g. `Tally for Plausible`), but in most cases it should be avoided.

:::tip
If you're not sure if your app violates any trademarks, feel free to ask us on [Matrix](https://matrix.to/#/#flathub:matrix.org).
:::

### Managed by app author

Use Flathub verification to indicate that you are the author of the app and that you are managing the app on Flathub.

## App Icon

### Icon size

The icon should be SVG, or a PNG with a size greater or equal to 256x256px. It has to be square.

### Icon ratio

The icon shouldn't fill too much or too little of the canvas. Avoid filling the entire canvas and having the icon touch the edges of the canvas (except with small protruding elements). Similarly, avoid thin shapes that are hard to see.

### Good contrast

The icon should have good contrast on dark and light backgrounds. In particular, avoid single-color glyphs and the like since they can be very hard to see if the background color is similar. Dark colors near the edges are also a problem, since shadows don't help much with contrast on dark backgrounds.

### Not too much detail

The icon should be recognizable at small sizes. Avoid too many tiny details, small text, and generally try and match other well-executed app icons in terms of complexity.

### No baked-in shadows

The icon should not have any baked-in shadows or glows. Both the Flathub website and native stores apply a shadow to all icons, so baked-in shadows result in double shadows or other glitches.

### In line with contemporary styles

The icon should be somewhat in line with the contemporary icon styles (i.e. not look like it hasn't been updated in decades). The [GNOME](https://developer.gnome.org/hig/guidelines/app-icons.html) and [KDE ](https://develop.kde.org/hig/style/icons/colorful/application/) app icon guidelines are examples of the kind of style your icon should align with.

## App Name

### Not too long

The name should ideally be no longer than 15 characters, and must be shorter than 20 characters.

### Just the name

The name should be just the name, without any additional info. For example, don't append what the app does to the name (e.g. "Apostrophe - Markdown Editor"), and use the summary to provide this extra information instead.

### No weird formatting

The name should not have any weird formatting or punctuation. For example, it should not be all-lowercase, all-uppercase, camel case, or contain dashes or periods. Cases where the weird formatting is part of the brand are exempt from this (e.g. "VLC").

## Summary

### Not too long

The summary should ideally be no longer than 35 characters, and must be shorter than 50 characters.

### Not technical

The summary should be understandable by a non-technical person, and not contain any technical terms (e.g. "Chat app written in Rust and GTK4/Libadwaita"). Don't mention the toolkit, programming language, or other implementation details that would not be relevant to a non-developer and explain what the app does for people instead.

### No weird formatting

The summary should not have any weird formatting or punctuation. It shouldn't end with a full stop.

## Description

### Don't repeat the summary

The description should not just repeat or rephrase the summary. The summary is a kind of slogan or advertisement for the app, while the description should go into more detail about the purpose of the app, which features it has, and what makes it unique.

### Not too short

The description should be substantially longer than the summary. Something like 3-6 lines of text at default line widths (around 70 characters) is a good length for most apps, for very large apps up to about 10 lines.

### No super long lists

Avoid feature lists with more than 10 items, they are difficult to scan and make the app store listing unwieldy. Instead, try to group points or use paragraphs instead of bullet points.

## Screenshots

### Multiple screenshots

Apps should have at least two screenshots. For medium complexity apps 3-6 is a good range, for very large apps with lots of screens 6-10 is appropriate. More than 10 is probably too many.

### Just the app window

Use the "window screenshot" feature in your native system screenshot tool to get just the app window and its shadow. Do not include the wallpaper behind the app, or even the entire desktop.

### Take screenshots on Linux

Do not use screenshots taken on other platforms, especially if it's immediately obvious from window controls and the like.

### Not maximized

Don't use screenshot of windows in maximized or fullscreen state, because in these states windows don't have shadows and rounded corners.

### Include window shadow

Screenshots must include the native toolkit shadow. App stores do not add a shadow after the fact and without one screenshots can look glitchy or have low contrast depending on the background.

### Reasonable window size

In order to ensure that text and interface elements are visible scaled-down in the app store UI the window size should be 1000x700 pixels or smaller (2000x1400 for HiDPI).

## Release Notes

### Release notes for every release

Make sure all your releases have release notes, even minor ones.

### Short but informative

Release notes should not be too long, and focus on briefly explaining what changed from a user perspective. 2-3 sentences for medium-sized releases is a good length. For larger releases, avoid endless bullet point lists and rather go with a few paragraphs or a shorter summarized list instead.

### No "bug fixes and performance improvements"

Release notes should include some actual information about what changed rather than just generic boilerplate.
