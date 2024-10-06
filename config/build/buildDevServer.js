const buildDevServer = (port) => {
    return {
        port: port || 3000,
        open: true, // автоматически открывает в браузере страницу с приложением
        historyApiFallback: true, // чтобы не падало при перезагрузке на маршруте
        hot: true
    };
}

module.exports = buildDevServer;