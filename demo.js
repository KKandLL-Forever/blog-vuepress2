let list = [1,2]

let proxyList = new Proxy(list,{
  set(target,property,value){
    console.log(property,'property')
    console.log(value,'value')
    target[property] = value
    return true
  }
})
proxyList.pop()
console.log(proxyList,'list')

