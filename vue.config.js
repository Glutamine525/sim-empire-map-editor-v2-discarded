const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    outputDir: "模拟帝国地图编辑器V2",
    publicPath: "./",
    assetsDir: "static",
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/styles/variables.scss";`,
                // data: `@import "@/element-variables.scss";`,
            },
        },
    },
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
            args[0].title = "模拟帝国地图编辑器V2";
            return args;
        });
    },
    productionSourceMap: false,
    lintOnSave: false,
};
