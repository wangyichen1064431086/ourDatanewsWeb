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
/*
var mynav=document.querySelector("navrow");
var subnav=document.querySelector("dropdown");
EventUtil.addHandler(mynav,"mouseenter",function(event){
    event=EventUtil.getEvent(event);
    var target=EventUtil.getTarget(event);
    if (target.id=="hasSub") {
       target.style.background='#228B22';
       subnav.style.setProperty("display","block");
    }
    else if (target.className=="navoption") {
        //code
    }
})
*/

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
    for(var j=0,len=dropoptions.length;j<len;j++){
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

window.onload=function(){
    if (localStorage.getItem("welcome")) {//已在其他页面登陆，则每个页面都显示用户昵称
        document.getElementById("regi").innerHTML=localStorage.getItem("welcome");
    }
}


window.onunload=function(){
    if (localStorage.getItem("welcome")) {
        localStorage.removeItem("welcome");
    }
}


/***********************************旋转木马效果**********************************************/
var calButtons=document.querySelectorAll("#myCarButtons button");
var calContents=new Array();
var myCalContent=document.getElementById("myCarContent");
var numBu=calButtons.length;

calContents[0]="<a target='_blank' href='../articles/treasureHunt/2/IntroduceofGephi.html'><img src='pic/calContents1.png' alt='calContents0'/></a>";
calContents[1]="<a target='_blank' href='../articles/treasureHunt/1/Introduce of treasure hunt.html'><img src='pic/calContents2.png' alt='calContents1'/></a>";
calContents[2]="<img src='pic/calContents3.png' alt='calContents2'/>";
myCalContent.innerHTML=calContents[0];//初始化旋转木马版块
calButtons[0].style.setProperty("background-color","#9CCD64");


/****按按钮时出现对应图片********/
 /*
for(var h=0;h<3;h++){
    calButtons[h].onclick=function(){//使用了闭包。。而闭包只能取得外层函数任何变量的最后一个值，故h不能取到0~2
        myCalContent.innerHTML=calContents[h];
    };

*/
var count=0;//初始化间隔计时器计时值
var intervalBu;//时间间隔计时器
var timeoutBu;//等待计时器
var showCount=document.getElementById("showCount");//在网页上显示计时数字

for(var i=0;i<numBu;i++){ 
    calButtons[i].onclick=showCalContent;
}

function showCalContent(e) {
    window.clearInterval(intervalBu);//按下按钮时，停止自动切换
    
    var pressedBu=e.target;
    
    for (var i=0;i<numBu;i++) {//虽然按下了某一个按钮，但绑定的函数要处理所有的按钮，这样才不会形成闭包
        calButtons[i].style.setProperty("background-color","white");
        calButtons[i].style.setProperty("border","thin solid #9CCD64");
        if (pressedBu==calButtons[i]) {
            myCalContent.innerHTML=calContents[i];//按下按钮，myCalContent内容变为相应内容
            count=i;//按下按钮的同时，计时器计时变量count变为按钮相应索引值
            showCount.innerHTML=count;///在网页上显示计时数字

        }
    }
    pressedBu.style.setProperty("background-color","#9CCD64");
    
    timeOutBu=window.setTimeout(//按下按钮等待2000ms后无其他操作，则再次开启间隔计时器intervalBu
        startIntervalBu,
        3000
    );
    
    function startIntervalBu() {//开启间隔计时器
        intervalBu=window.setInterval(//循环切换当前按钮及其对应图片的计时器
            changeNowBu,
            3000
        );
    }
    
}

/**********自动播放，当按钮变色时切换到相应图片****************/
//思路：初始化为每过一定时间，按钮和图片自动切换


intervalBu=window.setInterval(//循环切换当前按钮及其对应图片的计时器
    changeNowBu,
    3000
);

 function changeNowBu() {
        showCount.innerHTML=count;///在网页上显示计时数字

        if (count%3==0) {
            calButtons[0].style.setProperty("background-color","#9CCD64");
            calButtons[1].style.setProperty("background-color","white");
            calButtons[2].style.setProperty("background-color","white");
            myCalContent.innerHTML=calContents[0];
        }
        else if (count%3==1) {
            calButtons[0].style.setProperty("background-color","white");
            calButtons[1].style.setProperty("background-color","#9CCD64");
            calButtons[2].style.setProperty("background-color","white");
            myCalContent.innerHTML=calContents[1];
        }
        else if (count%3==2) {
            calButtons[0].style.setProperty("background-color","white");
            calButtons[1].style.setProperty("background-color","white");
            calButtons[2].style.setProperty("background-color","#9CCD64");
            myCalContent.innerHTML=calContents[2];
        }
        count++;
        if (count==3) {
            count=0;
        }
        
    }
    
/**********************内容排列区域图标:鼠标放上去，会形成一波光晕******************************/
    var sectionLogos=document.querySelectorAll(".sectionLogo");
   //被z-index遮住的元素鼠标放上去不能感应到该元素？？
    
    for(var i=0;i<sectionLogos.length;i++){
        sectionLogos[i].onmouseenter=addWave;//不能用onmouseover,这里虽然父元素和子元素区域重合，但重合部分默认获取的就是子元素了？？
        sectionLogos[i].onmouseleave=deleteWave;
    }

    function addWave(e) {
        if (e.target==sectionLogos[0]) {
           document.querySelector(".back0").classList.add("logoWave");
        }
        else if (e.target==sectionLogos[1]) {
           document.querySelector(".back1").classList.add("logoWave");
        }
        else if (e.target==sectionLogos[2]) {
           document.querySelector(".back2").classList.add("logoWave");
        }
        
    }
    
    function deleteWave(e){
         if (e.target==sectionLogos[0]) {
            document.querySelector(".back0").classList.remove("logoWave");
        }
        else if (e.target==sectionLogos[1]) {
            document.querySelector(".back1").classList.remove("logoWave");
        }
        else if (e.target==sectionLogos[2]) {
            document.querySelector(".back2").classList.remove("logoWave");
        }
    }

/*********************************登录弹窗****************************************/
var regiBlock=document.getElementById("changeDiv");
var regiButton=document.getElementById("beforeRegi");
regiButton.onclick=function(e){
    regiBlock.style.setProperty("display","block");
}


/***********************点击“阅读更多”跳转到article页面激活相应按钮******************/
var readmoreBtns=document.getElementsByClassName("sectionReadMore");

//用闭包来写
for (var i=0,len=readmoreBtns.length;i<len;i++) {
    (function (a) {
        readmoreBtns[a].onclick=function(){
            localStorage.setItem("readGoto","option"+a);
        }
    })(i);   
}
/******************点击导航栏的”精品文章“设置localStorage的readGoto为option0，即从此处进入article页面激活的是新闻资讯*/
var goodArticle=document.getElementById("goodArticle");
goodArticle.onclick=function(){
    localStorage.setItem("readGoto","option0");
}

/*******************点击“我要投稿”按钮，检查是否登录，如没有登录，先登录；如已经登录，跳转到“我的工作室”界面***/
var iWill=document.getElementsByClassName("iWillBu")[0];

iWill.onclick=function(){
    if (!(localStorage.getItem("welcome"))) {
        regiBlock.style.setProperty("display","block");
    }
    else{
        localStorage.setItem("myStudioGoto","option0");
        window.open("../myStudio/index/index.html","_blank");
    }
    
}
