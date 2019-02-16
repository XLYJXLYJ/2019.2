$(function(){
	
//	$(".type li").click(function(){
//		var value="";
//		var result=true;
//		if($(".check_insurance_nub").length<5){
//			$(this).addClass("blue");
//			$(this).addClass("ca");
//			$(this).removeClass("a");
//			var ids=$(this).data("id");
//			var datid="";
//			$(".check_insurance_nub").each(function(){
//				datid=datid+","+$(this).attr("id");
//			});
//			var str1=datid.slice(1,datid.length);
//			$(".end input").val(str1);
//			arr=str1.split(",");
//			for(var i=0;i<=arr.length;i++){
//				if(ids==arr[i]){
//					result=false;
//				}
//			};
//			if(result){
//				var name=$(this).data("name");
//				var div=$('<div class="check_insurance_nub"><span>'+name+'</span><div class="delete_line"></div></div>');
//				div.attr("id",ids);
//				$(".check_insurance").append(div);
//			};
//			$(".check_insurance_nub").each(function(){
//				value=value+","+$(this).attr("id");
//			});
//			var str1=value.slice(1,value.length);
//			$(".end input").val(str1);
//		}else{
//			$(".content .all_tip").css({display:"block"}).html("最多选择5个险种！！！");
//			time=setInterval(function(){
//				$('.all_tip').hide();
//				clearInterval(time);
//			},2000);
//		}
//		
//	});

//ie8兼容indexOf
	if (!Array.prototype.indexOf){
		Array.prototype.indexOf = function(elt /*, from*/){
		    var len = this.length >>> 0;
		　　var from = Number(arguments[1]) || 0;
		    from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		    if (from < 0){
		    from += len;
		    }
		　　for (; from < len; from++){
		      if (from in this && this[from] === elt){
		      return from;
		      }
		    }
		    return -1;
		};
	};

	var valueid=[];
	$(document).on("click",".type .a",function(){
		if(valueid.length<5){
			$(this).addClass("blue");
			$(this).addClass("ca");
			$(this).removeClass("a");
			valueid.push($(this).data("id"));
			$(".end input").val(valueid);
		}else{
			$(".content .all_tip").css({display:"block"}).html("最多选择5个险种！！！");
			time=setInterval(function(){
				$('.all_tip').hide();
				clearInterval(time);
			},2000);
		}
		
	});		
	$(document).on("click",".type .ca",function(){
		$(this).removeClass("blue");
		$(this).removeClass("ca");
		$(this).addClass("a");
		valueid.splice(valueid.indexOf($(this).data("id")),1);
		$(".end input").val(valueid);
	});	
//	$(".check_insurance").on("click",".delete_line",function(){
//		var val="";
//		$(this).parent().remove();
//		var id=$(this).parent().attr("id");
//		$(".type li").each(function(){
//			if($(this).data("id")==id){
//				$(this).removeClass("ca").addClass("a");
//				$(this).removeClass("blue");
//			}
//		})
//		$(".check_insurance_nub").each(function(){
//			val=val+","+$(this).attr("id");
//		});
//		var str2=val.slice(1,val.length);
//		$(".end input").val(str2);
//	});
	var time;
	$(".end .ok").click(function(){
		clearInterval(time);
		var str=$(this).siblings("input").val();
		if(str!=""){
			var arr=str.split(",");
		}else{
			var arr=[];
		}
		
		var n=arr.length;
		if(n>1){
			$(".all_fix").css({display:"block"});
			$(".fabu_fix").css({display:"block"});
			$(".fabu_fix .fabu_yes").click(function(){
				$("#inusredForm").submit();
			});
		}else if(n==1){
			$("#inusredForm").submit();
		}else{
			$(".content .all_tip").css({display:"block"}).html("请选择至少一个险种！！！");
			time=setInterval(function(){
				$('.all_tip').hide();
				clearInterval(time);
			},2000);
		}
	});	
	
	$(".all_no").click(function(){
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
	});
	$(".no").click(function(){ 
		$(".all_fix").css({display:"none"});
		$(".fabu_fix").css({display:"none"});
	});
	
	
//	//选择悬浮
//	var width=$(".content").width();
//	$(window).resize(function(){ 
//		width=$(".content").width();
//		$(".check_insurance").css("width",width);
//	});
//	var tt=$(".check_insurance").offset().top;
//	
//	var result=true;
//	var result1=true;
//	$(window).scroll(function(){	
//		if($(this).scrollTop()+82>=tt){						
//			result1=true;
//			if(result){	
//				result=false;
//				$(".check_insurance").css({position:"fixed",top:"82px",left:"325px",width:width,right:"0","z-index":"12"})
//			}
//		}else{
//			result=true;
//			if(result1){
//				result1=false;
//				$(".check_insurance").css({"position":"relative",top:"0",left:"0",});
//			}
//		}
//	})
	
	//  选择险种类型
	$(document).on("click",".insureTitl",function(){
		$(this).addClass('select').siblings().removeClass('select');
		var index=$(this).index();
		$(".insuerCont").eq(index).show().siblings(".insuerCont").hide();
	})
	
	
	
})
