---
title: js中如何判断变量类型
date: 2021-11-15 21:25:10
tags:
 - 前端
---

前几天碰到一个地方需要在js中判断一个变量是不是对象，参考了几个实现，都不一样，索性自己写一个。要判断变量类型，首先可能会想到typeof或instanceof，但是typeof只用于区分基本类型，instanceof只适合用于区分类的实例，这两个方法通过组合，也能判断出准确类型，但是太复杂，有没有简单点的方法呢？

<!-- more -->

其实js还提供了一种方式，那就是Object.prototype.toString这个方法，可以通吃基本类型和引用类型。代码如下：

```javascript
function typeOf (val) {
    return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}
```