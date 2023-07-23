---
title: electron入门
date: 2023-05-21 08:25:54
icon: blog
tag:
  - electron
category:
  - 记录
---

#1. 简介

- [官网](https://www.electronjs.org/)
- Electron 是由 GitHub 众多开发者开发的一个开源项目，能够使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序

# 2. 五分钟快速上手

## 2.1 安装 electron

初始化 package.json 文件

- npm init

安装 electron

- cnpm I electron –S

## 2.2 配置为入口文件

```js
{
  "name": "electron-demo",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "electron ."
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "electron": "^8.3.0"
  }
}
```

## 2.3 创建 main.js 文件

```js
const electron = require("electron");
// 控制应用程序的事件生命周期。
const app = electron.app;
// 当 Electron 完成初始化时，触发一次
app.on("ready", () => {
  new electron.BrowserWindow({
    width: 800,
    height: 300,
  });
});
```

## 2.4 创建窗口

```js
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
  });

  mainWindow.loadFile("./index.html");
});
```

# 3. 自动刷新页面

- 安装插件

  ```js
  cnpm install --save-dev electron-reloader
  ```

- 在入口引入插件

  ```js
  const reloader = require("electron-reloader");
  reloader(module);
  ```

# 4. 主进程和渲染进程

Electron 运行 `package.json` 的 `main` 脚本的进程被称为**主进程**。 在主进程中运行的脚本通过创建 web 页面来展示用户界面。 一个 Electron 应用总是有且只有一个主进程。

由于 Electron 使用了 Chromium 来展示 web 页面，所以 Chromium 的多进程架构也被使用到。 每个 Electron 中的 web 页面运行在它的叫**渲染进程**的进程中。

在普通的浏览器中，web 页面无法访问操作系统的原生资源。 然而 Electron 的用户在 Node.js 的 API 支持下可以在页面中和操作系统进行一些底层交互。

ctrl+shift+i 打开渲染进程调试

默认打开调试

```js
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
  });

  mainWindow.loadFile("./index.html");

  const mainWindow2 = new BrowserWindow({
    width: 800,
    height: 500,
  });

  mainWindow.webContents.openDevTools();

  mainWindow2.loadFile("./index2.html");
});
```

# 5. 自定义原生菜单

## 5.1 自定义菜单

详细文档：https://www.electronjs.org/docs/api/menu

```js
const electron = require("electron");

const { app, Menu } = electron;
const template = [
  {
    label: "文件",
    submenu: [
      {
        label: "新建窗口",
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "新建窗口",
      },
    ],
  },
];
const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
```

## 5.2 给菜单定义点击事件

1、点击打开新窗口

```js
submenu: [
  {
    label: "新建窗口",
    click: () => {
      const newMainWindow = new BrowserWindow({
        width: 300,
        height: 300,
      });
      newMainWindow.loadFile("./new.html");
    },
  },
];
```

2、点击打开浏览器

`shell` 模块提供了集成其他桌面客户端的关联功能.

```js
const { BrowserWindow, Menu, shell } = require("electron");
const template = [
  {
    label: "文件",
    submenu: [
      {
        label: "文件1",
        click() {
          // 点击打开新窗口
          const mainWindow2 = new BrowserWindow({
            width: 600,
            height: 600,
          });

          mainWindow2.loadFile("./index.html");
        },
      },
    ],
  },
  {
    label: "csdn",
    click() {
      // 点击打开浏览器
      shell.openExternal("https://www.csdn.net/");
    },
  },
];
```

## 5.3 抽离菜单定义

```js
const { BrowserWindow, Menu } = require("electron");
const template = [
  {
    label: "文件",
    submenu: [
      {
        label: "新建窗口",
        click: () => {
          const newMainWindow = new BrowserWindow({
            width: 300,
            height: 300,
          });
          newMainWindow.loadFile("./new.html");
        },
      },
    ],
  },
  {
    label: "编辑",
    submenu: [
      {
        label: "新建窗口",
      },
    ],
  },
];
const menu = Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
```

```js
require("./menu");
```

#### 打开调式

mainWindow.webContents.openDevTools()

## 5.4 自定义顶部菜单

- 通过 frame 创建无边框窗口

  ```js
  const mainWindow = new electron.BrowserWindow({
    frame: false,
  });
  ```

- 自定义窗口

  ```html
  <div class="custom-menu">
    <ul>
      <li>新建窗口</li>
      <li>关于我们</li>
    </ul>
  </div>
  ```

  ```css
  * {
    margin: 0;
    padding: 0;
  }
  .custom-menu {
    height: 50px;
    width: 100%;
    background: pink;
  }

  .custom-menu ul {
    list-style: none;
  }

  .custom-menu ul li {
    float: left;
    width: 50px;
    line-height: 50px;
    text-align: center;
    margin-left: 10px;
  }
  ```

  添加-webkit-app-region: drag;实现拖拽

## 5.5 点击创建新窗口

```js
// html
<li class="new-window">新建窗口</li>;

// js
// remote 通过remote使用主进程的方法
const {
  remote: { BrowserWindow },
} = require("electron");
const newWindow = document.querySelector(".new-window");
newWindow.onclick = function () {
  new BrowserWindow({
    width: 200,
    height: 300,
  });
};
```

能够在 html 中使用 node 方法

```js
const mainWindow = new BrowserWindow({
  width: 800,
  height: 500,
  webPreferences: {
    // 开启node模块
    nodeIntegration: true,
    // 开启remote模块
    enableRemoteModule: true,
  },
});
```

## 5.6 点页面打开浏览器

- html

  ```html
  <a id="a1" href="https://www.itheima.com">打开浏览器</a>
  ```

- js

  ```js
  const { shell } = require("electron");
  const allA = document.querySelectorAll("a");

  allA.forEach((item) => {
    item.onclick = function (e) {
      e.preventDefault();
      console.log(item);
      shell.openExternal(item.href);
    };
  });
  ```

# 6. 打开对话框读取文件

## 6.1 读取文件

- 定义点击事件

  ```js
  <button onclick="openFile()">打开</button>
  ```

- 定义事件函数

  打开对话框文档：https://www.electronjs.org/docs/api/dialog

  ```js
  // 打开对话框
  function openFile() {
    const res = dialog.showOpenDialogSync({
      title: "选择文件",
      buttonLabel: "哈哈",
      filters: [{ name: "Custom File Type", extensions: ["js"] }],
    });

    const fileContent = fs.readFileSync(res[0]);
    dropEl.innerText = fileContent;
  }
  ```

## 6.2 保存文件

- 定义点击事件

  ```html
  <button onclick="saveFile()">保存</button>
  ```

- 事件函数

  ```js
  // 保存对话框
  function saveFile() {
    const res = remote.dialog.showSaveDialogSync({
      title: "保存文件",
      buttonLabel: "保存文件",
      filters: [{ name: "index", extensions: ["js"] }],
    });
    fs.writeFileSync(res, dropEl.value);
  }
  ```

# 7. 定义快捷键

## 7.1 主线程定义

- 引入

  ```js
  const { app, BrowserWindow, globalShortcut } = require("electron");
  ```

- 在 ready 中注册快捷键

  ```js
  const ret = globalShortcut.register("CommandOrControl+X", () => {
    console.log("CommandOrControl+X is pressed + 打印结果在命令行");
  });
  ```

- 定义快捷键最大、最小、关闭窗口

  ```js
  globalShortcut.register("CommandOrControl+T", () => {
    mainWindow.unmaximize();
  });
  globalShortcut.register("CommandOrControl+H", () => {
    mainWindow.close();
  });
  globalShortcut.register("CommandOrControl+M", () => {
    mainWindow.maximize();
  });
  ```

## 7.2 渲染进程定义

- 通过 remote 注册

  ```js
  // 定义快捷键
  remote.globalShortcut.register("Ctrl+O", () => {
    console.log("ctrl+o");
  });
  ```

# 8. 渲染进程和主线程通讯

- 定义按钮

  ```html
  <div class="maxWindow no-drag" onclick="maxWindow()"></div>
  ```

- 事件函数

  ```js
  function maxWindow() {
    ipcRenderer.send("max-window");
  }
  ```

- 主线程定义事件

  ```js
  ipcMain.on("max-window", () => {
    mainWindow.maximize();
  });
  ```

- 传参

  ```js
  let windowSize = "unmax-window";
  function maxWindow() {
    windowSize = windowSize === "max-window" ? "unmax-window" : "max-window";
    ipcRenderer.send("max-window", windowSize);
  }
  ```

- 接收参数

  ```js
  ipcMain.on("max-window", (event, arg) => {
    console.log(arg);
    if (arg === "unmax-window") return mainWindow.maximize();
    mainWindow.unmaximize();
  });
  ```

# 09. electron 打包

- 安装 electron-packager

  ```js
  cnpm i electron-packager -D
  ```

- 添加打包任务

  ```js
  "build": "electron-packager ./ HelloWorld --platform=win32 --arch=x64 --out ./outApp --overwrite --icon=./favicon.ico"
  ```

# 10 .electron 结合框架开发

- 利用 vue 脚手架初始化项目

- 在项目中安装 electron

  cnpm i electron

- 添加 electron 启动配置

  ```js
  "main": "main.js",
  "scripts": {
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
     "eject": "react-scripts eject",
     "electron": "electron ."
    },
  ```

- 配置 main.js

  ```js
  const { app, BrowserWindow } = require("electron");

  function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
    });
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  }

  app.on("ready", () => {
    createWindow();
  });
  ```

- 加载 vue 项目

  ```js
  mainWindow.loadURL("http://localhost:3000/");
  ```

#
