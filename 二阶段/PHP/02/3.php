<?php
$myhost = 'localhost';
$myusername = 'root';
$mypassword = 'root';
$mydb = 'qf1909';
$conn = new mysqli($myhost, $myusername, $mypassword, $mydb);
if ($conn->connect_error) {
    echo '数据库连接失败';
}
$sql = 'select * from weibo';
$obj = $conn->query($sql);
$res = $obj->fetch_all(MYSQLI_ASSOC);
echo json_encode($res, JSON_UNESCAPED_UNICODE);
// var_dump($res);
$conn->set_charset('utf8');
$conn->close();
