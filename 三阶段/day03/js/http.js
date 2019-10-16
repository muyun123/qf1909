let http = require('http');
const querystring = require('querystring');
http.createServer(function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.writeHead(200)
    var d = '';
    request.on('data', function (chunk) {
        d += chunk;
    })
    request.on('end', function () {
        var {
            password,
            username
        } = querystring.parse(d);
        console.log(password, username);
    })
    response.write('hello world123')
    response.end()
}).listen(8001);
console.log('qi');