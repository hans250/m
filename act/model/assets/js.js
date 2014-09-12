/* ====================================(◔౪◔)首页(◔౪◔)==================================== */

//navScrollTo
$(function ($) {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 623) {
            $('#j-nav-position').addClass('selected');
            $("#j-nav-position").css("width",$(document).width());
        } else {
            $('#j-nav-position').removeClass('selected');
            $("#j-nav-position").css("width","auto");
        };
    });
    $('#j-nav-ul').onePageNav({
        filter: ':not(.external)',
        scrollThreshold: 0.25,
        scrollOffset: 0,
        end: function () {
            var $left = $('.current').position().left;
            $('#j-nav-ul .back').stop().animate({'left': $left}, "fast");
        },
        scrollChange: function () {
            var $left = $('.current').position().left;
            $('#j-nav-ul .back').stop().animate({'left': $left}, "fast");
        }
    });
});


/* ====================================(◔౪◔)内页(◔౪◔)==================================== */
//参数页
$(function(){
    $("#j-para-more").click(function(){
        $("#j-para").addClass("para-selected");
        $(this).remove();
    });
});
//popupV2
function popupV2(hd,bd,fd){
    this.hd = hd;
    this.bd = bd;
    this.fd = fd;
    this.pagingNum = 0;
};
popupV2.prototype = {
    transmit : function(){
        var popup = document.getElementById('j-popup-v2'),
            popupInside = popup.getElementsByClassName('popup-v2-inside')[0],
            popupTitle = popup.getElementsByClassName('title-box')[0],
            popupBd = popup.getElementsByClassName('popup-v2-bd')[0],
            popupFd = popup.getElementsByClassName('popup-v2-fd')[0],
            popupClose = popup.getElementsByClassName('f-close')[0],
            popupPage = popup.getElementsByClassName('popup-v2-page');
        popup.style.display = 'block';
        popupTitle.innerHTML = this.hd;
        popupBd.innerHTML = this.bd;
        popupFd.innerHTML = this.fd;
        if(!this.fd){
            popupFd.parentNode.removeChild(popupFd);
        };
        if(popupPage.length > 0){
            popupPage[0].style.display = 'block';
        };
        popupInside.style.top = ( document.documentElement.clientHeight - popupInside.offsetHeight ) / 2 + 'px';
        popupClose.onclick = function(){
            popup.style.display = 'none';
        };
    },
    share : function(desc,url,pic,carsn){
        var popup = document.getElementById('j-popup-v2'),
            popupInside = popup.getElementsByClassName('popup-v2-inside')[0],
            popupTitle = popup.getElementsByClassName('title-box')[0],
            popupBd = popup.getElementsByClassName('popup-v2-bd')[0],
            popupFd = popup.getElementsByClassName('popup-v2-fd')[0],
            popupClose = popup.getElementsByClassName('f-close')[0];
        popup.style.display = 'block';
        popupTitle.innerHTML = this.hd;
        popupBd.innerHTML = this.bd;
        popupFd.innerHTML = this.fd;
        popupFd.parentNode.removeChild(popupFd);
        popupInside.style.top = ( document.documentElement.clientHeight - popupInside.offsetHeight ) / 2 + 'px';
        popupClose.onclick = function(){
            popup.style.display = 'none';
        };
        var shareurl = popup.getElementsByClassName('share-ul')[0].getElementsByTagName('a');
        for( i = 0; i < shareurl.length; i++){
            shareurl[0].setAttribute('href','http://service.weibo.com/share/share.php?url=' + url + '&title=' + desc + '&pic=' + pic);
            shareurl[1].setAttribute('href','http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + '&title=' + desc + '&pic=' + pic + '&summary=' + desc);
            shareurl[2].setAttribute('href','http://share.v.t.qq.com/index.php?c=share&a=index&url=' + url + '&title=' + desc + '&pic=' + pic);
        };
    },
    closed : function(){
        var popup = document.getElementById('j-popup-v2');
        popup.style.display = 'none';
    },
    pagingPrev : function(){
        var popup = document.getElementById('j-popup-v2'),
            popupPage = popup.getElementsByClassName('popup-v2-page');
        if(this.pagingNum > 0){
            this.pagingNum--;
            for(i = 0; i < popupPage.length; i++){
                popupPage[i].style.display = 'none';
                if(this.pagingNum == i){
                    popupPage[i].style.display = 'block';
                };
            };
        };
    },
    pagingNext : function(){
        var popup = document.getElementById('j-popup-v2'),
            popupPage = popup.getElementsByClassName('popup-v2-page');
        if(this.pagingNum < (popupPage.length - 1)){
            this.pagingNum++;
            for(i = 0; i < popupPage.length; i++){
                popupPage[i].style.display = 'none';
                if(this.pagingNum == i){
                    popupPage[i].style.display = 'block';
                };
            };
        };
    }
};
var rule = new popupV2('活动说明','<div class="popup-v2-page"><p>活动时间：7月12日9:00-21:00</p><ul class<dl><dt><b>1.</b>用户参加团购需提前在网站活动页面或微信平台提交相关资料报名。</dt><dt><b>2.</b>报名并支付意向金，才可享受活动价格。（未购车，意向金可如数退还）</dt><dt><b>3.</b>部分车型活动价格在活动当天才会公布，每一款都无比超值。</dt></dl></div>','<a class="btn1" href="javascript:rule.closed()">关闭</a>');
var paging1 = new popupV2('来分个页','<div class="popup-v2-page">1呀<br />呀<br />呀</div><div class="popup-v2-page">2呀<br />呀<br />呀</div><div class="popup-v2-page">3呀<br />呀<br />呀</div><div class="popup-v2-page">4呀<br />呀<br />呀</div>','<a class="btn2" href="javascript:paging1.pagingPrev()">上一页</a><a class="btn2" href="javascript:paging1.pagingNext()">下一页</a>');

//活动规则查看
$(function(){
    $(".banner").click(function(){
        var hei = document.documentElement.clientHeight;
        console.log(hei)
        $("#j-popup-v2-static").css("height",hei);
        $("#j-popup-v2-static").show();
        x = ( document.documentElement.clientHeight - $("#j-popup-v2-inside-static").height() ) / 2;
        $("#j-popup-v2-inside-static").css("top",x);
        alert(document.body.clientHeight+"_"+document.documentElement.clientHeight)
    });
    $(".f-close").click(function(){
        $("#j-popup-v2-static").hide();
    });
});
//快速注册
$(function(){
    $("#j-bmbar-btn").click(function(){
        $("#j-popup-v2-fast").css("height",$(document).height());
        $("#j-popup-v2-fast").show();
        $("#j-popup-v2-inside-fast").css("top",$(document).scrollTop() + 50);
    });
    $(".f-close").click(function(){
        $("#j-popup-v2-fast").hide();
    });
})
$(".popup-ab").css("height",$(document).height());
$(".btn-baoming").click(function(){
    $("#j-popup-v2-static").show();
    $("#j-popup-v2-inside-static").css("top",$(document).scrollTop() + 50);
    console.log($(document).scrollTop())
});
$(function(){
    $(".f-close").click(function(){
     $("#j-popup-v2-static").hide();
     return false;
    });
});
//排序
$(function(){
    var tmp = 0;
    $(".act-ul2-sel").bind("click",function(){
        if(tmp == 0){
            $(this).addClass("act-ul2-sel-open");
            $(".ul > li").each(function(i){
                $(this).bind("click",function(e){
                    var val = $(this).html();
                    $(this).parents(".act-ul2-sel").find("span").html(val);
                    $(".ul > li").eq(i).siblings().removeClass("cur").end().addClass("cur");
                    $(this).parent().parent().removeClass("act-ul2-sel-open");
                    e.stopPropagation();
                    tmp = 0;
                });
            });
            tmp = 1;
        }else{
            $(this).removeClass("act-ul2-sel-open");
            tmp = 0;
        };
    });
});

//返回顶部出现
$(function(){
    $(window).scroll(function(){
        if($(window).scrollTop() > 200){
            $("#j-totop").show();
        }else{
            $("#j-totop").hide();
        };
    });
});

//底部栏关闭
(function () {
    if(!document.getElementById("j-bmbar")) return false;
    var tmp = 1;
    var bmbar = document.getElementById('j-bmbar');
    var close = bmbar.getElementsByClassName('f-close')[0];
    close.onclick = function() {
        bmbar.style.display = 'none';
        $(window).scroll(function(){
            $("#j-bmbar").hide();
        });
    };
})();
//介绍完整信息
$(function(){
    var tmp = 0;
    $(".more").click(function(){
        if(tmp == 0){
            $(this).prev().css("height","auto");
            $(this).html("收起 ↑");
            tmp = 1;
        }else{
            $(this).prev().css("height","");
            $(this).html("查看更多 ↓");
            tmp = 0;
        }
    });
})
//slide计算
function slide(){
};