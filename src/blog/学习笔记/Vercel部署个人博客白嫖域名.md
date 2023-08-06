---
title: Vercel部署个人博客+白嫖个人域名
date: 2023-07-25 08:25:54
icon: blog
tag:
  - 博客
category:
  - 记录
---

### vercel

（补充：vercel 在国内已被墙，一个悲伤的消息，网站只能科学上网查看，或者自己绑定域名）

使用[vuepress](https://so.csdn.net/so/search?q=vuepress&spm=1001.2101.3001.7020)+github 托管

我们可以使用 vercel 进行部署，vercel 和 github actions 很相似，都是通过将博客的所有必须文件（包括 package.json,docs 等）push 到 github 的某个仓库仓库中，然后在 vercel 中创建一个项目，导入此仓库，之后的一切就交给 vercel 去做了
并且 vercel 还能够自动部署，如果你 commit 了新的内容，vercel 监测到有新的 commit 之后，便会重新运行 npm run build 命令进行部署，你只需要将新的修改，从本地 push 到 github 便可以了（比如新增一篇文章），而不需要像 github pages，服务器部署那样，每次新增文章，都需要在本地运行 npm run build，然后再将 docs/.vuepress/dist 目录中的所有文件，上传到 github 或者服务器中才能完成博客新内容的改变

而且 vercel 还自带 cdn 加速，在速度上比使用通过 github pages 托管，通过 xxx.github.io/xxx 访问的速度快，除此以外，还可以自定义域名，可以使用我们自己的域名。

#### 1. 首先就是使用 Vue-press 构建自己的博客

vuepress 有很多博客主题，`https://marketplace.vuejs.press/zh/themes/blog.html`

推荐[VuePress Theme Hope](https://theme-hope.vuejs.press/zh/cookbook/)，

接下使用 VuePress Theme Hope 来先简单搭建一个博客，官方给出的方式很是简单，只需一行代码，就能构建一个博客

`pnpm create vuepress-theme-hope hope-project`

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/144fd909327249fabcb46f1d3b35ce15~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

经过上面一系列选项，成功构建一个博客项目可以在本地查看

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/50da5c15086c459baa6d04d3e3fb32e5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/86b4aa0ed52c484095744a89cbbd6903~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

项目目录结构如下图，博客配置在这里就不说了，想要了解具体内容，请前往[VuePress Theme Hope](https://theme-hope.vuejs.press/zh/cookbook/)，查看具体配置，和使用

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/301d2028602a4fa3ba5f3b1185da2fda~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

`此配置的作用就是，运行`npm run build`命令后，打包后的文件，将会放在`dist`目录中，默认是`docs/.vuepress/dist`目录` 也可以自己更改目录配置

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/5cc2eba9115144ea8f5815f33697545e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 将项目放在 GitHub 托管

将项目推送至 GitHub，自行完成，

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4772a14210f4cd2b5cf53e044fd1516~tplv-k3u1fbpfcp-watermark.image?)

### [打开 vercle 官网](https://vercel.com/)

使用 GitHub 登录官网

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/5ef967566b6b4602957a12e1b315bf8a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

new Project ，import 自己刚刚创建的 GitHub 仓库

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/ef0fcdc7b0ff4a89bbfb05e7bfa69506~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

下一步，如下图操作这里的 Output Directory 就是上面设置的 base，都使用默认配置

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/385f8c79d5574830b23311bbbe8098de~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

点击`Deplay`,开始部署

等待部署完毕出现 烟花界面，恭喜你成功了！！！

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/72a83f3380844615a753956a2b52395c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

点击 continue to Dashboard

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/cfe8a529692b4e7785cc382d2e12557c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/c2de157d6c7e46ed89a86e2ce0cd054b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 自定义域名（也不是太自定义）

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/d1d4ab2f89214ee0a6754a4a0c6caa9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

设置访问域名

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/9283ee286ef74a32af0c4d22282afcfe~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

自定义域名这里域名只能以 vercel.app 结尾，不然就是绑定自己的域名了

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/d2a2108987914628893d2b902caa6b47~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

修改成 juejin123，修改成功！，（juejin 已经被占用了）

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/f17fd69bf5764689a0d24c741221fbb5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![image.png](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/8bd7fbbefe724bf79c51d3effecfe720~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 更新博客

vercel 监测到有新的 commit 之后，便会重新运行 npm run build 命令进行部署，你只需要将新的修改，从本地 push 到 github 便可以了
