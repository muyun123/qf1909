var fs = require('fs');
var http = require('http')
http.get('http://www.baidu.com', (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });
    res.on('end', () => {
        try {
            const parsedData = (rawData);
            console.log(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
});