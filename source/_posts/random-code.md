---
title: 生成随机不重复的6位数字验证码
date: 2021-11-10 13:21:39
tags:
 - 前端
 - 算法
categories:
 - 学习
---

在用户注册流程中，经常会用到手机验证码，这种验证码通常是6位不重复数字。如何生成一个随机不重复的数字呢？
大致思路如下：
1.先生成一个从0到9的数组
2.把数组随机顺序打散
3.取出需要的6为数字

代码如下：
```javascript
function randomCode (n) {
    return [0,1,2,3,4,5,6,7,8,9]
        .sort(()=>Math.random()-0.5)
        .slice(0,n)
}
```
