var list = document.getElementById('list');
//动态添加数据
	ajax("post","../dataCake.json",'',function(arr){
		//获取数据长度
		var len = arr.length;
		//设置页数
		var num = Math.ceil(arr.length/9);
		//获取页数父元素
		var btnList = document.querySelector('.btnList');
		var previous = document.querySelector('.first');
		var next = document.querySelector('.last');
		
		var page = 0;
		//在页面上显示共有几页
		for(var j=1;j<=num;j++){
			var a = document.createElement('a');
			a.className = 'paging';
			a.innerHTML = j;
			btnList.insertBefore(a,next);
		}
		//每页显示9个数据
		function show(n){
			var str = '';
			for(var i=n*9;i<Math.min((n+1)*9,len);i++){
			str += '<li><img src="../'+arr[i]["pic"]["normal1"]+'" data-id="'+arr[i]["id"]+'" /><h3>'+arr[i]["name"]+'</h3><p><img src="../img/view-detail-icon-1.png" />查看详情</p></li>';
			}
			list.innerHTML = str;
		}
		show(0);
		//上一页
	previous.onclick = function(){
		if(page<=0){
			page = 0;
		}else{
			page--;
		}
		show(page);
	}
	//下一页
	next.onclick = function(){
		if(page>=len-1){
			page = len-1;
		}else{
			page++;
		}
		show(page);
	}
	//第几页点击
	var aPage = document.querySelectorAll('.paging');
	for(var i=0;i<aPage.length;i++){
		aPage[i].index = i;
		aPage[i].onclick = function(){
			var index = this.index;
			show(index);
			page = index;
		}
	}
});
	
//点击图片跳至详情页
list.onclick = function(e){
	var e = e || event;
	var target = e.target || e.srcElement;
	//获取自定义属性
	var id = target.getAttribute('data-id');
	console.log(id)
	location.href = 'Detail.html?'+id;
}

//设置我的购物车数量
if(getCookie('id')){
	var obj = JSON.parse(getCookie('id'));
	var len = 0;
	for(var i in obj){
		len++;
	}
	console.log(len);
	var nums = document.getElementById('num');
	nums.innerHTML = len;
}

//搜索功能的实现
var search = document.getElementById('search');
var sousuo = search.nextElementSibling;
search.oninput = function(){
	
	Search()
}
