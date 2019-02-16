$(function() {
	// 头部吸顶效果
	var tt=$("#header").offset().top;
	var result=true;
	var result1=true;
	$(window).scroll(function(){	
		if($(this).scrollTop()>=tt){						
			result1=true;
			if(result){	
				result=false;
				$("#header").css({position:"fixed",top:"0px",left:"0px","z-index":"50",width:"100%",background:"#fff"})
			}
		}else{
			result=true;
			if(result1){
				result1=false;
				$("#header").css({"position":"relative"});
			}
		}
	});
	
	// 点击 我要投保
	$('.receive-divr').click(function() {
		$('.active-box').css({display: "block"});
	})
});