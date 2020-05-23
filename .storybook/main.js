const path = require('path');
module.exports = {
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  stories: ['../**/*.stories.tsx'],
  addons: ['@storybook/preset-typescript', '@storybook/addon-actions', '@storybook/addon-links'],
};
