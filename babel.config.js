const plugins = [];
if (process.env.NODE_ENV === 'test') plugins.push('istanbul');

module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: {
            edge: '17',
            firefox: '60',
            chrome: '67',
            safari: '11.1',
          },
        },
      ],
    ],
    plugins,
  };
};
