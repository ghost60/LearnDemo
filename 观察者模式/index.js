class Dom{
    constructor(){
        this.events={}
    }
    addEventListener(event,callback){
        debugger
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }
    removeEventListener(event,callback){
        debugger
        if (!this.events[event]) {
            return
        }
        const callbackList=this.events[event]
        const index =callbackList.indexOf(callback)
        if (index>-1) {
            callbackList.splice(index,1)
        }
    }
    fireEvent(event){
        debugger
        if (!this.events[event]) {
            return
        }
        this.events[event].forEach(callback=>{
            callback()
        })
    }
}

const handler =()=>{
    console.log('fire click')
}
const dom = new Dom()

dom.addEventListener('click',handler)
dom.addEventListener('move',()=>{
    console.log('fire click2')
})
dom.fireEvent('click')