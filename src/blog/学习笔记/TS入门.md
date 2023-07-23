---
title: Ts配置文件and泛型
date: 2023-05-06 08:25:54
icon: blog
tag:
  - Ts
category:
  - 记录
---

### tsconfig.json 配置

```json
{
  /* 编译路径
   **表示文件夹下的所有文件夹，
   *表示文件夹下的所有文件
   */
  "include": ["./src/**/*"],
  /* 排除路径 不参加编译的文件路径
    	默认值[”node_modules“,"bower_components","jspm_packages"]
    */
  "exclude": ["./hellow/**/*"]
}
```

#### compilerOptions 配置选项

```json
/*
	compilerOptions编译器选项
*/
"compilerOptions":{
		//target 用来指定TS被编译的ES的版本
		//'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'.
		"target": "ES2015",
		//module
		//'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext'.
		"module": "ES2015",
		//lib用来指定使用的库
		//option must be:
		//'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019',
		//'es2020', 'es2021', 'es2022', 'es2023', 'esnext', 'dom', 'dom.iterable',
		//'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost',
		//'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable',
		//'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol',
		//'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object',
		//'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays',
		// 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2019.intl', 'es2020.bigint', 'es2020.date', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2020.number', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'es2021.intl', 'es2022.array', 'es2022.error', 'es2022.intl',
		//'es2022.object', 'es2022.sharedmemory', 'es2022.string', 'es2022.regexp',
		// 'es2023.array', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable',
		// 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref',
		// 'decorators', 'decorators.legacy'.
		/* "lib": ["12"] */
		//outDir 用来指定编译后文件所在目录
		"outDir": "./dist",
		//outFile 将代码合并为一个文件
		//设置outfile后，所有的全局代码合并到一个文件中
		//但是只支持system,amd
		/* "outFile": "./dist/app.js" */
		//allowJs 是否对JS文件进行编译
		"allowJs": false,
		//checkJs  是否检查JS代码符合语法规范
		"checkJs": false,
		//removeComments 是否移除注释
		"removeComments": false,
		// 不生成编译后产生的JS文件
		"noEmit": false,
		//noEmitOnError 当有错误时不生成编译后文件
		"noEmitOnError": false,
		//alwaysStrict 用来设置编译后的文件是否使用严格模式
		"alwaysStrict": false,
		//noImplicitAny 不允许隐式的any类型
		"noImplicitAny": false,
		//noImplicitThis 不允许指向不明的this
		"noImplicitThis": true,
		// strictNullChecks严格检查空值
		"strictNullChecks": false,
		//strict 严格检查的总开关
		"strict": false
	}
```

## 泛型（Generic）

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定）；

此时泛型便能够发挥作用；

举个例子：

```typescript
function test(arg: any): any {
  return arg;
}
```

上例中，test 函数有一个参数类型不确定，但是能确定的时其返回值的类型和参数的类型是相同的；

由于类型不确定所以参数和返回值均使用了 any，但是很明显这样做是不合适的：

首先使用 any 会关闭 TS 的类型检查，其次这样设置也不能体现出参数和返回值是相同的类型；

### 泛型函数

#### 创建泛型函数

```typescript
function test<T>(arg: T): T {
  return arg;
}
```

这里的`<T>`就是泛型；

T 是我们给这个类型起的名字（不一定非叫 T），设置泛型后即可在函数中使用 T 来表示该类型；

所以泛型其实很好理解，就表示某个类型；

那么如何使用上边的函数呢？

#### 使用泛型函数

##### 方式一（直接使用）：

```typescript
test(10);
```

使用时可以直接传递参数使用，类型会由 TS 自动推断出来，但有时编译器无法自动推断时还需要使用下面的方式

##### 方式二（指定类型）：

```typescript
test<number>(10);
```

也可以在函数后手动指定泛型；

#### 函数中声明多个泛型

可以同时指定多个泛型，泛型间使用逗号隔开：

```typescript
function test<T, K>(a: T, b: K): K {
  return b;
}

test<number, string>(10, "hello");
```

使用泛型时，完全可以将泛型当成是一个普通的类去使用；

### 泛型类

类中同样可以使用泛型：

```typescript
class MyClass<T> {
  prop: T;

  constructor(prop: T) {
    this.prop = prop;
  }
}
```

### 泛型继承

除此之外，也可以对泛型的范围进行约束

```typescript
interface MyInter {
  length: number;
}

function test<T extends MyInter>(arg: T): number {
  return arg.length;
}
```

使用 T extends MyInter 表示泛型 T 必须是 MyInter 的子类，不一定非要使用接口类和抽象类同样适用；
