var regist = document.getElementById('regi');

var input = regist.querySelectorAll('input');
//定义开关门
	var arr = [];
regist.onclick = function(e){
	var e = e || event;
	var target = e.target || e.srcElement;
	
	//用户名验证
	input[0].onblur = function(){
		var val1 = input[0].value;
		var em = input[0].nextElementSibling.nextElementSibling;
		var i = em.nextElementSibling.nextElementSibling;
		if(val1.length==0){
			em.style.display = 'block';
		}else{
			if(!/^[a-zA-Z0-9]{3,10}$/.test(val1)){
				em.style.display = 'block';
			}else{
				em.style.display = 'none';
				i.style.display = 'block';
				arr.push(1);
			}
			
		}
	}
	//邮箱验证
	input[1].onblur = function(){
		var val2 = input[1].value;
		var em = input[1].nextElementSibling.nextElementSibling;
		var b = em.nextElementSibling.nextElementSibling;
		var i = em.nextElementSibling;
		if(val2.length==0||val2.lenght<3){
			em.style.display = 'block';
		}else{
			em.style.display = 'none';
			if(!/^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]{2,5}\.(com)$/.test(val2)){
				i.style.display = 'block';
			}else{
				i.style.display = 'none';
				b.style.display = 'block';
				arr.push(1);
			}
		}
	}
	
	//密码验证
	input[2].onblur = function(){
		var val3 = input[2].value;
		var em = input[2].nextElementSibling.nextElementSibling;
		var b = em.nextElementSibling;
		if(val3.length<6){
			em.style.display = 'block';
		}else{
			em.style.display = 'none';
			if(!/^[a-zA-Z0-9]{6,15}$/.test(val3)){
				b.style.display = 'none';
			}else{
				b.style.display = 'block';
				arr.push(1);
			}
		}
	}
	//确认密码验证
	input[3].onblur = function(){
		var pass = input[3].value;
		var em = input[3].nextElementSibling.nextElementSibling;
		var b = em.nextElementSibling.nextElementSibling;
		var i = em.nextElementSibling;
		if(pass.length<6){
			em.style.display = 'block';
		}else{
			em.style.display = 'none';
			if(pass == input[2].value){
				b.style.display = 'block';
				arr.push(1);
			}else{
				b.style.display = 'none';
				i.style.display = 'block';
			}
		}
	}
	//手机号验证
	input[4].onblur = function(){
		var val4 = input[4].value;
		var em = input[4].nextElementSibling.nextElementSibling;
		var b = em.nextElementSibling.nextElementSibling;
		var i = em.nextElementSibling;
		if(val4.length<6){
			em.style.display = 'block';
		}else{
			em.style.display = 'none';
			if(!/^(133|136|157|188)\d{8}$/.test(val4)){
				b.style.display = 'none';
				i.style.display = 'block';
			}else{
				b.style.display = 'block';
				i.style.display = 'none';
				arr.push(1);
			}
		}
	}
	var btn = regist.querySelector('button');
	//手机号验证
	input[6].onclick = function(){
		if(input[6].checked&&arr.length==5){
			btn.disabled = false;
		}
	}
	
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
