//calc

//初始css相关
$(function(){
    //4等分元素屏幕宽度
    $(".calc-blk").css("width",$(document).width());
    $(".j-sh-switch").click(function(){
        $(this).next().toggle();
        if($(this).hasClass("j-sh-switch-cur")){
            $(this).removeClass("j-sh-switch-cur");
        }else{
            $(this).addClass("j-sh-switch-cur");
        };
    });
//    $(".cash").text("待定");
});
//冒泡排序
function bubbleSort(arr){
    var i=arr.length, j;
    var tempExchangVal;
    while(i>0){
        for(j=0;j<i-1;j++){
            if(arr[j]>arr[j+1]){
                tempExchangVal = arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=tempExchangVal;
            }
        }
        i--;
    }
    return arr;
};
//四屏高度取最高值
function bigHei(){
    var arrHei = [];
    $(".calc-blk").each(function(){
        arrHei.push($(this).height())
    });
    bubbleSort(arrHei);
    //absolute块赋予高度
    $(".calc-blks").css("height",arrHei[3]);
};
bigHei();
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
        calc_get_height($('.calc-blk').eq(i));
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

//==========================================页面select表单选择逻辑，华丽丽的分割线 ヽ(●´∀`●)ﾉ==========================================
$.extend({
    bankSelect: function (oBank, oMonth, oWay) {
        oBank.change(function () {
            var val = $(this).val();
            oMonth.children().remove();
            oWay.children().remove();
            if (val == "xy") {
                oMonth.append("<option value='0.0588' data-cycle='12'>(12期)</option><option value='0.1032' data-cycle='24'>(24期)</option><option value='0.144' data-cycle='36'>(36期)</option>");
                oWay.append("<option value='ftsq'>分摊收取</option>");
            }else if(val == "zx"){
                oMonth.append("<option value='0.0896' data-cycle='12'>(12期)</option><option value='0.0896' data-cycle='24'>(24期)</option><option value='0.0896' data-cycle='36'>(36期)</option>");
                oWay.append("<option value='ftsq'>分摊收取</option>");
            }else if(val == "js"){
             oMonth.append("<option value='0' data-cycle='12'>(12期)</option><option value='0.072' data-cycle='24'>(24期)</option><option value='0.108' data-cycle='36'>(36期)</option>");
             oWay.append("<option value='ycxsq'>一次性收取</option>");
             }else if(val == "gs"){
             oMonth.append("<option value='0.0358' data-cycle='12'>(12期)</option><option value='0.0705' data-cycle='24'>(24期)</option><option value='0.1043' data-cycle='36'>(36期)</option>");
             oWay.append("<option value='ycxsq'>一次性收取</option>");
             }else if(val == "zg"){
            oMonth.append("<option value='0.035' data-cycle='12'>(12期)</option><option value='0.035' data-cycle='24'>(24期)</option><option value='0.11' data-cycle='36'>(36期)</option>");
             oWay.append("<option value='ycxsq'>一次性收取</option><option value='ftsq'>分摊收取</option>");
             }else if(val == "pa"){
             oMonth.append("<option value='0.06' data-cycle='12'>(12期)</option><option value='0.12' data-cycle='24'>(24期)</option><option value='0.18' data-cycle='36'>(36期)</option>");
             oWay.append("<option value='ftsq'>分摊收取</option>");
             };
        });
        oWay.change(function () {
            var val = $(this).val();
            if (val == "ycxsq") {
                oMonth.children().remove();
                oMonth.append("<option value='0.035' data-cycle='12'>(12期)</option><option value='0.035' data-cycle='24'>(24期)</option><option value='0.11' data-cycle='36'>(36期)</option>");
            }else if(val == "ftsq"){
                oMonth.children().remove();
                oMonth.append("<option value='0.04' data-cycle='12'>(12期)</option><option value='0.08' data-cycle='24'>(24期)</option><option value='0.115' data-cycle='36'>(36期)</option>");
            }
        });
    }
});
$(function() {
    $.bankSelect($("#xzyh"),$("#yg"),$("#lxzffs"));
});

