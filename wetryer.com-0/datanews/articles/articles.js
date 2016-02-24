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
var ifClose;
window.onbeforeunload=function (){ //判断用户是刷新还是关闭页面。只有关闭的时候清理localStorage.welcome
    if(event.clientX>document.body.clientWidth && event.clientY < 0 || event.altKey){ 
       // alert("你关闭了浏览器");
        ifClose=true;
    }
    else{ 
        //alert("你正在刷新页面");
        ifClose=false;
    } 
} 
window.onunload=function () {
    if (localStorage.getItem("welcome")&&ifClose) {
        localStorage.removeItem("welcome");
    }
}   

*/
/****************************************文章类型列表*************************************/
var articleOptions=document.querySelectorAll(".articleMenu li");

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
      
    };
}

/*********************************登录弹窗****************************************/
var regiBlock=document.getElementById("changeDiv");
var regiButton=document.getElementById("beforeRegi");
regiButton.onclick=function(e){
    regiBlock.style.setProperty("display","block");
}

