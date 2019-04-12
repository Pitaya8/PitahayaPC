let status = 1;
$(function () {
  console.log('页面')
  $('#overCurtain').css('height', $(document).height() + 'px')

});
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
  // $(".overCurtain").fadeOut("slow")
  $('#overCurtain').css('display', 'none')
})
/*
* 点击退出
* */
$('#signout').click(function(){
  status=0;
  StatusOptions(status)
})
StatusOptions(status);
function StatusOptions(type){
  if (type) {
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

