// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: 'category',
      label: 'Pengantar',
      items: ['introduction', 'architecture', 'installation'],
    },
    {
      type: 'category',
      label: 'Konsep & Fitur',
      items: ['orm', 'fte', 'global', 'method', 'helper', 'common-function'],
    },
    {
      type: 'category',
      label: 'Penggunaan',
      items: ['usage', 'usage-controller', 'usage-model', 'usage-routing'],
    },
    {
      type: 'category',
      label: 'Latihan',
      items: [
        'example-default',
        'example-database',
        'example-api-echo',
        'example-api-rest',
      ],
    },
    {
      type: 'category',
      label: 'Showcase',
      items: ['showcase', 'gallery'],
    },
    {
      type: 'category',
      label: 'Utilitas',
      items: ['db-explorer', 'json-validator', 'regex-tester', 'reveal-in-finder'],
    },
  ],
};

export default sidebars;
