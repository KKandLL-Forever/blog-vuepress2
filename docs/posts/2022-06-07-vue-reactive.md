---
layout: Post  
title: Vue响应式原理   
subtitle: 理解大致思路    
author: Wak  
date: 2022-06-07  
useHeaderImage: true  
headerImage: /img/pages/page13.webp  
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

### 寻找入口文件
在Vue源码中，它是由Rollup来进行打包的，`npm run dev`这条指令则指示了打包开发环境时所使用的js文件，通过查看这个文件，我们就能找到Vue源码的入口的文件。

```json
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --environment TARGET:full-dev --sourcemap"
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
    alias: { he: './entity-decoder' },
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


