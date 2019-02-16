$(function(){
//	$("#header").load("header.html",get);
//	$("#footer").load("footer.html"); 
////	
	$(".apply_personal").click(function() {
		$(".all_fix").show();
		$(".fix_cooperate").show();
		$(".fix_conts input").val("");
		$(".fix_conts textarea").val("");
		$(".fix_conts .Validform_checktip").text("");
	});
	$(document).on("click",".all_no,.no",function() {
		$(".all_fix").hide();
		$(".fix_cooperate").hide();
		$(".fix_success").hide();
	})
	
	//表单验证
	$(".myForm").Validform({
        tiptype: 4,
        btnSubmit:".submit", //该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
        ignoreHidden:true,
        ajaxPost:true,
        datatype:{
            'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/
        },
        callback:function(data){
        	if(data.code==200) {
        		$(".fix_cooperate").hide();
        		$(".fix_success").show();
        		setTimeout(function(){
        			$(".all_fix").hide();
					$(".fix_success").hide();
        		},3000)
        	}
        }
    })   
    
    // 点击合作流程
    $(".steps").click(function(){
    	$(this).addClass("active").siblings(".steps").removeClass("active");
    })
    
    // 企业合作 特设场景
    $(".special_scene>li").hover(function(){
    	$(this).find(".hover_scene").stop().animate({height:"440px"},300,function(){
    		$(this).siblings(".special_title").css({display:"none"});
    	});
    },function(){
    	$(this).find(".hover_scene").stop().animate({height:"0"},300,function(){
    		$(this).siblings(".special_title").css({display:"block"});
    	});
    })
})