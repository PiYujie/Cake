//获取应该显示的数据id
var url = location.href;
var id = url.split('?')[1];
//设置购物车数量
setNum();
//获取添加到购物车
var right = document.getElementById('right');
var addCar = document.getElementById('addCar');
var myCar = document.getElementById('myCar');
var size = document.getElementById('size');
var names = document.getElementById('names');
var left = document.querySelector('.rleft');
var big = document.querySelector('.big');
var b = myCar.nextElementSibling.firstElementChild.lastElementChild;
var account = myCar.nextElementSibling.lastElementChild;
var histUl = document.querySelector(".history>ul");
var check;
var click = false;
//定义全局对象
if(getCookie('id')){
	var obj = JSON.parse(getCookie('id'));
}else{
	var obj = {};
}
//根据id获取相应数据
ajax("post","../dataCake.json",'',function(arr){
	//获取相应的元素ID
	var bigList = document.getElementById('bigList');
	var str2 = '';
	var str3 = '';
	var str4 = '';
	var str5 = '';
	var wprice = 0;
	//遍历获取的ajax数据
	for(var i in arr){
		var str1 = '';
		//遍历cookie中的数据
		for(var o in obj){
			var oid = o.slice(0,3);
			var oval = o.substr(3);
			var oprice = obj[o].split(":")[1];
			//查找ajax中的与cookie中的id相等的值
			if(arr[i]["id"]==oid){
				//我的购物车侧栏
				str4 += '<p><b>'+arr[i]["name"]+'</b><strong><input type="text" value="'+oval+'"/></strong><i>￥'+oprice+'元</i><em>删除</em></p>';
				wprice += Number(oval)*Number(oprice);
				//
				var ulPic = arr[i].smallpic.small1;
				var ulName = arr[i].name;
				str5 += '<li><img src="../'+ulPic+'"/><span>'+ulName+'</span></li>';
				
			}
		}
		
		//查找从网页中获取的id值与arr中相匹配的数据
		if(arr[i]["id"]==id){
			for(var j in arr[i]["smallpic"]){
				str1 += '<li><img src="../'+arr[i]["smallpic"][j]+'" class="picSmall"/></li>';
			}
			var str = '<div class="pic"><img src="../'+arr[i]["pic"]["normal1"]+'" class="picBig"/><p></p></div><ul>'+str1+'</ul>';
			var img = document.createElement('img');
			//遍历当前id下的所有大图
			for(var k in arr[i]["bigpic"]){
				str2 += '<li><img src="../'+arr[i]["bigpic"][k]+'"/></li>';
				img.src = '../'+arr[i]["bigpic"][k];
			}
			
			
			big.appendChild(img);
			bigList.innerHTML = str2;
			left.innerHTML = str;
			names.innerHTML = arr[i]["name"];
			for(var v in arr[i]["size"]){
				str3 += '<li><strong><input type="radio"  name="size"/></strong><span>'+v+'</span><b>'+arr[i]["size"][v]+'元</b></li>';
			}
			str3 = '<li><strong>选择</strong><span>规格</span><b>价格</b></li>' + str3;
			size.innerHTML = str3;
		}
	}
	myCar.innerHTML = str4;
	check = size.querySelectorAll('input');
	b.innerHTML = wprice;
	histUl.innerHTML = str5;
//	console.log(check)
});
//
var vals = document.getElementById('vals');
	var addNum = vals.nextElementSibling;
	var subNum = vals.previousElementSibling;
//添加数量
addNum.onclick = function(){
	var num = vals.value;
	num++;
	vals.value = num;
}
//减少数量
subNum.onclick = function(){
	var num = vals.value;
	num--;
	if(num<=0){
		num = 0;
	}
	vals.value = num;
}
addCar.onclick = function(){
	//获取当前的cookie值
	val = vals.value;
	for(var i in check){
		if(check[i].checked){
			var sizes = check[i].parentNode.nextElementSibling.innerHTML;
			var price = parseInt(check[i].parentNode.nextElementSibling.nextElementSibling.innerHTML);
			console.log(obj)
			if(typeof(obj)!="Object"){
				var key = id + val ;
				obj[key]=sizes+":"+price;
			}
			for(var i in obj){
				console.log(i,obj[i])
				var ids = i;
				ids = ids.slice(0,3);
				//如果cookie中已存在该id，修改尺寸
				if(id == ids){
					i = id + val;
					obj[i] = sizes+":"+price;
				}else{//如果不存在，则向对象中添加数据
					var key = id + val ;
					obj[key]=sizes+":"+price;
				}
				console.log(1)
			}
			setCookie('id',JSON.stringify(obj),7);
			location.href = "buyCar.html";
		}
	}
	setNum();

}
account.onclick = function(){
	location.href = "buyCar.html";
}

//该蛋糕的图片代理点击事件
left.onclick = function(e){
	var e = e || event;
	var target = e.target||e.srcElement;
	var picBig = document.querySelector('.picBig');
	var bigImg = big.firstElementChild; 
	var top = document.querySelector('.top');
	var p = picBig.nextElementSibling;
	var div = picBig.parentNode;
	div.onmouseover = function(){
		big.style.display = "block"
		p.style.display = "block";
	}
	//放大镜：鼠标移入
	div.onmousemove = function(e){
		var e = e || event;
		var pl = e.pageX - div.offsetLeft - p.offsetWidth/2 - top.offsetLeft;
		var pt = e.pageY - div.offsetTop - p.offsetHeight/2 - top.offsetTop;
		if(pl<=0){pl=0;}
		if(pl>=div.offsetWidth-p.offsetWidth){
			pl = div.offsetWidth-p.offsetWidth;
		}
		if(pt<=0){pt=0;}
		if(pt>=div.offsetHeight-p.offsetHeight){
			pt = div.offsetHeight-p.offsetHeight;
		}
		p.style.left = pl + 'px';
		p.style.top = pt + 'px';
		bigImg.style.left = -pl * 2 +'px';
		bigImg.style.top = -pt * 2 +'px';
	}
		
//	}
	div.onmouseout = function(){
			big.style.display = "none";
			p.style.display = "none";
		}
	if(target.className == "picBig"){
		
		if(!click){
			target.style.width = '500px';
			target.style.height = '500px';
			click = true;
			console.log(1)
		}else{
			target.style.width = '420px';
			target.style.height = '420px';
			click = false;
		}
		
	}
}
//该蛋糕的图片代理移入事件


//搜索功能的实现
var search = document.getElementById('search');
var sousuo = search.nextElementSibling;
search.oninput = function(){
	
	Search()
}
