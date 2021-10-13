# loadpage-轻量级页面加载js

- 一款轻量级的页面加载器,可自定义动画以及加载样式

- 在线演示：https://lovefc.gitee.io/loadpage/test


**如何使用：** 
- ` 
let load = new loadpage({ delayTime: 3000});
load.loading();	`

**配置参数：** 

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| delayTime | 否  |int | 执行时间,单位毫秒,默认3000   |
| loadMode  | 否  |string | 加载方式,part(局部,也就是dom渲染完),all(等待图片等资源)   |
| divHtml | 否  | string | 渲染的html,自定义样式时候使用   |
| loadCss | 否  | string | 要加载的css样式   |
| animateCss | 否  | string | 要加载的动画样式   |
| animateName | 否  | string | 要执行的动画名称   |

**作者备注**
- 如果发现问题，欢迎向我反馈，毕竟一个人测试有限，会有注意不到的地方。
- 作者QQ：1102952084
- 作者博客：lovefc.cn














