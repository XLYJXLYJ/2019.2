
	$(".header-right li span").hover(function(){
		
			$(this).addClass("span_bottom");
		
	},function(){
		
			$(this).removeClass("span_bottom");
		
		
	})
	
	$(".header-right li span").click(function(){
		$(".header-right li span").removeClass("span_bottom1");
		$(this).addClass("span_bottom1");
	})
	
	$(".last_right a").hover(function(){
		$(this).addClass("span_last");
	},function(){
		$(this).removeClass("span_last");
	})
	$(".last_right a").click(function(){
		var index=$(".last_right a").index(this)
		$(".last_right a").removeClass("span_last1");
		$(this).addClass("span_last1");
		$(".header-right li span").removeClass("span_bottom1");
		$(".header-right li span").eq(index).addClass("span_bottom1");
	})
	
	$(".pic>img").hover(function(){
		$(this).css("opacity","0");
		$(this).parent().siblings(".name").css("color","white")
	},function(){
		$(this).css("opacity","1");
		$(this).parent().siblings(".name").css("color","#6bb6fa")
	})
	
	$(".last_pic1").hover(function(){
		$(".f_ewm").show()
	},function(){
		$(".f_ewm").hide()
	})
	$(".last_pic").hover(function(){
		$(".b_ewm").show()
	},function(){
		$(".b_ewm").hide()
	})
	$(".header-right>div").hover(function(){
		$(".header-right>div>img").addClass("transform");
		$(".choose").show();
	},function(){
		$(".header-right>div>img").removeClass("transform");
		$(".choose").hide();
	})
	
	$(".market").hover(function(){
		$(".market>div:eq(1)").css("display","table");
	},function(){
		$(".market>div:eq(1)").hide();
	})
	
	$(".innovations").hover(function(){
		$(".innovations>div:eq(1)").css("display","table");;
	},function(){
		$(".innovations>div:eq(1)").hide();
	})
	
	$(".solution").hover(function(){
		$(".solution>div:eq(1)").css("display","table");;
	},function(){
		$(".solution>div:eq(1)").hide();
	})
	
	 $(".tbody").scroll(function () {
		var a = $(".footer")[0].offsetTop;
		if(a >= $(".tbody").scrollTop()-$(".footer").height()&& a < ($(".tbody").scrollTop()+$(window).height())+70
		&&a -($(".tbody").scrollTop()-$(".footer").height())>($(".footer").height())*(1/3)
		&&a -($(".tbody").scrollTop()-$(".footer").height())<($(".footer").height())){
			$(".market>div:eq(1)").css("display","table");
			$(".innovations>div:eq(1)").css("display","table");
			$(".solution>div:eq(1)").css("display","table");
		}else{
			$(".market>div:eq(1)").hide();
			$(".innovations>div:eq(1)").hide();
			$(".solution>div:eq(1)").hide();
		}
	})
	 
	$(".en_footer").hover(function(){
		$(".en_footer>div:last-child").css("bottom","0px");
	})
	
//	var tag = document.createElement('script');
//
//    tag.src = "https://www.youtube.com/iframe_api";
//    var firstScriptTag = document.getElementsByTagName('script')[0];
//    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//    var player;
//    function onYouTubeIframeAPIReady() {
//      player = new YT.Player('player1', {
//        height: '500',
//        width: '800',
//        videoId: 'gvlTIUm0mw0',
//        events: {
//          'onReady': onPlayerReady,
//          'onStateChange': onPlayerStateChange
//        }
//      });
//    }
//    
//    function onPlayerReady(event) {
//      event.target.playVideo();
//    }
//    var done = false;
//    function onPlayerStateChange(event) {
//      if (event.data == YT.PlayerState.PLAYING && !done) {
//        setTimeout(stopVideo, 6000);
//        done = true;
//      }
//    } 
//	function stopVideo() {
//  	player.stopVideo();
//  }
	 
	 $(".myform").Validform({
        tiptype: 4,
        ignoreHidden: true,
        postonce: true,
        ajaxPost: true,
        btnSubmit: ".submit",
        datatype: {},
        postonce:true,
        beforeCheck: function (curform) {
        	var number=$("input[type='number']").val();
        	var match = /^[0-9]+.?[0-9]*$/;
        	if($("input[type='hidden']").val()!="ch"){
	        	if(number.length==0){
	        		$("input[type='number']").siblings(".valid_checkbox").text("Please input your plan");
					$("input[type='number']").siblings(".valid_checkbox").css("display","block")
					return false;
	        	}
				if (!match.test(number)) {
					$("input[type='number']").siblings(".valid_checkbox").text("input error");
					$("input[type='number']").siblings(".valid_checkbox").css("display","block")
					return false;
				}
				
	        	if(parseInt(number)<10){
	        		$("input[type='number']").siblings(".valid_checkbox").text("No less than 10");
	        		$("input[type='number']").siblings(".valid_checkbox").css("display","block")
					return false;
	        	}else{
	        		$("input[type='number']").siblings(".valid_checkbox").hide();
	        	}
	        }else{
	        	if(number.length==0){
	        		$("input[type='number']").siblings(".valid_checkbox").text("请输入投资的数额");
					$("input[type='number']").siblings(".valid_checkbox").css("display","block")
					return false;
	        	}
				if (!match.test(number)) {
					$("input[type='number']").siblings(".valid_checkbox").text("请输入数字");
					$("input[type='number']").siblings(".valid_checkbox").css("display","block")
					return false;
				}
				
	        	if(parseInt(number)<10){
	        		$("input[type='number']").siblings(".valid_checkbox").text("不低于10");
	        		$("input[type='number']").siblings(".valid_checkbox").css("display","block")
					return false;
	        	}else{
	        		$("input[type='number']").siblings(".valid_checkbox").hide();
	        	}
	        }
			if(!$("input[type='checkbox']").is(":checked")){
				$("input[type='checkbox']").siblings(".valid_checkbox").css("display","block")
				return false;
			}else{
				$("input[type='checkbox']").siblings(".valid_checkbox").css("display","none")
			}
        },
        callback: function (data) {
            if (data.code == 200) {
	            $(".form").hide();
				$(".myform").Validform().resetForm();  
				$(".Validform_checktip").html("");
				$("input[type='number']").siblings(".valid_checkbox").text("");
				$("input[type='checkbox']").siblings(".valid_checkbox").css("display","none");
            }
        }
    })
	 
	$(".KYC").click(function(){
		$(".form").show();
	})
	
	$(".colse").click(function(){
		$(".form").hide();
		$(".myform").Validform().resetForm();  
		$(".Validform_checktip").html("");
		$("input[type='number']").siblings(".valid_checkbox").text("");
		$("input[type='checkbox']").siblings(".valid_checkbox").css("display","none");
	})
	$(".show").hover(function(){
		$(this).children("img").css("opacity","1");

		$(this).children("img").css("opacity","0");
	})
	
	$(".alert img").click(function(){
		$(".extra").hide();
	})
