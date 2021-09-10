---
title: 简单多边形顶点凹凸性快速判断
date: 2021-09-10 17:39:31
tags:
 - 算法
categories:
 - 学习
 - 图形图像
---

## 摘要
在计算机图形学中，经常要判断多边形顶点的凹凸性及顶点顺序。利用向量叉积的算法比较简单直观，并且算法可以达到O(n)。参考了一些论文，用js实现了一个demo，并且可以在线演示。

<!-- more -->

## 步骤
1. 找到一个多边形的凸顶点，上下左右极点必然是凸顶点。
2. 计算该顶点的叉积，得到多边形的顺序（顺时针还是逆时针）。
3. 计算出所有顶点的叉积，叉积方向与凸顶点方向相同的则是凸顶点，相反的凹顶点。

## 示例
拖动范围条可以看到凹点变成凸点

{% raw %}

<input type="range" id="input" min="80" max="325" value="125" style="width:100%" oninput="render()" />
<canvas id="canvas" width="500" height="500" style="width:100%"></canvas>

<script>
    var points = [[150,75], [258,137.5], [258,262.5], [150,125], [42,262.6], [42,137.5]];
    var input = document.getElementById('input')
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d')

    function render () {
        var value = input.value
        var polygon = []
        polygon = polygon.concat(points)
        polygon[3][1] = value
        // 首尾相接
        polygon.push(polygon[0]) // 尾部追加头部
        polygon.unshift(polygon[polygon.length-2]) // 头部追加尾部

        var n = polygon.length-1
        
        ctx.clearRect(0,0,500,500)
        ctx.beginPath()
        ctx.moveTo(polygon[1][0], polygon[1][1])
        var flag
        for(var i=1;i<n;i++) {
            var prev = polygon[i-1]
            var next = polygon[i+1]
            var point = polygon[i]
            var flag2 = ((point[0]-prev[0])*(next[1]-point[1])-(next[0]-point[0])*(point[1]-prev[1]))>0?1:-1
            if(i==1)flag = flag2
            // 如果方向和凸顶点一致，则该点也是凸顶点，否则是凹顶点
            ctx.fillText(flag*flag2>0?'凸':'凹', point[0], point[1])
            ctx.lineTo(point[0], point[1])
        }
        ctx.lineTo(polygon[1][0], polygon[1][1])
        ctx.stroke()
    }
    render()
</script>

{% endraw %}