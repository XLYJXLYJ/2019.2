$(function(){
	
	$(".Satisfaction").click(function(){
		var i=$(this).index();
		$(this).siblings("input").val(i+1);
		$('.Satisfaction').each(function(index,obj){
			if(index>i){
				$(this).css({"background-position-x":"-568px"});
			}else{
				$(this).css({"background-position-x":"-528px"});
			}
		});
	});
	
	$(".account_right").on("click",".label",function(){
		$(this).removeClass("label").addClass("have");
	})
	$(".account_right").on("click",".have",function(){
		$(this).removeClass("have").addClass("label");
	});
	
//	$('.pingjia').on("click",function(){ 
//		var name="";
//		$(".account_right .have").each(function(){
//			var str=$(this).find("span").html()
//			name=name+","+str;
//			
//		})
//		var str1=name.slice(1,name.length);
//		$(this).find("input").val(str1);
//		
//		
//	});
	
	
	
	
	
	
})