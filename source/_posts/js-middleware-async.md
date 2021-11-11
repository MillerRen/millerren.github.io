---
title: js实现一个中间件，支持异步
date: 2021-11-11 19:35:55
tags:
 - 前端
categories:
 - 学习
---

上次用js实现了一个简单的中间件，它在同步的中间件中工作的很好，但是涉及到异步操作的时候就GG了，如何实现一个支持异步的中间件呢?回想一下，我们调用中间件时使用的是map来便利数组，这个动作本来就是同步的，如果中间件中有异步，也就丢失了，我们需要把遍历改成在next函数中去获取中间件并执行就可以了。

<!-- more -->

代码如下：

```javascript
const app = {
    fns: [],
    use (fn) {
        this.fns.push(fn)
    },
    callback (ctx) {
        console.log(ctx.count)
    },
    run (ctx) {
        var next = function () {
            var fn = fns.shift()
            if(fn) fn(ctx, next)
            else this.callback(ctx)
        }
        next()
    }
}
```

然后调用测试一下
```javascript
app.use(function (ctx, next) {
    console.log(ctx.cout)
    ctx.cout = 1
    next()
})
app.use(function (ctx, next) {
    console.log(ctx.cout)
    next()
})
app.use(function (ctx, next) {
    console.log(ctx.cout)
    ctx.cout = 3
    next()
})
var ctx = {
    count:0
}
app.run(ctx)
```

输出结果是：
0
1
// 停一秒
2
3

这样就算是中间件里面有异步操作，也可以很好的执行了。很有趣，js真是强大。