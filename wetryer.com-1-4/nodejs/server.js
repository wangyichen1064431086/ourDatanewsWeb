var http = require('http');//����httpģ�飬����ʵ������ HTTP ��ֵ������ http

http.createServer(function (request, response) {//http.createServer()������������������ʹ��listen������8888�˿�

	// ���� HTTP ͷ�� 
	// HTTP ״ֵ̬: 200 : OK
	// ��������: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// ������Ӧ���� "Hello World"
	response.end('Hello World\n');
}).listen(8888);

// �ն˴�ӡ������Ϣ 
console.log('Server running at http://127.0.0.1:8888/');//127.0.0.1������ַ
