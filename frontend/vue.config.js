const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: false,
  productionSourceMap: false,
  parallel: false, // disable multi-process builds to reduce memory
  css: {
    sourceMap: false,
    extract: {
      ignoreOrder: true,
    },
  },
  configureWebpack: {
    // disable JS/CSS minification to reduce memory and build time
    optimization: {
      minimize: false,
    },
  },
  devServer: {
    allowedHosts: "all", 
    host: "0.0.0.0",     
    port: 8080           
  },
  chainWebpack: (config) => {
    // Keep basic vendor splitting but avoid aggressive settings
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    });
  }
});