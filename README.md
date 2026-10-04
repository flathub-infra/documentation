# Flathub docs

This site uses [Docusaurus 3](https://docusaurus.io/).

### Prerequisites

Install [Node.js 24 LTS](https://nodejs.org/en/download) and [Yarn Classic 1.x](https://classic.yarnpkg.com/en/docs/install).

### Installation

```
$ yarn install --frozen-lockfile
```

### Local development

```
$ yarn start
```

The development server opens [http://localhost:3000](http://localhost:3000) in
your browser and reloads when you edit files.

To use another port, replace `PORT` with a port number:

```
$ yarn start --port PORT
```

See the [Docusaurus CLI reference](https://docusaurus.io/docs/cli#docusaurus-cli-commands)
for other options.

### Verify changes

Before submitting changes, run:

```
$ yarn typecheck
$ yarn build
```

The production build writes the site to `build/`.
