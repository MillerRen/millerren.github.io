---
title: 三阶贝塞尔曲线及其样例演示
date: 2021-09-05 17:41:36
tags:
 - 贝塞尔曲线
categories:
 - 学习
---

三阶贝塞尔曲线的生成跟二阶类似，它是由起点、终点、控制点1、控制点2四个控制点生成。方程式如下：

$$B(t)=(1-t)^3P_0+3t(1-t)^2P_1+3t(1-t)^2P_2+t^3P_3, t\in[0,1]$$

<!-- more -->

高阶贝塞尔曲线可以利用低阶贝塞尔曲线相同的方法递归地生成。一般3阶贝塞尔曲线就足够用了，越高阶实现起来越复杂。在字体中truetype就用了二阶贝塞尔曲线，postscript则使用了三阶贝塞尔曲线。

做个演示：

{% raw %}
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  style="width:100%;height:500px" viewBox="0 0 1000 200">
    <g stroke="#f00" fill="rgba(0,0,0,0)" stroke-width="1">
    <path id="path" d="M0 0 C100 200 500 350 600 250" />
    <line x1="0" y1="0" x2="100" y2="200" />
    <line x1="100" y1="200" x2="500" y2="350" />
    <line x1="500" y1="350" x2="600" y2="250" />
    <circle r="2" cx="0" cy="0" id="point" />
    <circle r="2" cx="0" cy="0" id="point1" />
    <circle r="2" cx="100" cy="200" id="control1" />
    <circle r="2" cx="500" cy="350" id="control2" />
    <circle r="2" cx="600" cy="250" id="point2" />
    </g>
</svg>
<input type="range" value="0" step="0.01" min="0" max="1" id="input" style="width:100%" />
<script>
    var x1=0,y1=0,x2=100,y2=200,x3=500,y3=350,x4=600,y4=250;
    var path = document.getElementById('path');
    var point = document.getElementById('point');
    var input = document.getElementById('input');
    
    path.setAttribute('d', `M${x1} ${y1}C${x2} ${y2} ${x3} ${y3} ${x4} ${y4}`);

    input.oninput = function (e) {
        point.setAttribute('cx', b3(this.value, x1,x2,x3,x4))
        point.setAttribute('cy', b3(this.value, y1,y2,y3,y4))
    }

    function b3 (t, p0, p1, p2, p3) {
        return (1-t)*b2(t, p0, p1, p2) + t*b2(t, p1, p2, p3)
    }

    function b2 (t, p0, p1, p2) {
        return (1-t)*b1(t, p0, p1) + t*b1(t, p1, p2)
    }
    function b1 (t, p0, p1) {
        return (1-t)*p0 + t*p1
    }
</script>
{% endraw %}
