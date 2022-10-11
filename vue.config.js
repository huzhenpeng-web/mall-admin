const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  devServer: {
    // onBeforeSetupMiddleware: require('./mock/index.js'), // 引入mock/index.js
    host: 'localhost',
    port: 8080, // 端口号
    open: true // 启动项目自动打开浏览器
  }
})
