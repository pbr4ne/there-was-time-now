const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'There Was Time Now',
    }
  },
  publicPath: '/there-was-time-now'
})
