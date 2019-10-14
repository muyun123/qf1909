(() => {
    var box = document.getElementById('box');
    var box1 = box.getElementsByClassName('box1')[0];
    var box2 = box.getElementsByClassName('box2')[0];
    var ul1 = box1.children[0];
    var boxleft = box1.children[1];
    var boxright = box1.children[2];
    var ul2 = box2.children[0];
    var inum = box1.querySelectorAll('.footerbar i');
    var img = ['../images/3.png', '../images/5.png',
        '../images/6.png', '../images/7.png',
        '../images/8.png', '../images/9.png'
    ];
    var html = img.map((item) => {
        return ` <li><a href="###"><img src="${item}" alt=""></a></li>`;
    }).join('');
    ul1.innerHTML = html;
    ul2.innerHTML = html;
    var now = 0;

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
        inum[0].innerHTML = now+1;
        inum[1].innerHTML = now+1;
    }
    let smallnext = () => {
        for (var i = 0; i < ul2.children.length; i++) {
            ul2.children[i].style.opacity = 0.6;
        }
        ul2.children[now].style.opacity = 1;
        if (now <= 1) {
            ul2.style.left = 0;
        } else if (now == ul2.children.length - 1) {
            ul2.style.left = -(ul2.children[0].offsetWidth + 10) * (ul2.children.length - 3);
        } else {
            startMove(ul2, {
                left: -(ul2.children[0].offsetWidth + 10) * (now - 1)
            });
        }
    }
    timer = setInterval(nextr, 2000);

    box1.onmouseover = () => {
        clearInterval(timer);
    }
    box1.onmouseout = () => {
        timer = setInterval(nextr, 2000);
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
})();