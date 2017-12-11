//获取cookie值并在页面显示信息
if(getCookie('id')){
	var obj = JSON.parse(getCookie('id'));
	var len = 0;
	for(var i in obj){
		len++;
	}
	console.log(len,obj);
}
//设置我的购物车数量
var nums = document.getElementById('num');
nums.innerHTML = len;
//获取总价
var money = document.getElementById('money');
//获取显示的父元素
var list = document.getElementById('list');
var str = '';
var del = money.nextElementSibling;
//获取ajax数据
ajax("post",'../dataCake.json','',function(arr){
	for(var i in obj){
		var id = i;
		var num = i.substr(3);
		id = id.slice(0,3);
		var arr1 = obj[i].split(":");
		for(var j in arr){
			if(id==arr[j]["id"]){
				str += '<li><span><a href="Detail.html?'+id+'"><img src = "../'+arr[j]["smallpic"]["small1"]+'" data-id="'+id+'" class="pic"/>'+arr[j]["name"]+'</a></span><span>尺寸:'+arr1[0]+arr1[1]+'</span><em>￥'+arr1[1]+'</em><span><img src="../img/good_jian.png"  class="sub"/><input type="text" value="'+num+'" class="val"/><img src="../img/good_plus.png"  class="add"/></span><em class="mon">￥'+num*arr1[1]+'</em><a href="#" class="del">删除</a></li>';
			}
		}
	}
	list.innerHTML = str;
	getMoney();
});

//事件代理点击时执行
list.onclick = function(e){
	var e = e||event;
	var target = e.target||e.srcElement;
	//点击减号
	if(target.className=="sub"){
		var inp = target.nextElementSibling;
		var price = target.parentNode.previousElementSibling.innerHTML;
		price = price.slice(1)
		var whole = target.parentNode.nextElementSibling;
		var val = Number(inp.value);
		val--;
		if(val<=0){
			val=0;
			
//			var id = pic.getAttribute('data-id');
//			target.parentNode.parentNode.remove();
//			console.log(id)
//			for(var i in obj){
//				var n = i.slice(0,3);
//				if(n==id){
//					delete obj[i];
//				}
//			}
//			setCookie('id',JSON.stringify(obj),7);
		}
		inp.value = val;
		whole.innerHTML = '￥'+ val * price;
		
		console.log(price,whole);
	}
	//点击加号
	if(target.className=="add"){
		var inp = target.previousElementSibling;
		var price = target.parentNode.previousElementSibling.innerHTML;
		price = price.slice(1)
		var whole = target.parentNode.nextElementSibling;
		var val = Number(inp.value);
		val++;
		if(val<=0){val=0;}
		inp.value = val;
		whole.innerHTML = '￥'+ val * price;
	}
	//点击删除
	if(target.className=="del"){
		//获取id
		var li = target.parentNode;
		var pic = li.querySelector('.pic');
		var id = pic.getAttribute('data-id');
		console.log(id)
		for(var i in obj){
			var n = i.slice(0,3);
			if(n==id){
				delete obj[i];
			}
		}
		setCookie('id',JSON.stringify(obj),7);
		li.remove();
		setNum();
		console.log(obj)
	}
	getMoney();
}
var moneys = 0;
//获取购物车的总价
function getMoney(){
	console.log(list.firstElementChild)
	if(list.firstElementChild){
		var em = list.querySelectorAll('.mon');
		for(var i=0;i<em.length;i++){
			var n = em[i].innerHTML;
			n = n.substring(1);
			moneys += Number(n); 
			console.log(moneys)
		}
		money.innerHTML = moneys;
		moneys = 0;
	}
}
del.onclick = function(){
	var li = list.querySelectorAll('li');
	for(var i=0;i<li.length;i++){
		li[i].remove();
	}
	obj = {};
	setCookie('id',JSON.stringify(obj),7);
	setNum();
}

//搜索功能的实现
var search = document.getElementById('search');
var sousuo = search.nextElementSibling;
search.oninput = function(){
	
	Search()
}
