// const webpack = require('webpack'); 
// // const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

// module.exports = function override(config) { 
// 		const fallback = config.resolve.fallback || {}; 
// 		Object.assign(fallback, {
//       "fs": false,
//       "crypto": false,
//       "path": false
//       }) 
//    config.resolve.fallback = fallback; 
//    config.target = 'node';
//    // config.plugins = (config.plugins || []).concat([ 
//    // 	new NodePolyfillPlugin({
//    //       excludeAliases: ['console', 'buffer'],
//    //     })
//    // ]) 
//    return config; }

const webpack = require('webpack');

module.exports = function override(config) {
    // config.content = (config.content || []).concat(["./src/**/*.{html,js}"])

    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "fs": false,
        "path": false
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}