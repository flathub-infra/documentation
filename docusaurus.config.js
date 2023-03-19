// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Flathub Documentation",
  tagline: "Your Linux desktop apps in one place",
  favicon: "img/favicon.svg",

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
            "https://github.com/razzeee/flathub-docs-docusaurus/tree/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/razzeee/flathub-docs-docusaurus/tree/main/",
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
            docId: "/category/for-users",
            position: "left",
            label: "For users",
          },
          {
            type: "doc",
            docId: "/category/for-app-authors",
            position: "left",
            label: "For app authors",
          },
          {
            type: "doc",
            docId: "/category/for-team-members",
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
            title: "Categories",
            items: [
              {
                label: "For users",
                to: "docs/category/for-users",
              },
              {
                label: "For app authors",
                to: "docs/category/for-app-authors",
              },
              {
                label: "For team members",
                to: "docs/category/for-team-members",
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
                label: "Discourse",
                href: "https://discourse.flathub.org/",
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
            title: "Code",
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
