(function () {
    var dlist = document.getElementsByClassName('dlist')[0];
    var jiesuan = document.getElementsByClassName('goods_jiesuan')[0];
    var selenum = 1;
    init();

    function init() {
        //是否登录
        /**
     * 请求方式：get
     * 接口路径: './api/login.php'
     * 参数：
             uid:当前用户id
     *返回数据 {
               店铺1名：{
                   商品1：{}，
                   商品2： {}
               }
            }
     */

        if (getcookie('uid') && getcookie('username')) {
            ajax({
                type: 'get',
                url: './api/shopcar.php',
                data: {
                    g: 'getnum',
                    uid: getcookie('uid'),
                },
                succ(str) {
                    var arr = JSON.parse(str);
                    // console.log(arr);
                    xuanrang(arr);
                }
            });
        }

    }
    //     //渲染
    function xuanrang(arr) {
        var html = '';
        for (var i in arr) {
            html += `<dd><div class="selebuy_shop clear">
                  <div class="selectbox"><input type="checkbox"></div>
                  <div class="tianmao"><img src="" alt=""></div>
                  <div class="shop">店铺：<a href="###">${i}</a></div>
                  <div class="kefu"><a href="###"><img src="" alt=""></a></div>
                   <div class="youhui"><i></i><a href="">优惠卷<em>></em></a></div> 
                </div>
                <div class="shop_selegoods">
                  <ul class="ulist">`;
            for (var j = 0; j < arr[i].length; j++) {
                var arr1 = '';
                if (arr[i][j].goodtype) {
                    arr1 = ` <p>${arr[i][j].goodtype}</p>`;
                }
                html += `
                    <li class="clear">
                      <div class="sele_checkbox" data-index="${arr[i][j].idn}">
                        <input type="checkbox">
                      </div>
                      <div class="goodsmessage">
                        <div><a href=""><img src="${arr[i][j].img}" alt=""></a></div>
                        <div class="goods_text">
                          <p>${arr[i][j].title}</p>
                        </div>
                      </div>
                      <div class="goods_type">
                         ${arr1}
                      </div>
                      <div class="oneprice">
                        ￥<span>${arr[i][j].oldprice}</span><br>
                        ￥<span class="newprice">${arr[i][j].newprice}</span>
                      </div>
                      <div class="goodsnum" data-index="${arr[i][j].idn}">
                        <input type="button" value="-" class="sub" >
                        <input type="text" class="num1" value="${arr[i][j].num}">
                        <input type="button" value="+" class="add">
                        <p>限购<span class="kucun">${arr[i][j].kucun}</span>件</p>
                      </div>
                      <div class="goodssumprice">
                        ￥<strong>${arr[i][j].newprice*arr[i][j].num}</strong>
                      </div>
                      <div class="goodshand" data-index="${arr[i][j].idn}">
                        <span>删除</span>
                      </div>
                    </li>
                  `;

            }
            html += '</ul></div></dd>'

        }
        dlist.innerHTML = html;
        var goods_type = document.querySelectorAll('.dlist .goods_type');
        for (var j = 0; j < goods_type.length; j++) {
            if (goods_type[j].innerHTML.trim() != '') {
                goods_type[j].style.display = 'block';
            } else {
                goods_type[j].style.visibility = 'hidden';
            }
        }

        // }
        aa1();


        // 吸底

        function aa1() {
            jiesuan.style = 'position: static;';
            var jiesuanheight1 = jiesuan.offsetTop - window.innerHeight;
            if (jiesuan.offsetTop > window.innerHeight) {
                jiesuan.style = 'position:fixed;bottom:0;left:0;right:0;margin:auto;width:990px;';
            }
            window.onscroll = function () {
                var scrolltop = window.scrollY + 49;
                if (jiesuanheight1 >= scrolltop) {
                    jiesuan.style = 'position:fixed;bottom:0;left:0;right:0;margin:auto;width:990px;'
                } else if (jiesuanheight1 < 0) {
                    jiesuan.style = 'position: static;';
                } else {
                    jiesuan.style = 'position: static;';
                }
            }
        }


        //全选开始-------------------------------------------------------------------------
        //顶部全选节点
        var checkboxAll = document.querySelector('.goodscar_tit .checkboxall input');
        //底部全选节点
        var checkbox = document.querySelector('.goods_jiesuan .selec_delet input');
        //店铺前的全选节点
        var shopscheck = document.querySelectorAll('.goods_buying .dlist .selectbox input');
        //商品的勾选节点
        var shopscheck1 = document.querySelectorAll('.goods_buying .dlist .sele_checkbox input');
        //店铺商品模块的父节点dd
        var dlistDd = document.querySelectorAll('.dlist dd');
        if (dlistDd.length)
            //顶部全选
            checkboxAll.onclick = function () {
                var dlistDd = document.querySelectorAll('.dlist dd');
                if (dlistDd.length) {
                    var check = checkboxAll.checked;
                    checkbox.checked = check;
                    quanxuan(check);
                    selectedgoods();
                } else {
                    checkboxAll.checked = false;
                }

            }
        //底部全选
        checkbox.onclick = function () {
            var dlistDd = document.querySelectorAll('.dlist dd');
            if (dlistDd.length) {
                var check = checkbox.checked;
                checkboxAll.checked = check;
                quanxuan(check);
                selectedgoods();
            } else {
                checkbox.checked = false;
            }

        }

        function quanxuan(check) {
            for (var i = 0; i < shopscheck.length; i++) {
                shopscheck[i].checked = check;
            }
            for (var i = 0; i < shopscheck1.length; i++) {
                shopscheck1[i].checked = check;
            }
        }
        //全选店铺
        shopquanxuan();

        function shopquanxuan() {
            var num = 0;
            //遍历所有的店铺
            for (var i = 0; i < shopscheck.length; i++) {
                shopscheck[i].index = i;
                shopscheck[i].onclick = function () {
                    num = kkkk();
                    shopsschec(this, num);
                    selectedgoods();
                }
            }
        }

        function kkkk() {
            var num = 0;
            for (var i = 0; i < shopscheck.length; i++) {
                if (shopscheck[i].checked) {
                    num++;
                }
            }
            return num;
        }

        function shopsschec(a, num) {
            //当前店铺的商品
            var Ddchecked = dlistDd[a.index].querySelectorAll('.sele_checkbox input');
            //商品全选
            for (var i = 0; i < Ddchecked.length; i++) {
                Ddchecked[i].checked = a.checked;
            }
            //顶底部勾选
            if (num == shopscheck.length) {
                checkboxAll.checked = 'true';
                checkbox.checked = 'true';
            } else {
                checkboxAll.checked = false;
                checkbox.checked = false;
            }
        }
        //店铺商品全选

        for (var i = 0; i < shopscheck1.length; i++) {
            shopscheck1[i].onclick = function () {
                goodsselec();
                goodscheckshop();
                selectedgoods();
            }
        }

        function goodsselec() {
            for (var i = 0; i < dlistDd.length; i++) {
                //每次遍历出每个店铺下的checked的input；
                var goodscheck = dlistDd[i].querySelectorAll('.ulist .sele_checkbox input');
                var num = 0;
                //每次在判断当前店铺下商品是否勾选 
                for (var j = 0; j < goodscheck.length; j++) {
                    if (goodscheck[j].checked) {
                        num++;
                    }
                    //商品都勾线则店铺勾选
                    if (num == goodscheck.length) {
                        shopscheck[i].checked = true;
                    } else {
                        shopscheck[i].checked = false;
                    }
                }

            }
        }

        function goodscheckshop() {
            var num = 0;
            for (var i = 0; i < shopscheck.length; i++) {
                if (shopscheck[i].checked) {
                    num++;
                } else {
                    num--;
                }
                if (num == shopscheck.length) {
                    checkboxAll.checked = 'true';
                    checkbox.checked = 'true';
                } else {
                    checkboxAll.checked = false;
                    checkbox.checked = false;
                }
            }
        }
        //全选部分结束----------------------------------------------------------------------

        //加减数量价格部分开始----------------------------------------------------------
        //获取加减的父节点所有
        var goodsnum = dlist.getElementsByClassName('goodsnum');
        var goodsadd = dlist.getElementsByClassName('add');
        var goodsnum1 = dlist.getElementsByClassName('num1');
        var goodssub = dlist.getElementsByClassName('sub');
        var goodskucun = dlist.getElementsByClassName('kucun');
        // var goodssumprice1 = document.getElementsByClassName('goodssumprice');
        var goodssumprice = document.querySelectorAll('.goodssumprice strong');
        var oneprice = document.querySelectorAll('.oneprice .newprice');
        addsub();

        var idn = ''

        function addsub() {
            for (var i = 0; i < goodsnum.length; i++) {
                goodsadd[i].index = i;
                goodsnum1[i].index = i;
                goodssub[i].index = i;
                goodssub[i].onclick = function () {
                    selenum = goodsnum1[this.index].value - 0;
                    idn = this.parentNode.dataset.index;
                    console.log(this.parentNode.dataset.index);
                    if (selenum > 1) {
                        selenum--;
                    } else {
                        selenum = 1;
                    }
                    ajax({
                        type: 'get',
                        url: './api/shopcar.php',
                        data: {
                            g: 'setnum',
                            selenum,
                            idn,
                        },
                        succ(str) {
                            // console.log(str);
                        }
                    });
                    // sumpricee(this.index, selenum);
                    selectedgoods();
                    init();
                }
                goodsadd[i].onclick = function () {
                    selenum = goodsnum1[this.index].value - 0;
                    var liminum = goodskucun[this.index].innerHTML;
                    idn = this.parentNode.dataset.index;
                    if (selenum < liminum) {
                        selenum++;
                    } else {
                        selenum = liminum;
                    }
                    ajax({
                        type: 'get',
                        url: './api/shopcar.php',
                        data: {
                            g: 'setnum',
                            selenum,
                            idn,
                        },
                        succ(str) {
                            // console.log(str);
                        }
                    });
                    // sumpricee(this.index, selenum);
                    selectedgoods();
                    init();
                }
                goodsnum1[i].oninput = function () {
                    selenum = goodsnum1[this.index].value - 0;
                    var liminum = goodskucun[this.index].innerHTML;
                    idn = this.parentNode.dataset.index;
                    if (selenum >= liminum) {
                        selenum = liminum;
                    } else if (selenum < 1) {
                        selenum = 1;
                    } else if (selenum < liminum && selenum > 0) {
                        selenum = selenum;
                    } else {
                        selenum = 1;
                    }
                    ajax({
                        type: 'get',
                        url: './api/shopcar.php',
                        data: {
                            g: 'setnum',
                            selenum,
                            idn,
                        },
                        succ(str) {
                            // console.log(str);
                        }
                    });
                    // sumpricee(this.index, selenum);
                    selectedgoods();
                    init();
                }
            }
        }

        //每个商品总价
        // function sumpricee(a, b) {
        //     var goodssumprice = document.querySelectorAll('.goodssumprice strong');
        //     var oneprice = document.querySelectorAll('.oneprice .newprice');
        //     var price = oneprice[a].innerHTML;
        //     goodssumprice[a].innerHTML = (price * b).toFixed(2);

        // }
        var selectednum = document.querySelector('.selected_num strong');
        var goodsheji = document.querySelector('.goods_heji strong');
        var sumjiesuan = document.querySelector('.sum_jiesuan a');
        selectedgoods();
        //已选多少件商品
        function selectedgoods() {
            var goodsnum1 = dlist.getElementsByClassName('num1');
            var shopscheck1 = document.querySelectorAll('.goods_buying .dlist .sele_checkbox input');
            var goodsnum1 = dlist.getElementsByClassName('num1');
            var goodssumprice = document.querySelectorAll('.goodssumprice strong');
            var shopscheck1 = document.querySelectorAll('.goods_buying .dlist .sele_checkbox input');
            var num2 = 0;
            var jiesuanprice = 0;
            for (var i = 0; i < shopscheck1.length; i++) {
                if (shopscheck1[i].checked) {
                    var selenum = goodsnum1[i].value - 0;
                    num2 += selenum;
                    jiesuanprice += goodssumprice[i].innerHTML - 0;
                }
            }
            if (num2 != 0) {
                sumjiesuan.className = '';
            } else {
                sumjiesuan.className = 'activ';
            }
            selectednum.innerHTML = num2;
            //合计
            goodsheji.innerHTML = jiesuanprice.toFixed(2);
        }

        //加减数量价格总价部分结束----------------------------------------------------------------

        //删除部分开始---------------------------------------------------------------------------

        var delet = dlist.querySelectorAll('.goodshand span');
        var deletall = document.querySelector('.goods_delet span');
        var goodslist = dlist.querySelectorAll('.ulist li');
        var ulist = dlist.querySelectorAll('.ulist');
        var ddlist = dlist.querySelectorAll('dd');

        for (var i = 0; i < delet.length; i++) {
            delet[i].index = i;
            delet[i].onclick = function () {
                var que = confirm('确定删除？');
                idn = this.parentNode.dataset.index;
                if (que) {
                    goodslist[this.index].remove(goodslist[this.index]);
                    ajax({
                        type: 'get',
                        url: './api/shopcar.php',
                        data: {
                            g: 'delet',
                            idn,
                        },
                        succ(str) {
                            // console.log(str);
                        }
                    });
                    addsub();
                    selectedgoods();
                    aa1();
                    var dlistDd = document.querySelectorAll('.dlist dd');
                    if (dlistDd.length) {
                        checkboxAll.checked = false;
                        checkbox.checked = false;
                    }
                    init();
                }
                // ukong(this.index);
            }
        }

        // function ukong(a) {
        //     for (var i = 0; i < ulist.length; i++) {
        //         if (ulist[i].innerHTML.trim() == '') {
        //             ddlist[i].remove(goodslist[a]);
        //         }
        //     }
        // }
        deletall.onclick = function () {
            var que = confirm('确定删除？');
            if (que) {

                for (var i = 0; i < shopscheck1.length; i++) {
                    if (shopscheck1[i].checked) {
                        idn = shopscheck1[i].parentNode.dataset.index;
                        ajax({
                            type: 'get',
                            url: './api/shopcar.php',
                            data: {
                                g: 'delet',
                                idn,
                            },
                            succ(str) {
                                // console.log(str);
                            }
                        });
                        // ddlist[i].remove(goodslist[i]);
                        addsub();
                        selectedgoods();
                        aa1();
                        checkboxAll.checked = false;
                        checkbox.checked = false;
                        init();
                    }
                }
            }

        }
    }

})();