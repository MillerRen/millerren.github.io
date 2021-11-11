---
title: 用JS实现一个中间件
date: 2021-11-11 18:35:50
tags:
 - 前端
categories:
 - 学习
---

中间件可以在调用目标函数之前插入其他函数对数据预先进行处理，是一种很常见的模式。可以像流水线一样对数据进行层层加工，最终到达目标函数。它的实现可以通过在中间件中调用next更新游标，通过游标的值来确定是否进行下一步，游标是在中间件的框架中维护的。这也是js强大的地方。

<!-- more -->

一般一个中间件类似如下形式：
```javascript
function middleware (ctx, next) {
    ctx.xxx = xxx
    next() // 调用next会执行下一个中间件，如果不调用，则不会执行后面注册的中间件
}
```
使用的时候把他加入到目标系统中：
```javascript
app.use(middleware)
```

实现代码如下：
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
        var index = 0
        var next = function () {
            index++
        }
        this.fns.map((fn, i)=>{
            // 如果没有调用next，则index<i,后面中间件不会被执行
            // 如果调用多次，则index>i,会跳过后面的中间件
            // 只有next被调用一次才往下执行
            if (index==i) fn(ctx, next)
        })
        if(index == this.fns.length) this.callback(ctx)
    }
}
```

然后调用测试一下
```javascript
app.use(function (ctx, next) {
    console.log(ctx.cout)
    ctx.cout = 1
})
app.use(function (ctx, next) {
    console.log(ctx.cout)
    ctx.cout = 2
})
app.use(function (ctx, next) {
    console.log(ctx.cout)
    ctx.cout = 3
})
var ctx = {
    count:0
}
app.run(ctx)
```

输出结果是：
0
1
2
3

代码结构变得非常清晰了，是不是很好玩？我们测试的中间件都是同步的，如果中间件是异步的呢？
