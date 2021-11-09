---
title: 函数节流实现
date: 2021-11-09 14:31:20
tags:
 - 前端
categories:
 - 学习
---

对于事件比较密集的应用，需要谨慎处理事件回调，过于频繁的执行会带来性能问题，尤其是在回调中执行大量消耗性能的动作。有时候我们并不需要那么快去响应事件，因为人的感官没有那么灵敏，就像电影一样，一帧一帧的展示，只要能达到24fps就能看起来像连续的画面。这里需要用到节流的技术。它的基本原理就是给一个要执行的动作加锁，一定时间内只执行一次。其重点在于加锁和去锁。

代码如下：
```javascript
function throttle (fn, delay) {
    var timer
    return function () {
        var context = this
        var args = arguments
        if(timer) return
        timer = setTimeout(function () {
            timer = undefined
            fn.apply(context, args)
        }, delay)
    }
}
```

{% raw %}
<script>
function throttle (fn, delay) {
    var timer
    return function () {
        var context = this
        var args = arguments
        if(timer) return
        timer = setTimeout(function () {
            timer = undefined
            fn.apply(context, args)
        }, delay)
    }
}

window.onscroll = throttle(function() {
    console.log(window.scrollY)
}, 1000)
</script>
{% endraw %}
