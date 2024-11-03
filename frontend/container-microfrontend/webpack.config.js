const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
    entry: "./src/index",
    cache: false,

    mode: "development",
    devtool: "source-map",

    optimization: {
        minimize: false,
    },

    output: {
        publicPath: "http://localhost:3000/",
    },

    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "container-microfrontend",
            filename: "remoteEntry.js",
            remotes: {
                "auth-microfrontend": "auth-microfrontend@http://localhost:3001/remoteEntry.js",
                "cards-microfrontend": "cards-microfrontend@http://localhost:3002/remoteEntry.js",
                "like-microfrontend": "like-microfrontend@http://localhost:3003/remoteEntry.js",
                "profile-microfrontend": "profile-microfrontend@http://localhost:3004/remoteEntry.js",
            },
            exposes: {},
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
