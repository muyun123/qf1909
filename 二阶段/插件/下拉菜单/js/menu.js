let menur = opt => {
    let defoltObj = {

    }
    Object.assign(defoltObj, opt);
    var seconmenu = document.getElementById(defoltObj.ele);
    var list = seconmenu.getElementsByClassName('list')[0];

    var html = '';
    for (var key in defoltObj.navtitlr) {
        html += `<li><a href="###">${key}</a>
                    <ul class="list2">`;
        html += defoltObj.navtitlr[key].map((item) => {
            return `<li><a href="###">${item}</a></li>`;
        }).join('');
        html += `</ul></li>`;
    }
    list.innerHTML = html;
    var list2 = seconmenu.getElementsByClassName('list2');

    for (var i = 0; i < list.children.length; i++) {
        list.children[i].index = i;
        list.children[i].onclick = function () {
            if (!list2[this.index].istrue) {
                list2[this.index].style.display = 'block';
                list2[this.index].istrue = true;
            } else {
                list2[this.index].style.display = 'none';
                list2[this.index].istrue = false;
            }

        }
    }

}