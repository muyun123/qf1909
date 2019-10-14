(function () {

    var list = document.getElementById('list');
    var sort = document.getElementById('sort');
    var num1 = document.getElementById('num1');
    var num2 = document.getElementById('num2');
    var sear = document.getElementById('sear');
    var btn1 = document.getElementById('btn1');
    var btn3 = document.getElementById('btn3');
    var pagli = document.getElementsByClassName('pagli')[0];
    var n = '';
    var n1 = '';
    var n2 = '';
    var n3 = '';
    var ipage = '1';
    var pagenum = '9';
    init();
    sort.onclick = function (ev) {
        n = ev.target.value;
        init();
    }
    btn3.onclick = function () {
        n1 = num1.value;
        n2 = num2.value;
        init();
    }
    btn1.onclick = function () {
        n3 = sear.value;
        init();
    }
    //登录
    /**
     * 请求方式：get
     * 接口路径: './api/login.php'
     * 参数：
             n:,//排序参数
             n1:,//价格区间值1
             n2:,//价格区间值2
             n3://搜索值
     *返回数据 {
            json数据        
    }

     */
    function init() {
        ajax({
            type: 'get',
            url: './api/list.php',
            data: {
                n,
                n1,
                n2,
                n3,
                ipage,
                pagenum
            },
            succ(str) {
                var arr = JSON.parse(str);
                creadoc(arr);
            }
        });
    }
    // 

    function creadoc(arr) {
        var html = '';
        var html1 = '';
        if (ipage > Math.ceil(arr.sum / pagenum)) {
            ipage = 1;
        }
        //分页
        for (var i = 0; i < Math.ceil(arr.sum / pagenum); i++) {
            html1 += `<li>${i+1}</li>`;
        }
        pagli.innerHTML = html1;
        pagli.children[ipage - 1].className = 'active';
        //列表
        for (var key in arr.list) {
            var img1 = '';
            for (var i = 0; i < arr.list[key].img.length; i++) {
                img1 += ` <img src="${arr.list[key].img[i]}" alt="">`;
            }

            html += `
                <li>
                    <div class="big-img">
                    <a href="${objStr(arr.list[key], 'detail.html')}"  target="_blank">
                        <img class="bigimg"
                            src="${arr.list[key].img[0]}" alt="" ></a>
                        <p><a href="">找同款</a><span>|</span><a href="">找相似</a></p>
                    </div>
                    <div class="smallimg" id="listsmall">
                       ${img1}
                    </div>
                    <h4><span>￥${arr.list[key].price}</span>
                        <span>${arr.list[key].gid}</span><span>已有${arr.list[key].sales}人付款</span></h4>
                    <p><a href="${objStr(arr.list[key],'detail.html')}"  target="_blank">${arr.list[key].title}</a></p>
                    <p>
                        <span><a href="javascript:;">${arr.list[key].shop}</a></span>
                        <span>${arr.list[key].gid}</span>
                    </p>
                    <p><span>如实描述：${arr.list[key].gid}</span> </p>
                </li>`;
            list.innerHTML = html;
        }
        //获取小图的父元素
        var smallimg = list.getElementsByClassName('smallimg');
        //小图第一个选中效果
        // console.log(smallimg);
        for (var i = 0; i < smallimg.length; i++) {
            smallimg[i].children[0].className = 'checked';
        }

        //获取所有的小图的集合
        var smallpic = list.getElementsByTagName('img');
        for (var i = 0; i < smallpic.length; i++) {
            //循环判断是否有点击事件
            smallpic[i].onclick = function () {
                //将大图的src变成点击小图的src
                this.parentNode.previousElementSibling.children[0].children[0].src = this.src;
                //去除小图标签的class名
                for (var j = 0; j < this.parentNode.children.length; j++) {
                    this.parentNode.children[j].className = '';
                }
                //点击小图的效果
                this.className = 'checked';
            }
        }
    }

    pagli.onclick = (ev) => {
        console.log(ev.target);
        if (ev.target.tagName.toLowerCase() == 'li') {
            for (var i = 0; i < pagli.children.length; i++) {
                pagli.children[i].className = '';
            }
            ipage = ev.target.innerHTML;
            console.log(ipage);
            init();
        }
    }

    function objStr(obj, url) {

        if (url) {
            var str = url + '?';
        } else {
            var str = '';
        }
        str += 'nowgid' + '=' + obj.gid + '&';

        return str.slice(0, -1);
    }
})();