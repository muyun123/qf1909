(() => {
    var box = document.getElementById('box');
    var list = box.getElementsByTagName('ul')[0];
    var prev = box.getElementsByClassName('prev')[0];
    var next = box.getElementsByClassName('next')[0];
    var circle = box.getElementsByClassName('circle')[0];
    var imgr = ['../images/TB134ufe4n1gK0j.jpg_.webp',
        '../images/TB1DjMZeVP7.jpg_.webp',
        '../images/TB1ZnESa.jpg_.webp',
        '../images/TB1ZnESeAL0gK0j.jpg_.webp',
        '../images/TB1aM7zeHr1.jpg'
    ]
    var html = '';
    var html2 = '';
    imgr.forEach((item, index) => {
        html += ` <li data-index=${index}><a href=""><img src="${item}" alt=""></a></li>`;
        html2 += `<span data-index=${index}></span>`;
    });
    list.innerHTML = html;
    circle.innerHTML = html2;
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
    timer = setInterval(nextr, 2000);
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
    box.onmouseover = () => {
        clearInterval(timer);
        prev.style.display = 'block';
        next.style.display = 'block';
    }
    box.onmouseout = () => {
        timer = setInterval(nextr, 2000);
        prev.style.display = 'none';
        next.style.display = 'none';
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
})();