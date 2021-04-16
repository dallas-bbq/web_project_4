const path = require('path');

module.exports = {
    entry: {
        main: "./src/index.js"
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: ""
    },

    mode: 'development',

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        open: true
    },

    module: {
        rules: [
            {
                // a regular expression that searches for all js files
                test: /\.js$/, 
                // all files must be processed by babel-loader
                loader: "babel-loader",
                // exclude the node_modules folder, we don't need to process files in it
                exclude: "/node_modules/"
            }
        ]
    }
};