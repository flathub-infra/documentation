# Flathub docs

This site uses [Docusaurus 3](https://docusaurus.io/).

### Prerequisites

Install [Node.js 24 LTS](https://nodejs.org/en/download), then enable
[pnpm](https://pnpm.io/) through Corepack. The pnpm version is pinned in `package.json`.

```
$ corepack enable
```

### Installation

```
$ pnpm install --frozen-lockfile
```

### Local development

```
$ pnpm start
```

The development server opens [http://localhost:3000](http://localhost:3000) in
your browser and reloads when you edit files.

To use another port, replace `PORT` with a port number:

```
$ pnpm start --port PORT
```

See the [Docusaurus CLI reference](https://docusaurus.io/docs/cli#docusaurus-cli-commands)
for other options.

### Verify changes

Before submitting changes, run:

```
$ pnpm typecheck
$ pnpm build
```

The production build writes the site to `build/`.
