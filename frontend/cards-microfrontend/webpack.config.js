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
        publicPath: "http://localhost:3002/",
    },

    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "cards-microfrontend",
            filename: "remoteEntry.js",
            exposes: {
                "./AddPlacePopup": "./src/components/AddPlacePopup",
                "./ImagePopup": "./src/components/ImagePopup",
                "./Card": "./src/components/Card",
                "./PopupWithForm": "./src/components/PopupWithForm"
            },
            remotes: {
                'like-microfrontend': "like-microfrontend@http://localhost:3003/remoteEntry.js"
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
