/**
 * Created by jiahao on 2016/2/22.
 */
window.onload=  function getcontent(){
    var leftLi=$(".middle-ngv li");
    leftLi.each(function(){
        $(this).click(function(){
            contentAjax(this.innerText);
        })
    });
    function contentAjax(val){

            var xmlhttp;
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                   $(".content").append(xmlhttp.responseText);
                }
            };
            xmlhttp.open("post","getcustomer.asp",true);
            xmlhttp.send(val);
    }
    //function contentAjax(val){
    //    var xmlHttp=null;
    //    if(window.XMLHttpRequest){
    //        xmlHttp=new XMLHttpRequest();
    //    }
    //    else{
    //        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    //    }
    //    xmlHttp.onreadystatechange=function(){
    //        if(xmlhttp.readyState==4&&xmlhttp.state==200){
    //            $(".content").append(xmlhttp.responseText);
    //        }
    //    };
    //    xmlhttp.open("post"," getContent.php",true);
    //    xmlhttp.send(val);
    //}
};
