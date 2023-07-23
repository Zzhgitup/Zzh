---
title: Thymeleaf
date: 2022-04-10 08:25:54
icon: blog
tag:
  - Thymeleaf
category:
  - 记录
---

<!--more-->

1. Thymeleaf 概述

Thymeleaf 是一个 Java 模板引擎，支持 html、xml、text、javascript、css、raw 这几种模型。

使用 Thymeleaf 首先需要引入命名空间

```javascript
<html  xmlns:th="http://www.thymeleaf.org">
```

2.  基本使用方法

1⃣️ 引用 web 静态资源

Thymeleaf 通过”\@\{\}”来引用 web 静态资源，例如：

```javascript
<script th:src="@{bootstrap/js/boostrap.min.js}"></script>
```

2⃣️ 访问 model 模型中的数据，例如访问一个 user 对象的 name 属性

```javascript
<span th:text="${user.name}"></span>
```

3⃣️ 在 Javascript 中访问 model 模型数据

```javascript
<script th:inline="javascript">
      var user = [[${user}]]     console.log(user.name + "\t" + user.age);
</script>
```

这一段时间，感觉自己学习的还是太少，不会的很多，学无止境，各种模版都需要学习，现在开始了前后端交互，怎么合作，怎么合作好是现在我面临的问题，第一次交互，我觉得能后收获很多东西，希望能够顺利完成这次的任务。

之后会继续写静态页面，等后端接口能用了，在进行下一步
