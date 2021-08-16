---
title: github经常超时的解决办法
date: 2021-08-10 22:36:04
tags:
 - 科学上网
---

  ~~GitHub网络不稳定~~，经常超时,有时候能访问，有时候突然就卡住了，试好多次还是不行，但是好的时候还挺快，这说明了一个问题，啥问题自己体会。本着自己动手丰衣足食的原则，要科学地上网。

  根据上面的现象，猜测是DNS污染，为了验证这个假设，手动绑定域名和IP进行实验。

1. 想绑定IP就得找到github.com对应的IP地址，这就需要一些探测工具，例如[这个](http://ping.chinaz.com/github.com),
打开这个网页版IP查询工具，在下面检测结果中按响应时间排序，选择响应时间最小的一个IP（尽量选国外的节点）。
里面还有些响应时间超长的，超时的，你懂了吧。

2. 更新hosts文件添加一行,如`140.82.121.4 github.com` 把这个IP换成你从刚才查询的那个IP，保存。

现在访问试试，是不是非常快乐呢？