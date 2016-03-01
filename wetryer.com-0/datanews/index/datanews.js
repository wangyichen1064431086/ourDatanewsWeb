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

/*不好判断是刷新还是关闭，选择新方法解决此问题
window.onunload=function(event){
   var ifOnunload=true;
   localStorage.setItem("ifOnunload",ifOnunload);
    if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){ 
        var ifClose=true;
    }
    else{ 
        var ifClose=false;
    }
    localStorage.setItem("clientX",event.clientX);
    localStorage.setItem("clientY",event.clientY);
    localStorage.setItem("ifClose",ifClose);
    if (ifClose&&localStorage.getItem("welcome")) {
        localStorage.removeItem("welcome");
    }

}

/*
if (localStorage.getItem("welcome")) {
    document.getElementById("regi").innerHTML=localStorage.getItem("welcome");

}
function cleanWelcome(e) {
    alert("unload触发");
    localStorage.removeItem("welcome");
}   
*/

/***********************************旋转木马效果**********************************************/
var calButtons=document.querySelectorAll("#myCarButtons button");
var calContents=new Array();
var myCalContent=document.getElementById("myCarContent");
var numBu=calButtons.length;

calContents[0]="<img src='http://pic000.oss-cn-beijing.aliyuncs.com/wetryer/calContents1.png' alt='calContents0'/>";
calContents[1]="<img src='http://pic000.oss-cn-beijing.aliyuncs.com/wetryer/calContents2.png' alt='calContents1'/>";
calContents[2]="<img src='http://pic000.oss-cn-beijing.aliyuncs.com/wetryer/calContents3.png' alt='calContents2'/>";

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
    
    timeOutBu=window.setTimeout(//按下按钮等待3000ms后无其他操作，则再次开启间隔计时器intervalBu
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
   //被z-index遮住的元素鼠标放上去不能感应到该元素？？是的
    
    for(var i=0,len=sectionLogos.length;i<len;i++){
        sectionLogos[i].onmouseenter=addWave;//不能用onmouseover,这里虽然父元素和子元素区域重合，但重合部分默认获取的就是子元素了？？
        sectionLogos[i].onmouseleave=deleteWave;
    }

    function addWave(e) {
        if (e.target==sectionLogos[0]) {
            $(".back0").addClass("logoWave");
        }
        else if (e.target==sectionLogos[1]) {
            $(".back1").addClass("logoWave");
        }
        else if (e.target==sectionLogos[2]) {
            $(".back2").addClass("logoWave");
        }
        
    }
    
    function deleteWave(e){
         if (e.target==sectionLogos[0]) {
            $(".back0").removeClass("logoWave");
        }
        else if (e.target==sectionLogos[1]) {
            $(".back1").removeClass("logoWave");
        }
        else if (e.target==sectionLogos[2]) {
            $(".back2").removeClass("logoWave");
        }
    }
/*******************点击对应的“阅读更多"****************************************/


/*********************************登录弹窗****************************************/
var regiBlock=document.getElementById("changeDiv");
var regiButton=document.getElementById("beforeRegi");
regiButton.onclick=function(e){
    regiBlock.style.setProperty("display","block");
}


