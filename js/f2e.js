//==============================================================global==============================================================
function tab(tid, tidtag, bid, bidsib) {
    $('#' + tid).find(tidtag).each(function (i) {
        $(this).click(function () {
            $(this).siblings().removeClass('cur').end().addClass('cur');
            $('#' + bid).find(bidsib).eq(i).siblings().hide().end().show();
        });
    }).eq(0).trigger('click');
};

function shSwitch(obj){
    $(obj).on("click",function(){
        $(this).next().toggle();
        if($(this).hasClass("cur")){
            $(this).removeClass("cur");
        }else{
            $(this).addClass("cur");
        };
    });
};

//==============================================================custom==============================================================
//导航栏悬停顶部
$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('#j-nav').css({'position': 'fixed', 'top': '0'});
        } else {
            $('#j-nav').css({'position': 'relative'});
        }
        ;
    });
});
//底部栏关闭
(function () {
    var bmbar = document.getElementById('j-bmbar');
    if(!bmbar) return false;
    var close = bmbar.getElementsByClassName('f-close')[0];
    close.onclick = function() {
        bmbar.style.display = 'none';
    };
})();
//导航栏更多
(function () {
    if (!document.getElementById('j-nav-btn')) {
        return false;
    }
    ;
    var navBtn = document.getElementById('j-nav-btn');
    var subMain = document.getElementById('j-sub-main');
    navBtn.onclick = function () {
        if (subMain.style.display == 'block') {
            subMain.style.display = 'none';
        } else {
            subMain.style.display = 'block';
        }
        ;
    };
})();
//slide计算
function slide(){
    var slide = document.getElementById('j-slide-ver2');
    var x = document.getElementsByClassName('swiper-slide');
    var hei = slide.offsetWidth * 0.4 + 'px';//640*256
    slide.style.height = hei;
    for(i = 0; i < x.length; i++){
        x[i].style.height = hei;
    }
};


//index
//首页优惠车型选项效果
$(function () {
    var moreVal = 0;
    $('#j-selbar-more').click(function () {
        if (moreVal == 0) {
            $(this).parent().addClass('selbar-unfold');
            moreVal = 1;
        } else {
            $(this).parent().removeClass('selbar-unfold');
            moreVal = 0;
        }
    });
    $('#j-selbar').find('span').each(function (i) {
        $(this).click(function () {
            $(this).addClass('cur');
            $(this).siblings().removeClass('cur');
            $(this).parents('#j-yh-libox').find('.yhcon').eq(i).show();
            $(this).parents('#j-yh-libox').find('.yhcon').eq(i).siblings().hide();
        });
    });
});


//对比合并，高亮
var Contrast = {
    init: function () {
        if ($('#j_position').length) {
            this.iT = $('#j_position').offset().top;
            this.iw = $('#j_position').width();
            this.it = $('.newCar_param_sel').eq(0).offset().top;
            this.ih = $('.config_sidebar a').height();
            this.imL = parseInt($('.config_sidebar').css('margin-left'));
            $('.config_sidebar').css('top', this.it);
        }
        this.events();
    },

    /* 事件执行 */
    events: function () {
        var _this = this;
        /* 合并相同相同项 */
        $('#j_same').click(function () {
            if ($('.config_data td') == '') {
                return false;
            }
            if($(this).prop('checked')){
                _this.sameMerge("same", false);
            } else {
                _this.sameMerge("notsame");
            }
        });
        /* 高亮显示  */
        $('#j_highlight').click(function () {
            if($(this).prop('checked')){
                _this.sameMerge("same", true);
            } else {
                _this.sameMerge("notlight");
            }
        });
    },

    /*  合并相同  */
    sameMerge: function (flag, flag2) {
        var obj = $('.config_data table');
        var obj2 = null, obj3 = null, str = null, sum = null;
        loopone:
            for (var i = 0; i < obj.length; i++) {
                obj2 = obj.eq(i).find('tr');
                looptwo:
                    for (var j = 0; j < obj2.length; j++) {
                        obj3 = obj2.eq(j).find('td');
                        if (flag == 'same') {
                            var num = 0;
                            sum = obj3.eq(0).text();
                            for (var m = 1; m < obj3.length; m++) {
                                if (sum != obj3.eq(m).text()) {
                                    if (m - num > 1) {
                                        if (!flag2) {
                                            this.Hide(obj3, num, m);
                                        } else if (m == obj3.length - 1) {
                                            this.lightHigh(obj3, m);
                                        }
                                    } else {
                                        if (flag2) {
                                            this.lightHigh(obj3, num);
                                            if (m == obj3.length - 1) {
                                                this.lightHigh(obj3, m);
                                            }
                                        }
                                    }
                                    num = m;
                                    sum = obj3.eq(num).text();
                                }
                            }
                            if (m == obj3.length && sum == obj3.eq(m - 1).text() && !flag2) {
                                this.Hide(obj3, num, m);
                            }
                        }
                        if (flag == 'notsame') {
                            obj3.show().attr('colspan', 1);
                        }
                        if (flag == 'notlight') {
                            obj3.css('color', '');
                        }
                    }
            }
    },
    Hide: function (obj, Snum, Enum) {
        for (var i = Snum + 1; i < Enum; i++) {
            obj.eq(i).hide();
        }
        obj.eq(Snum).attr('colspan', Enum - Snum);
    },
    lightHigh: function (obj, num) {
        obj.eq(num).css('color', '#5296dd');
    },
};

