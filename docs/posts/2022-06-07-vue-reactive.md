---
layout: Post  
title: Vue响应式原理   
subtitle: 理解大致思路    
author: Wak  
date: 2022-06-07  
useHeaderImage: true  
headerImage: /img/pages/page14.webp  
tags:

- Vue

---

## 事前准备

### Fork代码

[Vue仓库地址](https://github.com/vuejs/vue)
作用：

1. 方便写自己注释
2. 方便便携demo,调试程序

### 项目结构

```
└── vue ································· project root
   ├─ benchmarks ········································· lib folder
   │  └─ index.js ································· entry file
   ├─ dist ····································· 打包产物
   ├─ examples ····································· 实例
   ├─ .gitignore ····································· git ignore file
   ├─ README.md ······································ repo readme
   └─ package.json ······································ package file
```

## 寻找入口文件

在Vue源码中，它是由Rollup来进行打包的，`npm run dev`这条指令则指示了打包开发环境时所使用的js文件，通过查看这个文件，我们就能找到Vue源码的入口的文件。

```json
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:full-dev"
  }
}
```

可以看到，Rollup运行的打包文件是位于`script`目录下的`config.js`文件。
同时还传入了`TARGET`为`full-dev`

在`config.js`内，抛开定义各种变量，执行逻辑其实只有一个`if...else...`语句

```javascript
//config.js

//判断环境变量是否有TARGET
//getConfig()生成rollup配置文件
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
```

`getConfig()`函数内，则通过`builds`这个对象来找到`full-dev`的选项

```javascript
//config.js

const builds = {
  /*-----代码省略-----*/
  // Runtime+compiler development build (Browser)
  'full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.ts'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: {he: './entity-decoder'},
    banner
  },
  /*-----代码省略-----*/
}

function genConfig(name) {
  const opts = builds[name]
  /*-----代码省略-----*/
}
```

从`full-dev`对象就可以找到入口文件，`entry-runtime-with-compiler.ts`了。(其他版本入口文件同理)

### runtime-with-compiler.ts

`entry-runtime-with-copiler.ts`文件中的内容很简单:

1. extend(Vue,vca)。vca就是vue3的composition API
2. Vue.effect = effect 也是vue3特性，这里只分析Vue2的代码，Vue3先略过
3. 导出Vue

Vue2部分的代码是由`runtime-with-compiler.ts`导入的。  
主要由几个部分组成:

1. `Vue.prototype.$mount`函数定义
2. `getOuterHTML()`函数定义
3. 导出Vue

我们先来看`$mount`  
判断el是否传入，并通过`query()`判断el是字符串还是DOM元素

```typescript
//runtime-with-compiler.ts
Vue.prototype.$mount = function (
  el?: string | Element,
  // 非ssr时为false，反之为true
  hydrating?: boolean
): Component {
  //获取el对象
  el = el && query(el)
}
```

```typescript
//util/index.ts
export function query(el: string | Element): Element {
  if (typeof el === 'string') {
    //el 为选择器
    const selected = document.querySelector(el)
    if (!selected) {
      __DEV__ && warn('Cannot find element: ' + el)
      return document.createElement('div')
    }
    return selected
  } else {
    //el为dom元素
    return el
  }
}
```

接下来判断el是否是`body`或者`html`

```typescript
// el 不能是body 或者 html
if (el === document.body || el === document.documentElement) {
  __DEV__ &&
  warn(
    `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
  )
  return this
}
```

接下来获取Vue实例上的`$options`, 判断是否传入了`render()`函数,如果没传`render()`函数，就会将`template`转换成`render()`函数进行渲染（这里暂时不深入template部分的实现）。  
如果传入了`render()`函数则调用`mount()`函数渲染DOM。

```typescript

Vue.prototype.$mount = function (
  l?: string | Element,
  // 非ssr时为false，反之为true
  hydrating?: boolean
): Component {
  
  /*-----代码省略-----*/
  
  const options = this.$options
  //如果没有传入render函数，将template转换成render函数
  //如果传入了render函数，直接调用下面的mount方法
  if (!options.render) {
    let template = options.template
    if (template) {
      //do something
    } else if (el) {
      //do something
    }
    if (template) {
      //do something
    }
  }
  return mount.call(this, el, hydrate)
}
```

但这里引申出来一个问题，定义了`$mount`这个函数，可它在Vue源码中又是在哪里背调用的呢？  
我们可以通过chrome的调试工具的调用栈来找到它的调用位置。  
在调试之前，我们需要先做几个准备工作：
1. 构建带有sourceMap的,Vue编译&运行时文件  
在`scripts`命令中加上`--sourcemap`选项
```json
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:full-dev --sourcemap"
  }
}
```

2. 准备一个最起初的Vue起始文件。(带有`new Vue()`和`render()`函数，并且使用`$mount`执行渲染)。（随便渲染一个div即可）
3. 在chrome的源码标签页中，`Vue.prototype.$mount`的第一行代码上打上断点
![vue-use-api](../.vuepress/public/img/article/vue-reactive/chrome-source.png)  

然后我们刷新当前页面，进入调试模式  
在chrome调试工具右侧，可以找到调用栈的信息。大致长这样：  
![vue-use-api](../.vuepress/public/img/article/vue-reactive/chrome-callStack.png)  
从调用栈上，我们不难发现，`Vue.$mount`是在`Vue._init`方法中调用的，而`Vue._init`又是由Vue的构造函数调用的。`(anonymous)`表示匿名函数，点进去就能看到就是我们`new Vue()`时的代码。  


### 入口文件总结
- el 不能是 body 或者 html 标签
- 如果没有 render，把 template 转换成 render 函数
- 如果有 render 方法，直接调用 mount 挂载 DOM
