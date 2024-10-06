const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const buildPlugins = (paths) => {
    return [
        new MiniCSSExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: paths.html
        })
    ]
}

module.exports = buildPlugins;