---
title: 二阶贝塞尔曲线方程及其样例演示
date: 2021-09-04 22:40:48
tags:
 - 贝塞尔曲线
categories:
 - 学习

mathjax: true
---

二阶贝塞尔曲线是个抛物线，其方程如下：

$$B(t)=(1-t)((1-t)P_0+tP_1)+t((1-t)P_1+P_2)$$

$$B(t)=(1-t)^2P_0+2t(1-t)P_1+t^2P_2, t\in[0,1]$$

它的制作过程如下：
1. 在P0到P1的线段上取一点Pa,使得t=PaP0:P0P1
2. 在P1到P2的线段上取一点Pb,使得t=PbP1:P2P1
3. 连接PaPb，在PaPb上取一点Pt，使得t=PtPa:PbPa

<!-- more -->

可以看出，二阶贝塞尔曲线就是通过一阶贝塞尔曲线得来的。

做个演示：

{% raw %}
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  style="width:100%;height:200px" viewBox="0 0 1000 200">
    <g stroke="#f00" fill="rgba(0,0,0,0)" stroke-width="1">
    <path id="path" d="M0 0 Q100 200 500 150" />
    <line x1="0" y1="0" x2="100" y2="200" />
    <line x1="100" y1="200" x2="500" y2="150" />
    <circle r="2" cx="0" cy="0" id="point" />
    <circle r="2" cx="0" cy="0" id="point1" />
    <circle r="2" cx="100" cy="200" id="control1" />
    <circle r="2" cx="500" cy="150" id="point2" />
    </g>
</svg>
<input type="range" value="0" step="0.01" min="0" max="1" id="input" style="width:100%" />
<script>
    var x1=0,y1=0,x2=100,y2=200,x3=500,y3=150;
    var path = document.getElementById('path');
    var point = document.getElementById('point');
    var input = document.getElementById('input');
    
    path.setAttribute('d', `M${x1} ${y1}Q${x2} ${y2} ${x3} ${y3}`);

    input.oninput = function (e) {
        point.setAttribute('cx', bx(this.value))
        point.setAttribute('cy', by(this.value))
    }

    function bx (t) {
        return (1-t)*(1-t)*x1 + 2*t*(1-t)*x2 + t*t*x3
    }
    function by (t) {
        return (1-t)*(1-t)*y1 + 2*t*(1-t)*y2 + t*t*y3
    }
</script>
{% endraw %}