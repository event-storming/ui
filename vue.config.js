module.exports = {
    configureWebpack: {
        devServer: {
            host: 'es2cd.io',
            port: '8080',
            disableHostCheck: true
        }
    },
    "transpileDependencies": [
        "vuetify"
    ],
    "runtimeCompiler": true
    

}