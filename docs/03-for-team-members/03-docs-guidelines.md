# Documentation Guidelines

As we expand our documentation and the number of people contributing to it, we should keep in mind the following guidelines. These guidelines will help ensure a consistent voice and style, making the documentation easier to read and understand.

## Capitalization

### Proper Nouns

Capitalization of proper nouns including names of software, upstream projects, etc. should follow the capitalization used by their owners; e.g.:

:::tip This

- Flatpak
- Flathub
- OSTree
- AppStream
- MetaInfo
- GitHub
:::

:::danger Not this

- flatpak
- FlatHub
- ostree
- Appstream
- metainfo
- Github
:::

An exception is when referring to typed commands or code, in which case they should always be written as `code`, e.g.: `flatpak install…`

### Other Terms

Terms like “ID” should always be capitalized unless referring to code, e.g. `id`.

## Regional Spelling

In cases where there are multiple correct spellings depending on regional/country-specific conventions, prefer the upstream project's spelling. If that's not relevant, prefer US-English. For example,

- AppStream catalog
- color

## Common Terms

- We prefer “app” over “application”
- The string added to a website for verification is the “verification token” (not “code”)
- Use “native app store clients” to refer to apps like KDE Discover and GNOME Software
- “MetaInfo” is the data shipped with an app (not “AppData” as that’s the deprecated term)
