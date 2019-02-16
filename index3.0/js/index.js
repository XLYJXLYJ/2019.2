
$(function() {
	// 货运险活动
	setTimeout(function(){
		$(".transportActive").show();
		
	},3000)
	$(".transportActive .no").on("click",function(){
		$(".transportActive").hide();
	});
	
	// 关闭比价弹框
	$('.fixBotm_btn').click(function(){
		$('.price_fix').hide();
	})
	// 点击快捷采购比价
	
	$('.fixUl a').click(function(){
		if($(this).hasClass('fastPrice')){
			$('.price_fix').show()
		}
	});
	
	
	// 头部产品hover效果
	$(".under_line").hover(function(){
//		var heigt = $("#myCarousel").height();
		$(".product").stop().animate({height:"520px"},200)
	},function(){
		$(".product").stop().animate({height:"0"},200);
	});	
	
	// 头部吸顶效果
	var tt=$("#header").offset().top;
	var result=true;
	var result1=true;
	$(window).scroll(function(){	
		if($(this).scrollTop()>=tt){						
			result1=true;
			if(result){	
				result=false;
				$("#header").css({position:"fixed",top:"0px",left:"0px","z-index":"50"});
				$(".carousel").css({"margin-top": "88px"});
			}
		}else{
			result=true;
			if(result1){
				result1=false;
				$("#header").css({"position":"relative"});
			}
		}
	});
	
	// 场景定制的hover效果
	$(".plan_li").hover(function(){
		$(this).find(".li_contHover").show();
	},function(){
		$(this).find(".li_contHover").hide()
	});
	
	
	$(document).on("click",".a-line",function(){
		$(".all_fix").show();
		$(".contact-way").show();
	});
	$(document).on("click",".guanbi,.contact-way-cancel,.all_no",function(){
		$(".all_fix").hide();
		$(".contact-way").hide();
		$(".contact-way-conts").show();
		$(".contact-way-success").hide();
		$(".load-Policy").hide();
	})

	$(".myform").Validform({
        tiptype: 4,
        btnSubmit:".contact-way-sure", //#btn_sub是该表单下要绑定点击提交表单事件的按钮;如果form内含有submit按钮该参数可省略;
		
        ignoreHidden:true,
        ajaxPost:true,
        datatype:{
    		'name':/(?=.*\(.*\)|.*（.*）)^[a-zA-Z0-9\u4e00-\u9fa5()（）]*$|^[a-zA-Z0-9\u4e00-\u9fa5]*$/,
            'phone':/^1\d{10}$|^0\d{2}-\d{8}$|^0\d{2}-\d{7}$|^0\d{3}-\d{7}$|^0\d{3}-\d{8}$/,
            "number":/^[1-9]\d*$/,
            'price':/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
        },
        
        
		callback:function(data){
			if(data.status=='y'){
                $(".contact-way-conts").hide();
				$(".contact-way-success").show();
				$("#phone_number").val('');
				$("#message").val('');
           }else{
           		alert('留下联系方式失败');
			}
			
		}
	});
	
//	
//	//上传保单
//	$(document).on("click",".key-upload",function(){
//		layer.open({
//			title: false,
//			type: 2,
//		    closeBtn: 0, //不显示关闭按钮
//		    anim: -1,
//		    area:["540px",'520px'],
//		    shadeClose: true, //开启遮罩关闭
//		    content: ['http://127.0.0.1:8020/static/index3.0/html/Elastic%20layer/ways.html','no']
//		});
//		
//	});
//	
	
//	$(document).on("click",".all-fixed-no,.delete-line",function(){
//  	$(".fixed-pic").css({display:"none"});
//  });
	
});


