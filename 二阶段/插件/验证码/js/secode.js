let secode = (opt) => {
    var defoultObj = {

    };
    Object.assign(defoultObj, opt);
    var cscode = document.getElementById(defoultObj.ele);
    var box = cscode.getElementsByTagName('span');
    var btn = document.getElementById('btn');
    var box2 = cscode.getElementsByClassName('box1')[0];
    var res = document.getElementById('res');
    var input1 = document.getElementById('num1');


    function mouseclick() {
        var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
        var numb2 = '';
        for (var i = 0; i < 4; i++) {
            var num = parseInt(Math.random() * str.length);
            var num1 = str[num];
            box[i].innerHTML = num1;
            numb2 += num1;
        }
        var str1 = '0123456789abcdef';
        var num3 = '';
        for (var j = 0; j < 6; j++) {
            var num2 = parseInt(Math.random() * str1.length);
            num3 += str1[num2];
        }
        box2.style = 'background:linear-gradient(45deg,#' + num3 + ',rgba(214,64,132,0.3))';

        for (var i = 0; i < 4; i++) {
            var deg1 = Math.random() * 45;
            var deg2 = Math.random() > Math.random() ? '+' : '-';
            var num5 = Math.random() / 3 * 50 + 10;
            console.log('transform: rotateZ(' + deg2 + deg1 + 'deg)');
            box[i].style = 'font-size:' + num5 + 'px;transform-style: preserve-3d; transform: rotateZ(' + deg2 + deg1 + 'deg);perspective:99 px';
        }
        return numb2;
    }


    var numbb = mouseclick();
    btn.onclick = function () {
        mouseclick();
        numbb = mouseclick();
    }
    input1.oninput = function () {
        console.log(numbb);
        var numb = this.value;
        if (numb == numbb) {
            res.innerHTML = '验证码正确';
            res.style.color = "#58bc58";
        } else {
            res.innerHTML = '验证码错误';
            res.style.color = "red";

        }

    }
}