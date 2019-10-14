(() => {
    var username1 = document.getElementById('username1');
    var password1 = document.getElementById('password1');
    var btnReg = document.getElementById('btnReg');
    var verifyUserNameMsg = document.getElementById('verifyUserNameMsg');
    var lshowMoreist = document.getElementById('showMore');
    var ipage = 1;
    var num = 10;
    /*
	验证用户名
	请求方式：get
		接口路径：guestbook/index.php
		参数：
			m : index
			a : verifyUserName
			username : 要验证的用户名
		返回数据：
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息具体返回信息
			}
	*/
    username1.onblur = () => {
        ajax({
            type: 'get',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'verifyUserName',
                username: username1.value.trim()
            },
            success(str) {
                var arr = JSON.parse(str);
                if (arr.code == 0) {
                    verifyUserNameMsg.style.color = '#58bc58';
                } else if (arr.code == 1) {
                    verifyUserNameMsg.style.color = 'red';
                }
                verifyUserNameMsg.innerHTML = arr.message;
            }
        });
    }

    /*
	用户注册
	get/post
		guestbook/index.php
			m : index
			a : reg
			username : 要注册的用户名
			password : 注册的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
    */
    var username2 = document.getElementById('username2');
    btnReg.onclick = () => {
        ajax({
            type: 'post',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'reg',
                username: username1.value.trim(),
                password: password1.value.trim(),
            },
            success(str) {
                var arr = JSON.parse(str);
                if (arr.code == 0) {
                    alert(arr.message);
                    username1.value = '';
                    password1.value = '';
                    verifyUserNameMsg.innerHTML = '';
                    username2.focus();
                }
            }
        });
    }
    /*
	用户登陆
	get/post
		guestbook/index.php
			m : index
			a : login
			username : 要登陆的用户名
			password : 登陆的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
    */
    var password2 = document.getElementById('password2');
    var btnLogin = document.getElementById('btnLogin');
    var content = document.getElementById('content');
    var reg = document.getElementById('reg');
    var login = document.getElementById('login');
    var userinfo = document.getElementById('userinfo');
    var user = document.getElementById('user');

    btnLogin.onclick = () => {
        ajax({
            type: 'post',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'login',
                username: username2.value.trim(),
                password: password2.value.trim(),
            },
            success(str) {

                var arr = JSON.parse(str);
                if (!arr.code) {
                    username2.value = '';
                    password2.value = '';
                    content.focus();
                }
                updata();
                alert(arr.message);
            }
        });
    }
    updata();

    function updata() {
        var data = document.cookie;
        var arr = [];
        var obj = {};
        arr = data.split('; ');
        for (var val of arr) {
            var arr1 = val.split('=');
            obj[arr1[0]] = arr1[1];
        }

        if (obj.uid) {
            //登陆中
            user.style.display = 'block';
            login.style.display = 'none';
            reg.style.display = 'none';
            userinfo.innerHTML = obj.username;
        } else {
            //登出中
            user.style.display = 'none';
            login.style.display = 'block';
            reg.style.display = 'block';
            userinfo.innerHTML = '';
        }
    }
    /*
	用户退出
	get/post
		guestbook/index.php
			m : index
			a : logout
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
    */
    var logout = document.getElementById('logout');
    logout.onclick = () => {
        ajax({
            type: 'post',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'logout',
            },
            success(str) {
                var arr = JSON.parse(str);
                if (!arr.code) {
                    userinfo.innerHTML = '';
                    reg.style.display = 'block';
                    login.style.display = 'block';
                }
                updata();
                alert(arr.message);
            }
        });
    }
    /*
	留言
	post
		guestbook/index.php
			m : index
			a : send
			content : 留言内容
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
					{
						cid : 留言id	
						content : 留言内容 
						uid : 留言人的id
						username : 留言人的名称
						dateline : 留言的时间戳(秒)
						support : 当前这条留言的顶的数量
						oppose : 当前这条留言的踩的数量
					}
				message : 返回的信息 具体返回信息
			}
    */
    var btnPost = document.getElementById('btnPost');
    var content = document.getElementById('content');
    var list = document.getElementById('list');
    btnPost.onclick = () => {
        if (content.value.trim()) {
            ajax({
                type: 'post',
                url: 'guestbook/index.php',
                data: {
                    m: 'index',
                    a: 'send',
                    content: content.value.trim()
                },
                success(str) {
                    var arr = JSON.parse(str);
                    if (!arr.code) {
                        content.value = '';
                        content.focus();
                    }
                    crethtml(arr.data);
                    alert(arr.message);
                }
            });

        }

    }

    showList();
    //初始化留言列表
    function showList() {
        ajax({
            type: 'get',
            url: 'guestbook/index.php',
            data: {
                m: 'index',
                a: 'getList',
                page: ipage,
                n: num
            },
            success(str) {
                var arr = JSON.parse(str);
                if (ipage >= arr.data.pages) {
                    lshowMoreist.onclick = null;
                    lshowMoreist.style.display = 'none';
                }
                for (var i in arr.data.list) {
                    crethtml(arr.data.list[i], 'one');
                }
            }
        });
    }

    function crethtml(arr, one) {
        var html = ''
        html += `<dl >
                        <dt>
                            <strong>${arr.username}</strong> 说 :
                        </dt>
                        <dd>${arr.content} 发布时间：${timestampToTime(arr.dateline)}</dd>
                        <dd class="t" data-id="${arr.cid}">
                            <a href="javascript:;" class="support">顶(<span>${arr.support}</span>)</a>
                            |
                            <a href="javascript:;" class="oppose">踩(<span>${arr.oppose}</span>)</a>
                        </dd>
                    </dl>`;

        if (one) {
            list.innerHTML += html;
        } else {
            list.innerHTML = html + list.innerHTML;
        }


        function timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        }
    }

    //查看更多
    lshowMoreist.onclick = () => {
        ipage++;
        showList();
    }

    var list = document.getElementById('list');
    //顶帖
    list.onclick = (ev) => {
        console.log(ev.target.className);
        if (ev.target.className == 'support') {
            var ad = 'doSupport';
            var cid = ev.target.parentNode.dataset.id;
            var num = ev.target.children[0].innerHTML;
            num++;
            aa();
        }
        if (ev.target.className == 'oppose') {
            var ad = 'doOppose';
            var cid = ev.target.parentNode.dataset.id;
            var num = ev.target.children[0].innerHTML;
            num++;
            aa();
        }

        function aa() {
            ajax({
                type: 'post',
                url: 'guestbook/index.php',
                data: {
                    m: 'index',
                    a: ad,
                    cid: cid
                },
                success(str) {
                    var arr = JSON.parse(str);
                    if (!arr.code) {
                        ev.target.children[0].innerHTML = num;
                    }
                    alert(arr.message);
                }
            });
        }

    }


})();