(function () {
    init();
    var list = document.getElementById('list');

    function init() {
        ajax({
            type: 'get',
            url: './api/list.php',
            succ(str) {
                var arr = JSON.parse(str);
                creadoc(arr);
            }
        });
    }

    function creadoc(arr) {
        var html = '';
        for (var key in arr) {
            var img1 = '';
            for (var i = 0; i < arr[key].img.length; i++) {
                img1 += ` <img src="${arr[key].img[i]}" alt="">`;
            }

            html += `
                <li>
                    <div class="big-img">
                    <a href="${objStr(arr[key], 'detail.html')}"  target="_blank">
                        <img class="bigimg"
                            src="${arr[key].img[0]}" alt="" ></a>
                        <p><a href="">找同款</a><span>|</span><a href="">找相似</a></p>
                    </div>
                    <div class="smallimg" id="listsmall">
                       ${img1}
                    </div>
                    <h4><span>￥${arr[key].price}</span>
                        <span>${arr[key].gid}</span><span>已有${arr[key].sales}人付款</span></h4>
                    <p><a href="${objStr(arr[key],'detail.html')}"  target="_blank">${arr[key].title}</a></p>
                    <p>
                        <span><a href="javascript:;">${arr[key].shop}</a></span>
                        <span>${arr[key].gid}</span>
                    </p>
                    <p><span>如实描述：${arr[key].gid}</span> </p>
                </li>`;
            list.innerHTML = html;
        }
        //获取小图的父元素
        var smallimg = list.getElementsByClassName('smallimg');
        //小图第一个选中效果
        console.log(smallimg);
        for (var i = 0; i < smallimg.length; i++) {
            smallimg[i].children[0].className = 'checked';
        }

        //获取所有的小图的集合
        var smallpic = list.getElementsByTagName('img');
        for (var i = 0; i < smallpic.length; i++) {
            //循环判断是否有点击事件
            smallpic[i].onclick = function () {
                //将大图的src变成点击小图的src
                this.parentNode.previousElementSibling.children[0].children[0].src = this.src;
                //去除小图标签的class名
                for (var j = 0; j < this.parentNode.children.length; j++) {
                    this.parentNode.children[j].className = '';
                }
                //点击小图的效果
                this.className = 'checked';
            }
        }
    }



    function objStr(obj, url) {

        if (url) {
            var str = url + '?';
        } else {
            var str = '';
        }
        str += 'nowgid' + '=' + obj.gid + '&';

        return str.slice(0, -1);
    }
})();