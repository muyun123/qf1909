<?php

$num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '10';
$ipage = isset($_REQUEST['ipage']) ? $_REQUEST['ipage'] : '1';
$paixu = isset($_REQUEST['paixur']) ? $_REQUEST['paixur'] : 'mo';
$sear = isset($_REQUEST['text']) ? $_REQUEST['text'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'qf1909');
if ($conn->error) {
    exit('连接失败');
}
if ($sear) {
    $sql = "select * from goodlist where title like '%$sear%'";
} else {
    $sql = "select * from goodlist";
}

$obj = $conn->query($sql);
$res = $obj->fetch_all(MYSQLI_ASSOC);
$ipage1 = $num * ($ipage - 1);
if ($sear) {
    if ($paixu == 'mo') {
        $sql = "select * from goodlist where title like '%$sear%' limit $ipage1,$num";
    }
    if ($paixu == 'asc' || $paixu == 'desc') {
        $sql = "select * from goodlist where title like '%$sear%' order by sales $paixu limit $ipage1,$num ";
    }
} else {
    if ($paixu == 'mo') {
        $sql = "select * from goodlist limit $ipage1,$num";
    }
    if ($paixu == 'asc' || $paixu == 'desc') {
        $sql = "select * from goodlist order by sales $paixu limit $ipage1,$num ";
    }
}

$obj1 = $conn->query($sql);
$res1 = $obj1->fetch_all(MYSQLI_ASSOC);
$data = array(
    'sum' => $obj->num_rows,
    'num' => $num,
    'ipage' => $ipage,
    'res' => $res1,
);
echo json_encode($data, JSON_UNESCAPED_UNICODE);
