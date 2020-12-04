#前台模版

- https://redux-toolkit.js.org
- https://blog.csdn.net/shenzhongkang/article/details/108409377

# 前台模版

> 基于 cra-template-rb 模版，配合 create-react-app 命令，npm run eject 已生成配置项
>
> ```bash
> npx create-react-app --template cra-template-rb your-app-name
> npm run cleanAndSetup
> npm run eject
> ```

````


## Build Setup

```bash
npm install
npm start
localhost:3011

# 新建页面|组件脚本
npm run generate

# 构建
npm run build

# eslint
npm run lint

````

# 项目布局

```
.
├── config                                      // 配置项
├── internals                                   // 内部脚本
│   └── generators                              // 模板  （npm run generate）
├── public                                      // 静态打包资源
├── scripts                                     // 执行脚本
├── src                                         // 源码目录
│   │── app
│   │   ├── auth                                // 权限
│   │   ├── common                              // 项目常量
│   │   │   └── constants.js
│   ├── components                              // 组件文件
│   │   └── LoadingIndicator                    // 加载组件
│   ├── containers                              // 页面文件
|   |   ├── APP
|   |   ├── HomePage
|   |   ├── LoginPage
|   |   ├── UacPage
|   |   ├── UserPage
│   │   └── index
│   ├── locales                               // 国际化
│   ├── styles
|   |   ├── global-styles                     // 全局样式
│   │   └── media                             // 响应式媒体查询
│   ├── theme                                 // 主题
│   ├── types                                 // ts
│   ├── utils                                 // 工具
.

```

# 代码规范

```bash
# 代码校验
Elint

# 样式命名
StyleContainerDiv(Style + name + Element)

组件|页面公开方法 public + 名称

action  action + 名称

# selectors文件方法名称
makeSelect + 数据名称
```

## 第三方库

```bash
# https://github.com/mjrussell/redux-auth-wrapper  权限验证
# https://github.com/reduxjs/redux-toolkit  中间件优化redux

```
