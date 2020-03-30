module.exports = {
  title: 'Reactive Resume',
  description:
    "A one-of-a-kind resume builder that's not out to get your data. Completely secure, customizable, portable, open-source and free forever.",
  themeConfig: {
    logo: '/logo.png',
    repo: 'AmruthPillai/Reactive-Resume',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Go to App', link: 'https://rxresu.me/' },
    ],
    sidebar: [
      '/',
      '/features/',
      '/templates/',
      '/technology/',
      '/contributing/',
      '/translation/',
      '/building-from-source/',
      '/deployment/',
      '/changelog/',
    ],
    smoothScroll: true,
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-161860275-1',
      },
    ],
  ],
};
