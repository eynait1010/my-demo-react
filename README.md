# 先让react能跑起来
## createElement render

```js
import React from "react";
import ReactDOM from "react-dom";
```
为了让入口文件可以跑起来，需要`react`和`react-dom`文件，前者提供`createElement`，转化后的jsx会调用这个函数生成`虚拟Dom`，后者负责将`虚拟Dom`挂载
## 支持函数式组件与类组件

将一些UI与逻辑封装成组件，可以提高代码的复用

## 类组件的更新
1. props改变
2. setState

## 批量更新
为了提高性能，把多个setState()调用批量更新视图，所以setState更新是异步的；但是使用setTimeout等异步更新setState时，就没有了批量更新，所以setState更新是同步的，emm好奇怪。但是这个很简单的，就是在函数调用的时候，通过控制改变`isBatchingUpdate`的值，达到异步更新的效果，但是如果本身就是异步函数，就没有改变这个值，所以就变成同步的了。可以抽象成：
react为了保性能，在它能控制的范围内，用同步更新；一旦本身就是异步操作，不在react控制范围，就是同步更新了

## 合成事件
合成事件有两个作用：
1. 可以在这一层做兼容性处理
2. 可以控制`isBatchingUpdate`从而批量更新
3. 使用事件委托//TODO:
    这会带来一个问题，当发生了事件委托，冒泡已经完成了，所以要实现模拟冒泡和阻止模拟冒泡的API

## ref与forwardRef
在生命周期中保持不变