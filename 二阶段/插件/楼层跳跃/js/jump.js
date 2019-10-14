let jump=()=>{
     var layer = document.getElementsByClassName('layer');
     var box = document.getElementById('box')
     var btn = box.getElementsByTagName('div');
     for (var i = 0; i < layer.length; i++) {
         layer[i].style.height = window.innerHeight + 'px';
     }
     window.onscroll = function () {
         var num = window.scrollY;
         for (var i = 0; i < layer.length; i++) {
             if (num >= layer[i].offsetTop) {
                 for (var j = 0; j < btn.length; j++) {
                     btn[j].className = '';
                 }
                 btn[i].className = 'activ';
             }
         }
     }
     for (var i = 0; i < btn.length; i++) {
         btn[i].index = i;
         btn[i].onclick = function () {
             for (var j = 0; j < btn.length; j++) {
                 btn[j].className = '';
             }
             this.className = 'activ';
             window.scrollTo(0, window.innerHeight * this.index);
         }
     }
}