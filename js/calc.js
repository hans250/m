//calc

//初始css相关
$(function(){
    //absolute块赋予高度
    $(".calc-blks").css("height",$(".calc-blk").height());
    //4等分元素屏幕宽度
    $(".calc-blk").css("width",$(document).width());
});

//找到nav数组赋予点击功能
$("#j-calc-nav-ul").find("li").each(function(i){
    $(this).click(function(){
        if(i == 0){
            to1(i);
        }else if(i == 1){
            to2(i);
        }else if(i == 2){
            to3(i);
        }else if(i == 3){
            to4(i);
        };
        $("body,html").animate({scrollTop:0},500);
    });
});

//点击底部按钮祖列
$(".stage-btn").each(function(i){
   $(this).click(function(){
       $("body,html").animate({scrollTop:0},500);
       if(i == 0){
           setTimeout(function(){to2(i + 1)},600);
       }else if(i == 1){
           setTimeout(function(){to3(i + 1)},600);
       }else if(i == 2){
           setTimeout(function(){to4(i + 1)},600);
       };
       return false;
   });
});

//==========================================功能函数，华丽丽的分割线 ヽ(●´∀`●)ﾉ==========================================
//过渡到当前的动画
function to1(i){
    $("#calc-blk-inside").removeClass().addClass("calc-area1");
    $("#j-calc-nav-ul").find("li").removeClass();
    $("#j-calc-nav-ul").find("li").eq(i).addClass("cur");
};
function to2(i){
    $("#calc-blk-inside").removeClass().addClass("calc-area2");
    $("#j-calc-nav-ul").find("li").removeClass();
    $("#j-calc-nav-ul").find("li").eq(i-1).addClass("cur-before");
    $("#j-calc-nav-ul").find("li").eq(i).addClass("cur");
};
function to3(i){
    $("#calc-blk-inside").removeClass().addClass("calc-area3");
    $("#j-calc-nav-ul").find("li").removeClass();
    $("#j-calc-nav-ul").find("li").eq(i-1).addClass("cur-before");
    $("#j-calc-nav-ul").find("li").eq(i).addClass("cur");
};
function to4(i){
    $("#calc-blk-inside").removeClass().addClass("calc-area4");
    $("#j-calc-nav-ul").find("li").removeClass();
    $("#j-calc-nav-ul").find("li").eq(i-1).addClass("cur-before");
    $("#j-calc-nav-ul").find("li").eq(i).addClass("cur");
};

