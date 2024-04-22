# Installation

Please refer to the Flatpak installation instructions for your distribution over at [flathub.org](https://flathub.org/setup/).

These instructions will also show you how to install the Flathub repository.

## Subsets

In the case, that you only want a specific subset of apps, you can use the `--subset` option when adding the Flathub remote. You will only be able to install apps from the subset you specified.

Only allow `verified` apps, if adding a new remote:

```bash
flatpak remote-add --if-not-exists --subset=verified flathub-verified https://flathub.org/repo/flathub.flatpakrepo
```

Or, if you already have the remote added, you can change the subset:

```bash
flatpak remote-modify --subset=verified flathub
```

The available subsets are:

| Type           | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| verified       | Only allow verified apps                                            |
| floss          | Only allow apps that are free and open source software              |
| verified_floss | Only allow apps that are verified and free and open source software |

### Remove subsets

To remove a subset and return to the unfiltered repository, you can run:

```bash
flatpak remote-modify --subset= flathub
```

Or remove the remote:

```bash
flatpak remote-delete --force flathub
```

and add it again without the subset:

```bash
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```
