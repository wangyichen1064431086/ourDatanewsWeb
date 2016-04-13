/***********************跨浏览器的事件处理对象************************/
var EventUtil={
    addHandler:function(element,type,handler){
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on"+type,handler);
        }
        else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function(element,type,handler){
        if (element.removeEventListener) {
            element.removeEventListener(type,handler,false);
        }
        else if (element.detachEvent) {
            element.detachEvent("on"+type,handler);
        }
        else{
            element["on"+type]=null;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    preventDefault:function(event){
        if (event.preventDefault) {
            event.preventDefault();
        }
        else{
            event.returnValue=false;
        }
    },
    getTarget:function(event){
        return event.target?event.target:event.srcElement;
    },
    stopPropagation:function(event){
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else{
            event.cancelBubble=true;
        }
    }
};
	


/**********************************导航栏 纯手写（也可用bootstrap框架的nav）***************************************/
var navoptions=document.getElementsByClassName("navoption");
var dropdown=document.getElementsByClassName("dropdown")[0];
for(var i=0;i<navoptions.length;i++){
    if (i==2) {
        navoptions[i].onmouseenter=chColorShowSub;
        //navoptions[i].onmouseleave=reColorHideSub;
    }
    else{
        navoptions[i].onmouseenter=changeColor;//注意这里不能用onmouseover和onmouseout,因为这样的话其后代元素会单独再触发一遍
        navoptions[i].onmouseleave=recoverColor;
    }
}

function chColorShowSub(e) {
    e.target.style.background='#228B22';
   // dropdown.style.removeProperty('display');//为何不行？？ //dropdown.style.display='none';也不行
    dropdown.style.setProperty("display","block");
  
}

function changeColor(e) {
    e.target.style.background='#228B22';
    navoptions[2].style.setProperty("background-color","#9CCD64");
    dropdown.style.setProperty("display","none");
}

function recoverColor(e) {
    e.target.style.removeProperty('background');
   
}

if (dropdown.style.display!='none') {
    dropdown.onmouseleave=reColorHideSub;//从子菜单移走时，该子菜单消失，母标题恢复非触发颜色
    var dropoptions=document.querySelectorAll(".dropdown>li");
    for(var j=0;j<dropoptions.length;j++){
        dropoptions[j].onmouseenter=changeSubColor;
        dropoptions[j].onmouseleave=recoverSubColor;
    }
}

function reColorHideSub(e) {

    navoptions[2].style.removeProperty('background');
    e.target.style.setProperty("display","none");
}

function changeSubColor(e) {
    e.target.style.setProperty("background-color","#228B22");
}

function recoverSubColor(e) {
    e.target.style.setProperty("background-color","#9CCD64");
}



/***************************检测localStorage的welcome*****************************/
if (localStorage.getItem("welcome")) {//已在其他页面登陆，则每个页面都显示用户昵称
    document.getElementById("regi").innerHTML=localStorage.getItem("welcome");
}

window.onunload=function(){
    if (localStorage.getItem("welcome")) {
        localStorage.removeItem("welcome");
    }
}


/****************************************文章类型列表*************************************/
var articleOptions=document.querySelectorAll(".articleMenu li");
var articleContent=document.getElementById("articleContent");
//Dom污染法

for(var i=0,len=articleOptions.length;i<len;i++){
    articleOptions[i].index=i;
    articleOptions[i].onclick=function(){
      this.style.setProperty("background-color","#9CCD64");
      for(var i=0;i<len;i++){
            if (i!=this.index) {
                articleOptions[i].style.setProperty("background-color","lightgray");
            }
        }
        
      switch (this.index) {
            case 0:
                articleContent.src="../newsOverview/index/index.html";
                break;
            case 1:
                articleContent.src="../workAppreciation/index/index.html";
                break;
            case 2:
                articleContent.src="../treasureHunt/index/index.html";
                break;
            default:
                articleContent.src="../newsOverview/index/index.html";
        }
       EventUtil.addHandler(articleContent,"load",initIframeHeight);
      //先加载完iframe内容，再动态调整iframe的高。因为iframe的加载是非阻塞的，故要这么写。
    };
}
            /*****************iframe自适应高度设置*******************/
/*
document.body.onclick=initIframeHeight;
*/

function initIframeHeight(){
    //var height=document.defaultView.getComputedStyle(articleContent,null).height;//height为css中为iframe设置的高度
    var realHeight=articleContent.contentDocument.body.scrollHeight;
    console.log("iframe's realHeight:"+realHeight);
    
    
    articleContent.style.height=String(realHeight)+"px";

    console.log(articleContent.style.height);
}


/*********************************登录弹窗****************************************/
var regiBlock=document.getElementById("changeDiv");
var regiButton=document.getElementById("beforeRegi");
regiButton.onclick=function(e){
    regiBlock.style.setProperty("display","block");
}


/**************************读取localStorage的readGoto，激活相应按钮，载入相应iframe*******************************/
var readGotoValue=localStorage.getItem("readGoto");
//var articleContent=document.getElementById("articleContent");


//两种js的switch语句写法：
switch (readGotoValue) {
    case "option0":
        articleOptions[0].style.setProperty("background-color","#9CCD64");
        articleOptions[1].style.setProperty("background-color","lightgray");
        articleOptions[2].style.setProperty("background-color","lightgray");
        articleContent.src="../newsOverview/index/index.html";
        break;
    case "option1":
        articleOptions[0].style.setProperty("background-color","lightgray");
        articleOptions[1].style.setProperty("background-color","#9CCD64");
        articleOptions[2].style.setProperty("background-color","lightgray");
        articleContent.src="../workAppreciation/index/index.html";
        break;
    case "option2":
        articleOptions[0].style.setProperty("background-color","lightgray");
        articleOptions[1].style.setProperty("background-color","lightgray");
        articleOptions[2].style.setProperty("background-color","#9CCD64");
        articleContent.src="../treasureHunt/index/index.html";
        break;
    default:
        articleOptions[0].style.setProperty("background-color","#9CCD64");
        articleOptions[1].style.setProperty("background-color","lightgray");
        articleOptions[2].style.setProperty("background-color","lightgray");
        articleContent.src="../newsOverview/index/index.html";
}

/******************点击导航栏的”精品文章“设置localStorage的readGoto为option0，即从此处进入article页面激活的是新闻资讯*/
var goodArticle=document.getElementById("goodArticle");
goodArticle.onclick=function(){
    localStorage.setItem("readGoto","option0");
    
    articleOptions[0].style.setProperty("background-color","#9CCD64");
    articleOptions[1].style.setProperty("background-color","lightgray");
    articleOptions[2].style.setProperty("background-color","lightgray");
    articleContent.src="../newsOverview/index/index.html";


};



