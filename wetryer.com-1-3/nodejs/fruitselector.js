var http=require('http');//ʹ�� require ָ�������� http ģ��

http.createServer(
    function(req,res){
        console.log("[200]"+req.method+"to"+req.url);
        
        res.statusCode=200;
        res.setHeader("Content-Type","text/html");
        
        setTimeout(
            function(){
                var origin=req.headers["origin"];
                if (origin.indexOf("wetryer")>-1) {
                  res.setHeader("Access-Control-Allow-Origin",origin);
                }//ֻ�����������Origi��ͷ����ֵ����www.wetryer.comʱ������Access-Control-Allow-Origin��Ӧ��ͷ��
        
                res.write('<html><head><title>Fruit Total</title></head><body>');
                res.write('<p>');
                res.write('You seleted' +req.url.substring(1));
                res.write('</p></body></html>');
                res.end();
            },
            10000//���������յ�һ���������д���ʼ����Ӧ��ͷ����ͣ10s�������������Ӧ
        );
        
    }
).listen(8080);