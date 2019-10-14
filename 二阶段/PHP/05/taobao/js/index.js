(() => {
    var login = document.getElementById('login');
    var usertui = document.getElementById('usertui');
    var user = document.getElementById('user');
    var tuichu = document.getElementById('tuichu');
    if (getcookie('uid') && getcookie('username')) {
        usertui.style.display = 'block';
        login.style.display = 'none';
        user.innerHTML = getcookie('username');
    } else {
        login.style.display = 'block';
        usertui.style.display = 'none';
    }
    var url = location.href;
    setcookie('url', url);
    tuichu.onclick = () => {
        removeCookie('uid');
        removeCookie('username');
        location.reload();
    }
})();