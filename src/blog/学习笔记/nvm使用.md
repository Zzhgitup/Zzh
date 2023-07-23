---
title: 随时切换node版本不是梦
date: 2023-04-13 15:33:15
icon: blog
tag:
  - nvm
category:
  - 记录
---

### nvm 介绍

在工作中，我们可能同时在进行 2 个或者多个不同的项目开发，每个项目的需求不同，进而不同项目必须依赖不同版本的 NodeJS 运行环境，这种情况下，对于维护多个版本的 node 将会是一件非常麻烦的事情，nvm 就是为解决这个问题而产生的，他可以方便的在同一台设备上进行多个 node 版本之间切换。

### nvm 的下载和使用

安装包地址：https://github.com/coreybutler/nvm-windows/releases
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ%E6%88%AA%E5%9B%BE20230413154837.png)

下载 windows 版本

![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ%E6%88%AA%E5%9B%BE20230413155112.png)

点击下载好的压缩包 运行里面的 exe 文件进行安装

![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ%E6%88%AA%E5%9B%BE20230413155223.png)

第一个路径选择的是安装目录
第二个路径选择的是 node 的安装目录；
`如果本身装有node，则选择node所在位置`

### 选择淘宝镜像加速下载

![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ%E6%88%AA%E5%9B%BE20230413155504.png)

编辑 settings.txt;不改变原来的内容在下方加上以下两行内容
`node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/`

### nvm 的操作

```
nvm off                     // 禁用node.js版本管理(不卸载任何东西)
nvm on                      // 启用node.js版本管理
nvm install <version>       // 安装node.js的命名 version是版本号 例如：nvm install 8.12.0
nvm uninstall <version>     // 卸载node.js是的命令，卸载指定版本的nodejs，当安装失败时卸载使用
nvm ls                      // 显示所有安装的node.js版本
nvm list available          // 显示可以安装的所有node.js的版本
nvm use <version>           // 切换到使用指定的nodejs版本
nvm v                       // 显示nvm版本
nvm install stable          // 安装最新稳定版
```

以上就是全部内容,不得不说感觉真的好用