//==========================================计算逻辑，华丽丽的分割线 ヽ(●´∀`●)ﾉ==========================================
taxTmp = [];
$(function(){
    six();
    add();
    $(".change").change(function(){
        add();
    });
    $("#j-stage1-tab").find("li").each(function(){
        $(this).click(function(){
            add();
        });
    });
    $("#jqx").change(function(){
        six();
    });

    $(".check-select-box").click(function(){
        if($(this).hasClass("check-select-box-cur")){
            $(this).removeClass("check-select-box-cur");
            //车辆损失险
            if($(this).hasClass("check-select-box-clssx")){
                $("#clssx-val").attr("data-value","0");
                $("#stage4-jbxz").find(".c2").remove();
            };
            //全车盗抢险
            if($(this).hasClass("check-select-box-qcdqx")){
                $("#qcdqx-val").attr("data-value","0");
                $("#stage4-jbxz").find(".c3").remove();
            };
            //司机座位责任险
            if($(this).hasClass("check-select-box-sjzwzrx")){
                $("#sjzwzrx-val").attr("data-value","0");
                $("#stage4-jbxz").find(".c4").remove();
            };
            //乘客座位责任险
            if($(this).hasClass("check-select-box-ckzwzrx")){
                $("#ckzwzrx-val").attr("data-value","0");
                $("#stage4-jbxz").find(".c5").remove();
            };
            //不计免赔险
            if($(this).hasClass("check-select-box-bjmpx")){
                $("#bjmpx-val").attr("data-value","0");
                $("#stage4-jbxz").find(".c6").remove();
            };
            //自燃损失险价格
            if($(this).hasClass("check-select-box-zrssx")){
                $("#zrssx-val").attr("data-value","0");
                $("#stage4-fjxz").find(".c1").remove();
            };
            //涉水行驶损失险价格
            if($(this).hasClass("check-select-box-ssxsssx")){
                $("#ssxsssx-val").attr("data-value","0");
                $("#stage4-fjxz").find(".c4").remove();
            };
            //指定专修厂价格
            if($(this).hasClass("check-select-box-zdzxc")){
                $("#zdzxc-val").attr("data-value","0");
                $("#stage4-fjxz").find(".c5").remove();
            };
            //不计免赔险价格
            if($(this).hasClass("check-select-box-bjmpx2")){
                $("#bjmpx2-val").attr("data-value","0");
                $("#stage4-fjxz").find(".c6").remove();
            };
        }else{
            $(this).addClass("check-select-box-cur");
            //车辆损失险
            if($(this).hasClass("check-select-box-clssx")){
                $("#clssx-val").attr("data-value",$("#clssx-val").text());
                $("#stage4-jbxz").append("<li class='c2'><span class='val'>￥<b>" + $("#clssx-val").attr("data-value") + "</b></span><span class='tit'>车辆损失险</span></li>");
            };
            //全车盗抢险
            if($(this).hasClass("check-select-box-qcdqx")){
                $("#qcdqx-val").attr("data-value",$("#qcdqx-val").text());
                $("#stage4-jbxz").append("<li class='c3'><span class='val'>￥<b>" + $("#qcdqx-val").attr("data-value") + "</b></span><span class='tit'>全车盗抢险</span></li>");
            };
            //司机座位责任险
            if($(this).hasClass("check-select-box-sjzwzrx")){
                $("#sjzwzrx-val").attr("data-value",$("#sjzwzrx-val").text());
                $("#stage4-jbxz").append("<li class='c4'><span class='val'>￥<b>" + $("#sjzwzrx-val").attr("data-value") + "</b></span><span class='tit'>司机座位责任险</span></li>");
            };
            //乘客座位责任险
            if($(this).hasClass("check-select-box-ckzwzrx")){
                $("#ckzwzrx-val").attr("data-value",$("#ckzwzrx-val").text());
                $("#stage4-jbxz").append("<li class='c5'><span class='val'>￥<b>" + $("#ckzwzrx-val").attr("data-value") + "</b></span><span class='tit'>乘客座位责任险</span></li>");
            };
            //不计免赔险
            if($(this).hasClass("check-select-box-bjmpx")){
                $("#bjmpx-val").attr("data-value",$("#bjmpx-val").text());
                $("#stage4-jbxz").append("<li class='c6'><span class='val'>￥<b>" + $("#bjmpx-val").attr("data-value") + "</b></span><span class='tit'>不计免赔险</span></li>");
            };
            //自燃损失险
            if($(this).hasClass("check-select-box-zrssx")){
                $("#zrssx-val").attr("data-value",$("#zrssx-val").text());
                $("#stage4-fjxz").append("<li class='c1'><span class='val'>￥<b>" + $("#zrssx-val").attr("data-value") + "</b></span><span class='tit'>自燃损失险</span></li>");
            };
            //涉水行驶损失险
            if($(this).hasClass("check-select-box-ssxsssx")){
                $("#ssxsssx-val").attr("data-value",$("#ssxsssx-val").text());
                $("#stage4-fjxz").append("<li class='c4'><span class='val'>￥<b>" + $("#ssxsssx-val").attr("data-value") + "</b></span><span class='tit'>涉水行驶损失险</span></li>");
            };
            //指定专修厂
            if($(this).hasClass("check-select-box-zdzxc")){
                $("#zdzxc-val").attr("data-value",$("#zdzxc-val").text());
                $("#stage4-fjxz").append("<li class='c5'><span class='val'>￥<b>" + $("#zdzxc-val").attr("data-value") + "</b></span><span class='tit'>指定专修厂</span></li>");
            };
            //不计免赔险
            if($(this).hasClass("check-select-box-bjmpx2")){
                $("#bjmpx2-val").attr("data-value",$("#bjmpx2-val").text());
                $("#stage4-fjxz").append("<li class='c6'><span class='val'>￥<b>" + $("#bjmpx2-val").attr("data-value") + "</b></span><span class='tit'>不计免赔险</span></li>");
            };
        };

        $("#settle2-byhf2").text(parseFloat($("#dszzrx-val").attr("data-value")) + parseFloat($("#clssx-val").attr("data-value")) + parseFloat($("#qcdqx-val").attr("data-value")) + parseFloat($("#sjzwzrx-val").attr("data-value")) + parseFloat($("#ckzwzrx-val").attr("data-value")) + parseFloat($("#bjmpx-val").attr("data-value")));
        $("#settle2-byhf3").text(parseFloat($("#zrssx-val").attr("data-value")) + parseFloat($("#blddpsx-val").attr("data-value")) + parseFloat($("#cshhssx-val").attr("data-value")) + parseFloat($("#ssxsssx-val").attr("data-value")) + parseFloat($("#zdzxc-val").attr("data-value")) + parseFloat($("#bjmpx2-val").attr("data-value")));
        //stage2保险合计
        $("#stage2-all-val").text(parseFloat($("#settle2-byhf").text()) + parseFloat($("#settle2-byhf2").text()) + parseFloat($("#settle2-byhf3").text()));
        $("#j-calc-nav-val2").text($("#stage2-all-val").text());
    });

    $(".point2").click(function(){
        if($(this).hasClass("point2-cur")){
            $(this).removeClass("point2-cur");
            //第三者责任险
            if($(this).hasClass("point2-dszzrx")){
                $(".point2-dszzrx").siblings().find("#dszzrx").attr("disabled","disabled");
                $("#dszzrx-val").attr("data-value","0");
                $("#stage4-jbxz").find(".c1").remove();
            };
            //玻璃单独破碎险
            if($(this).hasClass("point2-blddpsx")){
                $(".point2-blddpsx").siblings().find("#blddpsx").attr("disabled","disabled")
                $("#blddpsx-val").attr("data-value","0");
                $("#stage4-fjxz").find(".c2").remove();
            };
            //车身划痕损失险
            if($(this).hasClass("point2-cshhssx")){
                $(".point2-cshhssx").siblings().find("#cshhssx").attr("disabled","disabled");
                $("#cshhssx-val").attr("data-value","0");
                $("#stage4-fjxz").find(".c3").remove();
            };
        }else{
            $(this).addClass("point2-cur");
            //第三者责任险
            if($(this).hasClass("point2-dszzrx")){
                $(".point2-dszzrx").siblings().find("#dszzrx").removeAttr("disabled");
                $("#dszzrx-val").attr("data-value",$("#dszzrx-val").text());
                $("#stage4-jbxz").append("<li class='c1'><span class='val'>￥<b id='s4-dszzrx-val'>" + $("#dszzrx-val").attr("data-value") + "</b></span><span class='tit'>第三者责任险</span></li>")
            };
            //玻璃单独破碎险
            if($(this).hasClass("point2-blddpsx")){
                $(".point2-blddpsx").siblings().find("#blddpsx").removeAttr("disabled");
                $("#blddpsx-val").attr("data-value",$("#blddpsx-val").text());
                $("#stage4-jbxz").append("<li class='c1'><span class='val'>￥<b id='s4-dszzrx-val'>" + $("#dszzrx-val").attr("data-value") + "</b></span><span class='tit'>第三者责任险</span></li>")
            };
            //车身划痕损失险
            if($(this).hasClass("point2-cshhssx")){
                $(".point2-cshhssx").siblings().find("#cshhssx").removeAttr("disabled");
                $("#cshhssx-val").attr("data-value",$("#cshhssx-val").text());
            };
        };

        $("#settle2-byhf2").text(parseFloat($("#dszzrx-val").attr("data-value")) + parseFloat($("#clssx-val").attr("data-value")) + parseFloat($("#qcdqx-val").attr("data-value")) + parseFloat($("#sjzwzrx-val").attr("data-value")) + parseFloat($("#ckzwzrx-val").attr("data-value")) + parseFloat($("#bjmpx-val").attr("data-value")));
        $("#settle2-byhf3").text(parseFloat($("#zrssx-val").attr("data-value")) + parseFloat($("#blddpsx-val").attr("data-value")) + parseFloat($("#cshhssx-val").attr("data-value")) + parseFloat($("#ssxsssx-val").attr("data-value")) + parseFloat($("#zdzxc-val").attr("data-value")) + parseFloat($("#bjmpx2-val").attr("data-value")));
        //stage2保险合计
        $("#stage2-all-val").text(parseFloat($("#settle2-byhf").text()) + parseFloat($("#settle2-byhf2").text()) + parseFloat($("#settle2-byhf3").text()));
        $("#j-calc-nav-val2").text($("#stage2-all-val").text());
    });

    function add(){
        //车身价
        var csjVal = $("#csj").val();
        //首付款
        var sfkVal = $("#sfk").val();
        var sfValue = (csjVal * sfkVal).toFixed(0);
        $("#sfk-val").text(sfValue);
        //贷款金额
        var dkjeVal = csjVal - sfValue;
        $("#dkje-val").text(dkjeVal);
        //银行利率及利息金额
        var yhllVal = $("#yg").val();
        var lxValue = (parseFloat(csjVal) * yhllVal).toFixed(0);
        $("#lxje-val").text(lxValue);
        //必要花费
        var byhfValue = parseFloat($("#gzs").text()) + parseFloat($("#jrfwf").text()) + parseFloat($("#spfw").val());
        $("#settle-byhf").text(byhfValue);

        //全款
        //必要花费
        var byhfValue2 = parseFloat($("#gzs2").text()) + parseFloat($("#spfw2").val());
        $("#settle-byhf2").text(byhfValue2);
        //车身价
        var sfValue2 = $("#csj2").val();
        var byhfValue2 = parseFloat($("#gzs2").text()) + parseFloat($("#spfw2").val());


        //文案类别变更
        function tabSelect(){
            if($("#j-stage1-tab").find("li").eq(0).hasClass("cur")){
                $("#stage1-p").html("贷款购车，首付" + $("#sfk").find("option:selected").text() + "，" + $("#xzyh").find("option:selected").text() + "，贷款按" + $("#yg").find("option:selected").text() + "计算，需首付" + $("#sfk-val").text() + "元 + 必要花费" + $("#settle-byhf").text() + "元，月还款" + $("#lxje-val").text() + "元");
                var firstValue = parseFloat(sfValue) + parseFloat(byhfValue);
                $("#stage1-all-val").text(firstValue);
                $("#j-calc-nav-val1").text(firstValue);
            }else{
                $("#stage1-p").html("全款购车，车身价" + $("#csj2").val() + "元 + 必要花费" + $("#settle-byhf2").text() + "元");
                var firstValue2 = parseFloat(sfValue2) + parseFloat(byhfValue2);
                $("#stage1-all-val").text(firstValue2);
                $("#j-calc-nav-val1").text(firstValue2);
                $("#j-settle-box-ul3").find(".daikuan").remove();
            };
        };
        tabSelect();

        //第二屏
        //初始化
        $("#dszzrx-val").attr("data-value","0");
        $("#clssx-val").attr("data-value","0");
        $("#qcdqx-val").attr("data-value","0");
        $("#sjzwzrx-val").attr("data-value","0");
        $("#ckzwzrx-val").attr("data-value","0");
        $("#bjmpx-val").attr("data-value","0");
        $("#zrssx-val").attr("data-value","0");
        $("#blddpsx-val").attr("data-value","0");
        $("#cshhssx-val").attr("data-value","0");
        $("#ssxsssx-val").attr("data-value","0");
        $("#zdzxc-val").attr("data-value","0");
        $("#bjmpx2-val").attr("data-value","0");
        //交强险
        $("#jqx-val").text($("#jqx").val());
        //车船税
        $("#ccs-val").text($("#ccs").val());
        //第三者责任险
        $("#dszzrx-val").text($("#dszzrx").val());
        if(!$("#dszzrx").prop("disabled")){
            $("#dszzrx-val").attr("data-value",$("#dszzrx-val").text());
        };
        $("#s4-dszzrx-val").text($("#dszzrx-val").attr("data-value"));
        //乘客座位责任险
        $("#ckzwzrx-val").text(10000 * 0.026);
        //不计免赔险
        $("#bjmpx-val").text(((parseFloat(taxTmp[0]) + parseFloat($("#dszzrx-val").text()) + parseFloat(taxTmp[1]) + parseFloat($("#ckzwzrx-val").text())) * 0.15 + parseFloat(taxTmp[2]) * 0.2).toFixed(0));
        //自燃损失险
        $("#zrssx-val").text(($("#csj").val() * 0.0012).toFixed(0));
        //玻璃单独破碎险
        $("#blddpsx-val").text($("#blddpsx").val() * $("#csj").val());
        if(!$("#blddpsx").prop("disabled")){
            $("#blddpsx-val").attr("data-value",$("#blddpsx-val").text());
        };
        //车身划痕损失险
        $("#cshhssx-val").text($("#cshhssx").val());
        if(!$("#cshhssx").prop("disabled")){
            $("#cshhssx-val").attr("data-value",$("#cshhssx-val").text());
        };
        //涉水行驶损失险
        $("#ssxsssx-val").text((taxTmp[0] * 0.05).toFixed(0));
        //指定专修厂
        $("#zdzxc-val").text((taxTmp[0] * 0.5).toFixed(0));
        //附加险不计免赔险
        $("#bjmpx2-val").text(((parseFloat($("#zrssx-val").text()) + parseFloat($("#cshhssx-val").text()) + parseFloat($("#ssxsssx-val").text())) * 0.15).toFixed(0));
        //小计部分
        $("#settle2-byhf").text(parseFloat($("#jqx-val").text()) + parseFloat($("#ccs-val").text()));
        $("#settle2-byhf2").text(parseFloat($("#dszzrx-val").attr("data-value")) + parseFloat($("#clssx-val").attr("data-value")) + parseFloat($("#qcdqx-val").attr("data-value")) + parseFloat($("#sjzwzrx-val").attr("data-value")) + parseFloat($("#ckzwzrx-val").attr("data-value")) + parseFloat($("#bjmpx-val").attr("data-value")));
        $("#settle2-byhf3").text(parseFloat($("#zrssx-val").attr("data-value")) + parseFloat($("#blddpsx-val").attr("data-value")) + parseFloat($("#cshhssx-val").attr("data-value")) + parseFloat($("#ssxsssx-val").attr("data-value")) + parseFloat($("#zdzxc-val").attr("data-value")) + parseFloat($("#bjmpx2-val").attr("data-value")));
        //stage2保险合计
        $("#stage2-all-val").text(parseFloat($("#settle2-byhf").text()) + parseFloat($("#settle2-byhf2").text()) + parseFloat($("#settle2-byhf3").text()));
        $("#j-calc-nav-val2").text($("#stage2-all-val").text());

//        console.log(parseFloat($("#dszzrx-val").attr("data-value")) +"_"+ parseFloat($("#clssx-val").attr("data-value")) +"_"+ parseFloat($("#qcdqx-val").attr("data-value")) +"_"+ parseFloat($("#sjzwzrx-val").attr("data-value")) +"_"+ parseFloat($("#ckzwzrx-val").attr("data-value")) +"_"+ parseFloat($("#bjmpx-val").attr("data-value")))

//        console.log( parseFloat($("#zrssx-val").attr("data-value")) +"_"+ parseFloat($("#blddpsx-val").attr("data-value")) +"_"+ parseFloat($("#cshhssx-val").attr("data-value")) +"_"+ parseFloat($("#ssxsssx-val").attr("data-value")) +"_"+ parseFloat($("#zdzxc-val").attr("data-value")) +"_"+ parseFloat($("#bjmpx2-val").attr("data-value")))

        //第四屏
        $("#to-stage1-p").text($("#stage1-p").text() + "。首付" + $("#stage1-all-val").text() + "元。");
        $("#s4-jqx-val").text($("#jqx-val").text());
        $("#s4-ccs-val").text($("#ccs-val").text());
        //车身首付
        $("#s4-csj").text($("#csj").val());
        //购置税
        $("#s4-gzs").text($("#gzs").text());
        //金融服务费
        $("#s4-jrfwf").text($("#jrfwf").text());
        //上牌服务费
        $("#s4-spfwf").text($("#spfw").val());
        //抵押服务费
        $("#s4-dyfwf").text($("#dyfw").text());
        //保险金额
        $("#s4-bxje").text($("#stage2-all-val").text());
        //首付合计
        $("#s4-all").text(parseFloat($("#s4-csj").text()) + parseFloat($("#s4-gzs").text()) + parseFloat($("#s4-jrfwf").text()) + parseFloat($("#s4-spfwf").text()) + parseFloat($("#s4-dyfwf").text()) + parseFloat($("#s4-bxje").text()));
        $("#j-calc-nav-val4").text($("#s4-all").text());
    };

    function six(){
        //座位类别判断
        var selectTxt = $("#jqx").find("option:selected").text();
        if(selectTxt == "(家用6座以下)"){
            $("#dszzrx").children().remove();
            $("#dszzrx").append("<option value='660'>(5万)</option><option value='954'>(10万)</option><option value='1087'>(15万)</option><option value='1182' selected='selected'>(20万)</option><option value='1334'>(30万)</option><option value='1601'>(50万)</option><option value='2085'>(100万)</option>")
            $("#dszzrx-val").text($("#dszzrx").val());
            //车辆损失险
            $("#clssx-val").text(566 + parseFloat($("#csj").val()) * 0.0135);
            //全车盗抢险
            $("#qcdqx-val").text(120 + parseFloat($("#csj").val()) * 0.05);
            //司机座位责任险
            $("#sjzwzrx-val").text(10000 * 0.041);
        }else if(selectTxt == "(家用6座以上)"){
            $("#dszzrx").children().remove();
            $("#dszzrx").append("<option value='616'>(5万)</option><option value='869'>(10万)</option><option value='982'>(15万)</option><option value='1058' selected='selected'>(20万)</option><option value='1185'>(30万)</option><option value='1411'>(50万)</option><option value='1838'>(100万)</option>");
            //车辆损失险
            $("#clssx-val").text(679 + parseFloat($("#csj").val()) * 0.0135);
            //全车盗抢险
            $("#qcdqx-val").text(140 + parseFloat($("#csj").val()) * 0.045);
            //司机座位责任险
            $("#sjzwzrx-val").text(10000 * 0.04);
        };
        taxTmp[0] = $("#clssx-val").text();
        taxTmp[1] = $("#sjzwzrx-val").text();
        taxTmp[2] = $("#qcdqx-val").text();
    };


});

