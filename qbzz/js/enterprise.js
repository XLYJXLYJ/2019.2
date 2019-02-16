$(function(){
	// 放大营业执照
	$(".uplaodPic").click(function(){
		var srcs=$(this).attr("src");
		$(".all_fix").css({display:"block"});
		$(".zhizhao_pic").css({display:"block"});
		$(".zhizhao_pic .mid_pic").attr({src:srcs});
	});
	
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
		$(".zhizhao_pic").css({display:"none"});
		$('.check_id_fix').addClass('hide');
		$("#upload_display_1").attr("src",urlpic);
	});
	
//	function getObjectURL(file) {
//		var url = null;
//		if (window.createObjectURL != undefined) { // basic
//			url = window.createObjectURL(file);
//		} else if (window.URL != undefined) { // mozilla(firefox)
//			url = window.URL.createObjectURL(file);
//		} else if (window.webkitURL != undefined) { // webkit or chrome
//			url = window.webkitURL.createObjectURL(file);
//		}
//		return url;
//	};
//	
//	$(".input_file").change(function() {
//		var objUrl = getObjectURL(this.files[0]);
//		if (objUrl) {
//			$(this).parent().siblings("input").val(objUrl);
//		}
//	});
//	$('.percentage').html("50%");
//	$('.percentage').bind('contentchanged',function() { 
//	    var nb=$(this).html();
//	    $(".speed").animate({width:nb});
//	});
	 
	
//	$('.percentage').trigger('contentchanged');
	
	
	
	
	
})
