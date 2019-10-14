let shopcar = opt => {
    //准备假数据
    goodsdata = [{
        id: 001, //商品id
        imgurl: './iamges/dd.png', //商品图片路径
        goodsinfo: '宇仔大刀肉辣条8090后儿时怀旧素食零食大礼包麻辣小吃湖南重庆特产',
        goodscanshu: '口味：大刀肉2包（约76个）',
        oldprice: 23.6,
        nowprice: 10.3,
        goodscount: 15
    }, {
        id: 002, //商品id
        imgurl: './iamges/mac.png', //商品图片路径
        goodsinfo: '正品MAC魅可口红新色316磨砂小辣椒牛血色marrakesh脏橘色923礼盒装',
        goodscanshu: '颜色分类：Marrakesh脏橘色 礼盒装',
        oldprice: 155,
        nowprice: 100,
        goodscount: 50
    }, {
        id: 003, //商品id
        imgurl: './iamges/sll.png', //商品图片路径
        goodsinfo: 'YSL圣罗兰纯口红 方管正红色1星星色52正橘色13豆沙色姨妈色 正品',
        goodscanshu: '颜色分类：N52正橘色 提升肤质',
        oldprice: 320,
        nowprice: 280,
        goodscount: 45
    }, {
        id: 004, //商品id
        imgurl: './iamges/mn.png', //商品图片路径
        goodsinfo: '呢子大衣女中长款2019冬季新款韩版雾霾蓝学生宽松赫本风毛呢外套',
        goodscanshu: '颜色分类：雾霾蓝',
        oldprice: 218,
        nowprice: 188,
        goodscount: 25
    }];
    //找节点
    var goodlist = document.querySelector('.goodlist');
    //渲染假数据到页面
    function show() {
        var html = goodsdata.map(function (item) {
            return `<div class="gooditems" data-id="${item.id}">
                        <div class="goodCB">
                            <input type="checkbox" class="goodsit_check">
                        </div>
                        <div class="goodinfo">
                            <img src="${item.imgurl}" alt="" class="goodimg">
                            <span class="goodtitle">${item.goodsinfo}</span>
                        </div>
                        <div class="googcanshu">${item.goodscanshu}</div>
                        <div class="price">
                            <p class="old">${item.oldprice}</p>
                            <p class="now">${item.nowprice}</p>
                        </div>
                        <div class="form">
                            <input type="button" value="-" class="decrease">
                            <input type="text" value="1" class="valnum" data-kucun="${item.goodscount}">
                            <input type="button" value="+" class="add">
                            <span class="tishi">这已经是最少的宝贝数量了！</span>
                        </div>
                        <div class="sumprice">${item.nowprice}</div>
                        <div class="del">
                            <a href="###" class="delinfo">删除</a>
                        </div>
                    </div>`;
        }).join('');
        goodlist.innerHTML = html;
    }
    show();
    //点击加减按钮、手动输入控制数量的改变
    //找节点
    var decrease = goodlist.getElementsByClassName('decrease'); //找到-号的集合
    var add = goodlist.getElementsByClassName('add'); //找到+号的集合
    var valnum = goodlist.getElementsByClassName('valnum'); //找到输入框数据的集合
    var price = goodlist.getElementsByClassName('now'); //找到单价的集合
    var sumprice = goodlist.getElementsByClassName('sumprice'); //找到小计的集合
    var delinfo = goodlist.getElementsByClassName('delinfo'); //找到删除的集合
    var gooditems = goodlist.getElementsByClassName('gooditems'); //找到整个商品内容的集合
    var goodsit_check = goodlist.getElementsByClassName('goodsit_check'); //找到商品列表中复选框的节点
    var b_checkedAll = document.querySelector('#b_checkedAll'); //找到底部全选的集合
    var b_delete = document.querySelector('#b_delete') //找到底部删除的节点
    var select = document.querySelector('#select'); //找到件数的节点
    var b_price = document.querySelector('#b_price'); //找到总金额的节点
    var jisuan = document.querySelector('#jisuan'); //找到结算的节点
    var tishi = document.getElementsByClassName('tishi');
    var goodCheckbox = document.querySelector('#goodCheckbox');

    function changeNum(num, now) { //用来计算小计
        var kucun = valnum[now].dataset.kucun; //获取绑在valnum身上的data-kucun属性的属性值
        if (num < 1) { //当传进来的数<1的时候就让输入框的内容显示为1
            num = 1;
        } else if (num >= kucun) { //当传进来的数>=库存量的时候就让输入框的内容显示为库存量的值
            num = kucun;
        }
        valnum[now].value = num; //让输入框的内容一直等于传进来的值
        sumprice[now].innerHTML = (num * price[now].innerHTML).toFixed(2); //计算小计，单价*数量 保留两位小数
        total();
    }

    function forAdd() {
        for (var i = 0; i < add.length; i++) { //遍历节点
            //绑定索引值
            add[i].index = i; //+
            valnum[i].index = i; //输入框
            decrease[i].index = i; //-
            delinfo[i].index = i; //删除
            add[i].onclick = function () { //给每个+号绑定事件
                var num = valnum[this.index].value; //获取到输入框的数据存到变量num中
                num++; //自加
                changeNum(num, this.index);
                tishi[this.index].style.display = 'none';
            }
            decrease[i].onclick = function () { //给每个-号绑定事件
                var num = valnum[this.index].value;
                num--;
                changeNum(num, this.index);
                if (num < 1) {
                    tishi[this.index].style.display = 'block';
                }
            }
            valnum[i].oninput = function () { //在输入框中手动输入数据的时候数据也应该跟着变化
                var num = this.value;
                changeNum(num, this.index);
            }
            //删除当行
            delinfo[i].onclick = function () {
                var res = confirm('您确定要删除我吗?');
                if (res) {
                    goodlist.removeChild(gooditems[this.index]);
                }
                total();
                forAdd();
            }
        }
    }
    forAdd();

    //全选
    b_checkedAll.onclick = function () { //绑定点击事件
        for (var i = 0; i < goodsit_check.length; i++) {
            goodsit_check[i].checked = b_checkedAll.checked;
        }
        total();
    }
    goodCheckbox.onclick = function () {
        for (var i = 0; i < goodsit_check.length; i++) {
            goodsit_check[i].checked = goodCheckbox.checked;
        }
        total();
    }
    //当商品列表中的复选框都勾选上的时候底部的全选也应该是被勾选的状态（反控制全选）
    function isChecked() {
        var isok = false;
        var num = 0;
        var arr = []; //存放被勾选的下标，方便后期判断第几行被勾选中
        for (var i = 0; i < goodsit_check.length; i++) {
            if (goodsit_check[i].checked) { //复选框被勾选
                num++;
                arr.push(i); //把选中行的下标push到一个数组里面去
            }
        }
        if (num == goodsit_check.length && num != 0) { //如果商品列表的复选框全被勾选
            b_checkedAll.checked = true; //把底部的全选复选框的状态给勾选上
            goodCheckbox.checked = true;
        } else {
            b_checkedAll.checked = false;
            goodCheckbox.checked = false;
        }
        return arr;
    }

    function total(arr) { //计算总数量和总金额
        var arr = isChecked(); //拿到了被勾选的商品列表对应的下标
        var sum = 0; //存总数量
        var priceAll = 0; //存总金额
        arr.forEach(function (item) {
            sum += valnum[item].value - 0;
            priceAll += sumprice[item].innerHTML * 1;
        });
        select.innerHTML = sum;
        b_price.innerHTML = priceAll.toFixed(2);
        if (arr.length) {
            jisuan.className = 'b_suan';
        } else {
            jisuan.className = 'b_suan  b_jie';
        }
    }
    for (var i = 0; i < goodsit_check.length; i++) {
        goodsit_check[i].onclick = function () {
            total();
        }
    }
    //选中几行商品列表就删除几行
    b_delete.onclick = function () {
        var arr = isChecked().reverse(); //颠倒顺序
        var res = confirm('您确定要全部删除吗?');
        if (res) {
            arr.forEach(function (item) {
                goodlist.removeChild(gooditems[item]);
            });
            total();
        }
    }
}