---
title: PCB铜箔电阻计算
date: 2022-01-20 16:47:34
tags:
- 电子
---

最近在做一款PCB加热台，可以给3D打印机用，也可以用来做贴片加热，当然，还有一个用途就是烧烤^_^。他的原理是利用金属铜的电阻效应来加热，功率P=U^2/R，其中U是PCB上铜箔两端的电压，R是铜箔的电阻值。

铜箔的电阻计算公式是R=ρL/S,其中ρ是金属铜的电阻率ρ=0.0175Ωmm^2/m(国际上，电阻率定义为横截面积为1平方毫米，长度为1米的导线的电阻)，L是铜箔长度，S是横截面积。假设PCB是用1盎司的，它的厚度是35微米，布线线宽是1毫米，总长度为5米，则器电阻为0.0175x5/(1x35x10e-3)=2.5欧姆。用20V供电，其功率为20x20/2.5=160瓦。