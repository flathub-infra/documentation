// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const tailwindPlugin = require("./plugins/tailwind-plugin.cjs");

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

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
  onBrokenAnchors: "throw",

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
          editUrl: "https://github.com/flathub/documentation/tree/main/",
        },
        blog: {
          feedOptions: {
            type: "all",
            xslt: true,
          },
          onInlineAuthors: "throw",
          onUntruncatedBlogPosts: "throw",
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/flathub/documentation/tree/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          lastmod: "date",
          priority: null,
          changefreq: null,
        },
      }),
    ],
  ],

  plugins: [
    tailwindPlugin,
    [
      require.resolve("docusaurus-plugin-search-local"),
      {
        hashed: true,
      },
    ],
    [
      require.resolve("@gabrielcsapo/docusaurus-plugin-matomo"),
      {
        matomoUrl: "https://webstats.gnome.org/",
        siteId: "40",
        siteUrl: "https://docs.flathub.org/",
      },
    ],
    [
      require.resolve("@docusaurus/plugin-client-redirects"),
      {
        redirects: [
          {
            from: "/docs/for-app-authors/maintanance",
            to: "/docs/for-app-authors/maintenance",
          },
          {
            from: "/docs/for-app-authors/appdata-guidelines/quality-guidelines",
            to: "/docs/for-app-authors/metainfo-guidelines/quality-guidelines",
          },
          {
            from: "/docs/for-app-authors/appdata-guidelines",
            to: "/docs/for-app-authors/metainfo-guidelines",
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/card.png",
      colorMode: {
        respectPrefersColorScheme: true,
      },
      metadata: [
        {
          name: "keywords",
          content: "flatpak, flathub, packaging, tool, linux, desktop, apps",
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
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://flathub.org",
            label: "Store",
            position: "right",
          },
          {
            href: "https://github.com/flathub/documentation",
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
                href: "https://floss.social/@flathub",
                rel: "noreferrer me",
              },
            ],
          },
          {
            title: "Code",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/flathub/documentation",
              },
            ],
          },
        ],
        copyright: `Copyright © 2022-${new Date().getFullYear()} Flathub Team. Licensed under Creative Commons Attribution 4.0 International License.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash", "json"],
      },
    }),
};

module.exports = config;
