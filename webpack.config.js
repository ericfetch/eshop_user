const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production', // 设置为 production 以优化输出
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'eshopUser.js', // 输出文件名
        path: path.resolve(__dirname, 'dist'), // 输出目录
        library: {
            name: 'EshopUser',
            type: 'umd',
            export: 'default'
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader' // 添加postcss-loader
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({

            filename: 'eshopUser.css' // 输出的CSS文件名


        })
    ],
};