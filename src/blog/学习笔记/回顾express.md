---
title: 回顾express
date: 2022-08-14 08:34:12
icon: blog
tag:
  - noed.js
  - express
category:
  - 记录
---

<!--more-->

## 1.express 是什么

Express 是一个基于  [Node](https://so.csdn.net/so/search?q=Node&spm=1001.2101.3001.7020 "Node")平台的 Web 应用开发框架，它提供了一系列的强大特性，帮助你创建各种 Web 应用。

## 2 .Express 框架特性

- 提供了**简洁的路由定义**方式
- 对获取 http **请求参数**进行了**简化处理**
- 对**模板引擎支持程度高**，方便渲染动态 HTML 页面
- 拥有**中间件**机制有效**控制 HTTP 请求**
- 拥有大量第三方中间件对功能进行扩展

## 3 .原生 node.js 与 Express 框架对比

![422f6da8b6d34336ae69e70859163419.png](https://img-blog.csdnimg.cn/422f6da8b6d34336ae69e70859163419.png)

![e9c435389c0542b5b5da8e592be66431.png](https://img-blog.csdnimg.cn/e9c435389c0542b5b5da8e592be66431.png)

##  4.中间件

![55bd7475882742339b921dc03a8d95e8.png](https://img-blog.csdnimg.cn/55bd7475882742339b921dc03a8d95e8.png)

![647096f6d82246239deb7a99732285b2.png](https://img-blog.csdnimg.cn/647096f6d82246239deb7a99732285b2.png)

![27cf49b6412f40669e23658c0d81748b.png](https://img-blog.csdnimg.cn/27cf49b6412f40669e23658c0d81748b.png)

##  5   中间件应用

### 路由保护：

客户端在访问需要登录的页面时，可以先使用中间件判断用户登录状态，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面。

错误处理中间件

本周还是对项目的完善，使之更加严谨可用，
