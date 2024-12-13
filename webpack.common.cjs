/* eslint-disable no-undef */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        app: './src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'BattleShip',
            filename: 'index.html'
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'docs'),
        clean: true,
    },
    optimization: {
        runtimeChunk: "single",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: 'asset/resource',
            },
            {
                test: /\.(png|jpeg|jpg|svg|gif)$/i,
                use: 'asset/resource',
            },
        ],
    },
};