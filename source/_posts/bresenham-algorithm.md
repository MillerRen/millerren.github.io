---
title: Bresenham算法
date: 2021-09-26 17:50:45
tags:
 - 算法
categories:
 - 学习
mathjax: true
---

在画布上给定起点和终点，怎么画出连接两点的直线呢？Bresenham算法给出了一种简单的方法，该算法非常精简可以只用整数加减法和位移等比较简单的算术运算方式实现。在一些计算资源比较贫乏的硬件上应用广泛。

<!-- more -->

该算法并不是通过直线方程去求解直线上的坐标点，而是通过栅格化，计算随x坐标变化后y的误差确定,这样避免了直线方程的计算。算法的思路如下：
假设直线的斜率为0到1之间(其他方向可通过直线对称性推导)，起点为(x0,y0),终点为(x1, y1)，则斜率为k=(y1-y0)/(x1-x0),直线方程为y-y0=k(x-x0)
1.画起点(x0,y0)。
2.准备画下一个点，x坐标增加1为x+1，那么下一个点要么是当前节点的右邻节接点(x+1,y+1)，要么是右上邻接点(x+1, y)，即x值每增长1，y值保持不变或增长1。计算方法为：右上邻接点和上邻接点的中点为M(xm, ym),如果直线和x=x1+1的直线交点在M上方则取右上邻接点，如果交点在M下方则取右邻接点。
3.画出下一个点。如果到达终点则结束。 

其中：
$$\Delta x=x_1-x_0$$
$$\Delta y=y_1-y_0$$
$$k=\frac{\Delta y}{\Delta x}$$

直观一点的理解：x坐标增长1，则y坐标增长k，设e=e+k（e初始值为0）;当e<0.5的时候，取右邻接点，否则取右上邻接点，同时e减1以保证相对性。

为了消除浮点数，在不等式两边乘以2，为了消除除法，在等式两边乘以deltax，这样更具有普适性（deltx不能为0）。

对于斜率为其他值的情况，可以通过交换轴的方向进行计算，并在画线时再旋转过来。

{% raw %}

<canvas id="canvas" style="width:100%"></canvas>

<script>
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 1000;

    function line(x0, y0, x1, y1)
{
	var dx = x1 - x0;//x偏移量
	var dy = y1 - y0;//y偏移量
	var ux = dx >0 ? 1 : -1;//x伸展方向
	var uy = dy >0 ? 1 : -1;//y伸展方向
	var dx2 = abs(dx << 1);//x偏移量乘2
	var dy2 = abs(dy << 1);//y偏移量乘2
	if (abs(dx)>abs(dy))//以x为增量方向计算
	{
		var e = -dx; //e = -0.5 * 2 * dx,把e 用2 * dx* e替换
		var x = x0;//起点x坐标
		var y = y0;//起点y坐标
		while (x!=x1+ux)
		{
			draw( x, y);
			e = e + dy2;//来自 2*e*dx= 2*e*dx + 2dy  （原来是 e = e + k）
			if (e > 0)//e是整数且大于0时表示要取右上的点（否则是右下的点） 
			{
				if (y!=y1)
				{
					y += uy;
				}
				e = e - dx2;//2*e*dx = 2*e*dx - 2*dx  (原来是 e = e -1)
			}
			x += ux;
		}
	}
	else
	{//以y为增量方向计算
		var e = -dy; //e = -0.5 * 2 * dy,把e 用2 * dy* e替换
		var x = x0;//起点x坐标
		var y = y0;//起点y坐标
		while (y!=y1+uy)
		{
			draw( x, y);
			e = e + dx2;//来自 2*e*dy= 2*e*dy + 2dy  （原来是 e = e + k）
			if (e > 0)//e是整数且大于0时表示要取右上的点（否则是右下的点） 
			{	
				if (x!=x1)
				{
					x += ux;
				}
				e = e - dy2;//2*e*dy = 2*e*dy - 2*dy  (原来是 e = e -1)
			}
			y += uy;
		}
	}
}

    function abs(v) {
        return v>0?v:-v;
    }

    var animationSteps = [];

    function draw (x, y) {
        // ctx.fillRect(x,y,1,1);
        animationSteps.push({
            x: x,
            y: y
        })
    }

    line(500, 500, 500, 750);
	line(500, 500, 1000, 500);
	line(500, 500, 1000, 750);
    line(500, 500, 0, 150);
    line(500, 500, 0, 750);
    line(500, 500, 1000, 150);

    var timer = setInterval(function () {
        if (animationSteps.length) {
            var point = animationSteps.shift();
            ctx.fillRect(point.x, point.y, 1, 1);
        } else {
            clearInterval(timer);
        }
    }, 10)
</script>

{% endraw %}
