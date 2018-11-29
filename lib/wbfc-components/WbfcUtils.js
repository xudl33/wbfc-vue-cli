'use strict';

function isObj(object) {
    return object && typeof(object) === 'object' && Object.prototype.toString.call(object).toLowerCase() === "[object object]";
}

function isArray(object) {
    return object && typeof(object) === 'object' && object.constructor === Array;
}

function getLength(object) {
    var count = 0;
    for(var i in object) count++;
    return count;
}

function compare(obj1, obj2){
	var t1 = typeof obj1;
	var t2 = typeof obj2;
	// 类型不同返回false
	if (t1 !== t2) {
		return false;
	}
	// 字符串或数字直接判断就行
	if (t1 === 'string' || t1 === 'number') {
		return obj1 === obj2;
	}
	// 如果是对象有两种情况
	if (t1 === 'object') {
		var l1 = getLength(obj1);
		var l2 = getLength(obj2);
		if (l1 !== l2) {
			return false;
		}
		var a1 = isArray(obj1);
		var a2 = isArray(obj2);
		// 数组需要递归判断
		if(a1 && a2){
			var lpRec = true;
			for (var i = 0; i < obj1.length; i++) {
				lpRec = compare(obj1[i], obj2[i]);
				if(!lpRec){
					break;
				}
			}
			return lpRec;
		} else {
			// JSON需要递归全部属性才能判断是否相同
			var lpRec = true;
			for (var i in obj1) {
				lpRec = compare(obj1[i], obj2[i]);
				if(!lpRec){
					break;
				}
			}
			return lpRec;
		}
	}
	return obj1 === obj2;
}

function removeArrayItem(array, val){
	// 如果是数字 就按下标删除
	if (typeof val === 'number') {
		array.splice(val, 1);
	} else {
		var res = array;
		var delIdx;
		for(var line in res){
			if(compare(val, res[line])){
				delIdx = line;
				break;
			}
		}
		if(delIdx){
			array.splice(delIdx, 1);
		}
	}
}

function generateId() {
  return Math.floor(Math.random() * 10000);
}

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

export default {
    isObj,
    isArray,
    getLength,
    compare,
    removeArrayItem,
    generateId
}