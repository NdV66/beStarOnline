const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig_Index = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body',
    chunks: ['index']
});

//const HtmlWebpackPluginConfig_Index1 = new HtmlWebpackPlugin({
//    template: './client/index_1.html',
//    filename: 'index_1.html',
//    inject: 'body',
//    chunks: ['index1']
//});

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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
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