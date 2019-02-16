$(function(){
	
	 $(".passwordform").Validform({
        tiptype: 4,
        btnSubmit: ".ok",
        ajaxPost: true,
        postonce: true,
        beforeCheck: function (curform) {
            $("#o").text("");
            $("#p").text("");
            $("#r").text("");
        },
        callback: function (data) {
            if (data == true) {
                alert('修改成功');
                window.location.href = "/index/security/index";
            } else {
                $("#" + data.error).text(data.msg);
            }
        }
    });

    $(".myform3").Validform({
        tiptype: 4,
        btnSubmit: ".ok",
        ajaxPost: true,
        postonce: true,
        callback: function (data) {
            if (data == true) {
                alert('修改成功');
                window.location.href = "/index/security/index";
            } else {
                $("#" + data.error).text(data.msg);
            }
        }
    });

    function sendMessage(e) {
        var verifycode = $("input[name='verifycode']").val();
        jsonAjax("/index/security/verification", {verifycode: verifycode}, 'json', function (data) {
            if (data.status == 'y') {
                $("#v").text("");
                var mobile = $("input[name='phone']").val();
                var mobilereg = /^(((1[0-9]{2}))+\d{8})$/;
                if (mobile == "") {
                    $("#mobile").text('请输入手机号');
                    return false;
                }
                if (!mobilereg.test(mobile)) {
                    $("#mobile").text('请输入正确的手机号');
                    return false;
                }
                jsonAjax("/index/security/sendMessage", {'mobile': mobile,'verifycode':verifycode}, 'json', function (msg) {
                    if (msg==0){
                        $("#verifycode").text('验证码不正确');
                        return false;
                    }
                    var i = 60;
                    var timer1;
                    function wait() {
                        if (i > 0) {
                            i--;
                            $(e).removeAttr('onclick');
                            $(e).text("重新发送(" + i + ")");
                        } else {
                            $(e).attr('onclick', 'sendMessage(this)');
                            $(e).text("发送验证码");
                            i = 60;
                            clearInterval(timer1);
                        }
                    }
                    timer1 = setInterval(wait, 1000);
                });
            } else {
                if (data.position == 'v') {
                    $("#code").attr('src', "/index/index/verifycode/");
                }
                $("#verifycode").text(data.info);
            }
        })
    };
	
	//选择修改类型
	$(document).on("click",".phone-modify",function(){
		$(".all_fix").show();
		$(".phone_fix").show();
	});
	$(document).on("click",".phone-modify",function(){
		$(".all_fix").show();
		if($(".havemail").html()){
			$(".gmail_fix").show();
		}else{
			$(".bmail_fix").show();
		};
	});
	$(document).on("click",".phone-modify",function(){
		$(".all_fix").show();
		$(".password_fix").show();
	});
	
//	$(".myform").Validform({
//      tiptype: 4,
//      btnSubmit:".end-ok",
//      ignoreHidden:true,
//      postonce: true,
//      datatype:{
//          'phone':/^\d+$/,
//          "number":/^[1-9]\d*$/,
//          "mail":/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
//			'price':/^([1-9]\d*(,\d{3})*|0)(\.\d{1,2})?$/
//      },
//      beforeCheck:function(curform){
//			
//		},
//      beforeSubmit:function(curform){
//			return false;
//		}
//  });
	
	$(".end-ok").on("click",function(){
		
	});
	
})
