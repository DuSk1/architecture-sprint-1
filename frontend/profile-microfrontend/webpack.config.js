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
        publicPath: "http://localhost:3004/",
    },

    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "profile-microfrontend",
            filename: "remoteEntry.js",
            exposes: {
                "./EditAvatarPopup": "./src/components/EditAvatarPopup",
                "./EditProfilePopup": "./src/components/EditProfilePopup",
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
