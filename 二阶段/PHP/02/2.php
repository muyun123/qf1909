<?php
$str=isset($_REQUEST['id'])?$_REQUEST['id']:'';
$path='weibo.json';
$file=fopen($path,'r');
$content=fread($file,filesize($path));
$arr=json_decode($content,true);
for($i=0;$i<count($arr);$i++){
    if($str==$arr[$i]['id']){
        $arr[$i]['good']++;
        echo $arr[$i]['good'];
        break;
    }
}
$file=fopen($path,'w');
fwrite($file,json_encode($arr,JSON_UNESCAPED_UNICODE));
fclose($file);
?>