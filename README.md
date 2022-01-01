# 先让react能跑起来
## createElement render

```js
import React from "react";
import ReactDOM from "react-dom";
```
为了让入口文件可以跑起来，需要`react`和`react-dom`文件，前者提供`createElement`，转化后的jsx会调用这个函数生成`虚拟Dom`，后者负责将`虚拟Dom`挂载
## 支持函数式组件与类组件

将一些UI与逻辑封装成组件，可以提高代码的复用