//	$("iframe:eq(0)").mouseover(function(){
//		$(".insurbot>div").removeClass("m-l");
//		$(".insurbot>div").addClass("m-l");
//		$(this).addClass("move");
//		$("iframe:eq(2)").removeClass("move")
//		$("iframe:eq(1)").addClass("move1")
//		$("iframe:eq(2)").css("margin-left","-56px")
//	})
//	$("iframe:eq(1)").mouseover(function(){
//		$(".insurbot>div").removeClass("m-l");
//		$(".insurbot>div").removeClass("m-l2");
//		$("iframe:eq(0)").removeClass("move");
//		$("iframe:eq(2)").removeClass("move");
//		$(this).removeClass("move1");
//		$(this).css("margin-left","0px")
//		$("iframe:eq(2)").css("margin-left","0px")
//	})
//	$("iframe:eq(2)").mouseover(function(){
//		$(".insurbot>div").removeClass("m-l");
//		$(".insurbot>div").addClass("m-l2");
//		$("iframe:eq(0)").removeClass("move");
//		$(this).addClass("move");
//		$("iframe:eq(1)").addClass("move1")
//		$("iframe:eq(1)").css("margin-left","-56px")
////		$("iframe:eq(1)").css("margin-right","56px")
//	})
	
//视频播放
var index=2;
$(".pre-div").click(function(){
	var curr="#player"+index;
	var pre="#player"+(index-1);
	var next="#player"+(index+1);
	 if(index-1<=0){
	 	pre="#player"+(3);
	 	index=3;
	 	
	}else if(index+1>=4){
	 	next="#player"+(1);
	 	index--;
	}else{
		index--;
	}
	$(pre).css("z-index","3");
	$(curr).css("z-index","1");
	$(next).css("z-index","1");
	$(pre).css({width:"500px",height:"320px",top:"80px",left:"0px"});
	$(pre).stop(true,true).animate({width:"600px",height:"420px",top:"30px",left:"200px"},800);
	$(curr).stop(true,true).animate({width:"500px",height:"320px",top:"80px",left:"500px"},800);
	$(next).stop(true,true).animate({width:"500px",height:"320px",top:"80px",left:"0px"},800);
	
})
$(".next-div").click(function(){
	var curr="#player"+index;
	var pre="#player"+(index-1);
	var next="#player"+(index+1);
	if(index-1<=0){
	 	pre="#player"+(3);
	 	index++;
	 	
	}else if(index+1>=4){
	 	next="#player"+(1);
	 	index=1;
	}else{
		index++;
	}
	$(next).css("z-index","3");
	$(curr).css("z-index","1");
	$(pre).css("z-index","1");
	$(next).css({width:"500px",height:"320px",top:"80px",left:"500px"});
	$(next).stop(true,true).animate({width:"600px",height:"420px",top:"30px",left:"200px"},800);
	$(curr).stop(true,true).animate({width:"500px",height:"320px",top:"80px",left:"0px"},800);
	$(pre).stop(true,true).animate({width:"500px",height:"320px",top:"80px",left:"500px"},800);
	
})



		
	
	
	

	 
	 
	
      

	
			


