$(function(){
	$("#qiye").load("deal.html");
	// 点击 项目或企业说明
	$(".price-titl").click(function(){
		var id = $(this).data('id');
		$(this).addClass('choose').siblings().removeClass('choose');
		if(id == 2){
			$('.qiye').addClass('hide');
			$('.xiangmu').removeClass('hide');
		}
		if(id == 3){
			$('.xiangmu').addClass('hide');
			$('.qiye').removeClass('hide');
		}
	});
})
