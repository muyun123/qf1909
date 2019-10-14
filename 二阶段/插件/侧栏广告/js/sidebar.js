function asideadv(opt) {
    defaultObj = {
        attrval1: 0, //移入属性值1
    }
    Object.assign(defaultObj, opt)
    var box1 = document.getElementById(defaultObj.ele);
    var box2 = box1.getElementsByClassName('box2')[0];
    css(box2, 'width', defaultObj.iw);
    css(box2, 'height', defaultObj.ih);
    box1.onmouseover = function () {
        startMove(this, {
            right: opt.attrval1
        });
    }

    box1.onmouseout = function () {
        startMove(this, {
            right: -defaultObj.iw
        });
    }


    function move(a) {
        clearInterval(box1.timer);
        box1.timer = setInterval(function () {
            var cur = 0;
            cur = parseInt(css(box1, 'right'));
            var speed = (a - cur) / 2;
            speed = Math.floor(speed);
            console.log(cur);
            if (cur == a) {
                clearInterval(box1.timer);
            }
            box1.style.right = cur + speed + 'px';
        }, defaultObj.timer);
    }

}