$(function(){
//	$(".padding table").eq(1).hide();
//	$(".top_title a").eq(0).click(function(){
//		$(this).addClass("active").siblings("a").removeClass("active");
//		$(".padding table").eq(0).show().siblings("table").hide()
//	});
//	$(".top_title a").eq(1).click(function(){
//		$(this).addClass("active").siblings("a").removeClass("active");
//		$(".padding table").eq(1).show().siblings("table").hide();
//	});
	
	
	
	$(document).on("click",".can a",function(){
		var timers;
		var msg=$(this).data("message");
		var urls=$(this).data("url");
		$(".all_fix").show();
		$.post("/insurance/first_bid",function(data){
			if(data=="y"){
				$(".new-people").show();
				$(document).on("click",".sur-ok",function(){
					var res=0;
					$(".new-people label").each(function(){
						if($(this).find("input").is(':checked')){
						}else{
							res=1;
							return false;
						};
					});
					if(res==0){
						$(".new-people").hide();
						T.addTemp({ele:".all_fix",a:msg,url:urls});
					}else{
						$(".sur-error").show();
						timers=setInterval(function(){
							$('.sur-error').hide();
							clearInterval(timers);
						},2000);
					}
					
				});
			}else{
				T.addTemp({ele:".all_fix",a:msg,url:urls});
			}
		});
	});
	
//	$(".can a").mouseover(function(){
//		$(this).parent().append('<p class="onTips">点击立即投保参与报价，将有可能被客户选中成交</p>');
//	});
//	$(".can a").mouseout(function(){
//		$(this).siblings(".onTips").remove();
//	});
//	
//	$(".cannot a").mouseover(function(){
//		$(this).parent().append('<p class="onTips">客户已指定您为报价方，放弃报价即放弃该业务</p>');
//	});
//	$(".cannot a").mouseout(function(){
//		$(this).siblings(".onTips").remove();
//	})
	
	
	
})