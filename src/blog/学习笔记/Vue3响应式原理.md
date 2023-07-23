---
title: Vue3-reactive 浅谈
date: 2023-02-25 17:40:00
icon: blog
tag:
  - Vue
category:
  - Vue
---

### Vue2 和 Vue3 响应式的区别

Vue2 的响应式，利用了 ES5 的一个 API，object.defineProperty,它的基本用法是这样的

```javascript
const obj = { name: "kw" };
Object.defineProperty(obj, key, {
  get() {
    return obj[key];
  },
  set(val) {
    obj[key] = val;
  },
});
```

这样，就能拦截到对象属性的基本操作，比如访问属性和给属性设置新值。当拦截到访问属性时，可以做依赖收集；当监听到属性更改时，可以做派发更新，从而实现响应式。

它存在几个缺点：

1. 重写了对象的属性，性能较差；

2. 只能拦截到对象属性的操作，不能处理数组。所以 Vue2 需要单独对数组数据进行处理。

3. 对于属性的新增和删除，无法拦截到。所以额外提供了 $set 和 $delete 方法，整体不和谐。

`Vue3` 采用了 ES6 的 API `Proxy` 来实现响应式。由于该 API 不兼容 IE 浏览器，所以在使用 Vue3 开发时要考虑项目是否需要兼容 IE 系列。

### Proxy 和 Reflect

先来看看 Proxy 的基本用法

```javascript
const proxy = new Proxy(target, handler);
```

`target`：用 `Proxy` 包装的被代理对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

`handler`：是一个对象，其声明了代理 target 的一些操作，其属性是当执行一个操作时定义代理的行为的函数。

简单示例

```javascript
const target = {
  name: "未来软件工作室",
  age: 18
};

const handler = {
  get(target, key, receiver) {
    return target[key]
  },
  set(target, key, value, receiver) {
      target[key] = value
  }
};
​
const proxy = new Proxy(target, handler);
​
console.log(proxy.name); // "未来软件工作室"
proxy.name = '未来大神'  
console.log(proxy.name); // "未来大神"
```

可以看到，`Proxy` 的使用其实和 `Object.defineProperty`是差不多的，也是能拦截到对象属性的一些操作。但它的特点是：

1. 不仅可以代理普通的对象，还可以代理数组，函数

2. 不仅能拦截到 `get` 和 `set` 操作，还支持 `apply、delete` 等一共 13 种操作

3. 不需要重写 `target`，性能更高

再来看一下 `Reflect` 对象
`Proxy` 和 `Reflect` 是一对好兄弟，形影不离。

按照 MDN 文档的说明：

```
Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与proxy handlers的方法相同。

Reflect不是一个函数对象，因此它是不可构造的。
```

也就是说，我们在使用 `Proxy` 时传入的 `handler` 参数，它所有的属性，在 Reflect 中都有一一对应的。比如上面我们说了 `Proxy` 对象的 handler 可以支持 `get` ，`get` ，`apply`，`delete` 操作，那么 `Reflect` 对象就提供了对应的静态方法：

```javascript
const person = {
  name: '未来软件工作室',
  age: 18,
  sayHello: function() {
    console.log(`Hello! 我是${this.name}`);
  }
}
​
// 返回 name 属性的值
Reflect.get(person, 'name'); // '未来软件工作室'
​
// 执行 sayHello 方法
// param1：要执行的函数
// param2：指定 this
// param3：函数执行需要的参数
Reflect.apply(person.sayHello, person, []); // Hello! 我是未来软件工作室
​
// 更新 age 属性。属性设置成功，返回 true
Reflect.set(person, 'age', 20); // true
Reflect.get(person, 'age'); // 20
```

初看起来，Reflect 的使用很繁琐，远不如传统的点语法来的方便简洁。确实如此，但是在这些 API 的设计上，它和 Proxy 拥有一致的属性和方法，所以搭配起来更加合适。再者，有些场景下，比如需要用到 receiver 参数时，此时就只有 Reflect 能堪大任了。

### reactive 的基本使用

```javascript
import { reactive } from 'vue'
const obj = {name: 'kw', age: 18, skill: ['JS', 'Vue']}
// 返回对象的响应式代理对象，并且是深层次的代理，所有嵌套的属性包括数组，都能被代理到
const state = reactive(obj)
​
// 修改响应式对象，组件可以自动更新
state.name = 'zk'
state.age = 20
state.skill.push('Node')
```

使用 `reactive` 时需要注意的地方：

1. 只能实现对象数据的响应式
2. 同一个对象，只会被代理一次
3. 被代理过的对象，不会被再次代理
4. 支持嵌套属性的响应式

### 实现 reactive

这是 Vue3 中一个最基础的响应式 API，它内部采用了 Proxy 来实现对象属性的拦截操作。

如下：

```javascript
// reactivity/src/reactive.ts
// reactivity/src/reactive.ts

import { isObject } from '@my-vue/shared'

export function reactive (target) {
  
  // 只能代理对象
  if(!isObject(target)) {
    return target
  }
  
  const handler = {
    // 监听属性访问操作
    get(target, key, receiver) {
      console.log(`${key}属性被访问，依赖收集`)
      return Reflect.get(target, key)
    },
    
    // 监听设置属性操作
    set(target, key, value, receiver) {
      console.log(`${key}属性变化了，派发更新`)
    
      // 当属性的新值和旧值不同时，再进行设置
      if(target[key] !== value) {
         const result = Reflect.set(target, key, value, receiver);;
         return result
      }
    }
  }
  
  // 实例化代理对象
  const proxy = new Proxy(target, handler)
​
  return proxy
}
```

### 无需多次代理

前面我们提到，如果一个对象被代理过了，就无需再被代理。实现的思路就是利用缓存，将代理过的对象进行缓存，每当调用 reactive 方法时，先判断缓存中是否存在 target ；每次 target 被代理后，都将 target 和 proxy 放到缓存中： 利用 weakmap

```javascript
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
if (!isObject(target)) {
  return target; //如果不是一个对象就直接返回出去
}
//优化问题 如果已经代理过，则直接返回出去
const proxymap = isReader ? reactiveMap : readonlyMap;
const proxyes = proxymap.get(target);
if (proxyes) {
  return target;
}
//核心如果是第一次添加 则添加代理，并且把target存进weakmap中,进行标记
const proxy = new Proxy(target, baseHeader);
proxymap.set(target, proxy);
return proxy;
```

### 嵌套代理

Vue3 实现响应式采用的原则是懒代理，并不像 Vue2 那样在初始化时，就递归所有的属性进行属性重写。
只有在访问到某个属性，且该属性是对象类型时，才会再进行一层响应式包装：
到此，我们实现的 reactive 方法，就能监听到对象属性的访问和设置操作，从而在此时机做一些处理，从而实现响应式系统。同时也做了一些优化处理。
