$(function(){
	// 放大营业执照
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
	// 点击 项目或企业说明
	$(".price-titl").click(function(){
		var id = $(this).data('id');
		$(this).addClass('choose').siblings().removeClass('choose');
		if(id == 1){
			$('.baojia').show();
			$('.qiye').hide();
			$('.xiangmu').hide();
		}
		if(id == 2){
			$('.baojia').hide();
			$('.qiye').hide();
			$('.xiangmu').show();
		}
		if(id == 3){
			$('.baojia').hide();
			$('.xiangmu').hide();
			$('.qiye').show();
		}
	});
})