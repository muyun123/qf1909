var username = document.getElementById('username'); //账号
var nickname = document.getElementById('nickname'); //昵称
var email = document.getElementById('email'); //电子邮件
var identity = document.getElementById('identity'); //身份证
var phone = document.getElementById('phone'); //手机号码
var password = document.getElementById('password'); //密码
var confirmpwd = document.getElementById('confirm_pwd'); //确认密码
var myform = document.getElementById('myform');
var spp = myform.getElementsByTagName('span');
// 账号
username.onblur = function () {
    regula({
        reg: /^[0-9a-zA-Z]{6,20}$/,
        school: spp[0],
        ele: this.value,
        // regyes: '正确',
        // regno: '不通过',
        // yescolor: '#58bc58',
        // nocolor: 'red'
    });
}
//昵称
nickname.onblur = function () {
    regula({
        reg: /^[\Wa-zA-Z0-9]+$/,
        school: spp[1],
        ele: this.value,
    });
}
//电子邮箱
email.onblur = function () {
    regula({
        reg: /^\w+@\w+.[a-zA-Z]+$/,
        school: spp[2],
        ele: this.value,
    });
}
//身份证
identity.onblur = function () {
    regula({
        reg: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        ele: this.value,
        school: spp[3],
    });
}
//手机号码
phone.onblur = function () {
    regula({
        reg: /^1[3-9]\d{9}$/,
        ele: this.value,
        school: spp[4],
    });
}
confirmpwd
//密码
password.onblur = function () {
    regula({
        reg: /^[\w@!#$%^&*,./;:]{6,20}$/,
        school: spp[5],
        ele: this.value,
    });
}
//确认密码
confirmpwd.onblur = function () {
    var num = password.value;
    if (this.value == num) {
        spp[6].innerHTML = '正确';
        spp[6].style.color = '#58bc58';
    } else {
        spp[6].innerHTML = '不通过';
        spp[6].style.color = 'red';
    }
}

function regula(opt) {
    if (opt.ele.trim()) {
        var isok = opt['reg'].test(opt.ele);
        if (isok) {
            opt.school.innerHTML = '正确';
            opt.school.style.color = '#58bc58';
        } else {
            opt.school.innerHTML = '不通过';
            opt.school.style.color = 'red';
        }
    }
}