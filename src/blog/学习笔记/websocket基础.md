---
title: websocket基础
icon: blog
tag:
  - Webscoket
category:
  - Webscoket
---

# 1.传统的是 HTTP 模式，

因为 HTTP 协议有一个缺陷：通信只能由客户端发起 一个 request 对应一个 respond
通信是单向的，请求==响应
没有请求就没有响应，举个例子：就比如我需要查询天气，只能是从客户端发送请求，接受查询结果。HTTP 做不到主动向客户端推送信息，这种单向的请求的特点，注定如果服务器有连续的状态变化，客户端想要及时了解就很不方便，只能通过轮询的方式实现，这样是非常浪费资源的因为需要不停的连接,所以发明了 websocket

# 2.websocket

websocket 是一种网络传输协议，可在单个 TCP 连接进行全双工通信，位于 OSI 模型的应用层
最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话
特点：

1. TCP 连接，与 HTTP 协议兼容
2. 双向通信，主动推送（服务端向客户端）
3. 无同源限制，协议标识符是 WS（加密 wss）

应用场景：

- [x] 聊天，消息，点赞，
- [x] 直播弹幕
- [x] 游戏，协同编辑，基于位置的应用

# 原生 websocket 的简单使用案例

我使用的 node.js 平台做的一个服务端，开启 websocket 服务
在 sever.js 文件中 ,建立服务先安装 ws 模块  
`npm i ws`
在 sever.js 中

```javascript
const WebSocket = require("ws"); //引入模块
const wss = new WebSocket.Server({ port: 3000 }); //监听本地3000端口
wss.on("connection", (ws) => {
  //对连接进行监听
  console.log("监听到服务");
  ws.on("message", (msg) => {
    //同时接受客户端发送的信息
    console.log(msg);
  });
  ws.send("我是服务端"); //向客户端发送的信息
});
```

服务端建立好之后接下载，看客户端
新建一个 HTML 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // WebSocket通信测试网址
      const ws = new WebSocket("http://127.0.0.1:3000"); //连接本地测试地址
      //实例对象的onopen属性，用于指定连接成功后的回调函数
      //如果要指定多个回调函数，可以使用addEventListener方法。
      ws.onopen = function () {
        console.lgo("连接建立成功！");
        //建立成功之后 可以使用这个连接对象进行通信发送消息
        ws.send("我是客户端");
      };

      ws.onmessage = function (msg) {
        console.log(msg.data);
      };
    </script>
  </body>
</html>
```

接下来在控制台输入`node sever.js`来启动服务
在浏览器控制台可以看到
![客户端结果](https://img-blog.csdnimg.cn/bf21920e35cb4b79ab4f4d5275dd9698.png#pic_center)
连接成功，并接收到服务端发来的消息
websocket 有很多 API
