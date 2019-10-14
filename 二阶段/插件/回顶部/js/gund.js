let gund = opt => {
    let defaultObj = {
        timer: 30,
    }
    Object.assign(defaultObj, opt);
    var firetop = document.getElementById(defaultObj.ele);
    //当有滚动时触发事件
    window.onscroll = function () {
        var num = window.scrollY; //获取滚动条的移动距离
        var num1 = window.innerHeight; //屏幕可视区的高度
        if (num > 200) {
            firetop.style.display = 'block'; //让回到顶部的小火箭出现
        } else if (num <= 0) {
            firetop.style.bottom = num1 + 'px'; //改变定位的位置
        }
    }
    //点击事件
    firetop.onclick = function () {
        var scrolltop = window.scrollY;
        var timer = setInterval(function () { //定时器启动
            scrolltop -= 50;
            if (scrolltop <= -window.innerHeight) {
                firetop.style.display = 'none'; //小火箭隐藏
                firetop.style.animation = ''; //清除动画
                firetop.style.bottom = 0 + 'px'; //还原小火箭位置
                clearInterval(timer);
            }
            window.scrollTo(0, scrolltop); //设置滚动条距离顶部的距离
        }, defaultObj.timer);
        this.style = 'animation:move 2s steps(4, end) infinite;' //给动画
    }

}