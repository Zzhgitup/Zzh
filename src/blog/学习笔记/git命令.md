---
title: git命令
date: 2023-2-05 08:31:40
icon: blog
tag:
  - git
category:
  - 记录
---

## 导航 — 跳到之前的分支

```javascript
git checkout -
```

## 查看历史

```javascript
# 每个提交在一行内显示
git log --oneline

# 在所有提交日志中搜索包含「homepage」的提交
git log --all --grep='homepage'

# 获取某人的提交日志
git log --author="Maxence"
```

### 回退操作

```javascript
# 获取所有操作历史
git reflog

# 重置到相应提交
git reset HEAD@{4}
# ……或者……
git reset --hard <提交的哈希值>
```

### 清理仓库

```javascript
git fetch origin
git checkout master
git reset --hard origin/master
```

### 查看我的分支与 master 的不同

```javascript
git diff master..my-branch
```
