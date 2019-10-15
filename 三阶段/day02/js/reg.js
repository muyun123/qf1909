var fs = require('fs');

function n1() {
    return new Promise((resolve, reject) => {
        fs.readFile('11.js', (err, data) => {
            if (err) throw err;
            resolve(data.toString());
        });
    });
}

function n2(a) {
    return new Promise((resolve, reject) => {
        var str = a.replace(/[/*].+/ig, '');
        var str = str.replace(/\s+/ig, ' ');
        var str = str.replace(/\s+/ig, ' ');
        resolve(str.toString());
    })
}

function n3(b) {
    return new Promise((resolve, reject) => {
        fs.writeFile('11.js', b, (err) => {
            if (err) throw err;
            console.log('文件已被保存');
        });
    })
}
(async () => {
    let a = await n1();
    console.log(a)
    let b = await n2(a);
    let d = await n3(b);
})();