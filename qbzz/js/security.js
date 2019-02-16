
//	验证邮箱
$(".mail_code").click(function(){
	$("#emailv").text('');
	if ($(".mailCode").val()=='') {
		$("#emailv").text('请输入email');
		return false;
	}
	var emailreg = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/;
	if (!emailreg.test($(".mailCode").val())) {
        $("#emailv").text('请输入正确的email');
		return false;
	}
	$.post('/index/security/update_email',{'email':$(".mailCode").val()},function(data){
		if (data.code==200) {
			change();
		}else{
            $("#emailv").text(data.msg);
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
            $(".all_fix").hide();
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
    datatype:{
    	'phone':/^(((1[0-9]{2}))+\d{8})$/
	},
    callback: function (data) {
        if (data.code == 200) {
            alert('修改成功');
            $(".all_fix").hide();
        } else {
            alert(data.msg);
        }
    }
});

//获取短信验证码
function sendMessage(e) {
    var verifycode = $("#cellphone_verifycode").val();
    var mobile = $("#cellphone").val();
    var mobilereg = /^(((1[0-9]{2}))+\d{8})$/;
    if (mobile == "") {
        alert("请输入手机号");
        return false;
    }
    if (!mobilereg.test(mobile)) {
        alert("请正确输入手机号");
        return false;
    }
    if (verifycode==''){
        alert("请输入验证码");
        return false;
	}
	$.post("/index/security/sendMessage", {'mobile': mobile,'verifycode':verifycode}, function (data) {
		if (data.msg==0){
            $("#cellphone_code").attr('src',"/index/security/verifycode");
			alert('验证码错误');
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
$(document).on("click",".business-modify",function(){
	$(".all_fix").show();
	$(".business_fix").show();
});
$(document).on("click",".eare-modify",function(){
	$(".all_fix").show();
	$(".eare_fix").show();
});

//关闭弹框
$(document).on("click",".all_no,.no",function(){
	$(".all_fix").hide();
	$(".phone_fix").hide();
	$(".gmail_fix").hide();
	$(".bmail_fix").hide();
	$(".password_fix").hide();
	$(".eare_fix").hide();
	$(".business_fix").hide();
	$(".all_fix input").val("");
	$(".all_fix input").attr("checked",false);
	$(".all_fix .Validform_checktip").html("");
});

//保险公司地区偏好设置
//全选选择
$(document).on("click",".all-check",function(){
	if($(this).is(':checked')){
		$(".eare_tb input").attr("checked",true);
	}else{
		$(".eare_tb input").attr("checked",false);
	};
});
//八大片区选择
$(document).on("click",".eare-type-name",function(){
	var result=0;
	$(".eare-type-name").each(function(){
		if($(this).find("input").is(':checked')){
			$(this).siblings(".eare-type-cont").find("input").attr("checked",true);
		}else{
			result=1;
			$(this).siblings(".eare-type-cont").find("input").attr("checked",false);
		};
	});
	if(result==1){
		$('.all-check').attr("checked",false);	
	}else{
		$('.all-check').attr("checked",true);	
	}
});	
//省份选择
$(document).on("click",".eare-type-cont input",function(){
	var result=0; 
	$(".eare-type-cont").each(function(){
		var result1=0; 
		$(this).find("input").each(function(){
			if($(this).is(':checked')){
			}else{
				result=1;
				result1=1;
			};
		});	
		if(result1==1){
			$(this).siblings(".eare-type-name").find("input").attr("checked",false);	
		}else{
			$(this).siblings(".eare-type-name").find("input").attr("checked",true);	
		};
	});
	if(result==1){
		$('.all-check').attr("checked",false);	
	}else{
		$('.all-check').attr("checked",true);	
	}
});

//省份选择确认
$(document).on("click",".eare_fix .end-ok",function(){
	var result=0;
	$(".earename").find("span").remove();
	$(".check-eare").each(function(){
		if($(this).find("input").is(':checked')){
			result=1;
			var span='<span>'+$(this).text()+'</span>';
			$(".earename").append(span);
		};
	});
	if(result==0){
		var span='<span>未设置任何地区，您将查收不到任何公开业务；</span>';
			$(".earename").append(span);
	};
	$(".all_fix").hide();
	$(".eare_fix").hide();
	$(".eare_fix").find("input").attr("checked",true);
});

//保险公司业务偏好设置
$(document).on("click",".business_fix .end-ok",function(){
	var result=0;
	$(".set_right .gongbao_tabel tbody tr").remove();
	
	$(".business_fix .gongbao_tabel tr").each(function(){
		if($(this).find("input").is(':checked')){
			result=1;
			var tr='<tr><td class="xz">雇主责任险</td><td class="xl">责任险</td><td class="jjf">15%</td></tr> ';
			$(".set_right .gongbao_tabel tbody").append(tr);
		};
	});
	if(result==0){
		var tr='<tr><td colspan="3">未选择任何业务偏好，您将查收不到任何公开业务</tr> ';
			$(".set_right .gongbao_tabel tbody").append(tr);
	}
	
	$(".all_fix").hide();
	$(".business_fix").hide();
	$(".business_fix").find("input").attr("checked",true);
});	
	
	
	
	





