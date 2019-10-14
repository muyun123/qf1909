<?php
$uid = isset($_REQUEST['uid']) ? $_REQUEST['uid'] : '';
$g = isset($_REQUEST['g']) ? $_REQUEST['g'] : '';
$selenum = isset($_REQUEST['selenum']) ? $_REQUEST['selenum'] : '';
$idn = isset($_REQUEST['idn']) ? $_REQUEST['idn'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'qf1909');
if ($conn->error) {
    exit('链接失败');
}
if ($g == 'getnum') {
    $sql = "select * from shopcar inner join goodlist on shopcar.gid=goodlist.gid";
    $obj = $conn->query($sql);
    $res = $obj->fetch_all(MYSQLI_ASSOC);
    for ($i = 0; $i < count($res); $i++) {
        if ($res[$i]['uid'] == $uid) {
            $arr[$res[$i]['shop']][] = $res[$i];
        }
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
} else if ($g == 'setnum') {
    $sql = "update shopcar set num='$selenum' where idn='$idn'";
    $obj = $conn->query($sql);
} else if ($g == 'delet') {
    $sql = "delete from shopcar where idn='$idn'";
    $obj = $conn->query($sql);
}
