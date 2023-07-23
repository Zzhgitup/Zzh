---
title: JS引擎的执行机制
date: 2022-04-02 20:06:12
icon: blog
tag:
  - javascript
category:
  - 记录
---

<!--more-->

_**1.首先 JS 是单线程的**_

**_2.JS 的 Event Loop 是 JS 的执行机制。深入了解 JS 的执行,就等于深入了解 JS 里的 event loop_**

Event loop 事件循环

先看一个例子如下:

```javascript
console.log(1);

setTimeout(function () {
  console.log(2);
}, 0);

console.log(3);
```

这个例子的执行输出顺序是 1 3 2；

也就是说,setTimeout 里的函数并没有立即执行,而是延迟了一段时间,满足一定条件后,才去执行的,这类代码,我们叫异步代码。

JS 中有两类任务，一类是同步任务，一类是异步任务

按照这种分类方式:JS 的执行机制是

> **Event Table**  就是个注册站：调用栈让 Event Table 注册一个函数，该函数会在达到条件后被调用。当指定的事情发生时，Event Table 会将这个函数移到 Event Queue。**Event Queue**其实就是个缓冲区域，这里的函数等着被调用并移到调用栈。

- 首先判断 JS 是同步还是异步,同步就进入主线程,异步就进入 event table
- 异步任务在 event table 中注册函数,当满足触发条件后,被推入 event queue
- 同步任务进入主线程后一直执行,直到主线程空闲时,才会去 event queue 中查看是否有可执行的异步任务,如果有就推入主线程中

以上三步循环执行,这就是 event loop；

```javascript
​
    console.log(1)//同步任务进入主线程；直接输出

    setTimeout(function(){/*异步任务进入event table(注册站)等待0秒后被放入event queue(缓冲区)中；待主线程行完成后在去缓冲区中看看有没有任务，再执行*/
        console.log(2)
    },0)

    console.log(3)//同步任务进入主线程直接输出；


​
```

还有一种情况，假如在一个程序中，有许多个异步任务，那么先执行哪一个呢？；在异步任务中并不是按照进入事件队列的先后顺序去执行的；而是另有规定；

再举一个例子：如下

```javascript
setTimeout(function () {
  console.log("定时器开始啦");
});

new Promise(function (resolve) {
  console.log("马上执行for循环啦");
  for (var i = 0; i < 10000; i++) {
    i == 99 && resolve();
  }
}).then(function () {
  console.log("执行then函数啦");
});

console.log("代码执行结束");
```

> 这段代码中；第一个定时器是异步任务会被放到 event  table 中；
>
> new Promise 是同步任务，会被放到主线程中直 l 接执行打印
>
> .then 里的函数是异步任务，被放到 event table
>
> console.log\('代码执行结束'\)；是同步代码被放到主线程中；直接执行；

结果是：      马上执行 for 循环啦 \--- 代码执行结束 \--- 执行 then 函数啦 \--- 定时器开始啦

**如果仅仅按照异步同步去判断执行流程是不足够的，不够准确,**

像上面的这个代码.then    和    setTimeout 都是异步的，但是执行结果并没有按照进入事件队列的顺序执行的，

而准确的划分方式是按照**宏任务**和**微任务**划分的

macro-task\(宏任务\)：包括整体代码 script，setTimeout,setInterval

micro-task\(微任务\)：promise，process,nextTick;

![](https://img-blog.csdnimg.cn/b93c9dddfb2246af9f5960c0edf540bd.webp?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5rqQ5YiD,size_20,color_FFFFFF,t_70,g_se,x_16)

> 首先执行 script 下的宏任务,遇到 setTimeout,将其放到宏任务的【队列】里（这个在下一个事件循环的宏任务里添加，不是在当前宏任务中添加的）
>
> 遇到 new Promise 直接执行,打印"马上执行 for 循环啦"
>
> 遇到 then 方法,是微任务,将其放到微任务的【队列里】
>
> 打印 "代码执行结束"
>
> 本轮宏任务执行完毕,查看本轮的微任务,发现有一个 then 方法里的函数, 打印"执行 then 函数啦"
>
> 到此,本轮的 event loop 全部完成。

下一轮的循环里,先执行一个宏任务,发现宏任务的【队列】里有一个 setTimeout 里的函数,执行打印"定时器开始啦了；

[原内容地址，感谢博主的精心讲解！](https://segmentfault.com/a/1190000012806637 "原内容地址，感谢博主的精心讲解！")

周总结：

这周在学习 js 高级的内容；内容可以说很多，可以学习的知识很深，我现在只是浅浅的明白一些内容；红宝书的内容很多；这周学习总体上理论上的东西比较多；接下来我会进行实践，实际操作一下更深层次的理解；闭包，对象创建模式；继承都没有进行实践操作过；也不太清楚什么时候会用

希望能够尽快进行前后端交互;让我多一些实战经验；实际操作可比看书能学到的多的多；这周感觉挺累的，需要稍稍调整一下，马上就要有新成员进来了；我们的压力大了一些，可不能让他们超越了已经学了几个月的我们，要不然就感觉我们学习效率很低；

加油继续努力（卷）；
