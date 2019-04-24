let userId = getCookie('userId');
console.log(userId)
$.ajax({
  type: "POST",
  url: "http://127.0.0.1:4000/api/userOrder/search_user_all_order",
  async: false, //同步
  dataType: "json",
  data: {
    userId: getCookie('userId')
  },
  success: function (data) {
    let html = ''
    for (let i in data) {
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:4000/api/good/search_good",
        async: false, //同步
        dataType: "json",
        data: {
          goodId: data[i].goodId
        },
        success: function (datas) {
          let headimg = datas[0].bannerImg.split(';');
          html += `
			<li name="${data[i].id}" goodId="${data[i].goodId}">
                <input type="checkbox" class="good_check"/>
                <img src="${headimg[0]}"/>
                <p>
                  ${datas[0].goodName}
                </p>
                <p> ${datas[0].specification}</p>
                <p>￥${datas[0].price}</p>
                <span class="one_span">
                  \t\t\t\t\t\t\t\t\t<button class="cutnum">-</button>
\t\t\t\t\t\t\t\t\t<input type='text' class="number" value='${data[i].num}'>
\t\t\t\t\t\t\t\t\t</input>
\t\t\t\t\t\t\t\t\t<button class="addnum">+</button>
\t\t\t\t\t\t\t\t</span>
                <span class="good_total">
\t\t\t\t\t\t\t\t\t￥${data[i].num*datas[0].price}
\t\t\t\t\t\t\t\t</span>
                <span class="del_li">删除</span>
              </li>
			`
        }
      })
    }
    document.querySelector('#shop_cart_body_list_content_list_ul').innerHTML = html
  }
});

//1.点击每一行的删除键，删除该行
$('#shop_cart_body_list_content_list ul').on('click', '.del_li', function () {
  let res = confirm('您确定要删除该商品吗？');
  if (res) {
    $(this).parent().remove();
  }

  let this_id = $(this).parent().attr('name');

  //数据库的更新
  update_data('1', this_id, 'delet');
  updata();
  let arr = checked();
  allnum(arr);

  //总价
  allprice(arr);
});

//2.点击加号，增加数量
$('#shop_cart_body_list_content_list ul').on('click', '.addnum', function () {
  var val = $(this).prev().val();
  var this_id = $(this).parent().parent().attr('name');
  let goodId = $(this).parent().parent().attr('goodId');
  val++;
  //数据库的更新
  update_data(val,this_id,'updata',goodId,val,userId);
  $(this).prev().val(val);
  //小计
  price($(this));
  var arr = checked();
  allnum(arr);  //算总数量

  //总价
  allprice(arr);
});

function update_data(val, this_id, deal_type,goodId,num,userId) {
  let port='';
  let data={}
  if(deal_type=='delet'){
    port='delet_user_order';
    data={id: this_id}
  }else if(deal_type=='updata'){
    port='edit_user_order';
    data={
      userId:userId,
      goodId:goodId,
      num:num
    }
  }
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:4000/api/userOrder/"+port,
    async: false, //同步
    dataType: "json",
    data: data,
    success: function (data) {
      if (deal_type == 'update') {

      } else if (deal_type == 'delet') {

      }
    }
  })
}

//3.点击减号，减少数量
$('#shop_cart_body_list_content_list ul').on('click', '.cutnum', function () {
  let val = $(this).next().val();
  let goodId = $(this).parent().parent().attr('goodId');
  val--;
  if (val <= 0) {
    val = 0;
  }
  $(this).next().val(val);
  //小计
  price($(this));
  //数据库的更新
  let this_id=$(this).parent().parent().attr('name');
  update_data(val,this_id,'updata',goodId,val,userId);
  let arr = checked();
  allnum(arr);  //算总数量
  //总价
  allprice(arr);
});

//4.删除多行
$('#delall').on('click', function () {
  var arr = checked();//被选中的行
  var res = confirm('您确定要删除多行吗？');
  var this_id = 0;
  if (res) {
    //删除arr下标对应的行
    for (var i = arr.length - 1; i >= 0; i--) {
      //数据库的更新
      this_id = $('.good_check').eq(arr[i]).parent().attr('name');
      update_data('', this_id, 'delet');
      //从后面开始删除
      $('.good_check').eq(arr[i]).parent().remove();
    }
  }
  updata();
});

//5.选中每行后，右下角的小计增加
$('#shop_cart_body_list_content_list ul').on('click', '.good_check', function () {
  var arr = checked();
  allnum(arr);
  //总价
  allprice(arr);
});

//6.全选
var isCheacked = true;
$('#quanxuan').on('click', function () {

  //attr()加普通属性      title    prop() 加有行为的属性
  if (isCheacked) {
    //全选
    $('.good_check').prop('checked', 'checked');
    $('#quanxuan').prop('checked', 'checked');
  } else {
    //不选
    $('.good_check').removeAttr('checked');
    $('#quanxuan').removeAttr('checked');
  }
  isCheacked = !isCheacked;

  //点击全选的时候，数量和总价跟着变
  //总数量
  var arr = checked();//判断哪行被选中，存到该数组中
  allnum(arr);//传被选中的行的下标过去，那边做累计处理

  //总价
  allprice(arr);
});

