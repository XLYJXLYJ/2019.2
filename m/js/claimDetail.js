$(function(){
	// 点击范例显示图片
	$(".potopic").on("click",function(){
		var srcc = $(this).attr("src");
    	$(".all-fix").css({display:"block"});
       	$(".uploadImg").css({display:"block"});
       	$(".uploadImg img").attr("src",srcc);
       	var heightImg = (42.5-$(".uploadImg img").height()/10)/2+'rem';
       	$(".uploadImg img").css({"display":"block","marginTop":heightImg});
	});
	
	// 关闭弹框    
	$("body").on("click",".all-no",function(){
		$(".all-fix").css({display:"none"});
		$(".uploadImg").css({display:"none"});
		$(".uploadImg img").css({display:"none"});
	});	
})
