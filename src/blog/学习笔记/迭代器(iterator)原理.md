---
title: 迭代器(iterator)原理
date: 2022-09-03 10:38:50
icon: blog
tag:
  - javascript
category:
  - 记录
---

<!--more-->

**目录**

[1.iterator 介绍    ](<#1.iterator介绍   >)

[2.itertor 作用       ](<#2.itertor作用      >)

[3.iterator 的遍历原理](#3.iterator%E7%9A%84%E9%81%8D%E5%8E%86%E5%8E%9F%E7%90%86)

---

## 1.iterator 介绍    

iterator 是一种接口，为各种不同数据结构提供一种统一的访问机制，任何数据只要部署 iterator 接口，就可以完成遍历操作，

## **2.itertor 作用**     

iterator 的作用有三个：一是为各种数据结构，提供一个统一的，简便的访问接口；二是使得数据结构的成员能够按照某种次序排列，三是 ES6 创造了一种新的遍历命令 for···of 循环，iterator 接口主要供 for···of 消费

## 3.iterator 的遍历原理

\(1\) 创建一个指针对象，指向当前数据结构的起始位置，也就是说，遍历器本质上是一个指针对象

\(2\) 第一次调用指针对象的 next  方法     可以将指针指向数据结构的第一个成员

\(3\) 第二次调用指针对象的 next 方法     指针对象将指向数据结构的第二个成员

\(4\) 不断调用指针对象的 next 方法， 直到它指向数据结构的结束位置，每一次调用 next 方法，都会返回数据结构的当前成员信息，具体来说就是返回一个包含 value 和 done  两个属性的对象其中 value 是当前成员的值，done 属性是一个布尔值   ，表示遍历是否结束

**模拟例子**

```javascript
var it = makeIterator(["a", "b"]);
it.next(); // { value: "a", done: false }
it.next(); // { value: "b", done: false }
it.next(); // { value: undefined, done: true }
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}
```

makeIterator 是一个迭代器生成函数，作用就是返回一个遍历器对象，对数组\['a','b'\]  执行这个函数

返回该数组的迭代器对象（即指针对象）

2021 字节跳动 web 工程师笔试题

## 第一题

> \[  
> \{num: 12, city: ‘beijing’\},  
> \{num: 56, city: ‘shanghai’\},  
> \{num: 167, city: ‘guangzhou’\},  
> \{num: 23, city: ‘shenzhen’\},  
> \{num: 45, city: ‘caoxian’\}  
> \]  
> 写一个方法实现把上面的数组转换成下面这种格式：  
> \{beijing: 12, shanghai: 56,…\}

```javascript
let obj = [
  { num: 12, city: "beijing" },
  { num: 56, city: "shanghai" },
  { num: 167, city: "guangzhou" },
  { num: 23, city: "shenzhen" },
  { num: 45, city: "caoxian" },
];
let res = {};
for (let i = 0; i < obj.length; i++) {
  res[obj[i].city] = obj[i].num;
}
console.log(res);
```

遍历数组添加到对象就行了

本周主要进行了复习，对 JS 基础   JS 高级   ES6 进行了回顾   剩余时间在学习 Vue  加油！
