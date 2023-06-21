# Shared Modules

A small number of dependencies that are frequently used by applications have been collected in the [shared-modules repository](https://github.com/flathub/shared-modules), for use by applications being distributed with flathub. These can be used as a git submodule, like
so:

```bash
git submodule add https://github.com/flathub/shared-modules.git
```

These can be specified from manifest `.json` files, like:

```json
"modules": [
  "shared-modules/SDL/SDL-1.2.15.json",
  {
    "name": "foo"
  }
]
```

You can find more examples in the repository.
