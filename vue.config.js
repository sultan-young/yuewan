module.exports = {
  lintOnSave: false,
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
