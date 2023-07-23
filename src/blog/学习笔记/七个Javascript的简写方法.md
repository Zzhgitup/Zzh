---
title: 七个JavaScript的简写方法
date: 2022-12-03 08:31:40
icon: blog
tag:
  - javascript
category:
  - 记录
---

### 多字符串检查

通常，如果我们需要检查字符串是否等于多个值中的一个，往往很快就会觉得疲惫不堪，性欲的是，JavaScript 有一个内置方法帮助你解决这个问题

```javascript
// 普通写法
const isVowel = (letter) => {
  if (
    letter === "a" ||
    letter === "e" ||
    letter === "i" ||
    letter === "o" ||
    letter === "u"
  ) {
    return true;
  }
  return false;
};

// 简写方法
const isVowel = (letter) => ["a", "e", "i", "o", "u"].includes(letter);
```

### For-of 和 For-in 循环

For-of 和 For-in 循环是迭代 array 或 object 的好方法，因为无需手动跟踪 object 键的索引。

1. For-of

```javascript
const arr = [1, 2, 3, 4, 5];

// 普通写法
for (let i = 0; i < arr.length; i++) {
  const element = arr[i];
  // ...
}

// 简写方法
for (const element of arr) {
  // ...
}
```

2. For-in

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

// 普通写法
const keys = Object.keys(obj);
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const value = obj[key];
  // ...
}

// 简写方法
for (const key in obj) {
  const value = obj[key];
  // ...
}
```

3. Falsey（假值）检查
   如果要检查变量是 null、undefined、0、false、NaN 还是空 string，可以使用逻辑非 (!)运算符一次检查所有变量，而无需编写多个条件。这使得检查变量是否包含有效数据变得相对容易多了。

```javascript
// 普通写法
const isFalsey = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === 0 ||
    value === false ||
    value === NaN ||
    value === ""
  ) {
    return true;
  }
  return false;
};

// 简写方法
const isFalsey = (value) => !value;
```

### 三元运算符

作为 JavaScript 开发人员，你一定遇到过三元运算符。这是编写简洁 if-else 语句的好方法。但是，也可用来编写简洁的代码，甚至将它们链接起来来检查多个条件。

```
// 普通写法
let info;
if (value < minValue) {
  info = "Value is too small";
} else if (value > maxValue) {
  info = "Value is too large";
} else {
  info = "Value is in range";
}

// 简写方法
const info =
  value < minValue
    ? "Value is too small"
    : value > maxValue ? "Value is too large" : "Value is in range";
```

### 函数调用

在三元运算符的帮助下，你还可以根据条件确定要调用哪个函数。

```javascript
function f1() {
  // ...
}
function f2() {
  // ...
}

// 普通写法
if (condition) {
  f1();
} else {
  f2();
}

// 简写方法
(condition ? f1 : f2)();
```

### Switch 简写

通常我们可以使用以键作为 switch 条件并将值作为返回值的对象来优化长 switch 语句。

```javascript
const dayNumber = new Date().getDay();

// 普通写法
let day;
switch (dayNumber) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}

// 简写方法
const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
const day = days[dayNumber];
```

### 回退值

||运算符可以为变量设置回退值。

```javascript
// 普通写法
let name;
if (user?.name) {
  name = user.name;
} else {
  name = "Anonymous";
}

// 简写方法
const name = user?.name || "Anonymous";
```
