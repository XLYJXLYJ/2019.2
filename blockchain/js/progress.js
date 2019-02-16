(function($) {
	$.fn.animateProgress = function(progress, callback) {
		return this.each(function() {
			$(this).animate({
				width: progress + '%'
			}, {
				duration: 1000,
				easing: 'swing',
				step: function(progress) {
					if (Math.ceil(progress)) {
						$('.progress_label').text(Math.ceil(progress) + '%');
					}
				},
				complete: function(scope, i, elem) {
					if (callback) {
						callback.call(this, i, elem);
					};
				}
			});
		});
	};
})(jQuery);
//var width=0;
//$(function(){
//	setTimeout(function() {
//		width=width+2;
//		$('.progress_done').animateProgress(2, function() {
//			$('.progress_done').css('width',width+2+%);
//			$('.progress_done').animateProgress(100,function(){  // 读取对象信息  2S完成
//				setTimeout(function() {
//					$('.loadTxt').text("回想我以前学习过的最相似的保单...");
//					$('.progress_done').css('width', '0%');
//					var time1 = parseInt(Math.random() * 99 + 1);
//					var time2 = parseInt(Math.random() * (100-time1) + 1)+time1;
//					$('.progress_done').animateProgress(time1, function() {
//					  	$(this).animateProgress(time2, function() {
//							$('.progress_done').animateProgress(100,function(){  // 匹配保险公司数据库  3S完成
//								setTimeout(function() {
//									$('.loadTxt').text("我在理解你的条款...");
//									$('.progress_done').css('width', '0%');
//									var time4 = parseInt(Math.random() * 99 + 1);
//									var time5 = parseInt(Math.random() * (100-time4) + 1)+time4;
//									$('.progress_done').animateProgress(time4, function() {
//									  	$(this).animateProgress(time5, function() {
//											$('.progress_done').animateProgress(100,function(){  // 解析保险标信息 3S完成
//												setTimeout(function() {
//													$('.loadTxt').text("思考你这张保单的保障范围...");
//													$('.progress_done').css('width', '0%');
//													var time6 = parseInt(Math.random() * 99 + 1);
//													var time7 = parseInt(Math.random() * (100-time6) + 1)+time6;
//													$('.progress_done').animateProgress(time6, function() {
//													  	$(this).animateProgress(time7, function() {
//															$('.progress_done').animateProgress(100,function(){  // 解读保险条款 3S完成
//																setTimeout(function() {
//																	$('.loadTxt').text("Aimi在生成你的风险模型...");
//																	$('.progress_done').css('width', '0%');
//																	$('.progress_done').animateProgress(parseInt(Math.random() * 34 + 1), function() {
//																	  	$(this).animateProgress(35, function() {
//																	  		$(this).animateProgress(50, function() {
//																	  			$(this).animateProgress(65, function() {
//																	  				$(this).animateProgress(80, function() {
//																						$('.progress_done').animateProgress(100,function(){   // 解析风险模型 6S完成
//																							$('.loadTxt').text("好的，我已经读懂并记住了你的保单，你有什么问题？");
//																							$(".link_go").removeClass("hide");
//																						})   
//																					})
//																	  			})
//																			})
//																		})
//																	})
//																}, 200)
//															})
//														})
//													})
//												}, 200)
//											})
//										})
//									})
//								}, 200)
//							})
//						})
//					})
//				}, 200)
//			})
//		})
//	}, 200);
	
//	setInterval(function(){
//		var percent = $(".progress_done").width()/$(".progress_total").width();
//		if(percent > 0.46) {
//			$(".progress_label").css({color:"#fff"});
//		} else {
//			$(".progress_label").css({color:"#6dd5ff"})
//		}
//	},200)
//})
var width=0;
function progress(){
	width=width+1;
	$('.progress_done').animateProgress(width, function() {
		$('.progress_done').css('width',width+'%');
	})
//	if(width<=60){
//		setTimeout(function() {
//		
//			$('.progress_done').animateProgress(width, function() {
//				$('.progress_done').css('width',width+'%');
//			})
//		})
//	}else if(width>60&&width<=100){
//		setTimeout(function() {
//		
//			$('.progress_done').animateProgress(width, function() {
//				$('.progress_done').css('width',width+'%');
//			})
//		},270000)
//	}else{
//		clearInterval(timer);
//	}
	
}	
var timer=setInterval(function(){
	//progress();
	if(width<=60){
		progress();
	}else{
		clearInterval(timer);
	}
},1000);
var timer1=setInterval(function(){
	//progress();
	if(width>60&&width<100){
		progress();
	}else if(width>=100){
		clearInterval(timer1);
	}
},270000)

//if(width>=60){
//	
//}

//60S
//var timer1=setInterval(function(){
//	progress();
//},270000)
