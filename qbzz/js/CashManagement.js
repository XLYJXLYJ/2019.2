$(function(){
	
	
	
	$(".collections").click(function(){
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否对该选中批单确认收款？",url:$(this).data("url")});
	});
	
	$(".all_no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
	});
	$("body").on("click",".no",function(){ 
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
	});
	
	
	
	
	
	
	
	
	
})