//7.数据渲染
//获取cookie用户名
if (getCookie('username') != undefined) {
  var nowlog_username = getCookie('username');
  var nowlog_username1 = nowlog_username.split('');
  //用户名处理
  for (let i = 3; i < nowlog_username1.length; i++) {
    nowlog_username1[i] = '*';
    if (i >= nowlog_username1.length - 4) {
      nowlog_username1 = nowlog_username1.join('');
      break;
    }
  }
  show_username.innerHTML = 'Hi,' + nowlog_username1;
  $('#header #header_header #header_top .log_register').css('display', 'none');
  $('#header #header_header #header_top .log_username').html('退出');
  $('#header #header_header #header_top .log_username').parent().attr('href', 'index.html');

  if ($('#header #header_header #header_top .log_username').html() == '退出') {
    $('#header #header_header #header_top .log_username').click(function () {
      setCookie('username', '321', -1)
    })
  }
  //数据渲染
  ajax('POST', 'api/database/search_user.php', 'username=' + nowlog_username, function (str) {
    var data = JSON.parse(str);
    var shop_cart_goodsid = data[0].shop_cart_goodsid;
    if (shop_cart_goodsid != undefined) {
      var html1 = '';
      shop_cart_goodsid = (data[0].shop_cart_goodsid).split(',');
      var shop_cart_goodsnum = (data[0].shop_cart_goodsnum).split(',');
      for (let i = 0; i < shop_cart_goodsid.length; i++) { //shop_cart_goodsid长度为7
        ajax('GET', 'api/database/search_goods1.php',
          'keyword=' + shop_cart_goodsid[i] + '&type=' + 'search',
          function (str) {
            var data1 = JSON.parse(str);
            html1 += `
						<li name=${data1[0].goodsid}>
							<input type="checkbox"  class="good_check"/>
							<img src="${data1[0].imgsrc}"/>
							<p>
								${data1[0].title}
							</p>
							<p>正1匹</p>
							<p>￥${data1[0].price}</p>
							<span class="one_span">
								<button class="cutnum">-</button>
								<input type='text' class="number" value='${shop_cart_goodsnum[i]}'>
								</input>
								<button class="addnum">+</button>
							</span>
							<span class="good_total">
								￥${data1[0].price * shop_cart_goodsnum[i]}
							</span>
							<span class="del_li">删除</span>
						</li>
					`;
            document.querySelector('#shop_cart_body_list_content_list ul').innerHTML = html1;
          }
        )
      }
    }

  });
}


//8.手动修改数量
$('#shop_cart_body_list_content_list').on('blur', '.number', function () {
  var val = $(this).val();
  $(this).val(val);
  //小计
  price($(this));
  //数据库的更新
  var this_id = $(this).parent().parent().attr('name');
  update_data(val, this_id, 'update');
  var arr = checked();
  allnum(arr);  //算总数量

  //总价
  allprice(arr);
})

//小计函数
function price(now) {
  var pri = now.parent().prev().text();//拿到对应行的单价，￥ 99.99
  pri = $.trim(pri);//去掉前后空格
  pri = pri.substring(1);//字符串截取，￥&nbsp;65.99  单价处理好了
  //获取数量
  var all = now.parent().find('input').val();
  var aprice = pri * all;//小计
  now.parent().next().html('￥&nbsp;' + aprice.toFixed(0));//赋值小计,.toFixed(2)保留两个小数
}

//算总数量函数
function allnum(arr) {
  var num = 0;//总数量
  for (var i = 0; i < arr.length; i++) {
    num += parseInt($('.number').eq(arr[i]).val());
  }
  $('#shop_cart_body_deal_right p i').eq(0).html(num); //右下角显示’已经选择了‘num件商品
}

//判断哪行被选中了
function checked() {
  var arr = [];//设置一个空数组，等会被选中的就把下标存起来
  var le = $('#shop_cart_body_list_content_list ul li .good_check').size();
  for (var i = 0; i < le; i++) {
    if ($('#shop_cart_body_list_content_list ul li .good_check').eq(i).prop('checked')) {
      //不为空证明被选中了
      arr.push(i);
    }
  }
  return arr;
}

//右下角的总价
function allprice(arr) {
  var price = 0;
  for (var i = 0; i < arr.length; i++) {
    var nowtotal = $('.good_total').eq(arr[i]).text();
    nowtotal = $.trim(nowtotal);
    nowtotal = nowtotal.substring(1);//数据提取完成  255
    price += nowtotal * 1;
  }
  $('#shop_cart_body_deal_right p i').eq(1).html('￥' + price.toFixed(2));
}

//刷新界面
function updata() {
  if ($('.addnum').size() == 0) {
    $('.del_li').remove();
  }
}