if(document.body.clientWidth > 500) {
	new Wonder({
		el: '#wonder',
		dotsNumber: 170,
		lineMaxLength: 200,
		dotsAlpha: 0.01,
		speed: 0.9,
		clickWithDotsNumber: 5
	})
}
if(document.body.clientWidth > 500) {
	$(window).resize(resizeCanvas);

	function resizeCanvas() {
		$("#wonder canvas").remove();
		new Wonder({
			el: '#wonder',
			dotsNumber: 170,
			lineMaxLength: 200,
			dotsAlpha: 0.01,
			speed: 0.9,
			clickWithDotsNumber: 5
		})
	}
}
$(".way1").bind('mouseover ',function(){
	$(this).children('.copy').eq(0).hide();
    $(this).children('.copy').eq(-1).show();
});
$(".way1").bind('mouseleave',function(){
	$(this).children('.copy').eq(0).show();
	$(this).children('.copy').eq(-1).hide();
});

//$(".copy.show").hover(
//      function(){
//             var $div = $(this);
//             t = setInterval(function(){
//                    $div.siblings().show()
//             },100);
//       },function(){
//      clearInterval(t);
//      $(this).siblings().hide();
//      })
//$(".copy.show").mouseleave(function() {
//	$(this).siblings().hide()
//})
//$(".copy.show").mouseenter(function(){
//	$(this).hide()
//  $(this).siblings().show()
//}).mouseleave(function(){
//	$(this).show()
//  $(this).siblings().hide()
//});
$("li a").mousemove(function() {
	var this_ = this;
	var index = $("li a").index(this_);
	$(".sub_pag").hide();
	if(index == 1 || index == 4 || index == 5) {
		$(this).children(".sub_pag").show();
	}
	$(this_).addClass("scroll1").parents('li').siblings('li').find('a').removeClass("scroll1");

})

$(".head_nav ul").mouseleave(function(e) {
	//var index=$(".section.active").index(".section");
	$(".head_nav a").removeClass("scroll1");
	$(".sub_pag").hide();
})

$(".sub_pag div").click(function(e) {
	if(e && e.preventDefault) {
		e.preventDefault();
	} else {
		window.event.returnValue = false;
	}
	return false;
})
$('.aside').click(function() {
	$(this).siblings('.nav').fadeToggle();
})
$(document).click(function() {
	$(".sub_pag").hide();
})
$(".sub_pag div").click(function(e) {
	if(e && e.preventDefault) {
		e.preventDefault();
	} else {
		window.event.returnValue = false;
	}
	return false;
})

$('.prev_btn').click(function() {
	var index = $('.picture_conent>div .act').index();
	if(index == 0) {
		return false
	} else if(index == 1) {
		$('.picture_conent>div>div').eq(index - 1).addClass('act').siblings('div').removeClass('act');


	} else if(index == 2) {
		$('.picture_conent>div>div').eq(index - 1).addClass('act').siblings('div').removeClass('act');

	}
})

$('.next_btn').click(function(e) {
	var index = $('.picture_conent>div .act').index();
//	var current=$('.picture_conent>div .active');
	if(index == 2) {
		return false;
	} else if(index == 1) {
		$('.picture_conent>div>div').eq(index+1).addClass('act').siblings('div').removeClass('act');
	
	} else if(index == 0) {
		$('.picture_conent>div>div').removeClass('act')
		$('.picture_conent>div>div').eq(index+1).addClass('act')
//		
	}
	
})
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isiOS) {
	$('head').append('<link rel="stylesheet" href="//static.qibaozz.com/index3.0/css/qbkj/ios.css" />');
//			$('head').append('<link rel="stylesheet" href="../css/qbkj/ios.css" />');
}