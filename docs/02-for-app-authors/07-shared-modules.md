# Shared Modules

A small number of dependencies that are frequently used by applications have been collected in the [shared-modules repository](https://github.com/flathub/shared-modules), for use by applications being distributed with flathub.

These can be used as a git submodule, like so:

```bash
git submodule add https://github.com/flathub/shared-modules.git
```

Then you can use them from your manifest. Here's an example of how to use it with a `.json` manifest:

```json
"modules": [
  "shared-modules/SDL/SDL-1.2.15.json",
  {
    "name": "foo"
  }
]
```

You can find more examples in the repository.
