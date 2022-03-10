module.exports = (config, ...rest) => {
    return {
        ...config,
        resolve: {
            modules: [
                path.resolve('../../dist/lottie-react.js'),
                {
                    ...config.resolve,
                    symlinks: false
                }
            ],
        }
    }
};