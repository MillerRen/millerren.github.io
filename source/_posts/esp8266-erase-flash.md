---
title: esp8266 擦除整个 flash
date: 2021-12-01 21:21:14
tags:
 - 物联网
categories:
 - 分享
---

esp8266在烧录固件的时候，如果先前已经烧录过其他不同固件，就有可能导致新烧写的固件无法工作，这时候就需要擦除整个flash，再从新烧录。

<!-- more -->

可以使用esptool.exe这个工具来完成擦写，这是我试过的最简单的方法。可以执行一下命令：

```bash
# 把COM3替换成实际的端口
esptool --port COM3 erase_flash
```

在windows上获得端口的方法是：在“我的电脑”图标上右击，管理中的设备管理查看端口COM和LPT下的端口列表。