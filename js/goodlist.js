let goodType = getCookie('goodType', (res) => {
  console.log(res)
})
let list = []
$('#systematicNname').html(goodType);
//获取数据
$.ajax({
  type: "POST",
  url: "http://127.0.0.1:4000/api/good/search_good_type",
  async: false, //同步
  dataType: "json",
  data: {
    type: goodType,
  },
  success: function (data) {
    if (data.length > 0) {
      list = data;
    }
  },
  error: function (err) {

  }
});
let html = '';
for (let i = 0; i < list.length; i++) {
  let img = []  //主图

  if (list[i].bannerImg) {
    img = list[i].bannerImg.split(';')
  }
  html += `
  <div class="col-md-3 agile_team_grid">
          <div class="agile_team_grid_main">
          <div class="agile_team_grid_main_img">
          <img src="${img[0]}" alt=" " class="img-responsive" onclick="goDetail(${list[i].goodId})"></div>
            <div class="p-mask">
              <ul class="top-links two">
                <li><a href="#"><i class="fa fa-cart-arrow-down"></i></a></li>
              </ul>
            </div>
          </div>
          <div class="agile_team_grid1">
            <h3>${list[i].goodName}</h3>
            <p>￥${list[i].price}</p>
          </div>
        </div>
  `;
}
$('#systematicGoodList').html(html)


//点击侧边导航栏跳转
$('.jslist').click(function (e) {
  let target = e.target;
  let text = '';
  if (target.children) {
    if (target.nodeName == "DT") {
      text = target.innerText
    } else if (target.nodeName == "DL") {
      text = target.children[0].innerText
    } else if (target.nodeName == "LI") {
      text = target.children[0].children[0].innerText;
    }
    setCookie('goodType', text)
    window.location.href = "goodlist.html";
  } else {
    console.log(target)
  }
})

function goDetail(id){
  setCookie('goodid',id)
  window.location.href = "detail.html";
}