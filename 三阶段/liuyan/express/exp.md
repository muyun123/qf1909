[toc]
# 模块
导出 module.exports = 方法;
    将一个文件里的一个方法导出去
引入 var i = require('方法')
    在文件里接收其他文件导出的方法

- 真正去使用的时候：
    -  导出多个成员：exports.xxx = xxx
    -  导出多个成员也可以：module.exports = {
    -                      }
    -  导出单个成员：module.exports

- 谁来 require 我，谁就得到 module.exports
- 默认在代码的最后有一句：return module.exports
- 一定要记住，最后 return 的是 module.exports
不是 exports，所以你给 exports 重新赋值不管用

# express
原生的http在某些方面不满足我们的开发需求所以我们就需要用框架来加快我们的开发效率
```js
//应用模块
var express = require('express');
//创建你服务器应用程序
//也就是原来的http.createSever
var app = express();
//公开指定目录
//只有这样做了，你才能通过/public/js/js.js的方式来访问pulic下的资源
app.use('/public/',express.static('./public/'))
//当服务器收到get请求/的时候，执行回调函数
app.get('/', function (req, res) {
    res.send('hi')
})
app.get('/about', function (req, res) {
    res.send('hi1')
})
//相当于server.listen
app.listen(3000);
console.log('running');
```
# 基本路由
- 路由器
- 请求方法·请求路径
- 请求处理函数
- get：
- 当你以GET方法请求/的时候，执行对应的处理函数
```
app.get（/'，function（req，res）{
res.send（"Hel1o world！）
}）
```
- post：
- 当你以PoST方法请求/的时候，指定对应的处理函数
```
app.post（"/"，function（req，res）{
res.send（'Got a PosT request’）
}）
```
# 静态资源服务
- 当有请求过来的时候，判断url是否含有第一个参数的字符串
- 当以/public/开头的时候，去./public/目录中找找对应的资源
- 这种方式更容易辨识，推荐这种方式
> app.use（"/public/'，express.static（./public/"））
- 必须是/a/puiblic目录中的资源具体路径
> app.use（"/abc/d/'，express.static（./public/"））
- 当省略第一个参数的时候，则可以通过省略/public的方式来访问
- 这种方式的好处就是可以省略/public/
>app.use（express.static（'./public/"）） 

# 修改完代码自动重启
我们这里可以使用一个第三方命名航工具：nodemon 来帮我们解决频繁修改代码重启服务器问题。
nodemon 是一个基于Node.js开发的一个第三方命令行工具，我们使用的时候需要独立安装：
> npm instal1--global nodemon
安装完毕之后，使用：
```
node app.js
#使用nodemon
nodemon app.js
```
只妻是通过nodenon app.js启动的服务，则它会监视你的文件变化，当文件发生变化的时候，自动帮你重启服务器。|

# 在express中使用art-temlate模板
[art-temlate官方文档](http://aui.github.io/art-template/zh-cn/docs/api.html)
```js
var express=require（'express'）
var app=express（）
//配置使用art-template 模板引擎
//第一个参数，表示，当渲染以.art结尾的文件的时候，使用art-template模板引擎
//express-art-template 是专门用来在Express中把art-template整合到Express中
//虽然外面这里不需要记载 art-template但是也必须安装
//原因就在于express-art-template 依赖了art-template
//app.engine第一个参数决定了你views下的视图文件的后缀，我们习惯是用html文件
app.engine（'html'，require（'express-art-template'））


//Express为Response相应对象提供了一个方法：render
//render方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
//res.render（'html模板名’，{模板数据}）
//第一个参数不能写路径，默认会去项目中的views目录查找该模板文件
//也就是说Express有一个约定：开发人员把所有的视图文件都放到views目录中
//如果想要修改默认的views目录，则可以
//app.set（'views'，render函数的默认路径）
app.get('/admin'，function(req,res）{
res.render('admin/index.html',{
title:'管理系统'
})})
```

# 在Express中获取表单GET请求参数
- Express内置了一个APl，可以直接通过req.query 来获取
>req.query I

# 在Express获取表单POST请求体数据
- 在Express中没有内置获取表单POST请求体的API，这里我们需要使用一个第三方包；body-parser。
安装
>npm install--save body-parser
```js
var express=require('express')
//引包
var bodyparser=require（"body-parser"）
var app=express();
//配盟 body-parser
//只要加入这个配置，则在req 请求对象上会多出来一个属性：body
//也就是说你就可以直接通过req.body来获取表单posT 请求体数据了
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyparser.json)
```
- 使用：
```js
app.use（function（req，res）{
res.setHeader（'Content-Type'，'text/plain')
res.write（'you posted:\n'）
//可以通过req.body 来获取表单posT 请求体数据
res.end（Js0N.stringify(req.body,null,2);
```

# Express路由模块
- 路由文件配置
```js
//Express 提供了一种更好的方式
//专门用来包装路由的
var express=require（'express'）
//创建一个路由容器
var router=express.Router（）
//把路由都挂载到router路由容器中
router.get('/',function(req,res){
})
....
//把router导出
module.exports=router
```
- 主文件使用
```js
//引入模块
var router =require('./router');
//把路由容器挂载到app服务中
app.use(router);
```