$(function(){
	// 放大营业执照
	$(".uplaodPic").click(function(){
		var srcs=$(this).attr("src");
		$(".all_fix").css({display:"block"});
		$(".zhizhao_pic").css({display:"block"});
		$(".zhizhao_pic .mid_pic").attr({src:srcs});
	});
	// 批量导入客户弹框
	$(".importBtn").click(function(){
		$(".all_fix").css({display:"block"});
		$(".importLot").css({display:"block"});
		$("#containerPolicy7").remove();
		var divload=$('<div id="containerPolicy7">'+
                    '<span class="input_file" id="policyBrowser7">浏览</span>'+
                '</div>');
        $(".table-all").append(divload);
		Qibao.policyUpload('containerPolicy7', 'policyBrowser7', 'policyUrl7', 'policyProcessArea7', 'showPolicy7', 'policyName7');
		$(".table-all").find("input").attr("value","");
		$(".table-all").find(".first_input").html("");
	});
	$(document).on("click",".importSure",function(){
		var tabval=$("#policyUrl7").val(); 
		var tabval1=$("#policyName7").val();  
		if(tabval){  
			$(".importSure").html("提交中···").addClass("loading-bt").attr("disabled",true); 
			$.ajax({
				type:"post",
				url:'/index/enterprise/import',
				dataType: 'json',
				data:{"url":tabval,"name":tabval1},
				success:function(res){
					$(".importSure").html("确认").removeClass("loading-bt").attr("disabled",false);
					if(res.code=="200"){
						$(".all_fix").css({display:"none"});
						$(".table-load").css({display:"none"});
						$(".all_tip").show().html(res.msg);
						timers=setInterval(function(){
							window.location.href=res.data.url; 
						},3000);
					}else{
						$(".importTip").show().html(res.msg);
						timers=setInterval(function(){
							$('.importTip').hide().html("");
							clearInterval(timers);
						},3000);
					}
					
				},
				error:function(){
					$(".importSure").html("确认").removeClass("loading-bt").attr("disabled",false);
			//  	alert("网络错误，请稍后再尝试！");
				}
			});
			
		}else{
			$(".importLot .Validform_checktip").html("请上传表格");
		}
		return false;
	});
	// 添加常用保险人
	$(".inviteBtn").click(function(){
		$(".all_fix").css({display:"block"});
		$(".addPerson").css({display:"block"});
	});
	// 直接添加
	$(".addDirect").click(function(){
		$(this).parent().siblings(".importInpt").val("").siblings(".importTip").text("");
		$(".addPerson").css({display:"block"});
		$(".sendInvite").css({display:"none"});
	})
	// 发送邀请
	$(".sendBtn").click(function(){
		$(this).parent().siblings(".importInpt").val("")
		$(".addPerson").css({display:"none"});
		$(".sendInvite").css({display:"block"});
	})
	
	$(".all_no,.no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".zhizhao_pic").css({display:"none"});
		$(".importLot").css({display:"none"});
		$(".addPerson").css({display:"none"});
		$(".sendInvite").css({display:"none"});
	});
	
	// 验证邮箱
	$(".sendInvite .importSure").click(function(){
		var emailInpt = $(".emailInpt").val();
		var emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if(!emailInpt) {
			$(this).siblings(".importTip").text("邮箱地址不能为空");
			return false;
		} 
		else if(!emailReg.test(emailInpt)) {
			$(this).siblings(".importTip").text("邮箱地址格式错误");
		} else {
			$(this).siblings(".importTip").text("");
		}
	});
	
})
