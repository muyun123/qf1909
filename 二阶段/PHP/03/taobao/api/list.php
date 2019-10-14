<?php
$gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'qf1909');
if ($conn->error) {
    exit('连接失败');
}
$sql = "select * from goodlist limit 0,12";
$obj = $conn->query($sql);
$res = $obj->fetch_all(MYSQLI_ASSOC);
$sql1 = "select * from goodsimg";
$obj1 = $conn->query($sql1);
$res1 = $obj1->fetch_all(MYSQLI_ASSOC);
$arr = array();
for ($i = 0; $i < count($res1); $i++) {
    $arr[$res1[$i]['gid']][] = $res1[$i]['imgurl'];
}
for ($j = 0; $j < count($res); $j++) {
    for ($i = 0; $i < count($arr); $i++) {
        if ($res[$j]['gid'] == $i) {
            $res[$j]['img'] = $arr[$res[$j]['gid']];
        }
    }
}
if ($gid) {
    for ($i = 0; $i < count($res); $i++) {
        if ($res[$i]['gid'] == $gid) {
            $res = $res[$i];
            break;
        }
    }
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
