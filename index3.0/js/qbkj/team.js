$('p img').click(function(){
	var this_=$(this);
	this_.parent("p").siblings('p').show();
	this_.hide();
	
})
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

