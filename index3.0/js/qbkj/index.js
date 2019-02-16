//new Wonder({
//  el: '#wonder',
//  dotsNumber: 170,
//  lineMaxLength: 200,
//  dotsAlpha: 0.01,
//  speed: 0.9,
//  clickWithDotsNumber: 5
//})
//
////$(window).resize(function() {  
////location.reload();})
//$(window).resize(resizeCanvas);
//
//function resizeCanvas() {
//	$("canvas").attr("width", $(".tbody").get(0).width);
//	
//	$("canvas").attr("height", $(".tbody").get(0).height);
//	var canvas = document.createElement('canvas');
//  var ctx = canvas.getContext('2d');
//	ctx.fillRect(0, 0, $("canvas").get(0).width, $("canvas").get(0).height);
//}
//$(function() {
//	$('.left').css({'height': document.body.clientHeight})
//	$('.panel').css({'height': document.body.clientHeight})
//	$.scrollify({
//		section: '.panel',
//		target: '.left'
//	});
//});

$(".type .way").mousemove(function(e){
	var this_=this;
	var index=$(".way").index(this_);
	this_=$(this_);
	this_.siblings(".way .copy:eq(0)").show();
	this_.siblings(".way .copy:eq(1)").hide();
	if(index==0){
        this_.css("margin-left","59px");
        $(".way:eq(1)").css("margin-left","30px");
        this_.css("margin-top","35px");
        this_.addClass("hover");
        $(".way:eq(0) .copy:eq(0)").hide();
        $(".way:eq(0) .copy:eq(1)").show();
    }else if(index==1){
        this_.css("margin-left","30px");
        $(".way:eq(2)").css("margin-left","30px");
        this_.css("margin-top","35px");
        this_.addClass("hover");
        $(".way:eq(1) .copy:eq(0)").hide();
        $(".way:eq(1) .copy:eq(1)").show();
    }
    else if(index==2){
        this_.css("margin-left","30px");
        this_.css("margin-right","5px");
        this_.css("margin-top","35px");
        this_.addClass("hover");
        $(".way:eq(2) .copy:eq(0)").hide();
        $(".way:eq(2) .copy:eq(1)").show();
    }
})
$(".type .way").mouseleave(function(e){
	var this_=this;
	var index=$(".way").index(this_);
	this_=$(this_);
	
	if(index==0){
		this_.css("margin-left","61px");
		$(".way:eq(1)").css("margin-left","40px");
		this_.css("margin-top","45px");
		this_.removeClass("hover");
		$(".way:eq(0) .copy:eq(1)").hide()
		$(".way:eq(0) .copy:eq(0)").show();
	}else if(index==1){
		this_.css("margin-left","40px");
		$(".way:eq(2)").css("margin-left","40px");
		this_.css("margin-top","45px");
		this_.removeClass("hover");
		$(".way:eq(1) .copy:eq(1)").hide()
		$(".way:eq(1) .copy:eq(0)").show();
	}
	else if(index===2){
		this_.css("margin-left","40px");
		this_.css("margin-right","15px");
		this_.css("margin-top","45px");
		this_.removeClass("hover");
		$(".way:eq(2) .copy:eq(1)").hide();
		$(".way:eq(2) .copy:eq(0)").show();
	}
})

$(".type1 .way1").mousemove(function(e){
    var this_=this;
    var index=$(".way1").index(this_);
    this_=$(this_);
    this_.siblings(".way1 .copy:eq(0)").show();
    this_.siblings(".way1 .copy:eq(1)").hide();
    if(index==0){
        this_.css("margin-left","38px");
        $(".way1:eq(1)").css("margin-left","30px");
        this_.css("margin-top","35px");
        this_.addClass("hover1");
        $(".way1:eq(0) .copy:eq(0)").hide();
        $(".way1:eq(0) .copy:eq(1)").show();
    }else if(index==1){
        this_.css("margin-left","30px");
        $(".way1:eq(2)").css("margin-left","30px");
        this_.css("margin-top","35px");
        this_.addClass("hover1");
        $(".way1:eq(1) .copy:eq(0)").hide();
        $(".way1:eq(1) .copy:eq(1)").show();
    }
    else if(index==2){
        this_.css("margin-left","30px");
        this_.css("margin-right","5px");
        this_.css("margin-top","35px");
        this_.addClass("hover1");
        $(".way1:eq(2) .copy:eq(0)").hide();
        $(".way1:eq(2) .copy:eq(1)").show();
    }
})
$(".type1 .way1").mouseleave(function(e){
    var this_=this;
    var index=$(".way1").index(this_);
    this_=$(this_);

    if(index==0){
        this_.removeClass("hover1");
        this_.css("margin-left","40px");
        $(".way1:eq(1)").css("margin-left","40px");
        this_.css("margin-top","45px");
        $(".way1:eq(0) .copy:eq(1)").hide()
        $(".way1:eq(0) .copy:eq(0)").show();
    }else if(index==1){
        this_.removeClass("hover1");
        this_.css("margin-left","40px");
        $(".way1:eq(2)").css("margin-left","40px");
        this_.css("margin-top","45px");
        $(".way1:eq(1) .copy:eq(1)").hide()
        $(".way1:eq(1) .copy:eq(0)").show();
    }
    else if(index===2){
        this_.removeClass("hover1");
        this_.css("margin-left","40px");
        this_.css("margin-right","15px");
        this_.css("margin-top","45px");
        $(".way1:eq(2) .copy:eq(1)").hide();
        $(".way1:eq(2) .copy:eq(0)").show();
    }
})


