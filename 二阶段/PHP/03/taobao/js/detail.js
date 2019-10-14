(function () {


    var urlstr = decodeURI(location.search.slice(1));
    var nowgid = urlstr.split('=')[1];
    init();

    function init() {
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
        var smalling = document.getElementsByClassName('smalling'); //小图的父元素节点
        var bigimg = document.getElementsByClassName('bigimg')[0].children; //大图的父元素节点
        var alis = smalling[0].children; //小图的第一个父节点li
        smalling[0].innerHTML = imgstr; //小图渲染
        bigimg[0].src = alis[0].children[0].src; //将获取的第一个小图了解给大图
        // //小图切大图
        smalling[0].children[0].className = "activ";
        for (var i = 0; i < alis.length; i++) {
            alis[i].index = i;
            alis[i].onmouseover = function () {
                for (var j = 0; j < alis.length; j++) {
                    alis[j].className = '';
                }
                this.className = 'activ';
                bigimg[0].src = this.children[0].src;
            }
        }
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
        var html = '<dt>尺码</dt>';
        for (var j in arr) {
            html += `<dd>${j}<span>${arr.price}</span></dd>`;
        }
        shopsize.innerHTML = html;
        // //颜色分类渲染
        var shopcolor = document.getElementsByClassName('shop_color')[0];
        var html = '<dt>颜色分类</dt>';
        for (var j in arr.img) {
            // if (!num.shopcolor[j]) {
            //     var sty = 'display:block';
            //     var stim = 'display:none'
            // } else {
            //     var sty = '';
            //     var stim = 'display:block'
            // }
            html += `<dd>
                                <a href="javascript:;" >
                                    <img src="${arr.img[j]}">
                                    <span style="${1}">${j}</span>
                                </a>
                           </dd>
                            `;
        };
        shopcolor.innerHTML = html;
        // //渲染库存
        var haveshop = document.getElementById('haveshop');
        haveshop.innerHTML = arr.gid;

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
    }

})();