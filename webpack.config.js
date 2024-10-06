'use strict';

const webpack = require('webpack');
const path = require('path');
const buildWebpackConfig = require('./config/build/buildWebpackConfig');

const paths = {
    src: path.resolve(__dirname),
    build: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.js'),
    html: path.resolve(__dirname, 'public', 'index.html'),
};

// можно вынести в env
const port = 3000;
const mode = 'production'; // development | production
const isDev = mode === 'development';

const options = {
    paths,
    port,
    mode,
    isDev
}

module.exports = buildWebpackConfig(options);
