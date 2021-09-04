---
title: 一阶贝塞尔曲线公式及其样例演示
date: 2021-09-04 20:17:19
tags:
 - 贝塞尔曲线
categories:
 - 学习
---

一阶贝塞尔曲线是一条直线，它的方程式如下：
$$B_1(t)=P_0+(P_1-P_0)t$$
$$B_1(t)=(1-t)P_0+tP_1, t\in[0,1] $$

t是P0到P1之间的点到原点的距离与P0到P1的距离的比值,通过改变t值，可以移动点的位置。在数学中，线性插值是一种利用线性多项式在已知数据点的离散集合范围内构造新的数据点的曲线拟合方法。
P0，P1是一个向量[x,y] x和y是分别按照这个公式算的。
P0用(x0,y0)表示，P1用(x1,y1)表示，则：

$$x(t)=(1-t)x_0+x_1$$
$$y(t)=(1-t)y_0+y_1$$

举个例子：

{% raw %}
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  style="width:100%;height:200px" viewBox="0 0 1000 200">
    <g stroke="#f00" fill="#ff0" stroke-width="1">
    <line x1="0" y1="0" x2="100" y2="200" id="line" />
    <circle r="2" cx="0" cy="0" id="point">
    </g>
</svg>
<input type="range" value="0" step="0.01" min="0" max="1" id="input" style="width:100%" />
<script>
    var x1=0,y1=0,x2=1000,y2=200;
    var line = document.getElementById('line');
    var point = document.getElementById('point');
    var input = document.getElementById('input');
    
    line.setAttribute('x1', x1);
    line.setAttribute('x2', x2);
    line.setAttribute('y1', y1);
    line.setAttribute('y2', y2);

    input.oninput = function (e) {
        point.setAttribute('cx', bx(this.value))
        point.setAttribute('cy', by(this.value))
    }

    function bx (t) {
        return (1-t)*x1 + t*x2
    }
    function by (t) {
        return (1-t)*y1 + t*y2
    }
</script>
{% endraw %}

