---
title: js模板引擎
date: 2021-12-23 15:17:24
tags:
---

这两天在弄一个小项目，纯js的，没用框架，所有东西都是一点点堆起来的，渲染的时候用到了模板引擎，相对于虚拟DOM，它更简单。原理上跟拼字符串差不多，但是它能实现结构和数据分离，看起来代码更清晰。

<!-- more -->

实现的大概步骤如下：
1. 使用html编写模板，遇到变量、条件或循环则使用模板语法
2. 把模板语法转换成JavaScript语法并生成一个render函数
3. 调用render函数，并传入数据

比如下面的模板：
```html
<ul>
        <% if(obj.users.length){ %>
          <% for(var i=0;i<obj.users.length;i++) { %>
            <li>
              <a href="<%= obj.users[i].url %>"><%= obj.users[i].name %></a>
            </li>
          <% } %>
        <% } else { %>
          <p>It is empty</p>
        <% } %>
      </ul>

```
如果用拼接字符串，是这样写：
```javascript
var arr = []
arr.push('<ul>');
if(obj.users.length) {
  for(var i=0;i<obj.users.length;i++) {
    arr.push('<li>');
    arr.push('<a href="');
    arr.push(obj.users[i].url);
    arr.push('">');
    arr.push(obj.users[i].name);
    arr.push('</a>');
  } else {
    arr.push('<li>It is empty</li>');
  }
}
arr.push('</ul>');
```
可以看到模板和字符串拼接是十分接近的。只需要把模板里面的语法转换成js代码就行了。规则如下：
1. 如果是html字符串，则放入数组
2. 如果是<%= %>赋值，或<% %>这种字符串，就把它里面的代码替换成js代码
3. 最后调用arr.join()把字符串拼接起来

```javascript
function tpl(str) {
  var code = 'var arr=[];arr.push("';
  // <%=(.*?)%>可以替换成<%=([^%>]+)?%>减少正则回溯，提升性能
  code += str.replace(/<%=(.*?)%>/, '");arr.push($1);arr.push("')
    .replace(/<%/g, '");')
    .replace(/%>/g, 'arr.push("')

  code += '")';

  return Function('obj', code); // 生成一个函数，第一个参数名是obj，给函数体使用
}
```
调用方式如下：
```javascript
// template就是上面的模板
var render = tpl(template) // 由模板生成渲染函数
var html = render(data) // 由数据生成html字符串
element.innerTHML = html // 把生成的html字符串挂载到dom节点上
```
