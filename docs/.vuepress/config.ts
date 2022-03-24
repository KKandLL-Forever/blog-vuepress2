import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: 'en-US',
  title: 'Hello VuePress',
  description: 'Just playing around',
  
  // 主题和它的配置
  theme: 'gungnir',
  themeConfig: {
    personalInfo: {
      // 必须：名称，将在首页、移动端侧边栏和文章作者信息处显示
      name: "Cool Dragon",
    
      // 必须：头像，将在首页和移动端侧边栏显示
      avatar: "/img/avatar.jpeg",
    
      // 必须：个人简介，将在首页显示
      description: "A cool dragon lost in human world.",
    
      // 可选：社交平台账号，将在首页和移动端侧边栏显示
      sns: {
        github: "Renovamen",  // Github
        linkedin: "xiaohan-zou-55bba0160",  // 领英
        facebook: "renovamen.zou",  // Facebook
        twitter: "renovamen_zxh",  // 推特
        zhihu: "chao-neng-gui-su",  // 知乎
        weibo: "your-weibo-id",  // 新浪微博
        email: "renovamenzxh@gmail.com",  // 邮箱
        rss: "/rss.xml",  // RSS 文件的链接
        // 添加其他的社交平台
        bilibili: {  // 随便什么名字
          icon: "ri-bilibili-line",  // 社交平台的图标
          link: "https://www.bilibili.com/"  // 主页链接
        }
        // ...
      }
    },
    homeHeaderImages: {
      // 可选：首页本地封面图路径和蒙版
      local: [
        // 图 1
        {
          "path": "/img/home-bg/1.jpg",
          "mask": "rgba(40, 57, 101, .4)"
        },
        // 图 2
        // {
        //   "path": "/img/home-bg/2.jpg",
        //   "mask": "rgb(251, 170, 152, .2)"
        // }
      ]
    },
    footer: `
      &copy; <a href="https://github.com/Renovamen" target="_blank">Renovamen</a> 2018-2022
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `
  },
})
