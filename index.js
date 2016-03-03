/**
 * Created by jiahao on 2016/2/10.
 */
var flag = 0;
window.onload = function () {
    setCss();
    set();
    setState();
    scroll();
    getcontent();
};
function setCss() {
    $(".head").css({
        width: "100%",
        height: $(window).height()
    })
}
function scroll() {
    window.onscroll = function () {
        navSroll();
    }
}

function navSroll() {
    if ($(document).scrollTop() > 10) {
        if (flag == 1) {//设置flag是为了防止每一次出发滚动都会进去if（$(document).scrollTop() > 10）执行没必要执行的函数
            return;
        }
        var timer=null;
        addClassScroll();
        $(".mainBox").css({
            position: "fixed",
            width: 110,
            height: 110,
            top: 40,
            left: 10
        });
        timer=setTimeout(function(){
            $(".smallBox").css({
                display:"none"
            });
        },500);
        startState();
        flag = 1;
    }
    else {
        flag = 0;
        $(".smallBox").css({
            display:"inline-block"
        });
        removeClassScroll();
        $(".mainBox").css({
            position: "fixed",
            width: setting.mainBox,
            height: setting.mainBox,
            top: startTop,
            left: startLeft
        });
        setState();
    }
}
 function setState(){
    var stateLeft=($(document).width()-$(".head .state").width())/ 2,
        stateTop=$(".head .state").height();
        $(".head .state").css({
            left:stateLeft,
            top: -stateTop
        });
    }

function startState(){
    var flag= 1,
        v=0,
        s=-$(".head .state").height(),
        t=10,
        g=3,
        height=$(window).height(),
        time1=null,
        time2=null;
            time1=setTimeout(function(){
                  time2=setInterval(function(){
                       if(flag<=4){  //弹跳四次
                            if(s<height/3){
                                v+=g;
                                s+=v;
                            }else{
                                flag++;
                                v=-v*0.7;
                                s+=v;
                            }
                            $(".head .state").css({
                                top:s
                            })
                        }else{
                            clearInterval(time2);
                        }
                    },t)
            },500);
}
function addClassScroll(){
    $(".navbar").addClass("scroll-after");
    $(".container-fluid").addClass("container-fluid-after");
    $(".round-ball").addClass("round-ball-after");
    $(".mainBox").addClass("mainBoxAfter");
}

function removeClassScroll(){
    $(".navbar").removeClass("scroll-after");
    $(".container-fluid").removeClass("container-fluid-after");
    $(".mainBox").removeClass("qqIndexAfter");
    $(".round-ball").removeClass("round-ball-after");
    $(".mainBox").removeClass("mainBoxAfter");
}

function getcontent() {
    var leftLi = $(".middle-ngv li");
    leftLi.each(function () {
        $(this).click(function () {
            contentAjax(this.innerText);
        })
    });
    function contentAjax(val) {
        var xmlhttp;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                alert(xmlhttp.responseText);
                //$(".content").append(xmlhttp.responseText);
            }
        };
        xmlhttp.open("post", "getContent.php", true);
        xmlhttp.send(val);
    }
}


