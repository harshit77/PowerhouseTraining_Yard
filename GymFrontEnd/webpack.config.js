const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path=require('path');
module.exports={
    entry:'./src/index.js',
    output: {
        path: path.resolve(__dirname,'public'),
        filename: "bundle.js",
        publicPath: "/"
      },
      devServer: {
        hot: true, // enable HMR on the server
        port: 9000,
        contentBase: path.resolve(__dirname, 'public'),
        host:'0.0.0.0',
        useLocalIp:true,
        overlay:true,
        historyApiFallback:true,
        compress:true,
        open:true, // match the output path
        publicPath: '/'// match the output `publicPath`
      },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use:['babel-loader']
          },
         
          {
            test: /\.(png|jpg|jpeg)$/i,
            use: 'file-loader',
          },
          
          {
            test: /\.css$/,
             use: ExtractTextPlugin.extract(
              {
                fallback: "style-loader",
                use: ["css-loader"]
              }
            )
          }
        ]
            
      },
      plugins: [
        new HtmlWebpackPlugin({
            title:"Maui",
            filename:"index.html",
            template:"indexTemplate.html",
            hash:true,
            minify:{
                collapseWhitespace:true
            }
        }),
        new ExtractTextPlugin("style.bundle.css"),
        new webpack.HotModuleReplacementPlugin()
      ]
}