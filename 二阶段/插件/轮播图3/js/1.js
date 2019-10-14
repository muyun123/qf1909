let flasmove = (opt) => {
    var defaultObj = {
        iw: 490,
        ih: 280
    }
    Object.assign(defaultObj, opt);
    // console.log(defaultObj);
    var box = document.getElementById(defaultObj.ele);
    var box1 = box.getElementsByClassName('box1')[0];
    var box2 = box.getElementsByClassName('box2')[0];
    var ul1 = box1.children[0];
    var boxleft = box1.children[1];
    var boxright = box1.children[2];
    var ul2 = box2.children[0];
    var inum = box1.querySelectorAll('.footerbar i');
    box1.style.width = defaultObj.iw + 'px';
    box2.style.width = defaultObj.iw + 'px';
    box1.style.height = defaultObj.ih + 'px';
    var html = defaultObj.img.map((item) => {
        return ` <li><a href="###"><img src="${item}" alt=""></a></li>`;
    }).join('');
    ul1.innerHTML = html;
    ul2.innerHTML = html;
    var now = 0;

    //box2区域能显示的最多图片数
    var smanum = (defaultObj.iw / (ul2.children[0].offsetWidth + 10));
    var smanum1 = parseInt(smanum / 2);
    inum[2].innerHTML = ul1.children.length;
    ul1.children[now].style.zIndex = 1;
    ul2.children[now].style.opacity = 1;
    var timer = null;

    let nextr = () => {
        now++;
        if (now > ul1.children.length - 1) {
            for (var i = 0; i < ul1.children.length; i++) {
                ul1.children[i].style.zIndex = 0;
            }
            now = 0;
        }
        moveopt();

    };
    let prevr = () => {
        now--;
        if (now < 0) {
            for (var i = 0; i < ul1.children.length; i++) {
                ul1.children[i].style.zIndex = 0;
            }
            now = ul1.children.length - 1;
        }
        moveopt();

    };
    let moveopt = () => {
        ul1.children[now].style.opacity = 0;
        ul1.children[now].style.zIndex = now + 1;
        startMove(ul1.children[now], {
            opacity: 100
        });
        smallnext();
        inum[0].innerHTML = now + 1;
        inum[1].innerHTML = now + 1;
    }
    let smallnext = () => {
        for (var i = 0; i < ul2.children.length; i++) {
            ul2.children[i].style.opacity = 0.6;
        }
        ul2.children[now].style.opacity = 1;
        //能显示小图区域的处于最中间的图片与大图想照应
        //当第n张图片小于小图区域最多显示出的图片数量除2的值时
        if (now <= smanum1) {
            ul2.style.left = 0;
        } else if (now > smanum1 && now < ul2.children.length - smanum1) {
            //当第n张图大于smanum1且小于ul2.children.length - smanum1时
            startMove(ul2, {
                left: -(ul2.children[0].offsetWidth + 10) * (now - smanum1)
            });
        }
        //当小图区域能显示出最后的几张图片时让其停止滚动
        //因为是最中的图片显示大图所以确定最后几张图最中间那张图的位置让其等于now时停止滚动
        if (now == ul2.children.length - smanum1) {
            ul2.style.left = -(ul2.children[0].offsetWidth + 10) * (ul2.children.length - parseInt(smanum)) + 'px';
        }
    }
    timer = setInterval(nextr, defaultObj.timer * 1000);

    box1.onmouseover = () => {
        clearInterval(timer);
    }
    box1.onmouseout = () => {
        timer = setInterval(nextr, defaultObj.timer * 1000);
    }
    boxright.onmouseover = boxleft.onmouseover = function () {
        startMove(this.children[0], {
            opacity: 100
        })
    }

    boxright.onmouseout = boxleft.onmouseout = function () {
        startMove(this.children[0], {
            opacity: 0
        })
    }
    boxright.onclick = () => {
        nextr();
    }
    boxleft.onclick = () => {
        prevr();
    }
}