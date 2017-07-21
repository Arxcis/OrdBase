// @doc https://medium.com/javascript-training/beginner-s-guide-to-webpack-b1f1a3638460
'use strict';

module.exports = {
  
    entry: {
        "index": "./app/App.js", 
    },

    output: {
        filename: "bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["babel-preset-es2016", "babel-preset-es2017"].map(require.resolve)
                },
            },

            
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    minimize: true,
                    removeComments: true,
                    collapseWhitespace: true,
                }
            },
        ],
    },
    watch: true,

    resolve: {
        modules: ["node_modules", "app", "components", "jslib"],
    },

    // @doc webserver proxy - https://webpack.github.io/docs/webpack-dev-server.html#rewriting-urls-of-proxy-request
    devServer: {
        inline: true,
        port: 8081,
        proxy: {
            "/api/**":  "http://localhost:5000"
        }
    }
}