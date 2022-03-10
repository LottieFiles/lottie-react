const path = require('path');

/* Allows importing code from other packages in a monorepo. Explanation:
When you use lerna / yarn workspaces to import a package, you create a symlink in node_modules to
that package's location. By default Webpack resolves those symlinks to the package's actual path,
which makes some create-react-app plugins and compilers fail (in prod builds) because you're only
allowed to import things from ./src or from node_modules
 */
const disableSymlinkResolution = {
  plugin: {
    overrideWebpackConfig: ({ webpackConfig }) => {
      webpackConfig.resolve.symlinks = false;
      return webpackConfig;
    },
  },
};

const webpackSingleModulesResolution = {
    configure: {
        resolve: {
            symlinks: false,
            modules: [
                path.resolve('../../dist/lottie-react.js'),
            ],
        },
    },
};

const eslintOff = {
    enable: false
}


module.exports = {
  plugins: [disableSymlinkResolution],
  webpack: webpackSingleModulesResolution,
  eslint: eslintOff
};