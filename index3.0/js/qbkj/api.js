$(function() {
	if(document.body.clientWidth>500){
		$("#wonder canvas").remove();
		new Wonder({
		    el: '#wonder',
		    dotsNumber: 600,
		    lineMaxLength: 200,
		    dotsAlpha: 0.01,
		    speed: 0.9,
		    clickWithDotsNumber: 5
		})
	}
	function resizeCanvas() {
		$("#wonder canvas").remove();
		new Wonder({
		    el: '#wonder',
		    dotsNumber: 600,
		    lineMaxLength: 200,
		    dotsAlpha: 0.01,
		    speed: 0.9,
		    clickWithDotsNumber: 5
		})
	}
	$('.shade').css({'width':window.innerWidth,'height':window.innerHeight})
	$(window).resize(function(){
		$('.shade').css({'width':window.innerWidth,'height':window.innerHeight})
	})
	window.onscroll = function () {
		if($(document).scrollTop()==0){
			$('.shade').show();
		}
		
	}
    $(".hidden").click(function () {
        $(".hidden").hide();
        $(".so").hide();
    })

    $(".sure").click(function () {
        $(".hidden").hide();
        $(".success").hide();
    })
    $(".myform").Validform({
        tiptype: 4,
        ignoreHidden: true,
        postonce: true,
        ajaxPost: true,
        btnSubmit: ".sure1",
        datatype: {
            'phone': /^1\d{10}$/
        },
        beforeCheck: function (curform) {

        },
        callback: function (data) {
            if (data.code == 200) {
               $("input").val("");
	           $(".hidden").show();
	           $(".so").hide();
	           $(".success").show();
	           setTimeout(function () {
	               $(".success").hide();
	               $(".hidden").hide();
	           }, 1000)
            } else {
                $(".input-verify +.Validform_checktip").html(data.msg);
                return false;
            }
        }
    })

    //短信验证码
    $(document).on("click", ".btn", function () {
        var phone = $(".phone_number").val();
        if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)) {
            $.post(" /index/sendMessage", {'cellphone': phone}, function (data) {
                var data = JSON.parse(data);
                if (data.code == 200) {
                    var n = 60;
                    $(".btn").html(n + "s");
                    timeer = setInterval(function () {
                        n--;
                        if (n > 0) {
                            $(".btn").html(n + "s");
                        } else {
                            $(".btn").html("获取验证码");
                            clearInterval(timeer);
                        }
                    }, 1000)
                } else {
                    $(".input-phone").focus();
                    $(".input-phone").siblings(".Validform_checktip").html(data.msg);
                }
            });
        } else {
            $(".input-phone").focus();
            $(".input-phone").siblings(".Validform_checktip").html("");
            $(".input-phone .Validform_checktip").html("");
            $(".input-phone").siblings(".Validform_checktip").html("请输入正确手机号");
        }
    });


    $(document).click(function (e) {
        var pop = $('.solution')[0];
        if (e.target != pop && !$.contains(pop, e.target)) {
			$(".so").hide();
            $(".hidden").hide();
            $(".Validform_checktip").hide();
            $("input").val("");
        }
    })
    $("input").blur(function () {
    	$(this).siblings(".Validform_checktip").show();
    })
    function move() {}

    var one = 0;
    var t1;
    $("body").scroll(function () {
        if (one == 0) {
            var a = $(".icon").offset().top;
            if (a >= $("body").scrollTop() + 60 && a < ($("body").scrollTop() + $(window).height()) + 60) {
				$(".icon").addClass("active");
            }
        }
    })
    $(".special_list .apply").click(function(){
		var index=$(".apply").index(this);
		$("input[type=hidden]").val(index+1);
		$(".hidden").css("display","inline");
		$(".so").css("display","block");
		event.stopPropagation();
		 
	})
     var audio=$('audio')[0];
    $('.play').click(function(){
    	var this_=$(this);
    	this_.hide();
    	$('.shade').hide();
    	this_.siblings('.static').hide();
    	if(audio!==null){ 
			if(audio.paused){ 
				audio.play();// 播放 
			}
		}	
    })
    audio.addEventListener('ended', function () {  
        $('.play').show();
    	$('.static').css("display",'inline-block');
    }, false);
})

