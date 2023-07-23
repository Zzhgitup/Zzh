---
title: JS通过文件URL路径下载文件
date: 2022-07-24 16:39:55
icon: blog
tag:
  - javascript
category:
  - 记录
---

<!--more-->

```java
const exportFile = (data, fileName, _this)=>{
　// 地址不存在时，禁止操作
  if(!data)return;
  // 下载文件并保存到本地
  const callback = (data)=>{
　　 // 创建a标签，使用 html5 download 属性下载，
    const link = document.createElement('a');
　　 // 创建url对象
    const objectUrl = window.URL.createObjectURL(new Blob([data]));
    link.style.display='none';
    link.href=objectUrl;
　　 // 自定义文件名称， fileName
　　 link.download = fileName;
　　 document.body.appendChild(link);
　　 link.click();
　　 // 适当释放url
    window.URL.revokeObjectURL(objectUrl);
  };
  // 把接口返回的url地址转换为 blob
  const xhr = new XMLHttpRequest();
  xhr.open('get', data, true);
  xhr.responseType = 'blob';
  xhr.onload = ()=> {
　　 // 返回文件流，进行下载处理
    callback(xhr.response);
  };
  xhr.send(); // 不要忘记发送
};

// ie和浏览器兼容模式会有问题，可以用下面代码调试。
　try{
    exportFile(); // 调用方式
  }catch(err){
    // 兼容模式下，IE
    const exportBlob = new Blob([data]);
    if (navigator.userAgent.indexOf('Trident') > -1) {
      window.navigator.msSaveBlob(data, fileName);
    } else {
      exportFile(); // 调用方式
    }
  };
```

调用方式

```javascript
exportFile(
  "https://reading.oss.iyougu.com/uploads/mp/opus/1c5a8b6a391742cf93595d0a506b2d43.mp3",
  "测试.mp3"
);
```
