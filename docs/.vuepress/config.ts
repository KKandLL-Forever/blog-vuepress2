import { defineUserConfig } from "vuepress";
import type { GungnirThemeOptions } from "vuepress-theme-gungnir";
import gungnirTheme from 'vuepress-theme-gungnir'
import { viteBundler } from "@vuepress/bundler-vite";

// import { navbar, sidebar } from "./configs";

export default  defineUserConfig({
  // 站点配置
  // base: "/blog-vuepress2/", //github page
  base: "/", // vercel
  dest: 'public',// vercel发布时要用
  lang: 'zh-CN',
  title: 'Wak Blog',
  description: 'Just playing around',
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/img/logo/favicon-16x16@2x.png`
      }
    ],
  ],
  bundler: viteBundler(),
  // 主题和它的配置
  theme: gungnirTheme({
    catalog: false,
    navbarTitle: "Gungnir",
    pages: {
      // 标签页配置
      tags: {
        // 可选：标签页副标题
        subtitle: 'Don’t put limits on yourself',
        // 可选：标签页封面图路径和蒙版
        bgImage: {
          path: '/img/tags/tags.webp',
          // mask: 'rgba(211, 136, 37, .5)'
        }
      },
    },
    navbar: [
      {
        text: "首页",
        link: "/",
        icon: "fa-fort-awesome"
      },
      {
        text: "标签",
        link: "/tags/",
        icon: "fa-tag"
      },
      {
        text: "wKcUI",
        link: "https://kkandll-forever.github.io/wkcUI/",
        icon: "bi-ui-radios-grid"
      },
      {
        text: "VuePress",
        link: "https://v2.vuepress.vuejs.org/zh/",
        icon: "ri-vuejs-line"
      },
    
    
      // {
      //   text: "链接",
      //   link: "/links/",
      //   icon: "fa-satellite-dish"
      // },
      // {
      //   text: "文档",
      //   link: "/zh/docs/basic/intro.md",
      //   icon: "ri-book-2-fill"
      // },
  
    ],
    docsDir: "docs",
    hitokoto: "https://v1.hitokoto.cn?c=f&c=l&c=k", // enable hitokoto (一言) or not?
    personalInfo: {
      // 必须：名称，将在首页、移动端侧边栏和文章作者信息处显示
      name: "Wak",
      // 必须：头像，将在首页和移动端侧边栏显示
      avatar: "/img/avatar.webp",
      // 必须：个人简介，将在首页显示
      description: "More than FrontEnd.",
      // 可选：社交平台账号，将在首页和移动端侧边栏显示
      sns: {
        github: "KKandLL-Forever",  // Github
        // linkedin: "xiaohan-zou-55bba0160",  // 领英
        // facebook: "renovamen.zou",  // Facebook
        // twitter: "renovamen_zxh",  // 推特
        // zhihu: "chao-neng-gui-su",  // 知乎
        weibo: "2769807153",  // 新浪微博
        email: "clay1wang@gmail.com",  // 邮箱
        // rss: "/rss.xml",  // RSS 文件的链接
        // 添加其他的社交平台
        leetcode: {  // 随便什么名字
          icon: "co-leetcode",  // 社交平台的图标
          link: "https://leetcode-cn.com/u/kkandll-forever/"  // 主页链接
        }
      }
    },
    homeHeaderImages: [
      {
        path: "/img/home-bg/1.jpg",
        mask: "rgba(40, 57, 101, .4)"
      },
      {
        path: "/img/home-bg/2.jpg",
        mask: "rgb(251, 170, 152, .2)"
      },
      {
        path: "/img/home-bg/3.jpg",
        mask: "rgba(68, 74, 83, .1)"
      },
      {
        path: "/img/home-bg/4.jpg",
        mask: "rgba(19, 75, 50, .2)"
      }
    ],
    footer: `
      &copy; <a href="https://github.com/KKandLL-Forever" target="_blank">KKandLL</a> 2022-2022
      <br>
      Powered by <a href="https://v2.vuepress.vuejs.org" target="_blank">VuePress</a> &
      <a href="https://github.com/Renovamen/vuepress-theme-gungnir" target="_blank">Gungnir</a>
    `,
    themePlugins: {
      katex: true,
      mdPlus: {
        footnote: true,  // 脚注（默认：false）
        mark: true  // 高亮标记（默认：false）
      },
      chartjs: true,
      mermaid: true,
      ba: '2288f030179bc7571034aa96d66725e2',
      ga: 'G-DXWYKKWRDX',
      giscus: {
        repo: "KKandLL-Forever/blog-vuepress2",  // 必须，string，格式：user_name/repo_name
        repoId: "R_kgDOHDfxfA",  // 必须，string，在 Giscus 官网上生成
        category: "Announcements",  // 必须，string
        categoryId: "DIC_kwDOHDfxfM4CPaAy",  // 必须，string，在 Giscus 官网上生成
        mapping: "title",  // 可选，string，default="title"
        lazyLoad: true,  // 可选，boolean，default=false（如果设为 true，Giscus 的加载将延迟到用户滚动到评论容器附近）
      }
    }
  }),
  plugins: [

  ]
})
