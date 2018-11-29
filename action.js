var http = require('http');

function action(options) {
    // 用于请求的选项
    /*var options = {
        host: 'localhost',
        port: '6806',
        path: '/v2/api-docs'  
    };*/
    var _this = this;
    
    // 处理响应的回调函数
    var callback = function(response){
        // 不断更新数据
        var body = '';
        response.on('data', function(data) {
        body += data;
        });
        
        response.on('end', function() {
        // 数据接收完成
        if(options.success){
            options.success.apply(_this, [body, options]);
        }
        //console.log(body);
        });
    }
    // 向服务端发送请求
    var req = http.request(options, callback);
    req.end();
}

module.exports = {
    action
}