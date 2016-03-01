var http=require('http');
var mysql=require('mysql');
var qs=require('querystring');

var db=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'12345',
    database:'datanews'
});


var server=http.createServer(function(req,res){
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/':
                    var contentType=req.headers["content-type"];//读取请求头的Content-Type字段
                    if (contentType) {
                        if (contentType.indexOf("application/x-www-form-urlencoded")>-1) {
                            addUser(db,req,res);
                        }
                        else{
                            console.log('ContentType is not application/x-www-form-urlencoded')
                        }
        
                    }
                    else{
                        console.log('no contentType')
                    }
                  
                    break;
            }
            break;
            
    }
});
server.listen(3000,'www.wetryer.com');

function addUser(db,req,res) {
    var fullBody='';
    var dataObj=new Object();
    req.setEncoding('utf8');
    req.on(
        'data',//数据每传一个出发一次'data'事件
        function(chunk){
            fullBody+=chunk.toString();
            console.log(fullBody);
        }
    );
    req.on(
        'end',//数据传输完后出发'end'事件
        function () {
            var dBody=qs.parse(fullBody);//解析接收的数据字符串为对象类型
            console.log(dBody);
            dataObj.nickname=dBody["nickname"];
            dataObj.identity=dBody["identity"];
            dataObj.password=dBody["password"];
            dataObj.gender=dBody["gender"];
            dataObj.birthDay=dBody["birthDay"];
            console.log(dataObj);
            db.query(
                "INSERT INTO userInfo(nickname,identity,password,gender,birthDay) "+
                " VALUES(?,?,?,?,?)",
                [dataObj.nickname,dataObj.identity,dataObj.password,dataObj.gender,dataObj.birthDay],
                function (err) {
                    if (err) {
                        throw err;
                    }
                    else{
                        console.log("seccussful");
                        toBrowser(res);
                    }
                }
            )
        }
    )
}

function toBrowser(res) {//定义发送回浏览器数据的函数
    res.writeHead(//写响应头
        200,
        "OK",
        {
            "Content-Type":"text/html",
            "Access-Control-Allow-Origin":"http://www.wetryer.com"
        }
    );
    res.write('<html><head><title>success</title></head><body><p>注册成功</p></body></html>');
    res.end();
}
