---
title: 如何计算步进电机脉冲数？
date: 2021-08-10 16:46:10
tags:
 - 步进电机
 - 机械
---

  步进电机是靠脉冲驱动的，接收一个脉冲，步进电机就会转动一定角度。使用步进电机驱动机械运动，首先需要确定的就是每走一段距离发送多少个脉冲。
由于传动结构的存在使得计算变得比较麻烦，我做了一个小工具，用来简化计算。

<!-- more -->
  
  公式为：`每毫米步数=驱动细分数*360°/步距角/齿数/齿距*减速比`
  
  {% raw %}
  <div id="steps-calculator"  style="border: 1px dashed #888;border-radius:4px; padding: 8px;background:#eee;">
    <form>
    
      <label  id="steps_per_mm"> 100 </label>
      <label > = </label>
      <label for="microsteps">
        <input id="microsteps" type="number" value="16" style="width:3em">
      </label>
      <label > * </label>
      <label > 360° </label>
      <label > / </label>
      <label >
        <input id="angle" type="number" value="1.8" style="width:3em">
      </label>
      <label > / </label>
      <label >
        <input id="gears" type="number" value="2" style="width:3em">
      </label>
      <label > / </label>
      <label >
        <input id="pitch" type="number" value="2" style="width:3em">
      </label>
      <label > * </label>
      <label >
        <input id="ratio" type="number" value="1" style="width:3em">
      </label>
    </form>
  </div>
  
  <script>
    (function () {
      function StepsCalculator (el, microsteps, angle, gears, pitch, ratio) {
      var defaults = {
        microsteps: 16,
        angle: 1.8,
        gears: 16,
        pitch: 2,
        ratio: 1
      }
      this.el = document.getElementById(el)
      this.microstepsEl = document.getElementById('microsteps')
      this.microstepsEl.value = microsteps || defaults.microsteps
      this.angleEl = document.getElementById('angle')
      this.angleEl.value = angle || defaults.angle
      this.gearsEl = document.getElementById('gears')
      this.gearsEl.value = gears || defaults.gears
      this.pitchEl = document.getElementById('pitch')
      this.pitchEl.value = pitch || defaults.pitch
      this.ratioEl = document.getElementById('ratio')
      this.ratioEl.value = ratio || defaults.ratio
      this.stepspermmEl = document.getElementById('steps_per_mm')
    }

    StepsCalculator.prototype.init = function () {
      this.calculate()
      this.bindEvent()
    }

    StepsCalculator.prototype.bindEvent = function () {
      var that = this
      this.microstepsEl.onchange = function () {
        that.calculate()
      }
      this.angleEl.onchange = function () {
        that.calculate()
      }
      this.gearsEl.onchange = function () {
        that.calculate()
      }
      this.pitchEl.onchange = function () {
        that.calculate()
      }
    }

    StepsCalculator.prototype.calculate = function () {
      this.stepspermmEl.textContent = this.microstepsEl.value * 360 / this.angleEl.value / this.gearsEl.value / this.pitchEl.value * this.ratioEl.value
    }

    var calc = new StepsCalculator('steps-calculator')
    calc.init()
    })()
    
  </script>
  {% endraw %}

  例如常用的1.8°步进电机a4899驱动16细分和GT2皮带传动16齿同步轮为例：步进电机转一圈是360°，每一步转1.8°，那么转一圈就是`360/1.8=200`步,算上细分`200*16=3200`。GT2的齿距为2mm，转一圈是`16 * 2 = 32`毫米。
按公式可以算出`steps_per_mm = 16 * 360 / 1.8 / 16 / 2 * 1 = 100`。
如果换成drv8825的32细分则为`steps_per_mm = 32 * 360 / 1.8 / 16 / 2 * 1 = 200`。 
如果换成0.9度步距角的步进电机则为`steps_per_mm = 16 * 360 / 0.9 / 16 / 2 * 1 = 200` 。
如果换成20齿的GT2同步轮则为`steps_per_mm = 16 * 360 / 1.8 / 20 / 2 * 1 = 80` 。
如果是带减速的电机或中间有减速传动比为10:1则为`steps_per_mm = 16 * 360 / 1.8 / 16 / 2 * 10 = 1000`

对于丝杆传动的机器2mm导程,如，则令`齿数=1`，令`导程=齿距=2`则为`steps_per_mm = 16 * 360 / 1.8 / 1 / 2 * 1 = 1600`,有些丝杆会给出螺距，对于单线螺杆来说导程=螺距，多线螺杆导程=线数*螺距。

对于既有丝杆又有同步轮并带有减速的机器，则只管按上面说的丝杆计算，再乘以减速比即可。