<?php
	header("Content-Type: text/html; charset=utf-8");
	$userName = $_POST["userName"];
	$passWord = $_POST["passWord"];
	$bStop = false;
//	$url="html"; 
	$arr = array(
		array(
			"userName"=>"piyujie",
			"passWord"=>"1234567"
		),
		array(
			"userName"=>"zhangsan",
			"passWord"=>"123456"
		)
	);
	foreach($arr as $v){
		if($v["userName"]==$userName&&$v["passWord"]==$passWord){
			$bStop = true;
		}else{
			$bStop = false;
		}
	}
	if(!$bStop){
		$url = "html/Login.html";  
		echo "<script language='javascript' type='text/javascript'>";  
		echo "window.location.href='$url'";  
		echo "</script>";
	}else{
		$url = "index.html";  
		echo "<script language='javascript' type='text/javascript'>";  
		echo "window.location.href='$url'";  
		echo "</script>";
	}
?>