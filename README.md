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

## 数据校验
在一些需要特定参数或表单数据的接口中，会使用到校验，一般服务端常用的校验规则会使用到`wbfc`框架中的`check`注解。若需要使用脚手架生成前端用的校验规则，就需要写`swaggerUI的`注解`@ApiModelProperty`。

### Demo
PO
```java

import com.wisea.cloud.model.annotation.Check;

import io.swagger.annotations.ApiModelProperty;

public class VueCliTestPo {
    @ApiModelProperty(value = "必填", required = true)
    @Check(test = "required")
    private String req;
    @ApiModelProperty(value = "混合长度域包含", allowableValues = "mixLength:[1,4]")
    @Check(test = {"minLength", "maxLength"}, mixLengthRange = {1, 4})
    private String mixRangeCnt;
    @ApiModelProperty(value = "混合长度域不包含", allowableValues = "mixLength:(1,4)")
    @Check(test = {"minLength", "maxLength"}, mixLengthRange = {2, 3})
    private String mixRangeRej;
    @ApiModelProperty(value = "混合长度域左包含右不包含", allowableValues = "mixLength:[1,4)")
    @Check(test = {"minLength", "maxLength"}, mixLengthRange = {1, 3})
    private String mixRangeLCnt;
    @ApiModelProperty(value = "混合长度域右包含左不包含", allowableValues = "mixLength:(1,4]")
    @Check(test = {"minLength", "maxLength"}, mixLengthRange = {2, 4})
    private String mixRangeRCnt;
    @ApiModelProperty(value = "混合长度最小", allowableValues = "mixLength:[1,]")
    @Check(test = {"minLength"}, mixLength = 1)
    private String mixMin;
    @ApiModelProperty(value = "混合长度最大", allowableValues = "mixLength:(,4]")
    @Check(test = {"maxLength"}, mixLength = 4)
    private String mixMax;

    @ApiModelProperty(value = "长度域", allowableValues = "length:[1,4]")
    @Check(test = {"minLength", "maxLength"}, lengthRange = {1, 4})
    private String lgt;
    @ApiModelProperty(value = "有效性", allowableValues = "liveable:1,2,3")
    @Check(test = {"liveable"}, liveable = {"1", "2", "3"})
    private String lva;
    @ApiModelProperty(value = "正则表达式", allowableValues = "regex:^(-?\\d+)(.\\d+)?$")
    @Check(test = {"regex"}, regex = "^(-?\\d+)(.\\d+)?$")
    private String reg;
    

	// Getters and Setters
   // ...
}
```

VO

```java

import io.swagger.annotations.ApiModelProperty;

public class DictTestVo {

    @ApiModelProperty(value = "激活标准", allowableValues = "dict:active_flag")
    private String active;

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

}
```

### 属性
名称|类型|说明
---|---|---
value|String|属性的注释说明
required|boolean|是否为必填项
allowableValues|String(xxx:见下文allowableValues)|允许的值

#### AllowableValues:
名称|说明
----|----
mixLength|中英文混合支付长度 方括号`[]`=包含，小括号`()`=不包含，间隔必须以逗号`,`分隔
length|字符串长度 方括号`[]`=包含，小括号`()`=不包含，间隔必须以逗号`,`分隔
liveable|有效性 多个时必须以逗号`,`分隔
regex|正则表达式
dict|数据字典

## Versions
版本|更新时间|更新说明
---|---|---
1.0.0 | 2018/12/05 | 完成`wbfc-vue-cli`的基础功能
1.0.1 | 2018/12/06 | 增加README.md
1.0.2 | 2018/12/06 | `wbfc-components`更名为`wbfc-vue-components`
1.0.3 | 2018/12/06 | 修正模板替换`wbfc-vue-components`不正确的问题
1.0.4 | 2018/12/07 | 修正读取配置文件为当前目录的错误
1.0.5 | 2018/12/11 | 修正isTable和isPage添加参数不正确的问题;增加WbfcDicts数据字典相关功能；
1.0.6 | 2018/12/11 | 增加了README的demo代码;增加了README数据字典的相关说明;
1.0.7 | 2018/12/11 | 修正模板生成的模板scope设置不正确的问题;