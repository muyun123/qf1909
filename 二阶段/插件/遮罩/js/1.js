function zhezhao(opt) {
    var defultObj = {
        opa: 60,
        ih: 200,
        iw: 200,
    }
    Object.assign(defultObj, opt);
    var ele = document.getElementById(defultObj.ele);
    var lii = ele.getElementsByTagName('li');
    var adv = ele.getElementsByClassName('advtop')[0];
    var num = defultObj.timer;
    adv.children[0].children[0].innerHTML = num;
    var timer1 = setInterval(() => {
        num--;
        if (num < 0) {
            clearInterval(timer1);
            ele.style.display = 'none';
        }
        adv.children[0].children[0].innerHTML = num;

    }, 1000);
    adv.children[1], onclick = () => {
        ele.style.display = 'none';
    }
}