//车型结果效果
function tabSub(tid, tidtag, bid, bidsib) {
    $(tid).find(tidtag).each(function () {
        $(this).click(function () {
            $(this).siblings().removeClass('cur').end().addClass('cur');
            $(bid).find(bidsib).siblings().hide().end().show();
        });
    });
};
$(function(){
    var filTab = $('.filtrate-class-box').find('span');
    var filSab = $('.filtrate-class-detail');
    filTab.each(function(i){
        $(this).bind('click',function(){
            filSab.eq(i).show();
        });
    });
    filSab.find('a').bind('click',function(){
        $(this).each(function(){
            $(this).parents('.filtrate-class-details').prev().find('b').html($(this).html());
            $(this).parent().hide();
        });
    });
});

//美规车列表页
$(function () {
    //选项卡
    $('#j-us-tab-ul').find('li').each(function (i) {
        $(this).click(function () {
            $(this).addClass('cur');
            $(this).siblings().removeClass('cur');
            $(this).parents('.us-tab-box').find('.us-tab-cons > li').eq(i).show();
            $(this).parents('.us-tab-box').find('.us-tab-cons > li').eq(i).siblings().hide();
        });
    });
    //点击展开关闭
    var sh = 0;
    $('#carList').delegate('.btn','click',function(){
        if (sh == 0) {
            $(this).parent().next().slideDown('fast');
            sh = 1;
            return false;
        } else {
            $(this).parent().next().slideUp('fast');
            sh = 0;
            return false;
        };
    });
});

//美规车内页
$(function(){
    //配置切换
    $('#j-appearance-tab-ul').find('li').each(function (i) {
        $(this).click(function () {
            $(this).addClass('cur');
            $(this).siblings().removeClass('cur');
            $(this).parent().next().find('.appearance-tab-con > li').eq(i).show();
            $(this).parent().next().find('.appearance-tab-con > li').eq(i).siblings().hide();
            var floatValue = $(this).parents('.conbox').find('.mg-value');
            var floatStatus = $(this).parents('.conbox').find('.mg-baoguan');
            floatValue.html($(this).attr('data-cv'));
            floatStatus.html($(this).attr('data-status'));
            console.log($(this).attr('data-cv'))
        });
    });
    //亮点配置
   $('.appea-clk').on('click',function(e){
       var apperT = '【' + $(this).find('em').text() + '】详细配置';
       var apperP = '<p class="appea">' + $(this).attr('data-xq') +'</p>';
       popconfig(apperT,apperP);
       e.stopPropagation();
   });
});

//popup弹层
function popconfig(tit,txt){
    var pop = document.getElementById('j-popup-v2');
    var popIn = pop.getElementsByClassName('popup-v2-inside')[0];
    pop.style.display = 'block';
    pop.getElementsByClassName('title-box')[0].innerHTML = tit;
    pop.getElementsByClassName('popup-v2-bd')[0].innerHTML = txt;
    popIn.style.top = ( document.documentElement.clientHeight - popIn.offsetHeight ) / 2 + 'px';
    pop.getElementsByClassName('f-close')[0].onclick = function(){
        pop.style.display = 'none';
    };
    if(pop.getElementsByClassName('popup-v2-fd')[0].innerHTML == ""){
        pop.getElementsByClassName('popup-v2-fd')[0].style.display = "none";
    };
};

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
var p1 = new popupV2('<i class="f-member"></i>web开发修炼之道','2');
var p2 = new popupV2('<i class="f-member"></i>web开发修炼之道','2','<a class="btn1" href="javascript:p2.closed">确定关闭</a>');
var sharebox = new popupV2('分享到','<ul class="share-ul"><li><a href=""><i class="f-weibo"></i>新浪微博</a></li><li><a href=""><i class="f-qzone"></i>QQ空间</a></li><li><a href=""><i class="f-txweibo"></i>腾讯微博</a></li></ul>');
var paging1 = new popupV2('来分个页','<div class="popup-v2-page">1呀<br />呀<br />呀</div><div class="popup-v2-page">2呀<br />呀<br />呀</div><div class="popup-v2-page">3呀<br />呀<br />呀</div><div class="popup-v2-page">4呀<br />呀<br />呀</div>','<a class="btn2" href="javascript:paging1.pagingPrev()">上一页</a><a class="btn2" href="javascript:paging1.pagingNext()">下一页</a>');
var referrer = new popupV2('什么是推荐人？','<p class="referrer">推荐人是指在乾坤购车的客户、乾坤达人或者乾坤员工，通过推荐人的分享链接完成注册，买车即可享受底价再减3000元起！</p>');
//var gwsucc = new popupV2('<i class="f-gou"></i>选择顾问成功！','<div>顾问信息将通过短信发送至您的手机请注意查收！</div>','<a class="btn1" href="javascript:gwsucc.closed()" onclick="location.href='" + preRequestUrl + "'">完成</a>');

