<?php
function Conn()
{
    $myhost = 'localhost';
    $myusername = 'root';
    $mypassword = 'root';
    $mydb = 'qf1909';
    $conn = new mysqli($myhost, $myusername, $mypassword, $mydb);
    if ($conn->connect_error) {
        echo '数据库连接失败';
        exit;
    }
    return $conn;
}

function mQuery($sql)
{
    return Conn()->query($sql);
}

function mGetAll($sql)
{
    $res = mQuery($sql);
    return $res->fetch_all(MYSQLI_ASSOC);
}
function mGetOne($sql)
{
    $res = mQuery($sql);
    return $res->fetch_assoc();
}
