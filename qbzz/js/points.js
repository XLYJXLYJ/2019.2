$(function(){
	// 切换积分
	$(document).on('click','.points_tap',function(){
		var index = $(this).index();
		$(this).addClass('choose').siblings().removeClass('choose');
		$('.points_cont').eq(index).show().siblings('.points_cont').hide();
		if(index == 2) {
			$('.points_tip').hide();
		} else {
			$('.points_tip').show();
		}
	});
	
	
	// 点击 查看密码
	var n;
	var ids;
	
	$(document).on("click",'.password_a',function(){
		n=$(this).closest("tr").index();
		ids=$(this).data("id");
		$(".p_inpt .pass").attr("value","");
		$(".all_fix").css({display:"block"});
	});
	$('.fix-no ,.chacha').click(function(){
		$(".all_fix").css({display:"none"});
		$(".pass").val("");
		$('.p_inpt .Validform_checktip').hide()
	});
	
	// 验证弹框的密码
	$('.fabu_yes').click(function(){
		var name=$(".zhanghao").html();
		var passwords=$(".pass").val();
		var value=$('input[name="token"]').val();
		if($('.p_inpt input').eq(0).val() == ''|$('.p_inpt input').eq(0).val()=='请输入登录密码以验证操作安全性') {
			$('.p_inpt span').show().html("密码不能为空");
		} else {
			$.ajax({
				type: 'post',
				url: '/index/integral/giftpass',
				dataType: 'json',
				data:{
					"id":ids,
					"name":name,
					"password":passwords,
					"token":value
				},
				success: function(res) {
					if (res && res.code === 200) {
						$('.p_inpt span').hide();
						$(".all_fix").css({display:"none"});
						$(".pass").val("");
						$(".history tr").eq(n).find(".td_password").html(res.msg.pwd);
					}else if(res.code === 90001||res.code === 90002||res.code === 90003||res.code === 90004||res.code === 90005){
						$('.p_inpt span').show().html(res.msg);
					};
					
				},
				error:function(){
					
				}
			});
			
		}
	});
	$('.p_inpt input').on("change",function(){
		$('.p_inpt span').hide();
	})
	
	// 兑换积分
	$(document).on("click",".add-nub",function(){
		var vals=$(this).siblings("input").val()-0+1;
		$(this).siblings("input").val(vals);
		loop();
	});
	$(document).on("click",".reduce-nub",function(){
		var vals=$(this).siblings("input").val()-1;
		if(vals<=0){
			vals=0;
		}
		$(this).siblings("input").val(vals);
		loop();
	});
	$(".all-points").bind("DOMNodeInserted",function(e){
		$(".end-point-right .bt").addClass("click-sure");
		var vals=$(this).html()-0;
		var mypoint=$(".big-now-point").html()-0;
		if(vals<=mypoint&&vals!=0){
			$(".end-point-right .bt").removeClass("click-sure");
		}else{
			$(".end-point-right .bt").data("message","积分不足，请重新选择礼品！");
		};
		if(vals==0){
			$(".end-point-right .bt").data("message","您未选择礼品，请选择礼品！");
		}
	});
	
	$(document).on("click",".end-point-right .bt",function(){
		
		var vals=$(".all-points").html()-0;
		var mypoint=$(".big-now-point").html()-0;
		if(vals<=mypoint&&vals!=0){
			$.ajax({
				type: 'post',
				url: '/index/integral/exchange',
				dataType: 'json',
				data:$('#integralForm').serialize(),
				success: function(res) {
					if (res && res.code === 200) {
						$(".all_fix").css({display:"block"});
						T.addTemp({ele:".all_fix",a:"兑换成功，请注意查收短信！",url:'close'});
						$("body").on("click",".fabu_fix .fabu_yes",function(){
				    		location.reload(true); 
				    	});
					}else{
						$(".all_fix").css({display:"block"});
						T.addTemp({ele:".all_fix",a:"兑换失败，请重新兑换！",url:'close'});
					}
				},
				error:function(){
					T.addTemp({ele:".all_fix",a:"兑换成功，请注意查收短信！",url:'close'});
				}
			});
		};
	});
	
	$(document).on("blur",".nub-put",function(){
		var priceses=$(this).val();
		var nubone=priceses.substr(0,1);
		if(priceses>0&&nubone==0){
			priceses=priceses.substring(1,priceses.length);
		}
		$(this).val(priceses);
	})
	$(".nub-put").on('blur', function() { 
		if($(this).val()==""){
			$(this).val("0");
		}
	    loop();
	}); 
//			window.onbeforeunload = onbeforeunload_handler;
//	        function onbeforeunload_handler() {
//	            var warning = "您输入的内容尚未保存，确定离开此页面吗？";
//	            return warning;
//	        } ; 
});
function loop(){
	var attr=[];
	var allPoint=0;
	$(".gift-type").each(function(){
		var unit=$(this).find(".unit-price").html();
		var nubs=$(this).find(".nub-put").val();
		var points=(unit-0)*(nubs-0);
		attr.push(points);
	});
	$.each(attr,function(){
		allPoint=allPoint+this;
	});
	$(".all-points").html(allPoint);
	
}
