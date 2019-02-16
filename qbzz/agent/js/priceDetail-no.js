$(function(){
	$(".invite_right img").click(function(){
		var srcs=$(this).attr("src");
		$(".all_fix").css({display:"block"});
		$(".zhizhao_pic").css({display:"block"});
		$(".zhizhao_pic .mid_pic").attr({src:srcs});
	});
	$(".all_no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".zhizhao_pic").css({display:"none"});
	});
	$(".no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".zhizhao_pic").css({display:"none"});
	});
	// 点击 报价
	$('.top-first').click(function(){
		if($('.top-first').hasClass('choose') == true){
			return false;
		}else
		{
			window.location.href = 'priceDetail-no.html';
		}
	})
	// 点击 项目
	$('.top-sec').click(function(){
		if($('.top-sec').hasClass('choose') == true){
			return false;
		}else
		{
			window.location.href = 'item-detail.html';
		}
	})
	// 点击 企业说明
	$('.top-thir').click(function(){
		if($('.top-thir').hasClass('choose') == true){
			return false;
		}else
		{
			window.location.href = 'deal-no.html';
		}
	})
})
