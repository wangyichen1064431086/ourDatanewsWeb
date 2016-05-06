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
                    addUser(db,req,res);
                    break;
            }
            break;
            
    }
});
server.listen(3000,'www.wetryer.com');

function addUser(db,req,res) {
    var newData='';
    req.setEncoding('utf8');
    req.on(
        'data',//数据每传一个出发一次'data'事件
        function(chunck){
            newData+=chunck;
        }
    );
    req.on(
        'end',//数据传输完后出发'end'事件
        function () {
            var data=qs.parse(newData);//解析接收的数据字符串为对象类型
            db.query(
                "INSERT INTO userInfo(nickname,identity,password,gender,birthDay) "+
                " VALUES(?,?,?,?,?)",
                [data.nickname,data.identity,data.password,data.gender,data.birthDay],
                function (err) {
                    if (err) {
                        throw err;
                    }
                    else{
                        console.log("seccussful");
                        var html='<p>注册成功</p>'
                        toBrowser(res,html);
                    }
                }
            )
        }
    )
}

function toBrowser(res,htmldata) {//定义发送回浏览器数据的函数
    res.setHeader('Content-Type','text/html;charset=utf8');
    res.setHeader('Content-Length',Buffer.byteLength(htmldata));
    res.end(htmldata);
}
