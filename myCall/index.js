Function.prototype.myCall=function(context){
    debugger
    var context = context || window
    // 给 context 添加一个属性
    // getValue.call(a, 'yck', '24') => a.fn = getValue
    context.fn=this
    //将context后面的参数取出来
    var args =[...arguments].slice(1)
    //getValue.call(a, 'yck', '24') => a.fn('yck','24')
    var result = context.fn(...args)
    //删除fn
    delete context.fn
    return result
}