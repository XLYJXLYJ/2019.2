$(function(){
	var hostArr = document.domain.split('.');
    var p2 = hostArr.pop();
    var p1 = hostArr.pop();
//  document.domain = p1 + '.' + p2;
    // 弹出 对话框
    $(document).on("click", ".robotBtn", function () {
        //			$(".mainCont").toggleClass("hide");
        $(".contPart2Txt").val("1");
        setTimeout(function () {
            $(".contPart2Txt").val("");
        })
        $(".contPart2Btn").css({color: "#c8c9d0", backgroundColor: "#E9E9F4", cursor: "not-allowed"});
    });

    // 点击对话框的 关闭按钮
    $(document).on("click", ".closeBtn", function () {
        $(".evaluateTxt").val("");
        $(".closeDiv").css({display: "block"});
        $(".closeFix").css({visibility: "visible"});
        $(".wrongTip").html("");
    });

    // 关闭 对话框函数
    var closeMain = function () {
        parent.$(".robotBtn").addClass("robotBtn1").removeClass("robotBtn2");
        parent.layer.closeAll();
    };

    // 点击 暂不评价
    $(document).on("click", ".evaluateNo", function () {
        closeMain();
    });
    // 点击 评价
    $(document).on("click", ".evaluate", function () {
        var evaluateTxt = $(".evaluateTxt");
        if (evaluateTxt.val()) {
            $.post("http://www.dev.qibaozz.com/aimi/feedback", {'content': $.trim(evaluateTxt.val())}, function (data) {
            }, 'json');
            closeMain();
        } else {
            $(".wrongTip").html("请输入评价内容");
        }

    });
    $(".evaluateTxt").blur(function () {
        if ($.trim($(this).val())) {
            $(".wrongTip").html("");
        }
    });

    // 转人工服务
    $(document).on("click", ".toChat", function () {
        parent.$(".layui-layer").animate({right: -456}, 500);
        parent.$(".robotBtn").addClass("robotBtn3").removeClass("robotBtn2");
    });

    // 监控输入框内容
    $(".contPart2Txt").bind('input propertychange', function () {
        if ($.trim($(this).val())) {
            $(".contPart2Btn").css({color: "#fff", backgroundColor: "#524ae7", cursor: "pointer"});
        } else {
            $(".contPart2Btn").css({color: "#c8c9d0", backgroundColor: "#E9E9F4", cursor: "not-allowed"});
        }
    });

    // 发送信息函数
    var sendMsg = function () {
        $(".contPart2Txt").focus();
        var contTxt = $(".contPart1");
        var textInpt = $(".contPart2Txt");
        var msg = textInpt.val();
        if (msg) {
            var liRightHtml = '<li class="liRight clear">\
                                    <div class="liTxtCont"><div class="liTipPic"></div>' + textInpt.val() + '</div>\
                                </li>';
            contTxt.append(liRightHtml);
            var scrollHeight = contTxt[0].scrollHeight;
            contTxt.scrollTop(scrollHeight);
            textInpt.val("");
        }
        $(".contPart2Btn").css({color: "#c8c9d0", backgroundColor: "#E9E9F4", cursor: "not-allowed"});
        if(msg){
            $.post("http://www.dev.qibaozz.com/aimi/message", {'msg': msg}, function (data) {
                contTxt.append(data.data.msg);
                var scrollHeight = contTxt[0].scrollHeight;
                contTxt.scrollTop(scrollHeight + 100);
            }, 'json');
        }
    };
    // 点击 发送
    $(document).on("click", ".contPart2Btn", function () {
        sendMsg();
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            sendMsg();
        }
    });

    // 点击 解决或未解决
    $(document).on("click", ".askNo", function () {
        var siblingDiv = $(this).siblings("div");
        if(siblingDiv.find(".askPic").hasClass("clickYes")){
            return false;
        } else {
            $(this).find(".askPic").addClass("clickNo");
            siblingDiv.find(".askPic").removeClass("clickYes");
            siblingDiv.css({cursor:"not-allowed"});
        }

    });
    $(document).on("click", ".askYes", function () {
        var siblingDiv = $(this).siblings("div");
        if(siblingDiv.find(".askPic").hasClass("clickNo")){
            return false;
        } else {
            var isActive = $(this).find(".askPic").hasClass("clickYes") ? 'yes' : "no";
            $(this).find(".askPic").addClass("clickYes");
            siblingDiv.find(".askPic").removeClass("clickNo");
            siblingDiv.css({cursor:"not-allowed"});
            if('no' == isActive){
                $.post("http://www.dev.qibaozz.com/aimi/solve", {'is_solve': 1}, function (data) {}, 'json');
            }
        }
    });
})
