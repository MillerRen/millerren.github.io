---
title: esp32通过I2S总线扩展GPIO
date: 2021-08-13 09:02:06
tags:
 - 电子
 - ESP32
 - GPIO
 - I2S
---
ESP32是一款非常优秀的双核SOC，集成了WiFi和Bluetooth功能，硬件资源丰富，有很多玩法，但是缺点是GPIO数量不是很多，在实现一些复杂外设的时候，GPIO明显不够。可以通过总线扩展ESP32的GPIO，ESP32集成了多种总线如SPI，UART，I2S，I2C等。这里通过74HC595移位寄存器和I2S总线为例来说明。
<!-- more -->
74HC595 是一款价格便宜的八位移位锁存器，通过三个引脚（DS、STCP、SHCP），就可以控制几乎无限量地输出。DS是串行输入端口，每当时钟输入（SHCP）上升沿来临时，DS引脚当前电平值在移位寄存器中会移一位，连续进行8次同样的动作，就可以完成全部（Q0至Q7）移位。多个74HC595可以级联输出更多位。

ESP32的可以使用任意3个GPIO引脚作为I2S总线，在代码中定义好即可，在需要输出的地方调用I2S输出函数。
