//1.实现一个function sum达到一下目的：
// sum(1,2,3,4,5).valueOf();   // 15
// sum(1,2,3,4)(5).valueOf();  // 15
// sum(1,2,3)(4)(5).valueOf();  // 15
// sum(1,2)(3)(4)(5).valueOf();  // 15
// sum(1,2)(3,4)(5).valueOf();   // 15

// 2.  实现一个function，使用正则匹配获取当前浏览器的多参数，参数可以是一个或者多个，
// 如：
// http://www.sodacar.com/vehicles?car=13242&station=83212jde
// 返回: {car: 13242, station: 83212jde}
// http://www.sodacar.com/vehicles?car=13242&station=83212jde&lat=102.21301&lng=31.22345
// 返回: {car: 13242, station: 83212jde, lat: 102.21301, lng: 31.22345}

function sum() {
    var _args = [...arguments]
    var adder = function () {
        var _adder = function () {
            [].push.apply(_args, [...arguments])
            return _adder;
        };
        _adder.vauleOf = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }
        return _adder;
    }
    return adder([...arguments]);
}

// console.log(sum(1, 2, 3, 4, 5).vauleOf())
// console.log(sum(1, 2, 3, 4)(5).vauleOf())
// console.log(sum(1, 2, 3)(4)(5).vauleOf())
// console.log(sum(1, 2)(3)(4)(5).vauleOf())
// console.log(sum(1, 2)(3, 4)(5).vauleOf())

var url = "http://www.sodacar.com/vehicles?car=13242&station=83212jde"
function getParam(url) {
    debugger
    var reg = new RegExp("/(\\?|\\&)" +"station"+ "=([^\\&]+)/");
    var p = url.match(reg)
}
getParam(url)