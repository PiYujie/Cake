//获取页面所需的全局变量
//获取轮播图下的标记
	var em = document.querySelectorAll('.banner>p>em');
//获取轮播图的父级
	var ban = document.getElementById('ban');
//克隆第一张图片
	var clone = ban.children[0];
	ban.appendChild(clone.cloneNode(true));
//获取轮播图片的数量
	var pic = ban.querySelectorAll('img');
//设置timer
	var timer = null;
//设置当前播放图片
	var iNow = 0;
	
//定义全局对象
if(getCookie('id')){
	var obj = JSON.parse(getCookie('id'));
}else{
	var obj = {};
}
//var obj = {};
//页面打开时设置图片初始值
	var width = document.documentElement.clientWidth;
	for(var i=0;i<pic.length;i++){
		pic[i].style.width = width + 'px';
	}
	ban.style.width = pic.length*width + 'px';



//执行初始加载方法
init();
//页面初始加载
	function init(){
	//1、加载所有的json数据
		//1）获取需要加载数据的父元素
		var ind = document.getElementById('inde');
		//2）向首页动态添加数据
		ajax("post","dataCake.json",'',function(arr){
			for(var i in arr){
				if(arr[i]["recommend"]){
//					console.log(arr[i].size.length)
					for(var j in arr[i].size){}
					var str = '<div><img src="'+arr[i]["recommend"]+'"  class="big" data-id="'+arr[i]["id"]+'" data-size="'+j+":"+arr[i].size[j]+'"/><p><img src="img/good_jian.png" class="sub"/><input type="text" value="1" class="val"/><img src="img/good_plus.png" class="add"/><img src="img/index_add_cart.png" class="toCar"/></p></div>';
					ind.innerHTML += str;
				}
			}
		});
	//2、实现图片的轮播
		autoPlay();
	setNum();
	}


//当页面宽度发生改变时，对图片宽度进行改变
window.onresize  = function(){
	width = document.documentElement.clientWidth;
	//设置图片宽度
	for(var i=0;i<pic.length;i++){
		pic[i].style.width = width + 'px';
	}
	//设置banner的宽度
	ban.style.width = pic.length*width + 'px';
}

//自动轮播
	function autoPlay(){
		//设置定时器，每两秒切换一张图片
		timer = setInterval(function(){
			//当图片滚动到最后一张时left设为0
			if(iNow == pic.length-1){
				ban.style.left = 0;
				iNow = 1;
			}else{
				iNow ++;
			}
			//执行运动
			toMove();
		},4000);
	}
	function toMove(){
		move(ban,{"left":-width*iNow});
		//图片轮播时下方点进行相应改变
		for(var i=0;i<em.length;i++){
			em[i].className = '';
		}
		em[iNow==pic.length-1?0:iNow].className = 'active';
	}
//轮播图鼠标移入事件
		ban.onmouseover = function(){
			clearInterval(timer);
		}
		ban.onmouseout = function(){
			autoPlay();
		}
//鼠标移动到em上切换图片
	for(var i=0;i<em.length;i++){
		em[i].index = i;
		em[i].onmouseover = function(){
			clearInterval(timer);
			for(var j=0;j<em.length;j++){
				em[j].className = '';
			}
			move(ban,{"left":-this.index*width});
			em[this.index].className = 'active';
			iNow = this.index;
		}
		em[i].onmouseout = function(){
			autoPlay();
		}
	}

//登录点击
var login = document.getElementById('login');
login.onclick = function(){
	location.href = 'html/Login.html';
}
//注册点击
var reg = document.getElementById('reg');
reg.onclick = function(){
	location.href = 'html/Register.html';
}

//点击图片跳至详情页
inde.onclick = function(e){
	var e = e || event;
	var target = e.target || e.srcElement;
	var id = target.getAttribute('data-id');
	var size = target.getAttribute('data-size');
	//获取自定义属性
	if(target.className=="add"){
		var val = target.previousElementSibling;
		num = Number(val.value)+1;
		val.value = num;
	}else if(target.className=="sub"){
		var val = target.nextElementSibling;
		num = Number(val.value)-1;
		if(num<=0){
			num = 0;
		}
		val.value = num;
	}else if(target.className=="toCar"){
		id = target.parentNode.previousElementSibling.getAttribute('data-id');
		size = target.parentNode.previousElementSibling.getAttribute('data-size');
		//设置购物车cookie
		var val = target.previousElementSibling.previousElementSibling.value;
		var key = id+val;
		obj[key]=size;
//		obj[arr[0]]=arr[1];
		setCookie('id',JSON.stringify(obj),7);
		setNum();
		console.log(obj)
//		location.href = 'html/buyCar.html';
		
	}else{
		location.href = 'html/Detail.html?'+id;
	}
}


//搜索功能的实现
var search = document.getElementById('search');
var sousuo = search.nextElementSibling;
search.oninput = function(){
	//实时获取输入框内容
	var sval = search.value;
	var mess = document.getElementById('message');
//	var sId = [];
	var links = '';
	var sstr = '';
	//获取json数据
	ajax("post","dataCake.json",'',function(arr){
		for(var i in arr){
			if(arr[i].name.indexOf(sval)!=-1&&sval.length!=0){
				var searId = arr[i].id;
				links += searId +';';
				sstr += '<li data-id="'+searId+'">'+arr[i].name+'</li>';
			}
			mess.innerHTML = sstr;
		}
		var li = mess.querySelectorAll('li');
		for(var j in li){
			li[j].index = j;
			li[j].onclick = function(){
				var iId = li[this.index].getAttribute('data-id');
				location.href = 'html/Detail.html?'+iId;
			}
		}
		sousuo.onclick = function(){
//			console.log(sval,links)
			location.href = 'html/Search.html?'+links+":"+sval;
		}
	});
	
}
