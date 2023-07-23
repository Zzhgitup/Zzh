---
title: JS对象创建模式
date: 2022-03-27 08:31:40
icon: blog
tag:
  - javascript
category:
  - 记录
---

<!--more-->

对象创建模式有以下几种：

**1.工厂模式**

**2.构造函数模式**

**3.原型模式**

**4.组合使用构造函数模式和原型模式**

**5.动态原型模式**

**6.寄生构造函数模式**

**7.稳妥构造函数模式**

1.**工厂模式** 一种函数用函数来封装以特定接口创建对象的细节

```javascript
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    alert(this.name);
  };
  return o;
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");
```

函数 createPerson\(\)能够根据接受的参数来构建一个包含所有必要信息的 Person 对象。可以无数次地调用这个函数，而每次它都会返回一个包含三个属性一个方法的对象。工厂模式虽然解决了创建 多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。随着 JavaScript 的发展，又一个新模式出现了。

2.**构造函数模式**

构造函数可以用来创建特定类型的对象，像 object 和 Array 这样的原生构造函数，可以自定义构造函数，从而定义对象的类型的属性和方法；还是上面的例子用构造函数重写如下。

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    alert(this.name);
  };
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```

这样对象的类型就能够知道对象的类型

```javascript
alert(person1.constructor == Person); //true
alert(person2.constructor == Person); //true
```

对象的 constructor 属性最初是用来标识对象类型的。但是，提到检测对象类型，还是 instanceof 操作符要更可靠一些。我们在这个例子中创建的所有对象既是 Object 的实例，同时也是 Person 的实例，这一点通过 instanceof 操作符可以得到验证。

```javascript
alert(person1 instanceof Object); //true
alert(person1 instanceof Person); //true
alert(person2 instanceof Object); //true
alert(person2 instanceof Person); //true
```

创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型；而这正是构造函数模式 胜过工厂模式的地方

3.**原型模式**

我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象， 而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解，那 么 prototype 就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以 让所有对象实例共享它所包含的属性和方法。换句话说，不必在构造函数中定义对象实例的信息，而是 可以将这些信息直接添加到原型对象中，如下面的例子所示。

```javascript
function Person() {}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
  alert(this.name);
};
var person1 = new Person();
person1.sayName(); //"Nicholas"
var person2 = new Person();
person2.sayName(); //"Nicholas"
alert(person1.sayName == person2.sayName); //true
```

原型的内容在上一篇博客种已经说过；

4.**组合使用构造函数模式和原型模式**

创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实 例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本， 但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参 数；可谓是集两种模式之长。下面的代码重写了前面的例子。

```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Shelby", "Court"];
}
Person.prototype = {
  constructor: Person,
  sayName: function () {
    alert(this.name);
  },
};
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"
alert(person1.friends === person2.friends); //false
alert(person1.sayName === person2.sayName); //true
```

在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 constructor 和方 法 sayName\(\)则是在原型中定义的。而修改了 person1.friends（向其中添加一个新字符串），并不 会影响到 person2.friends，因为它们分别引用了不同的数组

5.**动态原型模式**

可以通过 检查某个应该存在的方法是否有效，来决定是否需要初始化原型。

```javascript
function Person(name, age, job) {
  //属性
  this.name = name;
  this.age = age;
  this.job = job;
  //方法
  if (typeof this.sayName != "function") {
    Person.prototype.sayName = function () {
      alert(this.name);
    };
  }
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```

**使用动态原型模式时，不能使用对象字面量重写原型，如果 在已经创建了实例的情况下重写原型，那么就会切断现有实例与新原型之间的联系。**

6.**寄生构造函数模式**

这个模式可以在特殊的情况下用来为对象创建构造函数。假设我们想创建一个具有额外方法的特殊 数组。由于不能直接修改 Array 构造函数，因此可以使用这个模式。

```javascript
function SpecialArray() {
  //创建数组
  var values = new Array();
  //添加值
  values.push.apply(values, arguments);
  //添加方法
  values.toPipedString = function () {
    return this.join("|");
  };

  //返回数组
  return values;
}
var colors = new SpecialArray("red", "blue", "green");
alert(colors.toPipedString()); //"red|blue|green"
```

关于寄生构造函数模式，有一点需要说明：首先，返回的对象与构造函数或者与构造函数的原型属 性之间没有关系；也就是说，构造函数返回的对象与在构造函数外部创建的对象没有什么不同。为此， 不能依赖 instanceof 操作符来确定对象类型。由于存在上述问题，我们建议在可以使用其他模式的情 况下，不要使用这种模式。

6.**稳妥构造函数模式**

道格拉斯·克罗克福德（Douglas Crockford）发明了 JavaScript 中的稳妥对象（durable objects）这 个概念。所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。稳妥对象最适合在 一些安全的环境中（这些环境中会禁止使用 this 和 new），或者在防止数据被其他应用程序（如 Mashup 程序）改动时使用。稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的 实例方法不引用 this；二是不使用 new 操作符调用构造函数。按照稳妥构造函数的要求，可以将前面 的 Person 构造函数重写如下。

```javascript
function Person(name, age, job) {
  //创建要返回的对象
  var o = new Object();
  //可以在这里定义私有变量和函数
  //添加方法
  o.sayName = function () {
    alert(name);
  };

  //返回对象
  return o;
}
```

与寄生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间也 没有什么关系，因此 instanceof 操作符对这种对象也没有意义。

> 《Javascript 高级程序设计》
