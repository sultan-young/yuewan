function jsonp(url, data, callbackFun) {
  var str = "";
  for (var i in data) {
    str += i + "=" + data[i] + "&";
  }
  window[data.callback] = callbackFun;
  str = str.slice(0, -1);
  // 创建一个script标签 
  var script = document.createElement("script");
  script.src = url + "?" + str;
  document.body.appendChild(script);
  script.onload = function () {
    script.remove();
    delete window[data.callback];
  }
}

export default jsonp;