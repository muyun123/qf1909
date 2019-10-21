//应用模块
var express = require('express');
//创建你服务器应用程序
//也就是原来的http.createSever
var app = express();
//公开指定目录
//只有这样做了，你才能通过/public/js/js.js的方式来访问pulic下的资源
app.use('/public/',express.static('./public/'))
//当服务器收到get请求/的时候，执行回调函数
//基本路由get
app.get('/', function (req, res) {
    res.send('hi')
})
app.get('/about', function (req, res) {
    res.send('hi1')
})
//相当于server.listen
app.listen(3000);
console.log('running');