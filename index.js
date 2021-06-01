/*
 * @Author: your name
 * @Date: 2021-05-26 18:22:03
 * @LastEditTime: 2021-06-01 15:27:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa\index.js
 */
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const Router = require('koa-router')

let home = new Router()
let page = new Router()
page.get('/404', async ctx => {
  ctx.body = 'pages 404'
}).get('/helloworld', async (ctx) => {
  ctx.body = 'hello world'
})
home.get('/', async (ctx) => {
  let html = `
<ul>
  <li><a href="/page/helloworld">/page/helloworld</a></li>
  <li><a href="/page/404">/page/404</a></li>
</ul>
`
  ctx.body = html
})
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())


app.use(router.routes()).use(router.allowedMethods())
// app.use(async (ctx) => {
//   let url = ctx.request.url
//   if (url == '/api/test') {
//     ctx.body = require('./router/user')
//   } else {
//     let html = await route(url)
//     ctx.body = html
//   }

// })


app.listen(3005, () => {
  console.log('我跑起来了')
})


/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}      
 */
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, "binary", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route(url) {
  let view = '404.html'
  switch (url) {
    case '/':
      view = 'index.html'
      break
    case '/index':
      view = 'index.html'
      break
    case '/todo':
      view = 'todo.html'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }
  let html = await render(view)
  return html
}