---
title: 顺时针打印矩阵JS版
icon: blog
date: 2022-05-01
tag:
  - 算法
category:
  - 记录
---

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (matrix.length == 0) {
    return [];
  }
  if (matrix[0].length == 0) {
    return [];
  }
  //向右  获取长和宽
  let height = matrix.length;
  let width = matrix[0].length;
  let result = [];
  //向右打印
  for (let i = 0; i < width; i++) {
    result.push(matrix[0][i]);
  }
  //如果有向下的，则向下 不能则返回结果
  if (height > 1) {
    for (let k = 1; k < height; k++) {
      result.push(matrix[k][width - 1]);
    }
  } else {
    return result;
  }

  //如果能向左就向左 不能则返回结果
  if (width > 1) {
    for (let i = width - 2; i >= 0; i--) {
      result.push(matrix[height - 1][i]);
    }
  } else {
    return result;
  }
  //如果能向上 则向上，不能则返回结果
  if (height > 2) {
    for (let i = height - 2; i >= 1; i--) {
      result.push(matrix[i][0]);
    }
  } else {
    return result;
  }
  //剥除里面的矩阵  (循环一次减掉两层高度)
  let inner = new Array(height - 2);
  for (let i = 0; i < height - 2; i++) {
    inner[i] = matrix[i + 1].slice(1, width - 1);
  }
  //递归
  result = result.concat(spiralOrder(inner));
  return result;
};
```
