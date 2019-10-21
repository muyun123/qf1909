//文件模块
var fs = require('fs');
var express = require('express');
var app = express();
app.get('/', (req, res) => {
    res.send('hello word')
})
app.listen(3000);
console.log('runing');