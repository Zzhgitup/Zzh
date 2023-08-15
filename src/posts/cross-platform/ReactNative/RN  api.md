---
title: "React Native的API"
description: "API"
date: 2023-8-10
order: 3
category:
  - 前端跨平台
tag:
  - 前端
  - React Native
---

## 日志

### alert :简单的弹窗提示

```tsx
<Button
  title="弹窗"
  onPress={() => {
    alert("原生弹窗提示");
  }}
></Button>
```

### Alert.alert() RN 的对话框工具

```tsx
const Alertest: FC<Props> = () => {
  const buttons = [
    {
      text: "取消",
      onPress: () => {
        console.log("取消");
      },
    },
    {
      text: "确认",
      onPress: () => {
        console.log("确认");
      },
    },
  ];
  return (
    <View style={styles.container}>
      <Button
        title="弹窗"
        onPress={() => {
          Alert.alert("RN弹窗", "这是一条信息", buttons);
        }}
      ></Button>
    </View>
  );
};
```

### console

```tsx
<View style={styles.container}>
  <Button
    title="弹窗"
    onPress={() => {
      /* Alert.alert('RN弹窗', '这是一条信息', buttons); */
      console.info("信息日志输出");
      console.debug("调试日志");
      console.warn("警告日志输出");
      console.error("错误日志输出");
    }}
  ></Button>
</View>
```

### console 添加样式