//==========================================页面select表单选择逻辑，华丽丽的分割线 ヽ(●´∀`●)ﾉ==========================================
$.extend({
    bankSelect: function (oBank, oMonth, oWay) {
        oBank.click(function () {
            var val = $(this).val();
            oMonth.children().remove();
            oWay.children().remove();
            if (val == "xy") {
                oMonth.append("<option value=''>(12期)</option><option value=''>(24期)</option><option value=''>(36期)</option>");
                oWay.append("<option value=''>分摊收取</option>");
            }else if(val == "zx"){
                oMonth.append("<option value=''>(212期)</option><option value=''>(24期)</option><option value=''>(36期)</option>");
                oWay.append("<option value=''>分摊收取/等额本息</option>");
            }else if(val == "js"){
                oMonth.append("<option value=''>(312期)</option><option value=''>(24期)</option><option value=''>(36期)</option>");
                oWay.append("<option value=''>一次性收取</option>");
            }else if(val == "gs"){
                oMonth.append("<option value=''>(g12期)</option><option value=''>(24期)</option><option value=''>(36期)</option>");
                oWay.append("<option value='ycx'>一次性收取</option><option value='ft'>分摊收取</option>");
            }else if(val == "pa"){
                oMonth.append("<option value=''>(512期)</option><option value=''>(24期)</option><option value=''>(36期)</option>");
                oWay.append("<option value=''>分摊收取</option>");
            }
        });
        oWay.click(function () {
            var val = $(this).val();
            if (val == "ycx") {
                oMonth.children().remove();
                oMonth.append("<option value=''>(z12期)</option><option value=''>(24期)</option><option value=''>(36期)</option>");
            }else if(val == "ft"){
                oMonth.children().remove();
                oMonth.append("<option value=''>(z212期)</option><option value=''>(24期)</option><option value=''>(36期)</option>");
            }
        });
    }
});
$(function() {
    $.bankSelect($("#xzyh"),$("#yg"),$("#lxzffs"));
});

