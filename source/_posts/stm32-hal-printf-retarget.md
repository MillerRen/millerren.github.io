---
title: stm32 hal printf 重定向
date: 2022-10-08 17:18:36
tags:
    - 电子
    - stm32
---

在使用STM32开发时会用到c语言的printf函数，但是printf一般是面向控制台输出的，在STM32中我们想用串口输出，就会涉及到printf函数的重定向，我们不想重写printf而是修改它底层调用的函数如fputc,在高版本的stm32cubeide中则是syscall.c中的_write函数，这个函数是__weak的，我们可以自己实现它，方法如下：

在uart.c文件中添加如下代码：
```
#include "stdio.h"

int _write(int file, char *ptr, int len)
{   //调用相应的串口发送函数实现重定向
    HAL_UART_Transmit(&huart1, (uint8_t*)ptr, len, HAL_MAX_DELAY);
    return len;
}
```

然后就可以愉快的使用printf()了，但是如果你如果打印浮点数就会报错，只需要根据报错提示把构建选项里的浮点数选项打开即可。

