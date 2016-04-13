var http=require('http');//使用 require 指令来载入 http 模块

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
                }//只有在请求包含Origi标头，且值里有www.wetryer.com时才设置Access-Control-Allow-Origin响应标头。
        
                res.write('<html><head><title>Fruit Total</title></head><body>');
                res.write('<p>');
                res.write('You seleted' +req.url.substring(1));
                res.write('</p></body></html>');
                res.end();
            },
            10000//服务器接收到一个请求后，先写入初始的响应标头，暂停10s后再完成整个响应
        );
        
    }
).listen(8080);