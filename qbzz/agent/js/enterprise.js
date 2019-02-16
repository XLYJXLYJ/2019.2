$(function(){
	
	var urlpic=$("#upload_display_1").attr("src");
	
	
	$(".upload").click(function(){
        $('.check_id_fix').removeClass('hide');
		var url=$(this).data("url");
		$(".myform").attr('action',url);
        $(".upload_fix .upload_ok").click(function(){
			
        });
    });

	$(document).on("click",".no,.all_no",function(){ 
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
		$(".upload_fix").css({display:"none"});
		$('.check_id_fix').addClass('hide');
		$("#upload_display_1").attr("src",urlpic);
	});
	
	//搜索框点击消失
	$(document).bind("click",function(e){
		var target  = $(e.target);
		if(target.closest(".resultDiv").length == 0){
		    	$(".resultDiv").hide();
		}
	});
	
//	$(document).on("click",".addPerson .importSure",function(){
//		var timers;
//		clearInterval(timers);
//		var that=$(this);
//		var people=that.siblings(".people").val();
//		if(people==""){
//			that.siblings(".none").show().html("请选择常用保险人");
//			timers=setInterval(function(){
//				that.siblings(".none").hide();
//				clearInterval(timers);
//			},2000);
//		}else{
//			
//		}
//	});
//	$(document).on("click",".sendInvite .importSure",function(){
//		var timers;
//		clearInterval(timers);
//		var that=$(this);
//		var people=that.siblings(".emailInpt").val();
//		if(people==""){
//			that.siblings(".none").show().html("请输入邮箱地址");
//			timers=setInterval(function(){
//				that.siblings(".none").hide();
//				clearInterval(timers);
//			},2000);
//		}else{
//			
//		}
//	});
	
	
})
