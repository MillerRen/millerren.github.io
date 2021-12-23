---
title: 栈、回文与括号匹配
date: 2021-12-23 10:13:30
tags:
---

回文，是正读反读都能读通的句子。如何通过程序判断一个字符串是不是回文呢？最简单的方法就是把字符串反转，再与原字符串比较，如果相等那就是回文。但是如果再变换一下，比如html解析的时候，允许标签嵌套，但不允许标签交错，比如允许`<div><p></p></div>`不允许`<div><p></div></p>`,或者模板引擎匹配括号比如`()[]{}`,但是不能是`([)]`这该如何处理呢？

<!-- more -->

要解决这个问题，我们可以把左边的括号记录下来，如果碰到了右括号，就把最后一次保存的左括号和右括号配对，如果配对错误，那就说明括号出现交错。这里面会用到栈这种结构，他的特点是先进后出FILO。

实现的代码如下：
```javascript
function quoteValid (str) {
  // 使用数组模拟栈
  var stack = [] 
  // 括号对
  var map = {
    '(':')',
    '[':']',
    '{':'}'
  }
  // 遍历字符串
  for(var s of str) {
    // 如果是左括号则入栈
    if(map[s]) {
      stack.push(s)
      // 如果是右括号则跟栈顶左括号匹配
    } else if(Object.values(map).includes(s)) {
      // 弹出栈顶元素
      var v = stack.pop()
      // 如果左右括号不匹配，返回失败
      if(s !== map[v]) {
        return false
      }
    } else {
      // 做一些其他操作，比如获取模板引擎中的表达式
      // console.log(s)
    }
  }
  // 如果栈不为空，说明有缺失的括号匹配
  return stack.length === 0
}
```
测试返回结果：
```
console.log(quoteValid('()[]{}')) =>true
console.log(quoteValid('{[()]}')) =>true
console.log(quoteValid('{exp}')) =>true
console.log(quoteValid('{[}]')) =>false // 有括号交错
```