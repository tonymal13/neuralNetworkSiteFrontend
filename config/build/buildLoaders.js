const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildLoaders = (isDev) => {
    const babelLoader = {
        test: /\.(js|jsx)$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
            },
        ],
    };

    const sassLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
        ],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [
        fileLoader,
        babelLoader,
        sassLoader
    ];
};

module.exports = buildLoaders;
