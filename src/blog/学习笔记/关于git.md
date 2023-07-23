---
title: 关于git
date: 2022-02-27 08:35:13
icon: blog
tag:
  - git
category:
  - 记录
---

<!--more-->

git 是一种版本控制器，git 的安装非常简单，下一步就行了。

git 的基本操作；

在需要记录版本的文件夹中用，git init 创建本地库

首次使用需要配置一下个人的用户名和电子邮件地址，输入一下两行代码

\$ git config \--global user.name "用户名"

\$git config \--global user.email 邮箱

可以输入一下代码查看是否配置成功

\$git config \--list

git 有三个部分，工作区，暂存区，本地库，也可以上传至远程库

git 的基本操作；

git init 初始化操作

git add 添加文件到暂存区

git commit 将暂存区的内容添加到本地仓库中；

git status 查看仓库当前状态

git diff 比较暂存区和工作区的差异

git reset 版本号 回退版本；

git rm 删除工作区文件

git mv 移动或重命名工作区文件。

git log 查看历史提交记录

git blame\<file>以列表形式查看指定文件的历史修改记录

git remote 远程仓库操作

git fetch 从远程库获取代码库

git pull 下载远程代码并合并

git push 上传远程代码并合并

其中 git pull git fetch git cloned 的区别

git pull 相当于是从远程获取最新版本并 merge（合并）到本地 git pull = git fetch + git merge

**git fetch**  命令用于从远程获取代码库，该命令执行完后需要执行 git merge 远程分支到你所在的分支。

git clone 拷贝一个 git 仓库到本地，本地无需初始化仓库也能拷贝，这是完全拷贝，连历代记录都进行了拷贝，历代版本信息也有，

2.分支管理

git branch \-v 可以查看分支

git branch 分支名       可以创建分支，

git checkout 分支名         可以切换分支

git merge 分支名       可以合并分支到当前分支；

git 其实还可以用来保存游戏存档的历代版本，当打游戏材料消耗完了，这个时候只需要回退版本，就能恢复存档。
