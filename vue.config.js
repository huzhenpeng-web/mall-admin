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
    // host: 'localhost',
    port: 8080, // 端口号
    open: true // 启动项目自动打开浏览器
  }
})
