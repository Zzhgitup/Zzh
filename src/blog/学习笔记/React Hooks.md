---
title: React Hooks
date: 2023-07-19 12:19:00
icon: blog
tag:
  - React
  - React Hooks
category:
  - React
---

### useState()

```tsx
const [state, setState] = useState(initialState);
```

useState 返回两个值，一个是带有初始值的变量，一个是更新这个变量的函数
在第一次渲染的时候，返回的状态 state 与传入的第一个参数值相同。
setState 函数用于更新 state, 当它接收一个新的 state 值的时候，会将组件的一次重新渲染加入队列，
**setState 执行渲染，如果是对象，里面的值必须是一个新对象**

### useEffect();

两个参数，第一个参数是一个回调函数。在组件 DOM 加载完毕之后执行的函数，
`可以rerurn 一个函数，这个函数是组件被重新渲染或者卸载时候执行`

```tsx
const App = () => {
  useEffect(() => {
    //.....执行一些操作
    return () => {
      //这个函数是组件被重新渲染或者卸载时候执行
    };
  });
};
export default App;
```

一个函数式组件中可以存在多个 useEffect，按照顺序依次执行

#### 用法

```tsx
useEffect(() => {
  console.log("修改title");
}, []);
```

useEffect 还有第二个参数，作用是 useEffect 回调函数的执行受到那个状态 state 的影响，如果为空数组【】，
则只在组件载入时执行一次。 组件卸载时执行内部的回调函数
数组中是回调函数依赖的数据，若数据发生变化则在 DOM 渲染完后执行回调函数。

### 特殊场景 Hooks

#### useContext()

首先创建 Context

```tsx
import { createContext } from "react";
const userContext = createContext({
  name: "",
  ID: 0,
});
export { userContext };
```

