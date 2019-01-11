function Promise(executor) { //executor是一个执行器（函数）
    debugger
    let _this = this // 先缓存this以免后面指针混乱
    _this.status = 'pending' // 默认状态为等待态
    _this.value = undefined
    _this.reason = undefined

    _this.onResolvedCallbacks = []; // 存放then成功的回调
    _this.onRejectedCallbacks = []; // 存放then失败的回调

    function resolve(value) {
        debugger
        if (_this.status === 'pending') {
            _this.status = 'resolve'
            _this.value = value
            _this.onResolvedCallbacks.forEach(function (fn) { // 当成功的函数被调用时，之前缓存的回调函数会被一一调用
                fn()
            });
        }
    }

    function reject(reason) {
        debugger
        if (_this.status === 'pending') {
            _this.status = 'rejected'
            _this.reason = reason
            _this.onRejectedCallbacks.forEach(function(fn){// 当失败的函数被调用时，之前缓存的回调函数会被一一调用
                fn()
            })
        }
    }

    try{
        executor(resolve, reject)        
    }catch(e){ // 如果捕获发生异常，直接调失败，并把参数穿进去
        reject(e)
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    debugger
    let _this = this
    let promise2
    if (_this.status === 'pending') {
        // 每一次then时，如果是等待态，就把回调函数push进数组中，什么时候改变状态什么时候再执行
        promise2 = new Promise(function (resolve, reject){
            _this.onResolvedCallbacks.push(function(){
                 // 可以凑合用，但是是有很多问题的
                try {
                    let x = onFulfilled(_this.value)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
            _this.onRejectedCallbacks.push(function(){
                 // 可以凑合用，但是是有很多问题的
                try {
                    let x = onRjected(_this.reason)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }

    if (_this.status === 'resolve') {
        promise2 = new Promise(function (resolve, reject) {
            // 可以凑合用，但是是有很多问题的
            try { 
                let x = onFulfilled(_this.value)
                resolve(x)
            } catch (e) {
                reject(e)
            }
        })
    }
    if (_this.status === 'rejected') {
        promise2 = new Promise(function (resolve, reject) {
            // 可以凑合用，但是是有很多问题的
            try {
                let x = onRjected(_this.reason)
                resolve(x)
            } catch (e) {
                reject(e)
            }
        })
    }
}