$(function(){	
	//进入页面请求
	if ( JSON.parse(localStorage.getItem("fangans"))){
		
		var fa=JSON.parse(localStorage.getItem("fangans"));
		fuzhi(fa.a,fa.b,fa.c,fa.d);
		$(".univalent").attr("value",fa.a);
		$(".scale").attr("value",fa.b);
		$(".index1").attr("value",fa.c);
		$(".index2").attr("value",fa.d);
	} else {
		fuzhi(1,12,0,3);
		$(".univalent").attr("value","1");
		$(".scale").attr("value","12");
		$(".index1").attr("value","0");
		$(".index2").attr("value","3");
	};
	
	

//	标签选择
	var univalent=$(".univalent").val();
	var scale=$(".scale").val();
	$(document).on("click",".type-ul li",function(){
		$(this).addClass("checkedBtn").siblings("li").removeClass("checkedBtn");
		var msg=$(this).data("type");
		$(this).siblings("input").val(msg);
		$(this).parent().siblings("input").val($(this).index());
		univalent=$(".univalent").val();
		scale=$(".scale").val();
		index1=$(".index1").val();
		index2=$(".index2").val();
		
		var fangan = {"a": univalent,"b": scale,"c":index1,"d":index2};
		fangan = JSON.stringify(fangan); //转化为JSON字符串
		localStorage.setItem("fangans", fangan);
		
		fuzhi(univalent,scale,index1,index2);
	});

	function fuzhi(programs,months,index1,index2){
		$(".deax1 li").eq(index1).addClass("checkedBtn").siblings("li").removeClass("checkedBtn");
		$(".deax2 li").eq(index2).addClass("checkedBtn").siblings("li").removeClass("checkedBtn");
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
