$(function(){
	// 点击 X 隐藏弹框
	$('.no').click(function(){
		$('.exit_fix').hide();
		$('.all_fix').hide()
		$('.ok_fix').hide();
		$('.no_fix').hide();
		$('.transfer_fix').hide();
	});
	// 点击 邀请加入
	$('.addenterprise').click(function(){
		$('.all_fix').show();
	});
	// 点击 确认退出，跳转到创建业务部页面
	$('.exit_cont_yes').click(function(){
		window.location.href='business-IC.html';
	});
	
	// 审核状态
	var check = function(ev){
		var msg = ev.data('msg');
		$('.ok_fix_cont span').text(msg);
		$('.ok_fix').show();
		var url=ev.data("url");
		$('.invite_yes').click(function(){
			window.location.href=url;
		});
	};
	// 点击 审核通过
	$('.exam_ok').click(function(){
		check($(this));
	});
	// 点击  审核不通过
	$('.exam_no').click(function(){
		check($(this));
	});
	// 点击 转让管理员
	$('.change_admin').click(function(){
		check($(this));
	});
	// 点击 退出业务部
	$('.insure').click(function(){
		$('.exit_fix').show();
		var url = $(this).data('url');
		$('.exit_cont_yes').click(function(){
			window.location.href=url;
		});
	});
})
