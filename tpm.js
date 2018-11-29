var act = require('./action');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

var genUrl = {
	security: [
		//"/i/user/userList", 
		//"/i/user/userAllList",
		{
			url: '/swaggerTest',
			isForm: true
		}
	]
};

act.action({
	host: '192.168.20.188',
	port: '6806',
	path: '/v2/api-docs',
	success: function(body){
		var apiDocs = JSON.parse(body);
		//console.log(body);
		generator(apiDocs);
		//generatorTest();
	}
});

function findParamsBody(parameters){
	var res;
	if(parameters){
		for(var i in parameters){
			if(parameters[i].in === 'body'){
				res = parameters[i];
				break;
			}
		}
	}
	return res;
}

function findResponseBody(responses){
	if(responses){
		return responses['200'];
	}
	return;
}

function generator(apiDocs){
	for(var i in genUrl){
		var n = genUrl[i];
		n.forEach((m, j) =>{
			//console.log(apiDocs.paths[n]);
			var genNode = null;
			var tarUrl = null;
			if( typeof m === 'string'){
				tarUrl = m;
				genNode = apiDocs.paths[m];
			} else {
				tarUrl = m.url;
				genNode = apiDocs.paths[m.url];
			}
			
			if(genNode){
				var operationId = "";
				var method = "post";

				// 默认方法为post，没有的话用get
				if(!genNode.post){
					method = "get";
				}
				// id
				//operationId = genNode[method].operationId;
				operationId = tarUrl.replace(/\//g, '_').replace(/_[\w]/g, function(r){return r.substring(1).toUpperCase()});
				// 入参
				var param = findParamsBody(genNode[method].parameters);
				// 返回值
				var ret = findResponseBody(genNode[method].responses);

				let config = {
					url: i + ":" + tarUrl, // 动态url ‘xxx:’开头
					operationId: operationId, // id
					param: param, // 参数值po
					ret: ret, // 返回值vo
					definitions: apiDocs.definitions, // 依赖项列表
					isForm: m.isForm // 是否为form表单
				};

				//console.log(JSON.stringify(config));

				
				const fPath = path.join(process.cwd(), operationId + '.vue');
				const tplPath = path.join(__dirname, './tpl.ejs');
				const str = ejs.render(fs.readFileSync(tplPath, 'utf-8'), config, {outputFunctionName: "echo"});
				if (fse.pathExists(fPath)) {
					// 文件路径存在则先删除原文件
					fse.removeSync(fPath);
				}
				// 确保文件被创建
				fse.ensureFileSync(fPath);
				fs.writeFileSync(fPath, str);
				console.log(tarUrl + ` 生成完成：${fPath}`);
			}
		});
	}
	
}

function generatorTest(){
	let config = {
		url: '/i/menu/list',
		operationId: 'menuListUsingPOST',
		param: {
			"in": "body",
			"name": "menuUpdatePo",
			"description": "menuUpdatePo",
			"required": true,
			"schema": {
				"$ref": "#/definitions/MenuUpdatePo"
			}
		},
		ret: {
			"description": "OK",
			"schema": {
				"$ref": "#/definitions/ResultPoJo«object»"
			}
		},
		definitions: {
		}
	};
	const tplPath = path.join(__dirname, './tpl.ejs');
	const str = ejs.render(fs.readFileSync(tplPath, 'utf-8'), config, {outputFunctionName: "echo"});
	if (fse.pathExists(fPath)) {
		// 文件路径存在则先删除原文件
		fse.removeSync(fPath);
	}
	// 确保文件被创建
	fse.ensureFileSync(fPath);
	fs.writeFileSync(fPath, str);
	console.log(`生成位置：${fPath}`);
}