![image.png](https://cdn.nlark.com/yuque/0/2023/png/26302696/1691378555640-17aed950-a325-4e21-8f9d-73bc241f5ae1.png#averageHue=%23fdf7f7&clientId=u4653320b-1b65-4&from=paste&height=319&id=q9lvv&originHeight=319&originWidth=460&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19048&status=done&style=none&taskId=u95e2ff3e-fd2b-478d-b5fb-86e36e6b385&title=&width=460)

### 输出组件树

```tsx
const viewtree = (
  <View>
    <Text>文字显示</Text>
  </View>
);
return (
  <View style={styles.container}>
    <Button
      title="弹窗"
      onPress={() => {
        /* Alert.alert('RN弹窗', '这是一条信息', buttons); */
        console.log(viewtree);
      }}
    ></Button>
  </View>
);
```

### 打印表格

```tsx
console.table([
  { name: "赵四", age: 12 },
  { name: "赵四", age: 12 },
  { name: "赵四", age: 12 },
]);
```

### 分组日志

```tsx
console.group();
console.log("第一行");
console.log("第二行");
console.log("第三行");
console.group("第二组");
console.log("第一行");
console.log("第二行");
console.log("第三行");
console.groupEnd();
console.groupEnd();
```

###

### 获取平台属性 platform

1. Platform.OS 平台信息
2. Platform.Version 相关信息
3. Platform.constants

### 判断

1. Platform.isTV 是否是电视
2. Platform.isPad 判断是否是平板，但是这个是 IOS 的方法
3. Platform.select 选择不同平台赋予不同属性

用法：

```tsx
const style = Platform.select({
  android: {
    marginTop: 20,
  },
  ios: {
    marginTop: 0,
  },
  default: {
    marginTop: 0,
  },
});
```

### StyleSheet 样式表

```typescript
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
```

有必要的话，对 StyleSheet 进行分块。

对 StyleSheet 有好多种操作方法

1. StyleSheet.compose();

```typescript
const s1 = {
  fontSize: 18,
  color: "red",
};
const s2 = {
  fontSize: 20,
  color: "blue",
};
const flattenStyle = StyleSheet.compose(s1, s2);
console.log(flattenStyle);
// [{"color": "red", "fontSize": 18}, {"color": "blue", "fontSize": 20}]
```

2. StyleSheet.flatten(s) 平铺

会对样式进行合并，后面的会替换前面的代码

```typescript
const s1 = {
  fontSize: 18,
  color: "red",
};
const s2 = {
  fontSize: 20,
  color: "blue",
};
const flattenStyle = StyleSheet.flatten([s1, s2]);
console.log(flattenStyle);
// {"color": "blue", "fontSize": 20}
```

3. StyleSheet.absoluteFill()

铺满全屏的属性

```tsx
text: {
  backgroundColor: 'rgb(200,0,0)',
    ...(StyleSheet.absoluteFill as {}),
    },
```

4. StyleSheet.harLineWidth()

一个像素的宽度的

```tsx
console.log(StyleSheet.hairlineWidth);
```

### Linking：一个 api 节省节省 50 行代码

1. 打开一个网址

```tsx
Linking.openURL("https://www.zhaozihao.love/");
```

2. 检测网址是否能用

```tsx
Linking.canOpenURL("https://www.zhaozihao.love/");
```

3. 打开地图

输入经纬度

```tsx
Linking.openURL("geo:37.2122,12.222");
```

4. 拨打电话

```tsx
Linking.openURL("tel:10086");
```

5. 发送邮件

```tsx
Linking.openURL("mailto:1090649095@qq.com");
```

6. 跳到应用设置页面

```tsx
Linking.openSettings();
```

7. 隐士跳转到其他应用,第一个参数为 包名，第二个参数是，携带的信息

这是安卓用的

```tsx
Linking.sendIntent();
```

8. 获取原始 URL

获取是从那个软件跳转过来的

```tsx
Linking.getInitialURL();
```

### PixeIRatio：像素比例工具

1. 获取屏幕像素密度：PixelRatio.get();
2. 获取字体缩放比例（仅安卓）：PiexIRatio.getFontScale();
3. 救命稻草 PixelRatio.roundToNearestPixel 获取就近值

当一个元素的高度是小数时，在布局的时候小数部分会被四舍五入。当多个这样的元素依次排列，就可能会出现，中间空一个缝隙的 BUG，使用 PixelRatio.roundToNearestPixel 可以让这个高度取得最符合标准的高度，避免了这个现象的出现

### BackHandler 安卓返回键

拦截就返回 true

```tsx
useEffect(() => {
  BackHandler.addEventListener("hardwareBackPress", handlerpress);
  return () => {
    BackHandler.removeEventListener("hardwareBackPress", handlerpress);
  };
}, []);
const handlerpress = () => {
  return true;
};
```

或者用@react-native-community/hooks 社区库
一行代码直接实现上述效果，其内部封装了一样的逻辑

```tsx
useBackHandler(() => {
  return false;
});
```

2. BackHandler.exitApp() 直接退出应用

### 权限 API

1. PermissionsAndroid.check 检查权限 返回结果是布尔值，false 代表无权限

```tsx
const needpremiss = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
const res = await PermissionsAndroid.check(needpremiss);
```

2. PermissionsAndroid.request(needpremiss) 请求权限，

```tsx
PermissionsAndroid.request(needpremiss).then((res) => {
  console.log(res);
});
```

返回值 granted :申请成功 denied：拒绝 never_ask_again：已有权限

```tsx
const needpremiss = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
const res = await PermissionsAndroid.check(needpremiss);
if (!res) {
  const res1 = await PermissionsAndroid.request(needpremiss);
  if (res1 == "granted") {
    console.log("权限申请成功");
  } else if (res1 == "denied") {
    console.log("申请失败");
  } else {
    console.log("有过权限");
  }
}
```

3. PermissionsAndroid.requestMultiple() 多组权限申请

```tsx
const needpremiss = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
const needpremiss2 = PermissionsAndroid.PERMISSIONS.CALL_PHONE;
const res3 = await PermissionsAndroid.check(needpremiss2);
if (!res3) {
  const res1 = await PermissionsAndroid.requestMultiple([needpremiss, needpremiss2]);
  if (res1["android.permission.WRITE_EXTERNAL_STORAGE"] == "granted") {
    console.log("权限申请成功");
  }
  if (res1["android.permission.CALL_PHONE"] == "granted") {
    console.log("成功2");
  }
}
```

4. Vibration.vibrate(); 震动功能

```tsx
Vibration.vibrate();
Vibration.vibrate([200, 100, 300, 500], true);
//安卓模式
//间隔震动，停200毫秒，震动100毫秒，再停300毫秒，再震动500毫秒
//IOS
//震动时间时固定的400毫秒，数字传参过去，全是延迟时间
//第二个参数，是否重复震动
Vibration.cancel(); //取消震动
```

### ToastAndroid 安卓平台才有的 API

1. 弹窗提示

```tsx
ToastAndroid.show("提示内容", 2000);
ToastAndroid.showWithGravity("这是一个提示", ToastAndroid.LONG, ToastAndroid.TOP);
ToastAndroid.showWithGravityAndOffset("这是一个提示", 2000, 1, 10, 10);
```

关于位置的变量都没有用

### Transform ：矩阵变换的伪 3D 效果

![image.png](https://cdn.nlark.com/yuque/0/2023/png/26302696/1692083412407-e244d520-8a70-41e6-a364-c1e36dd3f88a.png#averageHue=%23f0f0f0&clientId=u60c897ac-ee9e-4&from=paste&height=460&id=uaf5fbf2f&originHeight=460&originWidth=782&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66075&status=done&style=none&taskId=u3b579e5f-a225-41a5-86cc-e7afa2d898b&title=&width=782)

### Keyboard ：键盘操作有神器

对键盘的事件进行监听。出现和消失进行监视

```tsx
useEffect(() => {
  const keybordlister = Keyboard.addListener("keyboardDidShow", onkeyshow);
  const keybordhide = Keyboard.addListener("keyboardDidHide", onkeyhide);
  return () => {
    keybordlister.remove();
    keybordhide.remove();
  };
}, []);
```

键盘取消的函数。

```tsx
Keyboard.dismiss();
```
