---
title: JS语言基础（一）
icon: blog
date: 2021-11-12
tag:
  - javascript
category:
  - 记录
---

## 1.严格模式

严格模式是一种不同的 javascript 解析和执行的模型，如果要对整个脚本开启严格模式在脚本开头加上`use strict`虽然看起来没有复制给任何变量的字符串吗，但它其实是一个预处理指令，任何支持 JavaScript 的引擎看到就会切换到严格模式，

## 2.变量

- var 关键字
- let 关键字
- const 关键字

## 3.暂时性死区

```
//name会被提升
console.log(name);//undefined
var name="小明";
//name不会提升
console.log(name)//报错
let name="小明";
```

在 let 声明之前的执行瞬间被称为。暂时性死区，在此阶段引用任何后面声明的变量都会抛出`ReferenceError`

## 4.全局声明

与 var 关键字不同，使用 let 在全局作用域中声明的变量不会成为 window 对象的属性（var 声明的变量则会）;

## 声明风格及最佳实践

- 不使用 var
- const 优先 ，let 次之
