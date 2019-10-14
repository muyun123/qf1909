<?php
include('../sql.php');
$sid = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
$sql = 'select good from weibo where gid=' . $sid;
$gid1 = mGetAll($sql);
$num1 = ++$gid1[0]['good'];
echo $num1;
$sql = 'update weibo set good=' . $num1 . ' where gid=' . $sid;
$res = mQuery($sql);
CloseConn();
