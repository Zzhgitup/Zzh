---
title: "React Native动画系统"
description: "React Native动画系统"
date: 2023-8-16
order: 3
category:
  - 前端跨平台
tag:
  - 前端
  - React Native
---

### 初识动画系统

想要对一个元素添加动画，需要借助 RN 中 Animated，

```tsx
const Anim1: FC<Props> = () => {
  const marginLeft = useRef(new Animated.Value(100)).current; //创建需要动画的值
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Button
        title="动画执行"
        onPress={() => {
          Animated.timing(marginLeft, {
            //创建动画
            toValue: 300,
            duration: 1000,
            useNativeDriver: false,
          }).start(); //执行动画
        }}
      ></Button>
      <Animated.View style={[styles.view, { marginLeft: marginLeft }]}></Animated.View>
    </View>
  );
};
```

2. 旋转

旋转的角度是字符串，需要使用 interpolate 做一下映射，

```tsx
const Anim2: FC<Props> = () => {
  const rotate = useRef(new Animated.Value(0)).current;
  const rotateValue = rotate.interpolate({
    inputRange: [0, 30],
    outputRange: ["0deg", "30deg"],
  });
  return (
    <View style={styles.container}>
      <Button
        title="动画执行"
        onPress={() => {
          Animated.timing(rotate, {
            toValue: 30,
            duration: 1000,
            useNativeDriver: false,
          }).start();
        }}
      ></Button>
      <Animated.View
        style={[styles.view, { transform: [{ rotate: rotateValue }] }]}
      ></Animated.View>
    </View>
  );
};
```

3. 缩放和透明度

```tsx
const Anim2: FC<Props> = () => {
  const rotate = useRef(new Animated.Value(1)).current;
  const optcal = useRef(new Animated.Value(1)).current;
  return (
    <View style={styles.container}>
      <Button
        title="动画执行"
        onPress={() => {
          Animated.timing(rotate, {
            toValue: 1.5,
            duration: 1000,
            useNativeDriver: false,
          }).start();
          Animated.timing(optcal, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }).start();
        }}
      ></Button>
      <Animated.View
        style={[styles.view, { transform: [{ scale: rotate }], opacity: optcal }]}
      ></Animated.View>
    </View>
  );
};
```

### 支持动画的组件

![image.png](https://cdn.nlark.com/yuque/0/2023/png/26302696/1692090125693-8ec16a29-5491-4b58-9309-118ef6a4e736.png#averageHue=%23f7f7f7&clientId=u7fa36d46-c435-4&from=paste&height=414&id=u74761a89&originHeight=414&originWidth=907&originalType=binary&ratio=1&rotation=0&showTitle=false&size=55680&status=done&style=none&taskId=uf6cf5860-6946-4e76-97af-6648e80f1e7&title=&width=907)

### 四种组合的动画

```tsx
import React, { FC, useRef } from "react";
import { View, Text, StyleSheet, Button, Animated } from "react-native";
interface Props {
  name?: string;
}
const Anim3: FC<Props> = () => {
  const X = useRef(new Animated.Value(100)).current;
  const Y = useRef(new Animated.Value(100)).current;
  const optal = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const rote = rotate.interpolate({
    inputRange: [0, 30],
    outputRange: ["0deg", "30deg"],
  });
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Button
        title="动画执行"
        onPress={() => {
          const xchange = Animated.timing(X, {
            toValue: 200,
            duration: 500,
            useNativeDriver: false,
          });
          const ychange = Animated.timing(Y, {
            toValue: 200,
            duration: 500,
            useNativeDriver: false,
          });
          const optalchage = Animated.timing(optal, {
            toValue: 0.5,
            useNativeDriver: false,
            duration: 500,
          });
          const rotate2 = Animated.timing(rotate, {
            toValue: 30,
            duration: 500,
            useNativeDriver: false,
          });
          //Animated.parallel([xchange, ychange, optalchage, rotate2]).start();  并发执行
          //Animated.sequence([xchange, ychange, optalchage, rotate2]).start(); //序列执行
          // Animated.stagger(1500, [xchange, ychange, optalchage, rotate2]).start();
          /* Animated.sequence([
            xchange,
            Animated.delay(500),
            ychange,
            Animated.delay(500),
            optalchage,
          ]).start(); */ //自定义间隔执行
        }}
      ></Button>
      <Animated.View
        style={[
          styles.view,
          { transform: [{ rotate: rote }, { translateX: X }, { translateY: Y }], opacity: optal },
        ]}
      ></Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  view: {
    marginTop: 30,
    width: 60,
    height: 60,
    backgroundColor: "#d03333",
  },
});
export default Anim3;
```

### 跟随动画延迟问题

```tsx
import React, { FC, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Animated, StatusBar } from "react-native";
interface Props {
  name?: string;
}
const Anim4: FC<Props> = () => {
  const [scrolly, setscroll] = useState(0);
  const scrollY2 = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar showHideTransition={"slide"} />
      <Animated.ScrollView
        style={[
          styles.scollview1,
          { transform: [{ translateY: Animated.multiply(-1, scrollY2) }] },
        ]}
      >
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
      </Animated.ScrollView>
      <Animated.ScrollView
        /*  onScroll={event => {
          setscroll(event.nativeEvent.contentOffset.y);
        }} */
        //解决跟随动画延迟问题
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY2 },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        style={[styles.scollview1, styles.scollview2]}
      >
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
        <Text style={styles.item}>123</Text>
      </Animated.ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
  scollview1: {
    backgroundColor: "#bd2d2d",
    width: "50%",
    height: "auto",
  },
  scollview2: {
    backgroundColor: "#f7cfcf",
  },
  item: {
    width: 50,
    margin: "auto",
    marginLeft: "50%",
    marginTop: 20,
    transform: [{ translateX: -50 }],
    height: 100,
    backgroundColor: "#59ca7e",
  },
});
export default Anim4;
```
