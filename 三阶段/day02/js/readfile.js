let fs = require('fs');
let http = require('http');

function n1() {
    return fs.readFile('./1.txt', (err, data) => {
        if (err) throw err;
        console.log(data.toString());
    });
}

const data = new Uint8Array(Buffer.from('Node.js中文网'));

function n2() {
    return fs.writeFile('1.txt', data, (err) => {
        if (err) throw err;
        console.log('文件已被保存');
    });
}

function n3(param) {
    return new Promise((resolve, reject) => {
        http.request('http://www.qqyewu.com/', (res) => {
            console.log(res);
        });
    })
}
n3();