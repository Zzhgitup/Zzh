---
title: 跨域问题
date: 2022-12-11 08:31:40
icon: blog
tag:
  - CORS
category:
  - 记录
---

### 什么是跨域

浏览器有一个重要的安全策略，称之为[同源策略]
其中，源=协议+主机+端口源=协议+主机+端口源=协议+主机+端口，两个源相同，称之为同源，两个源不同，称之为跨源或跨域。

比如：
| 源 1 | 源 2 | 是否同源 |
| ---- | ---- |----|
| www.baidu.com | www.baidu.com/news | 是 |
| http://www.baidu.com | https://www.baidu.com | 否 |
| http://localhost:5000 | http://localhost:7000 | 否 |
| http://localhost:5000 | http://127.0.0.1:5000 | 否 |
| www.baidu.com | baidu.com | 否 |
同源策略是指，若页面的源和页面运行过程中加载的源不一致时，出于安全考虑，浏览器会对跨域的资源访问进行一些限制
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/微信图片_20221211093517.jpg)
同源策略对 ajax 的跨域限制的最为*凶狠*，默认情况下，它不允许 ajax 访问跨域资源
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/微信图片_20221211093619.jpg)
所以，我们通常所说的跨域问题，就是同源策略对 ajax 产生的影响
有多种方式解决跨域问题，常见的有：

- 代理，常用
- CORS，常用
- JSONP
  无论使用哪一种方式，都是要让浏览器知道，我这次跨域请求的是自己人，就不要拦截了。

### 跨域解决办法 1-代理

对于前端开发而言，大部分的跨域问题，都是通过代理解决的

代理适用的场景是：生产环境不发生跨域，但开发环境发生跨域

因此，只需要在开发环境使用代理解决跨域即可，这种代理又称之为开发代理
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/微信图片_20221211093737.jpg)

在实际开发中，只需要对开发服务器稍加配置即可完成

```javascript
// vue 的开发服务器代理配置
// vue.config.js
module.exports = {
  devServer: {
    // 配置开发服务器
    proxy: {
      // 配置代理
      "/api": {
        // 若请求路径以 /api 开头
        target: "http://dev.taobao.com", // 将其转发到 http://dev.taobao.com
      },
    },
  },
};
```

### 解决跨域问题方法 2-JSONP

在 CORS 出现之前，人们想了一种奇妙的办法来实现跨域，这就是 JSONP。
要实现 JSONP，需要浏览器和服务器来一个天衣无缝的绝妙配合。
JSONP 的做法是：当需要跨域请求时，不使用 AJAX，转而生成一个 script 元素去请求服务器，由于浏览器并不阻止 script 元素的请求，这样请求可以到达服务器。服务器拿到请求后，响应一段 JS 代码，这段代码实际上是一个函数调用，调用的是客户端预先生成好的函数，并把浏览器需要的数据作为参数传递到函数中，从而间接的把数据传递给客户端

![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/微信图片_20221211094003.jpg)

### 跨域解决方法 3-CORS

CORS 是基于 http1.1 的一种跨域解决方案，它的全称是 Cross-Origin Resource Sharing，跨域资源共享。
它的总体思路是：如果浏览器要跨域访问服务器的资源，需要获得服务器的允许
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/微信图片_20221211094034.jpg)
而要知道，一个请求可以附带很多信息，从而会对服务器造成不同程度的影响

比如有的请求只是获取一些新闻，有的请求会改动服务器的数据

针对不同的请求，CORS 规定了三种不同的交互模式，分别是：

- 简单请求
- 需要预检的请求
- 附带身份凭证的请求
  这三种模式从上到下层层递进，请求可以做的事越来越多，要求也越来越严格。
  下面分别说明三种请求模式的具体规范。

`简单请求`
当浏览器端运行了一段 ajax 代码（无论是使用 XMLHttpRequest 还是 fetch api），浏览器会首先判断它属于哪一种请求模式

### 简单请求的判定

当请求同时满足以下条件时，浏览器会认为它是一个简单请求：

1. 求方法属于下面的一种：

- get
- post
- head

2. 请求头仅包含安全的字段，常见的安全字段如下：

- Accept
- Accept-Language
- Content-Language
- Content-Type
- DPR
- DownLink
- Save-Data
- Viewport-Width
- Width

3. 请求头如果包含 Content-Type，仅限下面的值之一：

- text/plain
- multipart/form-data
- application/x-www-form-urlencoded
  `如果以上三个条件同时满足，浏览器判定为简单请求。`

### 简单请求的交互规范

当浏览器判定某个 ajax 跨域请求是简单请求时，会发生以下的事情

1. 求头中会自动添加 Origin 字段
   比如，在页面`http://my.com/index.html`中有以下代码造成了跨域
   fetch('http://crossdomain.com/api/news');
   请求发出后，请求头会是下面的格式：

