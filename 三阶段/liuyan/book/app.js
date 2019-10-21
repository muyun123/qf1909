var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer((req, res) => {
    var path = url.parse(req.url, 'true')
    console.log(path);
    var pathname = path.pathname
    var pathobj = path.query;
    if (pathname === '/') {
        fs.readFile('./view/index.html', (err, data) => {
            if (err) {
                return res.end('404 no found')
            }
            res.end(data);
        })
    } else if (pathname.indexOf('/public/') == 0) {
        fs.readFile('.' + pathname, (err, data) => {
            if (err) {
                return res.end('404 no found')
            }
            res.end(data);
        })
    } else if (pathname === '/post') {
        fs.readFile('./view/post.html', (err, data) => {
            if (err) {
                return res.end('404 no found')
            }
            res.end(data);
        })
    } else if (pathname === '/pinglun') {
        res.end(JSON.stringify(pathobj));

    } else {
        fs.readFile('./view/404.html', (err, data) => {
            if (err) {
                return res.end('404 no found')
            }
            res.end(data);
        })
    }
}).listen(3000);
console.log('服务器启动')