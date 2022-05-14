---
layout: Post  
title: 手写Promise   
subtitle: 它来了!它来了!promise它来了!  
author: Wak  
date: 2022-05-12  
useHeaderImage: true  
headerImage: /img/pages/page2.webp  
tags:
- JavaScript
---
日常开发中,我们经常会使用到promise,今天我们就来揭开它的神秘面纱,看看它的内部是如何实现的

## 一个最基本的Promise
实现某某函数,我们一般可以从他是怎么用的开始入手
一般我们会这么使用Promise:
```javascript
//index.js
let promise = new Promise((resolve,reject) => {})
```
从这一行代码,我们就能发现:
1. Promise是一个类
2. 初始化Promise这个类时需要传递一个执行函数,这个执行函数有两个参数,当然,根据我们的常识,这两个参数也都是函数
好,我们就先从这一步开始,写一个我们自己的Promise,代码如下:
```javascript
//myPromise.js
class myPromise {
  constructor(fn) {
    fn(this.resolve,this.reject)
  }
  resolve = () => {}
  reject = () => {}
}
```
接下来,让我们再回忆一下,Promise的这个执行器内我们又会写什么代码呢?
```javascript
let promise = new Promise((resolve,reject) => {
  //成功时
  resolve('成功了')
  //失败时
  reject(new Error())
})
```
上面的使用promise的代码,说明Promise使用时的几个特点:
1. 成功调用resolve函数,如果有需要可以传递一个值给resolve
2. 失败调用reject函数,一般这时会new Error()当做参数传给reject
3. 同时还有个隐性的特点,promise的状态一旦从pending变为fulfilled或者rejected,promise的状态就不能再被改变了,也就是说,上面的代码虽然同时调用了resolve和reject,但只有resolve会被调用.反过来,reject先调用,那么resolve也不会被调用.不清楚的小伙伴可以自己去试试哦  
  

好,我们继续按照我们刚才总结的Promise特点,继续写myPromise的代码

```javascript
//myPromise.js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class myPromise {
  status = PENDING
  value = undefined
  reason = undefined
  constructor(fn) {
    fn(this.resolve,this.reject)
  }
  resolve = (value) => {
    if (this.status !== PENDING) return//如果fulfilled或者rejected就返回
    this.status = FULFILLED
    this.value = value
  }
  reject = (reason) => {
    if (this.status !== PENDING) return//同上
    this.status = REJECTED
    this.reason = reason
  }
}
```
ok,easy!那Promise最重要的一个特点then的链式调用,解决了之前js一个很大的痛点:回调地狱。  
那么,then又是怎么实现的呢?同样的,我们先看看我们平时用的Promise是怎么使用then的
```javascript
let promise = new myPromise((resolve,reject) => {
  resolve('成功')
})
 promise.then(
   res => {
     console.log(res,'res')
   },
   error => {
     console.log(error,'error')
   })
```
then方法接受两个参数,一个表示成功之后的回调函数,一个表示失败之后的回调函数。  
同时这两个函数都会接受一个resolve/reject传递过来的值。
让我们来看看myPromise怎么实现的吧
```javascript
//myPromise.js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class myPromise {
  status = PENDING
  value = undefined
  reason = undefined
  constructor(fn) {
    fn(this.resolve,this.reject)
  }
  /*
  ---省略---
  */
  then(success,error){
    if (this.status === FULFILLED) {
      success(this.value)
    }
    if (this.status === REJECTED) {
      error(this.reason)
    }
  }
}
```
ok!到这里,我们已经实现了一个简易的Promise了。





[//]: # (![1]&#40;../.vuepress/public/img/article/netModel.png&#41;)

## 





## 参考文章
[^1]:周阳编著,数学的起源与发展,现代出版社,2013.03,第17页

[^3]:[浅谈http协议（三）：HTTP 报文及其结构](https://segmentfault.com/a/1190000019788537)  



