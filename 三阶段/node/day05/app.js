var express = require('express');
var http = require('http');
var app = express();
// app.use((req, res, next) => {
//     next();
// })
app.get('/mine', (req, res) => {
    res.send('hi');
});
http.createServer(app).listen(3000);
console.log('服务器启动');