(() => {
    var username3 = document.getElementById('username3');
    var password3 = document.getElementById('password3');
    var btn2 = document.getElementById('btn2');
    var usedname = document.getElementById('usedname');
    var regbar = document.getElementById('regbar');
    var regbtn = document.getElementById('regbtn');
    var password = document.getElementById('password');
    var username = document.getElementById('username');
    var userok = false;
    regbtn.onclick = () => {
        regbar.style.display = 'block';
    }
    //验证用户名
    /**
     * 请求方式：get
     * 接口路径: './api/login.php'
     * 参数：
             n: 'ru',
             user: 用户名
     *返回数据 {
                code:0=有错,1=没有错,
                message:返回的信息}

     */
    username3.onblur = () => {
        ajax({
            type: 'get',
            url: './api/login.php',
            data: {
                n: 'ru',
                user: username3.value.trim()
            },
            succ(str) {
                var arr = JSON.parse(str);
                console.log(arr);
                if (!arr.code) {
                    usedname.innerHTML = arr.message;
                    usedname.style.color = 'red';
                } else {
                    usedname.innerHTML = arr.message;
                    usedname.style.color = '#58bc58';
                    userok = true;
                }
            }
        });
    }
    //提交注册
    /**
     * 请求方式：post
     * 接口路径: './api/login.php'
     * 参数：
             n: 'rb',
             user: 用户名
             password:密码
     *返回数据 {
                code:0=有错,1=没有错,
                message:返回的信息}

     */
    btn2.onclick = () => {
        if (userok) {
            ajax({
                type: 'post',
                url: './api/login.php',
                data: {
                    n: 'rb',
                    user: username3.value.trim(),
                    password: password3.value.trim(),
                },
                succ(str) {
                    var arr = JSON.parse(str);
                    if (arr.code) {
                        alert(arr.message);
                        userok = false;
                        username3.value = '';
                        password3.value = '';
                        regbar.style.display = 'none';
                        username.focus();
                    } else {
                        alert(arr.message);
                    }
                }
            });
        } else {
            alert('用户名非法')
        }

    }
    //登录
    /**
     * 请求方式：post
     * 接口路径: './api/login.php'
     * 参数：
             n: 'lb',
             user: 用户名
             password:密码
     *返回数据 {
                code:0=有错,1=没有错,
                message:返回的信息,
                data:{
                    username:用户名
                    uid:用户id
                }}

     */
    var checkbox = document.getElementById('checkbox');
    var btn = document.getElementById('btn');
    btn.onclick = function () {
        ajax({
            type: 'post',
            url: './api/login.php',
            data: {
                n: 'lb',
                user: username.value.trim(),
                password: password.value.trim(),
            },
            succ(str) {
                var arr = JSON.parse(str);
                if (arr.code) {
                    login7day(arr.data);
                }
                alert(arr.message);
                location.href = getcookie('url');
            }
        });
    }
    //七天免登陆
    function login7day(arr) {
        if (checkbox.checked) {
            for (var key in arr) {
                setcookie(key, arr[key], 7);
            }
        } else {
            for (var key in arr) {
                setcookie(key, arr[key], 0);
            }
        }
    }

    function setcookie(key, val, time) {
        var now = new Date();
        now.setDate(now.getDate + time);
        document.cookie = key + '=' + val + ';expires=' + now + ';path=/';
    }

    function getcookie(key) {
        var str = document.cookie;
        var arr = str.split('; ');
        for (var item of arr) {
            var arr1 = item.split('=');
            if (key == arr1[0]) {
                return arr1[1];
            }
        }
    }
    //判断是否已登录过
    if (getcookie('uid') && getcookie('username')) {
        location.href = 'index.html?username=' + getcookie('username');
    }
})();