//$(".label4sel").select(function(){
//    $("select").find(".change").click();
//});
/*$(".label4sel").click(function(){
    $(this).find(".change").trigger("click")
});*/
/*$(".label4sel").find(".change").click(function(){
    alert('3')
})*/



/*function addClass1(element,value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className =newClassName;
    };
};
function removeClass2(ele,className){
    var tmpClassName = ele.className;
    ele.className = null;
    ele.className = tmpClassName.split(new RegExp(" " + className + "|" + className + " " + "|" + "^" + className + "$","ig")).join("");
};
function cleanWhitespace(oEelement)
{
    for(var i=0;i<oEelement.childNodes.length;i++){
        var node=oEelement.childNodes[i];
        if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
    }
};
var calcBox = document.getElementsByClassName("calc-box")[0];
cleanWhitespace(calcBox);
var calcUl = document.getElementsByClassName("calc-ul")[0];
var calcSub = calcUl.getElementsByTagName("li");
for(i = 0; i < calcSub.length; i++){
    (function(n){
        calcSub[i].onclick = function(){
            if(n == 0){
                var tp = this.parentNode.nextSibling.children[0];
                addClass1(tp,"calc-area1");
                removeClass2(tp,"calc-area2");
                removeClass2(tp,"calc-area3");
                removeClass2(tp,"calc-area4");
            }else if(n == 1){
                var tp = this.parentNode.nextSibling.children[0];
                addClass1(tp,"calc-area2");
                removeClass2(tp,"calc-area1");
                removeClass2(tp,"calc-area3");
                removeClass2(tp,"calc-area4");
            }else if(n == 2){
                var tp = this.parentNode.nextSibling.children[0];
                addClass1(tp,"calc-area3");
                removeClass2(tp,"calc-area1");
                removeClass2(tp,"calc-area2");
                removeClass2(tp,"calc-area4");
            }else if(n == 3){
                var tp = this.parentNode.nextSibling.children[0];
                addClass1(tp,"calc-area4");
                removeClass2(tp,"calc-area2");
                removeClass2(tp,"calc-area3");
                removeClass2(tp,"calc-area1");
            }
        };
    })(i);
}*/

