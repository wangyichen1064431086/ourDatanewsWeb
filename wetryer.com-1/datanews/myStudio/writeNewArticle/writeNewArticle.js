/**********************�������µ�Ajax********************************/
document.getElementById("save").onclick=handleButtonPress;

var htr;

function handleButtonPress(e) {
    e.preventDefault();
    
    var form=document.getElementById("writeMyArticle");
    
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
    
    var mainText=document.getElementsByTagName("textarea")[0];
    formData+=mainText.name+"="+mainText.value+"&";
    
    htr=new XMLHttpRequest();
    htr.onreadystatechange=handleResponse;
    htr.open("POST",form.action,false);
    htr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');//���������ͷ�����߷�����׼��������һ�����ݸ�ʽ��
    htr.send(formData);
}

function handleResponse() {
    if (htr.readyState==4) {
        if ((htr.status>=200&&htr.status<300)||htr.status==304) {
            document.getElementsByTagName("body")[0].innerHTML=htr.responseText;
        }
        else{
            document.getElementsByTagName("body")[0].innerHTML="Unsuccessfull: "+htr.status;
        }
        
    }
}

//Ҫͨ��n��¼�������nodejs���ͻ��˷���cookie��Ȼ���ύ����ʱ�ٰ�cookie���͹�ȥ��Ȼ�������nodejsͨ���ж�cookie����ӵ���Ӧ���û����ݿ⡣