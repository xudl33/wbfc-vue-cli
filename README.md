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
覆盖生成配置文件
```code
wbfc init -v
```
覆盖install`wbfc-vue-components`组件库
```code
wbfc init -c
```
init命令会生成`wbfc-vue.json`文件。
```json
{
    "host": "192.168.20.188",
    "port": "6806",
    "path": "/v2/api-docs",
    "generatePath": "src/views",
    "genUrls": {
    }
}
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
覆盖生成Vue组件
```code
wbfc gen -v
```
gen命令会生成`ActionPaths.json`文件, 以及`xxx.vue`组件文件。
```json
{
    "SECURITY_I_USER_INSERT": "security:/i/user/insert",
    "SECURITY_I_USER_USERALLLIST": "security:/i/user/userAllList"
}
```
IUserInsert.vue
```vue
<template>
	<div>
		<div>
			<el-form :model="po" :rules="rules" ref="dataForm" label-width="100px">
				<el-form-item label="是否通过审核" prop="authFlag">
					<el-input v-model="po.authFlag"></el-input>
				</el-form-item>
				<el-form-item label="有效期" prop="availableDate">
					<el-date-picker type="date" placeholder="选择日期" v-model="po.availableDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="po.email"></el-input>
				</el-form-item>
				<el-form-item label="用户id" prop="id">
					<el-input v-model="po.id"></el-input>
				</el-form-item>
				<el-form-item label="登录名" prop="loginName">
					<el-input v-model="po.loginName"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="po.mobile"></el-input>
				</el-form-item>
				<el-form-item label="用户父id" prop="parentId">
					<el-input v-model="po.parentId"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="po.password"></el-input>
				</el-form-item>
				<el-form-item label="用户类型" prop="userType">
					<el-input v-model="po.userType"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import WbfcForm from 'wbfc-vue-components/WbfcForm';
import WbfcUtils from 'wbfc-vue-components/WbfcUtils';
import ActionPaths from '@/../ActionPaths'
export default {
	name: 'IUserInsert',
	mixins: [WbfcForm],
	data() {
		return {
			id: WbfcUtils.generateId() + '_' + 'IUserInsert', // id
			url: ActionPaths.SECURITY_I_USER_INSERT, // 接口地址
			po: {
				authFlag: '', // 是否通过审核
				availableDate: '', // 有效期,为空则长期有效
				email: '', // 邮箱
				extend: {}, // 拓展结构,根据具体拓展实体设置,若设置此项则id不能为空
				id: '', // 用户id 若extend非空,则id也非空
				loginName: '', // 登录名 非空
				mobile: '', // 手机
				parentId: '', // 用户父id 若该项不为空，则且userType为空时，默认设置2
				password: '', // 密码 非空
				userType: '' // 用户类型 若设置为2,则parentId必填
			},
			rules: {
				loginName: [
					{ required:true, message: '登录名必填', trigger: 'blur'}
				],
				password: [
					{ required:true, message: '密码必填', trigger: 'blur'}
				]
			},
			vo: {
				code: '', // 返回码，默认000，为正常。其他参见返回码表。
				msg: '', // 返回消息，默认为null。一般会返回错误消息提示。
				result: '' // 返回结果，默认为null。
			}
		};
	}
}
</script>
```
IUserUserAllList.vue
```vue
<template>
	<div>
		<div>
			<el-table :data="vo.result" ref="dataTable" border>
				<el-table-column prop="activeFlag" label="activeFlag" align="center">
				</el-table-column>
				<el-table-column prop="authFlag" label="authFlag" align="center">
				</el-table-column>
				<el-table-column prop="availableDate" label="availableDate" align="center">
				</el-table-column>
				<el-table-column prop="clientId" label="clientId" align="center">
				</el-table-column>
				<el-table-column prop="createDate" label="createDate" align="center">
				</el-table-column>
				<el-table-column prop="email" label="email" align="center">
				</el-table-column>
				<el-table-column prop="loginFlag" label="loginFlag" align="center">
				</el-table-column>
				<el-table-column prop="loginName" label="loginName" align="center">
				</el-table-column>
				<el-table-column prop="mobile" label="mobile" align="center">
				</el-table-column>
				<el-table-column prop="newExtend" label="newExtend" align="center">
				</el-table-column>
				<el-table-column prop="openId" label="openId" align="center">
				</el-table-column>
				<el-table-column prop="parentId" label="parentId" align="center">
				</el-table-column>
				<el-table-column prop="remarks" label="remarks" align="center">
				</el-table-column>
				<el-table-column prop="updateDate" label="updateDate" align="center">
				</el-table-column>
				<el-table-column prop="userType" label="userType" align="center">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
import WbfcTable from 'wbfc-vue-components/WbfcTable';
import WbfcUtils from 'wbfc-vue-components/WbfcUtils';
import ActionPaths from '@/../ActionPaths'
export default {
	name: 'IUserUserAllList',
	mixins: [WbfcTable],
	data() {
		return {
			id: WbfcUtils.generateId() + '_' + 'IUserUserAllList', // id
			url: ActionPaths.SECURITY_I_USER_USERALLLIST, // 接口地址
			po: {
				activeFlag: '', // 是否激活 0:否 1:是
				authFlag: '', // 是否通过审核 0:否 1:是
				availableDateEnd: '', // 有效期结束
				availableDateStart: '', // 有效期开始
				email: '', // 邮箱
				loginFlag: '', // 是否允许登陆 0:否 1:是
				loginName: '', // 登录名
				mobile: '', // 手机号
				remarks: '', // 备注
				userType: '' // 用户类型 0:管理员 1:用户帐户 2:用户子账户 3:客服4:采样人员
			},
			vo: {
				code: '', // 返回码，默认000，为正常。其他参见返回码表。
				msg: '', // 返回消息，默认为null。一般会返回错误消息提示。
				result: [{
					activeFlag: '',
					authFlag: '',
					availableDate: '',
					clientId: '',
					createDate: '',
					email: '',
					extend: {},
					id: '',
					loginFlag: '',
					loginName: '',
					mobile: '',
					newExtend: '',
					openId: '',
					parentId: '',
					remarks: '',
					updateDate: '',
					userType: ''
				}].splice(1, 1) // 返回结果，默认为null。
			}
		};
	}
}
</script>
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
  gen            generater wbfc-vue compenents and ActionPaths.json static constant paths JSON file with wbfc-vue.json config
  wait           spanner
  help [cmd]     display help for [cmd]
```

## 数据校验
在一些需要特定参数或表单数据的接口中，会使用到校验，一般服务端常用的校验规则会使用到`wbfc`框架中的`check`注解。若需要使用脚手架生成前端用的校验规则，就需要写`SwaggerUI的`注解`@ApiModelProperty`。

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
1.0.5 | 2018/12/11 | 修正isTable和isPage添加参数不正确的问题;增加WbfcDicts数据字典相关功能
1.0.6 | 2018/12/11 | 增加了README的demo代码;增加了README数据字典的相关说明
1.0.7 | 2018/12/11 | 修正模板生成的模板scope设置不正确的问题
1.0.8 | 2018/12/11 | 增加了ActionPaths配置，提出url参数到ActionPaths为常量
1.0.9 | 2018/12/28 | 修正了返回值为List<基本类型>时，gen命令报错的问题；增加gen时重复文件跳过并生成下一个文件的功能
1.1.0 | 2019/01/10 | 修正当为page页面时，table不能自动生成的问题
1.1.1 | 2019/01/10 | 修正当为page页面生成的table列中若有有效性的会把整个备注显示出来的问题