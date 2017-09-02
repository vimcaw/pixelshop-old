let HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src', 'pixelshop.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new ExtractTextPlugin("styles.css")
        // new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf)(\?.*$|$)/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    }
}