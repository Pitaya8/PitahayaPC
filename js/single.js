function payattention(target){
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "positionClass": "toast-bottom-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
  if(target.children[0].className=="fa fa-star attention-start-btn"){
    target.children[0].className="fa fa-star-o attention-start-btn"
    toastr.success('取消关注');
  }else{
    target.children[0].className="fa fa-star attention-start-btn"
    toastr.success('关注成功');
  }
}