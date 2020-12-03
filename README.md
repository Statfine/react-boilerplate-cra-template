# 前台模版

> 基于 react-boilerplate-cra-template，npm run eject 已生成配置项

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3011
npm start

# creat page template
npm run generate

# build for production with minification
npm run build

# code standard
npm run lint

```

## 项目概述

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
│   │   └── LoadingIndicator                     // 加载组件
│   ├── containers                              // 页面文件
|   |   ├── APP
|   |   ├── HomePage
|   |   ├── LoginPage
|   |   ├── UacPage
|   |   ├── UserPage
│   │   └── index
│   ├── locales                               // 国际化
│   ├── styles                                // 全局样式
│   ├── theme                                 // 主题
│   ├── types                                 // ts
│   ├── utils                                   // 工具

.

```

## 代码规范

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
