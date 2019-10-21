var fs = require('fs');
var http = require('http')
var cheerio = require('cheerio')
http.get('http://www.lmzyw.com/news/?22370.html', (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
        rawData += chunk;
    });
    res.on('end', () => {
        try {
            const parsedData = (rawData);
            $ = cheerio.load(parsedData);
            fs.writeFile('11.html', parsedData, (err) => {})
            console.log($(".titleBox h1").text());
            console.log($("#newsContent").text());
        } catch (e) {
            console.error(e.message);
        }
    });
});