function smarttip(con){
    this.con = con;
};

smarttip.prototype = {
    start : function(){
        var smarttip = document.getElementById('j-smarttip');
        smarttip.innerHTML = this.con;
        smarttip.style.display = 'block';
        smarttip.style.left = (document.documentElement.clientWidth - smarttip.offsetWidth) / 2 + 'px';
        smarttip.style.top = (document.documentElement.clientHeight - smarttip.offsetHeight) / 2 + 'px';
        this.end(5000);
    },
    end : function(time){
        setTimeout(close,time);
        function close(){
            var smarttip = document.getElementById('j-smarttip');
            smarttip.style.display = 'none';
        };
    }
};

var like = new smarttip('赞 +1');
var likeend = new smarttip('已经赞过了');
var loading = new smarttip('<div class="loading-img"></div><div class="loading-txt">提交中</div>');

//点击展开更多
function clkmore(obj,elem){
    var tmp = 0;
    $(obj).click(function(){
        if(tmp == 0){
            $(this).addClass(elem);
            $(this).addClass(elem);
            tmp = 1;
        }else{
            $(this).removeClass(elem);
            tmp = 0;
        };
    });
};
function clkmore2(obj,elem){
    var tmp = 0;
    $(obj).click(function(){
        if(tmp == 0){
            $(this).parent().addClass(elem);
            tmp = 1;
        }else{
            $(this).parent().removeClass(elem);
            tmp = 0;
        };
    });
};

//counselor
$(function(){
    $('#j-counselor-slide').unbind('click').click(function(){
        $('#j-sounselor-info').slideToggle();
    });
    $('#j-counselor-wx').click(function(){
        $("#j-masklayer-counselor").show();
    });
    $('#j-masklayer-counselor').click(function(){
        $(this).hide();
    })
});


$('#j-selbar').find('span').each(function (i) {
    $(this).click(function () {
        $(this).addClass('cur');
        $(this).siblings().removeClass('cur');
        $(this).parents('#j-yh-libox').find('.yhcon').eq(i).show();
        $(this).parents('#j-yh-libox').find('.yhcon').eq(i).siblings().hide();
    });
});

//内页报名
$(function(){
    $("#j-content-bm").click(function(){
        $("#j-popup-v2-contentbm").css("height",$(document).height());
        $("#j-popup-v2-contentbm").show();
        $("#j-popup-v2-inside-contentbm").css("top",$(document).scrollTop() + 50);
    });
    $(function(){
        $(".f-close").click(function(){
            $("#j-popup-v2-contentbm").hide();
        });
    });
});


//抢车滚动功能
function run(elem) {
    var oMarquee = document.getElementById(elem);
    var iLineHeight = 20;
    var iLineCount = 10;
    var iScrollAmount = 1;

    function play() {
        oMarquee.scrollTop += iScrollAmount;
        if (oMarquee.scrollTop == iLineCount * iLineHeight) {
            oMarquee.scrollTop = 0;
        }
        ;
        if (oMarquee.scrollTop % iLineHeight == 0) {
            window.setTimeout(play, 5000);
        } else {
            window.setTimeout(play, 30);
        }
        ;
        oMarquee.onmouseover = function () {
            iScrollAmount = 0;
        };
        oMarquee.onmouseout = function () {
            iScrollAmount = 1;
        };
    };
    oMarquee.innerHTML += oMarquee.innerHTML;
    window.setTimeout(play, 5000);
};
