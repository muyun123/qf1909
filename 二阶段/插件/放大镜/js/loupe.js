let loupe = opt => {
    var defaultObj = {
        ih: 390,
        iw: 390
    };
    Object.assign(defaultObj, opt);
    var wrap = document.getElementById(defaultObj.ele);
    var smaller = wrap.getElementsByClassName('smaller')[0];
    var biger = wrap.getElementsByClassName('biger')[0];
    var main = wrap.getElementsByClassName('main')[0];
    var mask = wrap.getElementsByClassName('mask')[0];
    // var wrap = document.getElementsByClassName('wrap')[0];
    var prev = wrap.getElementsByClassName('prev')[0];
    var next = wrap.getElementsByClassName('next')[0];
    var box = wrap.getElementsByClassName('box')[0];
    var bottom = wrap.getElementsByClassName('bottom')[0];
    var html = '';
    css(main, 'height', defaultObj.ih + 'px');
    css(main, 'width', defaultObj.iw + 'px');
    css(biger, 'width', defaultObj.iw + 10 + 'px');
    css(biger, 'height', defaultObj.ih + 10 + 'px');
    css(biger, 'left', main.offsetWidth + 10 + 'px');
    css(biger.children[0], 'width', defaultObj.iw * defaultObj.times + 'px');
    css(biger.children[0], 'height', defaultObj.ih * defaultObj.times + 'px');
    css(mask, 'height', defaultObj.ih / 2 + 'px');
    css(mask, 'width', defaultObj.iw / 2 + 'px');
    css(bottom, 'width', defaultObj.iw + 10 + 'px');
    // css(bottom, 'height', (defaultObj.iw + 10) / 6 + 'px');
    css(box, 'width', bottom.offsetWidth - (prev.offsetWidth * 2) - 10 + 'px');

    html += defaultObj.img.map(function (item) {
        return `<li><img src="${item}" alt=""></li>`;
    }).join('');
    smaller.innerHTML = html;
    main.children[0].src = smaller.children[0].children[0].src;
    biger.children[0].src = smaller.children[0].children[0].src;
    smaller.children[0].className = 'active';
    //鼠标移入
    main.onmousemove = function (ev) {
        mask.style.display = 'block';
        biger.style.display = 'block';
        var idsl = ev.pageX - mask.offsetWidth / 2 - main.offsetLeft;
        var idst = ev.pageY - mask.offsetHeight / 2 - main.offsetTop;
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
        smallerli[i].onclick = function (ev) {
            for (var i = 0; i < smallerli.length; i++) {
                smallerli[i].className = '';
            }
            main.children[0].src = this.children[0].src;
            biger.children[0].src = this.children[0].src;
            this.className = 'active';
        }
    }
    //图片滚动事件 
    var num1 = 0;
    var disl = box.offsetWidth - smaller.offsetWidth;
    prev.onclick = function () {
        num1 += 20;
        if (num1 >= 0) {
            num1 = 0;
        }
        moveing(num1);
        console.log(num1);
    }

    next.onclick = function () {
        num1 -= 20;
        if (num1 <= disl) {
            num1 = disl;
        }
        moveing(num1);
        console.log(num1);
    }

    function moveing(a) {
        if (a >= 0) {
            css(prev, 'background', '#ccc');
            css(prev, 'cursor', 'no-drop');
            css(smaller, 'left', a + 'px');
        } else if (a < 0 && a > disl) {
            css(smaller, 'left', a + 'px');
            css(prev, 'background', '#777');
            css(prev, 'cursor', 'pointer');
            css(next, 'background', '#777');
            css(next, 'cursor', 'pointer');
        } else if (a <= disl) {
            css(smaller, 'left', a + 'px');
            css(next, 'background', '#ccc');
            css(next, 'cursor', 'no-drop');
        }
    }

    function css() {
        if (arguments.length == 2) {
            if (getComputedStyle(arguments[0], false)) {
                return getComputedStyle(arguments[0], false)[arguments[1]];
            } else {
                return arguments[0].currentStyle[arguments[1]];
            }
        } else if (arguments.length == 3) {
            arguments[0].style[arguments[1]] = arguments[2];
        }
    }
}