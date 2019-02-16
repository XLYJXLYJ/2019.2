$(function(){
	// 点击 账户设置的编辑
	$('.edit').click(function(){
		$('.all_fix').show();
	});
	$('.no').click(function(){
		$('.all_fix').hide();
	});
	// 点击 成员 跳转到非管理员页面
	$('.member').click(function(){
		window.location.href = 'business-Admin_no.html';
	})
	// 点击保存
	$('.invite_yes').click(function(){
		$('.name').text($('.new_name').val());
		$('.num').text($('.new_num').val());
		$('.adrs').text($('.new_adrs').val());
		$('.card_name').text($('.new_card_name').val());
		$('.account').text($('.new_account').val());
		$('.accountBank').text($('.new_accountBank').val());
		$('.all_fix').hide();
	});
})
