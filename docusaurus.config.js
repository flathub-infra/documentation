// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Flathub Documentation",
  tagline: "Your Linux desktop apps in one place",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.flathub.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

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
        blog: {
          showReadingTime: true,
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

  plugins: [
    [
      require.resolve("docusaurus-plugin-search-local"),
      {
        hashed: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: "keywords",
          content: "flatpak, flathub, packaging, tool, linux",
        },
      ],
      navbar: {
        title: "Flathub",
        logo: {
          alt: "Flathub Logo",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "for-users/index",
            position: "left",
            label: "For users",
          },
          {
            type: "doc",
            docId: "for-app-authors/index",
            position: "left",
            label: "For app authors",
          },
          {
            type: "doc",
            docId: "for-team-members/index",
            position: "left",
            label: "For team members",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/flathub",
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
                label: "For users",
                to: "docs/for-users",
              },
              {
                label: "For app authors",
                to: "docs/for-app-authors",
              },
              {
                label: "For team members",
                to: "docs/for-team-members",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Matrix",
                href: "https://matrix.to/#/#flathub:matrix.org",
              },
              {
                label: "Mastodon",
                href: "https://fosstodon.org/@FlatpakApps",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/FlatpakApps",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/flathub",
              },
            ],
          },
        ],
        copyright: `Copyright © 2023-${new Date().getFullYear()} Flathub Team. Licensed under Creative Commons Attribution 4.0 International License.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