在根组件外面包裹 userContext

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { userContext } from "./context/index";
import App from "./App";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <userContext.Provider value={{ name: "赵子豪", ID: 20211544112 }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </user
```

在子组件中使用，直接读取外层传入的信息

```tsx
import React, { useContext } from "react";
import { userContext } from "./context";
function App() {
  const user = useContext(userContext);
  return <div className="App">user:{user.name}</div>;
}
export default App;
```

`当组件上层最近的<MyContext.Provider> 更新时 该Hooks 会触发重新渲染，并使用最新传递给<MyContext.Provider>的context 的value值`
举一个例子：

```tsx
import React, { useContext, useState } from "react";
import { StudentContext, userContext } from "./context";
import Student from "./components/Student";
function App() {
  const [age, setage] = useState(0);
  const user = useContext(userContext);
  function addage() {
    setage(age + 1);
  }
  return (
    <StudentContext.Provider value={{ name: "李四", age: age }}>
      <div className="App">user:{user.name}</div>
      <button
        onClick={() => {
          addage();
        }}
      >
        增加年龄
      </button>
      <Student />
    </StudentContext.Provider>
  );
}
export default App;
```

```tsx
import React, { memo, useContext } from "react";
import { FC, ReactNode } from "react";
import { StudentContext } from "../../context";
interface Props {
  children?: ReactNode;
}
const Student: FC<Props> = () => {
  const student = useContext(StudentContext);
  return <div>学生信息是：{student.age}</div>;
};
export default memo(Student);
```

在父组件 App.tsx 中向内通过 Context 传递了一个 Student 信息，并且 age 属性是受 App.tsx 中 addage() 操控的，
当在 App.tsx 中改变 age 的值，子组件也重新渲染，更新 age

#### useReduce() （了解就行，不咋用）

```tsx
import React, { useReducer } from "react";
import { counterRducer } from "./Reducer";
function App() {
  const [state, dispatch] = useReducer(counterRducer, { counter: 100 });
  return (
    <div className="App">
      {state.counter}
      <button onClick={() => dispatch({ type: "add" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
    </div>
  );
}
export default App;
```

```tsx
export function counterRducer(state: any, action: any) {
  switch (action.type) {
    case "add":
      return { ...state, counter: state.counter + 1 };
    case "decrement":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
}
```

useState 的替代品，**useState**保存的数据处理逻辑比较复杂时可以使用 useReducer 来将其进行拆分
或者这次修改的 state 需要依赖之前的 state 时，也可以使用

#### useCallback()

```tsx
import React, { useState } from "react";
function App() {
  const [sum, setnum] = useState(0);
  function addsum() {
    setnum(sum + 1);
  }
  return (
    <div className="App">
      <h1>求和：{sum}</h1>
      <button onClick={addsum}>+1</button>
    </div>
  );
}
export default App;
```

这个组件每次被加载 addsum 都会被定义一次，每次更新 addsum 也会重新定义一次，就造成了内存空间中有许多个 addsum，虽然函数会因为未被使用而被销毁，但是仍会有一下性能问题.

- useCallback 会返回一个函数的 memoized 的值
- 在依赖不变的情况下，多次定义的时候，返回的值时相同的，

```tsx
const addsum = useCallback(function () {
  setnum(sum + 1);
}, []);
```

使用 useCallback 将函数包裹住，第二个参数是依赖项，
当点击按钮 触发 addsum 时，组件重新渲染，sum 变为 1，但是由于依赖项为【】空，useCallback 是由记忆的，addsum 不会发生变化，useCallback 返回的函数还是之前的那个函数，因为闭包的原因，返回的函数内部 sum 还是等于 0，所以在此点击按钮 触发 addsum（） sum 的还是 1， 这就是 被称为 **闭包陷阱**
这就造成 sum 只能加一次；
接下来就是正确 ✔ 写法

```tsx
const addsum = useCallback(
  function () {
    setnum(sum + 1);
  },
  [sum]
);
```

到目前为止，使用 useCallback 似乎并没有什么太大的价值，接下来看下面这段代码

```tsx
import React, { useCallback, useState } from "react";
import Student from "./components/Student/index";
function App() {
  const [sum, setnum] = useState(0);
  const [message, setmessage] = useState("基础信息");
  const addsum = useCallback(
    function () {
      setnum(sum + 1);
    },
    [sum]
  );
  /*   function addsum() {
    setnum(sum + 1);
  } */
  function changetext() {
    setmessage("更改之后的信息");
  }
  return (
    <div className="App">
      <h1>求和：{sum}</h1>
      <h2>{message}</h2>
      <Student addsum={addsum} />
      <button onClick={changetext}>更改信息</button>
      <button onClick={addsum}>+1</button>
    </div>
  );
}
export default App;
```

```tsx
import React, { memo } from "react";
import { FC, ReactNode } from "react";
interface Props {
  children?: ReactNode;
  addsum: Function;
}
const Student: FC<Props> = ({ addsum }) => {
  console.log("子组件被渲染");
  return (
    <div>
      <button
        onClick={() => {
          addsum();
        }}
      >
        加数
      </button>
    </div>
  );
};
export default memo(Student);
```

如果使用

```tsx
function addsum() {
  setnum(sum + 1);
}
```

这个没有被 useCallback,处理的函数，则更新 message 时，会重新定义 addsum（） 函数，
因为子组件 Student 传入了 addsum 函数，子组件会重新渲染，控制台打印"子组件被渲染" ；

若使用经过 useCallback 包裹的 addsum 函数，依赖项是 sum ， 则更新 message 时，由于 useCallback 的记忆功能。不会再重新定义 addsum 函数，子组件不会被重新渲染。
所以就防止了子组件的无效渲染，提高了性能

```tsx
const addsum = useCallback(
  function () {
    setnum(sum + 1);
  },
  [sum]
);
```

使用 useCallback 和不使用 useCallback 定义一个函数是不会带来性能优化的；
使用 useCallback 定义的函数，传递给子组件，防止造成没必要的渲染
`通常使用useCallback 的目的是不希望组组件进行多次渲染，并不是为了函数及进行缓存`
闭包陷阱解决方案：

1. 正确填写依赖
2. 使用 useRef，在组建多次渲染时返回的是同一个值

#### useMemo();

先看一个案例

```tsx
import React, { useState } from "react";
function addsum(n: number) {
  console.log("12312");
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}
function App() {
  const [counter, setCounter] = useState(0);
  function counteradd() {
    return setCounter(counter + 1);
  }
  return (
    <div className="App">
      <h1>1+到5：{addsum(50)}</h1>
      <h2>{counter}</h2>
      <button onClick={counteradd}>+1</button>
    </div>
  );
}
export default App;
```

当点击按钮时，counter 增加，会造成页面重新渲染，addsum（） 会再次执行，这样就造成了一定的性能开销
useMemo 登场：useMemo 有两个参数，第一个参数是一个函数，第二个参数是一个数组，内部填入依赖项，
useMemo 和 useCallback 很相似，useMemo 是对函数返回值做记忆，

```tsx
import React, { useMemo, useState } from "react";
function addsum(n: number) {
  console.log("12312");
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  return sum;
}
function App() {
  const [counter, setCounter] = useState(0);
  const result = useMemo(() => {
    return addsum(50);
  }, []);
  function counteradd() {
    return setCounter(counter + 1);
  }
  return (
    <div className="App">
      <h1>1+到5：{result}</h1>
      <h2>{counter}</h2>
      <button onClick={counteradd}>+1</button>
    </div>
  );
}
export default App;
```

这样写，当 counter 变化时，addsum 不会再次执行，因为，没有发生变化，不再重复执行

```tsx
useCallback(fn,[])  等价于  useMemo(()=> fn,[]);
```

用法：

1. 对于大量进行计算的操作，是否有必要每次渲染都重新计算；
2. 对于组件传递相同内容的对象时，使用 useMemo 进行性能优化

#### useRef()

useRef() 返回一个 ref 对象，返回的 ref 对象在组件的整个生命周期保持不变；
最常用的 ref 时两种用法：
用法一：引入 DOM 元素；

```tsx
import React, { useRef } from "react";
function App() {
  const dom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  function showitem() {
    console.log(dom.current);
    input.current?.focus();
  }
  return (
    <div ref={dom} className="App">
      <input type="text" ref={input} />
      <button onClick={showitem}>展示DOM</button>
    </div>
  );
}
export default App;
```

用法二：保存一个数据，这个对象在整个生命周期中可以保持不变，可以用来解决 useCallback 中无依赖状态下，造成的闭包陷阱问题

#### useImperativeHandle

不是很好理解 ,用于子组件向外暴露 ref，使用 useImperativeHandle 可以指定向外暴露的属性和方法

```tsx
import React, { useRef, ElementRef } from "react";
import MyComponent from "./components/Student";
import type ImyComentprops from "./components/Student";
function App() {
  const myRef = useRef<ElementRef<typeof ImyComentprops>>(null);
  return (
    <div>
      <MyComponent ref={myRef} />
      <button onClick={() => myRef.current?.focus()}>Focus Input</button>
      <button onClick={() => myRef.current!.setValue("我更改值了")}>
        改值
      </button>
    </div>
  );
}

export default App;
```

```tsx
import React, { forwardRef, useRef, useImperativeHandle } from "react";
//props接口定义
interface MyComponentProps {
  label?: string;
  onClick?: () => void;
}
//定义向外暴露的ref接口
export interface ImyComentprops {
  focus: () => void;
  setValue: (str: string) => void;
}
const MyComponent = forwardRef<any, MyComponentProps>((props, ref) => {
  const inputref = useRef<HTMLInputElement>(null);
  //向外父组件暴露 展示的ref属性值
  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputref.current?.focus();
      },
      setValue(str: string) {
        inputref.current!.value = str;
      },
    };
  });
  return (
    <div>
      <input ref={inputref} type="text" />
      <button>Focus Input</button>
    </div>
  );
});

export default MyComponent;
```

此 Hooks 不常用，感觉主要用封装组件库，不让用户随意动里面的东西

#### useLayoutEffect()

- useLayoutEffect（） 会在渲染的内同更新到 DOM 之前执行，**会阻塞 DOM 的更新**；
- useEffect（） 会在渲染的内容更新到 DOM 上之前执行，**不会阻塞 DOM 的更新**

接下来一个例子：判断值是否符合预设值，不合符则更新值；

```tsx
import React, { useState, useEffect, useLayoutEffect } from "react";

function App() {
  const [sum, setsum] = useState(10);
  /*  useEffect(() => { //使用useEffect 去更新值，会出现短暂白屏的效果 
    console.log("useEffect");
    if (sum === 0) {
      setsum(Math.random() * 10);
    }
  }); */
  function changesum() {
    setsum(0);
  }
  useLayoutEffect(() => {
    //使用useLayoutEffect（）  因为是在DOM渲染之前更改的值，不会出现
    //白屏现象
    console.log("useLayoutEffect");
    if (sum === 0) {
      setsum(Math.random() * 10);
    }
  });
  return (
    <div>
      <h1>随机数：{sum}</h1>
      <button onClick={changesum}>改变数字</button>
    </div>
  );
}
export default App;
```

useLayoutEffect（） 官方不建议使用，
![image.png](https://cdn.nlark.com/yuque/0/2023/png/26302696/1689758427564-67dc6d57-a56b-41ef-8e6b-f00dae97a651.png#averageHue=%23fdf7ee&clientId=u5e12156c-1aef-4&from=paste&height=253&id=u12f7b957&originHeight=253&originWidth=937&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18643&status=done&style=none&taskId=ubd2be9c0-1922-4a36-9146-d45b3166660&title=&width=937)
会阻塞 DOM 的更新
