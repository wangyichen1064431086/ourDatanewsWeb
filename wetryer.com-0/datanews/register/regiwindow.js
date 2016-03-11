
/****************关闭按钮的交互效果*******************/
var closeButton=document.querySelector("#close");

closeButton.addEventListener("mouseenter",changeStyle);
closeButton.addEventListener("mouseleave",changeStyle);


function changeStyle(e) {
    if (e.type=="mouseenter") {
        closeButton.style.setProperty("background-color","#9CCD64");
    }
    else if (e.type=="mouseleave") {
        closeButton.style.setProperty("background-color","white");
    }
 }

closeButton.onclick=function(){
window.parent.document.getElementById("changeDiv").style.display="none";
}


/***********登陆Ajax*********/
document.getElementById("mylogin").onclick=handleLogin;

var htr1;

function handleLogin(e) {
    //alert("love");
    e.preventDefault();
    
    var form1=document.getElementById("idpwform");
    
    var formData1="";
    var inputElements1=document.getElementsByTagName("input");
    for (var i=0;i<inputElements1.length;i++) {
        if (inputElements1[i].type!="radio") {
            formData1+=inputElements1[i].name+"="+inputElements1[i].value+"&";
        }
        else{
            if (inputElements1[i].checked) {
                formData1+=inputElements1[i].name+"="+inputElements1[i].value+"&";
            }
        }
        
    }
    
    htr1=new XMLHttpRequest();
    //alert(htr1);
    htr1.onreadystatechange=myResponse;
    htr1.open("POST",form1.action,false);
    htr1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置请求标头，告诉服务器准备接受哪一种数据格式。
    htr1.send(formData1);
    //alert(htr1);
}

function myResponse() {
    if (htr1.readyState==4) {
        if ((htr1.status>=200&&htr1.status<300)||htr1.status==304) {
            window.parent.document.getElementById("regi").innerHTML=htr1.responseText;
            window.parent.document.getElementById("changeDiv").style.setProperty("display","none");
            
            var welcomeValue=htr1.responseText;
            var cookieName=inputElements1[0].name;//identity
            var cookieValue=inputElements1[0].value;
            CookieUtil.set(cookieName,cookieValue);
            alert(CookieUtil.get(cookieName));
        }
        else{
            window.parent.document.getElementById("regi").innerHTML="Unsuccessfull ";
            window.parent.document.getElementById("changeDiv").style.setProperty("display","none");
            //alert("unsuccessful");
        }
        
    }
}


/*********************读写cookie******************************/
var CookieUtil={
    get:function(name){
        var cookieName=encodeURIComponent(name)+"=";
        var cookieStart=document.cookie.indexOf(cookieName);
        var cookieValue=null;
        
        if (cookieStart>-1) {
            var cookieEnd=document.cookie.indexOf(";",cookieStart);
            if (cookieEnd==-1) {
                cookieEnd=document.cookie.length;
            }
            cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
        }
        
        return cookieValue;
    },
    
    set:function(name,value,expires,path,domain,secure){
        var cookieText=encodeURIComponent(name)+"="+encodeURIComponent(value);
        
        if (expires instanceof Date) {
            cookieText+="; expires="+expires.toGMTString();
        }
        
        if (path) {
            cookieText+="; path="+path;
        }
        
        if (domain) {
            cookieText+=";domain="+domain;
        }
        
        if (secure) {
            cookieText+=";secure";
        }
        
        document.cookie=cookieText;
    },
    
    unset:function(name,path,domain,secure){
        this.set(name,"",new Date(0),path,domain,secure);
    }
};



