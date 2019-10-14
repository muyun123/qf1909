<?php
$gid = isset($_REQUEST['gid']) ? $_REQUEST['gid'] : '';
$n = isset($_REQUEST['n']) ? $_REQUEST['n'] : '';
$n1 = isset($_REQUEST['n1']) ? $_REQUEST['n1'] : '';
$n2 = isset($_REQUEST['n2']) ? $_REQUEST['n2'] : '';
$n3 = isset($_REQUEST['n3']) ? $_REQUEST['n3'] : '';
$ipage = isset($_REQUEST['ipage']) ? $_REQUEST['ipage'] : '';
$pagenum = isset($_REQUEST['pagenum']) ? $_REQUEST['pagenum'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'qf1909');
if ($conn->error) {
    exit('连接失败');
}
$page = ($ipage - 1) * $pagenum;
$sql = "select * from goodlist";

if ($n1 != '' && $n2 != '') {
    $sql .= " where price between $n1 and $n2";
    if ($n3 != '') {
        $sql .= " and title like '%$n3%'";
    }
}
if ($n3 != '' && $n1 == '' && $n2 == '') {
    $sql .= " where title like '%$n3%'";
} else if ($n == 'add') {
    $sql .= " order by price asc";
} else if ($n == 'sub') {
    $sql .= " order by price desc";
}
$sum = $conn->query($sql);
if ($ipage && $pagenum) {
    $sql .= " limit $page,$pagenum";
}
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
if ($gid != '') {
    for ($i = 0; $i < count($res); $i++) {
        if ($res[$i]['gid'] == $gid) {
            $res = $res[$i];
            break;
        }
    }
} else {
    $res = [
        "sum" => $sum->num_rows,
        'list' => $res,
    ];
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
