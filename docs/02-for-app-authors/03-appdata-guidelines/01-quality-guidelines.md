# Quality guidelines

For the quick guidelines for the actual content (descriptions, screenshots), see the Appstream [docs](https://www.freedesktop.org/software/appstream/docs/chap-Quickstart.html).

The following guidelines are optional, but recommended. We will likely promote apps that follow them in certain places.

## General

### No trademark violations

Your app must not violate any trademarks. This includes the name, icon, and summary. For example, if your app is a Telegram client or web wrapper, it should not be called "Telegram for Linux" or use the official Telegram icon. Instead, it should have its own identity (e.g. "Paper Plane", with a custom icon). If it's made clear that it's a third party client it can be ok to mention the original service (e.g. "Tally for Plausible"), but in most cases it should be avoided.

### Managed by app author

We recommend to verify your app on Flathub, but it’s not required.

## App Icon

### Icon size

The icon must be SVG, or a PNG with a size greater or equal to 256x256px.

### Icon ratio

The icon shouldn't fill less than 90% of the canvas or touch the edges.

### Good contrast

The icon should have good contrast on dark and light backgrounds. In particular, avoid single-color glyphs and the like since they can be very hard to see if the background color is similar. Dark colors near the edges are also a problem, since shadows don't help much with contrast on dark backgrounds.

### Not too much detail

The icon should be recognizable at small sizes.

### No baked-in shadows

The icon should not have any baked-in shadows or glows. Both the Flathub website and native stores apply a shadow to all icons, so baked-in shadows result in double shadows or other glitches.

### In line with style

The icon should be in line with the contemporary icon style.

## App Name

### Not too long

The name should be shorter then 20 characters.

### Just the name

The name should be just the name, without any additional info.

### No weird formatting

The name should not have any weird formatting or punctuation.

## Summary

### Not too long

The summary should be shorter then 50 characters.

### Not technical

The summary should be understandable by a non-technical person, and not contain any technical terms.

### No weird formatting

The summary should not have any weird formatting or punctuation. It shouldn't end with a full stop.
