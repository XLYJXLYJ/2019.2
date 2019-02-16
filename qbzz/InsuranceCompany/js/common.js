$(function(){
	get();
	
	// 弱提示
	setTimeout(function(){
		$('.all_tip').hide()
	},1000);
	
})
function get(){
	
	$(".header_right_top li").hover(function(){
		$(this).find(".img").css({display:"block"});
	},function(){
		$(this).find(".img").css({display:"none"});
	});
	
	$(".under_line").hover(function(){
		$(".product").stop().animate({height:"600px"},200)
	},function(){
		$(".product").stop().animate({height:"0"},200);
	});	
	$(".product_img").click(function(){
		$(".product").stop().animate({height:"0"},200);
	});
	
	$(".product_cont ul li").hover(function(){
		var index=$(this).index();
		$(this).addClass("hover").siblings("li").removeClass("hover");
		$(".all_product_cont .menu").eq(index).addClass("block")
									.siblings("div").removeClass("block");
	});
	
	
	$(".fix ul li").eq(2).click(function(){
		$('body,html').animate({ scrollTop: 0 },100);
	});
}



