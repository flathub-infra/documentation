# Flathub docs

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

You can access it on [http://localhost:3000](http://localhost:3000) then.

If port 3000 is already in use and you see an error, use

```
$ yarn start --port PORT
```

to start it on a different port. See the [Docusaurus manual](https://docusaurus.io/docs/cli#docusaurus-cli-commands)
for other arguments available.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### External link checks

The [External links workflow](.github/workflows/external-links.yml) runs every
Monday at 07:23 UTC and supports manual runs through **Actions > External links >
Run workflow**. It must reach the default branch to activate scheduled runs and
the manual run button. Scheduled runs use that branch; PRs and pushes do not
trigger this workflow.

Lychee checks external HTTP(S) URLs in `docs/` and `blog/`, including author YAML.
It skips assets, internal links, mail addresses and code examples. It checks
reachability, not external fragments or the rendered site.

Retryable failures, such as timeouts and HTTP 429, get up to three retries,
starting with a five-second wait. Each request has a 30-second timeout.
Unresolved failures fail the job. Results stay in Actions logs and the Markdown
`external-links-report` artifact, retained for 14 days; no issues or comments
are created. Setup failures or job timeouts may leave no report.

For the same local check, install the pinned
[lychee 0.24.2](https://github.com/lycheeverse/lychee/releases/tag/lychee-v0.24.2)
and run from the repository root:

```sh
lychee --config .github/lychee.toml --verbose --no-progress docs/ blog/
```

[`.github/lychee.toml`](.github/lychee.toml) documents exclusions for localhost,
loopback IPs, reserved example domains and two fictional project URLs. Add
`--dump` to inspect selected URLs without requests. Before excluding a failure,
retry to rule out outages or bot protection and fix stale links where possible.
Use narrow, anchored URL regexes in single-quoted TOML strings, with comments
explaining the reason and source document. Remove obsolete entries; avoid
whole real-host exclusions or accepting error statuses. See the upstream
[configuration example](https://github.com/lycheeverse/lychee/blob/lychee-v0.24.2/lychee.example.toml).
