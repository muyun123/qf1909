/*
 * @Description:过滤铭感词，返回字符串
 * @Author: muyun
 * @参数传入要进行过滤的字符串
 */
function guolv(str) {
    var arr = ['艹', '妈', '逼', 'fuck', '草', '操'];
    arr.forEach(function (item) {
        var reg = new RegExp(item, 'gi');
        str = str.replace(reg, '***');
    })
    return str;
}
/*
 * @Description: 将字符串中字符出现的次数放到对象中，返回对象
 * @Author: muyun
 * @
 */
function strobj(str) {
    var obj = {};
    for (var i in str) {
        if (!obj[str[i]]) { //初始化对象有了下标没赋值，为undefined；当str字符第一次出现时初始化为1
            obj[str[i]] = 1;
        } else if (obj[str[i]]) { //对象中都有值时，str字符第二次出现时执行这里加1
            obj[str[i]] += 1;
        }
    };
    return obj;
}
/*
 * @Description: 字符串去重，返回字符串
 * @Author:muyun
 */
function quchong(str) {
    var str1 = '';
    for (var i in str) {
        if (str1.indexOf(str[i]) < 0) {
            str1 += str[i];
        }
    }
    return str1;
}
/*
 * @Description: 当数字为0~9时在前面补零，返回字符串
 * @Author:muyun
 */
function addzero(num) {
    if (num < 10) {
        return '' + '0' + num;
    } else {
        return '' + num;
    }
}
/*
 * @Description: 将毫秒转化为秒，分，时，天，放到对象中返回
 * @Author:muyun
 * @传入毫秒数
 */
function mschange(num) {
    var num1 = parseInt(num / 1000);
    var miao = parseInt(num1 % 60); //秒
    var minute = parseInt((num1 / 60) % 60); //分  取整数部分单位为分钟，那么他的余数单位也是分钟
    var hour = parseInt((num1 / 60 / 60) % 24); //小时
    var day = parseInt(num1 / 60 / 60 / 24); //天
    return {
        'miao': miao,
        'minute': minute,
        'hour': hour,
        'day': day
    }
}
/*
 * @Description: 将时间戳转化为年，月，日，时，分，秒
 * @Author:muyun
 * @传入毫秒数
 */
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}
/*
 * @Description: 将对象的属性下标=属性值在用&拼接成一条字符串
 * @Author:muyun
 * @参数一，对象
 * @参数二、网址
 */

function objToStr(obj, url) {
    var str = '';
    if (url) {
        str += url + '?';
    }
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    }
    return str.slice(1)
}

function objtostr(obj) {
    var str = '';
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    }
    return str;
}

/*
 * @Description: 将地址栏的参数部分转换成对象
 * @Author:muyun
 * @传入带参的网址
 */

function strToobj(str) {
    var arr = str.split('&');
    console.log(arr);
    var obj = {};
    arr.forEach(function (item) {
        var arr1 = item.split('=');
        obj[arr1[0]] = arr1[1];
    });
    console.log(obj);
}
/*
 * @Description: 将字符串转成数组
 * @Author:muyun
 * @参数一：字符串
 * @参数二：可选，以什么符号为切割点
 */
function strToarr(str, fu) {
    if (fu) {
        var arr = str.split(fu);
    } else {
        var arr = str.split(',');
    }
    return arr;
}
/*
 * @Description: 获取节点的下一个第一子元素节点
 * @Author:muyun
 */
function firstchildr(ele) {
    if (ele.firstElementChild) {
        return ele.firstElementChild;
    } else {
        return ele.firstchildr;
    }
}
/*
 * @Description:获取节点的最后的子元素节点(兼容ie)
 * @Author:muyun
 */
function lastchildr(ele) {
    if (ele.lastElementChild) {
        return ele.lastElementChild;
    } else {
        return ele.lastchildr;
    }
}
/*
 * @Description: 获取下一个兄弟元素节点
 * @Author:muyun
 */
function nextSibling(ele) {
    if (ele.nextElementSling) {
        return ele.nextElementSling;
    } else {
        return ele.nextSibling;
    }
}
/*
 * @Description: 获取上一个兄弟的节点，参数当前节点，兼容IE
 * @Author:muyun
 */
function previousSibling(ele) {
    if (ele.firstElementChild) {
        return ele.previousElementSiblng;
    } else {
        return ele.previousSibling;
    }
}
/*
 * @Description: 获取CSS样式或设置CSS样式兼容IE
 * @Author:muyun
 * @参数一；元素
 * @参数二：属性
 * @参数三：（ 可选） 属性值
 */
function css() {
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(arguments[0], false)) {
            //标准浏览器
            var attr = arguments[1];
            return getComputedStyle(arguments[0], false)[attr];
        } else {
            //ie8-
            var attr = arguments[1];
            return arguments[0].currentStyle[attr];
        }
    } else if (arguments.length == 3) {
        //设置样式 box.style.display = 'none'
        var attr = arguments[1];
        arguments[0].style[attr] = arguments[2];
    }
}
/*
 * @Description: 正则验证
 * @Author:muyun
 */
