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
        publicPath: "http://localhost:3001/",
    },

    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "auth-microfrontend",
            filename: "remoteEntry.js",
            exposes: {
                "./InfoTooltip": "./src/components/InfoTooltip",
                "./Login": "./src/components/Login",
                "./Register": "./src/components"
            },
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
