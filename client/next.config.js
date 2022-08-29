const { version } = require('../package.json');
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n,

  env: {
    appVersion: version,
  },

  images: {
    domains: ['cdn.rxresu.me', 'www.gravatar.com'],
  },

  // Hack to make Tailwind darkMode 'class' strategy with CSS Modules
  // Ref: https://github.com/tailwindlabs/tailwindcss/issues/3258#issuecomment-968368156
  webpack: (config) => {
    const rules = config.module.rules.find((r) => !!r.oneOf);

    rules.oneOf.forEach((loaders) => {
      if (Array.isArray(loaders.use)) {
        loaders.use.forEach((l) => {
          if (typeof l !== 'string' && typeof l.loader === 'string' && /(?<!post)css-loader/.test(l.loader)) {
            if (!l.options.modules) return;
            const { getLocalIdent, ...others } = l.options.modules;

            l.options = {
              ...l.options,
              modules: {
                ...others,
                getLocalIdent: (ctx, localIdentName, localName, options) => {
                  if (localName === 'dark') return localName;

                  return getLocalIdent(ctx, localIdentName, localName, options);
                },
              },
            };
          }
        });
      }
    });

    return config;
  },
};

module.exports = nextConfig;
