function viewgun(opt) {
    defaultObj = {
        iw: 520,
        ih: 280,
        focuscir: false,
        timer: 2
    }
    Object.assign(defaultObj, opt);
    var box = document.getElementById(defaultObj.ele);
    var list = box.getElementsByTagName('ul')[0];
    var prev = box.getElementsByClassName('prev')[0];
    var next = box.getElementsByClassName('next')[0];
    var circle = box.getElementsByClassName('circle')[0];
    var html = '';
    var html2 = '';
    box.style.width = defaultObj.iw + 'px';
    box.style.height = defaultObj.ih + 'px';

    defaultObj.imgr.forEach((item, index) => {
        html += ` <li data-index=${index}><a href=""><img src="${item}" alt=""></a></li>`;
        html2 += `<span data-index=${index}></span>`;
    });
    list.innerHTML = html;
    circle.innerHTML = html2;
    for (var i = 0; i < list.children.length; i++) {
        list.children[i].style.width = defaultObj.iw + 'px';
    }
    circle.children[0].className = 'active';
    var lir = list.children[0].cloneNode(true);
    list.appendChild(lir);
    var iwit = list.children[0].offsetWidth;
    list.style.width = iwit * list.children.length + 'px';
    list.children[0].style.left = 0;
    var now = 0;
    var timer = null;
    let nextr = () => {
        now++;
        if (now > list.children.length - 1) {
            now = 1;
            list.style.left = 0;
        }
        mover();
    }
    timer = setInterval(nextr, defaultObj.timer * 1000);
    let prevr = () => {
        now--;
        if (now < 0) {
            now = list.children.length - 2;
            list.style.left = -(list.children.length - 1) * iwit + 'px';
        }

        mover();
    }
    let mover = () => {
        startMove(list, {
            left: -now * iwit
        });
        jiaodian();
    }

    function jiaodian() {
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = '';
        }
        var index = list.children[now].dataset.index;
        circle.children[index].className = 'active';
    }
    if (defaultObj.focuscir) {
        prev.style.display = 'block';
        next.style.display = 'block';
    }
    box.onmouseover = () => {
        clearInterval(timer);
        if (!defaultObj.focuscir) {
            prev.style.display = 'block';
            next.style.display = 'block';
        }
    }
    box.onmouseout = () => {
        if (!defaultObj.focuscir) {
            timer = setInterval(nextr, defaultObj.timer * 1000);
            prev.style.display = 'none';
            next.style.display = 'none';
        }
    }
    prev.onclick = () => {
        prevr();
    }
    next.onclick = () => {
        nextr();
    }
    circle.onclick = (ev) => {
        if (ev.target.tagName.toLowerCase() == 'span') {
            // list.children[ev.dataset.index];
            now = ev.target.dataset.index;
            startMove(list, {
                left: -now * iwit
            });
            jiaodian()
        }
    }
}