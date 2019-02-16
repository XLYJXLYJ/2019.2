$(function(){
	
	$(".padding").on("click",".mark_Arrow",function(){
		var index=$(this).parent().index();
		var na=$(this).attr("name");
		console.log(na);
		if($(this).attr("name")=="toogle"){
			$(this).attr("name","");
			$(this).css({"background":"#fff"}).find("div").css("background-position-x","-520px");
			$(this).siblings("div.mark_tabel").css({display:"block"});
		}else{
			$(this).attr("name","toogle");
			$(this).css({"background":"#f4f4f5"}).find("div").css("background-position-x","-560px");
			$(this).siblings("div.mark_tabel").css({display:"none"});
		}
	});	
	
	 // 点击更多按钮
    $(".moreBtn").click(function(){
    	$(this).find(".moreBtnDiv").toggleClass("hide"); 
    })
    
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".moreBtn").length == 0){
		    	$(".moreBtnDiv").addClass("hide");
		}
	});
	
	$(".check_a").click(function(){
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否对该选中保险标进行复制发标？",url:$(this).data("url")});
	});
	$(".close").click(function(){
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否对该选中保险标进行删除？",url:$(this).data("url")});
	});
	$(".delete").click(function(){
		$(".all_fix").css({display:"block"});
		T.addTemp({ele:".all_fix",a:"是否对该选中保险标进行删除？",url:$(this).data("url")});
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