var txtCarPrice = $("#txtCarPrice"), spanTotalTop = $("#spanTotalTop"), hidTotal = $("#hidTotal"), spanTax = $("#spanTax"), txtPurchaseTax = $("#txtPurchaseTax"), txtLicenseTax = $("#txtLicenseTax"), rdDisplacement10 = $("#rdDisplacement10"), rdDisplacement16 = $("#rdDisplacement16"), rdDisplacement20 = $("#rdDisplacement20"), rdDisplacement25 = $("#rdDisplacement25"), rdDisplacement30 = $("#rdDisplacement30"), rdDisplacement40 = $("#rdDisplacement40"), rdDisplacement40s = $("#rdDisplacement40s"), txtUsageTax = $("#txtUsageTax"), rdSeatCount6 = $("#rdSeatCount6"), rdSeatCount6s = $("#rdSeatCount6s"), txtTrafficInsurance = $("#txtTrafficInsurance"), spanCommerceTotal = $("#spanCommerceTotal"), rdThirdInsureClaim5 = $("#rdThirdInsureClaim5"), rdThirdInsureClaim10 = $("#rdThirdInsureClaim10"), rdThirdInsureClaim20 = $("#rdThirdInsureClaim20"), rdThirdInsureClaim50 = $("#rdThirdInsureClaim50"), rdThirdInsureClaim100 = $("#rdThirdInsureClaim100"), txtThirdInsurance = $("#txtThirdInsurance"), txtDamageInsurance = $("#txtDamageInsurance"), txtStolenInsurance = $("#txtStolenInsurance"), rdImport0 = $("#rdImport0"), rdImport1 = $("#rdImport1"), txtGlassInsurance = $("#txtGlassInsurance"), txtCombustInsurance = $("#txtCombustInsurance"), txtNoDeductibleInsurance = $("#txtNoDeductibleInsurance"), txtNoLiabilityInsurance = $("#txtNoLiabilityInsurance"), txtPassengerInsurance = $("#txtPassengerInsurance"), rdCarBodyInsure2000 = $("#rdCarBodyInsure2000"), rdCarBodyInsure5000 = $("#rdCarBodyInsure5000"), rdCarBodyInsure10000 = $("#rdCarBodyInsure10000"), rdCarBodyInsure20000 = $("#rdCarBodyInsure20000"), txtCarBodyInsurance = $("#txtCarBodyInsurance"), spanTotalBottom = $("#spanTotalBottom");

