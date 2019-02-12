var x = 0;
function test(){
    console.log(this.x)
}
var o = {};
o.x = 1;
o.m = test;
o.m.myCall(o);
