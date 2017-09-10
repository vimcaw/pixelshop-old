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
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            /*
                            html-loader接受attrs参数, 表示什么标签的什么属性需要调用webpack的loader进行打包.
                            比如<img>标签的src属性, webpack会把<img>引用的图片打包, 然后src的属性值替换为打包后的路径.
                            使用什么loader代码, 同样是在module.rules定义中使用匹配的规则.

                            如果html-loader不指定attrs参数, 默认值是img:src, 意味着会默认打包<img>标签的图片.
                            这里我们加上<link>标签的href属性, 用来打包入口index.html引入的favicon.png文件.
                            */
                            attrs: ['img:src', 'link:href']
                        }
                    }
                ]
            },
            {
                /*
                匹配favicon.png
                上面的html-loader会把入口index.html引用的favicon.png图标文件解析出来进行打包
                打包规则就按照这里指定的loader执行
                */
                test: /favicon\.png$/,
                use: [
                    {
                        // 使用file-loader
                        loader: 'file-loader',
                        options: {
                            /*
                            name: 指定文件输出名
                            [name]是源文件名, 不包含后缀. [ext]为后缀. [hash]为源文件的hash值,
                            这里我们保持文件名, 在后面跟上hash, 防止浏览器读取过期的缓存文件.
                            */
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            },

            // 图片文件的加载配置增加一个exclude参数
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,

                // 排除favicon.png, 因为它已经由上面的loader处理了. 如果不排除掉, 它会被这个loader再处理一遍
                exclude: /favicon\.png$/,

                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader'],
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
};