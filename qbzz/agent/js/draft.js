$(function(){
	
	
	
	$(".all_no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
	});
	$(".fabu a").click(function(){
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否对该选中草稿标进行发布？",url:$(this).data("url")});
	})
	
	$(".delet").click(function(){
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否确认删除该选中的草稿标？",url:$(this).data("url")});
	})
	$("body").on("click",".no",function(){ 
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
	});
	
});

