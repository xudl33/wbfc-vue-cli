# wbfc-vue-cli

> 智源云Vue脚手架

`wbfc-vue-cli`是一个基于`wbfc`架构的vue脚手架。它可以利用服务端接口文档`SwaggerUI`中的链接，自动生成接口对应的`Table`、`Pagination`和`Form`等组件。生成的Vue组件有着统一的依赖 [wbfc-vue-components(智源云组件库)](https://github.com/xudl33/wbfc-vue-components)

## 安装
```code
npm install wbfc-vue-cli -g
```

## Demo

1. 初始化脚手架配置模板
```code
wbfc init
```
2. 填写需要生成的配置文件
```json
{
    "host": "192.168.20.188",
    "port": "6806",
    "path": "/v2/api-docs",
    "generatePath": "src/views",
    "genUrls": {
        "security": [{
            "url": "/i/user/insert",
            "isForm": true,
            "folder": "security"
        },{
            "url": "/i/user/userAllList",
            "folder": "security"
        }],
        "system": [],
        "files": []
    }
}
```
3. 生成URL对应的Vue组件
```code
wbfc gen
```

## 使用
```code
wbfc
Usage: wbfc <command> [options]
Options:
  -V, --version  output the version number
  -h, --help     output usage information
Commands:
  init           create a new wbfc-vue's config file named wbfc-vue.json and download required wbfc-vue-components
  gen            generater wbfc-vue compenents with wbfcvue.json config
  wait           spanner
  help [cmd]     display help for [cmd]
```

## Versions
版本|更新时间|更新说明
---|---|---
1.0.0 | 2018/12/05 | 完成`wbfc-vue-cli`的基础功能
1.0.1 | 2018/12/06 | 增加README.md
1.0.2 | 2018/12/06 | `wbfc-components`更名为`wbfc-vue-components`
1.0.3 | 2018/12/06 | 修正模板替换`wbfc-vue-components`不正确的问题
1.0.4 | 2018/12/07 | 修正读取配置文件为当前目录的错误