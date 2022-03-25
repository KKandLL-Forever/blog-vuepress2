# ElementUI修改默认样式的几种方法

> ElementUI是一款非常强大的前端UI组件库，它默认定义了很多美观的样式，但是我们在实际开发过程中不可避免地遇到需要修改ElementUI默认样式。下面总结了几种修改默认样式的方法。
>

### 1.新建全局样式表

新建 global.css 文件，并在 main.js 中引入。 global.css 文件一般都放在 src->assets 静态资源文件夹下的 style 文件夹下.

main.js:

```javascript
import "./assets/style/global.css";
```

### 2.在当前 vue 单页面中添加一个新的style标签

在当前的vue单页面(组件)的`style`标签后，添加一对新的`style`标签，新的`style`标签中不要添加scoped属性。***在有写scoped的style标签中书写的样式不会覆盖 ElementUI 默认的样式。***

### 3. 使用深度作用选择器

如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符：

```scss
.a >>> .b { 
    /* ... */ 
}
```

但像Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作。

```scss
.a ::v-deep .b {
    height: 120px;
}
/deep/ .c{
    //样式
}
```

### 4. 通过绑定内联样式覆盖默认样式

```html
<el-button :style="textStyle"></el-button>
```

```js
//JavaScript
export default {
  data(){
    return {
      textStyle:{
        height: "120px"
      }
    }
  }
}
```
::: tip
这种方式只能对elementUI暴露出来的标签的样式进行修改(如el-button等),但例如el-input等这类内部标签(el-input_inner)没有暴露的情况就不可以使用这种方法
:::


### 5. 通过绑定类样式覆盖默认样式

```html
<el-button class="testInput"></el-input>
```

::: tip
注意点同上
:::

