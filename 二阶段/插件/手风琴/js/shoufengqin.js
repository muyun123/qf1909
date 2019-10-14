let accordion = (opt) => {
    defaultObj = {
        bgcolor: '#lightblue',
        iw: 120,
        ih: 40,
        timer: 30 //毫秒
    }
    Object.assign(defaultObj, opt);
    var box = document.getElementById(defaultObj.ele);

    var html = '';
    for (var i in defaultObj.navtit) {
        html += `<div class="con">
        <h1 style="height:${defaultObj.ih}px;width:${defaultObj.iw}px;line-height:${defaultObj.ih}px;">
         ${i}</h1><ul>`;
        html += defaultObj.navtit[i].map((item) => {
            return `<li style="height:${defaultObj.ih}px;width:${defaultObj.iw}px;line-height:${defaultObj.ih}px;">
            ${item}</li>`;
        }).join('');
        html += '</ul> </div>';
    }
    box.innerHTML = html;
    var con = box.getElementsByClassName('con');

    for (var i = 0; i < con.length; i++) {
        con[i].isok = true;
        con[i].children[0].index = i;
        con[i].children[0].onclick = function () {
            var oph = con[this.index].children[1].children.length * defaultObj.ih;
            if (this.parentNode.isok) {
                openclos(this.parentNode.children[1], {
                    height: oph
                });
                this.parentNode.isok = false;
            } else {
                this.parentNode.isok = true;
                openclos(this.parentNode.children[1], {
                    height: 0
                });

            }

        }
    }

    function openclos(ele, opt, fn) {
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            var istrue = false;
            for (var key in opt) {
                var cur = 0;
                if (key == 'opacity') {
                    cur = ele.style.opacity * 100;
                } else {
                    cur = parseInt(css(ele, key));
                }

                var speed = (opt[key] - cur) / 4;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cur == opt[key]) {

                    istrue = true;
                } else {
                    istrue = false;
                }
                if (key == 'opacity') {
                    ele.style.opacity = (cur + speed) / 100;
                    obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                } else {
                    ele.style[key] = speed + cur + 'px';
                }
            }
            if (istrue) {
                clearInterval(ele.timer);
                if (fn) {
                    fn();
                }
            }
        }, defaultObj.timer);
    }
}