$(".way .apply").click(function(){
	var index=$(".apply").index(this);
	$("input[type=hidden]").attr("val",index+1);
	$(".hidden").css("display","inline");
	$(".solution").css("display","block");
	event.stopPropagation();
	 
})
$(".hidden").click(function(){
	$(".hidden").css("display","none");
	$(".solution").css("display","none");
})


$(".sure").click(function(){
    $(".hidden").css("display","none");
     $(".success").css("display","none")
})




$("li a").mousemove(function(){
	var this_=this;
	var index=$("li a").index(this_);
	if(index==2){
		$(".sub_pag").show();
	}else{
        $(".sub_pag").hide();
	}
	$("li a").css("color","#9791ff")
	$("li a").removeClass("scroll")
	$(this_).addClass("scroll")
	$(this_).css("color","white")
})

$(".ext1").mousemove(function(){
	$(".who_pic11").show();
	$(".who_pic1").hide();
})
$(".ext1").mouseleave(function(){
	$(".who_pic1").show();
	$(".who_pic11").hide();
})
$(".ext2").mousemove(function(){
	$(".who_pic22").show();
	$(".who_pic2").hide();
})
$(".ext2").mouseleave(function(){
	$(".who_pic2").show();
	$(".who_pic22").hide();
})
$(".ext3").mousemove(function(){
	$(".who_pic33").show();
	$(".who_pic3").hide();
})
$(".ext3").mouseleave(function(){
	$(".who_pic3").show();
	$(".who_pic33").hide();
})

$(".myform").Validform({
		    tiptype: 4,
		    ignoreHidden:true,
		    postonce: true,
		    ajaxPost:true,
		    btnSubmit:".sure1",
		    datatype:{
		    	'phone':/^1\d{10}$/
		    },
		    beforeCheck:function(curform){
//		    	if($(".name").val().length==0){
//		    		$(this).parent().siblings(".Validform_checktip").html("请输入企业名称")
//		    	}
		    },
	        callback:function(data){
				if(data.code==200){
					$("input").val("");
					$(".hidden").show();
					$(".success").show();
					$(".so").css("display","none");
					setTimeout(function(){
						$(".success").hide();
						$(".hidden").hide();
					},1000)
				}else{
					$(".input-verify +.Validform_checktip").html(data.msg);
					return false;
				}
	        }
	    })
		
		//短信验证码
	    $(document).on("click",".btn",function(){
			var phone=$(".phone_number").val();
			if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
				$.post(" /index/sendMessage",{'cellphone':phone},function(data){
					var data=JSON.parse(data);
					if(data.code==200){
						var n=60;
						$(".btn").html(n+"s");
						timeer=setInterval(function(){
							n--;
							if(n>0){
								$(".btn").html(n+"s");
							}else{
								$(".btn").html("获取验证码");
								clearInterval(timeer);
							}
						},1000)
					}else{
						$(".input-phone").focus();
						$(".input-phone").siblings(".Validform_checktip").html(data.msg);
					}
				});
				
				
			}else{
				$(".input-phone").focus();
				$(".input-phone").siblings(".Validform_checktip").html("");
				$(".input-phone .Validform_checktip").html("");
				$(".input-phone").siblings(".Validform_checktip").html("请输入正确手机号");
			}
		});
		

	
	$(document).click(function (e) {
        var pop=$('.solution')[0];
        if (e.target!= pop &&!$.contains(pop, e.target)){
        	pop.style.display='none';
        	$(".hidden").css("display","none");
			$(".Validform_checktip").hide();
        	$("input").val("");
        }
    })
	
	$("input").blur(function(){
		$(this).siblings(".Validform_checktip").show();
	})
	
	



