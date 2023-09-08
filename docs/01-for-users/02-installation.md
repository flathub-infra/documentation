# Installation

Please refer to the Flatpak installation instructions for your distribution over at [flathub.org](https://flathub.org/setup/).

These instructions will also show you how to install the Flathub repository.

## Subsets

In the case, that you only want a specific subset of apps, you can use the `--subset` option when adding the Flathub remote. You will only be able to install apps from the subset you specified.

Only allow `verified` apps:

```bash
flatpak remote-add --if-not-exists --subset=verified flathub-verified https://flathub.org/repo/flathub.flatpakrepo
```

The available subsets are:

| Type           | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| verified       | Only allow verified apps                                            |
| floss          | Only allow apps that are free and open source software              |
| verified_floss | Only allow apps that are verified and free and open source software |
