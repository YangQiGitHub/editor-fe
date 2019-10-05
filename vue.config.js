module.exports = {
  devServer: {
    proxy: {
      '/test': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true
      },
      '/ajax': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true
      }
    }
  }
}
