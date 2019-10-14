<?php
$val=$_REQUEST['name'];
$arr=array('小明','小红','小王');
if(in_array($val,$arr)){
    echo 'yes';
}else{
    echo 'no';
}
?>