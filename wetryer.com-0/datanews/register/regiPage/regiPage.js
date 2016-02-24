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

/*************************Ajax****************************/

document.getElementById("submit").onclick=handleButtonPress;

var htr;

function handleButtonPress(e) {
    e.preventDefault();
    
    var form=document.getElementById("regiForm");
    
    var formData="";
    var inputElements=document.getElementsByTagName("input");
    for (var i=0;i<inputElements.length;i++) {
        if (inputElements[i].type!="radio") {
            formData+=inputElements[i].name+"="+inputElements[i].value+"&";
        }
        else{
            if (inputElements[i].checked) {
                formData+=inputElements[i].name+"="+inputElements[i].value+"&";
            }
        }
        
    }
    
    htr=new XMLHttpRequest();
    htr.onreadystatechange=handleResponse;
    htr.open("POST",form.action,false);
    htr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//设置请求标头，告诉服务器准备接受哪一种数据格式。
    htr.send(formData);
    alert(htr);
}

function handleResponse() {
    if (htr.readyState==4) {
        if ((htr.status>=200&&htr.status<300)||htr.status==304) {
            document.getElementById("sectionContent").innerHTML=htr.responseText;
            alert("successful");
        }
        else{
            document.getElementById("sectionContent").innerHTML="Unsuccessfull: "+htr.status;
        }
        
    }
}
