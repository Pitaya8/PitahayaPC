let status = 0;
status=getCookie('login',(res)=>{console.log(res)})
status=status==='true'?true:false;
StatusOptions(status);
$(function () {
  $('#overCurtain').css('height', $(document).height() + 'px')
});

/*
* 登录按钮
* */
$('#BSignIn').click(function () {
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:4000/api/userInfo/login",
    async : false, //同步
    dataType: "json",
    data: {
      userId: $('#input-topright-loginInput').val(),
      password: $('#input-bottomright-loginInput').val()
    },
    success: function (data) {
      if(data.msg=='验证通过'){
        setCookie('login','true')
        location.reload()
      }else{
        setCookie('login','false')
      }
      showMessage(data.msg,4000,true)
    },
    error:function(err){

    }
  });
})

/*
* 点击登录
* */
$("#login").click(function () {
  $(".hide-center").fadeIn("slow");
  $('#overCurtain').css('display', 'block')
  $(".overCurtain").fadeIn("slow");
})
/*
* 关闭登录窗口
* */
$("#close").click(function () {
  $(".hide-center").fadeOut("fast")
  $(".hide-center").css('display', 'none')
  $('#overCurtain').css('display', 'none')
})
/*
* 点击退出
* */
$('#signout').click(function () {
  setCookie('login','false',1)
  status=setCookie('login','false');
  status=Boolean(status)
  StatusOptions(status)
})


function StatusOptions(status) {
  if (status) {
    $('#personalInfo').css('display', 'inline-block');
    $("#login").css('display', 'none')
    $('#register').css('display', 'none')
  } else {
    $('#personalInfo').css('display', 'none');
    $('#signout').css('display', 'none')
    $("#login").css('display', 'inline-block')
    $('#register').css('display', 'inline-block')
  }
}



