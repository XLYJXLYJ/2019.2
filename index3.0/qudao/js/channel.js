$(function(){
	// 弱提示
	setTimeout(function(){
		$('.all_tip').hide()
	},1000);
	
	// 点击 项目或企业说明
	$(document).on("click",".tab span",function(){
		$(this).addClass('choose').siblings().removeClass('choose');
		var index=$(this).index();
		$(".tabs-cont").eq(index).show().siblings(".tabs-cont").hide();
	});
	
//	$('.type_text').on('click',function(){
//		$(this).hide().siblings('.type_password').show().focus();
//		
//	});
})
