<?php
$ii = isset($_REQUEST['ii']) ? $_REQUEST['ii'] : '';
$size = isset($_REQUEST['size']) ? $_REQUEST['size'] : '';
$imgurl = isset($_REQUEST['imgurl']) ? $_REQUEST['imgurl'] : '';
$color = isset($_REQUEST['color']) ? $_REQUEST['color'] : '';
$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
$buynumr = isset($_REQUEST['buynumr']) ? $_REQUEST['buynumr'] : '';
$haveshopr = isset($_REQUEST['haveshopr']) ? $_REQUEST['haveshopr'] : '';
$gid = isset($_REQUEST['gidr']) ? $_REQUEST['gidr'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'qf1909');
if ($conn->error) {
    exit('链接失败');
}
if ($ii == 'shopcar') {
    $sql = "insert into shopcar(num,goodtype,newprice,oldprice,gid,img,uid,kucun) values('$buynumr','尺码$size','23','45','$gid','$imgurl','$uid','$haveshopr')";
    $obj = $conn->query($sql);
    echo $sql;
    print_r($obj);
    // if ($obj->num_rows) {
    //     echo 11;
    // }
}
