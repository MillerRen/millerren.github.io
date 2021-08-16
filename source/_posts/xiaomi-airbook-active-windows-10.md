---
title: 小米笔记本安装激活原版win10系统
date: 2021-08-14 03:21:03
tags:
---
小米air自带的系统比较臃肿，我把自己的windows升级到了其他版本，但是过了一段时间windows提示过期了，需要激活，成了盗版系统。
原来之前升级用的密钥是别人共享的，可能超出了最大授权数量限制，为了还原原来的正版系统，走了一些弯路，现在我把正确的做法分享出来。

一、用小米官方提供的系统镜像重新安装，可以自动激活。去小米的售后重装系统需要收费，有没有更好的方式呢？有网友从小米的机器中提取了windows10的镜像，
只需要把它烧录到U盘里面就可以重新安装系统了。步骤如下：
1. 准备一个最小8GB的U盘，格式化为exfat文件系统。
2. 下载小米原版windows10系统。
3. 下载并安装UltraISO光盘刻录软件,打开刚才下载的镜像，在菜单栏选择`启动`→`写入磁盘映像`，在弹出框里选择要写入的磁盘，写入方式选择`USB-HDD+`，便捷启动写入新的硬盘主引导记录，写入新的驱动器引导扇区win10，然后点击写入。
4. 写入成功后，重启笔记本，狂按`F2`进入BIOS设置页面，如果你没有设置过密码，会提示你设置，boot启动项设置为legacy，保存，启动顺序调整为优盘优先，重启电脑。
5. 重新安装windows系统。

二、使用原版激活码激活，用aida（everest）硬件资源软件查看操作系统OEM密钥，在windows10系统管理中更改密钥，重新激活。