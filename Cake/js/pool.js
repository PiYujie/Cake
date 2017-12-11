//完美运动框架
function move(obj,json,fn){
	//关闭定时器
	clearInterval(obj.timer);
	//设置定时器
	obj.timer = setInterval(function(){
		//定义开关门
		var stop = false;
		//循环变量属性,判断是否为opacity
		for(var attr in json){
			if(attr=='opacity'){
				//获取属性值
				var iCur = parseInt(getStyle(obj,attr)*100);
			}else{
				//获取属性值
				var iCur = parseInt(getStyle(obj,attr));
			}
		}
		//设置速度
		var speed = (json[attr] - iCur)/8;
		speed>0?Math.ceil(speed):Math.floor(speed);
		//判断条件
		if(json[attr] == iCur){
			//关闭定时器
			clearInterval(obj.timer);
			//如果有回调函数，执行回调函数
			if(fn){
				fn();
			}
		}else{
			//如果修改属性为opacity
			if(attr == 'opacity'){
				obj.style[attr] = (speed + iCur)/100;
			}else{
				obj.style[attr] = iCur + speed +'px';
				obj.style.filter = 'alpha(opacity='+(iCur+speed)+')';
			}
		}
	},50);
}
//获取非行间样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj,currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}


//Ajax封装
function ajax(method,url,json,success,error){
	//1、创建一个ajax对象
	var xml = new XMLHttpRequest()||new ActiveXObject("Microsoft","XMLHTTP");
	//判断是否是get请求
	if(method=="get"){
		//数据拼接
		var str = '';
		for(var key in json){
			str+='&'+key+"="+json[key]
		}
		str = str.substr(1);
		//添加到url后面
		url = url+"?"+str;
		//打开与后面连接的数据
		xml.open("get",url,true);
		//发送
		xml.send();
	}else{
		//数据拼接
		var str = '';
		for(var key in json){
			str+='&'+key+"="+json[key]
		}
		str = str.substr(1);
		xml.open("post",url,true);
		//设置post的请求头
		xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
		//发送
		xml.send(str)
	}
	xml.onreadystatechange = function(){
		//ajax请求成功以及服务器请求成功
		if(xml.readyState==4&&xml.status==200){
			var r = xml.responseText;
			if(typeof r!="object"){
				r = JSON.parse(r)
			}
			success&&success(r)
		}else{
			error&&error(xml.status)
		}
	}
}
//设置cookie
function setCookie(keys,obj,time){
	var d = new Date();
	d.setDate(d.getDate()+time);
	document.cookie = keys+'='+obj+';path=/;expires='+d;
}
//获取cookie
function getCookie(keys){
	var cookie = document.cookie;
	var arr = cookie.split('; ');
//	arr.shift();
//	console.log(arr,cookie.split('='))
	for(var i=0;i<arr.length;i++){
		var newArr = arr[i].split('=');
		if(newArr[0]==keys){
			return newArr[1]
		}
	}
}
//删除cookie
function removeCookie(keys,obj){
	setCookie(keys,obj,-1)
}

//鼠标滚动事件
window.onscroll = function(e){
	var e = e || event;
	var chat = document.getElementById('chat');
	var top = document.documentElement.scrollTop||document.body.scrollTop;
	chat.style.top = 300 + top + 'px';
}

//登录点击
var login = document.getElementById('login');
//console.log(login);
login.onclick = function(){
	location.href = 'Login.html';
}
//注册点击
var reg = document.getElementById('reg');
reg.onclick = function(){
	location.href = 'Register.html';
}

//设置我的购物车数量
function setNum(){
	if(getCookie('id')){
		var obj = JSON.parse(getCookie('id'));
		var len = 0;
		for(var i in obj){
			len++;
		}
//		console.log(len);
		var nums = document.getElementById('num');
		nums.innerHTML = len;
	}
}
//打开页面时自动加载用户名密码
	//获取cookie值
function setName(){
	if(getCookie('login')){
		var obj2 = JSON.parse(getCookie('login'));
		for(var i in obj2){}
		var userName = mess.querySelectorAll('input')[0];
		var passWord = mess.querySelectorAll('input')[1];
		var check = mess.querySelectorAll('input')[2];
		userName.value = i;
		passWord.value = obj2[i];
		check.checked = "checked";
	}
}


//数据搜索
function Search(){
	//实时获取输入框内容
	var sval = search.value;
	var mess = document.getElementById('message');
	var links = '';
	var sstr = '';
	//获取json数据
	ajax("post","../dataCake.json",'',function(arr){
		for(var i in arr){
			if(arr[i].name.indexOf(sval)!=-1&&sval.length!=0){
				var searId = arr[i].id;
				links += searId+';';
				sstr += '<li data-id="'+searId+'">'+arr[i].name+'</li>';
			}
			mess.innerHTML = sstr;
		}
		var li = mess.querySelectorAll('li');
		for(var j in li){
			li[j].index = j;
			li[j].onclick = function(){
				var iId = li[this.index].getAttribute('data-id');
				location.href = 'Detail.html?'+iId;
			}
		}
		sousuo.onclick = function(){
			location.href = 'Search.html?'+links;
		}
	});
}
