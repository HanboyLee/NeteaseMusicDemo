const CracoLessPlugin = require('craco-less');
const themes = require('./src/configs/themes');
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: themes,
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    babel: {
        presets: ['@emotion/babel-preset-css-prop'],
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'https://netease-cloud-api-sigma.vercel.app/',
                changeOrigin: true,
                pathRewrite: {
                    // 重写路径: 去掉路径中开头的'/api'
                    '^/api': '',
                },
            },
        },
    },
};
