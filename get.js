/*
 * @Author: your name
 * @Date: 2021-05-26 18:22:03
 * @LastEditTime: 2021-06-01 15:40:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa\index.js
 */
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const Router = require('koa-router')

app.use(async (ctx) => {
  let url = ctx.request.url
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring
  // 从上下文中中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring
  ctx.body = {
    ctx,
    url,
    request,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }

})


app.listen(3005, () => {
  console.log('我跑起来了')
})