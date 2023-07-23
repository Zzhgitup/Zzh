---
title: 手写Promise🧐简单版🚩
date: 2023-04-09 10:19:00
icon: blog
tag:
  - javascript
category:
  - 记录
---

```javascript
class MyPromise {
  constructor(executor) {
    // 初始化state为等待态
    this.state = "pending";
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    let resolve = (value) => {
      // state改变,resolve调用就会失败
      if (this.state === "pending") {
        // resolve调用后，state转化为成功态
        this.state = "fulfilled";
        // 储存成功的值
        this.value = value;
      }
    };
    let reject = (reason) => {
      // state改变,reject调用就会失败
      if (this.state === "pending") {
        // reject调用后，state转化为失败态
        this.state = "rejected";
        // 储存失败的原因
        this.reason = reason;
      }
    };
    // 如果executor执行报错，直接执行reject
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    // 状态为fulfilled，执行onFulfilled，传入成功的值
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    }
    // 状态为rejected，执行onRejected，传入失败的原因
    if (this.state === "rejected") {
      onRejected(this.reason);
    }
  }
}
```
