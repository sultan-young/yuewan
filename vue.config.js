module.exports = {
  lintOnSave: false,
  publicPath: "",  //混合开发时候需要加此字段变为相对路径
  devServer: {
    port : 8080,  //vue开启的web前端端口
    proxy: {
      '/ajax': {
        target: 'http://localhost:3000/',
        ws : true,
        pathRewrite: {
          '^/ajax': '/ajax'
        }
      }
    }
  }
}
