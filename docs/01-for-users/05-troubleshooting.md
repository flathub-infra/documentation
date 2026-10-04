# Troubleshooting

If an application fails to start or behaves unexpectedly, collect the
details below before reporting the problem. For slow downloads, see
[Slow connection to Flathub](/docs/for-users/slow-connection).

## Collect terminal output

Find the application's ID on its Flathub page or with:

```bash
flatpak list --app
```

Replace `APP_ID` in the commands below with that ID, for example
`org.gnome.Calculator`. Close the application, then launch it from a
terminal and repeat the steps that trigger the problem:

```bash
flatpak run APP_ID
```

Copy the terminal output, including any error messages. Also collect
the Flatpak version and details of the installed application:

```bash
flatpak --version
flatpak info APP_ID
```

If you have both user and system installations of the application, add
`--user` or `--system` to `flatpak run` and `flatpak info` to select the
one you are testing. See [User vs system install](/docs/for-users/user-vs-system-install).

## Inspect permission overrides

Changes made with Flatseal, desktop settings or `flatpak override` can
affect how an application runs. These commands show its permissions and
any per-user overrides without changing them:

```bash
flatpak info --show-permissions APP_ID
flatpak override --user --show APP_ID
flatpak override --user --show
```

The last command shows global overrides, which apply to all applications.
For a system installation, also check system-wide overrides:

```bash
flatpak override --system --show APP_ID
flatpak override --system --show
```

Save the override output before making changes. If the problem started
after a permission change, undo that specific change and test again.
Avoid granting broad access to your home directory or the host filesystem
as a general fix. See [Modifying default permissions](/docs/for-users/permissions)
for tools and commands. Its reset command removes all overrides for the
specified application and scope, so review them first.

## Check for a post-update regression

Note when the application last worked and when the problem started.
Record the version and commit shown by `flatpak info APP_ID`, along with
any recent application, runtime or system updates. A problem that starts
after an update may be a regression, but the timing alone does not show
which component caused it.

If you need to compare application builds, follow [Downgrading](/docs/for-users/downgrading).
Back up important application data before testing an older version, as
it may not support data written by a newer version. Include whether the
older build works in your report. For a more precise comparison, see
[Bisecting regressions in application builds](/docs/for-users/bisecting).

## Find where to report the problem

- For an application bug, follow "Report an Issue" under "Links" on its
  Flathub page, or use its website. If you have tested another installation,
  mention whether it has the same problem.
- For a problem specific to the Flatpak package, follow "Manifest" under
  "Links" on the application's Flathub page. This opens the packaging
  repository. Open its "Issues" tab to search for existing reports or
  create a new issue.
- If several applications have the same problem, it may involve Flatpak,
  a shared runtime or your desktop. Ask for help on
  [Flathub Discourse](https://discourse.flathub.org/) if you are unsure
  which project should receive the report.

Search for an existing report before opening a new one. Include steps
to reproduce the problem, what you expected, what happened, your Linux
distribution and desktop environment, and the output collected above.
Mention permission changes and any builds you tested. Review logs for
personal information, such as usernames, file paths or access tokens,
before sharing them.
