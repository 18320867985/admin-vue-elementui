
module.exports = {
  outputDir: 'templates', // 构建输出目录
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  productionSourceMap: false,
  devServer: {
    port: 8080,
    proxy: {
      // 跨域
      '/': { 
      target: 'http://192.168.1.226:60002',
        changOrigin: true,  // 开启跨域
        ws: true,
        pathRewrite: {
          '^/': '/'
        },
      },
    },
  }
}
