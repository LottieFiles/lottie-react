const path = require('path')
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        unsafeAllowModulesOutsideOfSrc : true,
        aliases: {
          '@lottiefiles/react-lottie-player': path.resolve('../../dist/lottie-react.esm.js'),
        }
      }
    }
  ]
};
