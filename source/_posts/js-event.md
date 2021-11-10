---
title: js实现一个事件系统
date: 2021-11-10 13:37:23
tags:
 - 前端
---

前端大部分应用都是事件驱动的，如何自己动手实现一个事件系统呢？事件具有订阅和发布功能，还有频道。有时候还需要设计只执行一次的事件。原理非常简单，把事件回调用一个数组保存起来，触发的时候再按顺序从数组中取出来执行就行了，为了区分不同事件类型，需要用一个对象根据不同键值存放。

代码如下：
```javascript
class Event {
    events = {}
    on (type, listener) {
        this.events[type] = this.events[type]||[]
        this.events[type].push(listener)
    }
    off (type, listener) {
        this.events[type]=this.events[type]||[]
        this.events[type] = this.events[type].filter(fn=>fn!==listener)
    }
    emit (type, ...args) {
        this.events[type].map(fn=>{
            fn(...args)
        })
    }
    once (type, listener) {
        const callback = (...args) => {
            this.off(type, callback)
            listener(..args)
        }
        this.on(type, callback)
    }
}
```