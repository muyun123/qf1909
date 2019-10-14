let drag = opt => {
    defaultObj = {
        ih: 40,
        iw: 300
    }
    Object.assign(defaultObj, opt);
    var easybox = document.getElementById(defaultObj.ele);
    var box1 = easybox.getElementsByClassName('box1')[0];
    var box2 = easybox.querySelector('.box2');
    var box3 = easybox.getElementsByClassName('box3')[0];
    var box4 = easybox.getElementsByClassName('box4')[0];
    var tongguo = easybox.getElementsByClassName('tongguo')[0];
    easybox.style.width = defaultObj.iw + 'px';
    easybox.style.height = defaultObj.ih + 'px';
    box2.style.width = defaultObj.ih + 'px';
    box4.style.width = defaultObj.ih + 'px';
    box4.style.lineHeight = defaultObj.ih + 'px';
    box4.onclick = function () {
        itop = box2.offsetTop;
        ileft = 0;
        box2.style.left = ileft + 'px';
        box2.style.top = itop + 'px';
        box3.style.width = ileft + 'px';
        box2.style.background = '#757575';
        tongguo.innerHTML = '';
        tuoz();
    }
    tuoz();

    function tuoz() {
        box2.onmousedown = function (ev) {
            var irel = ev.offsetX;
            document.onmousemove = function (ev) {
                var ileft = ev.pageX - irel - box1.offsetLeft;
                if (ileft >= defaultObj.iw - defaultObj.ih) {
                    ileft = defaultObj.iw - defaultObj.ih;
                } else if (ileft <= 0) {
                    ileft = 0;
                }
                box2.style.left = ileft + 'px';
                box3.style.width = ileft + 'px';

            }
            document.onmouseup = function (ev) {
                document.onmousemove = null;
                ileft = ev.pageX - irel - box1.offsetLeft;

                if (ileft >= defaultObj.iw - defaultObj.ih) {
                    ileft = defaultObj.iw - defaultObj.ih;
                    box2.style.background = 'red';
                    box2.onmousedown = null;
                    document.onmouseup = null;
                    tongguo.innerHTML = '验证通过';
                } else {
                    ileft = 0;
                    box2.style.background = '#757575';

                }
                box2.style.left = ileft + 'px';
                box3.style.width = ileft + 'px';
            }

        }
    }
}