function specChange(data) {

    var price = data.MinPrice, displacement = carCostParseFloat(data.Displacement), isImport = data.Isimport == "进口" ? 1
        : 0, seatCount = data.StructureSeat;

    if (displacement <= 1.0) {
        rdDisplacement10.attr("checked", true);
    } else if (displacement > 1.0 && displacement <= 1.6) {

        rdDisplacement16.attr("checked", true);
    } else if (displacement > 1.6 && displacement <= 2.0) {

        rdDisplacement20.attr("checked", true);
    } else if (displacement > 2.0 && displacement <= 2.5) {

        rdDisplacement25.attr("checked", true);
    } else if (displacement > 2.5 && displacement <= 3.0) {

        rdDisplacement30.attr("checked", true);
    } else if (displacement > 3.0 && displacement <= 4.0) {

        rdDisplacement40.attr("checked", true);
    } else if (displacement > 4.0) {

        rdDisplacement40s.attr("checked", true);
    }

    $("input[name='rdImport'][value='" + isImport + "']").attr("checked",
        true);
    if (seatCount < 6) {
        rdSeatCount6.attr("checked", true);
    } else {
        rdSeatCount6s.attr("checked", true);
    }

}

(function() {

    var carCostManager = (function() {
        var _carCostManager = {};

        var carCostParam = {
            reSetCustom : true,
            // 购车价格
            carPrice : 0,
            // 首付自定义
            prepaymentCustom : 0,
            // 首付比例
            prepaymentPercent : 0.3,
            // 还款年限
            loanYears : 3,
            // 自定义上牌费用
            licenseTaxCustom : 0,
            // 自定义车船使用税
            usageTaxCustom : 0,
            // 排量
            displacement : 1.6,
            // 座位数
            seatCount : 5,
            // 是否进口车
            isImport : 0,
            // 第三者责任险 赔付额度
            thirdInsureClaim : 100000,
            // 自定义车上人员责任险
            passengerInsureCustom : 0,
            // 车身划痕险 赔付额度
            carBodyInsureClaim : 5000,
            // 是否勾选
            CommInsureCheck : {
                // 第三者责任险
                thirdCheck : true,
                // 车辆损失险
                damageCheck : true,
                // 全车盗抢险
                stolenCheck : true,
                // 玻璃单独破碎险
                glassCheck : true,
                // 自燃损失险
                combustCheck : true,
                // 不计免赔特约险
                noDeductibleCheck : true,
                // 无过责任险
                noLiabilityCheck : true,
                // 车上人员责任险
                passengerCheck : true,
                // 车身划痕险
                carBodyCheck : true
            }
        };

        var getCarCostParam = function() {
            // if (txtPassengerInsurance.val() === "") {
            // txtPassengerInsurance.val("50");
            // }
            carCostParam.carPrice = carCostParseFloat(carCostParseFloat(txtCarPrice
                .val()));
            carCostParam.licenseTaxCustom = carCostParseFloat(txtLicenseTax
                .val());
            carCostParam.usageTaxCustom = carCostParseFloat(txtUsageTax.val());
            carCostParam.displacement = carCostParseFloat($(
                "input[name='rdDisplacement']:checked").val());

            carCostParam.seatCount = carCostParseFloat($(
                "input[name='rdSeatCount']:checked").val());

            carCostParam.isImport = carCostParseFloat($(
                "input[name='rdImport']:checked").val());

            carCostParam.thirdInsureClaim = carCostParseFloat($(
                "input[name='rdThirdInsureClaim']:checked").val());

            carCostParam.passengerInsureCustom = carCostParseFloat(parseFloat(txtPassengerInsurance
                .val()));
            carCostParam.carBodyInsureClaim = carCostParseFloat($(
                "input[name='rdCarBodyInsure']:checked").val());

            carCostParam.CommInsureCheck.thirdCheck = $("#cbThirdCheck")
                .attr("checked");
            carCostParam.CommInsureCheck.damageCheck = $("#cbDamageCheck")
                .attr("checked");
            carCostParam.CommInsureCheck.stolenCheck = $("#cbStolenCheck")
                .attr("checked");
            carCostParam.CommInsureCheck.glassCheck = $("#cbGlassCheck")
                .attr("checked");
            carCostParam.CommInsureCheck.combustCheck = $(
                "#cbCombustCheck").attr("checked");
            carCostParam.CommInsureCheck.noDeductibleCheck = $(
                "#cbNoDeductibleCheck").attr("checked");
            carCostParam.CommInsureCheck.noLiabilityCheck = $(
                "#cbNoLiabilityCheck").attr("checked");
            carCostParam.CommInsureCheck.passengerCheck = $(
                "#cbPassengerCheck").attr("checked");
            carCostParam.CommInsureCheck.carBodyCheck = $(
                "#cbCarBodyCheck").attr("checked");
            return carCostParam;

        };

        _carCostManager.reSetCustom = function() {
            carCostParam.reSetCustom = true;
        }

        _carCostManager.refreshFee = function() {

            carCostParam = getCarCostParam();
            var carPurchaseCost = new CarPurchaseCost();
            carCostParam.carPrice = parseFloat(carCostParseFloat(txtCarPrice
                .val()));

            if (carCostParam.carPrice <= 0) {
                _carCostManager.reset();

                return;
            }

            $("#divTopNoSelect").hide();
            $("#divTopTotal").show();
            $("#divTopTotalTip").show();

            var carPurchaseFee = carPurchaseCost
                .getCarPurchaseCost(carCostParam);

            spanTotalTop.html(formatNum(carPurchaseFee.getTotal(), 0));
            hidTotal.val(carPurchaseFee.getTotal());
            spanTax.html(carPurchaseFee.getTotalTax() == 0 ? "小计：0元" : "小计："
                + formatNum(carPurchaseFee.getTotalTax(), 0) + "元");
            txtPurchaseTax
                .val(carPurchaseFee.carPurchaseTax.purchaseTax == 0 ? ""
                    : carPurchaseFee.carPurchaseTax.purchaseTax);
            txtLicenseTax
                .val(carPurchaseFee.carPurchaseTax.licenseTax == 0 ? ""
                    : carPurchaseFee.carPurchaseTax.licenseTax);
            txtUsageTax.val(carPurchaseFee.carPurchaseTax.usageTax == 0 ? ""
                : carPurchaseFee.carPurchaseTax.usageTax);
            txtTrafficInsurance
                .val(carPurchaseFee.carInsurance.trafficInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.trafficInsurance);
            spanCommerceTotal
                .html(carPurchaseFee.getCommerceInsurance() == 0 ? "商业保险小计：0元"
                    : "商业保险小计："
                    + formatNum(carPurchaseFee
                        .getCommerceInsurance(), 0) + "元");
            txtThirdInsurance
                .val(carPurchaseFee.carInsurance.thirdInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.thirdInsurance);
            txtDamageInsurance
                .val(carPurchaseFee.carInsurance.damageInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.damageInsurance);
            txtStolenInsurance
                .val(carPurchaseFee.carInsurance.stolenInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.stolenInsurance);
            txtGlassInsurance
                .val(carPurchaseFee.carInsurance.glassInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.glassInsurance);
            txtCombustInsurance
                .val(carPurchaseFee.carInsurance.combustInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.combustInsurance);
            txtNoDeductibleInsurance
                .val(carPurchaseFee.carInsurance.noDeductibleInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.noDeductibleInsurance);
            txtNoLiabilityInsurance
                .val(carPurchaseFee.carInsurance.noLiabilityInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.noLiabilityInsurance);
            txtPassengerInsurance
                .val(carPurchaseFee.carInsurance.passengerInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.passengerInsurance);
            txtCarBodyInsurance
                .val(carPurchaseFee.carInsurance.carBodyInsurance == 0 ? ""
                    : carPurchaseFee.carInsurance.carBodyInsurance);
            spanTotalBottom.html(carPurchaseFee.getTotal() == 0 ? "0"
                : formatNum(carPurchaseFee.getTotal(), 0));
            carCostParam.reSetCustom = false;
        }

        _carCostManager.reset = function() {
            $("#divTopNoSelect").show();
            $("#divTopTotal").hide();
            $("#divTopTotalTip").hide();
            spanTotalTop.html("0");
            hidTotal.val("0");
            spanTax.html("小计：0元");
            txtPurchaseTax.val("0");
            txtLicenseTax.val("0");
            txtUsageTax.val("0");
            txtTrafficInsurance.val("0");
            spanCommerceTotal.html("商业保险小计：0元");
            txtThirdInsurance.val("0");
            txtDamageInsurance.val("0");
            txtStolenInsurance.val("0");
            txtGlassInsurance.val("0");
            txtCombustInsurance.val("0");
            txtNoDeductibleInsurance.val("0");
            txtNoLiabilityInsurance.val("0");
            txtPassengerInsurance.val("0");
            txtCarBodyInsurance.val("0");
            spanTotalBottom.html("0");
            redirect();
        };
        return _carCostManager;
    })();

    $.each([ "#txtCarPrice" ], function() {
        $(this.toString()).bind("change", function(event) {
            redirect();
            if (!validate($(this).val())) {
                $(this).val('');
                carCostManager.reset();

                return;
            }
            carCostManager.refreshFee();
        });
    });

    $.each([ "#txtLicenseTax", "#txtUsageTax", "#txtPassengerInsurance" ],
        function() {
            $(this.toString()).bind("change", function(event) {
                if (!validate($(this).val())) {
                    $(this).val('');
                    return;
                }
                carCostManager.refreshFee();
            });
        });

    $.each([ "#txtCarPrice" ], function() {
        $(this.toString()).bind("keyup", function(event) {
            if (!validate($(this).val())) {
                alert("请输入数字");
                $(this).val('');
                carCostManager.reset();
                return;
            }

            carCostManager.refreshFee();
        });
    });

    $.each([ "#txtLicenseTax", "#txtUsageTax", "#txtPassengerInsurance" ],
        function() {
            $(this.toString()).bind("keyup", function(event) {

                if (!validate($(this).val())) {
                    alert("请输入数字");
                    $(this).val('');
                    return;
                }

                carCostManager.refreshFee();

            });
        });

    $("input[name='rdDisplacement']").bind(
        "change",
        function(event) {
            var carPurchaseCost = new CarPurchaseCost();
            var usageTax = carPurchaseCost
                .getUsageTax(carCostParseFloat($(this).val()));
            txtUsageTax.val(usageTax);
            carCostManager.refreshFee();
        });

    $.each([ "input[name='rdSeatCount']",
        "input[name='rdThirdInsureClaim']", "input[name='rdImport']",
        "input[name='rdCarBodyInsure']" ], function() {
        $(this.toString()).bind("change", function(event) {
            carCostManager.refreshFee();
        });
    });

    $.each([ "#cbStolenCheck", "#cbGlassCheck", "#cbCombustCheck",
        "#cbNoDeductibleCheck", "#cbNoLiabilityCheck", "#cbPassengerCheck",
        "#cbCarBodyCheck" ], function() {
        $(this.toString()).bind("change", function(event) {
            carCostManager.refreshFee();
        });
    });

    $("#cbThirdCheck").bind(
        "change",
        function(event) {
            if (!$(this).attr("checked")) {
                $("#cbNoLiabilityCheck").attr("checked", false);
                $("#cbNoDeductibleCheck").attr("disabled", true);
                $("#cbNoLiabilityCheck").attr("disabled", true);
            } else {
                $("#cbNoLiabilityCheck").attr("disabled", false);
            }

            if ($(this).attr("checked")
                && $("#cbDamageCheck").attr("checked")) {
                $("#cbNoDeductibleCheck").attr("disabled", false);
            } else {
                $("#cbNoDeductibleCheck").attr("checked", false);
                $("#cbNoDeductibleCheck").attr("disabled", true);
            }

            carCostManager.refreshFee();
        });

    $("#cbDamageCheck").bind(
        "change",
        function(event) {
            if (!$(this).attr("checked")) {
                $("#cbStolenCheck").attr("checked", false);
                $("#cbCarBodyCheck").attr("checked", false);
                $("#cbStolenCheck").attr("disabled", true);
                $("#cbCarBodyCheck").attr("disabled", true);
            } else {
                $("#cbStolenCheck").attr("disabled", false);
                $("#cbCarBodyCheck").attr("disabled", false);
            }

            if ($(this).attr("checked")
                && $("#cbThirdCheck").attr("checked")) {
                $("#cbNoDeductibleCheck").attr("disabled", false);
            } else {
                $("#cbNoDeductibleCheck").attr("checked", false);
                $("#cbNoDeductibleCheck").attr("disabled", true);
            }
            carCostManager.refreshFee();
        });

    $(function() {
        var val = $('#txtCarPrice').val();
        if (val != null) {
            txtCarPrice.val(val);
            carCostManager.refreshFee();
        }
    });

})();