var checkReg = {
    url: function (str) { //验证网址
        var reg = /^(https:\/\/)?(www.)?[a-zA-Z0-9]+.\w+$/;
        return reg.test(str);
    },
    days: function (str) { //验证日期
        var reg = /^(\d{4})(\-)(\d{2})(\-)(\d{2})$/;
        return reg.test(str);
    },
    email: function (str) { //验证邮箱
        var reg = /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/;
        return reg.test(str);
    },
    identity: function (str) { //验证身份证
        var reg =
            /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        return reg.test(str);
    },
    phone: function (str) { //验证手机号
        var reg = /^1[3-9]\b{9}$/;
        return reg.test(str);
    },
    password: function (str) { //验证密码
        var reg = /^[0-9a-zA-Z!@#$^]{6,18}$/;
        return reg.test(str);
    },
    chinese: function (str) { //验证中文
        var reg = /^[\u4e00-\u9fa5]+$/;
        return reg.test(str);
    }
};
/*
 * @Description: 阻止系统默认行为
 * @Author:muyun
 * @Date: 2019-07-23 15:21:00
 * @LastEditTime: 2019-07-23 16:10:27
 * @LastEditors: Please set LastEditors
 */
// var el = window.document.getElementById("a");
// el.onclick = function (e) {
//     //如果提供了事件对象，则这是一个非IE浏览器
//     if (e && e.preventDefault) {
//         //阻止默认浏览器动作(W3C)
//         e.preventDefault();
//     } else {
//         //IE中阻止函数器默认动作的方式
//         window.event.returnValue = false;
//         return false;
//     }
// }
/*
 * @Description: 阻止事件冒泡
 * @Author:muyun
 */
function stopEventBubble(event) {
    var e = event || window.event;
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}
/*
 * @Description: 事件监听器
 * @Author:muyun
 * @参数一：ele元素
 * @参数二：type事件
 * @参数3：fn回调
 */
function bind(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else {
        ele.addEventListener('on' + type, fn);
    }
}
/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */
function startMove(obj, json, fnend) {
    clearInterval(obj.timer); //防止定时器叠加
    obj.timer = setInterval(function () {
        var istrue = true;
        //1.获取属性名，获取键名：属性名->初始值
        for (var key in json) { //key:键名   json[key] :键值
            //			console.log(key); //width heigth opacity
            var cur = 0; //存初始值

            if (key == 'opacity') { //初始值
                cur = css(obj, key) * 100; //透明度
            } else {
                cur = parseInt(css(obj, key)); // 300px  300  width heigth borderwidth px为单位的
            }
            //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
            //距离越大，速度越大,下面的公式具备方向
            var speed = (json[key] - cur) / 6; //出现小数
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动
            //保证上一个属性全部都达到目标值了
            if (cur != json[key]) { //width 200 heigth 400
                istrue = false; //如果没有达到目标值，开关false
            } else {
                istrue = true; //true true
            }
            //3、运动
            if (key == 'opacity') {
                obj.style.opacity = (cur + speed) / 100; //0-1
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')'; //0-100
            } else {
                obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
            }
        }
        //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
        if (istrue) { //如果为true,证明以上属性都达到目标值了
            clearInterval(obj.timer);
            if (fnend) { //可选参数的由来
                fnend();
            }
        }
    }, 30); //obj.timer 每个对象都有自己定时器
}

/*
           仿jq的ajax封装：
               ajax({
                   type : 'get', 必填
                   url : 接口,必填
                   data : { //选填
                       name ：'蛋黄酥',
                       price : '39.9'
                   },
                   asyn : true,可选
                   succ : function(str) {
                       //成功的回调
                   },
                   ereo : function(status) {//可选的
                       //失败的回调
                   }

               });
       */


function ajax(opt) {
    let defaultObj = {
        data: '',
        reway: true,
        ereo: null
    };
    Object.assign(defaultObj, opt);
    var xhr = new XMLHttpRequest();
    if (defaultObj.type.toLowerCase() == 'get') {
        if (defaultObj.data) {
            defaultObj.url = defaultObj.url + '?' + objtostr(defaultObj.data);
        }
        xhr.open('get', defaultObj.url, defaultObj.reway);
        xhr.send(null);
    } else {

        var url = objtostr(defaultObj.data);
        xhr.open('post', defaultObj.url, defaultObj.reway);
        xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded");
        xhr.send(url);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                defaultObj.succ(xhr.responseText);
            } else {
                defaultObj.ereo(xhr.status);
            }

        }
    }
}
//
//获取cookie
function getcookie(key) {
    let str = document.cookie; //username=admin; age=18
    let arr = str.split('; ');
    for (let item of arr) {
        let arr2 = item.split('=');
        if (key == arr2[0]) {
            return arr2[1];
        }
    }
}

//设置cookie
function setcookie(key, val, iday) {
    let now = new Date();
    now.setDate(now.getDate() + iday);
    document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
}

//删除
function removeCookie(key) {
    setcookie(key, '', -1);
}