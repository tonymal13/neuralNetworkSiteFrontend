const buildLoaders = require('./buildLoaders');
const buildPlugins = require('./buildPlugins');
const buildDevServer = require('./buildDevServer');
const buildResolvers = require('./buildResolvers');

const buildWebpackConfig = (options) => {

    return {
        mode: options.mode,
        resolve: buildResolvers(),
        entry: {
            index: options.paths.entry
        },
        output: {
            path: options.paths.build,
            filename: '[name][contenthash].js',
            clean: true,
            publicPath: '/'
        },
        module: {
            rules: buildLoaders(options.isDev)
        },
        plugins: buildPlugins(options.paths),
        devServer: buildDevServer(options.port)
    }
};

module.exports = buildWebpackConfig;