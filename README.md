**loadpage-轻量级页面加载js**

- 一款轻量级的页面加载器,可自定义动画以及加载样式

- 使用简单,操作自由,支持webpack打包使用,创建属于自己的加载动画

- 在线演示：https://lovefc.gitee.io/loadpage/test

![演示动画](./demo.gif)

**如何使用：** 
- `new loadpage({ delayTime: 3000}).loading();`

**案例展示：** 

* [默认加载](https://loadpage.lovefc.cn/test/index.html)
* [win样式加载](https://loadpage.lovefc.cn/test/win.html)
* [自触发加载](https://loadpage.lovefc.cn/test/custom.html)

**配置参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| delayTime | 否  |int | 执行时间,单位毫秒,默认3000   |
| loadMode  | 否  |string | 加载方式,part(局部,也就是dom渲染完),all(等待图片等资源)   |
| divHtml | 否  | string | 渲染的html,自定义样式时候使用   |
| themeCss | 否  | string | 要加载的css样式   |
| animateName | 否  | string | 要执行的动画名称   |
| defaultCss | 否  | string | 默认加载的样式,大可不必更改   |
| loadID | 否  | string | 默认加载的id名称,大可不必更改   |

**作者备注**
- 如果发现问题，欢迎向我反馈，毕竟一个人测试有限，会有注意不到的地方。
- 作者QQ：1102952084
- 作者博客：lovefc.cn














