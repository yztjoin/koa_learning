const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
// 静态资源目录对于相对入口文件index.js的路径
const app = new Koa()

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(static(
  path.join( __dirname,  staticPath)
))


app.listen(3000, () => {
  console.log('我free了 3000')
})