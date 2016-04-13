var http = require('http');//载入http模块，并将实例化的 HTTP 赋值给变量 http

http.createServer(function (request, response) {//http.createServer()方法创建服务器，并使用listen方法绑定8888端口

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息 
console.log('Server running at http://127.0.0.1:8888/');//127.0.0.1本机地址
