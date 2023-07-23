---
title: JS对象复制
date: 2022-11-27 08:31:40
icon: blog
tag:
  - javascript
category:
  - 记录
---

我们知道，赋值运算符不会创建对象的副本，只会分配对它的引用，请看以下代码：

```javascript
let obj = {
  a: 1,
  b: 2,
};
let copy = obj;

obj.a = 5;
console.log(copy.a);
// Result
// a = 5;
```

obj 变量是初始化的新对象的容器。copy 变量指向同一个对象，并且是该对象的引用。所以基本上这个{ a: 1, b: 2, }对象是在说现在有两种方法可以访问我：通过 obj 变量或 copy 变量以任何一种方式传递给我，并且你通过这些方式对我所做的任何操作都会影响我。

此方法消除了任何形式的不变性，如果原始对象被代码的另一部分使用，可能会导致 bug。

## 复制对象的简单方法

复制对象的简单方法是遍历原始对象并一个接一个地复制每个属性。让我们看一下这段代码：

```javascript
function copy(mainObj) {
  let objCopy = {}; // objCopy will store a copy of the mainObj
  let key;

  for (key in mainObj) {
    objCopy[key] = mainObj[key]; // copies each property to the objCopy object
  }
  return objCopy;
}

const mainObj = {
  a: 2,
  b: 5,
  c: {
    x: 7,
    y: 4,
  },
};

console.log(copy(mainObj));
```

但这里有几个问题：

1. objCopy 对象有一个新的 Object.prototype 方法，不同于 mainObj 对象的原型方法，这不是我们想要的。我们想要的是原始对象的精确副本。
2. 不复制属性描述符。值设置为 false 的“可写”描述符在 objCopy 对象中将为 true。
   上面的代码只复制了 mainObj 的可枚举属性。
3. 如果原始对象中的属性之一是对象本身，那么它将在副本和原始对象之间共享，使它们各自的属性指向同一个对象。

## 浅拷贝对象

当源顶层属性在没有任何引用的情况下被复制并且存在一个值为对象并被复制为引用的源属性时，就称该对象为浅拷贝。如果源值是对对象的引用，那么它只会将该引用值复制到目标对象。

浅拷贝将复制顶层属性，但嵌套对象在原始（源）和副本（目标）之间共享.

## 使用 Object.assign()方法

Object.assign()方法用于将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。

```javascript
let obj = {
  a: 1,
  b: 2,
};
let objCopy = Object.assign({}, obj);
console.log(objCopy);
// Result - { a: 1, b: 2 }
```

到目前为止，我们制作了 obj 的副本。现在让我们看看是否存在不可变性：

```javascript
let obj = {
  a: 1,
  b: 2,
};
let objCopy = Object.assign({}, obj);

console.log(objCopy); // result - { a: 1, b: 2 }
objCopy.b = 89;
console.log(objCopy); // result - { a: 1, b: 89 }
console.log(obj); // result - { a: 1, b: 2 }
```

上面的代码将 objCopy 对象中的属性 b 的值更改为 89，当我们在控制台中记录修改后的 objCopy 对象时，更改仅应用于 objCopy。最后一行代码检查 obj 对象是否仍然完整且未曾更改。如果是的话，意味着我们已经成功地创建了源对象的副本，而没有对其进行任何引用。

### Object.assign()的陷阱

虽然我们成功创建了副本，并且一切似乎都运行良好，但还记得我们讨论过浅拷贝吗？看一个例子：
let obj = {
a: 1,
b: {
c: 2,
},
}

```javascript
let newObj = Object.assign({}, obj);
console.log(newObj); // { a: 1, b: { c: 2} }

obj.a = 10;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 1, b: { c: 2} }

newObj.a = 20;
console.log(obj); // { a: 10, b: { c: 2} }
console.log(newObj); // { a: 20, b: { c: 2} }

newObj.b.c = 30;
console.log(obj); // { a: 10, b: { c: 30} }
console.log(newObj); // { a: 20, b: { c: 30} }

// Note: newObj.b.c = 30; Read why..
```

