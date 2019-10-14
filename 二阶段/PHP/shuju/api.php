<?php
//3.接收id。修改json数据里面，对应的id那条数据的点赞数量，在原本基础上加一
//isset() 是否接收到了参数，返回真假
$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';

//文件路径
$path = 'nav.json';

//打开文件
$file = fopen($path, 'r'); //只读

//读取文件
$content = fread($file, filesize($path)); //拿到字符串


// var_dump($content);
//关闭
fclose($file);
// echo $content;
$arr = json_decode($content, true);
$arr1 = array();
for ($i = 0; $i < count($arr); $i++) {
    $arr1[$i] = $arr[$i];
}
// var_dump($arr1);
$conn = new mysqli('localhost', 'root', 'root', 'xiaomi');
for ($i = 0; $i < count($arr1); $i++) {
    $sql = 'insert into navlist(tid,title,imgurl) values(5,' . "'" .  $arr1[$i]['title'] . "'" . ',' . "'" . $arr1[$i]['img'] . "'" . ')';
    $obj = $conn->query($sql);
    // $num = $obj->num_rows;
    // echo $sql;
    var_dump($obj);
}
