---
title: 腾讯云_宝塔面板部署hexo
date: 2022-11-20 11:02:21
icon: blog
tag:
  - Hexo
category:
  - Hexo
---

## 前提

- 已经搭建好 hexo 博客，并将 hexo 部署到 GitHub
- 已经购买好云服务器
- 已经购买好域名（没有的也可以用 IP 地址访问）

## 安装宝塔面板

- 可以在服务器预装系统选择 宝塔面板
- 或者对服务器进行重装系统
  ![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120095748.png)
  重装完成建议 重置一下服务器登录密码
  ![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120100041.png)

## 进入腾讯云的控制台

![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120100225.png)
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120100345.png)
输入 `sudo /etc/init.d/bt default` 可以查看宝塔控制面板地址，
下方有账号密码，最好记录下来

进入宝塔 登录输入刚刚的账号密码
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120100753.png)
进入之后 直接点击一键安装默认推荐的软件
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/9b27621822492f5e864a38f1a14a4cfa.png)

## 安装并配置 git 仓库

在远程服务器上配置好 Git 仓库后，才能将本地的 hexo push 到远端。

1. 打开服务器控制台
   ![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120101422.png)
   若当前账号不是 root 则通过`sudo su root`命令切换到 root
2. 安装 git
   `yum install git`
3. 创建 Git 账户

```
adduser git
chmod 740 /etc/sudoers
```

4. 编辑/etc/sudoers 文件

```
vim /etc/sudoers
```

5. 按`i`键进入编辑模式, 找到 root ALL=(ALL) ALL 在其下方加入

```
git     ALL=(ALL)     ALL
```

![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120101955.png)
输入完成后按`esc`，再输入`:wq`，保存退出

6. 更变/etc/sudoers 权限

```
chmod 400 /etc/sudoers
```

7. 设置 git 账户密码

```
sudo passwd git
```

注意:`输入密码，输入的时候是看不到任何显示的，输完回车即可`。

8. 切换至 `git 用户`，创建`~/.ssh`文件夹和`~/.ssh/authorized_keys`文件

```
su git
mkdir ~/.ssh
vim ~/.ssh/authorized_keys
```

同样 i 进入编辑模式，把之前本地准备的 id_rsa.pub 文件中的公钥复制进去，按 esc 后，输入:wq 保存。 9. 更改权限

```
chmod 600 /home/git/.ssh/authorized_keys
chmod 700 /home/git/.ssh
```

配置完成之后 接下来创建 Git 仓库

## 创建 Git 仓库

在服务端控制台进行操作

1. 切换`root`用户

```
sudo su root
```

2. 创建 repo 作为仓库目录，并加权限

```
mkdir /var/repo
chown -R git:git /var/repo
chmod -R 755 /var/repo
```

3. 创建 hexo 目录作为网站根目录

```
mkdir /www/wwwroot/hexo
chown -R git:git /www/wwwroot/hexo
chmod -R 755 /www/wwwroot/hexo
```

4. 创建一个空白的 git 仓库

```
cd /var/repo
git init --bare hexo.git
```

5. 编辑一个 Git 钩子

```
vim /var/repo/hexo.git/hooks/post-receive
```

按`i`进入编辑模式，添加下面的代码，按`esc`输入`:wq` 保存

```
#!/bin/bash
git --work-tree=/var/hexo --git-dir=/var/repo/hexo.git checkout -f
```

6. 更改权限

```
chown -R git:git /var/repo/hexo.git/hooks/post-receive
chmod +x /var/repo/hexo.git/hooks/post-receive
```

## 宝塔网站配置

点击添加站点
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120103418.png)
配置
![](https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/QQ截图20221120103313.png)
根目录 选择刚刚创建的 hexo 文件夹
点击提交

## 本地推送

在博客目录中配置

```
deploy:
  type: git
  repo: git@服务器ip或域名:/var/repo/hexo.git
  branch: master
```

配置完成后，可直接 hexo 三连到自己的服务器。简单快捷。

之后就能通过服务器 IP 地址，访问博客了 默认是 80 端口
所以直接输入服务器 IP 就能访问了
