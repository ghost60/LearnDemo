class Dep {
    constructor() {
        this.subscribers = new Set()
    }
    depend() {
        debugger
        if (activeUpdate) {
            this.subscribers.add(activeUpdate)
        }
    }
    notify() {
        debugger
        this.subscribers.forEach(sub => sub())
    }
}

function observe(obj) {
    Object.keys(obj).forEach(key => {
        debugger
        let internalVaule = obj[key]
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get() {
                debugger
                console.log(`getting key ${key}:${internalVaule}`)
                dep.depend()
                return internalVaule
            },
            set(newVaule) {
                debugger
                const changed = internalVaule !== newVaule
                internalVaule = newVaule
                if (changed) {
                    dep.notify()
                }
            }
        })
    })
    return obj
}

let activeUpdate = null

function autorun(update) {
    debugger
    const wrappedUpdate = () => {
        update()
        activeUpdate = null
    }
    wrappedUpdate()
}

const dep = new Dep()

autorun(() => {
    debugger
  dep.depend() 
  console.log('updated')
})