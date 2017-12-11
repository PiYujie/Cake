//登录验证
var mess = document.getElementById('getMess');
var input = mess.querySelectorAll('input');
var obj1 = {};
mess.onclick = function(e){
	var e = e || event;
	var target = e.target || e.srcElement;
	//定义开关门
	var bStop = false;
	var val1;
	var val2;
	input[0].onblur = function(){
		val1 = input[0].value;
		if(val1.length==0){
			alert("不可为空");
			bStop = false;
		}else{
			if(/[a-zA-Z0-9]{2,10}/.test(val1)){
				bStop = true;
			}else{
				bStop = false;
				alert("用户名为2-10位字母数字组成");
			}
		}
	}
	input[1].onblur = function(){
		val2 = input[1].value;
		if(val2.length==0){
			alert("不可为空");
		}else{
			if(/[a-zA-Z0-9]{5,10}/.test(val2)){
				input[3].disabled = false;
			}else{
				bStop = false;
				alert("密码为5-10位字母数字组成");
			}
			
		}
	}
	input[2].onclick =function(){
		var name = input[0].value;
		var pass = input[1].value;
		obj1[name] = pass;
		setCookie("login",JSON.stringify(obj1),7);
		console.log(obj1)
	}
	
}

//点击注册按钮跳至注册页面
var regi = document.getElementById('regist');
regi.onclick = function(){
	location.href = 'Register.html';
}

//设置我的购物车数量
setNum();
//打开页面时自动加载用户名密码
setName();

//搜索功能的实现
var search = document.getElementById('search');
var sousuo = search.nextElementSibling;
search.oninput = function(){
	
	Search()
}
