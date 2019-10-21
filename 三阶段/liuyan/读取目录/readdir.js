var fs = require('fs');
fs.readdir('D:\qianfeng\qf1909\三阶段\liuyan', function (err, files) {
    if (err) {
        return console.log('目录不存在');
    } else {
        console.log(files);
    }
})