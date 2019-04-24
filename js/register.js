//获取注册的信息
//头像

// console.log(headImg)
let userId = $('#register_username').val();
let password = $('#register_password').val();
let phone = $('#register_phone').val();
let sign = $('#register_signature').val();
let sex=$("input[name='sex']:checked").val();
let workCondition=$("input[name='workCondition']:checked").val();
let experience=$("input[name='experience']:checked").val();
let marriage=$("input[name='marriage']:checked").val();
let career = $('#register_career').val();
let income=$("input[name='income']:checked").val();
let abo=$("input[name='abo']:checked").val();
let house=$("input[name='house']:checked").val();

//同意注册
$('#register_btn').click(function () {
  console.log(headImg)
  console.log(sex)
  console.log(workCondition)
  console.log(experience)
  console.log(marriage)
  console.log(career)
  console.log(income)
  console.log(abo)
  console.log(house)
  if (register_checkbox.checked) {
    register_checkbox_tip.innerHTML = '';
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
  } else {
    // register_checkbox_tip.innerHTML='必须同意《用户注册协议》 ！';
  }
}

