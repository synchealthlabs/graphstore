/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'Synchronous Health Health',
    image: '/img/synchealth.svg',
    infoLink: 'https://www.sync.health',
    pinned: true,
  },  {
    caption: 'Domabo',
    image: '/img/domabo.png',
    infoLink: 'http://domabo.com',
    pinned: true,
  }, {
    caption: 'Headlight Studios',
    image: '/img/headlightstudios.svg',
    infoLink: 'https://headlightstudios.com',
    pinned: true,
  },{
    caption: 'Synch Health Labs',
    image: '/img/synchealthlabs.svg',
    infoLink: 'https://join.karla.ai',
    pinned: true,
  }
];
const repoUrl = 'https://github.com/besync/graphstore';
const siteConfig = {
  title: 'GraphStore' /* title for your website */,
  tagline: 'A tiny, observable, persistent, real-time store based on MobX',
  url: 'https://besync.github.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  projectName: 'test-site',
  headerLinks: [
    {doc: 'introduction', label: 'Docs'},
    {doc: 'api-readme', label: 'API'},
    {page: 'help', label: 'Help'},
    {href: repoUrl, label: 'GitHub'} ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/graphstore-wt.svg',
  footerIcon: 'img/graphstore-wt80.svg',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#393939',
    secondaryColor: '#525252',
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Sync Health Labs',
  organizationName: 'besync', // or set an env variable ORGANIZATION_NAME
  projectName: 'graphstore', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/besync/graphstore',
};

module.exports = siteConfig;
