<?php
$conn = new mysqli('localhost', 'root', 'root', 'qf1909');

$sql = " select goodlist.gid,goodsimg.imgurl from goodlist inner join goodsimg on goodlist.gid=goodsimg.gid";
$obj = $conn->query($sql);
$num = $obj->num_rows;
$res = $obj->fetch_all(MYSQLI_ASSOC);
$arr = array();
for ($i = 0; $i < $num; $i++) {
    if ($res[$i]['gid'] == 0) {
        $arr[$i] = $res[$i]['imgurl'];
    }
}
echo json_encode($arr, JSON_UNESCAPED_UNICODE);
