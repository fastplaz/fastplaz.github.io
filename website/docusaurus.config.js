// @ts-check
// Docusaurus v3 configuration — https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FastPlaz',
  tagline: 'Aplikasi web native yang cepat, dengan Free Pascal.',
  favicon: 'img/favicon.ico',

  url: 'https://fastplaz.github.io',
  baseUrl: '/',
  // GitHub Pages serves /docs/orm from docs/orm.html, same as the old v1 site.
  trailingSlash: false,

  organizationName: 'fastplaz',
  projectName: 'fastplaz.github.io',
  deploymentBranch: 'master',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    // .md files are parsed as CommonMark (v1-era content uses raw HTML like <br>),
    // .mdx files as MDX.
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'id',
    locales: ['id'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../website-docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/fastplaz/fastplaz.github.io/edit/main/website-docs/',
        },
        blog: {
          blogTitle: 'Release',
          blogDescription: 'Catatan rilis FastPlaz',
          blogSidebarTitle: 'Recent posts',
          showReadingTime: false,
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo-header.png',
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: 'FastPlaz',
        logo: {
          alt: 'FastPlaz',
          src: 'img/logo-header.png',
        },
        items: [
          {type: 'doc', docId: 'introduction', label: 'Docs', position: 'left'},
          {type: 'doc', docId: 'architecture', label: 'MVC', position: 'left'},
          {type: 'doc', docId: 'orm', label: 'ORM', position: 'left'},
          {type: 'doc', docId: 'fte', label: 'FTE', position: 'left'},
          {type: 'doc', docId: 'ai-agent-plane', label: 'Agent Plane', position: 'left'},
          {to: '/help', label: 'Help', position: 'left'},
          {to: '/blog', label: 'Release', position: 'left'},
          {
            href: 'https://github.com/fastplaz/fastplaz',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'FastPlaz Web Framework',
          src: 'img/logo-header.png',
          href: 'https://fastplaz.com',
          width: 170,
        },
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Getting Started', to: '/docs/introduction'},
              {label: 'FastPlaz Theme Engine', to: '/docs/fte'},
              {label: 'AI Agent Plane', to: '/docs/ai-agent-plane'},
              {label: 'Standalone HTTP & CGI', to: '/docs/standalone'},
              {label: 'Contribution', to: '/help'},
            ],
          },
          {
            title: 'Community',
            items: [
              {label: 'User Showcase', to: '/docs/showcase'},
              {label: 'Komunitas Pascal Indonesia', href: 'https://pascal-dev.org'},
              {label: 'Pascal Indonesia on Telegram', href: 'https://t.me/pascalid'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'Blog', to: '/blog'},
              {label: 'fastplaz.com', href: 'https://www.fastplaz.com'},
              {label: 'GitHub', href: 'https://github.com/fastplaz'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} FastPlaz - Built with Docusaurus`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['pascal', 'json', 'bash', 'sql', 'php'],
      },
    }),
};

export default config;
