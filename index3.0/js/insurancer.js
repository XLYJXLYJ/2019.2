$(function(){	
	//进入页面请求
	fuzhi(1,12);
	$(".univalent").attr("value","1");
	$(".scale").attr("value","12");
//	投保吸顶
	var tt1;
	var ttt=setTimeout(function(){
		tt1=$("#nav-Insure").offset().top;
	});
	var result=true;
	var result1=true;
	$(window).scroll(function(){
		if($(this).scrollTop()>tt1){						
			result1=true;
			if(result){	
				result=false;
				$("#nav-Insure").css({position:"fixed",top:"0px",left:"0px","z-index":"50"})
			}
		}else{
			result=true;
			if(result1){
				result1=false;
				$("#nav-Insure").css({"position":"static"});
			}
		}
	});
//	标签选择
	var univalent=$(".univalent").val();
	var scale=$(".scale").val();
	$(document).on("click",".type-ul li",function(){
		$(this).addClass("check-programme").siblings("li").removeClass("check-programme");
		var msg=$(this).data("type");
		$(this).siblings("input").val(msg);
		univalent=$(".univalent").val();
		scale=$(".scale").val();
		fuzhi(univalent,scale);
	});
	$(".toubao-end a").on("click",function(){
		$.ajax({
			type:"post",
			url:url1,
			dataType: 'json',
			data:{program:univalent,month:scale,insurance:"7"},
			success:function(res){
				if(res.code=="200" || res.code=="10004"){
					window.location.href=res.data.url;
				}
				
			},
			error:function(){
		//  	alert("网络错误，请稍后再尝试！");
			}
		});
		return false;
	})
	

	function fuzhi(programs,months){
		$.ajax({
			type:"post",
			url:url2,
			dataType: 'json',
			data:{program:programs,mouth:months},
			success:function(res){
				if(res.code=="200"){
					$(".change-type1").html(res.data.basic.death_limit);
					$(".change-type2").html(res.data.basic.additional_disability);
					$(".change-type3").html(res.data.basic.medical_limit);
					$(".change-type4").html(res.data.basic.loss_working_costs);
					$(".change-type5").html(res.data.basic.day_hospitalized_costs);
					$(".change-type6").html(res.data.basic.legal_fees);
					$(".money-nub").html(res.data.price);
				}
				
			},
			error:function(){
		//  	alert("网络错误，请稍后再尝试！");
			}
		});
	};
	
	

})
