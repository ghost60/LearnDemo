function sum(){
    var args=[...arguments]
    return function(){
        var _adder= function(){
            [].push.apply(args,[...arguments])
            return _adder
        }
        _adder.valueOf=function(){
            return args.reduce((a,b)=>{
                return a+b
            })
        }
        return _adder()
    }()
}