
String.prototype.startWith = function(str){
    if(str==null || str=="" || this.length == 0 ||str.length > this.length){	
        return false;
    }
    if(this.substring(0, str.length) === str){
            return true;
    } else {
            return false;
    }
}

String.prototype.endWith = function(str){
    if(str==null || str=="" || this.length == 0 ||str.length > this.length){	
        return false;
    }
    if(this.substring(this.length - str.length) === str){
        return true;
    } else {
        return false;
    }
}

function parse(jsonStr){
    return JSON.parse(jsonStr);
}

function uparse(jsObj){
    return JSON.stringify(jsObj);
}

function getTabSpace(num, add){
    if(!add){
        add = 0;
    }
    var tabs = "";
    for(var i = 0; i < num + add; i++){
        tabs += "	";
    }
    return tabs;
}
function echoParams(params, recIndex){
    // console.log("echoParams=" + uparse(params));
    if(!params){
        return '';
    }
    if(!recIndex){
        recIndex = 0;
    }
    var res = [];
    res.push("{");
    res.push("\n");
    var pLength = 0;
    for(var i in params.properties){
        // 由于WbfcTablePage.js中声明了翻页信息，这里可以不生成
        if(i === 'pageInfo') {
            continue;
        }
        var temp = params.properties[i];
        var def = getTabSpace(4, recIndex) + i + ": ";
        var comment = "";
        if(temp.type === 'array') {
            var recRes = '';
            // 有可能返回List<String>
            if(temp.items && temp.items.$ref && temp.model){
                recRes = echoParams(temp.model[0], recIndex + 1);
            }
            
            def += '[' + recRes +']';
        } else if(temp.type === 'object'){
            var recRes =  "";
            if(temp.model){
                recRes = echoParams(temp.model, recIndex + 1);
            }
            def += '{' + recRes + '}';
        } else {
            // 是否为翻页VO
            if(temp.$ref && temp.$ref.indexOf('#/definitions/Page«') >= 0){
                //console.log("vo:" + uparse(temp.model.properties.list.model[0]));
                var recRes = echoParams(temp.model.properties.list.model[0], recIndex + 1);
                def += '[' + recRes +']';
            } else if(temp.$ref && temp.$ref.indexOf('#/definitions/PageInfo') >= 0){
                //console.log("po:" + uparse(temp));
                // 翻页PO
                var recRes =  "";
                if(temp.model){
                    recRes = echoParams(temp.model, recIndex + 1);
                }
                def += '{' + recRes + '}';
            } else {
                def += "''";
            }
        }
        def += '#sub#';
        if(temp.description){
            // decodeURI是因为有些中文字符会莫名的乱码
            comment += (" // " + decodeURI(temp.description));
        }
        res.push(def + comment);
        res.push("\n");
        pLength++;
    }
    // 最后的逗号位= 2 + (2 * pLength) - 2 = 2*pLength
    var lastLine = res[2*pLength];
    // 如果返回值是Page对象或类型为array都需要增加splice
    if(((params.properties.result && params.properties.result.$ref && params.properties.result.$ref.indexOf('#/definitions/Page«') >= 0 ) || params.properties.result && params.properties.result.type === 'array')&& lastLine.indexOf('}]#sub#') > 0){
        // 为最后为array元素结尾的增加splice
        res[2*pLength] = lastLine.replace('#sub#', '.splice(1, 1)');
    } else {
        // 删除最后元素结尾的多余逗号
        res[2*pLength] = lastLine.replace('#sub#', '');
    }
    
    if(recIndex > 0){
        res.push(getTabSpace(3 + recIndex) + "}");
    } else {
        res.push(getTabSpace(3) + "}");
    }
    
    return res.join('').replace(/#sub#/g, ',');
}

var param = {
	"type": "object",
	"properties": {
		"code": {
			"type": "string",
			"description": "返回码，默认000，为正常。其他参见返回码表。"
		},
		"msg": {
			"type": "string",
			"description": "返回消息，默认为null。一般会返回错误消息提示。"
		},
		"result": {
			"type": "array",
			"description": "返回结果，默认为null。",
			"items": {
				"type": "string"
			},
			"model": [null]
		}
	}
}
console.log(echoParams(param));
