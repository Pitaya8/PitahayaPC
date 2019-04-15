$('#giveALike').click(function(){
  let name=$('#giveALike').attr('class')
  if(name=='fa fa-thumbs-up'){
    $('#giveALike').attr('class','fa fa-thumbs-o-up')
  }else{
    $('#giveALike').attr('class','fa fa-thumbs-up')
  }
})