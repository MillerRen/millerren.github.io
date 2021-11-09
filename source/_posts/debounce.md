---
title: 防抖函数实现
date: 2021-11-09 12:09:55
tags:
 - 前端
cagegories:
 - 学习
---

前端属于GUI程序开发，用户交互频繁，并且需要频繁渲染，经常会碰到性能问题，比如滚动条，键盘输入补全等。这就需要对输入进行拦截，防止短时间多次触发影响性能的操作（抖动），这个技术被称为防抖。它的基本原理就是给要执行的操作加个延迟，如果被多次触发，只执行最后一次操作。其重点在于清零。

<!-- more -->

代码如下：
```javascript
function debounce(fn, delay) {
    var timer
    return function () {
        var args = arguments
        var context = this // 获取执行上下文，方便在对象方法中调用
        if(!timer) { // 立即响应，减少迟钝
            fn.apply(context, args)
        }
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context,args)
        }, delay)
    }
}
```

{% raw %}
<script>
function debounce(fn, delay) {
    var timer
    return function () {
        var args = arguments
        var context = this
        if(!timer) { // 立即响应，减少迟钝
            fn.apply(context, args)
        }
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context,args)
        }, delay)
    }
}


var onscroll = debounce(function () {
    console.log(window.scrollY)
}, 100)
window.onscroll = onscroll
</script>
{% endraw %}