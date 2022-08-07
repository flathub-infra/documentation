// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Flatpak Documentation",
  tagline: "The future of apps on Linux",
  url: "https://docs.flatpak.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Flatpak Team", // Usually your GitHub org/user name.
  projectName: "flatpak-docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/razzeee/flatpak-docs-docusaurus/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "keywords",
          content: "flatpak, packaging, tool, linux",
        },
      ],
      navbar: {
        title: "Flatpak",
        logo: {
          alt: "Flatpak Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "introduction/index",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/flatpak/flatpak",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs/introduction",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Matrix",
                href: "https://matrix.to/#/#flatpak:matrix.org",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/FlatpakApps",
              },
              {
                label: "Mastodon",
                href: "https://fosstodon.org/@FlatpakApps",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/flatpak/flatpak",
              },
            ],
          },
        ],
        copyright: `Copyright © 2017-${new Date().getFullYear()} Flatpak Team. Licensed under Creative Commons Attribution 4.0 International License.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
