---
title: 实现async-await
date: 2024-3-23 19:48:57
icon: blog
tag: 技术实践
  -
category:
  - 记录
---

此次我们来实现一个 async await 内部实现
实际上 async 就是生成器的语法糖，await 就是 then 的语法糖,
平常我们使用的过程中

### 示例

```javascript
const getDate = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve("data"), 1000));
async function test() {
  const res = await getDate();
  console.log("data:", res);
  const res2 = await getDate();
  console.log("data2:", res2);
}
// 输出
//data:data
//data2:data
```

### 思路

对于这个简单的案例来说，如果我们把它用 generator 函数表达，会是怎么样的呢？

```javascript
function* testG() {
  const res = yield getDate();
  console.log("data:", res);
  const res2 = yield getDate();
  console.log("data2:", res2);
  return "success";
}
```

我们知道，generator 函数是不会自动执行的，每一次调用它的 next 方法，会停留在下一个 yield 的位置。
利用这个特性，我们只要编写一个自动执行的函数，就可以让这个 generator 函数完全实现 async 函数的功能。

```javascript
const getDate = () =>
  new Promise((resolve, reject) => setTimeout(() => resolve("data"), 1000));
const test = asyncToGenerator(function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
});
test().then((res) => console.log(res));
```

asyncToGenerator 接收一个生成器函数，返回一个 Promise。关键在于里面用 yield 来划分异步流程，如何自动执行

### 如果是手动执行

在编写这一个函数之前，我们先手动模拟，调用这个 generator 函数去一步一步把流程走完，有助于后面的思考;

```javascript
function* testG() {
  const res = yield getDate();
  console.log("data:", res);
  const res2 = yield getDate();
  console.log("data2:", res2);
  return "success";
}
const gen = testG();
```

然后开始执行第一次 next

```javascript
//第一次执行 next，停留在第一个yield 的位置
//返回的Promise中，包含饿了data 需要的数据
const dataPromise = gen.next();
```

这里返回了一个 Promise 对象，就是第一个 getDate 的返回值

这段代码要切割成左右两部分来看，第一次调用 next，其实只是停留在了 yield getData()这里，

dataPromise 的值并没有被确定。下一次调用 next 的时候，传的参数会被作为上一个 yield 前面接受的值，也就是说当我们再次调用 next（）的时候，dataPromise 的才被确定，而且是再次调用 next 函数的时候传入的参数值

```javascript
function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}

var gen = testG();

var dataPromise = gen.next();

dataPromise.value.then((value1) => {
  // data1的value被拿到了 继续调用next并且传递给data
  var data2Promise = gen.next(value1);

  // console.log('data: ', data);
  // 此时就会打印出data

  data2Promise.value.then((value2) => {
    // data2的value拿到了 继续调用next并且传递value2
    gen.next(value2);

    // console.log('data2: ', data2);
    // 此时就会打印出data2
  });
});
```

借助这个特性，我们就可以实现异步串行了,让我们来实现这个 asyncToGenerator 函数，接收一个生成器函数，并且自动执行 next()，返回 promise 对象

```javascript
function asyncToGenerator(generatorFunc) {
  return function () {
    const gen = generatorFunc.apply(this, argument);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          reject(error);
        }
        const { value, done } = generatorResult;
        if (done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            (val) => step("next", val),
            (err) => step("throw", err)
          );
        }
      }
      step("next");
    });
  };
}
```
