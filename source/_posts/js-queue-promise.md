---
title: js实现一个异步队列
date: 2021-11-13 22:21:53
tags:
 - 前端
categories:
 - 学习
---

前端开发经常会调用各种后端接口，这些操作都是异步的，有的接口还有并发限制，这时候就需要对接口调用进行管理，限制同时请求的接口数量，对于这种情况，一般都使用队列来解决并发问题。其难点在于异步流程的设计。

举一个简单的例子：我们想了解某个网站提供的一系列数据，从这些数据做辅助分析，所以需要获取大量数据，但是这个网站做了并发限制，同一时间内最多有3次请求，如果超了，就会返回错误，如果我们不处理并发，后面就会一直得到报错。

<!-- more -->

实现的思路如下：
1.把要发起的所有请求都放到一个数据池
2.从数据池里拿出一个请求，请求完成再拿出一个，如此往复。

我们可以使用数组来存放请求任务，并递归函数来实现取数据操作，还可以使用promise来简化流程。代码如下：

```javascript
class Task {
    constructor(resolve, fn, args) {
        this.resolve = resolve
        this.fn = fn
        this.args = args
    }
}

class Queue {
    
    constructor(concurrent) {
        this.concurrent = concurrent
        this.count = 0
        this.queue = []
    }
    
    addTask(fn, args) {
        return new Promise((resolve,reject)=>{
            this.queue.push(new Task(resolve,fn,args))
            // 如果没有达到并发限制，就执行
            if (this.count < this.concurrent) {
                this.pullTask()
            } 
        }
        )
    }

    pullTask() {
        // 如果队列空了就退出
        if (!this.queue.length) {
            return
        }
        // 从队列中取出并执行任务
        const {resolve, fn, args} = this.queue.shift()
        resolve(this.runTask(fn, args))
    }

    runTask(fn, args) {
        // 执行前增加正在并发的数
        this.count++
        // 使普通函数也像promise一样
        const result = Promise.resolve(fn(args))
        result.finally(()=>{
            // 执行完成后减少正在并发的请求数
            this.count--
            // 继续拉取任务
            this.pullTask()
        }
        )
        return result
    }
}
```