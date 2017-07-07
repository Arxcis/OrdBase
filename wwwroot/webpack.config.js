module.exports = {
    entry: "./startup.js",
    output: {
        path: __dirname + "/bin/",
        filename: "bundle.js"
    },
    module: {
        loaders: [ 
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
};