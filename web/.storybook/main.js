const path = require('path');

module.exports = {
  "typescript": { "reactDocgen": false },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next-router",
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  "webpackFinal": async (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve('./'),
      path.resolve(__dirname, "../src"),
      'node_modules'
    ];
    return config;
  },
}