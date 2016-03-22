var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry : [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        filename: 'app/js/main.js'
    },
    module:{
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015', 'react']
                }
            }

        ]
    }
}
