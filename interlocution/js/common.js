var click=true;
$(".aside").click(function(e){
	e.stopPropagation();
	if(click){
		$('body').addClass("show-menu");
		
		click=false;
	}else{
		$('body').removeClass("show-menu");
		
		
		click=true;
	}
	
})
//$(function() {  
//  FastClick.attach(document.body);  
//}); 
var mybody = document.getElementsByTagName('body')[0]; 
var startX, startY, moveEndX, moveEndY, X, Y;
mybody.addEventListener('touchstart', function(e) {
	startX = e.touches[0].pageX; 
	startY = e.touches[0].pageY;
}, false); 
mybody.addEventListener('touchmove', function(e) {
	moveEndX = e.changedTouches[0].pageX;
	moveEndY = e.changedTouches[0].pageY;
	X = moveEndX - startX; Y = moveEndY - startY;
	if( Math.abs(X) > Math.abs(Y) && X > 0 ) {

	} else if( Math.abs(X) > Math.abs(Y) && X < 0 ) {
		// left 
		if(click==false){
			$('body').removeClass("show-menu");
			click=true;
		}
		//alert('向左'); 
	}
});
//if(){
//	
//}
$('.aimi').click(function(){
	if($('.show-menu').length==1){
		$('body').removeClass("show-menu");
		click=true;
	}
})

//退出
//$('.sign-up')
$('.sign-up').click(function(){
	$(".up").show();
})
//确认，取消
$(document).on('click','.cancel,.sure',function(){
	$(".up").hide();
})
$(".up").click(function (e) {
    var prop=$('.up>div')[0];
    
    if (e.target!= prop &&!$.contains(prop, e.target)){
    	$(".up").hide();
    }
      
})    
