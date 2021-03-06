const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    hot: false,
    liveReload: false
  },
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'There Was Time Now',
    }
  },
  publicPath: '/there-was-time-now'
})
