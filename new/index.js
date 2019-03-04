function create(Con, ...args) {
    debugger
    let obj = {}
    Object.setPrototypeOf(obj, Con.prototype)
    let result = Con.apply(obj, args)
    return result instanceof Object ? result : obj
  }

  function Test(name, age) {
    this.name = name
    this.age = age
  }
  Test.prototype.sayName = function () {
      console.log(this.name)
  }
  const a = create(Test, 'lsq', 27)
  console.log(a.name) 
  console.log(a.age)
  a.sayName()