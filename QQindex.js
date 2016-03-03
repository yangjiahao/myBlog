/**
 * Created by jiahao on 2016/2/10.
 */
function set() {
    var smallBox = $(".smallBox"),
        size = smallBox.size(),//samllBox的length
        ballBox = $(".round-ball"),
        l = null,                 //鼠标点击的地方到smallBox左边框的距离
        t = null,                 //鼠标点击的地方到smallBox上边框的距离
        mainBox1 = document.getElementsByClassName("mainBox")[0],//获取包裹在最外层的div
        mainBoxTop = mainBox1.offsetTop,     //mainBox到浏览器上边框的距离
        mainBoxLeft = mainBox1.offsetLeft;  //mainBox到浏览器左边框的距离
        setting={
            "mainBox":450,
            "smallBox":110,
            "min_round_ball":50
        };
    $.extend(setting,getSetting());
    settingCss();
    photoShow();          //最中央图片的初始化以及动画切换效果的设定
    calculation();        //计算出每个周围小球的位置
    ballBox.each(         //给周围的小球加上动画效果
        function (i, elem) {
            elem.flag = 1;    //flag控制着每个小球是否有浮动的效果，1是开始浮动，0停止浮动
            ballMove(elem, 50); //小球开始浮动的函数
            $(elem).hover(function () {  //鼠标放在小球上停止浮动，移开又开始浮动
                this.flag = 0;
            }, function () {
                this.flag = 1;
                ballMove(this, 50);
            });
            elem.onmousedown = function (event1) {  //在此处必须加上event1，否则在火狐上无法正常使用，但是在IE,chrom可以不在function的（event）
                var $smallBox = $(this).parent();
                l = event1.clientX - this.parentNode.offsetLeft - mainBoxLeft;   //鼠标点击的地方到smallBox左边框的距离
                t = event1.clientY - this.parentNode.offsetTop - mainBoxTop;     //鼠标点击的地方到smallBox上边框的距离
                document.onmousemove = function (event2) {   //鼠标在小球上移动的监听，小球跟着鼠标移动
                    $smallBox.css({
                        top: event2.clientY - mainBoxTop - t,
                        left: event2.clientX - mainBoxLeft - l
                    });
                }
            };
            elem.onmouseup=function () {   //鼠标弹起的时候小球不跟着鼠标移动了
                document.onmousemove = null;

            }
            document.onmouseup = function () {  //解决鼠标按下之后移动过快，移出了小球的范围，出现的BU
                document.onmousemove = null;
            }
        }
    );


    function getSetting  () {
        var setting = $(".mainBox").attr("data-setting");
        if (setting && setting != "") {
            return $.parseJSON(setting);
        } else {
            return {};
        };
    }


    function photoShow() {//先静态的展示中央的图片，然后设定切换动画
        var timer = null,
            headPhoto = $(".headPhoto"),
            hpItems = headPhoto.find("div.hpItem"),
            photoLength = hpItems.size() - 1,
            flag = 0;   //flag标志着切换到第几张图片

        timer = setInterval(function () {
            if (flag == photoLength) {
                hpItems.eq(flag).animate({
                    opacity: "0"
                }, 2000);
                flag=0;
                    hpItems.eq(flag).animate({
                        opacity: "1"
                    }, 2000);
            } else {
                hpItems.eq(flag).animate({
                    opacity: "0"
                }, 2000);
                    flag++;
                    hpItems.eq(flag).animate({
                        opacity: "1"
                    }, 2000);
            }
        }, 3000);
    }

    function calculation() {//计算smallBox的位置
        var     mainBox=$(".mainBox"),
            x = Math.floor(mainBox.first().width() / smallBox.width()),
            y = Math.floor(mainBox.height() / smallBox.height()),
            xWidth = mainBox.width() / x,
            yHeight = mainBox.height() / y,
            flag = [],
            temp = null,
            ballWidth = smallBox.first().find('div.round-ball').width(),
            topOf = (mainBox.width() - ballWidth) / 2;

        for (var i = 0; i < x; i++) {
            flag[i] = [];
            for (var j = 0; j < y; j++) {
                flag[i][j] = 0;
            }
        }
        smallBox.each(           //每个小球都计算分配位置
            function (i) {
                $(this).css({
                    top: topOf,
                    left: topOf,
                });
                cal($(this));
            }
        );

        function cal($this) {   //计算然后把smallBox分别放在mainBox的四周
            if (Math.floor(Math.random() * 2)) {//选到x
                if (Math.floor(Math.random() * 2))//选到x=0
                {
                    judgeX(0, $this);
                }
                else {
                    judgeX(x - 1, $this)
                }
            }
            else {//选到Y
                if (Math.floor(Math.random() * 2))//选到y=0
                {
                    judgeY(0, $this);
                }
                else {
                    judgeY(y - 1, $this);
                }
            }
        }

        function judgeX(i, $this) {  //计算放在上边和下面
            temp = Math.floor(Math.random() * x);
            if (flag[i][temp] == 1) {
                cal($this);
            } else {
                flag[i][temp] = 1;
                var add = 50 + Math.random() * 30;
                $this.animate({
                    top: i * xWidth + Math.random() * 50,
                    left: temp * yHeight,
                    lineHeight: add
                }, 1000);
                $this.find("div.round-ball").animate({
                    width: add,
                    height: add
                });
            }
        }

        function judgeY(i, $this) {   //计算放在左边和右边
            temp = Math.floor(Math.random() * x);
            if (flag[temp][i] == 1) {
                cal($this);
            } else {
                flag[temp][i] = 1;
                var add = 50 + Math.random() * 30;
                $this.animate({
                    top: temp * xWidth,
                    left: i * yHeight + Math.random() * 50,
                    lineHeight: add
                }, 1000);
                $this.find("div.round-ball").animate({
                    width: add,
                    height: add
                }, 1000);
            }
        }
    }

    function ballMove($this, width) {    //小球浮动
        if ($this.flag == 0) {
            return;
        }
        var topOf = null,
            leftOf = null;
        topOf = Math.random() * width;
        leftOf = Math.random() * width;
        $($this).animate({
            top: topOf,
            left: leftOf
        }, 2000, function () {
            ballMove($this, width);
        })
    }
    function settingCss(){
        startLeft=($(document).width()-setting.mainBox)/2;
        startTop=($(window).height()-setting.mainBox)/2;
        $(".mainBox").css({
            width: setting.mainBox,
            height: setting.mainBox,
            left:startLeft,
            top:startTop
        });
    }
}