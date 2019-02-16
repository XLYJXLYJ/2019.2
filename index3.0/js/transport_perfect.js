$(function(){
	
	// 需要增值发票与否
	$('.selcNeed').change(function(){ 
		var optionvalue=$(this).find("option:selected").text();
		$(this).siblings(".selcSpan").text(optionvalue).css({"border-color":"#524ae7"});
		if($(".selcNeed").val()==2){
			$(".select_ul").css({display:"none"});
		}else{
			$(".select_ul").css({display:"block"});
		}
	});
	$(".selcNeed").blur(function(){
		$(this).siblings(".selcSpan").css({"border-color":"#e9e9f4"});
	});
	
	$(".myform").Validform({
        tiptype: 4,
        btnSubmit:".payNow", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        datatype:{ 
        	'name':/^[\u4E00-\u9FA5\w()（）\-\.(^\s*)]+$/,
        	'credit':/^[A-Z0-9]{9}$|^[A-Z0-9]{18}$/,
            'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
            'number':/^[a-z0-9]+$/,
            'price':/^[1-9]\d*(,\d{3})*(\.\d{1,2})?$/
        },
        beforeCheck:function(curform){
        	if($('.license').val()==""){
				$("html, body").stop().animate({scrollTop:500},0);
				$(".load-null").html("请上传营业执照");
				return false
        	};
//      	if($('#selt-city').val()==""){
//				$("html, body").stop().animate({scrollTop:600},0);
//				$(".city-div .Validform_checktip").html("请选择城市");
//				return false
//      	};
        	if($('.license1').val()==""){
				$(".load-null1").html("请上传营业执照");
				return false
        	};
        }
	});
	
	// 放大营业执照
	$(".upload_pic").click(function(){
		var srcs=$(this).attr("src");
		$(".all_fix").css({display:"block"});
		$(".zhizhao_pic").css({display:"block"});
		$(".zhizhao_pic .mid_pic").attr({src:srcs});
	});
	$(document).on("click",".all_no ,.no",function(){
		$(".all_fix").css({display:"none"});
		$(".zhizhao_pic").css({display:"none"});
	});
});