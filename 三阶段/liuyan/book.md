[toc]
# 目录索引
- 文本替换实现
```js
var http = require('http');
var fs = require('fs');
http.createServer((req, res) => {
    fs.readFile('./template.html', function (err, data) {
        res.writeHead(200);
        if (err) {
            res.end('404 no found')
        }
         // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
        //    fs.readdir
        // 2. 如何将得到的文件名和目录名替换到 template.html 中
        //    2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
        //    2.2 根据 files 生成需要的 HTML 内容
        // 只要你做了这两件事儿，那这个问题就解决了
        fs.readdir('./', function (err, files) {
            if (err) {
                return console.log('目录不存在');
            }
             // 2.1 生成需要替换的内容
            var content = '';

            files.forEach((item) => {
                content += `<tr>
                                <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}</a></td>
                                <td class="detailsColumn" data-value="0"></td>
                                <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
                            </tr>`;
            })
            data = data.toString();
            data = data.replace('^_^', content);
            // 3. 发送解析替换过后的响应数据
            res.end(data);
        })

    })

}).listen(3000);
console.log('服务器启动');
```

- 模板实现
    - node 安装art-template插件
    - 用法
```js
var template = require('art-template')
var tplStr = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Document</title>
    </head>
    <body>
    <p>大家好，我叫：{{ name }}</p>
    <p>我今年 {{ age }} 岁了</p>
    <h1>我来自 {{ province }}</h1>
    <p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</p> 
    </body>
    </html>
`
//tplStr中花括号中的值对应下面对象中同名键值的值
 var ret = template.render(tplStr, {
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
      '写代码',
      '唱歌',
      '打游戏'
    ],
    title: '个人信息'
  })
//ret是替换后的data数据
res.end(ret);
```


# 简单留言板
## HTML中的注意点
 - 浏览器收到 HTML 响应内容之后，就要开始从上到下依次解析，
    - 当在解析的过程中，如果发现：
      - link
      - script
      - img
      - iframe
      - video
      - audio
   - 等带有 src 或者 href（link） 属性标签（具有外链的资源）的时候，浏览器会自动对这些资源发起新的请求。
 - 所以：在服务端中，文件中的路径就不要去写相对路径了。
     - 因为这个时候所有的资源都是通过 url 标识来获取的，
      如何获取呢？我们把页面的静态资源（吃手手，js...）放在一个 目录/public/下，通过判断URL是否含有/public/来开放public目录，获取请求的内容；代码如下
```js
http
  .createServer(function (req, res)=>{
      var parseObj = url.parse(req.url, true)
    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    var pathname = parseObj.pathname;
    if (pathname.indexOf('/public/') === 0) {
      // /public/css/main.css
      // /public/js/main.js
      // /public/lib/jquery.js
      // 统一处理：
      //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
      //    所以我们就直接可以把请求路径当作文件路径来直接进行读取
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })
``` 
      所以文件中的请求路径都写成：/public/xxx
      / 在这里就是 url 根路径的意思。
      浏览器在真正发请求的时候会最终把 http://127.0.0.1:3000 拼上
      - 不要再想文件路径了，把所有的路径都想象成 url 地址 

## 表单处理
GET请求
- 将表单的内容通过URL发送来达到提交的效果

>引入url模块var url = require('url')当有请求时我们可以通过url的方法，解析url网址
- 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
>var path = url.parse(req.url, 'true');获取解析出的所有内容

>var pathname = path.pathname;路径(pathname: '/pinglun',)
- 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
>var pathobj = path.query;参数（query: { name: 'dssd', message: 'dsadsad' },）

- 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
- 所以接下来要做的就是：
   1. 获取表单提交的数据 parseObj.query
   2. 将当前时间日期添加到数据对象中，然后存储到数组中
   3. 让用户重定向跳转到首页 /
- 当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了
## 重定向
- 如何通过服务器让客户端重定向？
        1. 状态码设置为 302 临时重定向
            statusCode
        2. 在响应头中通过 Location 告诉客户端往哪儿重定向
            setHeader
- 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
- 所以你就能看到客户端自动跳转了
```js
res.statusCode = 302
res.setHeader('Location', '/')
res.end()
```