(function () {


    var urlstr = decodeURI(location.search.slice(1));
    var nowgid = urlstr.split('=')[1];
    init();

    function init() {
        /**
     * 请求方式：get
     * 接口路径: './api/list.php'
     * 参数：
            gid:商品id
     *返回数据 {
            json数据        
    }*/
        ajax({
            type: 'get',
            url: './api/list.php',
            data: {
                gid: nowgid,
            },
            succ(str) {
                console.log(str);
                var arr = JSON.parse(str);
                creadom(arr);
            }
        })
    }

    function creadom(arr) {
        //渲染大小图
        var imgstr = ''; //用来存放小图元素
        for (var i = 0; i < arr.img.length; i++) {
            imgstr += ` <li><img src="${arr.img[i]}" alt=""></li> `
        }
        var smalling = document.getElementsByClassName('smaller'); //小图的父元素节点
        var bigimg = document.getElementsByClassName('biger')[0].children; //大图的父元素节点
        var alis = smalling[0].children; //小图的第一个父节点li
        smalling[0].innerHTML = imgstr; //小图渲染
        bigimg[0].src = alis[0].children[0].src; //将获取的第一个小图了解给大图
        // smalling.children[0].className = 'activ';
        // //小图切大图
        smalling[0].children[0].className = "activ";
        // for (var i = 0; i < alis.length; i++) {
        //     alis[i].index = i;
        //     alis[i].onmouseover = function () {
        //         for (var j = 0; j < alis.length; j++) {
        //             alis[j].className = '';
        //         }
        //         this.className = 'activ';
        //         bigimg[0].src = this.children[0].src;
        //     }
        // }
        //渲染标题
        var shoptit = document.getElementById('shopttit');
        shoptit.innerHTML = arr['title'];

        //渲染价格
        var shopprice = document.getElementsByClassName('shop_price')[0];

        var html = `<div class="oldshop_price clearfix">
                                     <div class="prince_left">
                                         <span>价格</span>
                                         <span>￥${arr.price}</span>
                                     </div>
                                     <div class="prince_right">
                                         <a href="">
                                             <span>${arr.price}</span>
                                             <span>累计评价</span>
                                         </a>
                                         <div class="tradesucc">
                                             <span>${arr.sales}</span>
                                             <span>交易成功</span>
                                         </div>
                                     </div>
                                 </div>
                                 <div class="newshop_price ">
                                   <span class="prince_tit2"> 淘宝价 </span>
                                     <strong>
                                         <em>￥</em>
                                         <span>${arr.price}</span>
                                     </strong>
                                 </div>
                             `;
        shopprice.innerHTML = html;
        //渲染尺码
        var shopsize = document.getElementsByClassName('shop_size')[0];
        var arr1 = arr.size.split(',');
        var html = '<dt>尺码</dt>';
        for (var j in arr1) {
            html += `<dd>${arr1[j]}<span>该码为中国码</span></dd>`;
        }
        shopsize.innerHTML = html;
        // //颜色分类渲染
        var shopcolor = document.getElementsByClassName('shop_color')[0];
        var html = '<dt>颜色分类</dt>';
        var arr2 = arr.color.split(',');

        for (var j in arr2) {
            console.log(arr.img[j]);
            if (!arr.img[j]) {
                var sty = 'display:block';
                var stim = 'display:none'
            } else {
                var sty = '';
                var stim = 'display:block'
            }
            html += `<dd>
                                <a href="javascript:;" >
                                    <img src="${arr.img[j]}" style="${stim}">
                                    <span style="${sty}">${arr2[j]}</span>
                                </a>
                           </dd>
                            `;
        };
        shopcolor.innerHTML = html;
        // //渲染库存
        var haveshop = document.getElementById('haveshop');
        haveshop.innerHTML = arr.gid + 3;

        // //承诺支付渲染
        var shopsole = document.getElementsByClassName('shop_sole')[0];
        var str1 = '';
        var str2 = '';
        for (var j in arr) {
            str1 += `<dd><img src="" alt=""><span>${j}</span></dd>`;
        }
        for (var j in arr) {
            str2 += `<dd><img src="" alt=""><span>${j}</span></dd>`;
        }
        var html = `<dl class="promit clearfix">
                                        <dt>承诺</dt>
                                        ${str1}
                                    </dl>
                                    <dl class="payment">
                                        <dt>支付</dt>
                                        ${str2}
                            </dl>`;
        shopsole.innerHTML = html;
        // //商品选中效果
        function selecting(a) {
            for (var i = 1; i < a.length; i++) {
                a[i].index = i;
                a[i].onclick = function () {
                    for (var j = 1; j < a.length; j++) {
                        a[j].className = '';
                    }
                    this.className = 'activ';
                }
            }
        }
        var shopsize = document.getElementsByClassName('shop_size')[0].children;
        var shopcolor = document.getElementsByClassName('shop_color')[0].children;
        selecting(shopsize);
        selecting(shopcolor);
        // //选择购买商品数量
        var add = document.getElementById('add');
        var buynum = document.getElementById('buynum');
        var sub = document.getElementById('sub');
        var haveshop = document.getElementById('haveshop');
        //   点击加号时
        add.onclick = function () {
            var num = buynum.value - 0;
            var num1 = haveshop.innerHTML - 0;

            if (0 < num && num < num1) {
                num++;
                buynum.value = num;
            }
        }
        // //点击-号时
        sub.onclick = function () {
            var num = buynum.value - 0;
            var num1 = haveshop.innerHTML - 0;
            if (1 < num && num <= num1) {
                num--;
                buynum.value = num;
            }
        }
        var jinggao = document.getElementsByClassName('jinggao')[0];
        // //输入时
        buynum.oninput = function () {
            var num = buynum.value - 0;
            var num1 = haveshop.innerHTML - 0;
            if (num < 1) {
                this.value = 1;
            } else if (num > num1) {
                jinggao.style.display = 'block';
            } else if (0 < num && num <= num1) {
                this.value = num;
                jinggao.style.display = 'none';
            } else {
                this.value = 1;
            }
        }
        // //选项卡
        var optiontop = document.getElementsByClassName('option_top');
        var option = optiontop[0].children;
        var optionmain = document.getElementsByClassName('content_main');
        var main1 = optionmain[0].children;
        for (var i = 1; i < option.length; i++) {
            option[i].index = i - 1;
            option[i].onclick = function () {
                for (var j = 1; j < option.length; j++) {
                    option[j].className = '';

                }
                this.className = 'activ1';
                for (var j = 0; j < main1.length; j++) {
                    main1[j].style.display = 'none';
                }
                main1[this.index].style.display = 'block';

            }
        }
        // //吸顶
        var tabbar = document.getElementsByClassName('tapbar')[0];
        var shopdetail = document.getElementsByClassName('shop_detail')[0];
        var ttop = shopdetail.offsetTop;
        window, onscroll = function () {
            var gunlun = window.scrollY;
            if (gunlun >= ttop) {
                tabbar.style = ' position: fixed;top:0;left:0;right:0;width:1140px;margin:auto';
            } else {
                tabbar.style = 'position: static;';
            }
        }
        var shopcar = document.getElementsByClassName('shopcar')[0];
        var shopsize = document.getElementsByClassName('shop_size')[0];
        var shopcolor = document.getElementsByClassName('shop_color')[0];
        var buynum = document.getElementById('buynum');
        var size = '';
        var imgurl = '';
        var color = '';
        var uid = '';
        var buynumr = '';
        var haveshopr = '';
        var gid = '';
        shopsize.onclick = (ev) => {
            if (ev.target.tagName.toLowerCase() == 'dd') {
                size = ev.target.innerHTML.split('<')[0];

            }

        }
        shopcolor.onclick = (ev) => {
            if (ev.target.tagName.toLowerCase() == 'img') {
                imgurl = ev.target.src;
                color = ev.target.nextElementSibling.innerHTML;
            }
        }
        if (getcookie('uid')) {
            uid = getcookie('uid');
        }

        shopcar.onclick = () => {
            buynumr = buynum.value;
            haveshopr = haveshop.innerHTML;
            gidr = nowgid;
            ajax({
                type: 'post',
                url: './api/car.php',
                data: {
                    ii: 'shopcar',
                    size,
                    imgurl,
                    color,
                    uid,
                    buynumr,
                    haveshopr,
                    gidr,
                },
                succ(str) {
                    console.log(str);
                }
            });
        }

        // var smaller = document.getElementsByClassName('smaller')[0];
        var biger = document.getElementsByClassName('biger')[0];
        var main = document.getElementsByClassName('main')[0];
        var mask = document.getElementsByClassName('mask')[0];
        var contentleft = document.getElementsByClassName('content_left')[0];
        main.children[0].src = smaller.children[0].children[0].src;
        biger.children[0].src = smaller.children[0].children[0].src;

        //鼠标移入
        main.onmousemove = function (ev) {
            mask.style.display = 'block';
            biger.style.display = 'block';
            var idsl = ev.pageX - mask.offsetWidth / 2 - main.offsetLeft - contentleft.offsetLeft;
            var idst = ev.pageY - mask.offsetHeight / 2 - main.offsetTop - contentleft.offsetTop;
            if (idsl >= main.offsetWidth - mask.offsetWidth) {
                idsl = main.offsetWidth - mask.offsetWidth;
            } else if (idsl <= 0) {
                idsl = 0;
            }
            if (idst >= main.offsetHeight - mask.offsetHeight) {
                idst = main.offsetHeight - mask.offsetHeight;
            } else if (idst <= 0) {
                idst = 0;
            }
            mask.style.left = idsl + 'px';
            mask.style.top = idst + 'px';
            //放大
            var xishul = idsl / (main.offsetWidth - mask.offsetWidth);
            var xishut = idst / (main.offsetHeight - mask.offsetHeight);
            var limitl = biger.children[0].offsetWidth - biger.offsetWidth;
            var limitt = biger.children[0].offsetHeight - biger.offsetHeight;
            biger.children[0].style.left = -xishul * limitl + 'px';
            biger.children[0].style.top = -xishut * limitt + 'px';
        }
        //鼠标移出
        main.onmouseout = function () {
            mask.style.display = 'none';
            biger.style.display = 'none';
        }
        //小图切大图
        var smallerli = smaller.children;
        for (var i = 0; i < smallerli.length; i++) {
            smallerli[i].onmousemove = function (ev) {
                for (var i = 0; i < smallerli.length; i++) {
                    smallerli[i].className = '';
                }
                main.children[0].src = this.children[0].src;
                biger.children[0].src = this.children[0].src;
                this.className = 'activ';
            }
        }
    }
})();