const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig_Index = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body',
    chunks: ['index']
});
const styleLoader = {
    loader: 'style-loader',
    options: {
        singleton: true
    }
};

module.exports = {
    entry: {
        index: './client/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [styleLoader, 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [styleLoader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff2|ttf|woff|eot)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'client'),
        noInfo: true,
        watchContentBase: true
    },
    plugins: [HtmlWebpackPluginConfig_Index]
};