```javascript
GET /api/news/ HTTP/1.1
Host: crossdomain.com
Connection: keep-alive
...
Referer: http://my.com/index.html
Origin: http://my.com
```

看到最后一行没，Origin 字段会告诉服务器，是哪个源地址在跨域请求 2. 服务器响应头中应包含 Access-Control-Allow-Origin
当服务器收到请求后，如果允许该请求跨域访问，需要在响应头中添加 Access-Control-Allow-Origin 字段
该字段的值可以是：

- \*：表示我很开放，什么人我都允许访问
- 具体的源：比如http://my.com，表示我就允许你访问

```
实际上，这两个值对于客户端http://my.com而言，都一样，因为客户端才不会管其他源服务器允不允许，就关心自己是否被允许

当然，服务器也可以维护一个可被允许的源列表，如果请求的Origin命中该列表，才响应*或具体的源

为了避免后续的麻烦，强烈推荐响应具体的源
```

假设服务器做出了以下的响应：
``HTTP/1.1 200 OK
Date: Tue, 21 Apr 2020 08:03:35 GMT
...
Access-Control-Allow-Origin: http://my.com
...

消息体中的数据
`当浏览器看到服务器允许自己访问后，高兴的像一个两百斤的孩子，于是，它就把响应顺利的交给 js，以完成后续的操作
下图简述了整个交互过程
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/微信图片_20221211094943.jpg)`简单的请求对服务器的威胁不大，所以允许使用上述的简单交互即可完成。``
但是，如果浏览器不认为这是一种简单请求，就会按照下面的流程进行：

- 浏览器发送预检请求，询问服务器是否允许
- 服务器允许
- 浏览器发送真实请求
- 服务器完成真实的响应
  比如，在页面`http://my.com/index.html`中有以下代码造成了跨域

```javascript
fetch("http://crossdomain.com/api/user", {
  method: "POST", // post 请求
  headers: {
    // 设置请求头
    a: 1,
    b: 2,
    "content-type": "application/json",
  },
  body: JSON.stringify({ name: "袁小进", age: 18 }), // 设置请求体
});
```

浏览器发现它不是一个简单请求，则会按照下面的流程与服务器交互

1. **浏览器发送预检请求，询问服务器是否允许**

```
OPTIONS /api/user HTTP/1.1
Host: crossdomain.com
...
Origin: http://my.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: a, b, content-type
```

可以看出，这并非我们想要发出的真实请求，请求中不包含我们的请求头，也没有消息体。

这是一个预检请求，它的目的是询问服务器，是否允许后续的真实请求。

预检请求没有请求体，它包含了后续真实请求要做的事情
预检请求有以下特征：

- 请求方法为 OPTIONS
- 没有请求体
- 请求头中包含 - 请求方法为 OPTIONS
  没有请求体
  请求头中包含 - Access-Control-Request-Method：后续的真实请求将使用的请求方法 - Access-Control-Request-Headers：后续的真实请求会改动的请求头

2. 服务器允许
   服务器收到预检请求后，可以检查预检请求中包含的信息，如果允许这样的请求，需要响应下面的消息格式

```
HTTP/1.1 200 OK
Date: Tue, 21 Apr 2020 08:03:35 GMT
...
Access-Control-Allow-Origin: http://my.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: a, b, content-type
Access-Control-Max-Age: 86400
...
```

对于预检请求，不需要响应任何的消息体，只需要在响应头中添加：

- Access-Control-Allow-Origin：和简单请求一样，表示允许的源
- Access-Control-Allow-Methods：表示允许的后续真实的请求方法
- Access-Control-Allow-Headers：表示允许改动的请求头
- Access-Control-Max-Age：告诉浏览器，多少秒内，对于同样的请求源、方法、头，都不需要再发送预检请求了

3. 浏览器发送真实请求
   预检被服务器允许后，浏览器就会发送真实请求了，上面的代码会发生下面的请求数据

```
POST /api/user HTTP/1.1
Host: crossdomain.com
Connection: keep-alive
...
Referer: http://my.com/index.html
Origin: http://my.com

{"name": "xiaoming", "age": 18 }
```

4. 服务器响应真实请求

```
Date: Tue, 21 Apr 2020 08:03:35 GMT
...
Access-Control-Allow-Origin: http://my.com
...

添加用户成功
```

可以看出，当完成预检之后，后续的处理与简单请求相同
下图简述了整个交互过程
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/微信图片_20221211095559.jpg)

`一个额外的补充`
在跨域访问时，JS 只能拿到一些最基本的响应头，如：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。
`Access-Control-Expose-Headers`头让服务器把允许浏览器访问的头放入白名单，例如：

```
Access-Control-Expose-Headers: authorization, a, b
```

### 学习总结

本周主要还是以考试复习为重，学习了 CORS 关于跨域的产生和解决办法
