---
title: 如何在家制作PCB激光网
date: 2021-08-10 09:18:32
tags: 
 - laser
 - PCB
 - 电子
---

  电路板PCB完成之后需要进行贴片和焊接，贴片往往会用到钢网或丝网进行上锡膏，但是这两种方式要么成本高，要么制作复杂，有没有更好的方式给PCB上锡膏呢？今天就给大家介绍一种通过小型激光雕刻机和塑料薄片制作PCB激光网的方法。

<!-- more -->

## 一、准备硬件：
  1. 准备一张塑料薄片，这里使用的0.4mm黑色PVC塑料片（0.2毫米最好）。
  2. 连接激光雕刻机，这里使用的是2.5瓦半导体激光模组。
  3. 把塑料片放入激光雕刻机，调整好位置。

## 二、准备软件：
  1. 打开PCB设计软件，导出PCB为矢量图，这里以嘉立创 EDA 为例，在顶部菜单栏选择`文件→导出→PDF`，在弹出框中只选中`顶层锡膏层`和`边框层`其他的不用修改，导出文件。

  2. 打开矢量图编辑软件Inkscape，导入刚才生成的PDF文件，双击进行编辑路径模式，删除外层多余的框，然后设置文档属性，缩放文档到内容，这时候能看到文档页面跟PCB图形一样大小了，然后导出为优化的SVG，使用默认参数即可。

  3. 打开激光雕刻软件lasergrbl,菜单栏选择文件打开刚才生成的SVG，弹出框默认就行，生成PCB图形的刀路，可以直接进行雕刻，也可以导出刀路，在其他上位机软件里执行。

  设置好软件和硬件，就可以开始雕刻了，雕刻完成后，把刀路上的碎屑和毛刺清除干净，一张“激光钢网”就诞生了。这样可以快速的制作PCB激光网，方便在家制作，但是缺点是不适合太小的（0603及以上的）电子元件。

  嘉立创导出的SVG里面包含额外的外框，并且带了单位，不适合直接导入到lasergrbl，需要在Inkscape里面进行修改。导出PDF而不是SVG是因为SVG导入导出总是出现莫名奇妙的问题。

  <div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
    <iframe src="//player.bilibili.com/player.html?aid=377178402&bvid=BV1co4y1D7W6&cid=386199408&page=1"  scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;"></iframe>
</div>