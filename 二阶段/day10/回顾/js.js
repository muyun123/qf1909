   //随机点名程序
   function rallname(a, b) {
       var html = b.map(function (item1) {
           return `
                   <span> ${item1}</span>
                `;
       }).join('');
       //    console.log(html);
       a.innerHTML = html;
   }

   function clickstar(a) {
       return parseInt(Math.random() * a);
   }