
//同意注册
register_btn.onclick=function(){
	if(register_checkbox.checked){
			register_checkbox_tip.innerHTML='';
			// ajax('POST','api/database/insert_user1.php','phonea='+register_phone.value+'&register_password='+register_password1.value,
			// 	function(str){
			// 		let i=3;
			// 		setInterval(function(){
			// 			if(i==0){
			// 				window.location.href = "log.html";
			// 			}else{
			// 				register_body_register.innerHTML='';
			// 				register_body_register.innerHTML='注册成功！'+i+'秒后跳转登陆页面';
			// 				register_body_register.style.fontSize='30px';
			// 				i--;
			// 			}
			// 		},1000)
			// });
		}else{
			// register_checkbox_tip.innerHTML='必须同意《用户注册协议》 ！';
		}
}

