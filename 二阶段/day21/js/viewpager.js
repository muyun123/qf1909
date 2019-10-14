
function viewpager(opt) {
    var defaultObj = {
        iw: 600,
        ih: 400,
    };
    for (var key in opt) {
        defaultObj[key] = opt[key];
    }
    // Object.assign(defaultObj, opt);

    var box = document.getElementById(defaultObj.ele);
    var list = box.getElementsByClassName('list')[0];
    var prev = box.getElementsByClassName('prev')[0];
    var next = box.getElementsByClassName('next')[0];
    var circle = box.getElementsByClassName('circle')[0];
    css(box, 'width', defaultObj.iw + 'px');
    css(box, 'height', defaultObj.ih + 'px');
    var html = defaultObj.img.map(function (item) {
        return `<li><a href=""><img src="${item}" alt=""></a></li>`;
    }).join('');
    list.innerHTML = html;

    var html = '';
    for (var i = 0; i < defaultObj.img.length; i++) {
        html += `<span></span>`;
    }
    circle.innerHTML = html;
    var iw = list.children[0].offsetWidth;
    for (var i = 0; i < list.children.length; i++) {
        list.children[i].style.left = iw + 'px';
    }
    //图片轮播初始值
    var now = 0;
    list.children[now].style.left = 0; //初始显示第一张图
    movecircle()
    //下一张图片
    function nextr() {
        startMove(list.children[now], {
            left: -iw
        });
        now++;
        if (now >= list.children.length) {
            now = 0;
        }
        list.children[now].style.left = iw + 'px';
        startMove(list.children[now], {
            left: 0
        });
        movecircle()
    }
    //上一张图片
    function prevr() {
        startMove(list.children[now], {
            left: iw
        });
        now--;
        if (now < 0) {
            now = list.children.length - 1;
        }
        list.children[now].style.left = -iw + 'px';
        startMove(list.children[now], {
            left: 0
        });
        movecircle()
    }
    //定时器
    var timer = setInterval(nextr, defaultObj.timer * 1000);

    if (defaultObj.btntype) {
        css(prev, 'display', 'block');
        css(next, 'display', 'block');
    }
    //鼠标移入停止轮播
    box.onmouseover = function () {
        if (!defaultObj.btntype) {
            css(prev, 'display', 'block');
            css(next, 'display', 'block');
        }
        clearInterval(timer);
    }
    //鼠标移入开始轮播
    box.onmouseout = function () {
        if (!defaultObj.btntype) {
            css(prev, 'display', 'none');
            css(next, 'display', 'none');
        }
        timer = setInterval(nextr, defaultObj.timer * 1000);
    }
    //点击上一张显示
    prev.onclick = function () {
        prevr();
    }
    //点击下一张显示
    next.onclick = function () {
        nextr();
    }
    //给焦点下标
    for (var i = 0; i < circle.children.length; i++) {
        circle.children[i].index = i;
    }
    //点击焦点图事件
    circle.onclick = function (ev) {
        if (ev.target.tagName.toLowerCase() == 'span') {
            if (ev.target.index < now) {
                startMove(list.children[now], {
                    left: iw
                });
                list.children[ev.target.index].style.left = -iw + 'px';
                startMove(list.children[ev.target.index], {
                    left: 0
                });
            } else if (ev.target.index > now) {
                startMove(list.children[now], {
                    left: -iw
                });
                list.children[ev.target.index].style.left = iw + 'px';
                startMove(list.children[ev.target.index], {
                    left: 0
                });
            }
            now = ev.target.index;
            movecircle()
        }
    }

    function movecircle() {
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        circle.children[now].className = 'active';
    }
}