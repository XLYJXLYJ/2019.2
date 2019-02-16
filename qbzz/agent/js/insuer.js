$(function(){
	
	
	$(".invite").click(function(){
		$(".all_fix").css({display:"block"});
		$(".Invitation_fix").css({display:"block"});
		var url=$(this).data("url");
		$(".Invitation_fix .invite_yes").click(function(){
			window.location.href=url;
		});
		
	});
	$(".delets").click(function(){ 
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否对该选中常用保险人进行删除？",url:$(this).data("url")});
	});
	$(".all_no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
		$(".Invitation_fix").css({display:"none"});
	});
	$("body").on("click",".no",function(){ 
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
		$(".Invitation_fix").css({display:"none"});
	});
	
	
	
	
	
	
	
})