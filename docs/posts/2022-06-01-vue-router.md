---
layout: Post  
title: 模拟实现Vue-router   
subtitle: 小型vue-router,理解其实现大致思路    
author: Wak  
date: 2022-06-01  
useHeaderImage: true  
headerImage: /img/pages/page11.webp  
tags:
- Vue
- Vue-router
---

>无论是实现某个API, 还是新设计一个API, 都需要从这个API怎么使用来着手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----鲁迅
# Vue-router基础用法
### 基础用法
```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {name: 'home', path: '/', component: Home}
  ]
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```
1. `vue.use()`如果参数为对象,就会调用该对象的install方法,所以Router对象上会有一个install方法。  
2. `new Router()`说明Vue-router导出一个类, 并且接收一个参数,参数目前看是一个对象
3. 挂载Router对象至Vue上

# 实现
## Router.install
### Vue.use用法
Vue-router是作为Vue的插件来植入的,为了更好地理解,我们先来看一下`Vue.use()`的实现。  
下图是[官方文档](https://cn.vuejs.org/v2/api/#Vue-use)中关于`Vue.use()`的描述
![vue-use-api](../.vuepress/public/img/article/vue-router/vue-use-api.png)  
能总结出来的几个特点:
1. 参数可以是Object/Function
2. 参数如果是Object需要提供install方法,如果是Function的话,则被当做install方法来执行
3. install方法调用会将Vue传入
4. 插件只会被安装一次(这个之后在install中实现)


### Vue.use源码
```typescript
//vue源码 src/global-api/use.ts
import type { GlobalAPI } from 'types/global-api'
import { toArray, isFunction } from '../util/index'

//Vue.use在initUse这个函数声明,Vue是在调用initUse时传入的
export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | any) {
    /*不是关注重点,代码省略*/
    const args = toArray(arguments, 1)
    args.unshift(this) //this 指向 Vue 对象，通过unshift()可以保证数组参数第一个始终是vue对象
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args) //如果install存在并且是一个function,调用并传入Vue.use的参数args
    } else if (isFunction(plugin)) {
      plugin.apply(null, args) //如果plugin本身是函数,则直接调用,同样传入args
    }
    /*不是关注重点,代码省略*/
    return this
  }
}
```
### install
回到vue-router,我们导入vue-router之后,会使用`Vue.use(Router)`来注册路由这个插件(Vuex同理)。`Vue.use()`又会调用install方法    
所以Router对象需要声明一个install方法,并且第一个参数要传入Vue。

```typescript
//myRouter.js
import install from './install'

export default class myRouter {
  static install: () => void
  
  constructor(){}
}
myRouter.install = install

//install.js
let _Vue
export default function install(Vue){
  //判断是否安装过此插件
  if(install.installed && _Vue === Vue) return
  //Vue.use(Router) → Router.install(Vue) → Router.install.installed = true
  //下次再使用Vue.use(Router),因为Router.install.installed === true,直接return
  install.installed = true
  _Vue = Vue
}
```

我们都知道在根组件Vue实例上都有一个`$router`属性, 在执行`install()`时也完成了`$router`的挂载
```typescript
//install.js
let _Vue
export default function install(Vue){
  if(install.installed && _Vue === Vue) return
  install.installed = true
  _Vue = Vue
  
  Vue.mixin({
    beforeCreate(){
      //只有在new Vue()时传入了router对象时,才能挂载$router
      if(this.$options.router){
        Vue.prototype.$router = this.$options.router
      }
    }
  })
}
```
这里通过`Vue.mixin()`来完成这个挂载的原因是:  
1. 不能通过传入的这个Vue来挂载,因为install执行的时机是`Vue.use()`调用的时候,而在这时,`new Vue()`还没有执行,router就没有挂载到Vue实例上,`$options`上就没有router属性
2. 为了获取new Vue()之后的`$options.router`,通过Vue.mixin()中this指向Vue实例这个特性,来找到`$options.router`
## Router的构造函数
### Router构建选项
new Router()初始化时接收一个[对象参数](https://v3.router.vuejs.org/zh/api/#router-%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9),本文聚焦于其中的[routes](https://v3.router.vuejs.org/zh/api/#routes)、[mode](https://v3.router.vuejs.org/zh/api/#mode)、[base](https://v3.router.vuejs.org/zh/api/#base)。

## createRouteMap

## router-link

## router-view