为什么 obj.b.c = 30？
嗯，这是 Object.assign()的一个陷阱。Object.assign 只制作浅拷贝。newObj.b 和 obj.b 两者共享对同一个对象的相同引用，因为没有制作单独的副本，而是复制了对同一个对象的引用。对那个对象的任何属性所做的任何更改都适用于使用该对象的所有引用。
`注意：不能复制原型链上的属性和不可枚举的属性。`

```javascript
let someObj = {
  a: 2,
};

let obj = Object.create(someObj, {
  b: {
    value: 2,
  },
  c: {
    value: 3,
    enumerable: true,
  },
});

let objCopy = Object.assign({}, obj);
console.log(objCopy); // { c: 3 }
```

1. someObj 在 obj 的原型链上，所以它不会被复制。
2. 属性 b 是不可枚举的属性。
3. 属性 c 有一个可枚举的属性描述符，允许其成为可枚举。这就是属性 c 被复制的原因

### 深度拷贝对象

深拷贝将复制它遇到的每个对象。副本和原始对象不会共享任何内容。下面是使用 Object.assign()遇到的问题的解决方法。

### 使用 JSON.parse(JSON.stringify(object));

这解决了我们之前遇到的问题。现在 newObj.b 有一个副本而不是引用！这是一种深度复制对象的方法。请看例子：

```javascript
let obj = {
  a: 1,
  b: {
    c: 2,
  },
};

let newObj = JSON.parse(JSON.stringify(obj));

obj.b.c = 20;
console.log(obj); // { a: 1, b: { c: 20 } }
console.log(newObj); // { a: 1, b: { c: 2 } } (New Object Intact!)
```

陷阱
不幸的是，此方法不能用于复制用户定义的对象方法。

### 复制对象方法

到目前为止的示例中，我们还不能复制对象的方法。现在让我们尝试一下，如何来复制对象的方法。

```javascript
let obj = {
  name: "scotch.io",
  exec: function exec() {
    return true;
  },
};

let method1 = Object.assign({}, obj);
let method2 = JSON.parse(JSON.stringify(obj));

console.log(method1); //Object.assign({}, obj)
/* result
{
  exec: function exec() {
    return true;
  },
  name: "scotch.io"
}
*/

console.log(method2); // JSON.parse(JSON.stringify(obj))
/* result
{
  name: "scotch.io"
}
*/
```

结果表明 Object.assign()可以用来复制对象方法，而 JSON.parse(JSON.stringify(obj))却不能。

### 复制 circular 对象

circular 对象是具有引用自身属性的对象。让我们使用复制对象的方法来复制 circular 对象，看看它是否有效。

### 使用 JSON.parse(JSON.stringify(object))

先试试 JSON.parse(JSON.stringify(object))：

```javascript
// circular object
let obj = {
  a: "a",
  b: {
    c: "c",
    d: "d",
  },
};

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

let newObj = JSON.parse(JSON.stringify(obj));

console.log(newObj);
```

结果：
`JSON.parse(JSON.stringify(obj))`显然不适用于`circular`对象。

### 使用 Object.assign()

再试试 Object.assign()：

```javascript
// circular object
let obj = {
  a: "a",
  b: {
    c: "c",
    d: "d",
  },
};

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

let newObj2 = Object.assign({}, obj);

console.log(newObj2);
```

结果：

`Object.assign()`适用于浅拷贝`circular`对象，但不适用于深拷贝。

### 使用展开运算符(…)

ES6 已经实现了用于数组解构赋值的 rest 元素和用于数组字面量的展开运算符。数组的展开运算符实现如下：

```javascript
const array = [
  "a",
  "c",
  "d",
  {
    four: 4,
  },
];
const newArray = [...array];
console.log(newArray);
// Result
// ["a", "c", "d", { four: 4 }]
```

对象初始值设定项中的扩展属性将自己的可枚举属性从源对象复制到目标对象。如果 ECMAScript 的 Stage 3 提案接受的话，那么复制对象变得非常容易：

```javascript
let obj = {
  one: 1,
  two: 2,
};

let newObj = { ...obj };

// { one: 1, two: 2 }
```
