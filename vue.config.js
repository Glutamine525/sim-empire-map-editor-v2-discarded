module.exports = {
    outputDir: "模拟帝国地图编辑器V2",
    publicPath: "./",
    assetsDir: "static",
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/style/variables.scss";`,
                // data: `@import "@/element-variables.scss";`,
            },
        },
    },
};