//==========================================计算逻辑，华丽丽的分割线 ヽ(●´∀`●)ﾉ==========================================
taxTmp = [];
$(function(){
    six();
    add();
    $(".change").on("change",function(){
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
                $("#stage4-jbxz").append("<li class='c1'><span class='val'>￥<b id='s4-dszzrx-val'>" + $("#dszzrx-val").attr("data-value") + "</b></span><span class='tit'>第三者责任险</span></li>");
            };
            //玻璃单独破碎险
            if($(this).hasClass("point2-blddpsx")){
                $(".point2-blddpsx").siblings().find("#blddpsx").removeAttr("disabled");
                $("#blddpsx-val").attr("data-value",$("#blddpsx-val").text());
                $("#stage4-fjxz").append("<li class='c2'><span class='val'>￥<b id='s4-blddpsx-val'>" + $("#blddpsx-val").attr("data-value") + "</b></span><span class='tit'>玻璃单独破碎险</span></li>");
            };
            //车身划痕损失险
            if($(this).hasClass("point2-cshhssx")){
                $(".point2-cshhssx").siblings().find("#cshhssx").removeAttr("disabled");
                $("#cshhssx-val").attr("data-value",$("#cshhssx-val").text());
                $("#stage4-fjxz").append("<li class='c3'><span class='val'>￥<b id='s4-cshhssx-val'>" + $("#cshhssx-val").attr("data-value") + "</b></span><span class='tit'>车身划痕损失险</span></li>");
            };
        };

        $("#settle2-byhf2").text(parseFloat($("#dszzrx-val").attr("data-value")) + parseFloat($("#clssx-val").attr("data-value")) + parseFloat($("#qcdqx-val").attr("data-value")) + parseFloat($("#sjzwzrx-val").attr("data-value")) + parseFloat($("#ckzwzrx-val").attr("data-value")) + parseFloat($("#bjmpx-val").attr("data-value")));
        $("#settle2-byhf3").text(parseFloat($("#zrssx-val").attr("data-value")) + parseFloat($("#blddpsx-val").attr("data-value")) + parseFloat($("#cshhssx-val").attr("data-value")) + parseFloat($("#ssxsssx-val").attr("data-value")) + parseFloat($("#zdzxc-val").attr("data-value")) + parseFloat($("#bjmpx2-val").attr("data-value")));
        //stage2保险合计
        $("#stage2-all-val").text(parseFloat($("#settle2-byhf").text()) + parseFloat($("#settle2-byhf2").text()) + parseFloat($("#settle2-byhf3").text()));
        $("#j-calc-nav-val2").text($("#stage2-all-val").text());
    });

    function add(){

        //文案类别变更
        function tabSelect(){
            if($("#j-stage1-tab").find("li").eq(0).hasClass("cur")){
                $("#stage1-p").html("贷款购车，首付" + $("#sfk").find("option:selected").text() + "，" + $("#xzyh").find("option:selected").text() + "，贷款按" + $("#yg").find("option:selected").text() + "计算，需首付" + $("#sfk-val").text() + "元 + 必要花费" + $("#settle-byhf").text() + "元，月还款" + $("#lxje-val").text() + "元");
                var firstValue = parseFloat(sfValue) + parseFloat(byhfValue);
                $("#stage1-all-val").text(firstValue);
                $("#j-calc-nav-val1").text(firstValue);
                $("#j-settle-box-ul3").find(".daikuan").css("display","block");
                //首付合计
                $("#s4-all").text(parseFloat($("#s4-csj").text()) + parseFloat($("#s4-gzs").text()) + parseFloat($("#s4-jrfwf").text()) + parseFloat($("#s4-spfwf").text()) + parseFloat($("#s4-dyfwf").text()) + parseFloat($("#s4-bxje").text()));
            }else{
                $("#stage1-p").html("全款购车，车身价" + $("#csj2").val() + "元 + 必要花费" + $("#settle-byhf2").text() + "元");
                var firstValue2 = parseFloat(sfValue2) + parseFloat(byhfValue2);
                $("#stage1-all-val").text(firstValue2);
                $("#j-calc-nav-val1").text(firstValue2);
                $("#j-settle-box-ul3").find(".daikuan").css("display","none");
                //首付合计
                $("#s4-all").text(parseFloat($("#s4-csj").text()) + parseFloat($("#s4-gzs").text()) + parseFloat($("#s4-spfwf").text()) + parseFloat($("#s4-bxje").text()));
            };
        };
        tabSelect();

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
        if($("#lxzffs").val() == "ftsq"){
            var lxValue = (dkjeVal * (1 + parseFloat(yhllVal)) / $("#yg").find("option:selected").attr("data-cycle")).toFixed(0);
        };
        if($("#lxzffs").val() == "ycxsq"){
            var lxValue = (dkjeVal / $("#yg").find("option:selected").attr("data-cycle")).toFixed(0);
            var ycxLxValue = (dkjeVal * yhllVal).toFixed(0);
            $("#stage1-p").append("<span>，贷款利息一次性支付：" + ycxLxValue + "元</span>")
        };
        $("#lxje-val").text(lxValue);
        //购置税
        $("#gzs").text((csjVal / (1 + 0.17) * 0.1).toFixed(0));
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
        //购置税
        $("#gzs2").text((sfValue2 / (1 + 0.17) * 0.1).toFixed(0));

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
        $("#ckzwzrx-val").text(10000 * 0.0026);
        //不计免赔险
        bjmpx_run();
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
        if($("#j-stage1-tab").find("li").eq(0).hasClass("cur")){
            $("#s4-all").text(parseFloat($("#s4-csj").text()) + parseFloat($("#s4-gzs").text()) + parseFloat($("#s4-jrfwf").text()) + parseFloat($("#s4-spfwf").text()) + parseFloat($("#s4-dyfwf").text()) + parseFloat($("#s4-bxje").text()));
            $("#s4-tit").text("首付合计");
        }else{
            $("#s4-all").text(parseFloat($("#s4-csj").text()) + parseFloat($("#s4-gzs").text()) + parseFloat($("#s4-spfwf").text()) + parseFloat($("#s4-bxje").text()));
            $("#s4-tit").text("购车合计");
        };
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
            $("#qcdqx-val").text(120 + parseFloat($("#csj").val()) * 0.005);
            //司机座位责任险
            $("#sjzwzrx-val").text(10000 * 0.0041);
        }else if(selectTxt == "(家用6座以上)"){
            $("#dszzrx").children().remove();
            $("#dszzrx").append("<option value='616'>(5万)</option><option value='869'>(10万)</option><option value='982'>(15万)</option><option value='1058' selected='selected'>(20万)</option><option value='1185'>(30万)</option><option value='1411'>(50万)</option><option value='1838'>(100万)</option>");
            //车辆损失险
            $("#clssx-val").text(679 + parseFloat($("#csj").val()) * 0.0135);
            //全车盗抢险
            $("#qcdqx-val").text(140 + parseFloat($("#csj").val()) * 0.0045);
            //司机座位责任险
            $("#sjzwzrx-val").text(10000 * 0.004);
        };
        taxTmp[0] = $("#clssx-val").text();
        taxTmp[1] = $("#sjzwzrx-val").text();
        taxTmp[2] = $("#qcdqx-val").text();
        bjmpx_run();
    };
    function bjmpx_run(){
        $("#bjmpx-val").text(((parseFloat(taxTmp[0]) + parseFloat($("#dszzrx-val").text()) + parseFloat(taxTmp[1]) + parseFloat($("#ckzwzrx-val").text())) * 0.15 + parseFloat(taxTmp[2]) * 0.2).toFixed(0));
    }
});


