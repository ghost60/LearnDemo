var jsonp = function (url, param, callback) {
    //处理url
    var querystring = url.indexOf("?") == -1 ? "?" : "&";
    //处理参数
    for (var k in param) {
        querystring += k + "=" + param[k] + "&"
    }
    //处理回调函数名
    var random = Math.random().toString().replace(".", "")
    var cbval = "my_jsonp" + random;
    var cb = "callback=" + cbval;

    querystring += cb;
   
    var script = document.createElement("script");
    script.src = url + querystring;

    window[cbval] = function (param) {
        callback(param)
        document.getElementsByTagName("head")[0].removeChild(script)
    }
    document.getElementsByTagName("head")[0].appendChild(script);  
}