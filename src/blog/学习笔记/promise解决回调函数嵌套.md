---
title: promise解决回调函数嵌套
date: 2022-03-13 11:16:14
icon: blog
tag:
  - javascript
category:
  - 记录
---

<!--more-->

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件，这就解决了，我上次写的 ajax 的异步造成的问题，还要在回调函数中去绑定事件，有了 promise 这些都不是事，有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。

promise 对象代表一个异步操作，有三种状态 pending\(进行中\)，fulfilled\(已成功\)，rejected\("已失败"\)，异步操作的结果决定这个对象的状态，

一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

基本用法

创建一个 promise 对象，

```javascript
let a = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("执行了promise");
    reject("执行成功返回的数据像接口数据啥的");
  }, 1000);
});
```

![](https://img-blog.csdnimg.cn/f003286678cc48fd81dfb73761b53b1a.png)

这我只是创建了一个对 promise 对象但是却执行了，Promise 新建后就会立即执行。

所以应该把 promise 对象放在函数了，比如单击事件函数，单机之后才会新建 promise 对象然后执行，

其中两个参数，resolve   reject 是两个函数，是由 js 引擎提供的，不需要自己写

resolve 函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定 resolved 状态和`Promise`状态的回调函数。

promise 对象的 then 方法，可以将两个回调函数作为参数，第一个会回调函数就是当 promise 的状态为 resolve 的时候调用的并且可以接受传来的数据。

```javascript
a.then(
  function (value) {
    console.log(value);
    //成功之后
  },
  function (value) {
    console.log(value);
  }
);
```

![](https://img-blog.csdnimg.cn/e76bc85121e2457a96cb4dc58ba1de38.png)

状态变为 resolve 之后就会执行 then 方法的第一个回调函数，并且把数据也传了过来，在进行操作就行了，类似于这样在 Ajax 中请求成功就把返回数据用 resolve 函数传递，就会执行 then 方法的第一个回调函数，在回调函数中也可以再 return  promise 对象，进行回调函数的执行，形成链式，如果不用 promise，在 Ajax 的回调函数中写就会形成多层嵌套，代码一直往右延申，不利于观察，用 promise 链式，可以代码让代码看起来更有条理，

这就我现在的理解，可能有错误，后续会改
