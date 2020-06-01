
const withSass = require("@zeit/next-sass");
const withCSS = require('@zeit/next-css')

const nextConfig = {
    target: 'server',
}

module.exports = withPlugin([
    [
        withSass, {
            cssModules: true,
            cssLoaderOptions: {
                localIdentName: "[local]___[hash:base64:5]",
            }
        }
    ], [
        withCss,{
            cssModules: false
        }
    ],
], nextConfig);