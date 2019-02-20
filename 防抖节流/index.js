function debounce(fn, wait) {
    var timeout
    return function () {
        var context = this
        var args = arguments
        if (!timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(fn.apply(context, args), wait)
    }
}

function throttle(fn, delay) {
    var prev = Date.now()
    return function () {
        var context = this
        var args = arguments
        var now = Date.now()
        if (now - prev >= delay) {
            fn.apply(context, args)
            prev = Date.now()
        }
    }
}

function throttle2(func, delay){
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}