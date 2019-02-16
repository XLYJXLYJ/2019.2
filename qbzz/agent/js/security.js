
//	验证邮箱
$(".mail_code").click(function(){
	$("#emailv").text('');
	if ($(".mailCode").val()=='') {
		$("#emailv").text('请输入email');
	}
	var emailreg = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
	if (!emailreg.test($(".mailCode").val())) {
		$("#emailv").text('请输入正确的email');
		return false;
	}
	$.post('/index/security/checkEmail',{'email':$(".mailCode").val()},function(msg){
		if (msg==false) {
			$("#emailv").text('email已被注册');
			return false;
		}else{
			$.post('/index/security/update_email',{'email':$(".mailCode").val()},function(data){
				if (data==true) {
					change();
				}else{
					$("#emailv").text('发送失败');
				}
			},'json');
			
		}
	},'json');
});
function change(){
	$('.div-hide').addClass('hide');
	$('.sendMail').removeClass('hide');
	// 倒计时
	var count = 60;
	var $resend = $('.resend');
	$resend.prop('disabled',true);
	var countDown = setInterval(function() {
		$('.resend span').text(--count);
		if(count == 0) {
			clearInterval(countDown);
			$('.sendMail').addClass('hide');
			$('.div-hide').removeClass('hide');
			$('.resend span').text('60')
			$('.mail_code').text('点此重发');
		}
	},1000);
};

//修改密码
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

//修改手机号
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

//获取短信验证码
function sendMessage(e) {
    var verifycode = $("input[name='verifycode']").val();
    $.post("/index/security/verification", {verifycode: verifycode}, function (data) {
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
            $.post("/index/security/sendMessage", {'mobile': mobile,'verifycode':verifycode}, function (msg) {
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
            }, 'json');
        } else {
            if (data.position == 'v') {
                $("#code").attr('src', "/index/index/verifycode/");
            }
            $("#verifycode").text(data.info);
        }
    }, 'json')
};

//选择修改类型
$(document).on("click",".phone-modify",function(){
	$(".all_fix").show();
	$(".phone_fix").show();
});
$(document).on("click",".mail-modify",function(){
	$(".all_fix").show();
	if($(".havemail").html()){
		$(".gmail_fix").show();
	}else{
		$(".bmail_fix").show();
	};
});
$(document).on("click",".password-modify",function(){
	$(".all_fix").show();
	$(".password_fix").show();
});

//关闭弹框
$(document).on("click",".all_no,.no",function(){
	$(".all_fix").hide();
	$(".phone_fix").hide();
	$(".gmail_fix").hide();
	$(".bmail_fix").hide();
	$(".password_fix").hide();
	$(".set_right input").val("");
	$(".set_right .Validform_checktip").html("");
});
	

