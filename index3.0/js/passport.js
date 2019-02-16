$(function(){
	// 切换找回密码方式
	$('.nav-a1').click(function(){
		$(this).addClass('choose').siblings().removeClass('choose');
		$('.cont-tel').removeClass('hide');
		$('.cont-mail').addClass('hide');
	})
	$('.nav-a2').click(function(){
		$(this).addClass('choose').siblings().removeClass('choose');
		$('.cont-tel').addClass('hide');
		$('.cont-mail').removeClass('hide');
	})
	
	// 弱提示
	setTimeout(function(){
		$('.all_tip').hide()
	},5000)
})
