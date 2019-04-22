$('.jslist').click(function (e) {
  let target = e.target;
  let text = '';
  console.log('dian')
  if (target.children) {
    if (target.nodeName == "DT") {
      text = target.innerText
    } else if (target.nodeName == "DL") {
      text = target.children[0].innerText
    } else if (target.nodeName == "LI") {
      text = target.children[0].children[0].innerText;
    }
    setCookie('goodType',text)
    console.log(text)
    window.location.href="goodlist.html";
  } else {
    console.log(target)
  }
})