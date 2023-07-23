---
title: 原型链prototype和__proto__
date: 2022-03-19 15:10:32
icon: blog
tag:
  - javascript
category:
  - 记录
---

<!--more-->

所有的 JavaScript 对象都会从一个 prototype（原型对象）中继承属性和方法。

显示原型和隐式原型；构造函数的显示原型用来存放函数对象，而实例对象的隐式原型等同于构函数的显示原型。所有对象的原型最终都指向 object 对象，object 是原型链的顶端；

![](https://img-blog.csdnimg.cn/e4eb068bd2ff4832b6263231b504ec99.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5rqQ5YiD,size_20,color_FFFFFF,t_70,g_se,x_16)

JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

function 的构造函数也是 function，隐式原型指向 function 的原型对象；

而 function 的隐式原型指向 object 对象的显示原型，object 没有隐式原型。object 就是最顶层的对象；

当试图得到一个对象的属性时，如果这个对象本身不存在这个属性，那么就会去它的’\_ \_ proto\_ \_'属性\(也就是它的构造函数的’prototype’属性\)中去寻找，如果他的构造函数的 prototype 中没有这个属性就会去 object 中去寻找。再找不到就没有了；

首先，fn 的构造函数是 Foo\(\)。所以：  
fn.\_ \_ proto \_ \_=== Foo.prototype  
又因为 Foo.prototype 是一个普通的对象，它的构造函数是 Object，所以：  
Foo.prototype.\_ \_ proto \_ \_=== Object.prototype  
通过上面的代码，我们知道这个 toString\(\)方法是在 Object.prototype 里面的，当调用这个对象的本身并不存在的方法时，它会一层一层地往上去找，一直到 null 为止。

![](https://img-blog.csdnimg.cn/cd57f2c5e51949c49e12a3fc957a9ec1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5rqQ5YiD,size_20,color_FFFFFF,t_70,g_se,x_16)

暂时的理解，后续会改
