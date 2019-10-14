 let option = () => {
     var top = document.getElementById('top');
     var main = document.getElementsByClassName('main');
     var spp = top.getElementsByTagName('span');

     for (var i = 0; i < spp.length; i++) {
         spp[i].index = i;

         spp[i].onclick = function () {
             for (var j = 0; j < spp.length; j++) {
                 spp[j].className = '';
                 main[j].style.display = 'none';
             }

             this.className = 'clicked';

             main[this.index].style.display = 'block';
         }
     }
 }