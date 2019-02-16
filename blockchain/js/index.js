if(document.body.clientWidth>768){
	new Wonder({
	    el: '#wonder',
	    dotsNumber: 170,
	    lineMaxLength: 200,
	    dotsAlpha: 0.01,
	    speed: 0.9,
	    clickWithDotsNumber: 5
	})
}else{
	new Wonder({
	    el: '#wonder',
	    dotsNumber: 80,
	    lineMaxLength: 140,
	    dotsAlpha: 0.01,
	    speed: 0.9,
	    clickWithDotsNumber: 5
	})
}

$(window).resize(resizeCanvas);

function resizeCanvas() {
//	$("canvas").attr("width", $(".tbody").get(0).width);
//	
//	$("canvas").attr("height", $(".tbody").get(0).height);
//	var canvas = document.createElement('canvas');
//  var ctx = canvas.getContext('2d');
//	ctx.fillRect(0, 0, $("canvas").get(0).width, $("canvas").get(0).height);
	$("canvas").remove();
	new Wonder({
	    el: '#wonder',
	    dotsNumber: 170,
	    lineMaxLength: 200,
	    dotsAlpha: 0.01,
	    speed: 0.9,
	    clickWithDotsNumber: 5
	})
}
$.fn.longPress = function(fn) {
    var timeout = undefined;
    var $this = this;
    for(var i = 0;i<$this.length;i++){
        $this[i].addEventListener('touchstart', function(event) {
            timeout = setTimeout(fn, 800);  //长按时间超过800ms，则执行传入的方法
            }, false);
        $this[i].addEventListener('touchend', function(event) {
            clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
            }, false);
    }
}
$('.header-right >div:last-child>img').click(function(){
    $(".header-right >div:last-child>div").show();
});
$(".header-right >div:last-child>img").click(function (e) {
    if ( e && e.preventDefault ) {
        e.preventDefault();
    }else {
        window.event.returnValue = false;
    }
    return false;
})
if(document.body.clientWidth<768){
	$(document).on("click","body",function(){
		$(".header-right >div:last-child>div").hide();
	})
}	
$


