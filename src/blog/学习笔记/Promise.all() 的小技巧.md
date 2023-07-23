---
title: Promise.all() 的小技巧
date: 2022-11-06 15:34:00
icon: blog
tag:
  - javascript
category:
  - 记录
---

Promise 在处理异步操作时很有用。
JavaScript 提供了一个辅助函数 Promise.all(promisesArrayOrIterable)来同时并行处理多个 promise，并在单个聚合数组中获取结果。让我们看看它是如何工作的。

## Promise.all()

Promise.all() 接受一组 promises（或通常是一个可迭代的）。该函数返回一个 promise：

```javascript
const allPromise = Promise.all([promise1, promise2, ...]);
```

然后您可以使用 then-able 语法提取 Promise 解析的值：

```javascript
allPromise
  .then((values) => {
    values; // [valueOfPromise1, valueOfPromise2, ...]
  })
  .catch((error) => {
    error; // rejectReason of any first rejected promise
  });
```

或 async/await 语法：

```javascript
try {
  const values = await allPromise;
  values; // [valueOfPromise1, valueOfPromise2, ...]
} catch (error) {
  error; // rejectReason of any first rejected promise
}
```

## 所有的 Promise fulfilled

为了研究如何 Promise.all() 工作，我将使用 2 个助手 -resolveTimeout(value, delay)和 rejectTimeout(reason, delay).

```javascript
function resolveTimeout(value, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

function rejectTimeout(reason, delay) {
  return new Promise((r, reject) => setTimeout(() => reject(reason), delay));
}
```

```javascript
const allPromise = Promise.all([
  resolveTimeout(["potatoes", "tomatoes"], 1000),
  resolveTimeout(["oranges", "apples"], 1000),
]);

// wait...
const lists = await allPromise;

// after 1 second
console.log(lists);
// [['potatoes', 'tomatoes'], ['oranges', 'apples']]
```

promises 数组的顺序直接影响结果的顺序。

### 一个 Promise rejects

```javascript
const allPromise = Promise.all([
  resolveTimeout(["potatoes", "tomatoes"], 1000),
  rejectTimeout(new Error("Out of fruits!"), 1000),
]);

try {
  // wait...
  const lists = await allPromise;
} catch (error) {
  // after 1 second
  console.log(error.message); // 'Out of fruits!'
}
```

这种行为 Promise.all([...])被命名为 fail-fast。如果 promises 数组中至少有一个 promise 拒绝，则 allPromise = Promise.all([...])rejects 返回的 promise 也会被拒绝。

### 结论

Promise.all() 方法接收一个 promise 的 iterable 类型（注：Array，Map，Set 都属于 ES6 的 iterable 类型）的输入，并且只返回一个 Promise 实例， 那个输入的所有 promise 的 resolve 回调的结果是一个数组。这个 Promise 的 resolve 回调执行是在所有输入的 promise 的 resolve 回调都结束，或者输入的 iterable 里没有 promise 了的时候。它的 reject 回调执行是，只要任何一个输入的 promise 的 reject 回调执行或者输入不合法的 promise 就会立即抛出错误，并且 reject 的是第一个抛出的错误信息。