//stage3
$(function(){
    calc_autosize();
    $('.jzjp-list').each(function(){
        $(this).find('li:last').addClass('last');
    });
    $('#j-jzjp-tab li').click(function(){
        calc_get_height(this);
    });
    $('.jzjp-list li .point2,.calc-list-ul-jzjp-li .point2').bind('click',function(){
        //$(this).parents('li').siblings().find('.point2').removeClass('point2-cur');
        var jse=$('.point2-cur').parents('li');
        var total=getTotal($(jse).find('.price-final'));
        var html=getTaozhuang(jse,'.title');
        if(html=='')html='暂无选择';
        $(this).parents('.calc-con').find('.calc-settle #stage1-p').html(html);
        $(this).parents('.calc-con').find('.calc-settle .js .val').html(total);
        getTotalALL();
        calc_get_height(this);
    });
    $('.jzjp-select').each(function(){
        var jse=this;
        var comput=function(){
            try{
                var cur=$(jse).parents('.calc-con').find('dl.cur');
                var total=getTotal(cur.find('big.fr'));
                var html=getTaozhuang(cur);
                $(jse).parents('.calc-con').find('.calc-settle').find('#stage1-p').html(html);
                $(jse).parents('.calc-con').find('.calc-settle').find('.js .val').html(total);
                getTotalALL();
            }catch(err){}
        }
        $(this).find('dt').bind('click',function(){
            var dl=$(this).parent();
            dl.siblings().removeClass('cur');
            if(dl.hasClass('cur')){
                dl.removeClass('cur');
            }
            else{
                dl.addClass('cur');
            }
            if(dl.parents('#j-jzjp-select-normal').length==0){calc_get_height(this);return;}
            var ml=dl.parents('.calc-cons').offset().left-dl.find('dd').offset().left;
            var oml=dl.find('dd').css('margin-left');
            if(oml=='0px'){dl.find('dd').css({'margin-left':ml});}
            comput();
            calc_get_height(this);
        });
        $(this).find('dl').each(function(){
            price_sum=getTotal($(this).find('.price-final'));
            $(this).find('.jzjp-list-total .hl span').html(price_sum);
        });
        comput();
    });
    $('.jzjp-select').find('.duibi').bind('click',function(){
        if($(this).find('a').hasClass('show'))$(this).find('a').removeClass('show');
        else $(this).find('a').addClass('show');
        $(this).siblings('.price-area').toggle();
    });
});
function getTaozhuang(obj,hobj){
    var html='';
    var hobj=hobj||'dt span';
    $(obj).each(function(n){
        var prex=n==0?'':'+';
        html+=prex+$(this).find(hobj).html();
    });
    return html;
}
function getTotalALL(){
    var all=getTotal($('.calc-blk:eq(2) .calc-settle'),'.js .val');
    $('.calc-nav-ul li:eq(2) .cash').html('￥'+all);
}
function getTotal(obj,vobj){
    var sum=0,vobj=vobj||'.hl span';
    $(obj).each(function(){
        sum+=parseFloat($(this).find(vobj).html());
    });
    return sum;
}
function calc_autosize(){
    function run(){
        $('.jzjp-select').each(function(){
            $(this).find('dl').each(function(){
                var win_w=$(document.body).width();
                var w=$(this).find('dt').width();
                $(this).find('dd').css({'width':win_w});
                if($(this).parents('#j-jzjp-select-normal').length==0)return;
                $(this).css({'width':w});
            });
        });
    }
    run();
    $(window).resize(run);
}
function calc_get_height(me){
    obj=$(me).hasClass('calc-blk')?me:$(me).parents('.calc-blk');
    $('.calc-blks').css('height',$(obj).height());
}
