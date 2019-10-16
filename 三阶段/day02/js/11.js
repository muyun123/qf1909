 function quchong(str) {
     var str1 = '';
     for (var i in str) {
         if (str1.indexOf(str[i]) < 0) {
             str1 += str[i];
         }
     }
     //  return str1;
 }
