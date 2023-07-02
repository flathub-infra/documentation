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

The icon shouldn't fill less than 90% of the canvas or touch the edges.

### Good contrast

The icon should have good contrast on dark and light backgrounds. In particular, avoid single-color glyphs and the like since they can be very hard to see if the background color is similar. Dark colors near the edges are also a problem, since shadows don't help much with contrast on dark backgrounds.

### Not too much detail

The icon should be recognizable at small sizes. Avoid too many tiny details, small text, and generally try and match other well-executed app icons in terms of complexity.

### No baked-in shadows

The icon should not have any baked-in shadows or glows. Both the Flathub website and native stores apply a shadow to all icons, so baked-in shadows result in double shadows or other glitches.

### In line with style

The icon should be somewhat in line with the contemporary icon styles (i.e. not look like it hasn't been updated in decades). The [GNOME](https://developer.gnome.org/hig/guidelines/app-icons.html) and [KDE ](https://develop.kde.org/hig/style/icons/colorful/application/) app icon guidelines are examples of the kind of style your icon should align with.

## App Name

### Not too long

The name should ideally be no longer than 15 characters, and must be shorter than 20 characters.

### Just the name

The name should be just the name, without any additional info. For example, don't append what the app does to the name (e.g. "Apostrophe - Markdown Editor"), and use the summary to provide this extra information instead.

### No weird formatting

The name should not have any weird formatting or punctuation.

## Summary

### Not too long

The summary should ideally be no longer than 35 characters, and must be shorter than 50 characters.

### Not technical

The summary should be understandable by a non-technical person, and not contain any technical terms (e.g. "Chat app written in Rust and GTK4/Libadwaita"). Don't mention the toolkit, programming language, or other implementation details that would not be relevant to a non-developer and explain what the app does for people instead.

### No weird formatting

The summary should not have any weird formatting or punctuation. It shouldn't end with a full stop.
