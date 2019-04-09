$(function () {
 $('#overCurtain').css('height',$(document).height()+'px')

});
$("#login").click(function () {
  $(".hide-center").fadeIn("slow");
  $('#overCurtain').css('display','block')
  $(".overCurtain").fadeIn("slow");
})
$("#close").click(function () {
  $(".hide-center").fadeOut("fast")
  $(".hide-center").css('display','none')
  // $(".overCurtain").fadeOut("slow")
  $('#overCurtain').css('display','none')
})