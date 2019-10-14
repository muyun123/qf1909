<?php
$username = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
$password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
$n = isset($_REQUEST['n']) ? $_REQUEST['n'] : '';
$conn = new mysqli('localhost', 'root', 'root', 'qf1909');
if ($conn->error) {
    exit('000');
}

//判断用户名是否为空
if ($username == '') {
    $arr = array('code' => 0, 'message' => '用户名不能为空');
} else {
    //用户名验证
    if ($n == 'ru') {
        $sql = "select * from users where username='$username'";
        $obj = $conn->query($sql);
        if ($obj->num_rows) {
            $arr = array('code' => 0, 'message' => '用户名已被注册');
        } else {
            $arr = array('code' => 1, 'message' => '用户名可以使用');
        }
    }
    //注册提交验证
    if ($n == 'rb') {
        //判断密码是否为空
        if ($password == '') {
            $arr = array('code' => 0, 'message' => '密码不能为空');
        } else {
            $password = md5($password);
            $sql = "insert into users(username,password) values('$username','$password')";
            $obj = $conn->query($sql);
            if ($obj) {
                $arr = array('code' => 1, 'message' => '注册成功');
            } else {
                $arr = array('code' => 0, 'message' => '注册失败');
            }
        }
    }
    //用户登录
    if ($n == 'lb') {
        $sql = "select * from users where username='$username'";
        $obj = $conn->query($sql);
        if (!$obj->num_rows) {
            $arr = array('code' => 0, 'message' => '用户名不存在');
        } else if ($password == '') {
            $arr = array('code' => 0, 'message' => '密码不能为空');
        } else {
            $sql = "select password,uid from users where username='$username'";
            $obj = $conn->query($sql);
            $res = $obj->fetch_all(MYSQLI_ASSOC);
            if (md5($password) == $res[0]['password']) {
                $arr = array(
                    'code' => 1,
                    'message' => '登录成功',
                    'data' => array('username' => $username, 'uid' => $res[0]['uid']),
                );
            } else {
                $arr = array('code' => 0, 'message' => '密码或用户名错误');
            }
        }
    }
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
